import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";

const PHONE_TEL = "tel:+584141242017";
const EMAIL = "juancarlosmogollon13@gmail.com";
const EMAIL_LINK = `mailto:${EMAIL}`;
const INSTAGRAM = "https://www.instagram.com/Juan_carlos_mogollon_c";

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
      <div className="flex flex-col gap-8 px-4 sm:px-8 md:px-[80px] py-10 sm:py-[60px]">
        {/* Two-column on md+, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-[202px] md:justify-center">
          {/* Brand column */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full md:max-w-[400px]">
            <div className="flex items-center gap-2">
              <LogoMarkSmall />
              <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[15px] sm:text-[16px] text-white leading-normal">
                Ing. Juan Carlos Mogollón
              </p>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[13px] sm:text-[14px] leading-[1.6]">
              Somos un grupo de ingenieros civiles dedicados al desarrollo de proyectos de ingeniería y construcción, comprometidos con ofrecer soluciones seguras, funcionales y duraderas para Venezuela.
            </p>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[12px] uppercase tracking-wide">CONTÁCTANOS</p>
            <div className="flex flex-col gap-3">
              <a href={PHONE_TEL} className="flex items-center gap-[10px] hover:opacity-80 transition-opacity min-h-[44px] sm:min-h-0">
                <PhoneIconSmall />
                <span className="font-['Inter:Regular',sans-serif] font-normal text-white text-[13px] sm:text-[14px]">+58 414 1242017</span>
              </a>
              <a href={EMAIL_LINK} className="flex items-center gap-[10px] hover:opacity-80 transition-opacity min-h-[44px] sm:min-h-0">
                <MailIcon />
                <span className="font-['Inter:Regular',sans-serif] font-normal text-white text-[13px] sm:text-[14px] break-all">{EMAIL}</span>
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[10px] hover:opacity-80 transition-opacity min-h-[44px] sm:min-h-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 16 16">
                    <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="#FFD200" strokeWidth="1.5"/>
                    <circle cx="8" cy="8" r="2.8" stroke="#FFD200" strokeWidth="1.5"/>
                    <circle cx="11.2" cy="4.8" r="0.8" fill="#FFD200"/>
                  </svg>
                </div>
                <span className="font-['Inter:Regular',sans-serif] font-normal text-white text-[13px] sm:text-[14px]">@Juan_carlos_mogollon_c</span>
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[#2c3035]" />

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-[#6c757d] text-[11px] sm:text-[12px] font-['Inter:Regular',sans-serif] font-normal">
          <p>Diseñado y desarrollado bajo normativas de ingeniería de Venezuela.</p>
        </div>
      </div>
    </footer>
  );
}
