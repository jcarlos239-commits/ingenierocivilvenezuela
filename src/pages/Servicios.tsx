import { useEffect } from "react"
import { Link } from "react-router"
import { useWhatsApp } from "@/components/WhatsAppModal"
import WhatsAppIcon from "@/components/WhatsAppIcon"
import heroBgWebP from "@/imports/ObrasCivilesLanding/hero-desktop.webp"
import heroMobileWebP from "@/imports/ObrasCivilesLanding/hero-mobile.webp"
import { applyPageSeo, resetPageSeo } from "@/utils/seo"
import { getRouteMeta } from "@/utils/prerender-meta"
import PageHero from "@/components/PageHero"
import footingBg from "@/imports/72286.webp"
import icoConstruccion from "@/imports/72947-card.webp"
import icoRemodelaciones from "@/imports/72948-card.webp"
import icoAvaluos from "@/imports/72949-card.webp"
import icoPatologia from "@/imports/72950-card.webp"
import icoEstabilizacion from "@/imports/72952-card.webp"
import icoProyectos from "@/imports/72951-card.webp"
import { serializeJsonLd } from "@/utils/structured-data"

const services = [
  {
    icon: icoProyectos,
    title: "Proyectos",
    description:
      "Servicios integrales de ingeniería civil que incluyen cálculo y diseño estructural, proyectos de arquitectura, instalaciones sanitarias y eléctricas, estudios geotécnicos, elaboración de presupuestos mediante APU, gestión de permisologías municipales y coordinación con firmas de ingeniería avaladas por el CIV.",
    path: "/servicios/proyectos",
  },
  {
    icon: icoConstruccion,
    title: "Construcción de Obras Civiles",
    description:
      "Desarrollo de proyectos desde fundaciones hasta acabados, incluyendo edificaciones residenciales, comerciales e infraestructura pública de acuerdo con el alcance y las condiciones de cada proyecto.",
    path: "/servicios/construccion-obras-civiles",
  },
  {
    icon: icoRemodelaciones,
    title: "Remodelaciones y Ampliaciones",
    description:
      "Transformación y ampliación de espacios residenciales y comerciales mediante soluciones funcionales, seguras y técnicamente desarrolladas.",
    path: "/servicios/remodelaciones-ampliaciones",
  },
  {
    icon: icoAvaluos,
    title: "Avalúos Técnicos y Peritajes Judiciales",
    description:
      "Avalúos técnicos de bienes inmuebles y peritajes judiciales con elaboración de informes para trámites legales, bancarios y administrativos.",
    path: "/servicios/avaluos-peritajes-tecnicos",
  },
  {
    icon: icoPatologia,
    title: "Patología Estructural",
    description:
      "Evaluación y diagnóstico de patologías en edificaciones, determinando su origen y mecanismos de deterioro, junto con el desarrollo de soluciones para reparación, rehabilitación y recuperación.",
    path: "/servicios/patologia-estructural",
  },
  {
    icon: icoEstabilizacion,
    title: "Estabilización de Taludes",
    description:
      "Desarrollo de soluciones para estabilización de terrenos mediante terraceos, bermas, muros de contención, muros de gravedad y otras soluciones de mitigación de riesgos geológicos.",
    path: "/servicios/estabilizacion-taludes",
  },
]

const pillars = [
  {
    label: "Planificación",
    description:
      "Proyectos, planos, arquitectura, cálculo estructural, estudios y presupuestos.",
  },
  {
    label: "Ejecución",
    description:
      "Construcción, remodelaciones, ampliaciones y coordinación de trabajos.",
  },
  {
    label: "Evaluación",
    description:
      "Avalúos técnicos, peritajes judiciales, inspecciones y diagnóstico de patologías.",
  },
]

