import { useEffect } from "react";
import { Link } from "react-router";
import heroBg from "@/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";
import icoConstruccion from "@/imports/72947.png";
import icoRemodelaciones from "@/imports/72948.png";
import icoAvaluos from "@/imports/72949.png";
import icoPatologia from "@/imports/72950.png";
import icoEstabilizacion from "@/imports/72952.png";
import icoProyectos from "@/imports/72951.png";

const services = [
  {
    icon: icoProyectos,
    title: "Proyectos",
    description: "Servicios integrales de ingeniería civil que incluyen cálculo y diseño estructural, proyectos de arquitectura, instalaciones sanitarias y eléctricas, estudios geotécnicos, elaboración de presupuestos mediante APU, gestión de permisologías municipales y coordinación con firmas de ingeniería avaladas por el CIV.",
    path: "/servicios/proyectos",
  },
  {
    icon: icoConstruccion,
    title: "Construcción de Obras Civiles",
    description: "Desarrollo de proyectos desde fundaciones hasta acabados, incluyendo edificaciones residenciales, comerciales e infraestructura pública de acuerdo con el alcance y las condiciones de cada proyecto.",
    path: "/servicios/construccion-obras-civiles",
  },
  {
    icon: icoRemodelaciones,
    title: "Remodelaciones y Ampliaciones",
    description: "Transformación y ampliación de espacios residenciales y comerciales mediante soluciones funcionales, seguras y técnicamente desarrolladas.",
    path: "/servicios/remodelaciones-ampliaciones",
  },
  {
    icon: icoAvaluos,
    title: "Avalúos y Peritajes Técnicos",
    description: "Avalúos de bienes inmuebles, peritajes técnicos e informes especializados para trámites legales, bancarios y administrativos.",
    path: "/servicios/avaluos-peritajes-tecnicos",
  },
  {
    icon: icoPatologia,
    title: "Patología Estructural",
    description: "Evaluación y diagnóstico de patologías en edificaciones, determinando su origen y mecanismos de deterioro, junto con el desarrollo de soluciones para reparación, rehabilitación y recuperación.",
    path: "/servicios/patologia-estructural",
  },
  {
    icon: icoEstabilizacion,
    title: "Estabilización de Taludes",
    description: "Desarrollo de soluciones para estabilización de terrenos mediante terraceos, bermas, muros de contención, muros de gravedad y otras soluciones de mitigación de riesgos geológicos.",
    path: "/servicios/estabilizacion-taludes",
  },
];

const pillars = [
  {
    label: "Planificación",
    description: "Proyectos, planos, arquitectura, cálculo estructural, estudios y presupuestos.",
  },
  {
    label: "Ejecución",
    description: "Construcción, remodelaciones, ampliaciones y coordinación de trabajos.",
  },
  {
    label: "Evaluación",
    description: "Avalúos, peritajes técnicos, inspecciones y diagnóstico de patologías.",
  },
];

export default function Servicios() {
  useEffect(() => {
    document.title = "Servicios de Ingeniería Civil | Ing. Juan Carlos Mogollón";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Servicios de ingeniería civil, construcción, remodelaciones, ampliaciones, avalúos, peritajes técnicos, proyectos y soluciones especializadas.";
  }, []);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
        <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif]">
          <Link to="/" className="text-[#6c757d] hover:text-[#ffd200] transition-colors">Inicio</Link>
          <span className="text-[#adb5bd]">/</span>
          <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold">Servicios</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="relative px-4 sm:px-8 md:px-[80px] py-16 sm:py-24 overflow-hidden">
        <img src={heroBg} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundColor: "rgba(17,19,21,0.72)", zIndex: 1 }} />
        <div className="relative max-w-[780px] flex flex-col gap-5" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[3px] bg-[#ffd200]" />
            <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[11px] uppercase tracking-wide">
              SERVICIOS DE INGENIERÍA CIVIL
            </span>
          </div>
          <h1 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(28px,5vw,52px)] leading-[1.1]">
            Nuestros Servicios
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[15px] sm:text-[18px] leading-[1.7] max-w-[640px]">
            Ofrecemos servicios integrales de ingeniería civil, construcción, remodelación, ampliación, avalúos y peritajes técnicos, proyectos de arquitectura y soluciones especializadas para edificaciones y terrenos.
          </p>
        </div>
      </div>

      {/* Cards section */}
      <div className="bg-[#f8f9fa] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,3vw,28px)] leading-[1.2]">
              Soluciones para tu proyecto
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[14px] sm:text-[16px] leading-[1.6] max-w-[700px]">
              Cada proyecto presenta necesidades particulares. Nuestro trabajo parte de la evaluación del alcance y las condiciones existentes para desarrollar soluciones técnicas de acuerdo con los requerimientos de cada caso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="group bg-white rounded-[12px] border border-[#e9ecef] hover:border-[#ffd200] hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex flex-col gap-5 items-start p-6 sm:p-8 h-full">
                  <img
                    src={s.icon}
                    alt={s.title}
                    style={{ width: 64, height: 64, objectFit: "contain", display: "block", flexShrink: 0 }}
                  />
                  <div className="flex flex-col gap-[10px] flex-1">
                    <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[15px] leading-normal">
                      {s.title}
                    </h3>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[14px] leading-[1.5]">
                      {s.description}
                    </p>
                  </div>
                  <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ffd200] text-[12px] sm:text-[13px] opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                    Ver servicio →
                  </span>
                </div>
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
              Desde la planificación y elaboración de proyectos hasta la ejecución, evaluación y rehabilitación de edificaciones, desarrollamos servicios orientados a resolver necesidades específicas de ingeniería civil.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <div key={p.label} className="flex flex-col gap-3 bg-[#f8f9fa] rounded-[12px] border border-[#e9ecef] p-6">
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

      {/* CTA */}
      <div className="bg-[#111315] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6 text-center">
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(20px,3.5vw,34px)] leading-[1.2]">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[14px] sm:text-[16px] leading-[1.7] max-w-[560px]">
            Cuéntanos qué necesitas desarrollar y evaluaremos el alcance de tu proyecto para orientarte sobre el servicio adecuado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/584141242017"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]"
            >
              Solicitar Presupuesto
            </a>
            <a
              href="https://wa.me/584141242017"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#ffd200] rounded-[8px] px-7 py-4 text-white hover:bg-[#1e2124] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
