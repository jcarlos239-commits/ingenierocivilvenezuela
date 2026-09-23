IMPLEMENT ONLY THE FOLLOWING SEO/BUILD ARCHITECTURE CHANGE. DO NOT MODIFY THE VISUAL DESIGN OR ANY UNRELATED CODE.

GOAL:
Convert the current build-time "prerender" implementation from metadata-only injection into TRUE STATIC HTML PRERENDERING of the React page content for every public route.

CURRENT PROBLEM:
The existing scripts/prerender.js only takes dist/index.html, which contains an empty <div id="root"></div>, and injects route-specific metadata into it.

That means:
- title/description/canonical/OG metadata are present in each generated route HTML
- BUT the actual React page content, H1, headings, text, links, service content, etc. are NOT present in the generated HTML until JavaScript executes.

I want each public route to have its actual rendered React HTML in its corresponding dist/.../index.html at build time.

IMPORTANT:
Do NOT redesign anything.
Do NOT change any page text.
Do NOT change any colors.
Do NOT change typography.
Do NOT change layouts.
Do NOT change service cards.
Do NOT change the six official service PNGs.
Do NOT change routes.
Do NOT change navigation.
Do NOT change the sitemap.
Do NOT change robots.txt.
Do NOT remove the existing client-side React application.
Do NOT replace React Router.
Do NOT introduce a new framework such as Next.js.
Do NOT make unrelated optimizations.

IMPLEMENTATION:

1. Add the React server-rendering dependency/import needed to render the existing React application to static HTML during the build.

Use ReactDOMServer and renderToString (or the appropriate React 19 server rendering API if required by the current React version).

2. Modify scripts/prerender.js so that it renders the EXISTING React application for each route at build time.

The existing application must remain the source of truth.

The prerender script should render these exact routes:

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

3. Because the application currently uses createBrowserRouter, use an appropriate static/server router strategy for build-time rendering rather than trying to use the browser router directly in Node.

The prerender process must provide the correct pathname to the existing route tree so that each route renders its actual page component.

Do NOT duplicate the page content manually inside scripts/prerender.js.

4. Refactor the route configuration only if necessary so the same route definitions/components can be used by:

- the normal browser application
- the build-time static renderer

Keep the existing browser behavior unchanged.

5. For every generated route, produce:

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

6. Each generated HTML file must contain actual server-rendered React markup inside:

<div id="root">...</div>

The root must NOT be empty.

For example, after building, this should NOT exist:

<div id="root"></div>

Instead it should contain the rendered page HTML:

<div id="root">[actual rendered React page markup]</div>

7. Preserve the existing route-specific SEO metadata system.

Each generated route must continue to receive its correct:

<title>
<meta name="description">
<link rel="canonical">
<meta property="og:title">
<meta property="og:description">
<meta property="og:url">
<meta property="og:type">
<meta property="og:image">
Twitter metadata where currently implemented.

Do not remove the existing metadata logic.

8. Preserve the existing JSON-LD in index.html unless a change is absolutely required for the renderer to work.

Do NOT add invented business information.

9. Preserve the existing client-side application.

After the static HTML is generated, the normal Vite JavaScript bundle must still load and React must take over/hydrate the page normally in the browser.

The site must continue working exactly as it does now for visitors.

10. IMPORTANT HYDRATION REQUIREMENT:

Use the appropriate React 19 hydration approach so the browser can take over the server-rendered markup without producing hydration errors.

Do NOT simply replace the React application with static HTML.

The result must be:

BUILD TIME:
React renders page → static HTML generated

BROWSER:
static HTML appears immediately → React JavaScript loads → React hydrates/takes over

11. Keep the existing build command:

"build": "vite build && node scripts/prerender.js"

The build must still complete with:

npm run build

12. Add robust error handling to scripts/prerender.js.

If one of the ten routes fails to render, the build should fail clearly and identify the exact route that failed.

Do not silently generate an empty page.

13. IMPORTANT: Do not use a fake/static placeholder renderer.

The generated HTML must contain the REAL existing page components and their real content.

14. Do not modify any content merely to make this work.

15. Do not modify these assets:

- hero-desktop.webp
- hero-mobile.webp
- the six official service PNGs 72947.png through 72952.png
- og-image.webp

16. Do not delete any existing files during this task.

17. After making the changes, verify the build architecture.

Specifically verify that:

A. npm run build succeeds.

B. dist/index.html contains non-empty rendered homepage content inside #root.

C. dist/servicios/index.html contains the actual Servicios page content inside #root.

D. dist/como-trabajamos/index.html contains the actual Cómo Trabajamos page content inside #root.

E. dist/cobertura/index.html contains the actual Cobertura page content inside #root.

F. At least one individual service page, such as:

/servicios/proyectos

contains its actual page content inside #root.

G. The generated HTML still contains the correct title, description and canonical for each route.

H. The browser application still loads normally after the static HTML is generated.

IMPORTANT FINAL RULE:
This is a narrowly scoped architecture/SEO change.

Do not make any other changes to the website.
Do not redesign anything.
Do not rewrite content.
Do not change routes.
Do not change images.
Do not change the six service icons.
Do not change the navigation.
Do not change the sitemap or robots.txt.

At the end, give me a concise summary of:
1. files changed,
2. how true static rendering now works,
3. how hydration works in the browser,
4. whether npm run build succeeded,
5. confirmation that the generated route HTML contains actual page content rather than an empty #root.