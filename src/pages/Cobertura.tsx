import { useEffect } from "react";
import { Link } from "react-router";
import heroBg from "@/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";

const areas = [
  {
    name: "Distrito Capital",
    description: "Servicios de ingeniería civil, proyectos, inspecciones, avalúos, peritajes, remodelaciones y construcción según el alcance del proyecto.",
    color: "#ffd200",
  },
  {
    name: "Miranda",
    description: "Atención a proyectos y servicios de ingeniería civil en las zonas donde sea técnicamente y operativamente viable desarrollar el trabajo.",
    color: "#ffd200",
  },
  {
    name: "La Guaira",
    description: "Servicios de ingeniería civil, evaluación, proyectos, remodelaciones, construcción y otros servicios según las características y alcance de cada solicitud.",
    color: "#ffd200",
  },
];

function ZoneMap() {
  return (
    <div className="w-full max-w-[560px] mx-auto">
      <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-[16px] p-6 sm:p-8 flex flex-col gap-5">
        <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[11px] uppercase tracking-wide text-center">
          Zona principal de cobertura
        </p>
        {/* Abstract zone visualization */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Distrito Capital", width: "45%", note: "Caracas y zonas metropolitanas" },
            { label: "Estado Miranda", width: "75%", note: "Mayor extensión territorial" },
            { label: "Estado La Guaira", width: "35%", note: "Costa y litoral" },
          ].map((zone) => (
            <div key={zone.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#111315] text-[13px]">{zone.label}</span>
                <span className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[11px]">{zone.note}</span>
              </div>
              <div className="h-[10px] bg-[#e9ecef] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ffd200] rounded-full"
                  style={{ width: zone.width }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[12px] leading-[1.5] text-center">
          La disponibilidad está sujeta al alcance y las características particulares de cada proyecto.
        </p>
      </div>
    </div>
  );
}

export default function Cobertura() {
  useEffect(() => {
    document.title = "Cobertura | Ingeniería Civil | Ing. Juan Carlos Mogollón";
  }, []);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
        <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif]">
          <Link to="/" className="text-[#6c757d] hover:text-[#ffd200] transition-colors">Inicio</Link>
          <span className="text-[#adb5bd]">/</span>
          <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold">Cobertura</span>
        </nav>
      </div>

      {/* Page hero */}
      <div className="relative px-4 sm:px-8 md:px-[80px] py-16 sm:py-24 overflow-hidden">
        <img src={heroBg} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundColor: "rgba(17,19,21,0.72)", zIndex: 1 }} />
        <div className="relative max-w-[780px] flex flex-col gap-5" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[3px] bg-[#ffd200]" />
            <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[11px] uppercase tracking-wide">
              ÁREA DE SERVICIO
            </span>
          </div>
          <h1 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(28px,5vw,52px)] leading-[1.1]">
            Cobertura
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[15px] sm:text-[18px] leading-[1.7] max-w-[640px]">
            Prestamos servicios de ingeniería civil, construcción, remodelación, avalúos y peritajes técnicos principalmente en el Distrito Capital, el estado Miranda y el estado La Guaira, sujeto al alcance y las características de cada proyecto.
          </p>
        </div>
      </div>

      {/* Areas */}
      <div className="bg-[#f8f9fa] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,3vw,28px)] leading-[1.2]">
            ¿Dónde prestamos nuestros servicios?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {areas.map((area) => (
              <div key={area.name} className="bg-white rounded-[12px] border border-[#e9ecef] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-[4px] h-[36px] rounded-full bg-[#ffd200] shrink-0" />
                  <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[15px] leading-snug">
                    {area.name}
                  </h3>
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[14px] leading-[1.6]">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Zone visualization */}
          <ZoneMap />
        </div>
      </div>

      {/* Outside zone */}
      <div className="bg-white border-t border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-12 sm:py-14">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex flex-col gap-3 max-w-[620px]">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(16px,2.5vw,22px)] leading-[1.3]">
              ¿Tu proyecto está fuera de nuestra zona habitual?
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[15px] leading-[1.6]">
              Si tu proyecto se encuentra fuera de nuestra zona principal de atención, contáctanos para evaluar el alcance, ubicación y condiciones particulares del servicio.
            </p>
          </div>
          <a
            href="https://wa.me/584141242017"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-6 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[14px] sm:text-[15px] w-full sm:w-auto"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#111315] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6 text-center">
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(20px,3.5vw,34px)] leading-[1.2]">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[14px] sm:text-[16px] leading-[1.7] max-w-[560px]">
            Cuéntanos dónde se encuentra tu proyecto y qué necesitas desarrollar. Evaluaremos la solicitud y te indicaremos cómo podemos ayudarte.
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

      {/* Back */}
      <div className="bg-[#f8f9fa] border-t border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-5">
        <Link to="/" className="inline-flex items-center gap-2 text-[#111315] hover:text-[#ffd200] transition-colors font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px]">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
