import { getRouteMeta } from "./prerender-meta";

const BASE_URL = "https://ingenierocivilvenezuela.com";
const OG_IMAGE = `${BASE_URL}/og-image.webp`;

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

export function applyPageSeo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  document.title = title;
  setMeta("description", description);
  setCanonical(`${BASE_URL}${path}`);
  setProperty("og:title", title);
  setProperty("og:description", description);
  setProperty("og:url", `${BASE_URL}${path}`);
  setProperty("og:type", "website");
  setProperty("og:image", OG_IMAGE);
  setProperty("og:image:type", "image/webp");
  setProperty("og:image:width", "1200");
  setProperty("og:image:height", "630");
  setProperty("og:image:alt", "Obras Civiles en Venezuela - Ing. Juan Carlos Mogollón");
  setProperty("og:site_name", "Ing. Juan Carlos Mogollón");
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", OG_IMAGE);
}

export function resetPageSeo() {
  const m = getRouteMeta("/");
  applyPageSeo({ title: m.title, description: m.description, path: "/" });
}
