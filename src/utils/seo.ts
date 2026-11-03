import type { Article } from "../data/articles"
import {
  createArticleRouteMeta,
  getRouteMeta,
  notFoundMeta,
  type RouteMeta,
} from "./prerender-meta"

const BASE_URL = "https://ingenierocivilvenezuela.com"
const OG_IMAGE = `${BASE_URL}/og-image.webp`
const OG_IMAGE_ALT = "Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón"

export interface PageSeoOptions extends RouteMeta {
  ogType?: "website" | "article"
  ogImage?: string
  ogImageAlt?: string
  ogImageWidth?: number
  ogImageHeight?: number
  twitterCard?: "summary" | "summary_large_image"
  twitterImageAlt?: string
  publishedTime?: string
  modifiedTime?: string
}

function setMeta(name: string, content: string) {
  const matches = document.querySelectorAll<HTMLMetaElement>(
    `meta[name="${name}"]`,
  )
  let el = matches[0]
  if (!el) {
    el = document.createElement("meta")
    el.name = name
    document.head.appendChild(el)
  }
  for (const duplicate of [...matches].slice(1)) duplicate.remove()
  el.content = content
}

function setProperty(property: string, content: string) {
  const matches = document.querySelectorAll<HTMLMetaElement>(
    `meta[property="${property}"]`,
  )
  let el = matches[0]
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  for (const duplicate of [...matches].slice(1)) duplicate.remove()
  el.content = content
}

function removeProperty(property: string) {
  for (const el of document.querySelectorAll(`meta[property="${property}"]`)) {
    el.remove()
  }
}

function setCanonical(href: string) {
  const matches = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="canonical"]',
  )
  let el = matches[0]
  if (!el) {
    el = document.createElement("link")
    el.rel = "canonical"
    document.head.appendChild(el)
  }
  for (const duplicate of [...matches].slice(1)) duplicate.remove()
  el.href = href
}

function removeCanonical() {
  for (const el of document.querySelectorAll('link[rel="canonical"]')) {
    el.remove()
  }
}

export function resolveSocialImageUrl(image?: string): string | undefined {
  return image ? new URL(image, BASE_URL).href : undefined
}

export function createArticlePageSeoOptions(article: Article): PageSeoOptions {
  const meta = createArticleRouteMeta(article)
  const articleImage = resolveSocialImageUrl(article.featuredImage)

  return {
    ...meta,
    ogType: "article",
    ...(articleImage
      ? {
          ogImage: articleImage,
          ogImageAlt: article.featuredImageAlt,
          ogImageWidth: article.featuredImageWidth,
          ogImageHeight: article.featuredImageHeight,
          twitterCard: "summary_large_image" as const,
          twitterImageAlt: article.featuredImageAlt,
        }
      : {}),
    publishedTime: article.date,
    modifiedTime: article.dateModified,
  }
}

export function applyPageSeo({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  ogImageAlt,
  ogImageWidth,
  ogImageHeight,
  twitterCard = "summary_large_image",
  twitterImageAlt,
  publishedTime,
  modifiedTime,
}: PageSeoOptions) {
  const socialImage = ogImage ?? OG_IMAGE
  const socialImageAlt = ogImageAlt ?? OG_IMAGE_ALT

  document.title = title
  setMeta("description", description)
  setMeta("robots", "index, follow")
  setCanonical(canonical)
  setProperty("og:title", title)
  setProperty("og:description", description)
  setProperty("og:url", canonical)
  setProperty("og:type", ogType)
  setProperty("og:image", socialImage)
  setProperty("og:image:alt", socialImageAlt)
  if (ogImage) {
    removeProperty("og:image:type")
    if (ogImageWidth) setProperty("og:image:width", String(ogImageWidth))
    else removeProperty("og:image:width")
    if (ogImageHeight) setProperty("og:image:height", String(ogImageHeight))
    else removeProperty("og:image:height")
  } else {
    setProperty("og:image:type", "image/webp")
    setProperty("og:image:width", "1200")
    setProperty("og:image:height", "630")
  }
  setProperty("og:site_name", "Ing. Juan Carlos Mogollón")
  if (publishedTime) setProperty("article:published_time", publishedTime)
  else removeProperty("article:published_time")
  if (modifiedTime) setProperty("article:modified_time", modifiedTime)
  else removeProperty("article:modified_time")
  setMeta("twitter:card", twitterCard)
  setMeta("twitter:title", title)
  setMeta("twitter:description", description)
  setMeta("twitter:image", socialImage)
  setMeta("twitter:image:alt", twitterImageAlt ?? socialImageAlt)
}

export function applyNotFoundSeo() {
  document.title = notFoundMeta.title
  setMeta("description", notFoundMeta.description)
  setMeta("robots", "noindex, follow")
  removeCanonical()
  setProperty("og:title", notFoundMeta.title)
  setProperty("og:description", notFoundMeta.description)
  removeProperty("og:url")
  setProperty("og:type", "website")
  setProperty("og:image", OG_IMAGE)
  setProperty("og:image:alt", OG_IMAGE_ALT)
  removeProperty("article:published_time")
  removeProperty("article:modified_time")
  setMeta("twitter:card", "summary_large_image")
  setMeta("twitter:title", notFoundMeta.title)
  setMeta("twitter:description", notFoundMeta.description)
  setMeta("twitter:image", OG_IMAGE)
  setMeta("twitter:image:alt", OG_IMAGE_ALT)
}

export function resetPageSeo() {
  const m = getRouteMeta("/")
  applyPageSeo(m)
}
