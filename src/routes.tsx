import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import ComoTrabajamos from "./pages/ComoTrabajamos";
import Cobertura from "./pages/Cobertura";
import Proyectos from "./pages/services/Proyectos";
import ConstruccionObrasCiviles from "./pages/services/ConstruccionObrasCiviles";
import RemodelacionesAmpliaciones from "./pages/services/RemodelacionesAmpliaciones";
import AvaluosPeritajesTecnicos from "./pages/services/AvaluosPeritajesTecnicos";
import PatologiaEstructural from "./pages/services/PatologiaEstructural";
import EstabilizacionTaludes from "./pages/services/EstabilizacionTaludes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "servicios", Component: Servicios },
      { path: "como-trabajamos", Component: ComoTrabajamos },
      { path: "cobertura", Component: Cobertura },
      { path: "servicios/proyectos", Component: Proyectos },
      { path: "servicios/construccion-obras-civiles", Component: ConstruccionObrasCiviles },
      { path: "servicios/remodelaciones-ampliaciones", Component: RemodelacionesAmpliaciones },
      { path: "servicios/avaluos-peritajes-tecnicos", Component: AvaluosPeritajesTecnicos },
      { path: "servicios/patologia-estructural", Component: PatologiaEstructural },
      { path: "servicios/estabilizacion-taludes", Component: EstabilizacionTaludes },
    ],
  },
], {
  basename: import.meta.env.BASE_URL !== "/" ? import.meta.env.BASE_URL : undefined,
});
