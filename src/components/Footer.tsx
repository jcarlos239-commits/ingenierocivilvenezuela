import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";

const PHONE_NUMBER = "+58 414 1242017";
const PHONE_TEL = "tel:+584141242017";
const EMAIL = "jcarlosmogollon@hotmail.com";
const EMAIL_LINK = `mailto:${EMAIL}`;

function LogoMarkSmall() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <path d={svgPaths.p1a5d0500} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function PhoneIconSmall() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip-phone-footer)">
          <path d={svgPaths.p29098400} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip-phone-footer">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MailIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <path d={svgPaths.p10d0c00} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function MapPinSmall() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <path d={svgPaths.p8b99100} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#111315] w-full border-t border-[#2c3035]">
      <div className="flex flex-col gap-8 px-5 md:px-[80px] py-[60px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-[202px] justify-center">
          {/* Brand column */}
          <div className="flex flex-col gap-5 max-w-[400px]">
            <div className="flex items-center gap-2">
              <LogoMarkSmall />
              <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[16px] text-white leading-[0]">
                <span className="leading-normal">OBRAS</span>
                <span className="leading-normal text-[#ffd200]">CIVILES</span>
                <span className="leading-normal">.com</span>
              </p>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[14px] leading-[1.6]">
              Somos una empresa de ingeniería civil y construcción comprometida con el desarrollo de infraestructura duradera y segura en Venezuela.
            </p>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[12px] uppercase tracking-wide">CONTÁCTANOS</p>
            <div className="flex flex-col gap-3">
              <a href={PHONE_TEL} className="flex items-center gap-[10px] hover:opacity-80 transition-opacity">
                <PhoneIconSmall />
                <span className="font-['Inter:Regular',sans-serif] font-normal text-white text-[14px]">{PHONE_NUMBER}</span>
              </a>
              <a href={EMAIL_LINK} className="flex items-center gap-[10px] hover:opacity-80 transition-opacity">
                <MailIcon />
                <span className="font-['Inter:Regular',sans-serif] font-normal text-white text-[14px]">{EMAIL}</span>
              </a>
              <div className="flex items-start gap-[10px]">
                <MapPinSmall />
                <p className="font-['Inter:Regular',sans-serif] font-normal text-white text-[14px] leading-[1.4] max-w-[260px]">
                  Av. Francisco de Miranda, Torre Delta, Piso 8, Ofic. 8A, El Rosal, Chacao, Caracas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[#2c3035]" />

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-[#6c757d] text-[12px] font-['Inter:Regular',sans-serif] font-normal">
          <p>© 2026 Obras Civiles Venezuela. Todos los derechos reservados. RIF J-30000000-0</p>
          <p>Diseñado y desarrollado bajo normativas de ingeniería de Venezuela.</p>
        </div>
      </div>
    </footer>
  );
}
