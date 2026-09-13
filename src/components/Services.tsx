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
        <div className="shrink-0">
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

// 🏗️ Construction — crane (gold) + building (slate blue) + ground
function BuildingIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      {/* Building */}
      <rect x="5" y="20" width="20" height="20" rx="0.5" stroke="#4A6FA5" strokeWidth="1.6"/>
      <line x1="5" y1="28" x2="25" y2="28" stroke="#4A6FA5" strokeWidth="1.2"/>
      {/* Windows */}
      <rect x="7" y="22" width="4" height="4" rx="0.3" fill="#A8C4E0" stroke="#4A6FA5" strokeWidth="1"/>
      <rect x="14" y="22" width="4" height="4" rx="0.3" fill="#A8C4E0" stroke="#4A6FA5" strokeWidth="1"/>
      {/* Door */}
      <rect x="11" y="31" width="6" height="9" rx="0.5" stroke="#C4A035" strokeWidth="1.5"/>
      {/* Crane mast */}
      <line x1="33" y1="5" x2="33" y2="30" stroke="#C4A035" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Crane jib */}
      <line x1="18" y1="5" x2="38" y2="5" stroke="#C4A035" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Cable */}
      <line x1="22" y1="5" x2="22" y2="16" stroke="#888" strokeWidth="1.2" strokeDasharray="2 1.5"/>
      {/* Load */}
      <rect x="19" y="16" width="6" height="4.5" rx="0.5" fill="#E8D5A3" stroke="#C4A035" strokeWidth="1.3"/>
      {/* Ground */}
      <line x1="3" y1="40" x2="41" y2="40" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// 🏠 Remodeling — house (warm terracotta) + renovation accents (gold)
function WrenchIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      {/* Roof */}
      <path d="M6 20L22 5L38 20" stroke="#C0704A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Walls */}
      <path d="M9 18V38H35V18" stroke="#C0704A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Roof fill hint */}
      <path d="M22 7L36 20H8L22 7Z" fill="#E8C4B0" fillOpacity="0.35"/>
      {/* Door */}
      <rect x="17" y="27" width="10" height="11" rx="0.5" stroke="#C4A035" strokeWidth="1.5"/>
      <circle cx="25" cy="33" r="1" fill="#C4A035"/>
      {/* Window with renovation X */}
      <rect x="10" y="21" width="7" height="6" rx="0.5" fill="#A8C4E0" fillOpacity="0.5" stroke="#4A6FA5" strokeWidth="1.3"/>
      <line x1="10" y1="21" x2="17" y2="27" stroke="#C4A035" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="17" y1="21" x2="10" y2="27" stroke="#C4A035" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

// 📐 Extension — existing (blue) + new addition (gold dashed) + arrow
function MaximizeIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      {/* Existing structure */}
      <rect x="4" y="16" width="18" height="22" rx="0.5" fill="#E8EEF5" stroke="#4A6FA5" strokeWidth="1.6"/>
      <line x1="4" y1="24" x2="22" y2="24" stroke="#4A6FA5" strokeWidth="1.2"/>
      <rect x="8" y="27" width="5" height="8" rx="0.3" stroke="#4A6FA5" strokeWidth="1.1"/>
      {/* Extension — dashed gold */}
      <rect x="22" y="20" width="16" height="18" rx="0.5" fill="#FDF5E0" fillOpacity="0.6" stroke="#C4A035" strokeWidth="1.5" strokeDasharray="3 1.5"/>
      {/* Expansion arrow */}
      <path d="M30 10L36 4M36 4H30M36 4V10" stroke="#C4A035" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Ground */}
      <line x1="3" y1="38" x2="39" y2="38" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

