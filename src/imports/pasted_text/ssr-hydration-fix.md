Make ONE final, narrowly scoped SSR/HYDRATION compatibility fix.

DO NOT change the website's visual design.
DO NOT change any visible text.
DO NOT change "Avalúos Técnicos y Peritajes Judiciales".
DO NOT change routes.
DO NOT change navigation.
DO NOT change service pages.
DO NOT change the six official service PNGs.
DO NOT change hero images.
DO NOT change SEO titles/descriptions/canonicals.
DO NOT change robots.txt.
DO NOT change sitemap.xml.
DO NOT add or remove services.
DO NOT perform any unrelated cleanup.

The ONLY goal is to ensure that the React server-rendered HTML and the browser React hydration tree are compatible.

==================================================
CURRENT ARCHITECTURE
==================================================

SERVER:

routeConfig
→ createStaticHandler
→ createStaticRouter
→ StaticRouterProvider
→ renderToString()
→ static HTML

CLIENT:

prerendered HTML
→ hydrateRoot()
→ browser React application

The existing shared routeConfig MUST remain the single source of truth.

==================================================
TASK 1 — AUDIT THE SERVER RENDERER
==================================================

Inspect:

src/entry-server.tsx

and the current prerendering implementation.

Continue using:

- createStaticHandler
- createStaticRouter
- StaticRouterProvider
- renderToString

Do NOT replace the SSR implementation with metadata-only rendering.

The server must continue producing real React page HTML.

==================================================
TASK 2 — MAKE STATIC ROUTER HYDRATION DATA EXPLICIT
==================================================

Because StaticRouterProvider can emit React Router hydration data, make the server/client relationship explicit.

Use the appropriate React Router SSR hydration mechanism supported by the currently installed React Router version.

The generated server HTML must contain whatever router hydration data is required for the browser to safely hydrate the same route.

Do not duplicate route definitions.

Do not manually recreate page components.

==================================================
TASK 3 — CLIENT HYDRATION
==================================================

Inspect the client entry point, currently responsible for:

hydrateRoot()

and the browser router.

The client must use:

hydrateRoot()

when prerendered HTML exists.

Do NOT use createRoot() for the initial load when the HTML has already been server-rendered.

The browser must hydrate the existing:

<div id="root">...</div>

rather than replacing it unnecessarily.

Keep the existing BrowserRouter/createBrowserRouter behavior for normal client-side navigation.

==================================================
TASK 4 — ROUTE CONSISTENCY
==================================================

The server and client must use the same routeConfig.

Verify all current routes:

/
/servicios
/como-trabajamos
/cobertura
/servicios/proyectos
/servicios/construccion-obras-civiles
/servicios/remodelaciones-ampliaciones
/servicios/avaluos-peritajes-tecnicos
/servicios/patologia-estructural
/servicios/estabilizacion-taludes

For every route:

SERVER:
pathname → same route component

CLIENT:
pathname → same route component

Do not create separate versions of the pages.

==================================================
TASK 5 — PREVENT HYDRATION MISMATCHES
==================================================

Inspect the components used by the initial page render for browser-only values.

Look for things such as:

- window
- document
- window.innerWidth
- navigator
- Date.now()
- Math.random()
- viewport-dependent conditional markup
- client-only IDs
- browser-only API calls that affect rendered markup

If any of these cause the server HTML and initial client render to differ, make the SMALLEST possible change to defer that behavior until after hydration.

Do not alter the visual result.

Do not rewrite components unnecessarily.

==================================================
TASK 6 — PRESERVE ALL CURRENT SEO
==================================================

Do not remove or alter the current:

- title
- meta description
- canonical
- og:title
- og:description
- og:url
- og:image
- og:image:type
- og:image:width
- og:image:height
- og:image:alt
- twitter:card
- twitter:image

The current OG image remains:

https://ingenierocivilvenezuela.com/og-image.webp

==================================================
IMPORTANT CONTENT PROTECTION
==================================================

The following text MUST remain exactly as it currently is:

"Avalúos Técnicos y Peritajes Judiciales"

Do not change it to "Peritajes Técnicos".

==================================================
TASK 7 — VERIFY THE BUILD
==================================================

Run:

npm run build

The build must:

1. Build the Vite client.
2. Build the server renderer.
3. Generate static HTML for all ten routes.
4. Put real React content inside each route's #root.
5. Preserve route-specific metadata.
6. Preserve the OG image metadata.
7. Complete without errors.

If the build fails, fix ONLY the SSR/hydration issue responsible for the failure.

Do not make unrelated changes.

==================================================
TASK 8 — VERIFY HYDRATION
==================================================

If the Figma Make environment allows a production preview/browser test, verify at least:

/
 /servicios
 /servicios/proyectos

Check that:

- the page displays correctly from the prerendered HTML
- React hydrates successfully
- there are no hydration mismatch errors
- client-side navigation still works
- buttons/links still work

Do NOT claim hydration was verified if an actual browser/build test was not available.

==================================================
FINAL RULE
==================================================

This is the FINAL SSR/hydration cleanup.

Do not make additional SEO, design, content, image, route, or architecture changes.

At the end, report only:

1. Files changed.
2. What was changed in SSR/hydration.
3. Whether npm run build succeeded.
4. Whether browser hydration was actually tested.
5. Whether any hydration mismatch errors remain.
6. Confirm that "Avalúos Técnicos y Peritajes Judiciales" was left unchanged.