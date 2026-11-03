import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useWhatsApp } from "@/components/WhatsAppModal"
import heroBgWebP from "@/imports/ObrasCivilesLanding/hero-desktop.webp"
import heroMobileWebP from "@/imports/ObrasCivilesLanding/hero-mobile.webp"
import footingBg from "@/imports/72286.webp"
import { applyPageSeo, resetPageSeo } from "@/utils/seo"
import { getRouteMeta } from "@/utils/prerender-meta"
import {
  getFeaturedArticle,
  getPublishedArticles,
  getPublishedCategories,
} from "@/data/articles"
import type { Category } from "@/data/articles"
import ArticleCard from "@/components/ArticleCard"
import PageHero from "@/components/PageHero"
import WhatsAppIcon from "@/components/WhatsAppIcon"
import { serializeJsonLd } from "@/utils/structured-data"

const PHONE_TEL = "tel:+584141242017"

const sectionTitleClass =
  "font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(20px,3vw,28px)] leading-[1.2]"

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://ingenierocivilvenezuela.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://ingenierocivilvenezuela.com/blog",
    },
  ],
}

export default function Blog() {
  const { trigger, triggerProps, modal } = useWhatsApp()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  useEffect(() => {
    const m = getRouteMeta("/blog")
    applyPageSeo(m)
    return () => resetPageSeo()
  }, [])

  const allPublished = getPublishedArticles()
  const featuredArticle = getFeaturedArticle()
  const visibleCategories = getPublishedCategories(allPublished)

  const filteredArticles = activeCategory
    ? allPublished.filter((a) => a.category === activeCategory)
    : allPublished

  const gridArticles =
    featuredArticle && !activeCategory
      ? filteredArticles.filter((a) => a.slug !== featuredArticle.slug)
      : filteredArticles

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      {modal}
      <div className="w-full">
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
          <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif]">
            <Link
              to="/"
              className="text-[#6c757d] hover:text-[#ffd200] transition-colors"
            >
              Inicio
            </Link>
            <span className="text-[#adb5bd]">/</span>
            <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold">
              Blog
            </span>
          </nav>
        </div>

        <PageHero
          eyebrow="CONOCIMIENTO Y EXPERIENCIA"
          title="Blog de Ingeniería Civil"
          description="Artículos, información técnica y recomendaciones sobre construcción, remodelaciones, patologías estructurales, estabilización de taludes, avalúos y proyectos de ingeniería civil."
          image={heroBgWebP}
          mobileImage={heroMobileWebP}
          imageAlt="Puente en construcción con grúas sobre una zona urbana"
        />

        {/* Introduction */}
        <section className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16">
            <div>
              <div className="w-12 h-[4px] bg-[#ffd200] mb-5" />
              <h2 className={sectionTitleClass}>
                Información para tomar mejores decisiones
              </h2>
            </div>
            <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[14px] sm:text-[16px] leading-[1.75] self-center">
              En este espacio compartimos información relacionada con la
              construcción y la ingeniería civil, con el propósito de explicar
              de manera clara aspectos técnicos que pueden ser relevantes al
              momento de planificar, ejecutar, evaluar o rehabilitar una obra.
            </p>
          </div>
        </section>

        {/* Category filter */}
        {visibleCategories.length > 0 && (
          <div className="bg-[#f8f9fa] border-y border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-4">
            <div className="max-w-[1100px] mx-auto flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={`shrink-0 font-['Inter:Semi Bold',sans-serif] font-semibold text-[12px] sm:text-[13px] px-4 py-[7px] rounded-full border transition-colors whitespace-nowrap ${
                  activeCategory === null
                    ? "bg-[#111315] border-[#111315] text-white"
                    : "bg-white border-[#dee2e6] text-[#495057] hover:border-[#ffd200] hover:text-[#111315]"
                }`}
              >
                Todos
              </button>
              {visibleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(cat === activeCategory ? null : cat)
                  }
                  className={`shrink-0 font-['Inter:Semi Bold',sans-serif] font-semibold text-[12px] sm:text-[13px] px-4 py-[7px] rounded-full border transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#ffd200] border-[#ffd200] text-[#111315]"
                      : "bg-white border-[#dee2e6] text-[#495057] hover:border-[#ffd200] hover:text-[#111315]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles area */}
        <section className="bg-white px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
            {allPublished.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center gap-6 py-16 text-center border border-[#e9ecef] rounded-[10px] bg-[#f8f9fa]">
                <div className="w-12 h-[4px] bg-[#ffd200] mx-auto" />
                <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,2.5vw,24px)] leading-[1.2]">
                  Próximamente
                </h2>
                <p className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[14px] sm:text-[15px] leading-[1.7] max-w-[480px]">
                  Estamos preparando nuevos artículos sobre ingeniería civil,
                  construcción y evaluación de obras.
                </p>
              </div>
            ) : (
              <>
                {/* Featured article */}
                {featuredArticle && !activeCategory && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[3px] bg-[#ffd200]" />
                      <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[11px] uppercase tracking-wide">
                        Artículo destacado
                      </span>
                    </div>
                    <ArticleCard article={featuredArticle} featured />
                  </div>
                )}

                {/* Grid */}
                {gridArticles.length > 0 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[3px] bg-[#ffd200]" />
                      <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[11px] uppercase tracking-wide">
                        {activeCategory
                          ? activeCategory
                          : "Artículos recientes"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gridArticles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Category empty state */}
                {activeCategory && filteredArticles.length === 0 && (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <p className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[15px]">
                      No hay artículos publicados en esta categoría aún.
                    </p>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="font-['Inter:Bold',sans-serif] font-bold text-[#ffd200] text-[13px] hover:underline"
                    >
                      Ver todos los artículos →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative px-4 sm:px-8 md:px-[80px] py-16 sm:py-20 overflow-hidden"
          style={{
            backgroundImage: `url(${footingBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[rgba(20,20,20,0.68)] pointer-events-none" />
          <div
            className="relative max-w-[700px] mx-auto flex flex-col items-center gap-6 text-center"
            style={{ zIndex: 2 }}
          >
            <div className="w-12 h-[4px] bg-[#ffd200] mx-auto" />
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(22px,4vw,36px)] leading-[1.2]">
              ¿Tiene un proyecto o necesita asesoría técnica?
            </h2>
            <p className="font-['Inter:Regular',sans-serif] text-[#ced4da] text-[15px] sm:text-[17px] leading-[1.7]">
              Si necesita evaluar una obra, desarrollar un proyecto o conocer
              las alternativas para una intervención, podemos conversar sobre su
              caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                {...triggerProps}
                onClick={trigger}
                className="inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px] border-none cursor-pointer"
              >
                <WhatsAppIcon />
                Escríbenos por WhatsApp
              </button>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#ffd200] rounded-[8px] px-7 py-4 text-white hover:bg-[#1e2124] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]"
              >
                Llamar ahora
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
