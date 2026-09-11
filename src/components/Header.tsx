import { useState } from "react";
import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";

const WHATSAPP_URL = "https://wa.me/584141242017";
const PHONE_TEL = "tel:+584141242017";

function LogoMark() {
  return (
    <div className="relative shrink-0 size-[24px] sm:size-[28px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g>
          <path d={svgPaths.p50a0200} stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PhoneIcon({ stroke = "#FFD200", size = 18 }: { stroke?: string; size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg className="absolute block inset-0 size-full" fill="none" height={size} preserveAspectRatio="none" viewBox="0 0 18 18" width={size}>
        <g clipPath="url(#clip-phone-header)">
          <path d={svgPaths.p2a029800} stroke={stroke} strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip-phone-header">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Cómo Trabajamos", href: "#proceso" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 h-[64px] sm:h-[80px] w-full" data-name="navigation-bar">
      <div className="absolute inset-0 bg-[rgba(17,19,21,0.6)] pointer-events-none" />

      <div className="relative flex items-center justify-between h-full px-4 sm:px-5 md:px-[80px]">
        {/* Logo — shrinks on mobile to avoid crowding the right side */}
        <a href="#inicio" className="flex flex-col gap-[2px] items-start no-underline min-w-0 shrink">
          <LogoMark />
          <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-normal text-[13px] sm:text-[18px] text-white whitespace-nowrap">obrasciviles.com</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd100] text-[9px] sm:text-[11px] whitespace-nowrap">Ing. Juan Carlos Mogollón</p>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[14px] hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href={PHONE_TEL}
            className="flex items-center gap-[10px] bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-5 py-3 text-white hover:bg-[#1e2124] transition-colors"
          >
            <PhoneIcon />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px]">Llámanos Ahora</span>
          </a>
        </nav>

        {/* Mobile: icon-only call + hamburger — no text label to save space */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <a
            href={PHONE_TEL}
            aria-label="Llamar"
            className="flex items-center justify-center bg-[#111315] border-2 border-[#ffd200] rounded-[8px] size-[40px] text-white hover:bg-[#1e2124] transition-colors"
          >
            <PhoneIcon size={18} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="flex items-center justify-center text-white size-[40px]"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#111315] border-t border-[#2c3035] flex flex-col z-40">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[15px] px-5 py-4 border-b border-[#2c3035] hover:text-white hover:bg-[#1e2124] transition-colors min-h-[52px] flex items-center"
            >
              {l.label}
            </a>
          ))}
          <div className="p-4 flex flex-col gap-3">
            <a
              href="https://wa.me/584141242017"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-4 py-4 text-white font-['Inter:Bold',sans-serif] font-bold text-[15px] min-h-[52px]"
            >
              Escríbenos por WhatsApp
            </a>
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-2 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-4 py-4 text-white font-['Inter:Bold',sans-serif] font-bold text-[15px] min-h-[52px]"
            >
              Llámanos Ahora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
