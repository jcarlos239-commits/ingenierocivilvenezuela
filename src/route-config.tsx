import type { ComponentType } from "react"
import { redirect, replace, type LoaderFunctionArgs } from "react-router"
import Root from "./components/Root"
import NotFound from "./pages/NotFound"
import { getArticleBySlug } from "./data/articles"
import { normalizePathname } from "./utils/prerender-meta"

function lazyPage(importer: () => Promise<{ default: ComponentType }>) {
  return async () => {
    const { default: Component } = await importer()
    return { Component }
  }
}

function normalizeTrailingSlashLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const normalizedPath = normalizePathname(url.pathname)

  // Let the existing /cobertura loader keep ownership of its redirect target.
  if (normalizedPath === "/cobertura" || normalizedPath === url.pathname) {
    return null
  }

  return replace(`${normalizedPath}${url.search}${url.hash}`, 301)
}

function blogArticleLoader({ params }: LoaderFunctionArgs) {
  if (!params.slug || !getArticleBySlug(params.slug)) {
    throw new Response(null, { status: 404, statusText: "Not Found" })
  }

  return null
}

function notFoundLoader() {
  throw new Response(null, { status: 404, statusText: "Not Found" })
}

export const routeConfig = [
  {
    path: "/",
    loader: normalizeTrailingSlashLoader,
    Component: Root,
    children: [
      { index: true, lazy: lazyPage(() => import("./pages/Home")) },
      {
        path: "servicios",
        lazy: lazyPage(() => import("./pages/Servicios")),
      },
      {
        path: "como-trabajamos",
        lazy: lazyPage(() => import("./pages/ComoTrabajamos")),
      },
      {
        path: "sobre-mi",
        lazy: lazyPage(() => import("./pages/SobreMi")),
      },
      { path: "blog", lazy: lazyPage(() => import("./pages/Blog")) },
      {
        path: "blog/:slug",
        loader: blogArticleLoader,
        lazy: lazyPage(() => import("./pages/BlogArticle")),
        ErrorBoundary: NotFound,
      },
      { path: "cobertura", loader: () => redirect("/sobre-mi", 301) },
      {
        path: "servicios/proyectos",
        lazy: lazyPage(() => import("./pages/services/Proyectos")),
      },
      {
        path: "servicios/construccion-obras-civiles",
        lazy: lazyPage(
          () => import("./pages/services/ConstruccionObrasCiviles"),
        ),
      },
      {
        path: "servicios/remodelaciones-ampliaciones",
        lazy: lazyPage(
          () => import("./pages/services/RemodelacionesAmpliaciones"),
        ),
      },
      {
        path: "servicios/avaluos-peritajes-tecnicos",
        lazy: lazyPage(
          () => import("./pages/services/AvaluosPeritajesTecnicos"),
        ),
      },
      {
        path: "servicios/patologia-estructural",
        lazy: lazyPage(() => import("./pages/services/PatologiaEstructural")),
      },
      {
        path: "servicios/estabilizacion-taludes",
        lazy: lazyPage(() => import("./pages/services/EstabilizacionTaludes")),
      },
      { path: "*", loader: notFoundLoader, ErrorBoundary: NotFound },
    ],
  },
]
