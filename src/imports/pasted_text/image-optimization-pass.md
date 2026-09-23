PERFORM ONLY A CONTROLLED IMAGE OPTIMIZATION PASS.

DO NOT redesign anything.
DO NOT change layout.
DO NOT change colors.
DO NOT change typography.
DO NOT change text.
DO NOT change the six official service illustrations.
DO NOT modify the Header, Footer, cards, buttons, or page structure.

The ONLY purpose of this command is to optimize photographic images and image delivery.

==================================================
1. HERO IMAGE
==================================================

The current hero image is:

src/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

It is approximately 1536 × 672 and approximately 1.76 MB.

Convert this photographic image to WebP.

Create optimized versions:

hero-desktop.webp
hero-mobile.webp

Use high visual quality while substantially reducing file size.

The desktop version should preserve the current visual composition.

The mobile version should be appropriately sized for mobile screens and preserve the current crop as closely as possible.

Do NOT change the visual appearance of the hero.

==================================================
2. RESPONSIVE HERO DELIVERY
==================================================

Update the Hero component to use responsive image delivery.

Use <picture> and/or srcset.

The implementation should provide:

Desktop:
hero-desktop.webp

Mobile:
hero-mobile.webp

The primary above-the-fold hero image MUST NOT use loading="lazy".

Use:

fetchpriority="high"

for the primary hero image if appropriate.

Provide explicit width and height or an aspect-ratio strategy to prevent layout shift.

==================================================
3. REMOVE THE CURRENT HERO PRELOAD
==================================================

The current index.html contains a preload pointing to a source-code path similar to:

/src/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

Remove this hard-coded source-code-path preload.

Do not preload the old PNG.

If a preload is still beneficial, implement it using the correct production asset mechanism.

Do not hard-code a Vite source import path into production HTML.

==================================================
4. DUPLICATE HERO ASSET
==================================================

There are duplicate copies of the hero image.

Determine which source file is actually used.

After updating all imports to the optimized WebP asset, remove the unused duplicate hero PNG.

DO NOT remove an image until you verify that no component imports it.

==================================================
5. OTHER LARGE PHOTOGRAPHIC IMAGE
==================================================

Find the photographic asset:

9e6aae16d51c4afd461e3d1458cda9c12495b87b.png

It is approximately 4032 × 3024 and approximately 1.46 MB.

This is a photographic image despite the .png extension.

Convert it to WebP.

Resize it appropriately based on its maximum rendered size.

Do NOT keep a 4032px-wide source if the website never displays it anywhere near that size.

Preserve its visual quality and composition.

Update every component that imports it.

==================================================
6. 72286.JPG
==================================================

Find:

72286.jpg

It is approximately 1272 × 1730 and approximately 1 MB.

Convert it to WebP.

Resize it only if the rendered dimensions allow it.

Update all imports.

Preserve the exact visual appearance.

==================================================
7. UNUSED DUPLICATE ASSETS
==================================================

Audit these assets:

72942.png
72942-1.png

If they are identical and neither is used by the current application, remove the unused copies.

Also inspect:

Screenshot_2026-09-22_at_8.09.39_PM.png

If it is not referenced anywhere in the application and is not required by Figma Make, remove it.

DO NOT delete any asset without verifying that it is unused.

==================================================
8. SIX OFFICIAL SERVICE ILLUSTRATIONS — ABSOLUTELY DO NOT MODIFY
==================================================

These six files are official service illustrations:

72947.png
72948.png
72949.png
72950.png
72951.png
72952.png

DO NOT:

- convert them
- replace them
- regenerate them
- recolor them
- crop them
- add backgrounds
- change transparency
- change their dimensions unnecessarily
- change their filenames
- change their visual appearance

Leave these six files exactly as they are.

==================================================
9. RESPONSIVE IMAGES
==================================================

Audit the remaining photographic images.

Where appropriate use:

srcset
sizes
<picture>

Do not send unnecessarily large photographic images to mobile devices.

Images below the fold should use:

loading="lazy"

The primary hero image must remain eager/high priority.

==================================================
10. IMAGE DIMENSIONS
==================================================

Ensure meaningful images have explicit dimensions or stable aspect-ratio containers.

Prevent cumulative layout shift.

Do not alter the visual design.

==================================================
11. ALT TEXT
==================================================

Do not change existing correct alt text unnecessarily.

Audit meaningful images and ensure they have descriptive alt text.

Decorative images may use:

alt=""

Do not keyword-stuff alt text.

==================================================
12. FINAL VALIDATION
==================================================

Before finishing verify:

- hero PNG is no longer being used
- hero WebP is being used
- mobile hero uses an appropriately sized image
- no source-code-path image preload remains
- duplicate hero is removed if unused
- 4032×3024 photographic asset is optimized
- 72286.jpg is optimized
- unused duplicate assets are removed only when confirmed unused
- six official service PNG illustrations are completely unchanged
- no broken image imports exist
- no page layout changed
- no text changed
- no colors changed
- no typography changed
- no Header/Footer changes occurred
- desktop appearance remains unchanged
- mobile appearance remains unchanged except for improved image loading

DO NOT perform any SEO metadata changes during this command.

DO NOT perform prerendering changes during this command.

THIS COMMAND IS IMAGE OPTIMIZATION ONLY.