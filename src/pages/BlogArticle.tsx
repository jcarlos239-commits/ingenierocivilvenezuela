import { useEffect } from "react"
import { Link, useParams } from "react-router"
import { useWhatsApp } from "@/components/WhatsAppModal"
import heroBgWebP from "@/imports/ObrasCivilesLanding/hero-desktop.webp"
import { getArticleBySlug, getRelatedArticles } from "@/data/articles"
import ArticleCard from "@/components/ArticleCard"
import {
  applyPageSeo,
  createArticlePageSeoOptions,
  resetPageSeo,
} from "@/utils/seo"
import {
  createBlogPostingStructuredData,
  serializeJsonLd,
} from "@/utils/structured-data"
import { sanitizeArticleHtml } from "@/utils/sanitize-html"

const PHONE_TEL = "tel:+584141242017"

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const { trigger, triggerProps, modal } = useWhatsApp()
  const article = slug ? getArticleBySlug(slug) : undefined

  useEffect(() => {
    if (!article) return
    applyPageSeo(createArticlePageSeoOptions(article))
    return () => resetPageSeo()
  }, [article])

  // The route loader rejects missing and unpublished slugs before rendering.
  if (!article) return null

  const related = getRelatedArticles(article)
  const sanitizedContent = article.content
    ? sanitizeArticleHtml(article.content)
    : undefined

  const formattedDate = new Date(article.date).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const articleSeo = createArticlePageSeoOptions(article)
  const articleCanonical = articleSeo.canonical
  const articleImage = article.featuredImage ? articleSeo.ogImage : undefined

  const articleSchema = createBlogPostingStructuredData({
    article,
    canonical: articleCanonical,
    image: articleImage,
  })

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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleCanonical,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      {modal}
      <div className="w-full">
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
          <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif] flex-wrap">
            <Link
              to="/"
              className="text-[#6c757d] hover:text-[#ffd200] transition-colors"
            >
              Inicio
            </Link>
            <span className="text-[#adb5bd]">/</span>
            <Link
              to="/blog"
              className="text-[#6c757d] hover:text-[#ffd200] transition-colors"
            >
              Blog
            </Link>
            <span className="text-[#adb5bd]">/</span>
            <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </nav>
        </div>

        {/* Article header */}
        <div className="bg-white px-4 sm:px-8 md:px-[80px] py-10 sm:py-14 border-b border-[#e9ecef]">
          <div className="max-w-[780px] mx-auto flex flex-col gap-5">
            <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[11px] uppercase tracking-wide">
              {article.category}
            </span>
            <h1 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(22px,4vw,40px)] leading-[1.15]">
              {article.title}
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[#6c757d] text-[13px] sm:text-[14px]">
              {formattedDate} ·{" "}
              <Link
                to="/sobre-mi"
                className="hover:text-[#ffd200] transition-colors"
              >
                {article.author}
              </Link>
            </p>
          </div>
        </div>

        {/* Featured image */}
        {article.featuredImage && (
          <div
            className="relative w-full overflow-hidden"
            style={{
              height: "min(56.25vw, 480px)",
            }}
          >
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              width={article.featuredImageWidth}
              height={article.featuredImageHeight}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              data-blog-image="featured"
              className="absolute inset-0 block w-full h-full object-cover object-center"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        {/* Article body */}
        <div className="bg-white px-4 sm:px-8 md:px-[80px] py-10 sm:py-14">
          <div className="max-w-[780px] mx-auto">
            {sanitizedContent ? (
              <div
                className="font-['Inter:Regular',sans-serif] text-[#343a40] text-[15px] sm:text-[16px] leading-[1.85]"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            ) : (
              <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[15px] leading-[1.85]">
                {article.description}
              </p>
            )}

            {/* Internal service link */}
            {article.relatedServiceRoute && (
              <div className="mt-10 pt-8 border-t border-[#e9ecef]">
                <Link
                  to={article.relatedServiceRoute}
                  className="inline-flex items-center gap-2 font-['Inter:Bold',sans-serif] font-bold text-[#ffd200] text-[14px] hover:underline"
                >
                  Ver servicio relacionado →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-[#f8f9fa] border-t border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-12 sm:py-16">
            <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[3px] bg-[#ffd200]" />
                <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[11px] uppercase tracking-wide">
                  Artículos relacionados
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          className="relative px-4 sm:px-8 md:px-[80px] py-16 sm:py-20 overflow-hidden"
          style={{
            backgroundImage: `url(${heroBgWebP})`,
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
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
