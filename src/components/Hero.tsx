import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";
import heroBg from "@/imports/VID_20260806_144734.mp4";

const WHATSAPP_URL = "https://wa.me/584141242017";
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

function PhoneIcon() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip-phone-hero)">
          <path d={svgPaths.p2a029800} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
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
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <path d={svgPaths.p332da700} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function AwardIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <path d={svgPaths.p22269700} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function MapPinIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <path d={svgPaths.p3d476500} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full min-h-[500px] -mt-[80px]" data-name="hero-section">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={heroBg}
        />
        <div className="absolute bg-[rgba(17,19,21,0.6)] inset-0" />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[500px] px-5 md:px-[80px] pt-[96px] pb-16 gap-10">
        {/* Badge */}
        <div className="flex flex-col items-center gap-4 w-full max-w-[1000px]">
          <div className="bg-[rgba(255,210,0,0.13)] border border-[#ffd200] rounded-[4px] px-4 py-[6px]">
            <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[11px] whitespace-nowrap">INGENIERÍA CIVIL Y CONSTRUCCIÓN EN VENEZUELA</p>
          </div>

          <h1 className="font-['Unbounded:Black',sans-serif] font-black leading-[1.15] text-[clamp(32px,5vw,56px)] text-center text-white w-full">
            Obras Civiles en Venezuela
          </h1>

          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#ced4da] text-[clamp(16px,2vw,20px)] text-center max-w-[840px]">
            Construcción, rehabilitación y proyectos de ingeniería civil con el respaldo del Ingeniero Juan Carlos Mogollón (C.I.V.: 72.381), especialista en patología estructural, estabilización de taludes y gerencia de construcción con más de 30 años de trayectoria.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
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
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Llámanos Ahora</span>
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center pt-2">
          <div className="flex items-center gap-3">
            <ShieldIcon />
            <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px] text-white">30+ años de Trayectoria</span>
          </div>
          <div className="flex items-center gap-3">
            <AwardIcon />
            <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px] text-white">Obras Garantizadas</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon />
            <span className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px] text-white">Cobertura en Toda Venezuela</span>
          </div>
        </div>
      </div>
    </section>
  );
}
