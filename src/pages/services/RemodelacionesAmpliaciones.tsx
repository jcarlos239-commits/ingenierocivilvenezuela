import ServicePageLayout from "./ServicePageLayout";
import icoRemodelaciones from "@/imports/72948.png";
import icoConstruccion from "@/imports/72947.png";
import icoProyectos from "@/imports/72951.png";
import icoPatologia from "@/imports/72950.png";

export default function RemodelacionesAmpliaciones() {
  return (
    <ServicePageLayout
      title="Remodelaciones y Ampliaciones"
      metaTitle="Remodelaciones y Ampliaciones | Ing. Juan Carlos Mogollón"
      metaDescription="Remodelación y ampliación de viviendas, oficinas y locales comerciales en Venezuela. Transformamos y modernizamos espacios con cálculos de ingeniería rigurosos."
      intro="Transformamos y ampliamos espacios existentes con soluciones de ingeniería que maximizan la funcionalidad, el confort y el valor de tu propiedad, con cálculos estructurales rigurosos en cada proyecto."
      iconSrc={icoRemodelaciones}
      whatWeOffer="Atendemos proyectos de remodelación y ampliación para viviendas, oficinas y locales comerciales. Cada intervención parte de un análisis técnico del estado actual de la edificación para garantizar que los nuevos trabajos sean estructuralmente seguros y compatibles con la construcción existente."
      items={[
        {
          title: "Remodelación de viviendas",
          description: "Actualización de espacios residenciales: redistribución de ambientes, renovación de baños y cocinas, y mejoras en acabados.",
        },
        {
          title: "Remodelación de oficinas y locales",
          description: "Modernización de espacios comerciales e institucionales adaptados a las necesidades funcionales del cliente.",
        },
        {
          title: "Redistribución de espacios",
          description: "Análisis y rediseño del uso del espacio existente para mejorar la circulación, la iluminación natural y el aprovechamiento del área.",
        },
        {
          title: "Ampliaciones residenciales",
          description: "Diseño y construcción de nuevas áreas habitables adosadas a la estructura existente, con verificación de compatibilidad estructural.",
        },
        {
          title: "Estructuras adicionales",
          description: "Ejecución de losas, vigas, columnas y muros adicionales para soportar las ampliaciones proyectadas.",
        },
        {
          title: "Optimización del espacio disponible",
          description: "Soluciones para maximizar el uso útil de áreas existentes mediante intervenciones técnicas eficientes.",
        },
        {
          title: "Verificación estructural previa",
          description: "Evaluación del estado de la edificación antes de iniciar cualquier obra de remodelación o ampliación.",
        },
      ]}
      relatedServices={[
        { title: "Construcción de Obras Civiles", path: "/servicios/construccion-obras-civiles", icon: icoConstruccion },
        { title: "Proyectos", path: "/servicios/proyectos", icon: icoProyectos },
        { title: "Patología Estructural", path: "/servicios/patologia-estructural", icon: icoPatologia },
      ]}
    />
  );
}
