PERFORM ONLY A TECHNICAL SEO PRERENDERING PASS.

DO NOT redesign the site.
DO NOT change the visual design.
DO NOT modify images.
DO NOT modify the six official service illustrations.
DO NOT change the Header, Footer, cards, colors, typography, spacing, or page content.

The purpose of this command is to ensure that every important public page produces SEO metadata and primary content in the generated/prerendered HTML rather than relying exclusively on client-side useEffect().

==================================================
1. AUDIT CURRENT SEO IMPLEMENTATION
==================================================

Inspect:

- vite.config.ts
- src/main.tsx
- src/App.tsx
- SEO utilities
- routing implementation
- all public page components
- build/prerender configuration

The current implementation uses client-side SEO updates through useEffect().

Do not simply leave important SEO metadata dependent on:

document.title
document.head
useEffect()

after the page has loaded.

==================================================
2. IMPLEMENT PRERENDERING
==================================================

Use the existing Vite/React architecture.

Implement a safe prerender/build process for all important public routes.

At minimum prerender:

/
 /servicios/
 /como-trabajamos/
 /cobertura/
 /servicios/proyectos/
 /servicios/construccion-obras-civiles/
 /servicios/remodelaciones-ampliaciones/
 /servicios/avaluos-peritajes-tecnicos/
 /servicios/patologia-estructural/
 /servicios/estabilizacion-taludes/

Do not break client-side navigation.

The same application must still work normally after hydration.

==================================================
3. PAGE-SPECIFIC TITLE
==================================================

Every prerendered route must contain its correct title in the generated HTML.

Home:

Obras Civiles en Venezuela | Ing. Juan Carlos Mogollón

Servicios:

Servicios de Ingeniería Civil | Ing. Juan Carlos Mogollón

Cómo Trabajamos:

Cómo Trabajamos | Ing. Juan Carlos Mogollón

Cobertura:

Cobertura | Ingeniería Civil | Ing. Juan Carlos Mogollón

Individual services must retain their unique titles.

==================================================
4. PAGE-SPECIFIC DESCRIPTION
==================================================

Every prerendered route must contain its correct unique meta description.

Do not duplicate the homepage description.

Descriptions should accurately describe each page.

==================================================
5. CANONICAL
==================================================

Every prerendered public page must contain:

<link rel="canonical" href="...">

The canonical must correspond to that exact page.

Use:

https://ingenierocivilvenezuela.com/

as the production domain.

Do not canonicalize all pages to the homepage.

==================================================
6. ROBOTS
==================================================

Every public page should be indexable.

Do not generate:

noindex
nofollow

for public production pages.

Preserve the correct robots.txt already implemented.

==================================================
7. H1
==================================================

Verify that every public page has one clear primary H1.

Do not create duplicate H1 elements.

Examples:

Home:
Obras Civiles en Venezuela

Servicios:
Nuestros Servicios

Cómo Trabajamos:
¿Cómo Trabajamos?

Cobertura:
Cobertura

Individual service pages:
their specific service title.

Do not change the existing visual styling.

==================================================
8. OPEN GRAPH
==================================================

Generate page-specific:

og:title
og:description
og:url
og:type
og:image

Make sure the og:image points to a real production asset.

DO NOT use:

/og-hero.jpg

unless that file actually exists.

If an OG image does not exist, use an existing valid optimized image or create a single appropriate production OG image without changing the website design.

==================================================
9. TWITTER/X METADATA
==================================================

Where appropriate add:

twitter:card
twitter:title
twitter:description
twitter:image

Use the same valid production image.

==================================================
10. BREADCRUMBS
==================================================

Preserve visible breadcrumbs.

Add BreadcrumbList structured data where appropriate.

The structured data must exactly match the visible breadcrumb hierarchy.

==================================================
11. STRUCTURED DATA
==================================================

Review the existing Organization and WebSite JSON-LD.

Keep factual information only.

Do not invent:

- reviews
- ratings
- awards
- certifications
- offices
- addresses
- employees
- guarantees

Add Service structured data to individual service pages only where accurate.

==================================================
12. BUILD VALIDATION
==================================================

Run the production build.

Verify every listed route builds successfully.

Verify the generated HTML for each route contains:

<title>
<meta name="description">
<link rel="canonical">
robots metadata where appropriate
the correct H1
the main page content

The important metadata and page content must not exist ONLY after client-side JavaScript executes.

==================================================
13. FINAL RULE
==================================================

Do not make visual changes.

Do not change image files.

Do not change service illustrations.

Do not rewrite page content.

Do not change routes.

Only improve the SEO rendering/prerendering architecture.

At the end report:

- which prerender method was implemented
- routes prerendered
- where titles are generated
- where descriptions are generated
- where canonicals are generated
- whether metadata exists in generated HTML
- whether production build succeeds
- any remaining limitations