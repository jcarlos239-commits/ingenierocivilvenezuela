Make ONLY the following four corrections. Do not modify anything else.

IMPORTANT:
"Obras Garantizadas" IS CORRECT BUSINESS COPY.
DO NOT remove it, change it, reword it, or flag it as an error.

==================================================
REMOVE OUTDATED "ESPECIALISTA" WORDING
==================================================

Search the ENTIRE project for:

"especialista"

and:

"especialistas"

Identify occurrences that describe Ingeniero Juan Carlos Mogollón or the engineering group.

The approved current wording is:

"quien cuenta con conocimientos generales en patología de edificaciones, estabilización de taludes y gerencia de construcción con más de 30 años de trayectoria."

Where the old "especialista" wording refers to this professional description, replace it with the approved wording above.

Do NOT invent credentials.
Do NOT add certifications.
Do NOT add "especialista" elsewhere.

After the change, search the project again and report any remaining occurrences of "especialista". Do not blindly delete legitimate unrelated occurrences.

==================================================
REMOVE OBSOLETE "COBERTURA EN TODA VENEZUELA" WORDING
==================================================

Search the ENTIRE project for:

"Cobertura en Toda Venezuela"

including capitalization variations.

The correct geographic coverage is:

"Caracas, Miranda y La Guaira"

and/or:

"Distrito Capital, Miranda y La Guaira"

Replace ONLY the obsolete "Cobertura en Toda Venezuela" wording with the appropriate correct geographic coverage.

Do NOT change the /cobertura route.

Do NOT invent additional geographic coverage.

The business coverage is limited to:

Distrito Capital / Caracas
Miranda
La Guaira

After the change, search the entire project again.

There must be ZERO remaining occurrences of:

"Cobertura en Toda Venezuela"

in active source or generated website content.

Clean legacy/generated Figma source files as well if they contain this obsolete phrase and removing it does not affect active imports.

==================================================
FIX THE EMPTY SITE WEB MANIFEST
==================================================

Inspect:

public/site.webmanifest

It is currently empty.

Create a valid JSON web manifest using the existing site identity and existing icon assets.

Use this structure:

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

Use the existing icon files.

Do NOT generate new icons.

Do NOT replace or modify the selected 14-A1 favicon.

Do NOT modify:

favicon.ico
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
apple-touch-icon.png
icon-192.png
icon-512.png

Keep this existing line in index.html:

<link rel="manifest" href="/site.webmanifest">

Do not remove the manifest link.

==================================================
STANDARDIZE THE AVALÚOS SERVICE WORDING
==================================================

The official and ONLY correct service wording is:

"Avalúos Técnicos y Peritajes Judiciales"

Search the ENTIRE project for stale variants, including:

"Avalúos y Peritajes Técnicos"

"avalúos y peritajes técnicos"

"Avalúos y peritajes técnicos"

Update applicable:

- SEO descriptions
- meta descriptions
- page descriptions
- structured-data descriptions
- service cards
- related-service text
- navigation references
- other active website text referring specifically to this service

Use exactly:

"Avalúos Técnicos y Peritajes Judiciales"

Do NOT change the URL:

/servicios/avaluos-peritajes-tecnicos

The URL must remain exactly as it is.

Do NOT change unrelated uses of the individual words "avalúos", "técnicos", "peritajes", or "judiciales".

==================================================
IMPORTANT: PRESERVE "OBRAS GARANTIZADAS"
==================================================

"Obras Garantizadas" is intentional and approved business copy.

KEEP IT EXACTLY AS IT IS.

Do NOT remove it.
Do NOT replace it.
Do NOT rewrite it.
Do NOT flag it as an error.

==================================================
STRICT SCOPE
==================================================

Do NOT modify:

- SSR architecture
- StaticRouterProvider
- hydrationData
- hydrateRoot
- prerender.js
- routes
- service routes
- visual design
- colors
- typography
- layout
- hero design
- "Obras Garantizadas"
- six official service illustrations
- hero WebP images
- OG image
- favicon assets
- sitemap
- robots.txt
- service icons
- unrelated copy

Only make the corrections explicitly requested above.

==================================================
BUILD VERIFICATION
==================================================

After making the changes, run:

npm run build

The build must actually execute.

If the build fails, fix ONLY errors caused by these changes.

Do not perform unrelated fixes.

==================================================
FINAL VERIFICATION
==================================================

Search the project for:

"Cobertura en Toda Venezuela"

Expected result:
ZERO active/generated occurrences.

Search for:

"Avalúos y Peritajes Técnicos"

Expected result:
ZERO occurrences referring to this service.

Search for:

"Avalúos Técnicos y Peritajes Judiciales"

Expected result:
Present consistently throughout the relevant service UI and SEO metadata.

Search for:

"especialista"

Report remaining occurrences individually.
Do NOT blindly delete legitimate unrelated occurrences.

Search for:

"Obras Garantizadas"

Expected result:
PRESENT.

This phrase must remain.

Verify:

public/site.webmanifest

contains valid, non-empty JSON.

==================================================
GENERATED HTML VERIFICATION
==================================================

After npm run build succeeds, inspect the generated HTML for:

/
/servicios
/servicios/avaluos-peritajes-tecnicos
/cobertura

Verify:

- correct geographic coverage wording
- correct service wording
- valid metadata
- valid JSON-LD
- manifest link remains present
- "Obras Garantizadas" remains present

==================================================
FINAL REPORT
==================================================

Report:

- which "especialista" occurrences were changed
- which legitimate "especialista" occurrences remain
- number of "Cobertura en Toda Venezuela" occurrences removed
- confirmation that none remain in active/generated content
- confirmation that site.webmanifest now contains valid JSON
- confirmation that existing icons are being used
- confirmation that "Avalúos Técnicos y Peritajes Judiciales" is standardized
- confirmation that stale service wording was removed
- confirmation that "Obras Garantizadas" was preserved
- npm run build result
- number of successfully prerendered routes

Do not make any other changes.