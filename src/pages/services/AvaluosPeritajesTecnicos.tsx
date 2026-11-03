import ServicePageLayout from "./ServicePageLayout";
import icoAvaluos from "@/imports/72949.webp";
import icoProyectos from "@/imports/72951-card.webp";
import icoPatologia from "@/imports/72950-card.webp";
import icoConstruccion from "@/imports/72947-card.webp";

export default function AvaluosPeritajesTecnicos() {
  return (
    <ServicePageLayout
      title="Avalúos Técnicos y Peritajes Judiciales"
      intro="Realizamos avalúos técnicos de bienes inmuebles y peritajes judiciales con elaboración de informes documentados, útiles para trámites legales, bancarios y administrativos relacionados con propiedades e infraestructuras."
      iconSrc={icoAvaluos}
      whatWeOffer="Nuestros servicios de avalúos técnicos y peritajes judiciales brindan la documentación técnica necesaria para respaldar decisiones patrimoniales, procesos legales y gestiones ante entidades bancarias y administrativas. Los informes son elaborados con criterio técnico de ingeniería civil."
      items={[
        {
          title: "Avalúos técnicos de bienes inmuebles",
          description: "Determinación del valor de propiedades residenciales, comerciales e industriales mediante inspección técnica y análisis comparativo.",
        },
        {
          title: "Valoración de infraestructuras",
          description: "Estimación del valor técnico y económico de obras civiles, estructuras e instalaciones.",
        },
        {
          title: "Inspecciones técnicas",
          description: "Visitas de inspección presencial para evaluar el estado físico y constructivo del inmueble o infraestructura.",
        },
        {
          title: "Peritajes Judiciales",
          description: "Evaluación técnica especializada de inmuebles y estructuras para determinar condiciones, daños o causas de fallas.",
        },
        {
          title: "Elaboración de informes periciales",
          description: "Redacción de informes técnicos detallados con respaldo fotográfico, descriptivo y cuantitativo.",
        },
        {
          title: "Documentación para trámites legales",
          description: "Informes periciales utilizables en procesos judiciales, arbitrajes y procedimientos legales.",
        },
        {
          title: "Documentación para trámites bancarios",
          description: "Avalúos para solicitudes de crédito hipotecario, refinanciamiento y otras gestiones ante instituciones financieras.",
        },
        {
          title: "Documentación para trámites administrativos",
          description: "Informes para particiones de bienes, sucesiones, compraventas y gestiones ante registros y notarías.",
        },
      ]}
      relatedServices={[
        { title: "Proyectos", path: "/servicios/proyectos", icon: icoProyectos },
        { title: "Patología Estructural", path: "/servicios/patologia-estructural", icon: icoPatologia },
        { title: "Construcción de Obras Civiles", path: "/servicios/construccion-obras-civiles", icon: icoConstruccion },
      ]}
    />
  );
}
