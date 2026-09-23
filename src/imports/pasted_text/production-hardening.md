FINAL PRODUCTION HARDENING — FIX THE TWO REMAINING ISSUES ONCE AND FOR ALL

This is a FINAL targeted code-quality and SEO architecture cleanup.

Do NOT redesign the website.
Do NOT change the visual design.
Do NOT change routes.
Do NOT change approved business wording.
Do NOT replace images.
Do NOT make unrelated improvements.

The objective is to eliminate the two remaining issues identified in the latest project audit and then VERIFY that both are actually fixed.

============================================================
ISSUE #1 — REMOVE THE DEAD LEGACY HERO PNG REFERENCE
============================================================

The following legacy PNG has already been intentionally deleted:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

However, the latest audit found that:

imports/index.tsx

still contains an import/reference similar to:

import imgNavigationBar from "./6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";

The latest audit also found remaining usages of imgNavigationBar in that file.

FIX THIS COMPLETELY.

1. Open imports/index.tsx.

2. Remove the obsolete import of:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

3. Remove only the imgNavigationBar JSX/reference/usages that depend on that deleted PNG.

4. Preserve every other legitimate import, component, function, and piece of functionality in imports/index.tsx.

5. DO NOT delete imports/index.tsx just because it is a legacy/generated file.

6. DO NOT recreate the deleted PNG.

7. DO NOT copy another image and pretend it replaces the deleted PNG.

8. DO NOT modify the current active hero implementation.

The active hero must continue using:

src/imports/ObrasCivilesLanding/hero-desktop.webp
src/imports/ObrasCivilesLanding/hero-mobile.webp

============================================================
ISSUE #2 — MAKE SEO APPLICATION LOGIC SINGLE-SOURCE
============================================================

The route SEO DATA is already correctly centralized in:

src/utils/prerender-meta.ts

This file must remain the ONLY source of route-specific:

- title
- description
- canonical URL

The latest audit found that the SEO DOM APPLICATION LOGIC is still duplicated between:

src/main.tsx

and:

src/utils/seo.ts

This must now be cleaned up.

TARGET ARCHITECTURE:

src/utils/prerender-meta.ts
        |
        | getRouteMeta()
        v
ONE SEO APPLICATION HELPER
        |
        +----------------------+
        |                      |
        v                      v
   Client runtime          SSR/prerender
        |                      |
        +----------+-----------+
                   |
                   v
                 <head>

============================================================
RULE 1 — ONE METADATA DATABASE
============================================================

Keep:

src/utils/prerender-meta.ts

as the ONLY route metadata database.

It must remain responsible for:

- route
- title
- description
- canonical

Do NOT create another metadata object/database anywhere else.

Do NOT duplicate route-specific titles/descriptions in:

- main.tsx
- seo.ts
- page components
- scripts/prerender.js
- entry-server.tsx
- index.html
- site.json

============================================================
RULE 2 — ONE RUNTIME SEO APPLICATION HELPER
============================================================

Use:

src/utils/seo.ts

as the SINGLE runtime DOM SEO application helper.

Refactor it so that it receives canonical metadata from getRouteMeta() or from a metadata object returned by getRouteMeta().

It may be responsible for updating the DOM:

- document.title
- meta[name="description"]
- link[rel="canonical"]

If the existing application also intentionally manages Open Graph/Twitter metadata at runtime, that logic may remain in this ONE helper.

However:

NO other file should independently implement the same DOM SEO update logic.

The helper may create missing elements and update existing ones.

It must avoid duplicate:

- description meta tags
- canonical link tags
- OG tags
- Twitter tags

============================================================
RULE 3 — CLEAN src/main.tsx
============================================================

Inspect:

src/main.tsx

Remove its duplicate SEO DOM implementation.

DO NOT remove the initial route metadata behavior.

Instead, make main.tsx call the centralized SEO mechanism.

Conceptually:

1. Determine the current pathname.
2. Call getRouteMeta(pathname).
3. Pass the resulting metadata to the ONE SEO application helper.

Do NOT hardcode title/description/canonical values in main.tsx.

Do NOT maintain a second SEO implementation in main.tsx.

============================================================
RULE 4 — CLEAN ALL PAGE COMPONENTS
============================================================

Inspect all current users of applyPageSeo(), including:

src/pages/Cobertura.tsx
src/pages/ComoTrabajamos.tsx
src/pages/Home.tsx
src/pages/Servicios.tsx
src/pages/ServicePageLayout.tsx

They must obtain route metadata through:

getRouteMeta()

or through the centralized mechanism that ultimately uses getRouteMeta().

Do NOT put page-specific SEO values directly inside these components.

Do NOT create another SEO metadata object.

============================================================
RULE 5 — PRESERVE SSR/PRERENDER
============================================================

DO NOT BREAK THE EXISTING SSR architecture.

Preserve:

src/entry-server.tsx

and:

scripts/prerender.js

The prerender process must continue using the same canonical route metadata from:

