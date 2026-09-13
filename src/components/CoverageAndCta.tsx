import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";
import imgBg from "@/imports/72286.jpg";

const PHONE_TEL = "tel:+584141242017";

function WhatsAppIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g clipPath="url(#clip-wa-cta)">
          <path d={svgPaths.p30a06080} stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip-wa-cta">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PhoneIcon() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip-phone-cta)">
          <path d={svgPaths.p2a029800} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip-phone-cta">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function CoverageAndCta() {
  return (
    /*
     * Background-image on the section itself so it always covers 100% of the
     * section height — including when content grows taller on mobile.
     * An absolutely-positioned <img> only fills the nearest positioned ancestor's
     * *current* height, which leaves a gray gap when the section grows.
     */
    <section
      id="cobertura"
      className="relative w-full"
      style={{
        backgroundImage: `url(${imgBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay — inset-0 always matches section height because the section is the positioned parent */}
      <div className="absolute inset-0 bg-[rgba(20,20,20,0.75)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-10 sm:gap-[60px] px-4 sm:px-8 md:px-[80px] py-10 sm:py-[60px]">
        {/* Coverage area */}
        <div className="flex flex-col gap-3 sm:gap-4 items-center text-center">
          <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[12px] uppercase tracking-wide">DISPONIBILIDAD INMEDIATA</p>
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(20px,3.5vw,32px)] leading-[1.2] w-full">
            Cobertura en Toda Venezuela
          </h2>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd100] text-[14px] sm:text-[16px] leading-[1.5] w-full">
            Desplegamos nuestros equipos de inspección y cuadrillas de construcción rápidamente en las principales zonas de la capital:
          </p>
        </div>

        {/* CTA block */}
        <div className="flex flex-col gap-6 sm:gap-10 items-center text-center w-full">
          <div className="flex flex-col gap-3 sm:gap-4 items-center">
            <h2 className="font-['Unbounded:Black',sans-serif] font-black text-white text-[clamp(24px,4vw,40px)] leading-[1.2] w-full">
              Solicita Tu Presupuesto
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd200] text-[15px] sm:text-[18px] leading-[1.5] w-full">
              No dejes tu proyecto en manos de improvisados. Consigue hoy mismo una cotización profesional y detallada para tu obra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center w-full sm:w-auto">
            <a
              href="https://wa.me/584141242017"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-[10px] bg-[#25d366] rounded-[8px] px-6 py-4 text-white hover:bg-[#1fb558] transition-colors min-h-[52px]"
            >
              <WhatsAppIcon />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]">Escríbenos por WhatsApp</span>
            </a>
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-[10px] bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-6 py-4 text-white hover:bg-[#1e2124] transition-colors min-h-[52px]"
            >
              <PhoneIcon />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px]">Llámanos Ahora Mismo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
