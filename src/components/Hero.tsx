import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";
import heroBg from "@/imports/ObrasCivilesLanding/6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";

const PHONE_TEL = "tel:+584141242017";

function WhatsAppIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g clipPath="url(#clip-wa-hero)">
          <path d={svgPaths.p30a06080} stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip-wa-hero">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PhoneIcon({ stroke = "#FFD200" }: { stroke?: string }) {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip-phone-hero)">
          <path d={svgPaths.p2a029800} stroke={stroke} strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip-phone-hero">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg className="shrink-0 size-[28px]" fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.p332da700} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg className="shrink-0 size-[28px]" fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.p22269700} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="shrink-0 size-[28px]" fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.p3d476500} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <div className="flex flex-col items-center gap-2 text-center">
        <ShieldIcon />
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[11px] text-white leading-snug">30+ años de Trayectoria</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <AwardIcon />
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[11px] text-white leading-snug">Obras Garantizadas</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <MapPinIcon />
        <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[11px] text-white leading-snug">Cobertura en Toda Venezuela</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="w-full -mt-[64px] sm:-mt-[80px]">

      {/* ── MOBILE layout (hidden on sm+) ── */}
      <div className="sm:hidden flex flex-col">

        {/* Dark top block: badge + h1 */}
        <div className="bg-[#111315] px-4 pt-[80px] pb-0 flex flex-col gap-3">
          <div className="border border-[#ffd200] rounded-[4px] px-4 py-[7px] w-full">
            <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[9px] text-center leading-snug tracking-wide">
              INGENIERÍA CIVIL Y CONSTRUCCIÓN EN VENEZUELA
            </p>
          </div>
          <h1 className="font-['Unbounded:Black',sans-serif] font-black leading-[1.1] text-[32px] text-white w-full text-center">
            Obras Civiles en Venezuela
          </h1>
        </div>

        {/* Image block */}
        <div className="relative w-full" style={{ minHeight: "260px" }}>
          <img
            src={heroBg} alt="" aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
          {/* Top fade — 77% */}
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to bottom, rgba(17,19,21,1) 0%, rgba(17,19,21,0.75) 35%, rgba(17,19,21,0.3) 65%, transparent 100%)", zIndex: 1 }} />
          {/* Bottom fade — 77% */}
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, rgba(17,19,21,1) 0%, rgba(17,19,21,0.75) 35%, rgba(17,19,21,0.3) 65%, transparent 100%)", zIndex: 1 }} />
        </div>

        {/* Dark bottom block: trust badges + call button */}
        <div className="bg-[#111315] px-4 pt-5 pb-5 flex flex-col gap-4">
          <TrustBadges />
          <a
            href={PHONE_TEL}
            className="flex items-center justify-center gap-3 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-5 py-4 text-white hover:bg-[#1e2124] transition-colors min-h-[56px] w-full"
          >
            <PhoneIcon />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Llámanos Ahora</span>
          </a>
        </div>
      </div>

      {/* ── DESKTOP layout (hidden below sm) ── */}
      <div className="hidden sm:block" style={{ position: "relative" }}>
        <img
          src={heroBg} alt="" aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", zIndex: 0 }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundColor: "rgba(17,19,21,0.50)", zIndex: 1 }} />
        <div
          className="relative flex flex-col items-center min-h-[600px] px-8 md:px-[80px] pt-[96px] pb-12 gap-8"
          style={{ zIndex: 2 }}
        >
          <div className="border border-[#ffd200] rounded-[4px] px-4 py-[7px]">
            <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[11px] text-center leading-snug tracking-wide whitespace-nowrap">
              INGENIERÍA CIVIL Y CONSTRUCCIÓN EN VENEZUELA
            </p>
          </div>
          <h1 className="font-['Unbounded:Black',sans-serif] font-black leading-[1.15] text-[clamp(32px,5vw,56px)] text-center text-white w-full">
            Obras Civiles en Venezuela
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#ffd200] text-[clamp(15px,1.8vw,18px)] text-center w-full max-w-[840px]">
            Construcción, rehabilitación y proyectos de ingeniería civil con el respaldo del Ingeniero Juan Carlos Mogollón (C.I.V.: 72.381), quien cuenta con conocimientos generales en patología de edificaciones, estabilización de taludes y gerencia de construcción con más de 30 años de trayectoria.
          </p>
          <a
            href={PHONE_TEL}
            className="flex items-center justify-center gap-3 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-5 py-4 text-white hover:bg-[#1e2124] transition-colors min-h-[56px] w-full max-w-[560px]"
          >
            <PhoneIcon />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Llámanos Ahora</span>
          </a>
          <div className="grid grid-cols-3 gap-6 w-full max-w-[560px] pt-2">
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="shrink-0 size-[24px]" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p332da700} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" /></svg>
              <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[13px] text-white leading-snug">30+ años de Trayectoria</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="shrink-0 size-[24px]" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p22269700} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" /></svg>
              <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[13px] text-white leading-snug">Obras Garantizadas</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <svg className="shrink-0 size-[24px]" fill="none" viewBox="0 0 24 24"><path d={svgPaths.p3d476500} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" /></svg>
              <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[13px] text-white leading-snug">Cobertura en Toda Venezuela</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
