import { createBrowserRouter, matchRoutes } from "react-router"
import { routeConfig } from "./route-config"

export { routeConfig }

const hydrationData = (window as typeof window & {
  __staticRouterHydrationData?: unknown
}).__staticRouterHydrationData

if (hydrationData) {
  const hydrationMatches = matchRoutes(routeConfig, window.location)

  await Promise.all(
    hydrationMatches?.map(async ({ route }) => {
      if (!route.lazy) return

      const lazyRoute = await route.lazy()
      Object.assign(route, lazyRoute)
      route.lazy = undefined
    }) ?? [],
  )
}

export const router = createBrowserRouter(routeConfig, {
  basename:
    import.meta.env.BASE_URL !== "/" ? import.meta.env.BASE_URL : undefined,
  ...(hydrationData ? { hydrationData } : {}),
})
