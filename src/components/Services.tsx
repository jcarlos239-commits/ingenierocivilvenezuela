import { Link } from "react-router";
import icoConstruccion from "@/imports/72947.png";
import icoRemodelaciones from "@/imports/72948.png";
import icoAvaluos from "@/imports/72949.png";
import icoPatologia from "@/imports/72950.png";
import icoEstabilizacion from "@/imports/72952.png";
import icoProyectos from "@/imports/72951.png";

interface ServiceCardProps {
  src: string;
  title: string;
  path: string;
}

function ServiceCard({ src, title, path }: ServiceCardProps) {
  return (
    <Link
      to={path}
      className="group bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.04)] relative rounded-[16px] border border-[#e9ecef] hover:border-[#ffd200] hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center px-5 py-8 gap-5"
    >
      <img
        src={src}
        alt={title}
        loading="lazy"
        style={{ width: 80, height: 80, objectFit: "contain", display: "block" }}
      />

      <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[13px] sm:text-[14px] leading-snug">
        {title}
      </h3>

      <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ffd200] text-[13px] group-hover:underline transition-all">
        Ver más →
      </span>
    </Link>
  );
}

const services = [
  { src: icoProyectos,      title: "Proyectos",                                path: "/servicios/proyectos" },
  { src: icoConstruccion,   title: "Construcción de Obras Civiles",             path: "/servicios/construccion-obras-civiles" },
  { src: icoRemodelaciones, title: "Remodelaciones y Ampliaciones",             path: "/servicios/remodelaciones-ampliaciones" },
  { src: icoPatologia,      title: "Patología Estructural",                     path: "/servicios/patologia-estructural" },
  { src: icoAvaluos,        title: "Avalúos Técnicos y Peritajes Judiciales",   path: "/servicios/avaluos-peritajes-tecnicos" },
  { src: icoEstabilizacion, title: "Estabilización de Taludes",                 path: "/servicios/estabilizacion-taludes" },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-[#f8f9fa] w-full pt-10 pb-4 sm:pt-[60px] sm:pb-8 px-4 sm:px-8 md:px-[80px]">
      <div className="flex flex-col gap-3 items-center text-center mb-10 sm:mb-[60px]">
        <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#1a1d20] text-[10px] sm:text-[12px] uppercase tracking-wide">Ingeniería Civil a tu Disposición</p>
        <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(22px,4vw,36px)] leading-[1.2]">Nuestros Servicios</h2>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[14px] sm:text-[16px] leading-[1.5] max-w-[720px]">
          Servicios integrales de ingeniería civil que incluyen elaboración de planos y proyectos de arquitectura, gestión de Carta Aval y solvencia del Colegio de Ingenieros de Venezuela para conformidad de uso. También ofrecemos avalúos de bienes inmuebles y servicios de peritaje brindando soluciones integrales para proyectos y trámites relacionados con la ingeniería civil y la construcción.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s) => (
          <ServiceCard key={s.title} src={s.src} title={s.title} path={s.path} />
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
