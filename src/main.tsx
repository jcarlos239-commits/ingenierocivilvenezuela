import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import {
  getRouteMeta,
  normalizePathname,
  routeMeta,
} from "./utils/prerender-meta"
import { getArticleBySlug, type Article } from "./data/articles"
import {
  applyPageSeo,
  applyNotFoundSeo,
  createArticlePageSeoOptions,
} from "./utils/seo"

// Apply route-specific meta synchronously before React hydrates so that
// JS-executing crawlers see the correct title/description immediately.
const _path = normalizePathname(window.location.pathname)
const _meta = getRouteMeta(_path)
const _articleMatch = _path.match(/^\/blog\/([^/]+)$/)
let _article: Article | undefined
if (_articleMatch) {
  try {
    _article = getArticleBySlug(decodeURIComponent(_articleMatch[1]))
  } catch {
    _article = undefined
  }
}
if (_article) {
  applyPageSeo(createArticlePageSeoOptions(_article))
} else if (routeMeta[_path]) {
  applyPageSeo(_meta)
} else {
  applyNotFoundSeo()
}

const rootEl = document.getElementById("root")!
if (rootEl.hasChildNodes()) {
  hydrateRoot(
    rootEl,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
