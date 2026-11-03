import { useEffect } from "react"
import { Link } from "react-router"
import { useWhatsApp } from "@/components/WhatsAppModal"
import heroBgWebP from "@/imports/ObrasCivilesLanding/hero-desktop.webp"
import heroMobileWebP from "@/imports/ObrasCivilesLanding/hero-mobile.webp"
import footingBg from "@/imports/72286.webp"
import { applyPageSeo, resetPageSeo } from "@/utils/seo"
import { getRouteMeta } from "@/utils/prerender-meta"
import PageHero from "@/components/PageHero"
import WhatsAppIcon from "@/components/WhatsAppIcon"
import { SCHEMA_IDS, serializeJsonLd } from "@/utils/structured-data"

const experience = [
  {
    period: "2016 – Presente",
    role: "Ingeniero Inspector Independiente",
    organization: "Estado La Guaira / Falcón",
    highlights: [
      "Inspección técnica y validación de diseños constructivos para estabilización de laderas mediante terraceo y bermas en el sector Galipán.",
      "Inspección de obras de recuperación estructural en Residencias Auromar, incluyendo elementos afectados por patologías de Ion Cloruro y Carbonatación.",
      "Supervisión de la rehabilitación arquitectónica y estructural del Terminal de Pasajeros de La Guaira.",
      "Supervisión de obras civiles y arquitectura en un proyecto turístico y posada en Morrocoy.",
    ],
  },
  {
    period: "2013 – 2016",
    role: "Ingeniero Consultor / Libre Ejercicio",
    highlights: [
      "Ejecución de proyectos menores, remodelaciones de infraestructura, elaboración de presupuestos (APU) y asesorías técnicas independientes en el estado La Guaira.",
    ],
  },
  {
    period: "2010 – 2013",
    role: "Ingeniero Residente",
    organization: "Serviobras (Alcaldía del Municipio Vargas)",
    highlights: [
      "Dirección de fases estructurales de la Iglesia El Carmen.",
      "Control de personal, materiales, presupuestos, APU y valuaciones de obra.",
      "Coordinación de la remodelación integral de apartamentos en Residencias Montemar II.",
    ],
  },
  {
    period: "2006 – 2010",
    role: "Asesor y Administrador de Obras de Infraestructura Comunitaria",
    organization: "Consejos Comunales, Estado Vargas",
    highlights: [
      "Administración de recursos gubernamentales.",
      "Ejecución de más de 10 proyectos de infraestructura.",
      "Construcción de más de 350 metros lineales de caminerías y escalinatas.",
      "Construcción de muros de contención tipo cantiléver y torrenteras.",
      "Instalación y rehabilitación de infraestructura de servicios básicos.",
    ],
  },
  {
    period: "1991 – 2008",
    role: "Ingeniero Residente e Inspector de Obras Públicas",
    organization: "MINFRA, INPARQUES, Alcaldía",
    highlights: [
      "Proyecto de ampliación y adecuación sismorresistente de la Escuela Básica Las Salinas.",
      "Supervisión de pavimentación asfáltica de la Av. La Playa.",
      "Obras de vialidad y mitigación, incluyendo puente estructural en Picure y pantallas de contención en Catia La Mar.",
      "Mantenimiento paisajístico y construcción de módulos operativos en Parque del Este.",
    ],
  },
]

const expertise = [
  {
    title: "Patología Estructural",
    description:
      "Evaluación y rehabilitación de estructuras afectadas por procesos como carbonatación e ion cloruro.",
  },
  {
    title: "Estabilización de Taludes",
    description:
      "Experiencia en estabilización de laderas mediante soluciones como bermas y terraceo.",
  },
  {
    title: "Ingeniería Sismorresistente",
    description:
      "Experiencia y formación en adecuación y criterios de ingeniería sismorresistente.",
  },
  {
    title: "Gerencia de Construcción",
    description:
      "Gestión de obras, administración de recursos, control de costos, APU, valuaciones y supervisión.",
  },
  {
    title: "Inspección y Residencia de Obras",
    description:
      "Supervisión técnica y control de ejecución de obras públicas y privadas.",
  },
  {
    title: "Rehabilitación de Infraestructuras",
    description:
      "Intervención y recuperación de edificaciones e infraestructura existente.",
  },
  {
    title: "Vialidad",
    description:
      "Experiencia en obras de vialidad, pavimentación y proyectos relacionados.",
  },
  {
    title: "Obras Hidráulicas y Sanitarias",
    description:
      "Experiencia en colectores, instalaciones sanitarias, tanques de concreto armado y otras obras de infraestructura.",
  },
]

