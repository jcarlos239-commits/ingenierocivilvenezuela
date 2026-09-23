I WANT YOU TO PERFORM A CONTROLLED TECHNICAL SEO + PERFORMANCE HARDENING PASS ON THE EXISTING WEBSITE.

IMPORTANT:
DO NOT REDESIGN THE WEBSITE.
DO NOT CHANGE THE VISUAL DESIGN.
DO NOT CHANGE THE CONTENT UNLESS SPECIFICALLY REQUESTED BELOW.
DO NOT CHANGE THE HEADER DESIGN.
DO NOT CHANGE THE FOOTER DESIGN.
DO NOT CHANGE THE HERO DESIGN OR LAYOUT.
DO NOT CHANGE THE SIX OFFICIAL SERVICE ILLUSTRATIONS.
DO NOT GENERATE NEW SERVICE ICONS.
DO NOT RECOLOR OR REPLACE ANY EXISTING SERVICE ICON.
DO NOT CHANGE SPACING, COLORS, TYPOGRAPHY, CARD DESIGN, BUTTON DESIGN, OR RESPONSIVE LAYOUT UNLESS REQUIRED TO FIX A TECHNICAL PERFORMANCE/SEO ISSUE.

This is a technical optimization pass only.

==================================================
1. FIX SEARCH ENGINE INDEXING
==================================================

The production website MUST be indexable.

Inspect:

.figma/make/site.json

If the current configuration contains:

"robots": {
  "index": false
}

change it to:

"robots": {
  "index": true
}

Do not leave the production website with noindex.

Inspect the generated robots.txt.

It MUST NOT contain:

User-agent: *
Disallow: /

Instead create a production-safe robots.txt that allows normal search engine crawling.

Use:

User-agent: *
Allow: /

Sitemap: https://ingenierocivilvenezuela.com/sitemap.xml

Do not block CSS, JavaScript, images, or normal page routes.

Also inspect the generated HTML for:

<meta name="robots" content="noindex, nofollow">

Remove the noindex behavior from production pages.

==================================================
2. FIX CANONICAL URLS
==================================================

Every indexable page must have exactly one canonical URL.

Use:

https://ingenierocivilvenezuela.com/

as the production domain.

Add canonical tags to all indexable routes.

Examples:

Home:
https://ingenierocivilvenezuela.com/

Servicios:
https://ingenierocivilvenezuela.com/servicios/

Cómo Trabajamos:
https://ingenierocivilvenezuela.com/como-trabajamos/

Cobertura:
https://ingenierocivilvenezuela.com/cobertura/

Individual services:

https://ingenierocivilvenezuela.com/servicios/proyectos/

https://ingenierocivilvenezuela.com/servicios/construccion-obras-civiles/

https://ingenierocivilvenezuela.com/servicios/remodelaciones-ampliaciones/

https://ingenierocivilvenezuela.com/servicios/avaluos-peritajes-tecnicos/

https://ingenierocivilvenezuela.com/servicios/patologia-estructural/

https://ingenierocivilvenezuela.com/servicios/estabilizacion-taludes/

Make sure trailing-slash behavior is consistent.

Do not create duplicate canonical URLs.

Do not canonicalize every page to the homepage.

Each page must canonicalize to itself.

==================================================
3. FIX PAGE TITLES AND META DESCRIPTIONS
==================================================

Every important page must have a unique title and description.

Home:

Title:
Obras Civiles en Venezuela | Ing. Juan Carlos Mogollón

Services:

Title:
Servicios de Ingeniería Civil | Ing. Juan Carlos Mogollón

Cómo Trabajamos:

Title:
Cómo Trabajamos | Ing. Juan Carlos Mogollón

Cobertura:

Title:
Cobertura | Ingeniería Civil | Ing. Juan Carlos Mogollón

Individual service pages must have unique titles based on their service.

Examples:

Proyectos:
Proyectos de Ingeniería Civil | Ing. Juan Carlos Mogollón

Construcción:
Construcción de Obras Civiles | Ing. Juan Carlos Mogollón

Remodelaciones:
Remodelaciones y Ampliaciones | Ing. Juan Carlos Mogollón

Avalúos:
Avalúos y Peritajes Técnicos | Ing. Juan Carlos Mogollón

Patología:
Patología Estructural | Ing. Juan Carlos Mogollón

Taludes:
Estabilización de Taludes | Ing. Juan Carlos Mogollón

Every page must have a unique meta description.

Do not duplicate the homepage description across all pages.

==================================================
4. DO NOT RELY ONLY ON CLIENT-SIDE SEO
==================================================

