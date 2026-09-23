Make ONLY the following three corrections.

Do not modify the visual design, layout, routes, SSR/hydration architecture, images, service illustrations, favicon, OG image, or unrelated code.

==================================================
REMOVE ALL OBSOLETE NATIONWIDE COVERAGE WORDING
==================================================

Search the ENTIRE project, including active source files and legacy/generated Figma source files, for:

"Cobertura en Toda Venezuela"

and capitalization variations such as:

"cobertura en toda Venezuela"

The correct geographic coverage is ONLY:

Distrito Capital / Caracas
Miranda
La Guaira

Replace obsolete nationwide coverage wording with the appropriate approved wording:

"Caracas, Miranda y La Guaira"

or:

"Distrito Capital, Miranda y La Guaira"

Use whichever wording fits the surrounding sentence naturally.

Do NOT change legitimate references to Venezuela as a country when they are not describing service coverage.

Do NOT add any other state, city, or region.

Do NOT change the /cobertura route.

After the cleanup, perform another project-wide search.

There must be ZERO remaining occurrences of:

"Cobertura en Toda Venezuela"

or equivalent wording that claims nationwide service coverage.

This includes legacy/generated Figma source files where safely removable.

==================================================
STANDARDIZE ALL AVALÚOS / PERITAJES SEO WORDING
==================================================

The official service name is:

"Avalúos Técnicos y Peritajes Judiciales"

This wording is definitive and must be used consistently.

Search the ENTIRE project for stale SEO/content variants, including:

"Avalúos y Peritajes Técnicos"

"avalúos y peritajes técnicos"

"Avalúos y peritajes técnicos"

"avalúos, peritajes técnicos"

"peritajes técnicos"

when the phrase specifically describes this service.

Update the applicable SEO and content references to use the correct terminology:

"Avalúos Técnicos y Peritajes Judiciales"

Pay particular attention to:

- index.html Organization description
- homepage SEO description
- /servicios SEO description
- prerender-meta.ts
- scripts/prerender.js
- AvaluosPeritajesTecnicos.tsx
- service cards
- related service descriptions
- structured-data descriptions
- meta descriptions
- any other active SEO metadata

Do NOT change the route:

/servicios/avaluos-peritajes-tecnicos

The route must remain exactly as it is.

Do NOT change unrelated uses of the individual words "avalúos", "técnicos", "peritajes", or "judiciales" when they do not refer to this service.

After the changes, search again.

The active website and generated HTML must consistently use:

"Avalúos Técnicos y Peritajes Judiciales"

for this service.

==================================================
REMOVE SHARP LOCKFILE RESIDUE
==================================================

Inspect:

package.json

and:

pnpm-lock.yaml

The package.json no longer declares:

sharp

but pnpm-lock.yaml still contains sharp as a direct dependency/importer entry.

First search the ENTIRE project for actual usage of Sharp:

import sharp
from "sharp"
require("sharp")
require('sharp')
sharp(
and any scripts/configuration that invoke Sharp.

If there is NO actual project usage of Sharp:

1. Confirm sharp is not needed by any build script.
2. Keep sharp removed from package.json.
3. Remove the stale direct sharp dependency entry from pnpm-lock.yaml by using the project's existing pnpm package manager.
4. Update the lockfile correctly so it is internally consistent.
5. Remove only Sharp's now-unused lockfile dependency records/transitive packages that pnpm determines are no longer required.
6. Do NOT manually corrupt or partially edit the lockfile.

Use the project's existing pnpm configuration.

Do NOT run npm install to modify a pnpm project.

Do NOT upgrade unrelated dependencies.

Do NOT change React, React Router, Vite, or any other package versions.

If Sharp IS actually used by the project:

DO NOT remove it.

Instead report exactly where it is used.

==================================================
DO NOT MODIFY THESE
==================================================

Do NOT change:

- SSR architecture
- StaticRouterProvider
- hydrationData
- hydrateRoot
- scripts/prerender.js hydration behavior
- route configuration
- service routes
- visual design
- typography
- colors
- layout
- hero design
- "Obras Garantizadas"
- six official service illustrations
- hero-desktop.webp
- hero-mobile.webp
- OG image
- favicon assets
- sitemap.xml
- robots.txt

IMPORTANT:

"Obras Garantizadas" is approved business copy.

KEEP IT EXACTLY AS IT IS.

Do not remove it.
Do not rewrite it.
Do not flag it as an error.

==================================================
BUILD VERIFICATION
==================================================

After completing the changes, run:

pnpm run build

Use pnpm because this project uses pnpm-lock.yaml.

The build must actually execute.

If the build fails:

1. inspect the actual error
2. determine whether it was caused by these changes
3. fix only the relevant error
4. run pnpm run build again

Do not perform unrelated fixes.

==================================================
FINAL VERIFICATION
==================================================

Search the project for:

"Cobertura en Toda Venezuela"

Expected:
ZERO occurrences referring to nationwide service coverage.

Search for:

"Avalúos y Peritajes Técnicos"

Expected:
ZERO active/generated occurrences referring to this service.

Search for:

"avalúos y peritajes técnicos"

Expected:
ZERO active/generated occurrences referring to this service.

Search for:

"Avalúos Técnicos y Peritajes Judiciales"

Expected:
Present consistently in the relevant service UI and SEO metadata.

Search for:

sharp

Verify whether any actual source/configuration usage remains.

Verify:

package.json
pnpm-lock.yaml

are consistent with the final Sharp dependency state.

==================================================
GENERATED HTML VERIFICATION
==================================================

After a successful build, inspect:

/
/servicios
/servicios/avaluos-peritajes-tecnicos
/cobertura

Confirm:

- correct geographic coverage
- no nationwide coverage claim
- correct "Avalúos Técnicos y Peritajes Judiciales" terminology
- correct meta descriptions
- correct canonical URLs
- JSON-LD remains present
- SSR/prerender output remains intact
- "Obras Garantizadas" remains present where intended

==================================================
FINAL REPORT
==================================================

Report:

GEOGRAPHIC COVERAGE
- obsolete nationwide wording removed: YES/NO
- remaining nationwide coverage occurrences: number
- correct geographic coverage present: YES/NO

AVALÚOS / PERITAJES
- stale SEO wording removed: YES/NO
- correct wording standardized: YES/NO
- route unchanged: YES/NO

SHARP
- actual Sharp usage found: YES/NO
- package.json status
- pnpm-lock.yaml status
- Sharp removed completely if unused: YES/NO

BUILD
- pnpm run build: SUCCESS/FAILURE
- number of prerendered routes

Do not make any other changes.