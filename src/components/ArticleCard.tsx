import { Link } from "react-router"
import type { Article } from "@/data/articles"

interface Props {
  article: Article
  featured?: boolean
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function PlaceholderImage({ tall }: { tall?: boolean }) {
  return (
    <div
      className={`bg-[#1e2124] flex items-center justify-center ${
        tall ? "h-[280px] lg:h-full" : "h-[200px]"
      }`}
    >
      <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] uppercase tracking-wide opacity-30">
        Ingeniería Civil
      </span>
    </div>
  )
}

export function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link to={`/blog/${article.slug}`} className="group block no-underline">
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#e9ecef] bg-white rounded-[10px] overflow-hidden hover:border-[#ffd200] transition-colors">
        {article.featuredImage ? (
          <div className="overflow-hidden h-[280px] lg:h-auto">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              width={article.featuredImageWidth}
              height={article.featuredImageHeight}
              loading="lazy"
              decoding="async"
              data-blog-image="card"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        ) : (
          <PlaceholderImage tall />
        )}
        <div className="p-8 flex flex-col gap-4 justify-center">
          <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] uppercase tracking-wide">
            {article.category}
          </span>
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,2.5vw,26px)] leading-[1.2] group-hover:text-[#ffd200] transition-colors">
            {article.title}
          </h2>
          <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[15px] leading-[1.7]">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#e9ecef]">
            <span className="font-['Inter:Regular',sans-serif] text-[#adb5bd] text-[13px]">
              {formatDate(article.date)}
            </span>
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[#ffd200] text-[13px] group-hover:underline">
              Leer artículo →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ArticleCard({ article, featured = false }: Props) {
  if (featured) return <FeaturedArticleCard article={article} />

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block no-underline h-full"
    >
      <article className="border border-[#e9ecef] bg-white rounded-[10px] overflow-hidden hover:border-[#ffd200] transition-colors flex flex-col h-full">
        {article.featuredImage ? (
          <div className="overflow-hidden h-[200px] shrink-0">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              width={article.featuredImageWidth}
              height={article.featuredImageHeight}
              loading="lazy"
              decoding="async"
              data-blog-image="card"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        ) : (
          <PlaceholderImage />
        )}
        <div className="p-6 flex flex-col gap-3 flex-1">
          <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] uppercase tracking-wide">
            {article.category}
          </span>
          <h3 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[16px] sm:text-[18px] leading-[1.2] group-hover:text-[#ffd200] transition-colors">
            {article.title}
          </h3>
          <p className="font-['Inter:Regular',sans-serif] text-[#495057] text-[14px] leading-[1.7] flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-[#e9ecef]">
            <span className="font-['Inter:Regular',sans-serif] text-[#adb5bd] text-[12px]">
              {formatDate(article.date)}
            </span>
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[#ffd200] text-[12px] group-hover:underline">
              Leer artículo →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
