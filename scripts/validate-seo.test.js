import assert from "node:assert/strict"
import path from "node:path"
import { describe, it } from "node:test"
import {
  validateBlogImages,
  validateNotFoundPage,
  validatePage,
  validateSitemap,
  validateUniqueMetadata,
} from "./validate-seo.js"
import { createRoutePaths, createSitemapXml, injectMeta } from "./prerender.js"

const ORIGIN = "https://ingenierocivilvenezuela.com"
const expectedMeta = {
  title: "Página de prueba SEO con título descriptivo y único",
  description:
    "Descripción de prueba en español para validar correctamente los metadatos SEO de una página pública, con contenido natural, específico y suficientemente descriptivo.",
  canonical: `${ORIGIN}/prueba`,
}
const notFoundMeta = {
  title: "Página no encontrada | Obras Civiles en Venezuela",
  description:
    "La página que busca no está disponible. Consulte nuestros servicios de ingeniería civil en Caracas, Miranda y La Guaira.",
}

function validHtml(meta = expectedMeta) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${meta.canonical}">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${meta.canonical}">
    <meta property="og:image" content="${ORIGIN}/og-image.webp">
    <meta property="og:image:alt" content="Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${ORIGIN}/og-image.webp">
    <meta name="twitter:image:alt" content="Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón">
  </head>
  <body>
    <h1>Página de prueba</h1>
    <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"${ORIGIN}/#organization","url":"${ORIGIN}/"},{"@type":"Person","@id":"${ORIGIN}/#person","url":"${ORIGIN}/sobre-mi"},{"@type":"WebSite","@id":"${ORIGIN}/#website","url":"${ORIGIN}/"}]}</script>
  </body>
</html>`
}

function validateFixture(html, meta = expectedMeta, route = "/prueba") {
  return validatePage({
    route,
    file: "fixture.html",
    html,
    expectedMeta: meta,
    knownRoutes: new Set([route]),
  })
}

function normalizePathname(pathname) {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/"
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`
  return withLeadingSlash === "/"
    ? "/"
    : withLeadingSlash.replace(/\/+$/, "") || "/"
}

function generateSitemap({ staticMeta, articles = [] }) {
  const publishedArticles = articles.filter(
    (article) => article.published === true,
  )
  const routePaths = createRoutePaths(
    Object.keys(staticMeta),
    publishedArticles,
    normalizePathname,
  )
  const articleByPath = new Map(
    publishedArticles.map((article) => [`/blog/${article.slug}`, article]),
  )
  const getRouteMeta = (route) =>
    staticMeta[route] ?? {
      canonical: `${ORIGIN}${route}`,
    }

  return {
    routePaths,
    xml: createSitemapXml({
      routePaths,
      articleByPath,
      getRouteMeta,
    }),
  }
}

