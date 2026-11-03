import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn"
import heroDesktopWebP from "@/imports/ObrasCivilesLanding/hero-desktop.webp"
import heroMobileWebP from "@/imports/ObrasCivilesLanding/hero-mobile.webp"

const WHATSAPP_URL = "https://wa.me/584141242017"

function WhatsAppIcon() {
  return (
    <svg
      className="shrink-0"
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 2.333C7.557 2.333 2.333 7.557 2.333 14c0 2.02.527 3.916 1.449 5.557L2.333 25.667l6.287-1.423A11.594 11.594 0 0014 25.667c6.443 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333z"
        fill="white"
        fillOpacity="0.15"
      />
      <path
        d="M19.833 16.705c-.28-.14-1.654-.815-1.91-.909-.255-.093-.44-.14-.626.14-.186.28-.719.909-.882 1.095-.163.187-.326.21-.606.07-.28-.14-1.182-.436-2.25-1.389-.832-.742-1.393-1.657-1.557-1.937-.163-.28-.017-.431.123-.57.126-.125.28-.327.42-.49.14-.164.187-.28.28-.467.094-.186.047-.35-.023-.49-.07-.14-.627-1.51-.859-2.067-.226-.543-.456-.47-.626-.478l-.536-.01a1.03 1.03 0 00-.746.35c-.256.28-.977.955-.977 2.33 0 1.374 1 2.703 1.14 2.89.14.186 1.97 3.007 4.774 4.218.667.288 1.188.46 1.594.589.67.213 1.28.183 1.762.111.538-.08 1.655-.676 1.888-1.329.233-.653.233-1.213.163-1.329-.07-.117-.256-.187-.536-.327z"
        fill="white"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg
      className="shrink-0 size-[28px] sm:size-[24px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d={svgPaths.p332da700}
        stroke="#FFD200"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg
      className="shrink-0 size-[28px] sm:size-[24px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d={svgPaths.p22269700}
        stroke="#FFD200"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg
      className="shrink-0 size-[28px] sm:size-[24px]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d={svgPaths.p3d476500}
        stroke="#FFD200"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function TrustBadges() {
  return (
    <div className="relative z-[2] grid grid-cols-3 gap-2 sm:gap-6 w-full sm:max-w-[560px] sm:pt-2">
      <div className="flex flex-col items-center gap-2 text-center">
        <ShieldIcon />
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[11px] sm:text-[13px] text-white leading-snug">
          30+ años de Trayectoria
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <AwardIcon />
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[11px] sm:text-[13px] text-white leading-snug">
          Obras Garantizadas
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <MapPinIcon />
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[11px] sm:text-[13px] text-white leading-snug">
          Distrito Capital / Caracas, Miranda y La Guaira
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full -mt-[64px] sm:-mt-[80px] sm:min-h-[600px]"
    >
      <div className="flex flex-col sm:min-h-[600px] sm:items-center sm:px-8 md:px-[80px] sm:pt-[96px] sm:pb-12 sm:gap-8">
        {/* Dark top block on mobile; its children join the main desktop flex layout. */}
        <div className="relative z-[2] bg-[#111315] px-4 pt-[80px] pb-6 flex flex-col items-center gap-3 sm:contents">
          <div className="relative z-[2] border border-[#ffd200] rounded-[4px] px-4 py-[7px]">
            <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[9px] sm:text-[11px] text-center leading-snug tracking-wide whitespace-nowrap">
              INGENIERÍA CIVIL Y CONSTRUCCIÓN EN VENEZUELA
            </p>
          </div>
          <h1 className="relative z-[2] font-['Unbounded:Black',sans-serif] font-black leading-[1.1] text-[32px] text-center text-white sm:leading-[1.15] sm:text-[clamp(32px,5vw,56px)] sm:w-full">
            Obras Civiles en Venezuela
          </h1>
        </div>

        {/* The same image and introduction adapt to both responsive layouts. */}
        <div className="relative w-full min-h-[260px] sm:contents">
          <picture className="absolute inset-0 z-0">
            <source
              media="(max-width: 639px)"
              srcSet={heroMobileWebP}
              type="image/webp"
            />
            <img
              src={heroDesktopWebP}
              alt=""
              aria-hidden="true"
              width={1536}
              height={672}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1] bg-[rgba(17,19,21,0.30)]"
          />
          <div
            aria-hidden="true"
            className="absolute sm:hidden top-0 left-0 right-0 h-[50px] z-[1] bg-[linear-gradient(to_bottom,rgba(17,19,21,0.42)_0%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute sm:hidden bottom-0 left-0 right-0 h-[50px] z-[1] bg-[linear-gradient(to_top,rgba(17,19,21,0.42)_0%,transparent_100%)]"
          />
          <div className="relative z-[2] px-4 py-10 flex items-center justify-center sm:contents">
            <p className="relative z-[2] font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#ffd200] text-[15px] text-center sm:text-[clamp(15px,1.8vw,18px)] sm:w-full sm:max-w-[840px]">
              Construcción, remodelaciones y proyectos de ingeniería civil con
              el respaldo del Ingeniero Juan Carlos Mogollón (C.I.V.: 72.381),
              quien cuenta con conocimientos generales en patología de
              edificaciones, estabilización de taludes y gerencia de
              construcción con más de 30 años de trayectoria.
            </p>
          </div>
        </div>

        {/* Dark bottom block on mobile; its children join the main desktop flex layout. */}
        <div className="relative z-[2] bg-[#111315] px-4 pt-9 pb-5 flex flex-col gap-7 sm:contents">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[2] flex w-fit self-center items-center justify-center gap-3 bg-[#25d366] rounded-[8px] px-5 py-4 text-white hover:bg-[#1fb558] transition-colors min-h-[56px]"
          >
            <WhatsAppIcon />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">
              Escríbenos por WhatsApp
            </span>
          </a>
          <TrustBadges />
        </div>
      </div>
    </section>
  )
}
