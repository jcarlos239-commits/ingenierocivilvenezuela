#!/usr/bin/env node
/**
 * Static prerender script — runs after `vite build` and the SSR build.
 * For each route:
 *   1. Calls the SSR entry-server to get the real React-rendered HTML.
 *   2. Injects that HTML into <div id="root">...</div>.
 *   3. Injects route-specific <title>, <meta>, <link rel="canonical">,
 *      og:*, and Twitter card tags into the <head>.
 *   4. Writes dist/<route>/index.html (or dist/index.html for /).
 *   5. Generates dist/sitemap.xml from the same route and canonical metadata.
 *
 * No new runtime dependencies — plain Node.js ESM.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "../dist")
const serverEntry = path.resolve(distDir, "server/entry-server.js")
const BASE_URL = "https://ingenierocivilvenezuela.com"
const OG_IMAGE = "https://ingenierocivilvenezuela.com/og-image.webp"
const OG_IMAGE_ALT = "Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón"

// Static paths remain explicit. Published article paths are discovered from
// src/data/articles.ts through the SSR bundle below.
const staticRoutePaths = [
  "/",
  "/servicios",
  "/como-trabajamos",
  "/sobre-mi",
  "/blog",
  "/servicios/proyectos",
  "/servicios/construccion-obras-civiles",
  "/servicios/remodelaciones-ampliaciones",
  "/servicios/avaluos-peritajes-tecnicos",
  "/servicios/patologia-estructural",
  "/servicios/estabilizacion-taludes",
]

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function injectContent(html, renderedHtml) {
  // Extract any React Router hydration script from the end of renderedHtml
  // StaticRouterProvider appends: <script>window.__staticRouterHydrationData = ...</script>
  // It must live OUTSIDE #root so React doesn't try to hydrate it.
  const hydrationScriptMatch = renderedHtml.match(
    /(<script[^>]*>window\.__staticRouterHydrationData[\s\S]*?<\/script>)\s*$/,
  )

  let appMarkup = renderedHtml
  let hydrationScript = ""

  if (hydrationScriptMatch) {
    hydrationScript = hydrationScriptMatch[1]
    appMarkup = renderedHtml.slice(0, hydrationScriptMatch.index)
  }

  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${appMarkup}</div>\n    ${hydrationScript}`,
  )
}

export function injectMeta(html, meta, article) {
  const { title, description, canonical } = meta
  const isArticle = Boolean(article)
  const socialImage = article?.featuredImage
    ? new URL(article.featuredImage, BASE_URL).href
    : OG_IMAGE
  const socialImageAlt = article?.featuredImage
    ? article.featuredImageAlt
    : OG_IMAGE_ALT
  const eTitle = escapeAttr(title)
  const eDesc = escapeAttr(description)
  const eCanonical = escapeAttr(canonical)
  const eImage = escapeAttr(socialImage)
  const eImageAlt = escapeAttr(socialImageAlt)
  const imageDetails = article?.featuredImage
    ? `
  <meta property="og:image:width" content="${article.featuredImageWidth}" />
  <meta property="og:image:height" content="${article.featuredImageHeight}" />`
    : `
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />`
  const articleDetails = article
    ? `
  <meta property="article:published_time" content="${escapeAttr(article.date)}" />${
    article.dateModified
      ? `
  <meta property="article:modified_time" content="${escapeAttr(article.dateModified)}" />`
      : ""
  }`
    : ""

  // Replace <title>
  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${eTitle}</title>`)

  // Build injected meta block to insert before </head>
  const injected = `
  <meta name="description" content="${eDesc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${eCanonical}" />
  <meta property="og:title" content="${eTitle}" />
  <meta property="og:description" content="${eDesc}" />
  <meta property="og:url" content="${eCanonical}" />
  <meta property="og:type" content="${isArticle ? "article" : "website"}" />
  <meta property="og:image" content="${eImage}" />
  <meta property="og:image:alt" content="${eImageAlt}" />${imageDetails}${articleDetails}
  <meta property="og:site_name" content="Ing. Juan Carlos Mogollón" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${eTitle}" />
  <meta name="twitter:description" content="${eDesc}" />
  <meta name="twitter:image" content="${eImage}" />
  <meta name="twitter:image:alt" content="${eImageAlt}" />`

  // Remove any existing og:/twitter:/description/canonical tags already in the HTML
  result = result
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:title"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:description"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:url"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:type"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:type"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:width"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:height"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:alt"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:site_name"[^>]*>/gi, "")
    .replace(/<meta\s+property="article:published_time"[^>]*>/gi, "")
    .replace(/<meta\s+property="article:modified_time"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:card"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:title"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:description"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:image"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:image:alt"[^>]*>/gi, "")

  result = result.replace("</head>", `${injected}\n</head>`)
  return result
}

function injectNotFoundMeta(html, meta) {
  const eTitle = escapeAttr(meta.title)
  const eDesc = escapeAttr(meta.description)
  const injected = `
  <meta name="description" content="${eDesc}" />
  <meta name="robots" content="noindex, follow" />
  <meta property="og:title" content="${eTitle}" />
  <meta property="og:description" content="${eDesc}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:image:alt" content="${escapeAttr(OG_IMAGE_ALT)}" />
  <meta property="og:site_name" content="Ing. Juan Carlos Mogollón" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${eTitle}" />
  <meta name="twitter:description" content="${eDesc}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <meta name="twitter:image:alt" content="${escapeAttr(OG_IMAGE_ALT)}" />`

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${eTitle}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+property="article:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace("</head>", `${injected}\n</head>`)
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function createRoutePaths(
  staticPaths,
  publishedArticles,
  normalizePathname,
) {
  return [
    ...new Set(
      [
        ...staticPaths,
        ...publishedArticles.map((article) => `/blog/${article.slug}`),
      ].map((routePath) => normalizePathname(routePath)),
    ),
  ]
}

export function createSitemapXml({ routePaths, articleByPath, getRouteMeta }) {
  const entries = routePaths
    .map((routePath) => {
      const meta = getRouteMeta(routePath)
      const article = articleByPath.get(routePath)
      const lastModified = article?.dateModified ?? meta.lastModified
      return `  <url>
    <loc>${escapeXml(meta.canonical)}</loc>${
      lastModified
        ? `
    <lastmod>${escapeXml(lastModified)}</lastmod>`
        : ""
    }
  </url>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

function writeSitemap(routePaths, articleByPath, getRouteMeta) {
  const sitemap = createSitemapXml({
    routePaths,
    articleByPath,
    getRouteMeta,
  })
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf-8")
}

function verifyArticleOutput(
  html,
  renderedHtml,
  article,
  meta,
  sanitizeArticleHtml,
) {
  const expectedCanonical = `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`
  const bodyIsRendered = article.content
    ? renderedHtml.includes(sanitizeArticleHtml(article.content))
    : renderedHtml.includes(escapeAttr(article.description))

  const checks = [
    ["title", html.includes(`<title>${escapeAttr(meta.title)}</title>`)],
    [
      "description",
      html.includes(
        `name="description" content="${escapeAttr(meta.description)}"`,
      ),
    ],
    ["canonical", html.includes(expectedCanonical)],
    [
      "article H1",
      renderedHtml.includes("<h1") &&
        renderedHtml.includes(escapeAttr(article.title)),
    ],
    ["article body", bodyIsRendered],
    ["BlogPosting JSON-LD", renderedHtml.includes('"@type":"BlogPosting"')],
    [
      "BreadcrumbList JSON-LD",
      renderedHtml.includes('"@type":"BreadcrumbList"'),
    ],
  ]
  const failedChecks = checks
    .filter(([, passed]) => !passed)
    .map(([name]) => name)

  if (failedChecks.length > 0) {
    throw new Error(
      `Prerender verification failed for /blog/${article.slug}: ${failedChecks.join(", ")}`,
    )
  }
}

async function prerender() {
  // Load article data and metadata resolvers from the SSR bundle so the build
  // uses exactly the same source as the application.
  const {
    render,
    renderRequest,
    getRouteMeta,
    getPublishedArticles,
    notFoundMeta,
    normalizePathname,
    sanitizeArticleHtml,
    validatePublishedArticles,
  } = await import(serverEntry)
  const publishedArticles = validatePublishedArticles(getPublishedArticles())
  const routePaths = createRoutePaths(
    staticRoutePaths,
    publishedArticles,
    normalizePathname,
  )
  const articleByPath = new Map(
    publishedArticles.map((article) => [
      normalizePathname(`/blog/${article.slug}`),
      article,
    ]),
  )
  const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8")

  for (const routePath of routePaths) {
    try {
      const meta = getRouteMeta(routePath)

      const renderedHtml = await render(routePath)
      const article = articleByPath.get(routePath)
      let html = injectContent(baseHtml, renderedHtml)
      html = injectMeta(html, meta, article)
      if (article) {
        verifyArticleOutput(
          html,
          renderedHtml,
          article,
          meta,
          sanitizeArticleHtml,
        )
      }

      if (routePath === "/") {
        fs.writeFileSync(path.join(distDir, "index.html"), html, "utf-8")
        console.log("Prerendered: /")
      } else {
        const routeDir = path.join(distDir, routePath.slice(1))
        fs.mkdirSync(routeDir, { recursive: true })
        fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8")
        console.log(`Prerendered: ${routePath}`)
      }
    } catch (err) {
      console.error(`ERROR prerendering ${routePath}:`, err)
      throw err
    }
  }

  const notFoundResponse = await renderRequest("/__not-found")
  if (notFoundResponse.status !== 404) {
    throw new Error(
      `Expected HTTP 404 while generating 404.html; received ${notFoundResponse.status}`,
    )
  }
  const notFoundMarkup = await notFoundResponse.text()
  const notFoundHtml = injectNotFoundMeta(
    injectContent(baseHtml, notFoundMarkup),
    notFoundMeta,
  )
  fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf-8")

  writeSitemap(routePaths, articleByPath, getRouteMeta)
  console.log(
    `\nPrerendering complete. ${routePaths.length} routes written to dist/.`,
  )
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) await prerender()
