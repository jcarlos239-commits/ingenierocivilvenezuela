import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] relative rounded-[12px] border border-[#e9ecef] hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-5 items-start p-6 sm:p-8 h-full">
        <div className="bg-[rgba(17,19,21,0.08)] flex items-center justify-center rounded-[8px] size-[44px] shrink-0">
          {icon}
        </div>
        <div className="flex flex-col gap-[10px]">
          <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[16px] leading-normal">{title}</h3>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[14px] leading-[1.5]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function BuildingIcon() {
  return <svg className="size-[28px]" fill="none" height="28" viewBox="0 0 28 28" width="28"><path d={svgPaths.p21a55c40} stroke="#111315" strokeLinecap="round" strokeWidth="2" /></svg>;
}
function WrenchIcon() {
  return <svg className="size-[28px]" fill="none" height="28" viewBox="0 0 28 28" width="28"><path d={svgPaths.p3ee14400} stroke="#111315" strokeLinecap="round" strokeWidth="2" /></svg>;
}
function MaximizeIcon() {
  return <svg className="size-[28px]" fill="none" height="28" viewBox="0 0 28 28" width="28"><path d={svgPaths.p2b2a380} stroke="#111315" strokeLinecap="round" strokeWidth="2" /></svg>;
}
function DropletOffIcon() {
  return <svg className="size-[28px]" fill="none" height="28" viewBox="0 0 28 28" width="28"><path d={svgPaths.p220e9980} stroke="#111315" strokeLinecap="round" strokeWidth="2" /></svg>;
}
function GridIcon() {
  return <svg className="size-[28px]" fill="none" height="28" viewBox="0 0 28 28" width="28"><path d={svgPaths.pa5f0880} stroke="#111315" strokeLinecap="round" strokeWidth="2" /></svg>;
}
function FileSignatureIcon() {
  return <svg className="size-[28px]" fill="none" height="28" viewBox="0 0 28 28" width="28"><path d={svgPaths.p26218c80} stroke="#111315" strokeLinecap="round" strokeWidth="2" /></svg>;
}

const services = [
  {
    icon: <BuildingIcon />,
    title: "Construcción de Obras Civiles",
    description: "Desarrollo de proyectos desde fundaciones hasta acabados. Edificaciones residenciales, comerciales e infraestructura pública con estricto cumplimiento de normativas COVENIN.",
  },
  {
    icon: <WrenchIcon />,
    title: "Rehabilitación",
    description: "Transformación de espacios residenciales y comerciales. Modernización de oficinas, locales y viviendas adaptados a tus requerimientos.",
  },
  {
    icon: <MaximizeIcon />,
    title: "Ampliaciones",
    description: "Maximizamos tu espacio útil. Estructuras adicionales seguras con cálculos de ingeniería rigurosos y ejecución impecable.",
  },
  {
    icon: <DropletOffIcon />,
    title: "Patología Estructural",
    description: "Diagnóstico y evaluación de patologías en edificaciones, determinando su origen, causas y mecanismos de deterioro. Diseño y ejecución de soluciones integrales para la reparación, rehabilitación y recuperación de elementos estructurales afectados por procesos de corrosión asociados a la acción de iones cloruro y carbonatación del concreto, incluyendo pantallas de concreto armado y vigas de carga.",
  },
  {
    icon: <GridIcon />,
    title: "Estabilización de Taludes",
    description: "Diseño y desarrollo de soluciones de estabilización de terrenos mediante técnicas de terraceo y bermas. Diseño estructural de muros de contención tipo cantiléver, además de sistemas de mitigación de riesgos geológicos y muros de gravedad.",
  },
  {
    icon: <FileSignatureIcon />,
    title: "Proyectos",
    description: "Servicios integrales de ingeniería civil que incluyen cálculo y diseño estructural, proyectos de arquitectura, instalaciones sanitarias y eléctricas, estudios geotécnicos, elaboración de presupuestos mediante APU, gestión de permisologías municipales y coordinación con firmas de ingeniería avaladas por el CIV.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-[#f8f9fa] w-full pt-10 pb-6 sm:py-[60px] px-4 sm:px-8 md:px-[80px]">
      {/* Section header */}
      <div className="flex flex-col gap-3 items-center text-center mb-10 sm:mb-[60px]">
        <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#1a1d20] text-[10px] sm:text-[12px] uppercase tracking-wide">Especialistas a tu disposición</p>
        <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(22px,4vw,36px)] leading-[1.2]">Nuestros Servicios</h2>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[14px] sm:text-[16px] leading-[1.5] max-w-[720px]">
          Construcción, rehabilitación y proyectos de ingeniería civil con el respaldo del Ingeniero Juan Carlos Mogollón (C.I.V.: 72.381), especialista en patología estructural, estabilización de taludes y gerencia de construcción con más de 30 años de trayectoria.
        </p>
      </div>

      {/* Cards grid — 1 col on mobile, 2 on sm, 3 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s) => (
          <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
        ))}
      </div>
    </section>
  );
}