src/utils/prerender-meta.ts

Do NOT create a separate metadata database inside scripts/prerender.js.

Do NOT change the existing React Router hydration-data implementation.

The existing hydration architecture must remain intact.

============================================================
RULE 6 — PRESERVE THE APPROVED SERVICE SEO
============================================================

The service:

/servicios/avaluos-peritajes-tecnicos

must continue to use:

“Avalúos Técnicos y Peritajes Judiciales”

and:

“avalúos técnicos y peritajes judiciales”

where appropriate.

Do NOT revert to:

“Avalúos y Peritajes Técnicos”

or:

“avalúos y peritajes técnicos”

The visible H1, SEO title, and SEO description must remain consistent.

============================================================
RULE 7 — PRESERVE APPROVED BUSINESS LANGUAGE
============================================================

DO NOT CHANGE:

“Obras Garantizadas”

“grupo de ingenieros civiles”

District Capital / Caracas

Miranda

La Guaira

DO NOT introduce:

“Cobertura en Toda Venezuela”

“especialista”

unsupported certifications

unsupported nationwide claims

============================================================
RULE 8 — PRESERVE ROUTES
============================================================

DO NOT rename or change any existing route.

In particular, keep:

/servicios/avaluos-peritajes-tecnicos

exactly as it is.

Do not create redirects merely because of this cleanup.

============================================================
RULE 9 — PRESERVE ASSETS
============================================================

DO NOT MODIFY:

72947.png
72948.png
72949.png
72950.png
72951.png
72952.png

favicon assets

public/og-image.webp

hero-desktop.webp

hero-mobile.webp

sitemap.xml

robots.txt

site.webmanifest

unless a change is absolutely required by the cleanup.

Do NOT recreate:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

============================================================
FINAL VERIFICATION — MANDATORY
============================================================

Do NOT simply report that the work is complete.

Actually perform these searches after the changes.

------------------------------------------------------------
CHECK A — DEAD HERO PNG
------------------------------------------------------------

Search the ACTIVE codebase for:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

RESULT REQUIRED:

ZERO active-code references.

Also search for:

imgNavigationBar

If imgNavigationBar existed only for the deleted PNG, it must have ZERO remaining references.

If it is legitimately used for another valid purpose, preserve that legitimate usage and explain it.

------------------------------------------------------------
CHECK B — SEO DATABASE DUPLICATION
------------------------------------------------------------

Search the project for:

routeMeta

getRouteMeta

applyPageSeo

document.title

meta[name="description"]

link[rel="canonical"]

Verify that:

src/utils/prerender-meta.ts

is the ONLY route-specific metadata database.

Verify that:

src/utils/seo.ts

is the ONLY runtime SEO DOM application helper.

Verify that main.tsx does NOT contain a duplicate SEO DOM implementation.

Verify that page components do NOT contain hardcoded route-specific SEO metadata.

Verify that scripts/prerender.js does NOT contain a duplicate title/description/canonical database.

------------------------------------------------------------
CHECK C — OLD SERVICE TERMINOLOGY
------------------------------------------------------------

Search ACTIVE code case-insensitively for:

“Avalúos y Peritajes Técnicos”
“avalúos y peritajes técnicos”

These must have ZERO active references when referring to this service.

The approved terminology must remain:

“Avalúos Técnicos y Peritajes Judiciales”

------------------------------------------------------------
CHECK D — APPROVED HERO
------------------------------------------------------------

Verify that the active hero references:

hero-desktop.webp
hero-mobile.webp

and NOT the deleted PNG.

------------------------------------------------------------
CHECK E — BUILD
------------------------------------------------------------

Run the real project build:

pnpm run build

If the build fails because of these changes:

1. Identify the actual error.
2. Fix it.
3. Run pnpm run build again.
4. Continue until the build succeeds.

Do NOT finish with a known build error.

============================================================
FINAL REPORT
============================================================

At the end, report exactly:

1. Files changed.
2. Confirmation that the legacy PNG reference was completely removed.
3. Confirmation that the deleted PNG was NOT recreated.
4. Confirmation that the current WebP hero remains active.
5. Confirmation that src/utils/prerender-meta.ts is the single SEO metadata database.
6. Confirmation that src/utils/seo.ts is the single runtime SEO DOM application helper.
7. Confirmation that main.tsx no longer contains duplicate SEO DOM logic.
8. Confirmation that page components do not contain duplicate route SEO metadata.
9. Confirmation that SSR/prerender still uses the same metadata source.
10. Confirmation that the approved “Avalúos Técnicos y Peritajes Judiciales” terminology remains consistent.
11. Confirmation that routes and visual assets were preserved.
12. Final pnpm run build result.

IMPORTANT:
Do not make unrelated changes.
Do not redesign anything.
Do not "improve" copy that was not requested.
Do not alter approved business terminology.
Do not remove working functionality simply to simplify the code.

This task is complete ONLY when the final verification searches pass and pnpm run build succeeds.