Inspect the current implementation of document.title and meta descriptions.

If metadata is currently changed only through useEffect() after JavaScript loads, improve the implementation so that the metadata is available during the site's prerender/build process whenever possible.

The important SEO metadata should be present in the generated HTML for each route.

Do not remove the existing routing.

Do not break the current SPA behavior.

Use the existing Vite/React architecture and existing prerender configuration.

==================================================
5. CREATE A COMPLETE SITEMAP
==================================================

Create:

/sitemap.xml

Include every important public/indexable route.

At minimum:

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

If there are additional public pages already implemented, include them too.

Do NOT include:
- admin pages
- development routes
- test routes
- assets
- duplicate URLs
- noindex pages

Use the canonical production domain.

==================================================
6. OPTIMIZE THE HERO IMAGE
==================================================

The current hero photographic asset is very large.

Convert the photographic hero image to WebP.

Do NOT modify its visual appearance.

Keep the same composition and crop.

Create:

hero-desktop.webp

and, if technically appropriate:

hero-mobile.webp

The desktop image should preserve the existing desktop aspect ratio.

The mobile image should be appropriately sized for mobile screens rather than forcing mobile devices to download the full desktop image.

Use responsive image delivery with <picture> and/or srcset.

Example implementation:

<picture>
  <source
    media="(max-width: 640px)"
    srcSet="..."
  />
  <source
    srcSet="..."
  />
  <img ... />
</picture>

Do NOT use a huge 1536px+ image for mobile if a smaller image is sufficient.

Preserve the current visual appearance.

The hero is a major LCP candidate, so optimize it for fast loading.

Use appropriate loading/fetch priority for the LCP image.

Do NOT lazy-load the primary above-the-fold hero image.

==================================================
7. OPTIMIZE OTHER PHOTOGRAPHIC IMAGES
==================================================

Audit all photographic JPG/JPEG/PNG assets.

For photographic images:

- convert to WebP where appropriate
- resize images that are significantly larger than their displayed dimensions
- preserve visual quality
- preserve composition
- update imports correctly

Do NOT blindly convert transparent service illustrations.

The following six official service illustrations MUST remain intact:

72947.png
72948.png
72949.png
72950.png
72951.png
72952.png

These are official transparent service illustrations.

DO NOT:
- replace them
- regenerate them
- recolor them
- add backgrounds
- convert them if doing so would remove transparency or alter their appearance
- change their dimensions unnecessarily

Optimize photographic assets separately.

==================================================
8. REMOVE DUPLICATE IMAGE ASSETS
==================================================

Audit the project for duplicate copies of the same image.

There is currently a duplicate copy of the hero asset.

Determine which copy is actually used.

Keep one optimized production version.

Remove unused duplicate copies only when you can verify that no component imports them.

Do not delete any asset unless its usage has been verified.

==================================================
9. RESPONSIVE IMAGES
==================================================

Audit all major images.

Where appropriate use:

srcset

sizes

<picture>

or equivalent responsive image techniques.

Do not serve a 3000–4000px image when the displayed image is only approximately 500–800px wide.

Pay particular attention to the large photographic assets.

Preserve width and height information where possible to prevent layout shift.

==================================================
10. LAZY LOAD BELOW-THE-FOLD IMAGES
==================================================

Images that are below the initial viewport should use:

loading="lazy"

unless there is a specific reason they should not.

The primary above-the-fold LCP image must NOT be lazy-loaded.

Do not lazy-load logos or other critical above-the-fold assets unnecessarily.

==================================================
11. PREVENT CUMULATIVE LAYOUT SHIFT
==================================================

Ensure major images have explicit dimensions or aspect-ratio containers.

Images should not cause the page layout to jump when they load.

Pay particular attention to:

- hero image
- service illustrations
- CTA images
- large photographic images

Do not alter the visual design.

==================================================
12. ALT TEXT AUDIT
==================================================

Audit every meaningful image.

Decorative images may use:

alt=""

and appropriate aria-hidden behavior.

Meaningful images must have descriptive alt text.

Do not keyword-stuff alt text.

Examples:

"Construcción de obras civiles"

"Remodelaciones y ampliaciones"

"Avalúos y peritajes técnicos"

"Patología estructural"

"Estabilización de taludes"

"Proyectos de ingeniería civil"

Do not use the filename as alt text.

==================================================
13. OPEN GRAPH / SOCIAL METADATA
==================================================

Add appropriate metadata for public pages:

og:title
og:description
og:url
og:type
og:image

Use the production domain.

Do not create unnecessary duplicate images.

Use an appropriate existing site image for social sharing if one is already available.

