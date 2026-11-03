import ServicePageLayout from "./ServicePageLayout";
import icoEstabilizacion from "@/imports/72952.webp";
import icoPatologia from "@/imports/72950-card.webp";
import icoConstruccion from "@/imports/72947-card.webp";
import icoProyectos from "@/imports/72951-card.webp";

export default function EstabilizacionTaludes() {
  return (
    <ServicePageLayout
      title="Estabilización de Taludes"
      intro="Diseñamos y desarrollamos soluciones técnicas para la estabilización de terrenos en pendiente, incorporando medidas estructurales y de mitigación de riesgos geológicos adaptadas a las condiciones de cada sitio."
      iconSrc={icoEstabilizacion}
      whatWeOffer="La estabilización de taludes requiere una evaluación técnica precisa del terreno y la definición de soluciones estructurales adecuadas. Desarrollamos proyectos que combinan técnicas de terraceo, muros de contención de concreto armado y sistemas de drenaje para garantizar la estabilidad a largo plazo."
      items={[
        {
          title: "Evaluación de terrenos en pendiente",
          description: "Análisis de las condiciones topográficas, geológicas e hidrológicas del talud para definir la solución de estabilización más apropiada.",
        },
        {
          title: "Terraceo",
          description: "Conformación de terrazas escalonadas para reducir la pendiente efectiva y distribuir las cargas sobre el terreno.",
        },
        {
          title: "Bermas de estabilización",
          description: "Diseño y construcción de bermas para mejorar el equilibrio del talud y controlar la erosión superficial.",
        },
        {
          title: "Muros de contención tipo cantiléver",
          description: "Diseño estructural y construcción de muros en voladizo de concreto armado para contener empujes de tierra en zonas de corte o relleno.",
        },
        {
          title: "Muros de gravedad",
          description: "Soluciones de contención basadas en el peso propio del muro, utilizando mampostería o concreto ciclópeo según el caso.",
        },
        {
          title: "Muros de Hormigón Ciclópeo",
          description: "Construcción de muros de contención en hormigón ciclópeo, incorporando piedras de gran tamaño embebidas en la mezcla para optimizar el uso de materiales y garantizar la estabilidad del talud.",
        },
        {
          title: "Sistemas de drenaje",
          description: "Incorporación de drenes y bajantes para controlar el nivel freático y reducir las presiones hidrostáticas sobre las estructuras de contención.",
        },
        {
          title: "Mitigación de riesgos geológicos",
          description: "Diseño de medidas preventivas frente a deslizamientos, desprendimientos y erosión en zonas de riesgo geotécnico.",
        },
      ]}
      relatedServices={[
        { title: "Patología Estructural", path: "/servicios/patologia-estructural", icon: icoPatologia },
        { title: "Construcción de Obras Civiles", path: "/servicios/construccion-obras-civiles", icon: icoConstruccion },
        { title: "Proyectos", path: "/servicios/proyectos", icon: icoProyectos },
      ]}
    />
  );
}
