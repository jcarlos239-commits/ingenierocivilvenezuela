FINAL BUILD VERIFICATION — INSTALL DEPENDENCIES, BUILD, AND VERIFY PRODUCTION OUTPUT

This is a BUILD/VERIFICATION task only.

Do not change the website's design, content, routes, SEO, images, service illustrations, favicon, OG image, SSR architecture, or unrelated source code unless an actual build error requires a minimal correction.

==================================================
1. VERIFY PROJECT DEPENDENCY CONFIGURATION
==================================================

Inspect:

- package.json
- package-lock.json, if present
- vite.config.*
- tsconfig.*
- scripts/prerender.js

Do NOT upgrade or downgrade dependencies.

Do NOT change React or React Router versions.

Do NOT regenerate package.json unnecessarily.

The goal is to build the project using its existing dependency configuration.

==================================================
2. INSTALL DEPENDENCIES USING THE EXISTING LOCKFILE
==================================================

If node_modules does not exist, install the dependencies using the project's existing lockfile.

If package-lock.json exists, use:

npm ci

Do NOT use:

npm install --force
npm install --legacy-peer-deps
npm update

unless the existing project configuration specifically requires one of them.

If there is no package-lock.json, use the project's existing package manager based on the lockfile that is actually present.

Do not change dependency versions merely to make the build pass.

==================================================
3. RUN THE REAL PRODUCTION BUILD
==================================================

After dependencies are available, run:

npm run build

This command MUST actually execute.

Do not simulate the build.

Do not simply inspect package.json and say the build should work.

==================================================
4. IF THE BUILD FAILS
==================================================

If npm run build fails:

STOP and inspect the actual error.

Determine whether the error is:

A. an existing project/code error
B. a dependency/environment error
C. an error caused by one of the recent fixes

Fix ONLY genuine code/configuration errors necessary to make the existing production build work.

Do not make unrelated improvements.

After every correction, run:

npm run build

again.

Continue until the build succeeds or there is a genuine external/environment limitation.

==================================================
5. VERIFY THE PRERENDERED OUTPUT
==================================================

After npm run build succeeds, inspect the generated dist output.

Verify that prerendered HTML exists for the configured routes.

At minimum verify:

/
/servicios
/servicios/proyectos
/servicios/construccion-obras-civiles
/servicios/remodelaciones-ampliaciones
/servicios/avaluos-peritajes-tecnicos
/servicios/patologia-estructural
/servicios/estabilizacion-taludes
/como-trabajamos
/cobertura

Do not assume these files were generated.

Actually inspect the output.

==================================================
6. VERIFY SSR CONTENT
==================================================

Inspect the generated homepage and at least two service pages.

Confirm that the generated HTML contains actual page content.

The root must NOT be empty like:

<div id="root"></div>

The prerendered HTML should contain the React application markup.

==================================================
7. VERIFY HYDRATION SCRIPT PLACEMENT
==================================================

Inspect the generated HTML.

Confirm:

<div id="root">
    React application markup
</div>

and then outside #root:

<script>
    React Router hydration data...
</script>

The React Router hydration script MUST NOT be inside #root.

Confirm that:

window.__staticRouterHydrationData

is present in the generated HTML.

==================================================
8. VERIFY SEO OUTPUT
==================================================

Inspect the generated HTML and confirm:

- lang="es"
- title
- meta description
- canonical
- og:title
- og:description
- og:image
- Twitter metadata
- Organization JSON-LD
- WebSite JSON-LD

For service pages also verify:

- Service JSON-LD
- BreadcrumbList JSON-LD

Do not modify SEO unless the build reveals an actual error.

==================================================
9. VERIFY CURRENT SERVICE NAME
==================================================

Search the project and generated output for:

"Avalúos y Peritajes Técnicos"

There must be ZERO occurrences.

The correct wording must remain:

"Avalúos Técnicos y Peritajes Judiciales"

Do not change the route:

/servicios/avaluos-peritajes-tecnicos

==================================================
10. VERIFY HERO ASSETS
==================================================

Confirm the active application uses:

hero-desktop.webp

and:

hero-mobile.webp

Confirm the obsolete hero PNG is not referenced by active application code.

Do not modify the six official service illustrations.

==================================================
11. RUN A FINAL SOURCE SEARCH
==================================================

Search for these known obsolete/problematic items:

6441610d805bf023ff7bc582a38d3531b1c0d4ec.png

"Avalúos y Peritajes Técnicos"

Confirm that no active references remain.

==================================================
12. OPTIONAL BROWSER TEST
==================================================

If the Figma Make environment provides a browser preview, test:

/
/servicios
/servicios/proyectos

Open the browser console.

Check specifically for:

- React hydration mismatch
- hydration errors
- failed JavaScript modules
- failed image requests
- 404s for generated route assets

Do not change unrelated code based on warnings that are not caused by this project.

==================================================
13. DO NOT CLAIM SUCCESS WITHOUT ACTUAL EXECUTION
==================================================

This is extremely important.

Do NOT say:

"Build should pass."

Do NOT say:

"Build is expected to pass."

Do NOT say:

"Build configuration looks correct."

Only report:

"npm run build succeeded"

if the command actually ran successfully in the Figma Make environment.

If the command cannot execute because of an environment/tool limitation, explicitly report that limitation.

==================================================
14. FINAL REPORT
==================================================

Provide a concise final verification report:

BUILD
- Dependency installation: SUCCESS/FAILED
- npm run build: SUCCESS/FAILED
- Prerender generation: SUCCESS/FAILED

SSR/HYDRATION
- prerendered HTML generated: YES/NO
- root contains application markup: YES/NO
- hydration script outside #root: YES/NO
- __staticRouterHydrationData present: YES/NO

SEO
- lang="es": YES/NO
- canonical: YES/NO
- OG metadata: YES/NO
- JSON-LD: YES/NO

CONTENT
- correct service name: YES/NO
- stale service name remains: YES/NO
- old hero PNG references remain: YES/NO

BROWSER
- hydration tested: YES/NO
- console errors: YES/NO

MOST IMPORTANT:
Actually execute npm ci/npm run build and inspect the resulting files. Do not infer the result from the source code.