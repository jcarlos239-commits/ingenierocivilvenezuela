CLEAN UP CONFIRMED UNUSED LARGE IMAGE ASSETS — SAFE DELETE ONLY

Make ONLY this asset-cleanup task.

Do NOT change the website design, content, routes, SEO, SSR/hydration architecture, service pages, favicon, OG image, or any unrelated code.

==================================================
GOAL
==================================================

Find and remove image assets that are genuinely unused by the application and unnecessarily increase the project size.

Known candidates from the current audit are:

- src/imports/75347.png
- src/imports/75339.jpg
- src/imports/75338.jpg

These appeared to have zero active source-code references.

However, DO NOT assume they are unused.

VERIFY EACH FILE FIRST.

==================================================
1. SEARCH THE ENTIRE PROJECT
==================================================

For EACH candidate:

75347.png
75339.jpg
75338.jpg

search the entire project for:

- exact filename
- filename without extension
- relative path
- import statement
- require/reference
- URL/reference inside JSX, TSX, TS, CSS, JSON, configuration files, Markdown, HTML, or generated import files

Do not delete anything based only on the previous audit.

==================================================
2. DETERMINE WHETHER EACH FILE IS ACTUALLY USED
==================================================

For each candidate, classify it as:

USED
or
CONFIRMED UNUSED

An asset is CONFIRMED UNUSED only when there is no application reference to it anywhere in the project.

Also check generated/Figma import/index files.

Do NOT consider an asset unused merely because React components do not directly import it.

==================================================
3. DELETE ONLY CONFIRMED UNUSED ASSETS
==================================================

If and ONLY if a candidate has ZERO references, delete that file.

Potential files:

src/imports/75347.png
src/imports/75339.jpg
src/imports/75338.jpg

If a file has ANY legitimate reference, leave it untouched.

Do not replace a used asset.

Do not remove an asset just because it appears old.

==================================================
4. DO NOT DELETE IMPORTANT ASSETS
==================================================

ABSOLUTELY DO NOT delete or modify:

THE SIX OFFICIAL SERVICE ILLUSTRATIONS:

72947.png
72948.png
72949.png
72950.png
72951.png
72952.png

HERO:

src/imports/ObrasCivilesLanding/hero-desktop.webp
src/imports/ObrasCivilesLanding/hero-mobile.webp

OG IMAGE:

public/og-image.webp

FAVICON:

All current favicon assets, including the selected 14-A1 favicon.

Do not optimize, rename, recolor, crop, regenerate, or replace any of these.

==================================================
5. DO NOT TOUCH THE OLD HERO PNG CLEANUP
==================================================

The old hero PNG cleanup is a separate task.

Do not make additional changes to:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

unless it is directly necessary for this task.

Do not combine this task with other cleanup.

==================================================
6. CHECK FOR OTHER LARGE UNUSED IMAGES
==================================================

After checking the three known candidates, optionally scan the project for other unusually large raster image assets.

Prioritize files larger than approximately 500 KB.

For each additional candidate:

- verify every project reference
- classify USED or CONFIRMED UNUSED
- delete ONLY if confirmed unused

Do not perform broad or speculative cleanup.

Do not delete files merely because they are large.

==================================================
7. IMPORTANT — DO NOT DELETE SOURCE ARTIFACTS BLINDLY
==================================================

Some files may be Figma-generated source/import artifacts.

If a file appears to be part of a Figma-generated import structure and it is unclear whether Figma Make needs it, DO NOT delete it.

Leave it in place and report it as:

"Potentially unused but retained because its Figma/source dependency could not be safely established."

Safety is more important than removing a few extra KB/MB.

==================================================
8. VERIFY REFERENCES AFTER CLEANUP
==================================================

After deleting confirmed-unused files, perform another project-wide search.

Confirm that no source-code references remain to each deleted file.

There must be ZERO references to every deleted asset.

==================================================
9. RUN THE BUILD
==================================================

Run:

npm run build

The build must actually execute.

If the build fails because a deleted asset was unexpectedly referenced:

1. identify the exact reference
2. restore/fix the asset as necessary
3. correct the reference
4. run npm run build again

Do not make unrelated fixes.

Do not claim success unless the build actually succeeds.

==================================================
10. VERIFY THE WEBSITE
==================================================

After the successful build, verify that:

- homepage still renders
- hero still renders
- service cards still render
- service illustrations still render
- no broken image references appear
- no new console errors appear

Do not change any visual design.

==================================================
11. FINAL REPORT
==================================================

Report a table with:

| Asset | References found | Action |
|---|---:|---|
| 75347.png | X | Deleted / Retained |
| 75339.jpg | X | Deleted / Retained |
| 75338.jpg | X | Deleted / Retained |

For any additional large assets discovered, report them separately.

Also report:

- total number of files deleted
- approximate disk space removed
- confirmation that the six official service PNGs were untouched
- confirmation that hero WebP files were untouched
- confirmation that OG image was untouched
- confirmation that favicon assets were untouched
- whether npm run build actually succeeded

IMPORTANT:
Do not delete an asset unless you can establish that it is genuinely unused.