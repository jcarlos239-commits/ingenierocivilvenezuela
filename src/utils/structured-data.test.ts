import assert from "node:assert/strict"
import { describe, it } from "node:test"
import type { Article } from "../data/articles.ts"
import {
  createBlogPostingStructuredData,
  SCHEMA_IDS,
  serializeJsonLd,
} from "./structured-data.ts"

const article: Article = {
  slug: "articulo-de-prueba",
  title: "Artículo de prueba",
  description: "Descripción del artículo de prueba.",
  excerpt: "Resumen del artículo.",
  date: "2026-01-15",
  author: "Juan Carlos Mogollón Cabrera",
  category: "Construcción de Obras Civiles",
  featuredImage: "/images/articulo.webp",
  featuredImageAlt:
    "Inspección técnica de una estructura de concreto en construcción",
  featuredImageWidth: 1200,
  featuredImageHeight: 800,
  published: true,
}
const canonical = "https://ingenierocivilvenezuela.com/blog/articulo-de-prueba"
const image = "https://ingenierocivilvenezuela.com/images/articulo.webp"

describe("createBlogPostingStructuredData", () => {
  it("creates the complete article graph with a featured image", () => {
    const schema = createBlogPostingStructuredData({
      article,
      canonical,
      image,
    })

    assert.equal(schema["@id"], `${canonical}#blogposting`)
    assert.deepEqual(schema.mainEntityOfPage, {
      "@type": "WebPage",
      "@id": canonical,
    })
    assert.deepEqual(schema.image, [image])
    assert.equal(schema.datePublished, article.date)
    assert.equal("dateModified" in schema, false)
    assert.deepEqual(schema.author, { "@id": SCHEMA_IDS.person })
    assert.deepEqual(schema.publisher, { "@id": SCHEMA_IDS.organization })
    assert.deepEqual(schema.isPartOf, { "@id": SCHEMA_IDS.website })
    assert.equal(schema.inLanguage, "es")
  })

  it("omits image and dateModified when article data does not provide them", () => {
    const schema = createBlogPostingStructuredData({
      article: { ...article, featuredImage: undefined },
      canonical,
    })

    assert.equal("image" in schema, false)
    assert.equal("dateModified" in schema, false)
  })

  it("includes only a genuine maintained modification date", () => {
    const modifiedArticle = {
      ...article,
      dateModified: "2026-02-20",
    }
    const schema = createBlogPostingStructuredData({
      article: modifiedArticle,
      canonical,
      image,
    })

    assert.equal(schema.datePublished, article.date)
    assert.equal(schema.dateModified, modifiedArticle.dateModified)
  })

  it("remains valid and safe after centralized serialization", () => {
    const schema = createBlogPostingStructuredData({
      article: {
        ...article,
        description: "</script><script>alert('schema')</script>",
      },
      canonical,
      image,
    })
    const serialized = serializeJsonLd(schema)

    assert.doesNotMatch(serialized, /<\/script>/i)
    assert.deepEqual(JSON.parse(serialized), schema)
  })
})

describe("serializeJsonLd", () => {
  it("produces valid JSON for normal data", () => {
    const data = { name: "Ingeniero Civil" }
    const serialized = serializeJsonLd(data)

    assert.deepEqual(JSON.parse(serialized), data)
  })

  it("prevents dynamic values from terminating the script element", () => {
    const data = {
      description: "</script><script>alert('x')</script>",
    }
    const serialized = serializeJsonLd(data)
    const scriptElement = `<script type="application/ld+json">${serialized}</script>`

    assert.doesNotMatch(serialized, /<\/script>/i)
    assert.doesNotMatch(serialized, /[<>&]/)
    assert.equal(
      scriptElement.indexOf("</script>"),
      scriptElement.lastIndexOf("</script>"),
    )
    assert.deepEqual(JSON.parse(serialized), data)
  })

  it("safely preserves special characters and Unicode values", () => {
    const data = {
      text: `< > & "quotes" 'apostrophes' Ingeniería — Caracas 🚧`,
    }
    const serialized = serializeJsonLd(data)

    assert.doesNotMatch(serialized, /[<>&]/)
    assert.match(serialized, /Ingeniería — Caracas 🚧/)
    assert.deepEqual(JSON.parse(serialized), data)
  })

  it("preserves URL meaning", () => {
    const data = {
      url: "https://ingenierocivilvenezuela.com/blog/articulo?fuente=seo&vista=1#detalle",
    }
    const serialized = serializeJsonLd(data)
    const parsed = JSON.parse(serialized) as typeof data

    assert.equal(parsed.url, data.url)
  })
})
