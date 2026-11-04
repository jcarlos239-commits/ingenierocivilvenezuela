import assert from "node:assert/strict"
import { after, before, beforeEach, describe, it } from "node:test"
import { createServer } from "vite"

class FakeElement {
  constructor(tagName, owner) {
    this.tagName = tagName.toLowerCase()
    this.owner = owner
    this.attributes = {}
    this.content = ""
  }

  set name(value) {
    this.attributes.name = value
  }

  get name() {
    return this.attributes.name ?? ""
  }

  set rel(value) {
    this.attributes.rel = value
  }

  get rel() {
    return this.attributes.rel ?? ""
  }

  set href(value) {
    this.attributes.href = value
  }

  get href() {
    return this.attributes.href ?? ""
  }

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  getAttribute(name) {
    return this.attributes[name] ?? null
  }

  remove() {
    const index = this.owner.elements.indexOf(this)
    if (index >= 0) this.owner.elements.splice(index, 1)
  }
}

class FakeDocument {
  constructor() {
    this.title = ""
    this.elements = []
    this.head = {
      appendChild: (element) => {
        this.elements.push(element)
        return element
      },
    }
  }

  createElement(tagName) {
    return new FakeElement(tagName, this)
  }

  querySelectorAll(selector) {
    const match = selector.match(
      /^(meta|link)\[(name|property|rel)="([^"]+)"\]$/,
    )
    if (!match) return []
    const [, tagName, attribute, value] = match
    return this.elements.filter(
      (element) =>
        element.tagName === tagName && element.attributes[attribute] === value,
    )
  }
}

const articleA = {
  slug: "articulo-a",
  title: "Artículo A",
  description: "Descripción específica del artículo A.",
  excerpt: "Resumen A",
  date: "2026-01-10",
  author: "Juan Carlos Mogollón Cabrera",
  category: "Construcción de Obras Civiles",
  featuredImage: "/images/articulo-a.webp",
  featuredImageAlt: "Inspección técnica de una estructura de concreto armado",
  featuredImageWidth: 1200,
  featuredImageHeight: 800,
  published: true,
}

const articleB = {
  ...articleA,
  slug: "articulo-b",
  title: "Artículo B",
  description: "Descripción específica del artículo B.",
  date: "2026-02-15",
  dateModified: "2026-03-01",
  featuredImage: "/images/articulo-b.webp",
  featuredImageAlt:
    "Evaluación de elementos estructurales durante una inspección",
}

let vite
let seo
let prerenderMeta

function meta(name) {
  return globalThis.document.querySelectorAll(`meta[name="${name}"]`)[0]
}

function property(name) {
  return globalThis.document.querySelectorAll(`meta[property="${name}"]`)[0]
}

function canonical() {
  return globalThis.document.querySelectorAll('link[rel="canonical"]')[0]
}

function assertSingleMetadataSet() {
  const selectors = [
    'link[rel="canonical"]',
    'meta[name="description"]',
    'meta[name="robots"]',
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:alt"]',
    'meta[property="og:type"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:url"]',
    'meta[property="og:image"]',
    'meta[property="og:image:alt"]',
    'meta[property="og:image:width"]',
    'meta[property="og:image:height"]',
  ]
  for (const selector of selectors) {
    assert.equal(
      globalThis.document.querySelectorAll(selector).length,
      1,
      selector,
    )
  }
}

function assertArticle(article) {
  const expectedCanonical = `https://www.ingenierocivilvenezuela.com/blog/${article.slug}`
  const expectedImage = `https://www.ingenierocivilvenezuela.com${article.featuredImage}`
  assert.equal(property("og:type").content, "article")
  assert.equal(
    property("og:title").content,
    `${article.title} | Blog de Ingeniería Civil`,
  )
  assert.equal(property("og:description").content, article.description)
  assert.equal(property("og:url").content, expectedCanonical)
  assert.equal(property("og:image").content, expectedImage)
  assert.equal(property("og:image:alt").content, article.featuredImageAlt)
  assert.equal(
    property("og:image:width").content,
    String(article.featuredImageWidth),
  )
  assert.equal(
    property("og:image:height").content,
    String(article.featuredImageHeight),
  )
  assert.equal(property("article:published_time").content, article.date)
  if (article.dateModified) {
    assert.equal(
      property("article:modified_time").content,
      article.dateModified,
    )
  } else {
    assert.equal(
      globalThis.document.querySelectorAll(
        'meta[property="article:modified_time"]',
      ).length,
      0,
    )
  }
  assert.equal(meta("twitter:image").content, expectedImage)
  assert.equal(meta("twitter:image:alt").content, article.featuredImageAlt)
  assert.equal(canonical().href, expectedCanonical)
  assertSingleMetadataSet()
}