describe("SEO page validation", () => {
  it("accepts a complete valid page", () => {
    const result = validateFixture(validHtml())
    assert.deepEqual(result.errors, [])
  })

  it("accepts article-specific metadata in prerendered HTML", () => {
    const article = {
      slug: "articulo-prerenderizado",
      title: "Artículo prerenderizado",
      description: "Descripción específica del artículo prerenderizado.",
      date: "2026-03-01",
      dateModified: "2026-03-15",
      category: "Construcción de Obras Civiles",
      featuredImage: "/images/articulo-prerenderizado.webp",
      featuredImageAlt:
        "Inspección técnica de una estructura de concreto armado",
      featuredImageWidth: 1200,
      featuredImageHeight: 630,
      published: true,
    }
    const meta = {
      title: `${article.title} | Blog de Ingeniería Civil`,
      description: article.description,
      canonical: `${ORIGIN}/blog/${article.slug}`,
    }
    const image = `${ORIGIN}${article.featuredImage}`
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${ORIGIN}/#organization`,
          url: `${ORIGIN}/`,
        },
        {
          "@type": "Person",
          "@id": `${ORIGIN}/#person`,
          url: `${ORIGIN}/sobre-mi`,
        },
        {
          "@type": "WebSite",
          "@id": `${ORIGIN}/#website`,
          url: `${ORIGIN}/`,
        },
        {
          "@type": "BlogPosting",
          "@id": `${meta.canonical}#blogposting`,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": meta.canonical,
          },
          headline: article.title,
          description: article.description,
          image: [image],
          datePublished: article.date,
          dateModified: article.dateModified,
          author: {
            "@id": `${ORIGIN}/#person`,
          },
          publisher: {
            "@id": `${ORIGIN}/#organization`,
          },
          inLanguage: "es",
          isPartOf: {
            "@id": `${ORIGIN}/#website`,
          },
          articleSection: article.category,
          url: meta.canonical,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Inicio",
              item: `${ORIGIN}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${ORIGIN}/blog`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: meta.canonical,
            },
          ],
        },
      ],
    }
    const html = validHtml(meta)
      .replace(
        '<meta property="og:type" content="website">',
        '<meta property="og:type" content="article">',
      )
      .replaceAll(`${ORIGIN}/og-image.webp`, image)
      .replaceAll(
        "Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón",
        article.featuredImageAlt,
      )
      .replace(
        "</head>",
        `<meta property="article:published_time" content="${article.date}"><meta property="article:modified_time" content="${article.dateModified}"></head>`,
      )
      .replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>`,
      )
      .replace(
        "</body>",
        `<img src="${article.featuredImage}" alt="${article.featuredImageAlt}" width="${article.featuredImageWidth}" height="${article.featuredImageHeight}" loading="eager" fetchPriority="high" decoding="async" data-blog-image="featured"></body>`,
      )
    const result = validatePage({
      route: `/blog/${article.slug}`,
      file: "article-fixture.html",
      html,
      expectedMeta: meta,
      article,
      knownRoutes: new Set([`/blog/${article.slug}`]),
    })
    assert.deepEqual(result.errors, [])
  })

  it("injects complete article image metadata into initial HTML", () => {
    const article = {
      slug: "inspeccion-estructural",
      title: "Inspección estructural",
      description: "Descripción técnica de la inspección estructural.",
      date: "2020-03-10",
      category: "Patología Estructural",
      featuredImage: "/images/inspeccion-estructural.webp",
      featuredImageAlt:
        "Ingeniero inspeccionando fisuras en una estructura de concreto",
      featuredImageWidth: 1200,
      featuredImageHeight: 800,
      published: true,
    }
    const meta = {
      title: `${article.title} | Blog de Ingeniería Civil`,
      description: article.description,
      canonical: `${ORIGIN}/blog/${article.slug}`,
    }
    const html = injectMeta(validHtml(meta), meta, article)
    const absoluteImage = `${ORIGIN}${article.featuredImage}`

    assert.match(
      html,
      new RegExp(`<meta property="og:image" content="${absoluteImage}" />`),
    )
    assert.match(
      html,
      new RegExp(
        `<meta property="og:image:alt" content="${article.featuredImageAlt}" />`,
      ),
    )
    assert.match(html, /<meta property="og:image:width" content="1200" \/>/)
    assert.match(html, /<meta property="og:image:height" content="800" \/>/)
    assert.match(
      html,
      new RegExp(`<meta name="twitter:image" content="${absoluteImage}" />`),
    )
    assert.match(
      html,
      new RegExp(
        `<meta name="twitter:image:alt" content="${article.featuredImageAlt}" />`,
      ),
    )
  })

  it("detects a missing title", () => {
    const result = validateFixture(
      validHtml().replace(/<title>[\s\S]*?<\/title>/, ""),
    )
    assert.ok(result.errors.some((issue) => issue.category === "Title tags"))
  })

  it("detects a missing meta description", () => {
    const result = validateFixture(
      validHtml().replace(/<meta name="description"[^>]*>/, ""),
    )
    assert.ok(
      result.errors.some((issue) => issue.category === "Meta descriptions"),
    )
  })

  it("warns when a meta description is extremely short", () => {
    const meta = {
      ...expectedMeta,
      description: "Descripción breve para revisión SEO.",
    }
    const result = validateFixture(validHtml(meta), meta)
    assert.ok(
      result.warnings.some(
        (issue) =>
          issue.category === "Meta descriptions" &&
          issue.message.includes("120–160"),
      ),
    )
  })

  it("warns when a meta description exceeds 160 characters", () => {
    const meta = {
      ...expectedMeta,
      description:
        "Descripción extensa en español para comprobar que el validador informa textos superiores al rango recomendado sin convertir esta mejora editorial en un error crítico del proceso de producción.",
    }
    const result = validateFixture(validHtml(meta), meta)
    assert.ok(
      result.warnings.some(
        (issue) =>
          issue.category === "Meta descriptions" &&
          issue.message.includes("120–160"),
      ),
    )
    assert.equal(
      result.errors.some((issue) => issue.category === "Meta descriptions"),
      false,
    )
  })

  it("detects an invalid canonical hostname", () => {
    const result = validateFixture(
      validHtml().replace(
        `href="${expectedMeta.canonical}"`,
        'href="https://example.com/prueba"',
      ),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Canonical URLs" &&
          issue.message.includes("must use"),
      ),
    )
  })

  it("detects canonical query parameters", () => {
    const result = validateFixture(
      validHtml().replace(
        `href="${expectedMeta.canonical}"`,
        `href="${expectedMeta.canonical}?source=test"`,
      ),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Canonical URLs" &&
          issue.message.includes("query string or fragment"),
      ),
    )
  })

  it("detects canonical fragments", () => {
    const result = validateFixture(
      validHtml().replace(
        `href="${expectedMeta.canonical}"`,
        `href="${expectedMeta.canonical}#section"`,
      ),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Canonical URLs" &&
          issue.message.includes("query string or fragment"),
      ),
    )
  })

  it("detects production URLs with nonstandard ports", () => {
    const result = validateFixture(
      validHtml().replace(
        `href="${expectedMeta.canonical}"`,
        'href="https://ingenierocivilvenezuela.com:8443/prueba"',
      ),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Canonical URLs" &&
          issue.message.includes("must use"),
      ),
    )
  })

  it("detects a missing Open Graph image", () => {
    const result = validateFixture(
      validHtml().replace(/<meta property="og:image"[^>]*>/, ""),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Open Graph metadata" &&
          issue.message.includes("og:image"),
      ),
    )
  })

  it("detects missing Twitter card metadata", () => {
    const result = validateFixture(
      validHtml().replace(/<meta name="twitter:card"[^>]*>/, ""),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Twitter metadata" &&
          issue.message.includes("twitter:card"),
      ),
    )
  })

  it("detects incorrect robots directives", () => {
    const result = validateFixture(
      validHtml().replace(
        'content="index, follow"',
        'content="noindex, nofollow"',
      ),
    )
    assert.ok(
      result.errors.some(
        (issue) =>
          issue.category === "Robots directives" &&
          issue.message.includes("blocking"),
      ),
    )
  })

  it("reports duplicate HTML IDs as warnings", () => {
    const result = validateFixture(
      validHtml().replace(
        "</body>",
        '<div id="duplicate"></div><div id="duplicate"></div></body>',
      ),
    )
    assert.ok(
      result.warnings.some(
        (issue) =>
          issue.category === "Internal HTML consistency" &&
          issue.message.includes('Duplicate id "duplicate"'),
      ),
    )
  })

  it("detects invalid JSON-LD", () => {
    const result = validateFixture(
      validHtml().replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        '<script type="application/ld+json">{"@context":</script>',
      ),
    )
    assert.ok(result.errors.some((issue) => issue.category === "JSON-LD"))
  })

  it("detects duplicate titles and canonicals across routes", () => {
    const secondMeta = {
      ...expectedMeta,
      description: `${expectedMeta.description} Segunda ruta.`,
      canonical: `${ORIGIN}/segunda`,
    }
    const first = validateFixture(validHtml())
    const second = validateFixture(
      validHtml(secondMeta),
      secondMeta,
      "/segunda",
    )
    second.observed.title = first.observed.title
    second.observed.canonical = first.observed.canonical
    const result = validateUniqueMetadata([first, second])
    assert.ok(result.errors.some((issue) => issue.category === "Title tags"))
    assert.ok(
      result.errors.some((issue) => issue.category === "Canonical URLs"),
    )
  })

  it("detects duplicate meta descriptions across routes", () => {
    const secondMeta = {
      ...expectedMeta,
      title: "Segunda página de prueba con título SEO completamente único",
      canonical: `${ORIGIN}/segunda`,
    }
    const first = validateFixture(validHtml())
    const second = validateFixture(
      validHtml(secondMeta),
      secondMeta,
      "/segunda",
    )
    const result = validateUniqueMetadata([first, second])
    assert.ok(
      result.errors.some((issue) => issue.category === "Meta descriptions"),
    )
  })
})

describe("SEO not-found validation", () => {
  function notFoundHtml(extraHead = "") {
    return `<!doctype html>
