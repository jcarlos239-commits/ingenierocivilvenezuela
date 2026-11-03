import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  CATEGORIES,
  getPublishedCategories,
  validatePublishedArticles,
  type Article,
  type Category,
} from "./articles.ts"

const createArticle = (
  slug: string,
  category: Category,
  published = true,
): Article => ({
  slug,
  title: `Artículo ${slug}`,
  description: `Descripción ${slug}`,
  excerpt: `Extracto ${slug}`,
  date: "2026-01-01",
  author: "Juan Carlos Mogollón Cabrera",
  category,
  published,
})

describe("official Blog categories", () => {
  it("contains exactly the six official values", () => {
    assert.deepEqual(CATEGORIES, [
      "Construcción de Obras Civiles",
      "Remodelaciones y Ampliaciones",
      "Patología Estructural",
      "Estabilización de Taludes",
      "Avalúos y Peritajes",
      "Proyectos de Ingeniería",
    ])
  })

  it("returns no visible filters when there are no published articles", () => {
    assert.deepEqual(getPublishedCategories([]), [])
  })

  it("returns only official categories containing published articles", () => {
    const articles = [
      createArticle("construccion", "Construcción de Obras Civiles"),
      createArticle("patologia", "Patología Estructural"),
      createArticle("avaluos-borrador", "Avalúos y Peritajes", false),
    ]

    assert.deepEqual(getPublishedCategories(articles), [
      "Construcción de Obras Civiles",
      "Patología Estructural",
    ])
  })

  it("deduplicates categories and keeps official category order", () => {
    const articles = [
      createArticle("proyecto", "Proyectos de Ingeniería"),
      createArticle("construccion-uno", "Construcción de Obras Civiles"),
      createArticle("construccion-dos", "Construcción de Obras Civiles"),
    ]

    assert.deepEqual(getPublishedCategories(articles), [
      "Construcción de Obras Civiles",
      "Proyectos de Ingeniería",
    ])
  })

  it("fails validation for a published article with a nonofficial category", () => {
    const invalidArticle = {
      ...createArticle("invalido", "Construcción de Obras Civiles"),
      category: "Categoría no oficial",
    } as unknown as Article

    assert.throws(
      () => validatePublishedArticles([invalidArticle]),
      /has an invalid category: "Categoría no oficial"/,
    )
  })

  it("accepts a genuine ISO dateModified value", () => {
    const modifiedArticle = {
      ...createArticle("modificado", "Construcción de Obras Civiles"),
      dateModified: "2026-02-15",
    }

    assert.deepEqual(validatePublishedArticles([modifiedArticle]), [
      modifiedArticle,
    ])
  })

  it("rejects an invalid dateModified value", () => {
    const invalidArticle = {
      ...createArticle("fecha-invalida", "Construcción de Obras Civiles"),
      dateModified: "fecha-desconocida",
    }

    assert.throws(
      () => validatePublishedArticles([invalidArticle]),
      /has an invalid dateModified value/,
    )
  })

  it("keeps author metadata required instead of fabricating it", () => {
    const invalidArticle = {
      ...createArticle("sin-autor", "Construcción de Obras Civiles"),
      author: "",
    }

    assert.throws(
      () => validatePublishedArticles([invalidArticle]),
      /missing required metadata: author/,
    )
  })

  it("requires complete featured image metadata for published articles", () => {
    const invalidArticle = {
      ...createArticle("imagen-incompleta", "Patología Estructural"),
      featuredImage: "/images/evaluacion-estructural.webp",
    }

    assert.throws(
      () => validatePublishedArticles([invalidArticle]),
      /requires descriptive featuredImageAlt text/,
    )
    assert.throws(
      () => validatePublishedArticles([invalidArticle]),
      /requires positive integer featured image dimensions/,
    )
  })

  it("accepts descriptive featured image metadata", () => {
    const article = {
      ...createArticle("imagen-completa", "Patología Estructural"),
      featuredImage: "/images/evaluacion-estructural.webp",
      featuredImageAlt:
        "Inspección visual de fisuras en una estructura de concreto",
      featuredImageWidth: 1200,
      featuredImageHeight: 800,
    }

    assert.deepEqual(validatePublishedArticles([article]), [article])
  })
})
