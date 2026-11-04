import {
  SCHEMA_IDS,
  SERVICE_AREAS,
  serializeJsonLd,
} from "@/utils/structured-data"

const description =
  "Ingeniería civil, construcción de obras civiles, remodelaciones, avalúos técnicos y peritajes judiciales en el Distrito Capital, Miranda y La Guaira."

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SCHEMA_IDS.organization,
      name: "Ing. Juan Carlos Mogollón — Obras Civiles en Venezuela",
      url: "https://www.ingenierocivilvenezuela.com/",
      description: description,
      telephone: "+58 414 1242017",
      email: "juancarlosmogollon13@gmail.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ingenierocivilvenezuela.com/icon-512.png",
      },
      areaServed: SERVICE_AREAS,
      knowsAbout: [
        "Ingeniería Civil",
        "Construcción de Obras Civiles",
        "Remodelaciones y Ampliaciones",
        "Avalúos Técnicos y Peritajes Judiciales",
        "Patología Estructural",
        "Estabilización de Taludes",
        "Proyectos de Ingeniería Civil",
      ],
      employee: {
        "@id": SCHEMA_IDS.person,
      },
    },
    {
      "@type": "Person",
      "@id": SCHEMA_IDS.person,
      name: "Juan Carlos Mogollón Cabrera",
      jobTitle: "Ingeniero Civil",
      identifier: "C.I.V. 72.381",
      url: "https://www.ingenierocivilvenezuela.com/sobre-mi",
      telephone: "+58 414 1242017",
      worksFor: {
        "@id": SCHEMA_IDS.organization,
      },
      knowsAbout: [
        "Ingeniería Civil",
        "Patología Estructural",
        "Estabilización de Taludes",
        "Gerencia de Construcción",
        "Avalúos Técnicos",
        "Peritajes Judiciales",
      ],
      description:
        "Ingeniero Civil con más de 30 años de trayectoria en construcción, inspección, rehabilitación, patología estructural y estabilización de taludes en Venezuela.",
    },
    {
      "@type": "WebSite",
      "@id": SCHEMA_IDS.website,
      url: "https://www.ingenierocivilvenezuela.com/",
      name: "Obras Civiles en Venezuela",
      description: description,
      publisher: {
        "@id": SCHEMA_IDS.organization,
      },
    },
  ],
}

export default function SiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteStructuredData) }}
    />
  )
}