const continuousEducation = [
  "Gestión de Aguas Urbanas — Banco Interamericano de Desarrollo — 2021",
  "Gobernabilidad y Desarrollo Local — Universidad Católica Andrés Bello (UCAB) — 2018",
  "Estudios especializados en Patología Estructural",
  "Estudios de Ingeniería Sismorresistente",
  "Formación CIV en Formulación de Proyectos de Inversión Pública",
  "Finanzas para Ingenieros",
  "Gerencia de Inspección de Obras",
  "Diseño Estructural de Cabezales y Pilotes",
  "Instalaciones Sanitarias en Edificaciones",
]

const relatedServices = [
  {
    title: "Construcción de Obras Civiles",
    to: "/servicios/construccion-obras-civiles",
  },
  {
    title: "Remodelaciones y Ampliaciones",
    to: "/servicios/remodelaciones-ampliaciones",
  },
  {
    title: "Avalúos Técnicos y Peritajes Judiciales",
    to: "/servicios/avaluos-peritajes-tecnicos",
  },
  { title: "Patología Estructural", to: "/servicios/patologia-estructural" },
  {
    title: "Estabilización de Taludes",
    to: "/servicios/estabilizacion-taludes",
  },
  { title: "Proyectos", to: "/servicios/proyectos" },
]

const sectionTitleClass =
  "font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(20px,3vw,30px)] leading-[1.2]"

