Make ONLY the following three codebase cleanup corrections.

Do not modify the visual design, content, routes, service illustrations, hero images, favicon, OG image, SSR/hydration behavior, or any unrelated code.

==================================================
CLEAN UP DUPLICATE SERVICES COMPONENTS
==================================================

Inspect:

src/components/Services.tsx

and:

src/pages/Servicios.tsx

Determine which component is actually used by the application's route configuration.

The active /servicios route must continue using the current production implementation:

src/pages/Servicios.tsx

Before deleting anything, perform a project-wide search for imports/references to:

src/components/Services.tsx

and its component/export name.

If src/components/Services.tsx has ZERO active references, remove the obsolete component and ONLY its now-unused import/export references.

If it has ANY active reference, DO NOT delete it.

Do not rewrite the active Servicios page.

Do not change the /servicios route.

Do not change the visual appearance of the Services page.

After cleanup, verify that the /servicios route still resolves to the intended active component.

==================================================
CONSOLIDATE DUPLICATED SEO ARCHITECTURE
==================================================

The project currently has multiple SEO-related systems, including:

src/utils/seo.ts

src/utils/prerender-meta.ts

scripts/prerender.js

index.html

Do NOT blindly delete any of them.

First inspect how each one is actually used.

The goal is to establish ONE canonical source of route-specific SEO metadata while preserving the current generated output.

The canonical metadata source should contain, as applicable:

- title
- description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter metadata
- route-specific SEO information

Preserve the existing SEO behavior.

The following MUST remain unchanged in the generated site:

- lang="es"
- canonical URLs
- page titles
- meta descriptions
- OG image
- Twitter card
- Organization JSON-LD
- WebSite JSON-LD
- Service JSON-LD
- BreadcrumbList JSON-LD

Do NOT remove JSON-LD.

Do NOT remove prerendering.

Do NOT move SEO generation into client-only useEffect logic.

SEO metadata MUST continue to exist in the prerendered HTML.

Choose the existing metadata system that is already authoritative for prerendered routes and consolidate the duplicated systems around it.

Do not create a new unnecessary SEO abstraction if an existing one can be used.

After consolidation, search the entire project for imports of the removed/redundant SEO utilities.

Delete ONLY utilities that are genuinely unused after the consolidation.

Do NOT delete a file merely because it looks duplicated.

If removing a utility would require changing visible SEO output, preserve the existing behavior.

==================================================
IMPORTANT SEO VERIFICATION
==================================================

After consolidation, inspect generated HTML for at least:

/
/servicios
/servicios/proyectos
/servicios/avaluos-peritajes-tecnicos

Confirm that each page still has:

<title>

<meta name="description">

<link rel="canonical">

Open Graph metadata

Twitter metadata where applicable

appropriate JSON-LD

Do not accept a solution where SEO metadata only appears after client-side JavaScript executes.

==================================================
VERIFY THE SHARP DEPENDENCY
==================================================

Inspect package.json and the entire project for usage of:

sharp

Search for:

import sharp
from "sharp"
require("sharp")
require('sharp')
sharp(
and any other direct usage.

Also inspect:

scripts/
src/
vite.config.*
configuration files
package scripts

Determine whether sharp is actually required by the project.

If sharp has ZERO usage and is not required indirectly by an existing project script/configuration:

REMOVE sharp from package.json.

Then update the project's lockfile using the project's existing package manager.

Do NOT upgrade unrelated packages.

Do NOT change package versions other than removing sharp and the dependency entries that belong specifically to sharp.

If sharp is actually used anywhere:

DO NOT REMOVE IT.

Report where it is used instead.

==================================================
DO NOT CHANGE THESE
==================================================

Do NOT modify:

- SSR architecture
- StaticRouterProvider
- hydrationData
- hydrateRoot
- scripts/prerender.js behavior unless required solely for SEO consolidation
- route definitions
- service URLs
- visual design
- colors
- fonts
- layout
- hero
- "Obras Garantizadas"
- "Avalúos Técnicos y Peritajes Judiciales"
- six official service illustrations
- hero-desktop.webp
- hero-mobile.webp
- OG image
- favicon assets
- sitemap.xml
- robots.txt

Do not perform unrelated cleanup.

==================================================
BUILD VERIFICATION
==================================================

After completing the cleanup, run:

npm run build

The build must actually execute.

If the build fails:

1. inspect the actual error
2. determine whether the error was caused by this cleanup
3. fix only that error
4. run npm run build again

Do not change unrelated code just to make the build pass.

==================================================
POST-BUILD VERIFICATION
==================================================

After a successful build, verify:

/ 
/servicios
/servicios/proyectos
/servicios/avaluos-peritajes-tecnicos

Confirm:

- prerendered HTML exists
- root contains application markup
- title exists
- meta description exists
- canonical exists
- OG metadata exists
- JSON-LD exists
- correct service wording remains
- route behavior remains unchanged

Also verify that the /servicios page still renders the same active component and that no broken imports remain.

==================================================
FINAL REPORT
==================================================

Report these items:

SERVICES COMPONENT
- Was src/components/Services.tsx actually unused?
- Was it deleted?
- Was src/pages/Servicios.tsx preserved?
- Does /servicios still use the intended component?

SEO
- Which SEO source is now canonical?
- Which redundant SEO files/utilities were removed, if any?
- Confirm that prerendered SEO output is unchanged.
- Confirm title, description, canonical, OG and JSON-LD remain present.

SHARP
- Was sharp actually used?
- If unused, was it removed from package.json and the lockfile?
- If used, where?

BUILD
- npm run build: SUCCESS/FAILURE
- number of prerendered routes

Do not claim a component, SEO utility, or dependency was unused unless you actually searched the project and verified it.