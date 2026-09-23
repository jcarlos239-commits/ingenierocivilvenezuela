REMOVE THE OLD HERO PNG COMPLETELY — SAFE REFERENCE CLEANUP ONLY

Make ONLY this asset/reference cleanup. Do not modify the website design, layout, content, SEO, routes, hydration architecture, favicon, OG image, or any unrelated files.

==================================================
GOAL
==================================================

Completely remove the obsolete old hero PNG from the project after confirming that nothing in the active application depends on it.

The obsolete file is:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

Known duplicate locations may include:

src/imports/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

src/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

The optimized replacements that MUST remain are:

src/imports/ObrasCivilesLanding/hero-desktop.webp

src/imports/ObrasCivilesLanding/hero-mobile.webp

==================================================
1. SEARCH THE ENTIRE PROJECT FIRST
==================================================

Search all source files, generated source files, import indexes, components, configuration files, and public files for:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

Also search for the filename without the path.

Identify every remaining reference.

DO NOT DELETE ANY FILE YET.

==================================================
2. VERIFY ACTIVE APPLICATION REFERENCES
==================================================

Confirm that none of the active application components require the old PNG.

Specifically inspect:

- Hero.tsx
- Servicios.tsx
- ComoTrabajamos.tsx
- Cobertura.tsx
- src/imports/index.tsx
- src/imports/ObrasCivilesLanding/index.tsx

The active hero implementation must continue using:

hero-desktop.webp

and:

hero-mobile.webp

Do not reintroduce the PNG as a fallback.

==================================================
3. CLEAN LEGACY IMPORT REFERENCES
==================================================

If the old PNG is referenced only by obsolete/generated import files such as:

src/imports/index.tsx

or:

src/imports/ObrasCivilesLanding/index.tsx

remove ONLY the obsolete import/export/reference to the old PNG.

Do not remove unrelated imports.

Do not regenerate the image.

Do not replace the old PNG reference with another PNG.

The optimized WebP assets remain the canonical hero assets.

==================================================
4. VERIFY ZERO REFERENCES
==================================================

After removing the obsolete references, search the ENTIRE project again for:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

The final search must return ZERO references.

Also search for the old PNG's basename:

6441610d805bf023ff7bc582a38d3531b1c0d4ec

There must be no active source-code reference remaining.

==================================================
5. ONLY THEN DELETE THE OLD PNG FILES
==================================================

After confirming zero references, delete ONLY the obsolete old PNG files.

Possible files:

src/imports/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

src/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

If one of these does not exist, do not create it.

If any reference remains, DO NOT delete the corresponding file. Fix the reference first.

==================================================
6. DO NOT TOUCH THESE FILES
==================================================

ABSOLUTELY PRESERVE:

src/imports/ObrasCivilesLanding/hero-desktop.webp

src/imports/ObrasCivilesLanding/hero-mobile.webp

public/og-image.webp

All favicon assets.

All six official service illustrations:

72947.png
72948.png
72949.png
72950.png
72951.png
72952.png

Do not rename, optimize, recolor, crop, regenerate, or replace them.

==================================================
7. DO NOT TOUCH THE SSR FIX
==================================================

Do not modify:

- src/main.tsx
- src/entry-server.tsx
- scripts/prerender.js
- hydrationData
- StaticRouterProvider
- hydrateRoot

This task is ONLY about the obsolete hero PNG.

==================================================
8. BUILD VERIFICATION
==================================================

After the cleanup, run:

npm run build

If the build fails because the removed PNG is still referenced somewhere, fix that reference and run the build again.

Do not make unrelated fixes.

Do not claim the build succeeded unless it actually ran successfully.

==================================================
9. FINAL VERIFICATION
==================================================

Before finishing, verify:

1. Old PNG references = ZERO.
2. Old PNG files = deleted.
3. hero-desktop.webp still exists.
4. hero-mobile.webp still exists.
5. The homepage still uses the optimized WebP hero.
6. The build succeeds.
7. No six official service illustrations were changed.
8. No unrelated files were modified.

==================================================
10. FINAL REPORT
==================================================

Report exactly:

- Every old PNG reference that was removed.
- Every old PNG file that was deleted.
- Confirmation that zero references remain.
- Confirmation that hero-desktop.webp and hero-mobile.webp remain active.
- Confirmation that the six official service PNGs were untouched.
- Whether npm run build actually succeeded.

Do not report the cleanup as complete unless the final project-wide search confirms ZERO references to the obsolete PNG.