function assertStatic(route) {
  const routeMeta = prerenderMeta.getRouteMeta(route)
  assert.equal(property("og:type").content, "website")
  assert.equal(
    property("og:image").content,
    "https://www.ingenierocivilvenezuela.com/og-image.webp",
  )
  assert.equal(
    meta("twitter:image").content,
    "https://www.ingenierocivilvenezuela.com/og-image.webp",
  )
  assert.equal(
    meta("twitter:image:alt").content,
    "Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón",
  )
  assert.equal(canonical().href, routeMeta.canonical)
  assert.equal(
    globalThis.document.querySelectorAll(
      'meta[property="article:published_time"]',
    ).length,
    0,
  )
  assert.equal(
    globalThis.document.querySelectorAll(
      'meta[property="article:modified_time"]',
    ).length,
    0,
  )
  assertSingleMetadataSet()
}

before(async () => {
  vite = await createServer({
    configFile: false,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  })
  seo = await vite.ssrLoadModule("/src/utils/seo.ts")
  prerenderMeta = await vite.ssrLoadModule("/src/utils/prerender-meta.ts")
})

after(async () => {
  await vite.close()
})

beforeEach(() => {
  globalThis.document = new FakeDocument()
})

describe("client-side SEO navigation", () => {
  it("preserves each dynamic article description without truncation", () => {
    const meta = prerenderMeta.createArticleRouteMeta(articleA)
    assert.equal(meta.description, articleA.description)
  })

  it("Test A: Homepage → Blog → Article A", () => {
    seo.applyPageSeo(prerenderMeta.getRouteMeta("/"))
    seo.applyPageSeo(prerenderMeta.getRouteMeta("/blog"))
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    assertArticle(articleA)
  })

  it("Test B: Article A → Article B", () => {
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleB))
    assertArticle(articleB)
  })

  it("Test C: Article A → Blog listing", () => {
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    seo.applyPageSeo(prerenderMeta.getRouteMeta("/blog"))
    assertStatic("/blog")
  })

  it("Test D: Article A → Homepage", () => {
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    seo.applyPageSeo(prerenderMeta.getRouteMeta("/"))
    assertStatic("/")
  })

  it("Test E: direct article metadata application", () => {
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    assertArticle(articleA)
  })

  it("Test F: back and forward navigation", () => {
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleB))
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    assertArticle(articleA)
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleB))
    assertArticle(articleB)
  })

  it("applies noindex metadata without a canonical on not-found navigation", () => {
    seo.applyPageSeo(seo.createArticlePageSeoOptions(articleA))
    seo.applyNotFoundSeo()

    assert.equal(
      globalThis.document.title,
      "Página no encontrada | Obras Civiles en Venezuela",
    )
    assert.equal(meta("robots").content, "noindex, follow")
    assert.equal(
      meta("description").content,
      "La página que busca no está disponible. Consulte nuestros servicios de ingeniería civil en Caracas, Miranda y La Guaira.",
    )
    assert.equal(
      globalThis.document.querySelectorAll('link[rel="canonical"]').length,
      0,
    )
    assert.equal(
      globalThis.document.querySelectorAll('meta[property="og:url"]').length,
      0,
    )
    assert.equal(
      globalThis.document.querySelectorAll(
        'meta[property="article:published_time"]',
      ).length,
      0,
    )

    seo.applyPageSeo(prerenderMeta.getRouteMeta("/servicios"))
    assert.equal(meta("robots").content, "index, follow")
    assert.equal(
      canonical().href,
      "https://www.ingenierocivilvenezuela.com/servicios",
    )
  })
})