==================================================
14. STRUCTURED DATA
==================================================

Add appropriate JSON-LD structured data without inventing information.

At minimum, evaluate whether the following are appropriate:

Organization / LocalBusiness

WebSite

BreadcrumbList

Service

Use only information actually present on the website.

Do NOT invent:
- addresses
- offices
- certifications
- licenses
- awards
- employee counts
- ratings
- reviews
- guarantees

For service pages, use structured data only when the information accurately describes the actual service.

==================================================
15. BREADCRUMBS
==================================================

Make sure internal pages have visible breadcrumbs.

Examples:

Inicio / Servicios

Inicio / Cómo Trabajamos

Inicio / Cobertura

Inicio / Servicios / Proyectos

etc.

Where appropriate, add BreadcrumbList JSON-LD matching the visible breadcrumb.

Do not create breadcrumbs that don't match the actual URL hierarchy.

==================================================
16. INTERNAL LINKING
==================================================

Audit internal links.

Important pages should be reachable through normal HTML links.

Make sure:

Home → Servicios

Home → Cómo Trabajamos

Home → Cobertura

Servicios → individual services

Individual service → Servicios

Individual service → related services

Individual service → Contact/WhatsApp

Do not create excessive or artificial keyword links.

Use natural anchor text.

==================================================
17. PERFORMANCE / JAVASCRIPT
==================================================

Audit the production bundle for unnecessary JavaScript.

Do not remove functionality.

Look for:
- unused imports
- duplicate assets
- unnecessary dependencies
- unnecessary client-side work
- render-blocking resources
- unnecessary third-party resources

Do not rewrite the entire application.

Make only safe, measurable optimizations.

==================================================
18. FONT PERFORMANCE
==================================================

Audit font loading.

If Google Fonts or external font requests are currently being used, determine whether they can be optimized without changing the site's typography.

Do not replace the site's fonts.

Avoid unnecessary external font requests.

If local/self-hosted font files already exist, prefer them where appropriate.

Do not change the visual typography.

==================================================
19. VITE / BUILD / PRERENDER
==================================================

Inspect:

vite.config.ts

and the existing prerender configuration.

Make sure all important public routes are prerendered/buildable.

At minimum verify:

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

The generated HTML for each route should contain:

- correct title
- correct meta description
- canonical URL
- appropriate robots directive
- visible H1
- relevant page content

Do not leave important SEO content dependent exclusively on client-side navigation.

==================================================
20. MOBILE PERFORMANCE
==================================================

Audit the mobile version specifically.

Do not redesign it.

Improve technical performance by addressing:

- oversized images
- responsive image delivery
- LCP
- CLS
- unnecessary JavaScript
- unnecessary network requests
- font loading
- below-the-fold image loading

The mobile site must retain the existing design.

==================================================
21. FINAL VALIDATION
==================================================

After making the changes, verify:

1. Production pages are indexable.
2. robots.txt allows crawling.
3. sitemap.xml exists.
4. Canonical URLs are correct.
5. Every major page has a unique title.
6. Every major page has a unique meta description.
7. Important metadata is present in prerendered HTML.
8. Hero image is optimized.
9. Mobile hero image is optimized.
10. Large photographic images are optimized.
11. Six official service PNG illustrations remain unchanged.
12. No broken image imports exist.
13. No duplicate image assets remain unless intentionally required.
14. Below-the-fold images are lazy-loaded where appropriate.
15. LCP image is not lazy-loaded.
16. Images have dimensions/aspect ratios that prevent layout shift.
17. Important images have appropriate alt text.
18. Open Graph metadata exists.
19. Structured data is valid and contains only factual information.
20. Breadcrumbs work.
21. Internal links work.
22. All existing service routes work.
23. /servicios works.
24. /como-trabajamos works.
25. /cobertura works.
26. The Home page still looks the same.
27. The six service cards still look the same.
28. The six official service illustrations are unchanged.
29. Desktop layout remains unchanged.
30. Mobile layout remains unchanged except for technical performance improvements.

==================================================
VERY IMPORTANT FINAL RULE
==================================================

DO NOT make broad visual changes.

This is NOT a redesign.

This is a TECHNICAL SEO + PERFORMANCE + IMAGE OPTIMIZATION PASS.

If a proposed change could alter the appearance or content of the website, DO NOT make that change unless it is explicitly required for one of the technical objectives above.

Preserve the existing design and content.

After completing the work, provide a concise summary of:
- files changed
- images converted
- images resized
- duplicate assets removed
- SEO changes
- sitemap changes
- canonical changes
- structured-data changes
- performance changes
- any issues that could not safely be fixed