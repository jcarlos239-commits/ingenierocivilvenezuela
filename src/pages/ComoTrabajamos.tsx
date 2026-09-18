import { useEffect } from "react";
import { Link } from "react-router";
import heroBg from "@/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";

const steps = [
  {
    number: "01",
    title: "Consulta Inicial",
    description: "Conversamos sobre las necesidades del proyecto, conocemos el alcance, revisamos la información disponible y coordinamos una visita técnica cuando sea necesaria.",
  },
  {
    number: "02",
    title: "Visita e Inspección Técnica",
    description: "Evaluamos las condiciones existentes del inmueble, terreno u obra y recopilamos la información técnica necesaria para determinar los trabajos requeridos.",
  },
  {
    number: "03",
    title: "Propuesta y Presupuesto",
    description: "Elaboramos una propuesta de trabajo y un presupuesto detallado de acuerdo con el alcance definido, incluyendo los recursos y actividades necesarios para desarrollar el proyecto.",
  },
  {
    number: "04",
    title: "Ingeniería y Planificación",
    description: "Desarrollamos los planos, cálculos, estudios, cómputos, presupuestos y demás documentación técnica que correspondan al proyecto.",
  },
  {
    number: "05",
    title: "Ejecución y Supervisión",
    description: "Cuando el proyecto contempla ejecución de obra, coordinamos y supervisamos los trabajos procurando que se desarrollen de acuerdo con la documentación técnica y las condiciones establecidas.",
  },
  {
    number: "06",
    title: "Entrega",
    description: "Realizamos la revisión final y entrega de la documentación o de los trabajos ejecutados correspondientes al alcance contratado.",
  },
];

const expectations = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M14 2.333C7.557 2.333 2.333 7.557 2.333 14S7.557 25.667 14 25.667 25.667 20.443 25.667 14 20.443 2.333 14 2.333z" stroke="#ffd200" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9.333 14l3.5 3.5 5.834-5.833" stroke="#ffd200" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Comunicación clara",
    description: "Informamos sobre el avance de cada etapa y respondemos las consultas relacionadas con el proyecto.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <rect x="4" y="5" width="20" height="18" rx="2" stroke="#ffd200" strokeWidth="1.8"/>
        <path d="M9 10h10M9 14h10M9 18h6" stroke="#ffd200" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Evaluación técnica",
    description: "Cada proyecto parte de una inspección y análisis técnico para determinar el trabajo requerido con precisión.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M7 3.5h14a2 2 0 012 2v17a2 2 0 01-2 2H7a2 2 0 01-2-2v-17a2 2 0 012-2z" stroke="#ffd200" strokeWidth="1.8"/>
        <path d="M10 9h8M10 13h8M10 17h5" stroke="#ffd200" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "Documentación organizada",
    description: "Entregamos la documentación técnica correspondiente al alcance contratado de forma ordenada y clara.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="10.5" stroke="#ffd200" strokeWidth="1.8"/>
        <path d="M14 8.167V14l3.5 3.5" stroke="#ffd200" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Seguimiento del proyecto",
    description: "Mantenemos el hilo del proyecto desde la consulta inicial hasta la entrega del trabajo.",
  },
];

export default function ComoTrabajamos() {
  useEffect(() => {
    document.title = "Cómo Trabajamos | Ing. Juan Carlos Mogollón";
  }, []);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
        <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif]">
          <Link to="/" className="text-[#6c757d] hover:text-[#ffd200] transition-colors">Inicio</Link>
          <span className="text-[#adb5bd]">/</span>
          <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold">¿Cómo Trabajamos?</span>
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
              NUESTRO MÉTODO
            </span>
          </div>
          <h1 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(28px,5vw,52px)] leading-[1.1]">
            ¿Cómo Trabajamos?
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[15px] sm:text-[18px] leading-[1.7] max-w-[620px]">
            Cada proyecto requiere una evaluación particular. Por eso trabajamos mediante un proceso organizado que permite definir las necesidades técnicas, establecer el alcance y desarrollar cada etapa de manera clara.
          </p>
        </div>
      </div>

      {/* Process steps */}
      <div className="bg-[#f8f9fa] px-4 sm:px-8 md:px-[80px] py-12 sm:py-20">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(20px,3vw,30px)] leading-[1.2]">
            Nuestro Proceso
          </h2>
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6 sm:gap-10 items-start group">
                {/* Left: number + connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="flex items-center justify-center w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] rounded-full border-2 border-[#ffd200] bg-white">
                    <span className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#ffd200] text-[14px] sm:text-[16px]">{step.number}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-[2px] bg-[#e9ecef] flex-1 min-h-[40px] my-1" />
                  )}
                </div>
                {/* Right: content */}
                <div className="flex flex-col gap-2 pb-10 flex-1">
                  <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[17px] leading-snug mt-3 sm:mt-4">
                    {step.title}
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#495057] text-[13px] sm:text-[15px] leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What to expect */}
      <div className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-16 border-t border-[#e9ecef]">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,3vw,28px)] leading-[1.2]">
              ¿Qué puedes esperar de nuestro proceso?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {expectations.map((e) => (
              <div key={e.title} className="flex flex-col gap-3 bg-[#f8f9fa] rounded-[12px] border border-[#e9ecef] p-5 sm:p-6">
                {e.icon}
                <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-snug">{e.title}</h3>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] leading-[1.5]">{e.description}</p>
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
            Cuéntanos qué necesitas y coordinemos una primera conversación para conocer tu proyecto.
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
