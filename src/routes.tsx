import { createBrowserRouter } from "react-router";
import { routeConfig } from "./route-config";

export { routeConfig };

const hydrationData = (
  window as typeof window & { __staticRouterHydrationData?: unknown }
).__staticRouterHydrationData;

export const router = createBrowserRouter(routeConfig, {
  basename: import.meta.env.BASE_URL !== "/" ? import.meta.env.BASE_URL : undefined,
  ...(hydrationData ? { hydrationData } : {}),
});
