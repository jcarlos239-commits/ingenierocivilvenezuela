import ServicePageLayout from "./ServicePageLayout";
import icoPatologia from "@/imports/72950.png";
import icoConstruccion from "@/imports/72947.png";
import icoRemodelaciones from "@/imports/72948.png";
import icoEstabilizacion from "@/imports/72952.png";

export default function PatologiaEstructural() {
  return (
    <ServicePageLayout
      title="Patología Estructural"
      metaTitle="Patología Estructural | Ing. Juan Carlos Mogollón"
      metaDescription="Evaluación de patologías en edificaciones, diagnóstico de daños estructurales, corrosión del concreto armado y recomendaciones de reparación en Venezuela."
      intro="Evaluamos el estado de edificaciones con daños o deterioro estructural, identificamos sus causas y elaboramos recomendaciones técnicas orientadas a la reparación y rehabilitación de los elementos afectados."
      iconSrc={icoPatologia}
      whatWeOffer="La evaluación de patologías estructurales permite conocer el estado real de una edificación, entender las causas del deterioro y definir las intervenciones necesarias. El Ing. Juan Carlos Mogollón cuenta con conocimientos en patología de edificaciones aplicados a una amplia variedad de casos en Venezuela."
      items={[
        {
          title: "Evaluación de patologías en edificaciones",
          description: "Inspección técnica para identificar daños visibles y latentes en estructuras existentes, con registro detallado del estado de la edificación.",
        },
        {
          title: "Identificación de daños estructurales",
          description: "Reconocimiento y clasificación de fisuras, grietas, descascaramientos, deformaciones y otros indicadores de deterioro.",
        },
        {
          title: "Análisis de posibles causas",
          description: "Evaluación de los factores que originaron las patologías, incluyendo agentes externos, deficiencias constructivas y condiciones del suelo.",
        },
        {
          title: "Corrosión por iones cloruro",
          description: "Evaluación de procesos de corrosión del refuerzo metálico asociados a la acción de iones cloruro en ambientes marinos o industriales.",
        },
        {
          title: "Carbonatación del concreto",
          description: "Diagnóstico del avance de la carbonatación y su efecto sobre la pasivación del acero de refuerzo.",
        },
        {
          title: "Evaluación de vigas y pantallas de concreto armado",
          description: "Inspección de elementos estructurales específicos como vigas de carga y pantallas de concreto armado con signos de deterioro.",
        },
        {
          title: "Recomendaciones de reparación",
          description: "Elaboración de propuestas técnicas de reparación y rehabilitación adaptadas al tipo y extensión del daño identificado.",
        },
        {
          title: "Orientación en rehabilitación estructural",
          description: "Asesoría sobre las opciones técnicas disponibles para recuperar la integridad funcional de los elementos estructurales afectados.",
        },
      ]}
      relatedServices={[
        { title: "Construcción de Obras Civiles", path: "/servicios/construccion-obras-civiles", icon: icoConstruccion },
        { title: "Remodelaciones y Ampliaciones", path: "/servicios/remodelaciones-ampliaciones", icon: icoRemodelaciones },
        { title: "Estabilización de Taludes", path: "/servicios/estabilizacion-taludes", icon: icoEstabilizacion },
      ]}
    />
  );
}
