import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { getRouteMeta } from "./utils/prerender-meta";
import { applyPageSeo } from "./utils/seo";

// Apply route-specific meta synchronously before React hydrates so that
// JS-executing crawlers see the correct title/description immediately.
const _path = window.location.pathname;
const _meta = getRouteMeta(_path);
applyPageSeo({ title: _meta.title, description: _meta.description, path: _path });

const rootEl = document.getElementById("root")!;
if (rootEl.hasChildNodes()) {
  hydrateRoot(
    rootEl,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
