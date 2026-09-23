Perform ONE final technical SEO/SSR cleanup pass.

IMPORTANT:
This is NOT a redesign.

DO NOT change:
- visual design
- colors
- typography
- layouts
- page copy
- navigation
- routes
- service cards
- hero design
- the six official service PNGs
- the 14-A1 favicon design
- the OG image
- "Avalúos Técnicos y Peritajes Judiciales"

Only perform the five technical tasks below.

==================================================
TASK 1 — FIX SSR / REACT ROUTER HYDRATION
==================================================

Audit the current SSR implementation:

SERVER:
createStaticHandler
→ createStaticRouter
→ StaticRouterProvider
→ renderToString()

CLIENT:
createBrowserRouter
→ RouterProvider
→ hydrateRoot()

Make the server and browser hydration architecture explicitly compatible.

The existing shared routeConfig must remain the single source of truth.

Use React Router's supported SSR hydration mechanism for the currently installed React Router version.

The server should expose the static-router hydration data required by the client.

The browser's createBrowserRouter should consume that hydration data when it exists.

Conceptually the architecture should be:

SERVER:

routeConfig
→ createStaticHandler
→ query(request)
→ createStaticRouter(routes, context)
→ StaticRouterProvider
→ renderToString()
→ HTML + router hydration data

CLIENT:

prerendered HTML
→ read React Router hydration data
→ createBrowserRouter(routeConfig, { hydrationData })
→ hydrateRoot()
→ React application

Do NOT replace SSR with client-only rendering.

Do NOT go back to metadata-only prerendering.

Do NOT use createRoot() for the initial prerendered page.

Use hydrateRoot().

Do NOT duplicate route definitions.

Do NOT duplicate page components.

The same routeConfig must be used by both server and client.

IMPORTANT:
Use the exact hydration API supported by the installed React Router version rather than inventing a custom mechanism.

Avoid manually serializing arbitrary application state if React Router already provides its supported hydration mechanism.

==================================================
TASK 2 — FIX HTML LANGUAGE
==================================================

The website is Spanish-language.

Change the root HTML language from English to Spanish.

The final production HTML must contain:

<html lang="es">

Do NOT use:

<html lang="en">

Do not leave a Figma placeholder such as:

<html lang="<!-- figma:lang -->">

unless the build system reliably replaces it with "es".

Prefer setting the project's language configuration to Spanish so the generated HTML consistently uses:

lang="es"

The website content is Spanish, so this must apply to the generated production HTML.

Do not change any visible text.

==================================================
TASK 3 — MOVE SERVICE/BREADCRUMB JSON-LD INTO STATIC HTML
==================================================

Currently Service and BreadcrumbList JSON-LD are being added from a client-side useEffect().

That means they are not present during renderToString().

Fix this.

The important Service and BreadcrumbList structured data for each service page must exist in the prerendered HTML.

Do NOT rely on useEffect() for SEO-critical JSON-LD.

Create the structured-data elements as part of the React render tree so renderToString() includes them.

Use appropriate:

<script type="application/ld+json">
...
</script>

inside the rendered document/head structure supported by the existing architecture.

Alternatively, if the existing prerender pipeline has a metadata/head injection mechanism, integrate the JSON-LD there.

Use whichever approach is most compatible with the existing application.

DO NOT create duplicate JSON-LD.

If the ServicePageLayout currently creates the Service and BreadcrumbList JSON-LD inside useEffect(), remove that client-only SEO mechanism after replacing it with the server-renderable implementation.

The browser should not append a second copy after hydration.

==================================================
SERVICE SCHEMA
==================================================

Use only the actual existing services and their real URLs.

The service pages are:

/servicios/proyectos

/servicios/construccion-obras-civiles

/servicios/remodelaciones-ampliaciones

/servicios/avaluos-peritajes-tecnicos

/servicios/patologia-estructural

/servicios/estabilizacion-taludes

IMPORTANT:
The existing service terminology must remain exactly as currently defined.

In particular:

"Avalúos Técnicos y Peritajes Judiciales"

MUST NOT be changed.

Do not replace "Peritajes Judiciales" with "Peritajes Técnicos".

Use the actual visible service name from the existing page.

==================================================
BREADCRUMB SCHEMA
==================================================

For each individual service page, generate BreadcrumbList based on the real route hierarchy.

Example:

Inicio
→ Servicios
→ Proyectos

For:

/servicios/proyectos

Use the real canonical URLs already defined by the site.

Do not create breadcrumbs for nonexistent pages.

Do not invent URLs.

==================================================
TASK 4 — CLEAN UNUSED IMAGE DUPLICATES
==================================================

Perform a complete reference audit of image assets before deleting anything.

IMPORTANT:

Do NOT delete an image simply because it appears duplicated.

For every candidate obsolete image:

