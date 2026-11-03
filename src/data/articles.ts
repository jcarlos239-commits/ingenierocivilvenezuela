export const CATEGORIES = [
  "Construcción de Obras Civiles",
  "Remodelaciones y Ampliaciones",
  "Patología Estructural",
  "Estabilización de Taludes",
  "Avalúos y Peritajes",
  "Proyectos de Ingeniería",
] as const

export type Category = typeof CATEGORIES[number]

export interface Article {
  slug: string
  title: string
  description: string
  excerpt: string
  date: string
  dateModified?: string
  author: string
  category: Category
  featuredImage?: string
  featuredImageAlt?: string
  featuredImageWidth?: number
  featuredImageHeight?: number
  published: boolean
  featured?: boolean
  content?: string
  relatedServiceRoute?: string
}

export const articles: Article[] = []

export function getPublishedArticles(
  articleSource: Article[] = articles,
): Article[] {
  return articleSource.filter((a) => a.published === true)
}

export function getFeaturedArticle(): Article | undefined {
  const published = getPublishedArticles()
  return published.find((a) => a.featured) ?? published[0]
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.published)
}

export function getPublishedCategories(
  articleSource: Article[] = articles,
): Category[] {
  const publishedCategories = new Set(
    getPublishedArticles(articleSource).map((article) => article.category),
  )

  return CATEGORIES.filter((category) => publishedCategories.has(category))
}

export function validatePublishedArticles(
  articleSource: Article[] = articles,
): Article[] {
  const published = getPublishedArticles(articleSource)
  const requiredFields: Array<keyof Article> = [
    "title",
    "description",
    "slug",
    "category",
    "author",
    "date",
  ]
  const errors: string[] = []
  const articlesBySlug = new Map<string, Article[]>()

  for (const article of published) {
    const label =
      article.title?.trim() || article.slug?.trim() || "(artículo sin título)"
    const missingFields = requiredFields.filter((field) => {
      const value = article[field]
      return typeof value !== "string" || value.trim().length === 0
    })

    if (missingFields.length > 0) {
      errors.push(
        `Published blog article "${label}" is missing required metadata: ${missingFields.join(", ")}`,
      )
    }

    if (
      typeof article.category === "string" &&
      !CATEGORIES.some((category) => category === article.category)
    ) {
      errors.push(
        `Published blog article "${label}" has an invalid category: "${article.category}"`,
      )
    }

    if (
      article.dateModified !== undefined &&
      (typeof article.dateModified !== "string" ||
        !article.dateModified.trim() ||
        !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(article.dateModified) ||
        Number.isNaN(Date.parse(article.dateModified)))
    ) {
      errors.push(
        `Published blog article "${label}" has an invalid dateModified value: "${article.dateModified}"`,
      )
    }

    if (article.featuredImage !== undefined) {
      if (
        typeof article.featuredImage !== "string" ||
        !article.featuredImage.trim()
      ) {
        errors.push(
          `Published blog article "${label}" has an invalid featuredImage value`,
        )
      }
      if (
        typeof article.featuredImageAlt !== "string" ||
        !article.featuredImageAlt.trim()
      ) {
        errors.push(
          `Published blog article "${label}" requires descriptive featuredImageAlt text`,
        )
      } else if (
        /^(?:imagen|foto|imagen del artículo|imagen de construcción)$/i.test(
          article.featuredImageAlt.trim(),
        )
      ) {
        errors.push(
          `Published blog article "${label}" has generic featuredImageAlt text`,
        )
      }
      if (
        !Number.isInteger(article.featuredImageWidth) ||
        Number(article.featuredImageWidth) <= 0 ||
        !Number.isInteger(article.featuredImageHeight) ||
        Number(article.featuredImageHeight) <= 0
      ) {
        errors.push(
          `Published blog article "${label}" requires positive integer featured image dimensions`,
        )
      }
    } else if (
      article.featuredImageAlt !== undefined ||
      article.featuredImageWidth !== undefined ||
      article.featuredImageHeight !== undefined
    ) {
      errors.push(
        `Published blog article "${label}" has featured image metadata without featuredImage`,
      )
    }

    if (typeof article.slug === "string" && article.slug.trim()) {
      const matchingArticles = articlesBySlug.get(article.slug) ?? []
      matchingArticles.push(article)
      articlesBySlug.set(article.slug, matchingArticles)
    }
  }

  for (const [slug, matchingArticles] of articlesBySlug) {
    if (matchingArticles.length > 1) {
      errors.push(
        `Duplicate published blog slug:\n"${slug}"\n\nArticles:\n${matchingArticles
          .map((article) => article.title || "(artículo sin título)")
          .join("\n")}`,
      )
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n\n"))
  }

  return published
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const published = getPublishedArticles().filter(
    (a) => a.slug !== article.slug,
  )
  const sameCategory = published.filter((a) => a.category === article.category)
  const others = published.filter((a) => a.category !== article.category)
  return [...sameCategory, ...others].slice(0, limit)
}
