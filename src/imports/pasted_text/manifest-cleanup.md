Fix ONLY these two issues: the empty web manifest and the inconsistent geographic coverage wording.

Do not modify anything else.

==================================================
WEB MANIFEST
==================================================

Inspect:

public/site.webmanifest

The file is currently empty.

Create a valid, non-empty JSON web manifest using the site's existing identity and existing icon files.

Use:

{
  "name": "Obras Civiles en Venezuela | Ing. Juan Carlos Mogollón",
  "short_name": "Obras Civiles Venezuela",
  "description": "Construcción, remodelaciones y proyectos de ingeniería civil con el respaldo del Ingeniero Juan Carlos Mogollón.",
  "lang": "es",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

Use the existing:

/icon-192.png
/icon-512.png

Do NOT create new icons.

Do NOT modify any favicon assets.

Keep the existing manifest reference in index.html:

<link rel="manifest" href="/site.webmanifest">

Do not remove it.

Validate that public/site.webmanifest is valid JSON after the change.

==================================================
GEOGRAPHIC COVERAGE
==================================================

The official geographic coverage is:

Distrito Capital / Caracas
Miranda
La Guaira

The website must NOT claim:

"Cobertura en Toda Venezuela"

or:

"cobertura en toda Venezuela"

Search the ENTIRE project for both capitalization variants and other obvious variants referring to coverage of all Venezuela.

Remove or replace ONLY those obsolete geographic-coverage claims.

Where the text is describing coverage, use wording appropriate to the surrounding content, such as:

"Caracas, Miranda y La Guaira"

or:

"Distrito Capital, Miranda y La Guaira"

Do not change the actual coverage page structure or route.

Do not remove the /cobertura route.

Do not add any other states, cities, or regions.

Do not change legitimate references to Venezuela as a country when they are not claims about geographic service coverage.

==================================================
LEGACY / GENERATED SOURCE
==================================================

Search legacy and Figma-generated source files as well as active application source.

If an obsolete "Toda Venezuela" coverage claim exists only in a legacy/generated source file, remove or update that wording there too, provided it does not affect an active import.

The goal is that the obsolete coverage claim cannot accidentally be reintroduced from a legacy source.

==================================================
IMPORTANT BUSINESS COPY
==================================================

"Obras Garantizadas" is approved and correct business copy.

DO NOT change it.

Do not remove it.

Do not reword it.

Do not flag it as an error.

==================================================
DO NOT MODIFY
==================================================

Do not change:

- SSR architecture
- StaticRouterProvider
- hydrationData
- hydrateRoot
- prerender.js
- route configuration
- service routes
- SEO architecture
- service names
- "Avalúos Técnicos y Peritajes Judiciales"
- "Obras Garantizadas"
- six official service illustrations
- hero-desktop.webp
- hero-mobile.webp
- OG image
- favicon files
- sitemap.xml
- robots.txt
- visual design
- typography
- colors
- layout

This task is ONLY the web manifest and geographic coverage cleanup.

==================================================
BUILD VERIFICATION
==================================================

After making the changes, run:

npm run build

The build must actually execute.

If the build fails, fix only an error caused by these changes.

Do not perform unrelated fixes.

==================================================
FINAL VERIFICATION
==================================================

Search the entire project for:

"Cobertura en Toda Venezuela"

"cobertura en toda Venezuela"

There must be ZERO occurrences representing a claim of nationwide service coverage.

Confirm that the correct coverage remains represented as:

Distrito Capital / Caracas
Miranda
La Guaira

Validate:

public/site.webmanifest

and confirm that it contains valid JSON.

After the build, inspect at least:

/
/cobertura

and confirm:

- prerendered HTML exists
- correct geographic coverage is present
- no nationwide coverage claim remains
- manifest link remains present
- no existing SEO metadata was removed

==================================================
FINAL REPORT
==================================================

Report:

WEB MANIFEST
- valid JSON: YES/NO
- existing icon files used: YES/NO
- manifest link preserved: YES/NO

GEOGRAPHIC COVERAGE
- obsolete nationwide coverage references removed: number
- "Cobertura en Toda Venezuela" remaining: YES/NO
- correct coverage present: YES/NO

BUILD
- npm run build: SUCCESS/FAILURE
- number of prerendered routes

Do not make any other changes.