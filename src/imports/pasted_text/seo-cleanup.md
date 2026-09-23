Now perform ONE narrowly scoped SEO cleanup pass.

DO NOT redesign the website.
DO NOT change the visual design.
DO NOT change layouts.
DO NOT change typography.
DO NOT change colors.
DO NOT change page copy.
DO NOT change routes.
DO NOT change navigation.
DO NOT change the six official service icons.
DO NOT change hero images or their implementation.
DO NOT change robots.txt.
DO NOT change sitemap.xml.
DO NOT modify unrelated components.

ONLY perform the following three tasks.

==================================================
TASK 1 — CLEAN UP UNUSED IMAGE DUPLICATES
==================================================

Audit the repository for obsolete image assets related to the old hero implementation.

The optimized/current hero assets are:

- src/imports/ObrasCivilesLanding/hero-desktop.webp
- src/imports/ObrasCivilesLanding/hero-mobile.webp
- public/og-image.webp

Do NOT delete an image merely because it looks duplicated.

Before deleting anything, search the entire source tree for every import/reference to the candidate file.

Only remove an old image if ALL of the following are true:

1. It is an obsolete duplicate/original of an image that is already represented by the optimized WebP asset.
2. No source file imports or references it.
3. It is not referenced by index.html.
4. It is not referenced by CSS.
5. It is not referenced by sitemap.xml, robots.txt, metadata, or configuration.
6. It is not required as an actual browser fallback.

In particular, inspect the old hero PNG/JPG files identified during the previous audit.

IMPORTANT:
Do not remove the six official service PNGs:

- 72947.png
- 72948.png
- 72949.png
- 72950.png
- 72951.png
- 72952.png

These six files are official production assets and MUST remain unchanged.

Also do not delete:

- hero-desktop.webp
- hero-mobile.webp
- og-image.webp

If an old asset is still genuinely referenced, leave it alone.

==================================================
TASK 2 — CORRECT STRUCTURED DATA
==================================================

Inspect the JSON-LD currently located in index.html.

Keep the existing Organization and WebSite structured data.

Correct any structured-data terminology that does not accurately match the services actually offered.

Specifically:

If the current Organization/WebSite JSON-LD contains:

"Peritajes Judiciales"

change it to:

"Peritajes Técnicos"

UNLESS the actual website explicitly offers judicial expert services. Do not invent judicial services.

Keep the existing factual information such as:

- Ing. Juan Carlos Mogollón
- website URL
- telephone
- Distrito Capital
- Miranda
- La Guaira

Do not invent:

- awards
- certifications
- licenses beyond information already provided
- offices
- ratings
- years beyond the existing 30+ years claim
- guarantees
- memberships
- customer counts
- review scores

==================================================
TASK 3 — ADD USEFUL STRUCTURED DATA WITHOUT INVENTING FACTS
==================================================

If the existing architecture allows it cleanly, add appropriate Schema.org structured data for the website's service pages.

Use only factual information already present on the corresponding pages.

For the six actual services, the service names are:

1. Construcción de Obras Civiles
2. Remodelaciones y Ampliaciones
3. Avalúos y Peritajes Técnicos
4. Patología Estructural
5. Estabilización de Taludes
6. Proyectos

Where appropriate, use Schema.org Service structured data.

Each Service should reference the correct page URL.

Use the existing website as the source of truth.

Do NOT fabricate prices, service guarantees, geographic coverage, ratings, reviews, or credentials.

The actual service area is:

- Distrito Capital
- Miranda
- La Guaira

Do NOT change this to "Toda Venezuela."

==================================================
BREADCRUMB STRUCTURED DATA
==================================================

If practical and compatible with the existing architecture, add BreadcrumbList JSON-LD to the individual service pages.

Use the actual existing hierarchy.

For example:

Inicio
→ Servicios
→ Proyectos

and:

Inicio
→ Servicios
→ Construcción de Obras Civiles

etc.

The URLs must exactly match the site's existing canonical URLs.

Do not create breadcrumb markup for nonexistent pages.

==================================================
IMPORTANT SEO RULE
==================================================

Structured data must accurately describe visible page content.

Do NOT add schema merely because it might increase SEO.

Google should be able to find the same service/entity information in the visible HTML.

==================================================
FINAL VERIFICATION
==================================================

After making the changes:

1. Search the entire repository for "Peritajes Judiciales".

If it is not an actual service offered by the website, it should no longer appear in the structured data.

2. Search for every deleted image filename.

Confirm there are no remaining references.

3. Confirm the six official service PNGs still exist and are still referenced correctly.

4. Confirm the existing optimized hero WebP files remain.

5. Confirm the existing Organization JSON-LD remains valid.

6. Confirm the WebSite JSON-LD remains valid.

7. Confirm any newly added Service or BreadcrumbList JSON-LD uses only real routes and real services.

8. Do NOT change the existing canonical/title/description system.

9. Do NOT undo the true static HTML prerendering implementation from the previous command.

10. Run:

npm run build

The build must succeed.

If npm run build cannot be executed because dependencies are unavailable in the Figma Make environment, do not pretend that it succeeded. Report that clearly.

==================================================
FINAL RESPONSE
==================================================

When finished, give me only a concise report containing:

- Files changed
- Old image assets removed, if any
- Confirmation that the six official service PNGs were preserved
- Structured-data changes
- Confirmation that "Peritajes Judiciales" was corrected if appropriate
- Whether BreadcrumbList/Service schema was added
- Whether npm run build succeeded

DO NOT make any other changes.