import ServicePageLayout from "./ServicePageLayout";
import icoProyectos from "@/imports/72951.png";
import icoConstruccion from "@/imports/72947.png";
import icoRemodelaciones from "@/imports/72948.png";
import icoAvaluos from "@/imports/72949.png";

export default function Proyectos() {
  return (
    <ServicePageLayout
      title="Proyectos"
      metaTitle="Proyectos de Ingeniería Civil | Ing. Juan Carlos Mogollón"
      metaDescription="Servicios de proyectos de ingeniería civil: cálculo estructural, arquitectura, instalaciones, estudios geotécnicos, presupuestos APU y gestión de permisologías en Venezuela."
      intro="Desarrollamos proyectos integrales de ingeniería civil, desde la concepción del diseño hasta la gestión de la documentación legal y técnica necesaria para ejecutar tu obra con respaldo profesional."
      iconSrc={icoProyectos}
      whatWeOffer="Nuestros servicios de proyectos abarcan todas las etapas técnicas y administrativas que requiere una obra civil: el diseño, los cálculos, las instalaciones y los trámites ante los organismos competentes. Trabajamos en coordinación con firmas de ingeniería avaladas por el Colegio de Ingenieros de Venezuela."
      items={[
        {
          title: "Elaboración de planos",
          description: "Planos arquitectónicos, estructurales y de instalaciones con el detalle técnico necesario para la ejecución de la obra.",
        },
        {
          title: "Cálculo y diseño estructural",
          description: "Análisis y dimensionamiento de estructuras de concreto armado y acero bajo las normativas COVENIN vigentes.",
        },
        {
          title: "Proyectos de arquitectura",
          description: "Diseño de espacios funcionales y eficientes para usos residenciales, comerciales e institucionales.",
        },
        {
          title: "Instalaciones sanitarias y eléctricas",
          description: "Proyectos de redes de agua potable, aguas servidas y sistemas eléctricos integrados al diseño general.",
        },
        {
          title: "Estudios geotécnicos",
          description: "Evaluación del suelo para determinar la capacidad portante y definir el tipo de cimentación adecuado.",
        },
        {
          title: "Presupuestos mediante APU",
          description: "Elaboración de Análisis de Precios Unitarios detallados con cómputos métricos y cronogramas de ejecución.",
        },
        {
          title: "Gestión de permisologías municipales",
          description: "Tramitación de variables urbanas, permisos de construcción y documentos ante las alcaldías correspondientes.",
        },
        {
          title: "Carta Aval y solvencia del CIV",
          description: "Gestión de la Carta Aval y la solvencia del Colegio de Ingenieros de Venezuela para conformidad de uso.",
        },
        {
          title: "Coordinación con firmas de ingeniería",
          description: "Trabajo conjunto con firmas avaladas por el CIV cuando el proyecto requiere firmas adicionales especializadas.",
        },
      ]}
      relatedServices={[
        { title: "Construcción de Obras Civiles", path: "/servicios/construccion-obras-civiles", icon: icoConstruccion },
        { title: "Remodelaciones y Ampliaciones", path: "/servicios/remodelaciones-ampliaciones", icon: icoRemodelaciones },
        { title: "Avalúos y Peritajes Técnicos", path: "/servicios/avaluos-peritajes-tecnicos", icon: icoAvaluos },
      ]}
    />
  );
}
