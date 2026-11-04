import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createPageViewTracker, GA4_MEASUREMENT_ID } from "./analytics.ts"

describe("GA4 page-view tracking", () => {
  it("skips the initial page and duplicate route notifications", () => {
    const events: unknown[][] = []
    const gtag = (...args: unknown[]) => events.push(args)
    const trackPageView = createPageViewTracker("/")

    assert.equal(
      trackPageView("/", "https://example.com/", "Inicio", gtag),
      false,
    )
    assert.equal(
      trackPageView(
        "/servicios",
        "https://example.com/servicios",
        "Servicios",
        gtag,
      ),
      true,
    )
    assert.equal(
      trackPageView(
        "/servicios",
        "https://example.com/servicios",
        "Servicios",
        gtag,
      ),
      false,
    )

    assert.equal(events.length, 1)
    assert.deepEqual(events[0], [
      "event",
      "page_view",
      {
        send_to: GA4_MEASUREMENT_ID,
        page_path: "/servicios",
        page_location: "https://example.com/servicios",
        page_title: "Servicios",
      },
    ])
  })

  it("tracks dynamic articles, query changes, and back navigation once each", () => {
    const events: unknown[][] = []
    const gtag = (...args: unknown[]) => events.push(args)
    const trackPageView = createPageViewTracker("/blog")

    assert.equal(
      trackPageView(
        "/blog/articulo-de-prueba",
        "https://example.com/blog/articulo-de-prueba",
        "Artículo",
        gtag,
      ),
      true,
    )
    assert.equal(
      trackPageView(
        "/blog/articulo-de-prueba?ref=home",
        "https://example.com/blog/articulo-de-prueba?ref=home",
        "Artículo",
        gtag,
      ),
      true,
    )
    assert.equal(
      trackPageView("/blog", "https://example.com/blog", "Blog", gtag),
      true,
    )

    assert.equal(events.length, 3)
  })
})
