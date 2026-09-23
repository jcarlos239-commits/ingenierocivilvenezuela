#!/usr/bin/env node
/**
 * Static prerender script — runs after `vite build` and the SSR build.
 * For each route:
 *   1. Calls the SSR entry-server to get the real React-rendered HTML.
 *   2. Injects that HTML into <div id="root">...</div>.
 *   3. Injects route-specific <title>, <meta>, <link rel="canonical">,
 *      og:*, and Twitter card tags into the <head>.
 *   4. Writes dist/<route>/index.html (or dist/index.html for /).
 *
 * No new runtime dependencies — plain Node.js ESM.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const serverEntry = path.resolve(distDir, "server/entry-server.js");
const OG_IMAGE = "https://ingenierocivilvenezuela.com/og-image.webp";

// Paths to prerender. Title/description/canonical come from routeMeta in the
// server bundle (src/utils/prerender-meta.ts) — single source of truth.
const routePaths = [
  "/",
  "/servicios",
  "/como-trabajamos",
  "/cobertura",
  "/servicios/proyectos",
  "/servicios/construccion-obras-civiles",
  "/servicios/remodelaciones-ampliaciones",
  "/servicios/avaluos-peritajes-tecnicos",
  "/servicios/patologia-estructural",
  "/servicios/estabilizacion-taludes",
];

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectContent(html, renderedHtml) {
  // Extract any React Router hydration script from the end of renderedHtml
  // StaticRouterProvider appends: <script>window.__staticRouterHydrationData = ...</script>
  // It must live OUTSIDE #root so React doesn't try to hydrate it.
  const hydrationScriptMatch = renderedHtml.match(
    /(<script[^>]*>window\.__staticRouterHydrationData[\s\S]*?<\/script>)\s*$/,
  );

  let appMarkup = renderedHtml;
  let hydrationScript = "";

  if (hydrationScriptMatch) {
    hydrationScript = hydrationScriptMatch[1];
    appMarkup = renderedHtml.slice(0, hydrationScriptMatch.index);
  }

  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${appMarkup}</div>\n    ${hydrationScript}`,
  );
}

function injectMeta(html, route) {
  const { title, description } = route;
  const canonical = `https://ingenierocivilvenezuela.com${route.path === "/" ? "/" : route.path}`;
  const eTitle = escapeAttr(title);
  const eDesc = escapeAttr(description);
  const eCanonical = escapeAttr(canonical);
  const eImage = escapeAttr(OG_IMAGE);

  // Replace <title>
  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${eTitle}</title>`);

  // Build injected meta block to insert before </head>
  const injected = `
  <meta name="description" content="${eDesc}" />
  <link rel="canonical" href="${eCanonical}" />
  <meta property="og:title" content="${eTitle}" />
  <meta property="og:description" content="${eDesc}" />
  <meta property="og:url" content="${eCanonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${eImage}" />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón" />
  <meta property="og:site_name" content="Ing. Juan Carlos Mogollón" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${eTitle}" />
  <meta name="twitter:description" content="${eDesc}" />
  <meta name="twitter:image" content="${eImage}" />`;

  // Remove any existing og:/twitter:/description/canonical tags already in the HTML
  result = result
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:title"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:description"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:url"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:type"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:type"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:width"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:height"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:image:alt"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:site_name"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:card"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:title"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:description"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:image"[^>]*>/gi, "");

  result = result.replace("</head>", `${injected}\n</head>`);
  return result;
}

// Load the SSR entry module built by `vite build --ssr`
const { render, routeMeta } = await import(serverEntry);

const baseHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

for (const routePath of routePaths) {
  try {
    const meta = routeMeta[routePath];
    if (!meta) throw new Error(`No routeMeta found for path: ${routePath}`);
    const route = { path: routePath, title: meta.title, description: meta.description };

    const renderedHtml = await render(routePath);
    let html = injectContent(baseHtml, renderedHtml);
    html = injectMeta(html, route);

    if (routePath === "/") {
      fs.writeFileSync(path.join(distDir, "index.html"), html, "utf-8");
      console.log("Prerendered: /");
    } else {
      const routeDir = path.join(distDir, routePath.slice(1));
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
      console.log(`Prerendered: ${routePath}`);
    }
  } catch (err) {
    console.error(`ERROR prerendering ${routePath}:`, err);
    throw err;
  }
}

console.log(`\nPrerendering complete. ${routePaths.length} routes written to dist/.`);
