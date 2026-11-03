import assert from "node:assert/strict"
import { after, before, beforeEach, describe, it } from "node:test"
import { createMemoryRouter } from "react-router"
import { createServer } from "vite"

const publishedArticle = {
  slug: "articulo-publicado",
  title: "Artículo público de prueba",
  description: "Descripción pública del artículo de prueba.",
  excerpt: "Resumen público",
  date: "2020-01-15",
  author: "Juan Carlos Mogollón Cabrera",
  category: "Construcción de Obras Civiles",
  published: true,
}

const unpublishedArticle = {
  ...publishedArticle,
  slug: "articulo-privado",
  title: "Contenido privado que no debe mostrarse",
  published: false,
}

let vite
let entryServer
let routeModule

before(async () => {
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "silent",
  })
  entryServer = await vite.ssrLoadModule("/src/entry-server.tsx")
  routeModule = await vite.ssrLoadModule("/src/route-config.tsx")
})

after(async () => {
  entryServer?.articles.splice(0)
  await vite?.close()
})

beforeEach(() => {
  entryServer.articles.splice(0)
})

describe("SSR HTTP routing", () => {
  it("returns HTTP 200 for the homepage", async () => {
    const response = await entryServer.renderRequest("/")
    assert.equal(response.status, 200)
  })

  it("returns HTTP 200 for a valid static service route", async () => {
    const response = await entryServer.renderRequest(
      "/servicios/construccion-obras-civiles",
    )
    assert.equal(response.status, 200)
  })

  it("returns HTTP 200 for a valid published article", async () => {
    entryServer.articles.push(publishedArticle)
    const response = await entryServer.renderRequest(
      `/blog/${publishedArticle.slug}`,
    )
    const html = await response.text()

    assert.equal(response.status, 200)
    assert.match(html, new RegExp(publishedArticle.title))
  })

  it("returns HTTP 404 for an unknown static route", async () => {
    const response = await entryServer.renderRequest("/ruta-inexistente")
    const html = await response.text()

    assert.equal(response.status, 404)
    assert.match(html, /Página no encontrada/)
  })

  it("returns HTTP 404 for an unknown blog slug", async () => {
    const response = await entryServer.renderRequest("/blog/no-existe")
    assert.equal(response.status, 404)
  })

  it("returns HTTP 404 without exposing an unpublished article", async () => {
    entryServer.articles.push(unpublishedArticle)
    const response = await entryServer.renderRequest(
      `/blog/${unpublishedArticle.slug}`,
    )
    const html = await response.text()

    assert.equal(response.status, 404)
    assert.doesNotMatch(html, new RegExp(unpublishedArticle.title))
    assert.match(html, /Página no encontrada/)
  })

  it("preserves the /cobertura redirect to /sobre-mi", async () => {
    const response = await entryServer.renderRequest("/cobertura")

    assert.equal(response.status, 301)
    assert.equal(response.headers.get("location"), "/sobre-mi")
  })

  it("returns HTTP 404 for an unknown nested route", async () => {
    const response = await entryServer.renderRequest(
      "/servicios/ruta/anidada/inexistente",
    )
    assert.equal(response.status, 404)
  })
})

describe("client-side routing", () => {
  it("keeps an unknown navigation on its URL and records a 404 route error", async () => {
    const router = createMemoryRouter(routeModule.routeConfig, {
      initialEntries: ["/"],
    })

    await router.navigate("/ruta-cliente-inexistente")

    assert.equal(router.state.location.pathname, "/ruta-cliente-inexistente")
    assert.ok(
      Object.values(router.state.errors ?? {}).some(
        (error) => error?.status === 404,
      ),
    )
    router.dispose()
  })
})
