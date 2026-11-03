import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
  imageAlt?: string;
  meta?: ReactNode;
}

/**
 * Shared internal-page hero.
 * The outer container has a fixed height at desktop so content volume
 * (title length, description lines, meta) never affects the hero rectangle.
 * Text is absolutely positioned inside the fixed container.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  mobileImage,
  imageAlt = "",
  meta,
}: PageHeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "413px",
        minHeight: "413px",
        maxHeight: "413px",
        boxSizing: "border-box",
      }}
    >
      {/* Background image — fills the fixed container */}
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={mobileImage}
          type="image/webp"
        />
        <img
          src={image}
          alt={imageAlt}
          width={1536}
          height={672}
          fetchPriority="high"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            zIndex: 0,
          }}
        />
      </picture>

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(17,19,21,0.30)",
          zIndex: 1,
        }}
      />

      {/* Content — absolutely positioned so it never stretches the container */}
      <div
        className="absolute inset-0 px-4 sm:px-8 md:px-[80px] py-16 sm:py-24 flex flex-col justify-start"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-[780px] flex flex-col gap-5">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[3px] bg-[#ffd200]" />
            <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[11px] uppercase tracking-wide">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(28px,5vw,52px)] leading-[1.1]">
            {title}
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd200] text-[15px] sm:text-[18px] leading-[1.7] max-w-[620px]">
            {description}
          </p>
          {meta}
        </div>
      </div>
    </div>
  );
}