// 🔍 Structural pathology — wall (slate) + crack (orange) + magnifier (dark)
function DropletOffIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      {/* Wall */}
      <rect x="4" y="10" width="24" height="26" rx="0.5" fill="#EEF1F5" stroke="#4A6FA5" strokeWidth="1.6"/>
      {/* Brick courses */}
      <line x1="4" y1="18" x2="28" y2="18" stroke="#B0BCC8" strokeWidth="0.8"/>
      <line x1="4" y1="26" x2="28" y2="26" stroke="#B0BCC8" strokeWidth="0.8"/>
      {/* Crack */}
      <path d="M13 12L16 19L13 26L16 34" stroke="#E07B39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Magnifier */}
      <circle cx="33" cy="14" r="7" stroke="#2d2d2d" strokeWidth="1.7"/>
      <circle cx="33" cy="14" r="3.5" fill="#D6E8F5" fillOpacity="0.6"/>
      <line x1="38.5" y1="19.5" x2="42.5" y2="23.5" stroke="#2d2d2d" strokeWidth="2.4" strokeLinecap="round"/>
      {/* Crosshair */}
      <line x1="33" y1="10" x2="33" y2="18" stroke="#C4A035" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="29" y1="14" x2="37" y2="14" stroke="#C4A035" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// ⛰️ Slope — hill (muted green) + terrace steps (gold) + retaining walls
function GridIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      {/* Hill fill */}
      <path d="M4 36L14 14L26 24L40 8L40 36Z" fill="#D6E8D0" fillOpacity="0.45"/>
      {/* Slope profile */}
      <path d="M4 36L14 14L26 24L40 8" stroke="#5A8A5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Terrace steps */}
      <path d="M4 36H14V26H26V16" stroke="#C4A035" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Retaining wall posts */}
      <line x1="4" y1="36" x2="4" y2="40" stroke="#6B4F2A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="26" x2="14" y2="30" stroke="#6B4F2A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="16" x2="26" y2="20" stroke="#6B4F2A" strokeWidth="2" strokeLinecap="round"/>
      {/* Ground */}
      <line x1="3" y1="40" x2="41" y2="40" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

// 📋 Projects — blueprint document (blue) + floor plan + gold annotation lines
function FileSignatureIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      {/* Document body */}
      <path d="M8 4H29L36 11V40H8V4Z" fill="#EEF3FB" stroke="#4A6FA5" strokeWidth="1.6" strokeLinejoin="round"/>
      {/* Folded corner */}
      <path d="M29 4V11H36" fill="#C8D8EE" stroke="#4A6FA5" strokeWidth="1.4" strokeLinejoin="round"/>
      {/* Floor plan box */}
      <rect x="11" y="15" width="9" height="7" rx="0.5" stroke="#2d2d2d" strokeWidth="1.3"/>
      <line x1="15" y1="15" x2="15" y2="22" stroke="#2d2d2d" strokeWidth="1"/>
      <line x1="11" y1="19" x2="20" y2="19" stroke="#2d2d2d" strokeWidth="1"/>
      {/* Annotation lines */}
      <line x1="21" y1="18" x2="32" y2="18" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11" y1="27" x2="32" y2="27" stroke="#C4A035" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="31" x2="27" y2="31" stroke="#C4A035" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="35" x2="21" y2="35" stroke="#C4A035" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const services = [
  {
    icon: <BuildingIcon />,
    title: "Construcción de Obras Civiles",
    description: "Desarrollo de proyectos desde fundaciones hasta acabados. Edificaciones residenciales, comerciales e infraestructura pública con estricto cumplimiento de normativas COVENIN.",
  },
  {
    icon: <WrenchIcon />,
    title: "Remodelaciones",
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
          Servicios integrales de ingeniería civil que incluyen elaboración de planos y proyectos de arquitectura, gestión de Carta Aval y solvencia del Colegio de Ingenieros de Venezuela para conformidad de uso. También ofrecemos avalúos de bienes inmuebles y servicios de peritaje brindando soluciones integrales para proyectos y trámites relacionados con la ingeniería civil y la construcción.
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