export default function SobreMi() {
  const { trigger, triggerProps, modal } = useWhatsApp()
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://ingenierocivilvenezuela.com/sobre-mi#profilepage",
        url: "https://ingenierocivilvenezuela.com/sobre-mi",
        name: "Ing. Juan Carlos Mogollón — Ingeniero Civil",
        mainEntity: {
          "@id": SCHEMA_IDS.person,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://ingenierocivilvenezuela.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sobre Mí",
            item: "https://ingenierocivilvenezuela.com/sobre-mi",
          },
        ],
      },
    ],
  }

  useEffect(() => {
    const meta = getRouteMeta("/sobre-mi")
    applyPageSeo(meta)
    return () => {
      resetPageSeo()
    }
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      {modal}
      <div className="w-full">
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
              Sobre Mí
            </span>
          </nav>
        </div>

        <PageHero
          eyebrow="TRAYECTORIA PROFESIONAL"
          title="Ing. Juan Carlos Mogollón"
          description="Ingeniero Civil con más de 30 años de experiencia en construcción, inspección, rehabilitación y gerencia de obras."
          image={heroBgWebP}
          mobileImage={heroMobileWebP}
          imageAlt="Puente en construcción con grúas sobre una zona urbana"
          meta={
            <p className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[13px] sm:text-[14px] tracking-wide">
              C.I.V. 72.381
            </p>
          }
        />

        <section className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16">
            <div>
              <div className="w-12 h-[4px] bg-[#ffd200] mb-5" />
              <h2 className={sectionTitleClass}>
                Perfil profesional y trayectoria
              </h2>
            </div>
            <div className="flex flex-col gap-5 font-['Inter:Regular',sans-serif] text-[#495057] text-[14px] sm:text-[16px] leading-[1.75]">
              <p>
                Juan Carlos Mogollón Cabrera es Ingeniero Civil colegiado, con
                Especialización en Gerencia de la Construcción y Mantenimiento y
                más de 30 años de experiencia profesional en inspección,
                residencia, estimación de costos, análisis de precios unitarios
                (APU) y administración de obras públicas y privadas.
              </p>
              <p>
                Su trayectoria comprende la dirección y supervisión técnica de
                proyectos de construcción, rehabilitación de infraestructuras,
                vialidad y obras comunitarias, así como experiencia en patología
                estructural, estabilización de taludes e ingeniería
                sismorresistente.
              </p>
              <p>
                A lo largo de su ejercicio profesional ha participado en
                proyectos desarrollados junto a instituciones públicas,
                contratistas y comunidades organizadas, con énfasis en el
                control técnico de las obras, la administración de recursos y el
                cumplimiento de las normativas aplicables.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#111315] px-4 sm:px-8 md:px-[80px] py-10 sm:py-14">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2c3035] border border-[#2c3035]">
            {[
              ["30+", "Años de trayectoria"],
              ["1991", "Inicio de trayectoria profesional documentada"],
              ["C.I.V. 72.381", "Colegio de Ingenieros de Venezuela"],
              ["USM", "Formación académica"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="bg-[#111315] p-6 sm:p-7 flex flex-col gap-3"
              >
                <strong className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#ffd200] text-[22px] sm:text-[26px] leading-none">
                  {value}
                </strong>
                <span className="font-['Inter:Regular',sans-serif] text-[#ced4da] text-[12px] sm:text-[13px] leading-[1.5]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f8f9fa] px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
            <h2 className={sectionTitleClass}>Experiencia profesional</h2>
            <div className="flex flex-col">
              {experience.map((item, index) => (
                <article
                  key={`${item.period}-${item.role}`}
                  className="grid grid-cols-[28px_1fr] sm:grid-cols-[150px_28px_1fr] gap-x-4 sm:gap-x-7"
                >
                  <p className="hidden sm:block pt-1 text-right font-['Unbounded:Bold',sans-serif] font-bold text-[#6c757d] text-[11px] leading-[1.5]">
                    {item.period}
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="size-[14px] rounded-full bg-[#ffd200] border-[3px] border-white ring-2 ring-[#ffd200] shrink-0 mt-1" />
                    {index < experience.length - 1 && (
                      <div className="w-[2px] bg-[#dee2e6] grow min-h-[56px]" />
                    )}
                  </div>
                  <div className="pb-10 sm:pb-12">
                    <p className="sm:hidden font-['Unbounded:Bold',sans-serif] font-bold text-[#6c757d] text-[10px] mb-2">
                      {item.period}
                    </p>
                    <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[17px] leading-[1.4]">
                      {item.role}
                    </h3>
                    {item.organization && (
                      <p className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#6c757d] text-[13px] sm:text-[14px] mt-1">
                        {item.organization}
                      </p>
                    )}
                    <ul className="mt-4 flex flex-col gap-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 font-['Inter:Regular',sans-serif] text-[#495057] text-[13px] sm:text-[15px] leading-[1.6]"
                        >
                          <span className="text-[#ffd200] font-bold shrink-0">
                            —
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-9">
            <h2 className={sectionTitleClass}>Áreas de experiencia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertise.map((area, index) => (
                <article
                  key={area.title}
                  className="border border-[#e9ecef] bg-[#f8f9fa] p-5 sm:p-6 flex flex-col gap-4 rounded-[10px]"
                >
                  <span className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#ffd200] text-[12px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-[1.45]">
                    {area.title}
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[13px] leading-[1.6]">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8f9fa] border-y border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-9">
            <h2 className={sectionTitleClass}>Formación académica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  period: "1989",
                  degree: "Ingeniero Civil, Mención Vialidad",
                },
                {
                  period: "1998 – 1999",
                  degree:
                    "Especialización en Gerencia de la Construcción y Mantenimiento",
                },
              ].map((education) => (
                <article
                  key={education.period}
                  className="bg-white border-l-4 border-[#ffd200] p-6 sm:p-8 flex flex-col gap-3 shadow-sm"
                >
                  <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#6c757d] text-[11px]">
                    {education.period}
                  </p>
                  <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[16px] leading-[1.45]">
                    {education.degree}
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[13px] sm:text-[14px]">
                    Universidad Santa María (U.S.M.)
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#111315] px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16">
            <div>
              <div className="w-12 h-[4px] bg-[#ffd200] mb-5" />
              <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(20px,3vw,30px)] leading-[1.2]">
                Formación continua
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {continuousEducation.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-['Inter:Regular',sans-serif] text-[#ced4da] text-[13px] sm:text-[14px] leading-[1.6]"
                >
                  <span className="mt-2 size-[6px] rounded-full bg-[#ffd200] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
            <div className="max-w-[780px] flex flex-col gap-4">
              <h2 className={sectionTitleClass}>
                Asesorías y divulgación técnica
              </h2>
              <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[14px] sm:text-[16px] leading-[1.7]">
                Además de su experiencia en ejecución, inspección y
                administración de obras, Juan Carlos Mogollón ha desarrollado
                actividades de asesoría y divulgación técnica.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                "Asesor de la Comisión de Ambiente del Concejo Municipal en 2002.",
                "Colaborador directo en el informe “Condiciones Actuales de Riesgo y Vulnerabilidad en el Estado Vargas” en 2004.",
                "Facilitador de foros formativos relacionados con prevención de deslizamientos, comportamiento sísmico y mantenimiento vial.",
              ].map((item) => (
                <article
                  key={item}
                  className="bg-[#f8f9fa] border border-[#e9ecef] rounded-[10px] p-6 flex gap-4"
                >
                  <span className="w-[4px] bg-[#ffd200] rounded-full shrink-0" />
                  <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[13px] sm:text-[14px] leading-[1.65]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8f9fa] border-y border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-4 max-w-[760px]">
              <h2 className={sectionTitleClass}>Área de trabajo</h2>
              <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[14px] sm:text-[16px] leading-[1.7]">
                Prestamos nuestros servicios principalmente en el Distrito
                Capital / Caracas, Miranda y La Guaira.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Distrito Capital / Caracas", "Miranda", "La Guaira"].map(
                (area) => (
                  <div
                    key={area}
                    className="bg-white border border-[#e9ecef] rounded-[10px] p-5 flex items-center gap-4"
                  >
                    <span className="size-[10px] rounded-full bg-[#ffd200] shrink-0" />
                    <strong className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-[1.4]">
                      {area}
                    </strong>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-9">
            <h2 className={sectionTitleClass}>
              Áreas en las que podemos ayudarle
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.to}
                  to={service.to}
                  className="group border border-[#e9ecef] rounded-[10px] p-5 sm:p-6 flex items-center justify-between gap-5 hover:border-[#ffd200] hover:bg-[#f8f9fa] transition-colors"
                >
                  <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-[1.5]">
                    {service.title}
                  </span>
                  <span className="text-[#ffd200] text-[22px] leading-none group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative w-full"
          style={{
            backgroundImage: `url(${footingBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[rgba(20,20,20,0.68)] pointer-events-none" />
          <div className="relative flex flex-col items-center gap-6 text-center px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(20px,3.5vw,34px)] leading-[1.2]">
              ¿Tiene un proyecto o necesita asesoría técnica?
            </h2>
            <p className="font-['Inter:Regular',sans-serif] text-[#ffd200] text-[14px] sm:text-[16px] leading-[1.7] max-w-[620px]">
              Conversemos sobre las necesidades de su obra, proyecto o inmueble.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                {...triggerProps}
                onClick={trigger}
                className="inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px] border-none cursor-pointer"
              >
                <WhatsAppIcon />
                Escríbenos por WhatsApp
              </button>
              <a
                href="tel:+584141242017"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#ffd200] rounded-[8px] px-7 py-4 text-white hover:bg-[#1e2124] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]"
              >
                Llámanos Ahora
              </a>
            </div>
          </div>
        </section>

        <div className="bg-[#f8f9fa] border-t border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#111315] hover:text-[#ffd200] transition-colors font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px]"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </>
  )
}
