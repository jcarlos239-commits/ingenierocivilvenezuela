import fs from "node:fs"
import path from "node:path"
import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { sanitizeArticleHtml } from "./sanitize-html.ts"

describe("sanitizeArticleHtml", () => {
  it("removes scripts, event handlers, and executable URLs", () => {
    const sanitized = sanitizeArticleHtml(`
      <script>alert('xss')</script>
      <img src="x" onerror="alert('xss')">
      <a href="javascript:alert('xss')">Click</a>
      <div onclick="alert('xss')">Text</div>
    `)

    assert.doesNotMatch(sanitized, /<script/i)
    assert.doesNotMatch(sanitized, /alert\('xss'\)/i)
    assert.doesNotMatch(sanitized, /\son[a-z]+=/i)
    assert.doesNotMatch(sanitized, /javascript:/i)
    assert.match(
      sanitized,
      /<img src="x" loading="lazy" decoding="async" data-blog-image="content" \/>/,
    )
    assert.match(sanitized, /<a>Click<\/a>/)
    assert.match(sanitized, /<div>Text<\/div>/)
  })

  it("preserves supported article formatting and safe links", () => {
    const content = [
      "<h2>Heading</h2>",
      "<p>Normal article text.</p>",
      "<strong>Important</strong>",
      '<a href="https://example.com">External link</a>',
    ].join("")

    assert.equal(sanitizeArticleHtml(content), content)
  })

  it("hardens new-window links and rejects unsafe image schemes", () => {
    const sanitized = sanitizeArticleHtml(
      '<a href="https://example.com" target="_blank">Link</a>' +
        '<img src="data:image/svg+xml,<svg></svg>" alt="Unsafe">',
    )

    assert.match(
      sanitized,
      new RegExp(
        '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>',
      ),
    )
    assert.match(
      sanitized,
      /<img alt="Unsafe" loading="lazy" decoding="async" data-blog-image="content" \/>/,
    )
    assert.doesNotMatch(sanitized, /data:/i)
  })

  it("marks editorial images for lazy loading without changing supplied SEO metadata", () => {
    const sanitized = sanitizeArticleHtml(
      '<figure><img src="/images/fisura.webp" alt="Fisura diagonal en muro de concreto" width="1200" height="800"><figcaption>Inspección de patología estructural</figcaption></figure>',
    )

    assert.match(sanitized, /alt="Fisura diagonal en muro de concreto"/)
    assert.match(sanitized, /width="1200" height="800"/)
    assert.match(sanitized, /loading="lazy"/)
    assert.match(sanitized, /decoding="async"/)
    assert.match(sanitized, /data-blog-image="content"/)
  })
})

describe("BlogArticle rendering boundary", () => {
  it("sanitizes article.content before dangerouslySetInnerHTML", () => {
    const source = fs.readFileSync(
      path.resolve(process.cwd(), "src/pages/BlogArticle.tsx"),
      "utf8",
    )

    assert.match(source, /sanitizeArticleHtml\(article\.content\)/)
    assert.match(
      source,
      /dangerouslySetInnerHTML=\{\{ __html: sanitizedContent \}\}/,
    )
    assert.doesNotMatch(
      source,
      /dangerouslySetInnerHTML=\{\{ __html: article\.content \}\}/,
    )
  })
})
