import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { renderToString } from "react-dom/server";
import { routeConfig } from "./route-config";
export { routeMeta } from "./utils/prerender-meta";

const BASE_URL = "https://ingenierocivilvenezuela.com";

export async function render(urlPath: string): Promise<string> {
  const handler = createStaticHandler(routeConfig);
  const request = new Request(`${BASE_URL}${urlPath}`);
  const context = await handler.query(request);

  if (context instanceof Response) {
    throw new Error(`Redirect encountered for ${urlPath}`);
  }

  const staticRouter = createStaticRouter(handler.dataRoutes, context);

  return renderToString(
    <StaticRouterProvider router={staticRouter} context={context} />,
  );
}
