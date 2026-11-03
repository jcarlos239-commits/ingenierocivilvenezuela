import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router"
import { renderToString } from "react-dom/server"
import { routeConfig } from "./route-config"
export {
  getRouteMeta,
  notFoundMeta,
  normalizePathname,
  resolveRouteMeta,
  routeMeta,
} from "./utils/prerender-meta"
export {
  articles,
  CATEGORIES,
  getPublishedArticles,
  validatePublishedArticles,
} from "./data/articles"
export { sanitizeArticleHtml } from "./utils/sanitize-html"

const BASE_URL = "https://ingenierocivilvenezuela.com"

export async function render(urlPath: string): Promise<string> {
  const response = await renderRequest(urlPath)
  if (response.status !== 200) {
    throw new Error(
      `Expected HTTP 200 for ${urlPath}; received ${response.status}`,
    )
  }
  return response.text()
}

export async function renderRequest(urlPath: string): Promise<Response> {
  const handler = createStaticHandler(routeConfig)
  const request = new Request(`${BASE_URL}${urlPath}`)
  const context = await handler.query(request)

  if (context instanceof Response) {
    return context
  }

  const staticRouter = createStaticRouter(handler.dataRoutes, context)
  const html = renderToString(
    <StaticRouterProvider router={staticRouter} context={context} />,
  )

  return new Response(html, {
    status: context.statusCode,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
