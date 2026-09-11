import { useState } from "react";
import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";

const WHATSAPP_URL = "https://wa.me/584141242017";
const PHONE_TEL = "tel:+584141242017";

function LogoMark() {
  return (
    <div className="relative shrink-0 size-[28px]">
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
    <header className="sticky top-0 z-50 h-[80px] w-full" data-name="navigation-bar">
      <div className="absolute inset-0 bg-[rgba(17,19,21,0.6)] pointer-events-none" />

      <div className="relative flex items-center justify-between h-full px-5 md:px-[80px]">
        {/* Logo */}
        <a href="#inicio" className="flex flex-col gap-[2px] items-start no-underline">
          <LogoMark />
          <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-normal text-[18px] text-white whitespace-nowrap">obrasciviles.com</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ffd100] text-[11px] whitespace-nowrap">Ing. Juan Carlos Mogollón</p>
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

        {/* Mobile CTA + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <a href={PHONE_TEL} className="flex items-center gap-2 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-3 py-2 text-white">
            <PhoneIcon size={16} />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[13px]">Llamar</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="text-white p-2"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#111315] border-t border-[#2c3035] flex flex-col z-40">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[15px] px-6 py-4 border-b border-[#2c3035] hover:text-white hover:bg-[#1e2124] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="p-4 flex gap-3">
            <a href="https://wa.me/584141242017" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-4 py-3 text-white font-['Inter:Bold',sans-serif] font-bold text-[14px]">
              WhatsApp
            </a>
            <a href={PHONE_TEL} className="flex-1 flex items-center justify-center gap-2 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-4 py-3 text-white font-['Inter:Bold',sans-serif] font-bold text-[14px]">
              Llamar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
