#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { XMLParser, XMLValidator } from "fast-xml-parser"

const SITE_ORIGIN = "https://ingenierocivilvenezuela.com"
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`
const GENERIC_SOCIAL_IMAGE = `${SITE_ORIGIN}/og-image.webp`
const GENERIC_SOCIAL_IMAGE_ALT =
  "Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón"
const PLACEHOLDER_PATTERN =
  /\{\{[^}]*\}\}|\$\{[^}]*\}|%[A-Z0-9_]+%|\b(?:TODO|TBD|lorem ipsum)\b/i
const VALID_SCHEMA_TYPES = new Set([
  "AdministrativeArea",
  "BlogPosting",
  "BreadcrumbList",
  "City",
  "ImageObject",
  "ListItem",
  "Organization",
  "Person",
  "ProfilePage",
  "Service",
  "WebPage",
  "WebSite",
])
const REPORT_CATEGORIES = [
  "Title tags",
  "Meta descriptions",
  "Canonical URLs",
  "Robots directives",
  "Open Graph metadata",
  "Twitter metadata",
  "JSON-LD",
  "Sitemap",
  "Blog article metadata",
  "Blog image SEO",
  "Not-found page",
  "HTML language and viewport",
  "Internal HTML consistency",
]

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
}

function parseAttributes(tag) {
  const attributes = {}
  const pattern =
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
  const opening = tag.replace(/^<[^\s>]+/, "").replace(/\/?>$/, "")
  for (const match of opening.matchAll(pattern)) {
    attributes[match[1].toLowerCase()] = decodeHtml(
      match[2] ?? match[3] ?? match[4] ?? "",
    )
  }
  return attributes
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? []
}

function getMeta(html, key, value) {
  return getTags(html, "meta")
    .map(parseAttributes)
    .filter((attributes) => attributes[key] === value)
}

function getCanonicalLinks(html) {
  return getTags(html, "link")
    .map(parseAttributes)
    .filter((attributes) =>
      (attributes.rel ?? "").toLowerCase().split(/\s+/).includes("canonical"),
    )
}

function normalizeRoute(route) {
  const pathOnly = route.split(/[?#]/, 1)[0] || "/"
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`
  return withLeadingSlash === "/"
    ? "/"
    : withLeadingSlash.replace(/\/+$/, "") || "/"
}

