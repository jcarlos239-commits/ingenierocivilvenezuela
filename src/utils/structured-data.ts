import type { Article } from "../data/articles";

export const SCHEMA_IDS = {
  website: "https://ingenierocivilvenezuela.com/#website",
  organization: "https://ingenierocivilvenezuela.com/#organization",
  person: "https://ingenierocivilvenezuela.com/#person",
} as const;

export const SERVICE_AREAS = [
  { "@type": "City", "name": "Caracas" },
  { "@type": "AdministrativeArea", "name": "Distrito Capital" },
  { "@type": "AdministrativeArea", "name": "Miranda" },
  { "@type": "AdministrativeArea", "name": "La Guaira" },
] as const;

export function createBlogPostingStructuredData({
  article,
  canonical,
  image,
}: {
  article: Article;
  canonical: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#blogposting`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical,
    },
    "headline": article.title,
    "description": article.description,
    ...(image ? { "image": [image] } : {}),
    "datePublished": article.date,
    ...(article.dateModified
      ? { "dateModified": article.dateModified }
      : {}),
    "author": {
      "@id": SCHEMA_IDS.person,
    },
    "publisher": {
      "@id": SCHEMA_IDS.organization,
    },
    "inLanguage": "es",
    "isPartOf": {
      "@id": SCHEMA_IDS.website,
    },
    "url": canonical,
    "articleSection": article.category,
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/[<>&]/g, (character) => {
    switch (character) {
      case "<":
        return "\\u003c";
      case ">":
        return "\\u003e";
      default:
        return "\\u0026";
    }
  });
}
