const BASE_URL = "https://ingenierocivilvenezuela.com";

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
}

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Obras Civiles en Venezuela | Ing. Juan Carlos Mogollón",
    description:
      "Ingeniería civil, construcción de obras civiles, remodelaciones, avalúos técnicos y peritajes judiciales en Venezuela. Ing. Juan Carlos Mogollón, más de 30 años de trayectoria.",
    canonical: `${BASE_URL}/`,
  },
  "/servicios": {
    title: "Servicios de Ingeniería Civil | Ing. Juan Carlos Mogollón",
    description:
      "Servicios de ingeniería civil, construcción, remodelaciones, ampliaciones, avalúos técnicos y peritajes judiciales, proyectos y soluciones especializadas en Venezuela.",
    canonical: `${BASE_URL}/servicios`,
  },
  "/como-trabajamos": {
    title: "Cómo Trabajamos | Ing. Juan Carlos Mogollón",
    description:
      "Conoce el proceso de trabajo del Ing. Juan Carlos Mogollón: consulta inicial, inspección técnica, propuesta, ejecución y entrega de obras civiles en Venezuela.",
    canonical: `${BASE_URL}/como-trabajamos`,
  },
  "/cobertura": {
    title: "Cobertura | Ingeniería Civil | Ing. Juan Carlos Mogollón",
    description:
      "Área de cobertura del Ing. Juan Carlos Mogollón: servicios de ingeniería civil en Distrito Capital, Miranda y La Guaira, Venezuela.",
    canonical: `${BASE_URL}/cobertura`,
  },
  "/servicios/proyectos": {
    title: "Proyectos de Ingeniería Civil | Ing. Juan Carlos Mogollón",
    description:
      "Servicios de proyectos de ingeniería civil: cálculo estructural, arquitectura, instalaciones, estudios geotécnicos, presupuestos APU y gestión de permisologías en Venezuela.",
    canonical: `${BASE_URL}/servicios/proyectos`,
  },
  "/servicios/construccion-obras-civiles": {
    title: "Construcción de Obras Civiles | Ing. Juan Carlos Mogollón",
    description:
      "Servicios de construcción de obras civiles residenciales, comerciales e infraestructura en Venezuela, con más de 30 años de experiencia y cumplimiento de normativas COVENIN.",
    canonical: `${BASE_URL}/servicios/construccion-obras-civiles`,
  },
  "/servicios/remodelaciones-ampliaciones": {
    title: "Remodelaciones y Ampliaciones | Ing. Juan Carlos Mogollón",
    description:
      "Remodelación y ampliación de viviendas, oficinas y locales comerciales en Venezuela. Transformamos y modernizamos espacios con cálculos de ingeniería rigurosos.",
    canonical: `${BASE_URL}/servicios/remodelaciones-ampliaciones`,
  },
  "/servicios/avaluos-peritajes-tecnicos": {
    title: "Avalúos Técnicos y Peritajes Judiciales | Ing. Juan Carlos Mogollón",
    description:
      "Servicios de avalúos técnicos de bienes inmuebles y peritajes judiciales con elaboración de informes periciales para trámites legales, bancarios y administrativos en Venezuela.",
    canonical: `${BASE_URL}/servicios/avaluos-peritajes-tecnicos`,
  },
  "/servicios/patologia-estructural": {
    title: "Patología Estructural | Ing. Juan Carlos Mogollón",
    description:
      "Evaluación de patologías en edificaciones, diagnóstico de daños estructurales, corrosión del concreto armado y recomendaciones de reparación en Venezuela.",
    canonical: `${BASE_URL}/servicios/patologia-estructural`,
  },
  "/servicios/estabilizacion-taludes": {
    title: "Estabilización de Taludes | Ing. Juan Carlos Mogollón",
    description:
      "Diseño y construcción de soluciones de estabilización de taludes: terraceo, bermas, muros de contención cantiléver y de gravedad en Venezuela.",
    canonical: `${BASE_URL}/servicios/estabilizacion-taludes`,
  },
};

export function getRouteMeta(pathname: string): RouteMeta {
  return routeMeta[pathname] ?? routeMeta["/"];
}
