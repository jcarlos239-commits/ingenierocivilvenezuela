Perform a FINAL service-naming and site-configuration cleanup. This is a targeted content/SEO consistency change only. Do not redesign the website or modify unrelated functionality.

OBJECTIVE:
Make “Avalúos Técnicos y Peritajes Judiciales” the single, consistent name of the valuation/expert-witness service throughout the active website and ensure .figma/make/site.json uses the same approved terminology.

APPROVED SERVICE NAME — USE EXACTLY:
“Avalúos Técnicos y Peritajes Judiciales”

APPROVED LOWERCASE FORM WHEN GRAMMATICALLY REQUIRED:
“avalúos técnicos y peritajes judiciales”

DO NOT USE AS THE SERVICE NAME:
- “Avalúos y Peritajes Técnicos”
- “Avalúos y Peritajes”
- “Avalúos Técnicos y Peritajes”
- “Avalúos y Peritajes Técnicos Judiciales”
- “peritajes técnicos” when referring specifically to this service

==================================================
1. SERVICE PAGE TITLE
==================================================

Locate the service page for:

/servicios/avaluos-peritajes-tecnicos

Change the visible service title/H1 to EXACTLY:

“Avalúos Técnicos y Peritajes Judiciales”

If the page currently has a shorter or differently ordered title, standardize it to the approved title above.

Do NOT change the route.

Keep the existing service page layout, images, cards, CTA, breadcrumb structure, and styling.

==================================================
2. SEO TITLE AND DESCRIPTION
==================================================

In the centralized SEO metadata source:

src/utils/prerender-meta.ts

Make the metadata for:

/servicios/avaluos-peritajes-tecnicos

consistent with the approved service name.

The SEO title should clearly contain:

“Avalúos Técnicos y Peritajes Judiciales”

The meta description should naturally describe technical property valuations and judicial expert reports/peritajes using the approved terminology.

Do not create a second SEO metadata source.

==================================================
3. .figma/make/site.json — FIX PERMANENTLY
==================================================

Open:

.figma/make/site.json

Find the site-level description that currently contains wording similar to:

“avalúos y peritajes técnicos”

Replace that terminology with:

“avalúos técnicos y peritajes judiciales”

The final site description should be semantically equivalent to:

“Ingeniería civil, construcción de obras civiles, remodelaciones, avalúos técnicos y peritajes judiciales en Venezuela. Ing. Juan Carlos Mogollón, más de 30 años de trayectoria.”

Preserve the rest of the site configuration.

Do NOT change indexing settings, OG image settings, routes, or unrelated configuration.

==================================================
4. SEARCH ALL ACTIVE CODE
==================================================

Search the ACTIVE application code/configuration for all variations of the old service terminology:

“Avalúos y Peritajes Técnicos”
“avalúos y peritajes técnicos”
“Avalúos y Peritajes”
“Avalúos Técnicos y Peritajes”
“peritajes técnicos”

Where the phrase refers specifically to this service, replace it with:

“Avalúos Técnicos y Peritajes Judiciales”

or:

“avalúos técnicos y peritajes judiciales”

depending on grammatical context.

IMPORTANT:
Do not blindly replace legitimate generic uses of the words “técnico” or “peritaje” when they refer to something else.

Do not modify historical/non-executed text inside:
src/imports/pasted_text

unless it is actually imported or executed by the application.

==================================================
5. STRUCTURED DATA / ACCESSIBILITY / INTERNAL CONTENT
==================================================

Check active:
- headings
- service cards
- alt text
- aria labels
- structured data
- metadata
- breadcrumbs
- internal service-page references

If any of these specifically identify this service using outdated terminology, standardize them to:

“Avalúos Técnicos y Peritajes Judiciales”

Do not invent additional claims or credentials.

==================================================
6. PRESERVE APPROVED BUSINESS LANGUAGE
==================================================

Do NOT change:

“Obras Garantizadas”

“grupo de ingenieros civiles”

Distrito Capital / Caracas

Miranda

La Guaira

Do NOT introduce:

“Cobertura en Toda Venezuela”

“especialista”

unsupported certifications

unsupported nationwide service claims

==================================================
7. PRESERVE ROUTING AND ASSETS
==================================================

Keep this route exactly:

/servicios/avaluos-peritajes-tecnicos

Do NOT rename the route even though the visible service title is being standardized.

Do NOT change:
- 72947.png
- 72948.png
- 72949.png
- 72950.png
- 72951.png
- 72952.png
- favicon assets
- public/og-image.webp
- hero desktop/mobile WebP assets
- sitemap.xml
- robots.txt
- site.webmanifest
- SSR/hydration architecture
- navigation
- visual design

==================================================
8. FINAL CONSISTENCY CHECK
==================================================

Perform a final case-insensitive search of ACTIVE application/configuration files.

The approved service name must be present:

“Avalúos Técnicos y Peritajes Judiciales”

The old service-name variants must have ZERO active references:

“Avalúos y Peritajes Técnicos”
“avalúos y peritajes técnicos”
“Avalúos y Peritajes”
“Avalúos Técnicos y Peritajes”

For “peritajes técnicos”, only flag/remove occurrences when they specifically refer to this service.

Verify:

1. Visible service H1 uses the approved name.
2. SEO title uses the approved name.
3. SEO description uses the approved terminology.
4. .figma/make/site.json uses “avalúos técnicos y peritajes judiciales”.
5. No duplicate SEO metadata source was created.
6. Route remains unchanged.
7. No unrelated content/assets were modified.

==================================================
9. BUILD
==================================================

Run:

pnpm run build

If the build fails because of this change, fix the issue and run the build again.

Do not finish with a known build error.

FINAL REPORT:
- List every file changed.
- Show the final service title.
- Confirm the final SEO title/description terminology.
- Confirm .figma/make/site.json was corrected.
- Confirm the old service terminology has no remaining ACTIVE references.
- Confirm the route remained unchanged.
- Report the build result.

Make no unrelated changes.