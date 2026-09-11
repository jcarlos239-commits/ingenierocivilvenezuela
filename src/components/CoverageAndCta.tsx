import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";
import imgBg from "@/imports/ObrasCivilesLanding/9e6aae16d51c4afd461e3d1458cda9c12495b87b.png";

const WHATSAPP_URL = "https://wa.me/584141242017";
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
    <section id="cobertura" className="relative w-full overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgBg} />
        <div className="absolute bg-[rgba(20,20,20,0.6)] inset-0" />
      </div>

      <div className="relative flex flex-col items-center gap-[60px] px-5 md:px-[80px] py-[60px]">
        {/* Coverage area */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[12px] uppercase tracking-wide">DISPONIBILIDAD INMEDIATA</p>
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(24px,3.5vw,32px)] leading-[1.2] max-w-[700px]">
            Cobertura en Toda Venezuela
          </h2>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd100] text-[16px] leading-normal max-w-[800px]">
            Desplegamos nuestros equipos de inspección y cuadrillas de construcción rápidamente en las principales zonas de la capital:
          </p>
        </div>

        {/* CTA block */}
        <div className="flex flex-col gap-10 items-center text-center">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="font-['Unbounded:Black',sans-serif] font-black text-white text-[clamp(28px,4vw,40px)] leading-[1.2] max-w-[900px]">
              Solicita Tu Presupuesto
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd200] text-[18px] leading-[1.5] max-w-[720px]">
              No dejes tu proyecto en manos de improvisados. Consigue hoy mismo una cotización profesional y detallada para tu obra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <a
              href="https://wa.me/584141242017"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[10px] bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors"
            >
              <WhatsAppIcon />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Escríbenos por WhatsApp</span>
            </a>
            <a
              href={PHONE_TEL}
              className="flex items-center gap-[10px] bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-7 py-4 text-white hover:bg-[#1e2124] transition-colors"
            >
              <PhoneIcon />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Llámanos Ahora Mismo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
