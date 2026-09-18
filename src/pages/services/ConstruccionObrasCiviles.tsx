import ServicePageLayout from "./ServicePageLayout";
import icoConstruccion from "@/imports/72947.png";
import icoRemodelaciones from "@/imports/72948.png";
import icoProyectos from "@/imports/72951.png";
import icoPatologia from "@/imports/72950.png";

export default function ConstruccionObrasCiviles() {
  return (
    <ServicePageLayout
      title="Construcción de Obras Civiles"
      metaTitle="Construcción de Obras Civiles | Ing. Juan Carlos Mogollón"
      metaDescription="Servicios de construcción de obras civiles residenciales, comerciales e infraestructura en Venezuela, con más de 30 años de experiencia y cumplimiento de normativas COVENIN."
      intro="Ejecutamos proyectos de construcción desde sus fundaciones hasta los acabados finales, con supervisión técnica permanente y estricto cumplimiento de las normativas COVENIN aplicables."
      iconSrc={icoConstruccion}
      whatWeOffer="Ofrecemos servicios de construcción para proyectos residenciales, comerciales e infraestructura pública. Cada obra es supervisada por el Ing. Juan Carlos Mogollón, con más de 30 años de trayectoria en la ejecución de obras civiles en Venezuela."
      items={[
        {
          title: "Fundaciones",
          description: "Diseño y construcción de fundaciones superficiales y profundas adaptadas a las condiciones del terreno y la carga de la estructura.",
        },
        {
          title: "Estructuras de concreto armado",
          description: "Ejecución de columnas, vigas, losas y muros estructurales conforme a los planos aprobados y normativas vigentes.",
        },
        {
          title: "Obras residenciales",
          description: "Construcción de casas y edificios residenciales con atención al detalle en cada etapa de la obra.",
        },
        {
          title: "Obras comerciales e institucionales",
          description: "Edificaciones para usos comerciales, de oficinas e institucionales con criterios funcionales y constructivos de calidad.",
        },
        {
          title: "Infraestructura",
          description: "Construcción de obras de infraestructura civil como vialidades, canalizaciones y obras de urbanismo.",
        },
        {
          title: "Acabados",
          description: "Ejecución de revestimientos, pisos, pintura, carpintería y demás partidas de acabado hasta la entrega formal de la obra.",
        },
        {
          title: "Supervisión y coordinación",
          description: "Supervisión técnica permanente en sitio durante todas las etapas de la construcción, con control de calidad y cronograma.",
        },
        {
          title: "Cumplimiento normativo",
          description: "Aplicación de las normativas COVENIN y demás regulaciones venezolanas de construcción y seguridad en todas las obras.",
        },
      ]}
      relatedServices={[
        { title: "Proyectos", path: "/servicios/proyectos", icon: icoProyectos },
        { title: "Remodelaciones y Ampliaciones", path: "/servicios/remodelaciones-ampliaciones", icon: icoRemodelaciones },
        { title: "Patología Estructural", path: "/servicios/patologia-estructural", icon: icoPatologia },
      ]}
    />
  );
}
