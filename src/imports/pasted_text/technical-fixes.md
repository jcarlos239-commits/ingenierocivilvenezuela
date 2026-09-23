Make ONLY the following two technical fixes.

IMPORTANT:
DO NOT change any visible website content.
DO NOT change "Avalúos Técnicos y Peritajes Judiciales".
DO NOT change that terminology anywhere.
DO NOT change page copy.
DO NOT change colors, fonts, spacing, layouts, navigation, routes, service cards, or design.
DO NOT modify the six official service PNGs.
DO NOT modify the actual OG image file.
DO NOT make any other SEO/content changes.

==================================================
FIX #2 — STRENGTHEN SOCIAL SHARING IMAGE METADATA
==================================================

The website already uses:

https://ingenierocivilvenezuela.com/og-image.webp

as the primary Open Graph image.

KEEP that exact image.

Add the following metadata wherever the existing OG image metadata is generated, including the prerendered HTML:

<meta property="og:image" content="https://ingenierocivilvenezuela.com/og-image.webp">
<meta property="og:image:type" content="image/webp">
<meta property="og:image:width" content="1536">
<meta property="og:image:height" content="672">

Keep:

<meta property="og:image:alt" ...>

if an appropriate existing value is already present.

Do not invent a misleading description.

Also ensure Twitter/X metadata remains correctly configured:

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://ingenierocivilvenezuela.com/og-image.webp">

If the existing implementation already has these tags, do not duplicate them. Update the existing tags instead.

IMPORTANT:
The same OG image metadata must be present in the generated static HTML for every public route.

The existing route-specific:

- og:title
- og:description
- og:url

must remain route-specific.

The OG image itself can remain the same site-wide image.

==================================================
FIX #3 — FIX SSR / CLIENT HYDRATION COMPATIBILITY
==================================================

Audit the current SSR/prerender architecture.

Current architecture:

SERVER:
StaticRouterProvider
    ↓
renderToString()
    ↓
static HTML

CLIENT:
existing static HTML
    ↓
hydrateRoot()
    ↓
React application

Make sure the server-rendered React tree and the client hydration tree are structurally compatible.

Do NOT remove static rendering.

Do NOT go back to metadata-only prerendering.

Do NOT replace the application with static HTML.

Do NOT switch frameworks.

The goal is:

BUILD:
React components render to actual HTML for each route.

BROWSER:
React hydrates that exact HTML without hydration mismatch warnings.

==================================================
ROUTER REQUIREMENT
==================================================

The server renderer must use the existing route configuration/components.

The client must continue using the existing browser routing behavior.

Do not duplicate entire page components just for SSR.

If the current architecture has separate server and client router setup, make the minimum structural change necessary so both use the same route definitions and render the same component tree.

The pathname must determine the same route on both server and client.

For example:

/servicios/proyectos

must render the Proyectos page on the server AND hydrate into the Proyectos page on the client.

The same applies to all current routes:

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

==================================================
HYDRATION REQUIREMENT
==================================================

Use the correct React 19 hydration API:

hydrateRoot()

Do not use createRoot() when static server-rendered HTML already exists.

The client should hydrate the existing #root contents.

Do not add conditional logic that causes the server and client to render different markup for the initial page.

Avoid browser-only values during the initial render, such as:

- window-dependent content
- Date.now()
- random values
- viewport-dependent markup
- client-only generated IDs
- browser-specific conditional rendering

unless those values are intentionally deferred until after hydration.

If any existing component causes a hydration mismatch because it reads browser-only information during initial render, make the smallest possible change to defer that browser-only behavior until after hydration.

Do not change the visual result.

==================================================
IMPORTANT — DO NOT TOUCH THIS
==================================================

The following text is intentional and MUST remain unchanged:

"Avalúos Técnicos y Peritajes Judiciales"

Do NOT replace it with "Peritajes Técnicos".

Do NOT remove "Judiciales".

Do NOT modify the service name.

==================================================
VERIFY THE BUILD
==================================================

Run:

npm run build

Then verify:

1. The build succeeds.

2. Every generated route contains:

<div id="root">...</div>

with actual rendered React content.

3. Every route contains:

og:image
og:image:type
og:image:width
og:image:height

4. Every route contains:

twitter:card
twitter:image

5. Route-specific og:title, og:description and og:url remain correct.

6. The canonical URL remains correct.

7. "Avalúos Técnicos y Peritajes Judiciales" remains unchanged.

8. There are no React hydration mismatch errors caused by the SSR implementation.

9. The six official service PNGs remain unchanged.

10. No visual/design changes were made.

FINAL RESPONSE:
Give me a concise report with:

- Files changed
- OG image metadata changes
- Hydration/SSR changes
- Build result
- Confirmation that "Avalúos Técnicos y Peritajes Judiciales" was NOT changed
- Confirmation that no visual changes were made