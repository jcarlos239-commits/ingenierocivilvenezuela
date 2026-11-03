import sanitizeHtml from "sanitize-html"

const ARTICLE_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "blockquote",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "figure",
  "figcaption",
  "div",
  "span",
] as const

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [...ARTICLE_TAGS],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: [
        "src",
        "alt",
        "title",
        "width",
        "height",
        "loading",
        "decoding",
        "data-blog-image",
      ],
      ol: ["start"],
      li: ["value"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      a: ["http", "https", "mailto"],
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs:
          attributes.target === "_blank"
            ? { ...attributes, rel: "noopener noreferrer" }
            : attributes,
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          loading: "lazy",
          decoding: "async",
          "data-blog-image": "content",
        },
      }),
    },
  })
}
