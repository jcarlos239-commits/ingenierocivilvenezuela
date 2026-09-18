import { Link } from "react-router";
import icoConstruccion from "@/imports/72947.png";
import icoRemodelaciones from "@/imports/72948.png";
import icoAvaluos from "@/imports/72949.png";
import icoPatologia from "@/imports/72950.png";
import icoEstabilizacion from "@/imports/72952.png";
import icoProyectos from "@/imports/72951.png";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

function ServiceCard({ icon, title, description, path }: ServiceCardProps) {
  return (
    <Link
      to={path}
      className="group bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] relative rounded-[12px] border border-[#e9ecef] hover:border-[#ffd200] hover:shadow-md transition-all cursor-pointer flex flex-col"
    >
      <div className="flex flex-col gap-5 items-start p-6 sm:p-8 h-full">
        <div className="shrink-0">
          {icon}
        </div>
        <div className="flex flex-col gap-[10px] flex-1">
          <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[14px] sm:text-[16px] leading-normal">{title}</h3>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[14px] leading-[1.5]">{description}</p>
        </div>
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ffd200] text-[12px] sm:text-[13px] opacity-0 group-hover:opacity-100 transition-opacity pt-1">
          Ver servicio →
        </span>
      </div>
    </Link>
  );
}

function ServiceIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={64}
      height={64}
      style={{ width: 64, height: 64, objectFit: "contain", display: "block" }}
    />
  );
}

const services = [
  {
    icon: <ServiceIcon src={icoProyectos} alt="Proyectos" />,
    title: "Proyectos",
    description: "Servicios integrales de ingeniería civil que incluyen cálculo y diseño estructural, proyectos de arquitectura, instalaciones sanitarias y eléctricas, estudios geotécnicos, elaboración de presupuestos mediante APU, gestión de permisologías municipales y coordinación con firmas de ingeniería avaladas por el CIV.",
    path: "/servicios/proyectos",
  },
  {
    icon: <ServiceIcon src={icoConstruccion} alt="Construcción de Obras Civiles" />,
    title: "Construcción de Obras Civiles",
    description: "Desarrollo de proyectos desde fundaciones hasta acabados. Edificaciones residenciales, comerciales e infraestructura pública con estricto cumplimiento de normativas COVENIN.",
    path: "/servicios/construccion-obras-civiles",
  },
  {
    icon: <ServiceIcon src={icoRemodelaciones} alt="Remodelaciones y Ampliaciones" />,
    title: "Remodelaciones y Ampliaciones",
    description: "Transformamos y ampliamos espacios residenciales y comerciales, modernizando oficinas, locales y viviendas de acuerdo con tus requerimientos. Desarrollamos ampliaciones y estructuras adicionales para maximizar el espacio útil, con soluciones seguras, cálculos de ingeniería rigurosos y una ejecución de calidad.",
    path: "/servicios/remodelaciones-ampliaciones",
  },
  {
    icon: <ServiceIcon src={icoPatologia} alt="Patología Estructural" />,
    title: "Patología Estructural",
    description: "Diagnóstico y evaluación de patologías en edificaciones, determinando su origen, causas y mecanismos de deterioro. Diseño y ejecución de soluciones integrales para la reparación, rehabilitación y recuperación de elementos estructurales afectados por procesos de corrosión asociados a la acción de iones cloruro y carbonatación del concreto, incluyendo pantallas de concreto armado y vigas de carga.",
    path: "/servicios/patologia-estructural",
  },
  {
    icon: <ServiceIcon src={icoAvaluos} alt="Avalúos y Peritajes Técnicos" />,
    title: "Avalúos y Peritajes Técnicos",
    description: "Avalúos de bienes inmuebles, peritajes técnicos y elaboración de informes periciales para trámites legales, bancarios y administrativos. Asesoría especializada en la determinación del valor real de propiedades e infraestructuras.",
    path: "/servicios/avaluos-peritajes-tecnicos",
  },
  {
    icon: <ServiceIcon src={icoEstabilizacion} alt="Estabilización de Taludes" />,
    title: "Estabilización de Taludes",
    description: "Diseño y desarrollo de soluciones de estabilización de terrenos mediante técnicas de terraceo y bermas. Diseño estructural de muros de contención tipo cantiléver, además de sistemas de mitigación de riesgos geológicos y muros de gravedad.",
    path: "/servicios/estabilizacion-taludes",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-[#f8f9fa] w-full pt-10 pb-6 sm:py-[60px] px-4 sm:px-8 md:px-[80px]">
      <div className="flex flex-col gap-3 items-center text-center mb-10 sm:mb-[60px]">
        <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#1a1d20] text-[10px] sm:text-[12px] uppercase tracking-wide">Especialistas a tu disposición</p>
        <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(22px,4vw,36px)] leading-[1.2]">Nuestros Servicios</h2>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[14px] sm:text-[16px] leading-[1.5] max-w-[720px]">
          Servicios integrales de ingeniería civil que incluyen elaboración de planos y proyectos de arquitectura, gestión de Carta Aval y solvencia del Colegio de Ingenieros de Venezuela para conformidad de uso. También ofrecemos avalúos de bienes inmuebles y servicios de peritaje brindando soluciones integrales para proyectos y trámites relacionados con la ingeniería civil y la construcción.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s) => (
          <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} path={s.path} />
        ))}
      </div>

      <div className="flex justify-center mt-8 sm:mt-10">
        <Link
          to="/servicios"
          className="inline-flex items-center gap-2 text-[#111315] hover:text-[#ffd200] transition-colors font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px] sm:text-[15px]"
        >
          Ver todos los servicios →
        </Link>
      </div>
    </section>
  );
}
