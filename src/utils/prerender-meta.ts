import { articles, type Article } from "../data/articles"

const BASE_URL = "https://www.ingenierocivilvenezuela.com"

export interface RouteMeta {
  title: string
  description: string
  canonical: string
  /**
   * Set only when an editor can supply a genuine content revision date.
   * It is optional so sitemap generation never substitutes a build date.
   */
  lastModified?: string
}

export const notFoundMeta = {
  title: "Página no encontrada | Obras Civiles en Venezuela",
  description:
    "La página que busca no está disponible. Consulte nuestros servicios de ingeniería civil en Caracas, Miranda y La Guaira.",
} as const

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Obras Civiles en Venezuela | Ing. Juan Carlos Mogollón",
    description:
      "Ingeniería civil en Caracas, Miranda y La Guaira: construcción, remodelaciones, avalúos y peritajes con el Ing. Juan Carlos Mogollón.",
    canonical: `${BASE_URL}/`,
  },
  "/servicios": {
    title:
      "Servicios de Ingeniería Civil en Caracas | Ing. Juan Carlos Mogollón",
    description:
      "Servicios de ingeniería civil en Caracas, Miranda y La Guaira: construcción, remodelaciones, avalúos, patología estructural y taludes.",
    canonical: `${BASE_URL}/servicios`,
  },
  "/como-trabajamos": {
    title: "Cómo Trabajamos | Ingeniería Civil y Construcción",
    description:
      "Conozca nuestro proceso: consulta, inspección técnica, propuesta, ejecución y entrega de proyectos en Caracas, Miranda y La Guaira.",
    canonical: `${BASE_URL}/como-trabajamos`,
  },
  "/sobre-mi": {
    title: "Sobre Mí | Ing. Juan Carlos Mogollón — Ingeniero Civil",
    description:
      "Ing. Juan Carlos Mogollón, ingeniero civil con más de 30 años de experiencia en construcción, patología estructural y gerencia de obras.",
    canonical: `${BASE_URL}/sobre-mi`,
  },
  "/servicios/proyectos": {
    title: "Proyectos de Ingeniería Civil | Ing. Juan Carlos Mogollón",
    description:
      "Proyectos de ingeniería civil en Caracas, Miranda y La Guaira: cálculo estructural, arquitectura, instalaciones, estudios geotécnicos y presupuestos APU.",
    canonical: `${BASE_URL}/servicios/proyectos`,
  },
  "/servicios/construccion-obras-civiles": {
    title:
      "Construcción de Obras Civiles en Caracas | Ing. Juan Carlos Mogollón",
    description:
      "Construcción de obras civiles residenciales y comerciales en Caracas, Miranda y La Guaira, con experiencia y respaldo de ingeniería civil.",
    canonical: `${BASE_URL}/servicios/construccion-obras-civiles`,
  },
  "/servicios/remodelaciones-ampliaciones": {
    title:
      "Remodelaciones y Ampliaciones en Caracas | Ing. Juan Carlos Mogollón",
    description:
      "Remodelación y ampliación de viviendas, oficinas y locales en Caracas, Miranda y La Guaira, con planificación y criterio de ingeniería.",
    canonical: `${BASE_URL}/servicios/remodelaciones-ampliaciones`,
  },
  "/servicios/avaluos-peritajes-tecnicos": {
    title:
      "Avalúos Técnicos y Peritajes Judiciales | Ing. Juan Carlos Mogollón",
    description:
      "Avalúos técnicos de inmuebles y peritajes judiciales en Caracas, Miranda y La Guaira. Informes para trámites legales y administrativos.",
    canonical: `${BASE_URL}/servicios/avaluos-peritajes-tecnicos`,
  },
  "/servicios/patologia-estructural": {
    title: "Patología Estructural en Caracas | Ing. Juan Carlos Mogollón",
    description:
      "Diagnóstico de daños estructurales, corrosión y deterioro del concreto en edificaciones de Caracas, Miranda y La Guaira.",
    canonical: `${BASE_URL}/servicios/patologia-estructural`,
  },
  "/servicios/estabilizacion-taludes": {
    title: "Estabilización de Taludes en Venezuela | Ing. Juan Carlos Mogollón",
    description:
      "Diseño y ejecución de soluciones para estabilizar taludes en Caracas, Miranda y La Guaira: bermas, terraceo y muros de contención.",
    canonical: `${BASE_URL}/servicios/estabilizacion-taludes`,
  },
  "/blog": {
    title: "Blog de Ingeniería Civil | Obras Civiles en Venezuela",
    description:
      "Artículos de ingeniería civil sobre construcción, remodelaciones, patología estructural, taludes, avalúos y proyectos.",
    canonical: `${BASE_URL}/blog`,
  },
}

const unknownArticleMeta: RouteMeta = {
  title: "Página no encontrada | Obras Civiles en Venezuela",
  description: routeMeta["/"].description,
  canonical: `${BASE_URL}/blog`,
}

export function normalizePathname(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/"
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`
  return withLeadingSlash === "/"
    ? "/"
    : withLeadingSlash.replace(/\/+$/, "") || "/"
}

export function createArticleRouteMeta(article: Article): RouteMeta {
  return {
    title: `${article.title} | Blog de Ingeniería Civil`,
    description: article.description,
    canonical: `${BASE_URL}/blog/${article.slug}`,
  }
}

export function resolveRouteMeta(
  pathname: string,
  articleSource: Article[],
): RouteMeta {
  const normalizedPath = normalizePathname(pathname)
  const staticMeta = routeMeta[normalizedPath]

  if (staticMeta) return staticMeta

  const articleMatch = normalizedPath.match(/^\/blog\/([^/]+)$/)
  if (articleMatch) {
    let slug: string
    try {
      slug = decodeURIComponent(articleMatch[1])
    } catch {
      return unknownArticleMeta
    }

    const article = articleSource.find(
      (candidate) => candidate.published === true && candidate.slug === slug,
    )
    return article ? createArticleRouteMeta(article) : unknownArticleMeta
  }

  return routeMeta["/"]
}

export function getRouteMeta(pathname: string): RouteMeta {
  return resolveRouteMeta(pathname, articles)
}