function canonicalForRoute(route) {
  return route === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`
}

function routeFromHtmlFile(distDir, file) {
  const relative = path.relative(distDir, file).split(path.sep).join("/")
  if (relative === "index.html") return "/"
  return normalizeRoute(`/${relative.replace(/\/index\.html$/, "")}`)
}

function listHtmlFiles(directory) {
  const files = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "server") continue
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...listHtmlFiles(fullPath))
    else if (entry.name === "index.html") files.push(fullPath)
  }
  return files.sort()
}

function hasPlaceholder(value) {
  return PLACEHOLDER_PATTERN.test(value)
}

function looksLikeNaturalText(value) {
  return (
    /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(value) &&
    value.trim().split(/\s+/).length >= 4
  )
}

function isValidIsoDate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  )
}

function findJsonLdObjects(value, type, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) findJsonLdObjects(item, type, found)
  } else if (value && typeof value === "object") {
    const objectTypes = Array.isArray(value["@type"])
      ? value["@type"]
      : [value["@type"]]
    if (objectTypes.includes(type)) found.push(value)
    for (const child of Object.values(value)) {
      findJsonLdObjects(child, type, found)
    }
  }
  return found
}

function walkJson(value, visitor) {
  visitor(value)
  if (Array.isArray(value)) {
    for (const item of value) walkJson(item, visitor)
  } else if (value && typeof value === "object") {
    for (const child of Object.values(value)) walkJson(child, visitor)
  }
}

function createIssues() {
  return { errors: [], warnings: [] }
}

function addIssue(issues, level, category, route, file, message) {
  issues[level].push({ category, route, file, message })
}

function requireSingleValue({
  items,
  valueKey,
  label,
  category,
  route,
  file,
  issues,
}) {
  if (items.length !== 1) {
    addIssue(
      issues,
      "errors",
      category,
      route,
      file,
      `Expected exactly one ${label}; found ${items.length}.`,
    )
    return undefined
  }
  const value = items[0][valueKey]?.trim() ?? ""
  if (!value) {
    addIssue(issues, "errors", category, route, file, `${label} is empty.`)
    return undefined
  }
  if (hasPlaceholder(value)) {
    addIssue(
      issues,
      "errors",
      category,
      route,
      file,
      `${label} contains an unresolved placeholder: "${value}".`,
    )
  }
  return value
}

function validateAbsoluteProductionUrl(value, label, context, issues) {
  let parsed
  try {
    parsed = new URL(value)
  } catch {
    addIssue(
      issues,
      "errors",
      context.category,
      context.route,
      context.file,
      `${label} is not an absolute URL: "${value}".`,
    )
    return undefined
  }

  if (parsed.origin !== SITE_ORIGIN) {
    addIssue(
      issues,
      "errors",
      context.category,
      context.route,
      context.file,
      `${label} must use ${SITE_ORIGIN}; found "${value}".`,
    )
  }
  if (parsed.search || parsed.hash) {
    addIssue(
      issues,
      "errors",
      context.category,
      context.route,
      context.file,
      `${label} must not contain a query string or fragment: "${value}".`,
    )
  }
  return parsed
}

function readImageDimensions(filePath) {
  const data = fs.readFileSync(filePath)

  if (data.length >= 24 && data.toString("ascii", 1, 4) === "PNG") {
    return {
      width: data.readUInt32BE(16),
      height: data.readUInt32BE(20),
    }
  }

  if (
    data.length >= 30 &&
    data.toString("ascii", 0, 4) === "RIFF" &&
    data.toString("ascii", 8, 12) === "WEBP"
  ) {
    const format = data.toString("ascii", 12, 16)
    if (format === "VP8X") {
      return {
        width: 1 + data.readUIntLE(24, 3),
        height: 1 + data.readUIntLE(27, 3),
      }
    }
    if (format === "VP8 " && data.length >= 30) {
      return {
        width: data.readUInt16LE(26) & 0x3fff,
        height: data.readUInt16LE(28) & 0x3fff,
      }
    }
    if (format === "VP8L" && data.length >= 25) {
      const bits = data.readUInt32LE(21)
      return {
        width: 1 + (bits & 0x3fff),
        height: 1 + ((bits >> 14) & 0x3fff),
      }
    }
  }

  if (data.length >= 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2
    while (offset + 8 < data.length) {
      if (data[offset] !== 0xff) {
        offset += 1
        continue
      }
      const marker = data[offset + 1]
      const length = data.readUInt16BE(offset + 2)
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        return {
          width: data.readUInt16BE(offset + 7),
          height: data.readUInt16BE(offset + 5),
        }
      }
      if (length < 2) break
      offset += length + 2
    }
  }

  return undefined
}

function localAssetPath(src, assetRoot) {
  if (!assetRoot) return undefined
  let url
  try {
    url = new URL(src, SITE_ORIGIN)
  } catch {
    return undefined
  }
  if (url.origin !== SITE_ORIGIN) return undefined
  let decodedPath
  try {
    decodedPath = decodeURIComponent(url.pathname).replace(/^\/+/, "")
  } catch {
    return undefined
  }
  const resolved = path.resolve(assetRoot, decodedPath)
  const root = `${path.resolve(assetRoot)}${path.sep}`
  return resolved.startsWith(root) ? resolved : undefined
}

export function validateBlogImages({ html, route, file, article, assetRoot }) {
  const issues = createIssues()
  const images = getTags(html, "img")
    .map(parseAttributes)
    .filter((attributes) => attributes["data-blog-image"])

  for (const [index, image] of images.entries()) {
    const role = image["data-blog-image"]
    const label = `Blog ${role} image ${index + 1}`
    const hasAlt = Object.hasOwn(image, "alt")
    if (!hasAlt || (role !== "content" && !image.alt.trim())) {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        `${label} requires descriptive alt text.`,
      )
    } else if (
      image.alt &&
      /^(?:imagen|foto|imagen del artículo|imagen de construcción)$/i.test(
        image.alt.trim(),
      )
    ) {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        `${label} uses generic alt text: "${image.alt}".`,
      )
    }

    if (!image.src?.trim()) {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        `${label} has no usable src.`,
      )
      continue
    }

    const width = Number(image.width)
    const height = Number(image.height)
    if (
      !Number.isInteger(width) ||
      width <= 0 ||
      !Number.isInteger(height) ||
      height <= 0
    ) {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        `${label} requires positive intrinsic width and height attributes.`,
      )
    }

    if (image.decoding !== "async") {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        `${label} must use decoding="async".`,
      )
    }
    if (role === "featured") {
      if (image.loading !== "eager" || image.fetchpriority !== "high") {
        addIssue(
          issues,
          "errors",
          "Blog image SEO",
          route,
          file,
          'Primary article image must use loading="eager" and fetchPriority="high".',
        )
      }
    } else if (image.loading !== "lazy") {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        `${label} must use loading="lazy".`,
      )
    }

    const assetPath = localAssetPath(image.src, assetRoot)
    if (assetPath) {
      if (!fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
        addIssue(
          issues,
          "errors",
          "Blog image SEO",
          route,
          file,
          `${label} references a missing local asset: "${image.src}".`,
        )
      } else if (Number.isInteger(width) && Number.isInteger(height)) {
        const actual = readImageDimensions(assetPath)
        if (actual && (actual.width !== width || actual.height !== height)) {
          addIssue(
            issues,
            "errors",
            "Blog image SEO",
            route,
            file,
            `${label} dimensions ${width}x${height} do not match the asset dimensions ${actual.width}x${actual.height}.`,
          )
        }
      }
    }
  }

  if (article?.featuredImage) {
    const featured = images.filter(
      (image) =>
        image["data-blog-image"] === "featured" &&
        image.src === article.featuredImage,
    )
    if (featured.length !== 1) {
      addIssue(
        issues,
        "errors",
        "Blog image SEO",
        route,
        file,
        "Article must render exactly one matching primary featured image.",
      )
    } else {
      const [image] = featured
      if (
        image.alt !== article.featuredImageAlt ||
        Number(image.width) !== article.featuredImageWidth ||
        Number(image.height) !== article.featuredImageHeight
      ) {
        addIssue(
          issues,
          "errors",
          "Blog image SEO",
          route,
          file,
          "Rendered featured image metadata does not match article data.",
        )
      }
    }
  }

  return issues
}

export function validatePage({
  route,
  file,
  html,
  expectedMeta,
  article,
  knownRoutes,
  assetRoot,
  redirectRoutes = new Set(["/cobertura"]),
}) {
  const issues = createIssues()
  const observed = { route, file }
  const expectedSocialImage = article?.featuredImage
    ? new URL(article.featuredImage, SITE_ORIGIN).href
    : GENERIC_SOCIAL_IMAGE
  const expectedSocialImageAlt = article?.featuredImage
    ? article.featuredImageAlt
    : GENERIC_SOCIAL_IMAGE_ALT

  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(
    (match) => decodeHtml(match[1].replace(/<[^>]*>/g, "").trim()),
  )
  if (titles.length !== 1) {
    addIssue(
      issues,
      "errors",
      "Title tags",
      route,
      file,
      `Expected exactly one <title>; found ${titles.length}.`,
    )
  } else {
    observed.title = titles[0]
    if (!titles[0]) {
      addIssue(issues, "errors", "Title tags", route, file, "Title is empty.")
    } else {
      if (titles[0] !== expectedMeta.title) {
        addIssue(
          issues,
          "errors",
          "Title tags",
          route,
          file,
          `Title does not match getRouteMeta(): "${titles[0]}".`,
        )
      }
      if (hasPlaceholder(titles[0])) {
        addIssue(
          issues,
          "errors",
          "Title tags",
          route,
          file,
          `Title contains an unresolved placeholder: "${titles[0]}".`,
        )
      }
      if (titles[0].length < 30 || titles[0].length > 65) {
        addIssue(
          issues,
          "warnings",
          "Title tags",
          route,
          file,
          `Title length is ${titles[0].length} characters; review the usual 50–60 character target.`,
        )
      }
    }
  }

  const description = requireSingleValue({
    items: getMeta(html, "name", "description"),
    valueKey: "content",
    label: "meta description",
    category: "Meta descriptions",
    route,
    file,
    issues,
  })
  observed.description = description
  if (description) {
    if (description !== expectedMeta.description) {
      addIssue(
        issues,
        "errors",
        "Meta descriptions",
        route,
        file,
        "Meta description does not match getRouteMeta().",
      )
    }
    if (!looksLikeNaturalText(description)) {
      addIssue(
        issues,
        "errors",
        "Meta descriptions",
        route,
        file,
        "Meta description does not resemble meaningful natural-language text.",
      )
    }
    if (description.length < 120 || description.length > 160) {
      addIssue(
        issues,
        "warnings",
        "Meta descriptions",
        route,
        file,
        `Meta description length is ${description.length} characters; review the preferred 120–160 character range.`,
      )
    }
  }

  const canonical = requireSingleValue({
    items: getCanonicalLinks(html),
    valueKey: "href",
    label: "canonical link",
    category: "Canonical URLs",
    route,
    file,
    issues,
  })
  observed.canonical = canonical
  if (canonical) {
    const parsed = validateAbsoluteProductionUrl(
      canonical,
      "Canonical URL",
      { category: "Canonical URLs", route, file },
      issues,
    )
    if (canonical !== expectedMeta.canonical) {
      addIssue(
        issues,
        "errors",
        "Canonical URLs",
        route,
        file,
        `Canonical does not match getRouteMeta(); expected "${expectedMeta.canonical}", found "${canonical}".`,
      )
    }
    if (canonical !== canonicalForRoute(route)) {
      addIssue(
        issues,
        "errors",
        "Canonical URLs",
        route,
        file,
        `Canonical does not match route "${route}".`,
      )
    }
    if (parsed && route !== "/" && parsed.pathname.endsWith("/")) {
      addIssue(
        issues,
        "errors",
        "Canonical URLs",
        route,
        file,
        "Canonical contains an unintended trailing slash.",
      )
    }
  }

  const robots = requireSingleValue({
    items: getMeta(html, "name", "robots"),
    valueKey: "content",
    label: "robots meta directive",
    category: "Robots directives",
    route,
    file,
    issues,
  })
  if (robots) {
    const directives = new Set(
      robots
        .toLowerCase()
        .split(",")
        .map((value) => value.trim()),
    )
    if (directives.has("noindex") || directives.has("nofollow")) {
      addIssue(
        issues,
        "errors",
        "Robots directives",
        route,
        file,
        `Indexable route has blocking robots directive "${robots}".`,
      )
    }
    if (!directives.has("index") || !directives.has("follow")) {
      addIssue(
        issues,
        "warnings",
        "Robots directives",
        route,
        file,
        `Robots directive should explicitly include index and follow; found "${robots}".`,
      )
    }
  }

  const socialChecks = [
    ["property", "og:title", "Open Graph metadata", expectedMeta.title],
    [
      "property",
      "og:description",
      "Open Graph metadata",
      expectedMeta.description,
    ],
    ["property", "og:url", "Open Graph metadata", expectedMeta.canonical],
    [
      "property",
      "og:type",
      "Open Graph metadata",
      article ? "article" : "website",
    ],
    ["property", "og:image", "Open Graph metadata", expectedSocialImage],
    ["property", "og:image:alt", "Open Graph metadata", expectedSocialImageAlt],
    [
      "property",
      "og:image:width",
      "Open Graph metadata",
      String(article?.featuredImageWidth ?? 1200),
    ],
    [
      "property",
      "og:image:height",
      "Open Graph metadata",
      String(article?.featuredImageHeight ?? 630),
    ],
    ["name", "twitter:card", "Twitter metadata", "summary_large_image"],
    ["name", "twitter:title", "Twitter metadata", expectedMeta.title],
    [
      "name",
      "twitter:description",
      "Twitter metadata",
      expectedMeta.description,
    ],
    ["name", "twitter:image", "Twitter metadata", expectedSocialImage],
    ["name", "twitter:image:alt", "Twitter metadata", expectedSocialImageAlt],
  ]
  for (const [attribute, key, category, expectedValue] of socialChecks) {
    const value = requireSingleValue({
      items: getMeta(html, attribute, key),
      valueKey: "content",
      label: key,
      category,
      route,
      file,
      issues,
    })
    if (value && expectedValue !== undefined && value !== expectedValue) {
      addIssue(
        issues,
        "errors",
        category,
        route,
        file,
        `${key} does not match the page metadata; found "${value}".`,
      )
    }
    if (value && (key === "og:image" || key === "twitter:image")) {
      validateAbsoluteProductionUrl(
        value,
        key,
        { category, route, file },
        issues,
      )
    }
  }

  const publishedTimeTags = getMeta(html, "property", "article:published_time")
  const modifiedTimeTags = getMeta(html, "property", "article:modified_time")
  if (article) {
    const publishedTime = requireSingleValue({
      items: publishedTimeTags,
      valueKey: "content",
      label: "article:published_time",
      category: "Open Graph metadata",
      route,
      file,
      issues,
    })
    if (publishedTime && publishedTime !== article.date) {
      addIssue(
        issues,
        "errors",
        "Open Graph metadata",
        route,
        file,
        "article:published_time does not match the article publication date.",
      )
    }
    if (article.dateModified) {
      const modifiedTime = requireSingleValue({
        items: modifiedTimeTags,
        valueKey: "content",
        label: "article:modified_time",
        category: "Open Graph metadata",
        route,
        file,
        issues,
      })
      if (modifiedTime && modifiedTime !== article.dateModified) {
        addIssue(
          issues,
          "errors",
          "Open Graph metadata",
          route,
          file,
          "article:modified_time does not match the article modification date.",
        )
      }
    } else if (modifiedTimeTags.length > 0) {
      addIssue(
        issues,
        "errors",
        "Open Graph metadata",
        route,
        file,
        "article:modified_time is present without a genuine modification date in article data.",
      )
    }
  } else if (publishedTimeTags.length > 0 || modifiedTimeTags.length > 0) {
    addIssue(
      issues,
      "errors",
      "Open Graph metadata",
      route,
      file,
      "Static page contains stale article-specific Open Graph metadata.",
    )
  }

  const jsonLdBlocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
  if (jsonLdBlocks.length === 0) {
    addIssue(
      issues,
      "errors",
      "JSON-LD",
      route,
      file,
      "No JSON-LD blocks were found.",
    )
  }
  const jsonLdValues = []
  for (const [index, match] of jsonLdBlocks.entries()) {
    const raw = match[1].trim()
    if (hasPlaceholder(raw)) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        `JSON-LD block ${index + 1} contains an unresolved placeholder.`,
      )
    }
    try {
      const value = JSON.parse(raw)
      jsonLdValues.push(value)
      walkJson(value, (node) => {
        if (!node || typeof node !== "object" || Array.isArray(node)) return
        const types = Array.isArray(node["@type"])
          ? node["@type"]
          : node["@type"]
            ? [node["@type"]]
            : []
        for (const type of types) {
          if (!VALID_SCHEMA_TYPES.has(type)) {
            addIssue(
              issues,
              "warnings",
              "JSON-LD",
              route,
              file,
              `Review unrecognized schema @type "${type}".`,
            )
          }
        }
        for (const [key, child] of Object.entries(node)) {
          if (
            typeof child === "string" &&
            (key === "url" ||
              key === "item" ||
              key === "mainEntityOfPage" ||
              key === "image" ||
              key === "@id" ||
              key === "@context") &&
            /^https?:\/\//.test(child)
          ) {
            let parsed
            try {
              parsed = new URL(child)
            } catch {
              addIssue(
                issues,
                "errors",
                "JSON-LD",
                route,
                file,
                `Invalid URL in JSON-LD ${key}: "${child}".`,
              )
              continue
            }
            if (parsed.origin === "https://schema.org") continue
            if (parsed.origin !== SITE_ORIGIN) {
              addIssue(
                issues,
                "errors",
                "JSON-LD",
                route,
                file,
                `JSON-LD ${key} must use ${SITE_ORIGIN} or a legitimate schema.org URL; found "${child}".`,
              )
              continue
            }
            if (parsed.search || (parsed.hash && key !== "@id")) {
              addIssue(
                issues,
                "errors",
                "JSON-LD",
                route,
                file,
                `JSON-LD ${key} contains a prohibited query string or fragment: "${child}".`,
              )
            }
          }
        }
      })
    } catch (error) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        `JSON-LD block ${index + 1} is invalid JSON: ${error.message}`,
      )
    }
  }

  const allJsonLd = { values: jsonLdValues }
  const definedIds = new Set()
  const referencedIds = new Set()
  walkJson(allJsonLd, (node) => {
    if (!node || typeof node !== "object" || Array.isArray(node)) return
    const id = node["@id"]
    if (typeof id !== "string") return
    if (Object.keys(node).some((key) => key !== "@id")) definedIds.add(id)
    else referencedIds.add(id)
  })
  for (const referencedId of referencedIds) {
    if (
      referencedId.startsWith(`${SITE_ORIGIN}/#`) &&
      !definedIds.has(referencedId)
    ) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        `JSON-LD reference has no matching definition: "${referencedId}".`,
      )
    }
  }

  for (const coreType of ["Organization", "Person", "WebSite"]) {
    const entities = findJsonLdObjects(allJsonLd, coreType)
    if (entities.length !== 1) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        `Expected exactly one ${coreType} entity; found ${entities.length}.`,
      )
      continue
    }
    const id = entities[0]["@id"]
    if (typeof id !== "string" || !id.startsWith(`${SITE_ORIGIN}/#`)) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        `${coreType} must use a stable production-domain @id.`,
      )
    }
  }

  const breadcrumbs = findJsonLdObjects(allJsonLd, "BreadcrumbList")
  for (const breadcrumb of breadcrumbs) {
    const items = breadcrumb.itemListElement
    if (!Array.isArray(items) || items.length === 0) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        "BreadcrumbList has no itemListElement entries.",
      )
      continue
    }
    const positions = items.map((item) => item.position)
    if (positions.some((position, index) => position !== index + 1)) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        "BreadcrumbList positions are not sequential.",
      )
    }
    const finalItem = items.at(-1)?.item
    if (finalItem && finalItem !== expectedMeta.canonical) {
      addIssue(
        issues,
        "errors",
        "JSON-LD",
        route,
        file,
        `Final breadcrumb URL does not match the canonical: "${finalItem}".`,
      )
    }
  }

  if (article) {
    const postings = findJsonLdObjects(allJsonLd, "BlogPosting")
    if (postings.length !== 1) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        `Expected exactly one BlogPosting; found ${postings.length}.`,
      )
    } else {
      const posting = postings[0]
      const expectedValues = {
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        articleSection: article.category,
        url: expectedMeta.canonical,
        inLanguage: "es",
      }
      for (const [key, expectedValue] of Object.entries(expectedValues)) {
        if (posting[key] !== expectedValue) {
          addIssue(
            issues,
            "errors",
            "Blog article metadata",
            route,
            file,
            `BlogPosting ${key} does not match the article data.`,
          )
        }
      }

      if (posting["@id"] !== `${expectedMeta.canonical}#blogposting`) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting @id must use the canonical URL followed by #blogposting.",
        )
      }
      if (
        posting.mainEntityOfPage?.["@type"] !== "WebPage" ||
        posting.mainEntityOfPage?.["@id"] !== expectedMeta.canonical
      ) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting mainEntityOfPage must be a WebPage referencing the canonical URL.",
        )
      }
      if (posting.author?.["@id"] !== `${SITE_ORIGIN}/#person`) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting author must reference the existing Person entity.",
        )
      }
      if (posting.publisher?.["@id"] !== `${SITE_ORIGIN}/#organization`) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting publisher must reference the existing Organization entity.",
        )
      }
      if (posting.isPartOf?.["@id"] !== `${SITE_ORIGIN}/#website`) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting isPartOf must reference the existing WebSite entity.",
        )
      }
      if (!isValidIsoDate(posting.datePublished)) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting datePublished is not a valid ISO 8601 date.",
        )
      }
      if (article.dateModified) {
        if (
          posting.dateModified !== article.dateModified ||
          !isValidIsoDate(posting.dateModified)
        ) {
          addIssue(
            issues,
            "errors",
            "Blog article metadata",
            route,
            file,
            "BlogPosting dateModified is missing, invalid, or inconsistent with article data.",
          )
        }
      } else if (Object.hasOwn(posting, "dateModified")) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting dateModified must be omitted when article data has no genuine modification date.",
        )
      }

      if (article.featuredImage) {
        if (
          !Array.isArray(posting.image) ||
          posting.image.length !== 1 ||
          posting.image[0] !== expectedSocialImage
        ) {
          addIssue(
            issues,
            "errors",
            "Blog article metadata",
            route,
            file,
            "BlogPosting image must contain the absolute featured image URL used by Open Graph.",
          )
        } else {
          validateAbsoluteProductionUrl(
            posting.image[0],
            "BlogPosting image",
            { category: "Blog article metadata", route, file },
            issues,
          )
        }
      } else if (Object.hasOwn(posting, "image")) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "BlogPosting image must be omitted when the article has no featured image.",
        )
      }
    }

    if (breadcrumbs.length !== 1) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        `Expected exactly one article BreadcrumbList; found ${breadcrumbs.length}.`,
      )
    } else {
      const items = breadcrumbs[0].itemListElement
      const expectedBreadcrumbs = [
        { position: 1, name: "Inicio", item: `${SITE_ORIGIN}/` },
        { position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog` },
        {
          position: 3,
          name: article.title,
          item: expectedMeta.canonical,
        },
      ]
      if (
        !Array.isArray(items) ||
        items.length !== expectedBreadcrumbs.length ||
        expectedBreadcrumbs.some(
          (expected, index) =>
            items[index]?.["@type"] !== "ListItem" ||
            items[index]?.position !== expected.position ||
            items[index]?.name !== expected.name ||
            items[index]?.item !== expected.item,
        )
      ) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          route,
          file,
          "Article BreadcrumbList must match Inicio → Blog → Article Title.",
        )
      }
    }
  }

  const htmlTags = getTags(html, "html").map(parseAttributes)
  if (htmlTags.length !== 1 || htmlTags[0].lang !== "es") {
    addIssue(
      issues,
      "errors",
      "HTML language and viewport",
      route,
      file,
      `Expected one <html lang="es"> declaration.`,
    )
  }
  const viewport = requireSingleValue({
    items: getMeta(html, "name", "viewport"),
    valueKey: "content",
    label: "viewport meta tag",
    category: "HTML language and viewport",
    route,
    file,
    issues,
  })
  if (viewport && !/width\s*=\s*device-width/i.test(viewport)) {
    addIssue(
      issues,
      "errors",
      "HTML language and viewport",
      route,
      file,
      `Viewport meta tag does not include width=device-width.`,
    )
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length
  if (h1Count === 0) {
    addIssue(
      issues,
      "errors",
      "Internal HTML consistency",
      route,
      file,
      "Page has no H1 element.",
    )
  } else if (h1Count > 1) {
    addIssue(
      issues,
      "warnings",
      "Internal HTML consistency",
      route,
      file,
      `Page contains ${h1Count} H1 elements; review responsive duplicates.`,
    )
  }

  for (const imageTag of getTags(html, "img")) {
    const attributes = parseAttributes(imageTag)
    if (!Object.hasOwn(attributes, "alt")) {
      addIssue(
        issues,
        "errors",
        "Internal HTML consistency",
        route,
        file,
        `Image is missing an alt attribute: ${imageTag.slice(0, 140)}`,
      )
    } else if (attributes.alt === "" && attributes["aria-hidden"] !== "true") {
      addIssue(
        issues,
        "warnings",
        "Internal HTML consistency",
        route,
        file,
        `Image has empty alt text without aria-hidden: ${imageTag.slice(0, 140)}`,
      )
    }
  }

  const ids = getTags(html, "[a-z][a-z0-9:-]*")
    .map(parseAttributes)
    .map((attributes) => attributes.id)
    .filter(Boolean)
  const idCounts = new Map()
  for (const id of ids) idCounts.set(id, (idCounts.get(id) ?? 0) + 1)
  for (const [id, count] of idCounts) {
    if (count > 1) {
      addIssue(
        issues,
        "warnings",
        "Internal HTML consistency",
        route,
        file,
        `Duplicate id "${id}" appears ${count} times.`,
      )
    }
  }

  for (const anchorTag of getTags(html, "a")) {
    const href = parseAttributes(anchorTag).href
    if (
      !href ||
      href.startsWith("#") ||
      /^(?:mailto|tel|sms|javascript):/i.test(href)
    ) {
      continue
    }
    let internalRoute
    if (href.startsWith("/")) {
      internalRoute = normalizeRoute(href)
    } else {
      try {
        const parsed = new URL(href)
        if (parsed.origin !== SITE_ORIGIN) continue
        internalRoute = normalizeRoute(parsed.pathname)
      } catch {
        continue
      }
    }
    if (
      !knownRoutes.has(internalRoute) &&
      !redirectRoutes.has(internalRoute) &&
      !/\.[a-z0-9]+$/i.test(internalRoute)
    ) {
      addIssue(
        issues,
        "errors",
        "Internal HTML consistency",
        route,
        file,
        `Internal link points to an unknown route: "${href}".`,
      )
    }
  }

  const blogImageIssues = validateBlogImages({
    html,
    route,
    file,
    article,
    assetRoot,
  })
  issues.errors.push(...blogImageIssues.errors)
  issues.warnings.push(...blogImageIssues.warnings)

  return { ...issues, observed }
}

export function validateNotFoundPage({ html, file, expectedMeta }) {
  const issues = createIssues()
  const route = "(404)"
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(
    (match) => decodeHtml(match[1].replace(/<[^>]*>/g, "").trim()),
  )

  if (titles.length !== 1 || titles[0] !== expectedMeta.title) {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      route,
      file,
      `404 title must be "${expectedMeta.title}".`,
    )
  }

  const description = requireSingleValue({
    items: getMeta(html, "name", "description"),
    valueKey: "content",
    label: "404 meta description",
    category: "Not-found page",
    route,
    file,
    issues,
  })
  if (description && description !== expectedMeta.description) {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      route,
      file,
      "404 meta description does not match centralized metadata.",
    )
  }

  const robots = requireSingleValue({
    items: getMeta(html, "name", "robots"),
    valueKey: "content",
    label: "404 robots directive",
    category: "Not-found page",
    route,
    file,
    issues,
  })
  const directives = new Set(
    (robots ?? "")
      .toLowerCase()
      .split(",")
      .map((directive) => directive.trim())
      .filter(Boolean),
  )
  if (!directives.has("noindex") || !directives.has("follow")) {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      route,
      file,
      '404 robots directive must contain "noindex, follow".',
    )
  }

  if (getCanonicalLinks(html).length > 0) {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      route,
      file,
      "404 page must not contain a canonical URL.",
    )
  }

  const forbiddenMetadata = [
    ...getMeta(html, "property", "og:url"),
    ...getMeta(html, "property", "article:published_time"),
    ...getMeta(html, "property", "article:modified_time"),
  ]
  if (
    forbiddenMetadata.length > 0 ||
    /"@type"\s*:\s*"(?:BlogPosting|BreadcrumbList)"/.test(html)
  ) {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      route,
      file,
      "404 page contains canonical article or breadcrumb metadata.",
    )
  }

  const h1Text = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(
    (match) => decodeHtml(match[1].replace(/<[^>]*>/g, "").trim()),
  )
  if (h1Text.length !== 1 || h1Text[0] !== "Página no encontrada") {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      route,
      file,
      '404 page must contain exactly one "Página no encontrada" H1.',
    )
  }

  return issues
}

export function validateUniqueMetadata(pageResults) {
  const issues = createIssues()
  const fields = [
    ["title", "Title tags"],
    ["description", "Meta descriptions"],
    ["canonical", "Canonical URLs"],
  ]
  for (const [field, category] of fields) {
    const seen = new Map()
    for (const result of pageResults) {
      const value = result.observed[field]
      if (!value) continue
      const previous = seen.get(value)
      if (previous && previous.route !== result.observed.route) {
        addIssue(
          issues,
          "errors",
          category,
          result.observed.route,
          result.observed.file,
          `Duplicate ${field} is also used by ${previous.route}: "${value}".`,
        )
      } else {
        seen.set(value, result.observed)
      }
    }
  }
  return issues
}

export function validateSitemap({
  xml,
  file,
  expectedRoutes,
  generatedRoutes,
  allArticles,
  expectedLastModifiedByRoute = new Map(),
  redirectRoutes = new Set(["/cobertura"]),
  validationDate = new Date(),
}) {
  const issues = createIssues()
  const route = "(sitemap)"
  const sitemapRoutes = new Set()
  const xmlValidation = XMLValidator.validate(xml)
  if (xmlValidation !== true) {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      route,
      file,
      `Sitemap XML is malformed: ${xmlValidation.err.msg} (line ${xmlValidation.err.line}, column ${xmlValidation.err.col}).`,
    )
    return { ...issues, sitemapRoutes }
  }

  let document
  try {
    document = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: false,
      trimValues: true,
      isArray: (tagName, jPath) => jPath === "urlset.url",
    }).parse(xml)
  } catch (error) {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      route,
      file,
      `Sitemap XML could not be parsed: ${error.message}`,
    )
    return { ...issues, sitemapRoutes }
  }

  const urlset = document?.urlset
  if (!urlset || typeof urlset !== "object" || Array.isArray(urlset)) {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      route,
      file,
      "Sitemap must contain exactly one urlset root element.",
    )
    return { ...issues, sitemapRoutes }
  }
  if (urlset["@_xmlns"] !== "http://www.sitemaps.org/schemas/sitemap/0.9") {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      route,
      file,
      `Sitemap uses an incorrect namespace: "${urlset["@_xmlns"] ?? ""}".`,
    )
  }

  const entries = Array.isArray(urlset.url)
    ? urlset.url
    : urlset.url
      ? [urlset.url]
      : []
  const sitemapEntries = []
  for (const [index, entry] of entries.entries()) {
    if (
      !entry ||
      typeof entry !== "object" ||
      Array.isArray(entry) ||
      typeof entry.loc !== "string" ||
      !entry.loc.trim()
    ) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap URL entry ${index + 1} is missing a non-empty loc element.`,
      )
      continue
    }
    let lastModified
    if (Object.hasOwn(entry, "lastmod")) {
      if (typeof entry.lastmod !== "string" || !entry.lastmod.trim()) {
        addIssue(
          issues,
          "errors",
          "Sitemap",
          route,
          file,
          `Sitemap URL entry ${index + 1} has an invalid lastmod element.`,
        )
      } else {
        lastModified = entry.lastmod.trim()
      }
    }
    sitemapEntries.push({
      loc: entry.loc.trim(),
      lastModified,
    })
  }

  const urls = sitemapEntries.map((entry) => entry.loc)
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index)
  for (const duplicate of new Set(duplicates)) {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      route,
      file,
      `Duplicate sitemap URL: "${duplicate}".`,
    )
  }

  for (const { loc: value, lastModified } of sitemapEntries) {
    let parsed
    try {
      parsed = new URL(value)
    } catch {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap contains a non-absolute URL: "${value}".`,
      )
      continue
    }
    if (parsed.origin !== SITE_ORIGIN) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap URL must use ${SITE_ORIGIN}: "${value}".`,
      )
    }
    if (parsed.search || parsed.hash) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap URL contains a query string or fragment: "${value}".`,
      )
    }
    const sitemapRoute = normalizeRoute(parsed.pathname)
    sitemapRoutes.add(sitemapRoute)
    if (value !== canonicalForRoute(sitemapRoute)) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap URL does not match the normalized canonical URL for "${sitemapRoute}": "${value}".`,
      )
    }
    if (sitemapRoute !== "/" && parsed.pathname.endsWith("/")) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap URL has an unintended trailing slash: "${value}".`,
      )
    }
    if (!generatedRoutes.has(sitemapRoute)) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap URL has no generated page: "${value}".`,
      )
    }
    if (redirectRoutes.has(sitemapRoute)) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Redirect route is incorrectly included: "${sitemapRoute}".`,
      )
    }

    const expectedLastModified = expectedLastModifiedByRoute.get(sitemapRoute)
    if (lastModified) {
      if (!isValidIsoDate(lastModified)) {
        addIssue(
          issues,
          "errors",
          "Sitemap",
          route,
          file,
          `Sitemap lastmod is not valid ISO 8601 for "${sitemapRoute}": "${lastModified}".`,
        )
      } else if (Date.parse(lastModified) > validationDate.getTime()) {
        addIssue(
          issues,
          "errors",
          "Sitemap",
          route,
          file,
          `Sitemap lastmod is in the future for "${sitemapRoute}": "${lastModified}".`,
        )
      }

      if (expectedLastModified === undefined) {
        addIssue(
          issues,
          "errors",
          "Sitemap",
          route,
          file,
          `Sitemap lastmod has no explicitly maintained source for "${sitemapRoute}".`,
        )
      } else if (lastModified !== expectedLastModified) {
        addIssue(
          issues,
          "errors",
          "Sitemap",
          route,
          file,
          `Sitemap lastmod does not match maintained metadata for "${sitemapRoute}"; expected "${expectedLastModified}", found "${lastModified}".`,
        )
      }
    } else if (expectedLastModified !== undefined) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Sitemap lastmod is missing for "${sitemapRoute}"; expected "${expectedLastModified}".`,
      )
    }
  }

  const validationDay = validationDate.toISOString().slice(0, 10)
  if (
    sitemapEntries.length > 0 &&
    sitemapEntries.every(
      ({ lastModified }) => lastModified?.slice(0, 10) === validationDay,
    )
  ) {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      route,
      file,
      `Every sitemap lastmod is identical to the build date "${validationDay}".`,
    )
  }

  for (const expectedRoute of expectedRoutes) {
    if (!sitemapRoutes.has(expectedRoute)) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Expected route is missing from the sitemap: "${expectedRoute}".`,
      )
    }
  }

  const unpublishedArticleRoutes = allArticles
    .filter((article) => article.published !== true)
    .map((article) => normalizeRoute(`/blog/${article.slug}`))
  for (const unpublishedRoute of unpublishedArticleRoutes) {
    if (sitemapRoutes.has(unpublishedRoute)) {
      addIssue(
        issues,
        "errors",
        "Sitemap",
        route,
        file,
        `Unpublished article is incorrectly included: "${unpublishedRoute}".`,
      )
    }
  }

  return { ...issues, sitemapRoutes }
}

function validateArticles(articles, publishedArticles, categories, issues) {
  const seenSlugs = new Set()
  for (const article of publishedArticles) {
    const route = normalizeRoute(`/blog/${article.slug}`)
    const file = "(article data)"
    if (!article.slug?.trim() || seenSlugs.has(article.slug)) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        `Published article slug is missing or duplicated: "${article.slug ?? ""}".`,
      )
    }
    seenSlugs.add(article.slug)
    if (!article.title?.trim()) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        "Published article title is empty.",
      )
    }
    if (!article.description?.trim()) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        "Published article description is empty.",
      )
    }
    if (
      typeof article.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(article.date) ||
      Number.isNaN(Date.parse(`${article.date}T00:00:00Z`))
    ) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        `Published article has an invalid publication date: "${article.date ?? ""}".`,
      )
    }
    if (
      article.dateModified !== undefined &&
      !isValidIsoDate(article.dateModified)
    ) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        `Published article has an invalid modification date: "${article.dateModified}".`,
      )
    }
    if (!categories.includes(article.category)) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        `Published article has an invalid category: "${article.category}".`,
      )
    }
    if (
      article.featuredImage !== undefined &&
      (typeof article.featuredImage !== "string" ||
        !article.featuredImage.trim())
    ) {
      addIssue(
        issues,
        "errors",
        "Blog article metadata",
        route,
        file,
        "Featured image must be a non-empty URL when supplied.",
      )
    }
    if (article.featuredImage) {
      if (!article.featuredImageAlt?.trim()) {
        addIssue(
          issues,
          "errors",
          "Blog image SEO",
          route,
          file,
          "Published article featured image requires descriptive alt text.",
        )
      }
      if (
        !Number.isInteger(article.featuredImageWidth) ||
        article.featuredImageWidth <= 0 ||
        !Number.isInteger(article.featuredImageHeight) ||
        article.featuredImageHeight <= 0
      ) {
        addIssue(
          issues,
          "errors",
          "Blog image SEO",
          route,
          file,
          "Published article featured image requires positive intrinsic dimensions.",
        )
      }
    }
  }

  if (articles.length === 0 && publishedArticles.length !== 0) {
    addIssue(
      issues,
      "errors",
      "Blog article metadata",
      "(articles)",
      "(article data)",
      "Published article resolver is inconsistent with the article collection.",
    )
  }
}

function printReport({ routeCount, articleCount, errors, warnings }) {
  console.log("\nSEO VALIDATION REPORT")
  console.log("=====================\n")
  console.log(`Routes inspected: ${routeCount}`)
  console.log(`Published blog articles: ${articleCount}\n`)

  console.log("PASS:")
  const categoriesWithIssues = new Set(
    [...errors, ...warnings].map((issue) => issue.category),
  )
  for (const category of REPORT_CATEGORIES) {
    if (!categoriesWithIssues.has(category)) console.log(`- ${category}`)
  }

  console.log("\nERRORS:")
  if (errors.length === 0) console.log("- None")
  for (const issue of errors) {
    console.log(
      `- [${issue.category}] ${issue.route} (${issue.file}): ${issue.message}`,
    )
  }

  console.log("\nWARNINGS:")
  if (warnings.length === 0) console.log("- None")
  for (const issue of warnings) {
    console.log(
      `- [${issue.category}] ${issue.route} (${issue.file}): ${issue.message}`,
    )
  }

  console.log(`\nRESULT:\n${errors.length === 0 ? "PASS" : "FAIL"}\n`)
}

export async function runSeoValidation({
  distDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../dist",
  ),
  print = true,
} = {}) {
  const issues = createIssues()
  const serverEntry = path.join(distDir, "server/entry-server.js")
  if (!fs.existsSync(distDir) || !fs.existsSync(serverEntry)) {
    addIssue(
      issues,
      "errors",
      "Internal HTML consistency",
      "(build)",
      path.relative(process.cwd(), serverEntry),
      "Production output is missing. Run the production build before SEO validation.",
    )
    if (print) {
      printReport({ routeCount: 0, articleCount: 0, ...issues })
    }
    return { routeCount: 0, articleCount: 0, ...issues }
  }

  const serverModule = await import(
    `${pathToFileURL(serverEntry).href}?seo-validation=${Date.now()}`
  )
  const {
    articles,
    CATEGORIES,
    getPublishedArticles,
    getRouteMeta,
    notFoundMeta,
    routeMeta,
    validatePublishedArticles,
  } = serverModule
  const publishedArticles = validatePublishedArticles(getPublishedArticles())
  validateArticles(articles, publishedArticles, CATEGORIES, issues)

  const articleByRoute = new Map(
    publishedArticles.map((article) => [
      normalizeRoute(`/blog/${article.slug}`),
      article,
    ]),
  )
  const expectedRoutes = new Set([
    ...Object.keys(routeMeta).map(normalizeRoute),
    ...articleByRoute.keys(),
  ])
  const expectedLastModifiedByRoute = new Map([
    ...Object.entries(routeMeta)
      .filter(([, meta]) => meta.lastModified)
      .map(([route, meta]) => [normalizeRoute(route), meta.lastModified]),
    ...publishedArticles
      .filter((article) => article.dateModified)
      .map((article) => [
        normalizeRoute(`/blog/${article.slug}`),
        article.dateModified,
      ]),
  ])
  const knownRoutes = new Set(expectedRoutes)

  const htmlFiles = listHtmlFiles(distDir)
  const generatedFilesByRoute = new Map(
    htmlFiles.map((file) => [routeFromHtmlFile(distDir, file), file]),
  )
  const generatedRoutes = new Set(generatedFilesByRoute.keys())
  for (const expectedRoute of expectedRoutes) {
    if (!generatedFilesByRoute.has(expectedRoute)) {
      addIssue(
        issues,
        "errors",
        "Internal HTML consistency",
        expectedRoute,
        "(missing)",
        "Expected indexable route was not generated.",
      )
    }
  }
  for (const generatedRoute of generatedRoutes) {
    if (!expectedRoutes.has(generatedRoute)) {
      addIssue(
        issues,
        "errors",
        "Internal HTML consistency",
        generatedRoute,
        path.relative(process.cwd(), generatedFilesByRoute.get(generatedRoute)),
        "Generated HTML does not correspond to centralized route metadata or a published article.",
      )
    }
  }

  const notFoundPath = path.join(distDir, "404.html")
  if (!fs.existsSync(notFoundPath)) {
    addIssue(
      issues,
      "errors",
      "Not-found page",
      "(404)",
      path.relative(process.cwd(), notFoundPath),
      "404.html is missing from production output.",
    )
  } else {
    const notFoundIssues = validateNotFoundPage({
      html: fs.readFileSync(notFoundPath, "utf8"),
      file: path.relative(process.cwd(), notFoundPath),
      expectedMeta: notFoundMeta,
    })
    issues.errors.push(...notFoundIssues.errors)
    issues.warnings.push(...notFoundIssues.warnings)
  }

  const pageResults = []
  for (const route of [...expectedRoutes].sort()) {
    const filePath = generatedFilesByRoute.get(route)
    if (!filePath) continue
    const relativeFile = path.relative(process.cwd(), filePath)
    const pageResult = validatePage({
      route,
      file: relativeFile,
      html: fs.readFileSync(filePath, "utf8"),
      expectedMeta: getRouteMeta(route),
      article: articleByRoute.get(route),
      knownRoutes,
      assetRoot: distDir,
    })
    pageResults.push(pageResult)
    issues.errors.push(...pageResult.errors)
    issues.warnings.push(...pageResult.warnings)
  }

  const uniqueIssues = validateUniqueMetadata(pageResults)
  issues.errors.push(...uniqueIssues.errors)
  issues.warnings.push(...uniqueIssues.warnings)

  const robotsPath = path.join(distDir, "robots.txt")
  if (!fs.existsSync(robotsPath)) {
    addIssue(
      issues,
      "errors",
      "Robots directives",
      "(robots.txt)",
      path.relative(process.cwd(), robotsPath),
      "robots.txt is missing from production output.",
    )
  } else {
    const robots = fs.readFileSync(robotsPath, "utf8")
    if (
      !/^User-agent:\s*\*/im.test(robots) ||
      !/^Allow:\s*\/\s*$/im.test(robots)
    ) {
      addIssue(
        issues,
        "errors",
        "Robots directives",
        "(robots.txt)",
        path.relative(process.cwd(), robotsPath),
        "robots.txt does not explicitly allow the public site.",
      )
    }
    const sitemapDirectives = [
      ...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim),
    ].map((match) => match[1])
    if (
      sitemapDirectives.length !== 1 ||
      sitemapDirectives[0] !== SITEMAP_URL
    ) {
      addIssue(
        issues,
        "errors",
        "Robots directives",
        "(robots.txt)",
        path.relative(process.cwd(), robotsPath),
        `robots.txt must reference exactly "${SITEMAP_URL}".`,
      )
    }
  }

  const sitemapPath = path.join(distDir, "sitemap.xml")
  if (!fs.existsSync(sitemapPath)) {
    addIssue(
      issues,
      "errors",
      "Sitemap",
      "(sitemap)",
      path.relative(process.cwd(), sitemapPath),
      "sitemap.xml is missing from production output.",
    )
  } else {
    const sitemapResult = validateSitemap({
      xml: fs.readFileSync(sitemapPath, "utf8"),
      file: path.relative(process.cwd(), sitemapPath),
      expectedRoutes,
      generatedRoutes,
      allArticles: articles,
      expectedLastModifiedByRoute,
    })
    issues.errors.push(...sitemapResult.errors)
    issues.warnings.push(...sitemapResult.warnings)
    for (const articleRoute of articleByRoute.keys()) {
      if (!sitemapResult.sitemapRoutes.has(articleRoute)) {
        addIssue(
          issues,
          "errors",
          "Blog article metadata",
          articleRoute,
          path.relative(process.cwd(), sitemapPath),
          "Published article is missing from the sitemap.",
        )
      }
    }
  }

  const result = {
    routeCount: pageResults.length,
    articleCount: publishedArticles.length,
    ...issues,
  }
  if (print) printReport(result)
  return result
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  const result = await runSeoValidation()
  if (result.errors.length > 0) process.exitCode = 1
}
