FINAL LEGACY-ASSET PURGE — REMOVE THE OLD HERO PNG REFERENCE COMPLETELY

This is a FINAL cleanup of the obsolete hero PNG reference.

Do NOT redesign the website.
Do NOT change the current hero.
Do NOT change routes.
Do NOT change SEO.
Do NOT modify unrelated assets or components.

OBJECTIVE:
Completely eliminate the obsolete hero PNG and all references to it from the project, including unreferenced legacy/generated files.

OBSOLETE FILE:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

This file has already been intentionally removed and MUST NOT be recreated.

==================================================
1. CLEAN imports/index.tsx
==================================================

Open:

imports/index.tsx

Remove the obsolete import:

import imgNavigationBar from "./6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";

Remove EVERY usage of:

imgNavigationBar

that exists solely because of this deleted PNG.

Preserve all other legitimate imports and functionality in imports/index.tsx.

Do NOT replace the deleted PNG with another image.

Do NOT restore the old image.

==================================================
2. CLEAN ALL REFERENCES TO THE OLD FILENAME
==================================================

Search the ENTIRE repository, not only src/.

Search for this exact filename:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

Search all of:

- src/
- imports/
- scripts/
- public/
- .figma/
- configuration files
- generated files
- legacy files

Remove every actual reference to this deleted asset.

This includes imports, require() calls, string references, image source references, and other executable/generated references.

Do NOT recreate the asset.

==================================================
3. CLEAN imgNavigationBar
==================================================

Search the entire repository for:

imgNavigationBar

If every occurrence is associated with the deleted legacy PNG, remove it completely.

After cleanup, there should be ZERO references to imgNavigationBar.

If an occurrence is genuinely associated with another valid asset, preserve only that legitimate usage and explain it in the final report.

==================================================
4. DO NOT DELETE imports/index.tsx JUST BECAUSE IT IS LEGACY
==================================================

Do NOT simply delete imports/index.tsx as a shortcut.

First remove the obsolete PNG dependency and preserve any legitimate code in the file.

If, after removing the obsolete reference, the file is completely unused and contains no legitimate project functionality, you MAY remove the entire file ONLY if you verify that:

- nothing imports it
- nothing references it
- it is not part of the build
- it is not required by Figma Make
- it is not required by any generated workflow

If it is safe to delete, deleting the obsolete unused file is acceptable.

If there is any legitimate dependency on the file, keep the file and simply remove the dead PNG code.

==================================================
5. VERIFY THE CURRENT HERO
==================================================

The active website hero MUST continue using:

src/imports/ObrasCivilesLanding/hero-desktop.webp

and:

src/imports/ObrasCivilesLanding/hero-mobile.webp

Do not change these assets.

Do not change the visual appearance of the hero.

Do not introduce another hero image.

==================================================
6. DO NOT TOUCH APPROVED CONTENT
==================================================

Preserve exactly:

“Obras Garantizadas”

“Avalúos Técnicos y Peritajes Judiciales”

“grupo de ingenieros civiles”

Do not introduce or restore:

“Cobertura en Toda Venezuela”

“especialista”

or the old valuation/peritaje terminology.

==================================================
7. DO NOT TOUCH THESE ASSETS
==================================================

Preserve:

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

site.webmanifest

sitemap.xml

robots.txt

Do not make unrelated asset changes.

==================================================
8. FINAL REPOSITORY-WIDE ZERO-REFERENCE TEST
==================================================

After making the changes, perform a repository-wide search again.

Search EXACTLY for:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

REQUIRED RESULT:

ZERO occurrences anywhere in the project.

Then search for:

imgNavigationBar

REQUIRED RESULT:

ZERO occurrences anywhere in the project.

Do not merely check src/.

Check the entire project.

If either search still returns a result, continue fixing it before declaring the task complete.

==================================================
9. VERIFY THE OLD FILE DOES NOT EXIST
==================================================

Confirm that:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

does NOT exist anywhere in the project.

Do not recreate it.

==================================================
10. VERIFY THE CURRENT HERO STILL WORKS
==================================================

Confirm that the active application still references:

hero-desktop.webp

hero-mobile.webp

and that no current hero component references the deleted PNG.

==================================================
11. BUILD VALIDATION
==================================================

Run the actual project build:

pnpm run build

If the build fails because of this cleanup:

- identify the error
- fix it
- run pnpm run build again

Do not finish with a known build error.

==================================================
12. FINAL REPORT — MUST PROVIDE ACTUAL VERIFICATION
==================================================

Report:

1. Files changed.
2. Whether imports/index.tsx was cleaned or safely removed.
3. Confirmation that the old PNG does not exist.
4. Confirmation that the exact old filename has ZERO occurrences anywhere in the repository.
5. Confirmation that imgNavigationBar has ZERO occurrences anywhere in the repository.
6. Confirmation that hero-desktop.webp and hero-mobile.webp remain the active hero assets.
7. Confirmation that no routes, SEO, business wording, or approved assets were changed.
8. Exact result of pnpm run build.

IMPORTANT:

Do NOT say “fixed” unless the final repository-wide searches actually return ZERO results.

This task is complete only when:

OLD PNG FILE = NOT PRESENT
OLD PNG REFERENCES = 0
imgNavigationBar REFERENCES = 0
CURRENT WEBP HERO = ACTIVE
BUILD = SUCCESSFUL

Make no unrelated changes.