<html lang="es">
  <head>
    <title>${notFoundMeta.title}</title>
    <meta name="description" content="${notFoundMeta.description}">
    <meta name="robots" content="noindex, follow">
    ${extraHead}
  </head>
  <body><h1>Página no encontrada</h1></body>
</html>`
  }

  it("accepts noindex metadata without a canonical", () => {
    const result = validateNotFoundPage({
      html: notFoundHtml(),
      file: "404.html",
      expectedMeta: notFoundMeta,
    })
    assert.deepEqual(result.errors, [])
  })

  it("rejects an indexable 404 with a homepage canonical", () => {
    const html = notFoundHtml(
      `<link rel="canonical" href="${ORIGIN}/">`,
    ).replace("noindex, follow", "index, follow")
    const result = validateNotFoundPage({
      html,
      file: "404.html",
      expectedMeta: notFoundMeta,
    })

    assert.ok(result.errors.some((issue) => issue.message.includes("noindex")))
    assert.ok(
      result.errors.some((issue) => issue.message.includes("canonical")),
    )
  })
})

describe("SEO blog image validation", () => {
  const article = {
    featuredImage: "/og-image.webp",
    featuredImageAlt: "Inspección técnica de una estructura de concreto armado",
    featuredImageWidth: 1200,
    featuredImageHeight: 630,
  }

  it("accepts consistent featured image metadata and real dimensions", () => {
    const html = `<img src="${article.featuredImage}" alt="${article.featuredImageAlt}" width="1200" height="630" loading="eager" fetchPriority="high" decoding="async" data-blog-image="featured">`
    const result = validateBlogImages({
      html,
      route: "/blog/prueba",
      file: "article.html",
      article,
      assetRoot: path.resolve("public"),
    })

    assert.deepEqual(result.errors, [])
  })

  it("reports generic alt text, broken assets, inaccurate dimensions, and lazy LCP loading", () => {
    const invalidArticle = {
      featuredImage: "/og-image.webp",
      featuredImageAlt: "imagen",
      featuredImageWidth: 100,
      featuredImageHeight: 100,
    }
    const html =
      '<img src="/og-image.webp" alt="imagen" width="100" height="100" loading="lazy" decoding="sync" data-blog-image="featured">' +
      '<img src="/no-existe.webp" alt="Detalle técnico de la obra" width="100" height="100" loading="lazy" decoding="async" data-blog-image="content">'
    const result = validateBlogImages({
      html,
      route: "/blog/prueba",
      file: "article.html",
      article: invalidArticle,
      assetRoot: path.resolve("public"),
    })

    assert.ok(result.errors.some((issue) => issue.message.includes("generic")))
    assert.ok(
      result.errors.some((issue) => issue.message.includes("missing local")),
    )
    assert.ok(
      result.errors.some((issue) =>
        issue.message.includes("do not match the asset dimensions"),
      ),
    )
    assert.ok(
      result.errors.some((issue) => issue.message.includes('loading="eager"')),
    )
    assert.ok(
      result.errors.some((issue) => issue.message.includes('decoding="async"')),
    )
  })

  it("allows explicitly decorative editorial images with lazy loading", () => {
    const html =
      '<img src="/og-image.webp" alt="" width="1200" height="630" loading="lazy" decoding="async" data-blog-image="content">'
    const result = validateBlogImages({
      html,
      route: "/blog/prueba",
      file: "article.html",
      assetRoot: path.resolve("public"),
    })

    assert.deepEqual(result.errors, [])
  })
})

describe("SEO sitemap validation", () => {
  it("generates a static URL without lastmod when no date is maintained", () => {
    const { xml } = generateSitemap({
      staticMeta: {
        "/": { canonical: `${ORIGIN}/` },
      },
    })

    assert.match(xml, new RegExp(`<loc>${ORIGIN}/</loc>`))
    assert.doesNotMatch(xml, /<lastmod>/)
  })

  it("uses a genuine maintained static page modification date", () => {
    const { xml } = generateSitemap({
      staticMeta: {
        "/servicios": {
          canonical: `${ORIGIN}/servicios`,
          lastModified: "2020-05-12",
        },
      },
    })

    assert.match(xml, /<lastmod>2020-05-12<\/lastmod>/)
  })

  it("uses dateModified for a published article", () => {
    const { xml } = generateSitemap({
      staticMeta: {},
      articles: [
        {
          slug: "actualizado",
          published: true,
          dateModified: "2020-06-15",
        },
      ],
    })

    assert.match(xml, new RegExp(`<loc>${ORIGIN}/blog/actualizado</loc>`))
    assert.match(xml, /<lastmod>2020-06-15<\/lastmod>/)
  })

  it("includes a published article without lastmod when dateModified is absent", () => {
    const { xml } = generateSitemap({
      staticMeta: {},
      articles: [{ slug: "sin-actualizacion", published: true }],
    })

    assert.match(xml, new RegExp(`<loc>${ORIGIN}/blog/sin-actualizacion</loc>`))
    assert.doesNotMatch(xml, /<lastmod>/)
  })

  it("excludes unpublished articles and automatically includes new published articles", () => {
    const { routePaths, xml } = generateSitemap({
      staticMeta: {
        "/": { canonical: `${ORIGIN}/` },
      },
      articles: [
        { slug: "borrador", published: false },
        { slug: "nuevo-articulo", published: true },
      ],
    })

    assert.deepEqual(routePaths, ["/", "/blog/nuevo-articulo"])
    assert.doesNotMatch(xml, /borrador/)
    assert.match(xml, /nuevo-articulo/)
  })

  it("detects malformed sitemap XML", () => {
    const result = validateSitemap({
      xml: `<?xml version="1.0"?><urlset><url><loc>${ORIGIN}/</loc></urlset>`,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/"]),
      generatedRoutes: new Set(["/"]),
      allArticles: [],
    })
    assert.ok(
      result.errors.some((issue) => issue.message.includes("malformed")),
    )
  })

  it("detects sitemap URL entries without loc", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><lastmod>2026-01-01</lastmod></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(),
      generatedRoutes: new Set(),
      allArticles: [],
    })
    assert.ok(
      result.errors.some((issue) => issue.message.includes("loc element")),
    )
  })

  it("detects duplicate sitemap URLs", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc></url>
  <url><loc>${ORIGIN}/</loc></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/"]),
      generatedRoutes: new Set(["/"]),
      allArticles: [],
    })
    assert.ok(
      result.errors.some((issue) => issue.message.includes("Duplicate")),
    )
  })

  it("permits a missing lastmod when no maintained date exists", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/"]),
      generatedRoutes: new Set(["/"]),
      allArticles: [],
    })

    assert.deepEqual(result.errors, [])
  })

  it("requires lastmod to match explicitly maintained metadata", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/servicios</loc><lastmod>2020-05-12</lastmod></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/servicios"]),
      generatedRoutes: new Set(["/servicios"]),
      allArticles: [],
      expectedLastModifiedByRoute: new Map([["/servicios", "2020-05-12"]]),
      validationDate: new Date("2020-05-13T00:00:00Z"),
    })

    assert.deepEqual(result.errors, [])
  })

  it("detects invalid and future lastmod values", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc><lastmod>not-a-date</lastmod></url>
  <url><loc>${ORIGIN}/servicios</loc><lastmod>2999-01-01</lastmod></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/", "/servicios"]),
      generatedRoutes: new Set(["/", "/servicios"]),
      allArticles: [],
      expectedLastModifiedByRoute: new Map([
        ["/", "not-a-date"],
        ["/servicios", "2999-01-01"],
      ]),
      validationDate: new Date("2020-05-13T00:00:00Z"),
    })

    assert.ok(
      result.errors.some((issue) => issue.message.includes("valid ISO 8601")),
    )
    assert.ok(
      result.errors.some((issue) => issue.message.includes("in the future")),
    )
  })

  it("detects when every lastmod is identical to the build date", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc><lastmod>2020-05-12</lastmod></url>
  <url><loc>${ORIGIN}/servicios</loc><lastmod>2020-05-12</lastmod></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/", "/servicios"]),
      generatedRoutes: new Set(["/", "/servicios"]),
      allArticles: [],
      expectedLastModifiedByRoute: new Map([
        ["/", "2020-05-12"],
        ["/servicios", "2020-05-12"],
      ]),
      validationDate: new Date("2020-05-12T12:00:00Z"),
    })

    assert.ok(
      result.errors.some((issue) => issue.message.includes("build date")),
    )
  })

  it("detects redirect routes in the sitemap", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/cobertura</loc></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(),
      generatedRoutes: new Set(["/cobertura"]),
      allArticles: [],
    })

    assert.ok(
      result.errors.some((issue) => issue.message.includes("Redirect route")),
    )
  })

  it("detects a published article missing from the sitemap", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/", "/blog/articulo-publicado"]),
      generatedRoutes: new Set(["/", "/blog/articulo-publicado"]),
      allArticles: [{ slug: "articulo-publicado", published: true }],
    })
    assert.ok(
      result.errors.some((issue) =>
        issue.message.includes("/blog/articulo-publicado"),
      ),
    )
  })

  it("detects an unpublished article included in the sitemap", () => {
    const xml = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc></url>
  <url><loc>${ORIGIN}/blog/borrador</loc></url>
</urlset>`
    const result = validateSitemap({
      xml,
      file: "sitemap.xml",
      expectedRoutes: new Set(["/"]),
      generatedRoutes: new Set(["/", "/blog/borrador"]),
      allArticles: [{ slug: "borrador", published: false }],
    })
    assert.ok(
      result.errors.some((issue) =>
        issue.message.includes("Unpublished article"),
      ),
    )
  })
})