export default function Servicios() {
  const { trigger, triggerProps, modal } = useWhatsApp()
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.ingenierocivilvenezuela.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://www.ingenierocivilvenezuela.com/servicios",
      },
    ],
  }

  useEffect(() => {
    const m = getRouteMeta("/servicios")
    applyPageSeo(m)
    return () => {
      resetPageSeo()
    }
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      {modal}
      <div className="w-full">
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
          <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif]">
            <Link
              to="/"
              className="text-[#6c757d] hover:text-[#ffd200] transition-colors"
            >
              Inicio
            </Link>
            <span className="text-[#adb5bd]">/</span>
            <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold">
              Servicios
            </span>
          </nav>
        </div>

        <PageHero
          eyebrow="DISTRITO CAPITAL / CARACAS · MIRANDA · LA GUAIRA"
          title="Servicios de Ingeniería Civil"
          description="Ofrecemos servicios integrales de ingeniería civil, construcción, remodelación, ampliación, avalúos tecnicos y peritajes judiciales, proyectos de arquitectura y soluciones especializadas para edificaciones y terrenos."
          image={heroBgWebP}
          mobileImage={heroMobileWebP}
          imageAlt="Puente en construcción con grúas sobre una zona urbana"
        />

        {/* Cards section */}
        <div className="bg-[#f8f9fa] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,3vw,28px)] leading-[1.2]">
                Soluciones para tu proyecto
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[14px] sm:text-[16px] leading-[1.6] max-w-[700px]">
                Cada proyecto presenta necesidades particulares. Nuestro trabajo
                parte de la evaluación del alcance y las condiciones existentes
                para desarrollar soluciones técnicas de acuerdo con los
                requerimientos de cada caso.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((s) => (
                <Link
                  key={s.path}
                  to={s.path}
                  className="group bg-white rounded-[16px] border border-[#e9ecef] hover:border-[#ffd200] hover:shadow-lg transition-all flex flex-col items-center text-center px-5 py-8 gap-5 drop-shadow-[0px_8px_8px_rgba(0,0,0,0.04)]"
                >
                  <img
                    src={s.icon}
                    alt={s.title}
                    loading="lazy"
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                  <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[13px] sm:text-[14px] leading-snug">
                    {s.title}
                  </h3>
                  <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ffd200] text-[13px] group-hover:underline transition-all">
                    Ver más →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-16 border-t border-[#e9ecef]">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-[700px]">
              <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,3vw,26px)] leading-[1.2]">
                Ingeniería para cada etapa del proyecto
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[14px] sm:text-[16px] leading-[1.6]">
                Desde la planificación y elaboración de proyectos hasta la
                ejecución, evaluación y rehabilitación de edificaciones,
                desarrollamos servicios orientados a resolver necesidades
                específicas de ingeniería civil.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col gap-3 bg-[#f8f9fa] rounded-[12px] border border-[#e9ecef] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[4px] h-[32px] rounded-full bg-[#ffd200] shrink-0" />
                    <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[13px] sm:text-[14px] uppercase tracking-wide">
                      {p.label}
                    </h3>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[14px] leading-[1.5]">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Internal links: process + about */}
        <div className="bg-white border-t border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-8 sm:py-10">
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row gap-4 sm:gap-8">
            <Link
              to="/como-trabajamos"
              className="group flex-1 flex items-center gap-4 bg-[#f8f9fa] rounded-[12px] border border-[#e9ecef] p-5 hover:border-[#ffd200] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col gap-1">
                <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-snug">
                  ¿Cómo trabajamos?
                </span>
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px]">
                  Conoce nuestro proceso de trabajo paso a paso.
                </span>
              </div>
              <span className="ml-auto text-[#ffd200] opacity-60 group-hover:opacity-100 transition-opacity text-[18px] shrink-0">
                →
              </span>
            </Link>
            <Link
              to="/sobre-mi"
              className="group flex-1 flex items-center gap-4 bg-[#f8f9fa] rounded-[12px] border border-[#e9ecef] p-5 hover:border-[#ffd200] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col gap-1">
                <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-snug">
                  Sobre el Ingeniero
                </span>
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px]">
                  Más de 30 años de trayectoria en ingeniería civil.
                </span>
              </div>
              <span className="ml-auto text-[#ffd200] opacity-60 group-hover:opacity-100 transition-opacity text-[18px] shrink-0">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* CTA — footing image with same 60% overlay as homepage */}
        <section
          className="relative w-full"
          style={{
            backgroundImage: `url(${footingBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[rgba(20,20,20,0.60)] pointer-events-none" />
          <div className="relative flex flex-col items-center gap-6 text-center px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(20px,3.5vw,34px)] leading-[1.2]">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd200] text-[14px] sm:text-[16px] leading-[1.7] max-w-[560px]">
              Cuéntanos qué necesitas desarrollar y evaluaremos el alcance de tu
              proyecto para orientarte sobre el servicio adecuado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                {...triggerProps}
                onClick={trigger}
                className="inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px] border-none cursor-pointer"
              >
                <WhatsAppIcon />
                Solicitar Presupuesto
              </button>
              <a
                href="tel:+584141242017"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#ffd200] rounded-[8px] px-7 py-4 text-white hover:bg-[#1e2124] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]"
              >
                Llámanos Ahora Mismo
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