1. Search the entire repository for its filename.
2. Search for imports without the extension where applicable.
3. Search CSS references.
4. Search JSX/TSX references.
5. Search HTML references.
6. Search metadata references.
7. Search configuration references.
8. Search scripts/prerender references.
9. Search manifest references.

ONLY DELETE an image if it is confirmed completely unused.

If an old image is still used as an actual fallback, KEEP IT.

Specifically:

The optimized hero assets must remain:

src/imports/ObrasCivilesLanding/hero-desktop.webp

src/imports/ObrasCivilesLanding/hero-mobile.webp

public/og-image.webp

DO NOT delete these.

The six official service icons MUST remain unchanged:

72947.png
72948.png
72949.png
72950.png
72951.png
72952.png

DO NOT delete these.

The selected favicon assets MUST remain.

Do NOT delete:

favicon.ico
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
apple-touch-icon.png
icon-192.png
icon-512.png

If an old hero PNG is still referenced by Hero.tsx, Servicios.tsx, ComoTrabajamos.tsx, Cobertura.tsx, or any other active source file, DO NOT delete it during this pass.

If you determine that it is only being used as an unnecessary fallback and can safely be replaced by the optimized WebP without changing the visual result, you may make that minimal reference change first, verify it, and then remove the obsolete PNG.

However:

DO NOT remove a fallback merely for file-count reduction.

Performance and correctness are more important than cleanup.

Also check for duplicate copies of the same hero asset in different directories.

Only remove confirmed unused duplicates.

==================================================
TASK 5 — ACTUALLY RUN AND VERIFY THE BUILD
==================================================

This task is REQUIRED.

Run:

npm run build

Do not simply inspect package.json.

Actually execute the build if the Figma Make environment allows it.

The build must complete successfully.

Verify that:

1. Vite client build succeeds.

2. SSR/server build succeeds.

3. prerendering succeeds.

4. All ten public routes are generated.

Verify these files:

dist/index.html

dist/servicios/index.html

dist/como-trabajamos/index.html

dist/cobertura/index.html

dist/servicios/proyectos/index.html

dist/servicios/construccion-obras-civiles/index.html

dist/servicios/remodelaciones-ampliaciones/index.html

dist/servicios/avaluos-peritajes-tecnicos/index.html

dist/servicios/patologia-estructural/index.html

dist/servicios/estabilizacion-taludes/index.html

5. Every generated HTML file contains actual React markup inside:

<div id="root">...</div>

The root must NOT be empty.

6. Verify every generated route has:

<title>

<meta name="description">

<link rel="canonical">

og:title

og:description

og:url

og:image

7. Verify the OG image metadata remains:

https://ingenierocivilvenezuela.com/og-image.webp

8. Verify the OG image metadata includes:

og:image:type

og:image:width

og:image:height

og:image:alt

9. Verify the Twitter card remains:

twitter:card = summary_large_image

10. Verify:

<html lang="es">

11. Verify individual service pages contain Service JSON-LD in the generated static HTML.

12. Verify individual service pages contain BreadcrumbList JSON-LD in the generated static HTML.

13. Verify there is only ONE Service JSON-LD and ONE BreadcrumbList JSON-LD per applicable page.

14. Verify the Organization and WebSite JSON-LD already present in index.html remain valid.

15. Verify:

"Avalúos Técnicos y Peritajes Judiciales"

remains unchanged.

16. Verify the six official service PNGs still exist and are still referenced.

17. Verify the 14-A1 favicon files remain present.

==================================================
HYDRATION VERIFICATION
==================================================

If a production browser preview is available, test at least:

/
 /servicios
 /servicios/proyectos

Check for:

- hydration mismatch warnings
- React errors
- console errors caused by SSR/hydration
- broken client-side navigation
- broken buttons/links

If browser testing is NOT available, do not claim that browser hydration was tested.

Report that it was not tested.

==================================================
IMPORTANT SAFETY RULE
==================================================

If any change creates a build error, revert/fix ONLY the change responsible.

Do not make unrelated modifications to solve an unrelated problem.

Do not alter visual design to solve technical issues.

Do not change service terminology.

Do not change the OG image.

Do not replace the 14-A1 favicon.

==================================================
FINAL REPORT
==================================================

At the end, report:

1. Files changed.
2. SSR/hydration fix performed.
3. Confirmation that lang="es" is now generated.
4. Confirmation that Service JSON-LD is present in static HTML.
5. Confirmation that BreadcrumbList JSON-LD is present in static HTML.
6. Which unused image files were actually removed, if any.
7. Confirmation that referenced images were preserved.
8. npm run build result.
9. Whether browser hydration was actually tested.
10. Whether any hydration errors remain.
11. Confirmation that "Avalúos Técnicos y Peritajes Judiciales" was NOT changed.

Do not make any additional changes after these tasks.