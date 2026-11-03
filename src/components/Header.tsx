import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import svgPaths from "@/imports/ObrasCivilesLanding/svg-1jh7odq5fn";
import { useWhatsApp } from "./WhatsAppModal";

const PHONE_TEL = "tel:+584141242017";

const serviceLinks = [
  { label: "Proyectos", to: "/servicios/proyectos" },
  { label: "Construcción de Obras Civiles", to: "/servicios/construccion-obras-civiles" },
  { label: "Remodelaciones y Ampliaciones", to: "/servicios/remodelaciones-ampliaciones" },
  { label: "Avalúos Técnicos y Peritajes Judiciales", to: "/servicios/avaluos-peritajes-tecnicos" },
  { label: "Patología Estructural", to: "/servicios/patologia-estructural" },
  { label: "Estabilización de Taludes", to: "/servicios/estabilizacion-taludes" },
];

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

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[14px] hover:text-white transition-colors"
      >
        Servicios
        <svg
          width="12" height="12" fill="none" viewBox="0 0 12 12"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+12px)] left-0 bg-[#111315] border border-[#2c3035] rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-w-[260px] overflow-hidden z-50">
          <Link
            to="/servicios"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 border-b border-[#2c3035] font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[11px] uppercase tracking-wide hover:bg-[#1e2124] transition-colors"
          >
            Ver todos los servicios →
          </Link>
          {serviceLinks.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[13px] hover:text-white hover:bg-[#1e2124] transition-colors border-b border-[#1e2124] last:border-0"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-[#ffd200] shrink-0" />
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const { trigger, triggerProps, modal } = useWhatsApp();

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const toggleMobileMenu = () => {
    if (menuOpen) {
      closeMobileMenu();
    } else {
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    firstMobileLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileMenu, menuOpen]);

  const otherLinks: { label: string; href?: string; to?: string }[] = [
    { label: "Cómo Trabajamos", to: "/como-trabajamos" },
    { label: "Sobre Mí", to: "/sobre-mi" },
    { label: "Blog", to: "/blog" },
  ];

  return (
    <>
      {modal}
    <header className="sticky top-0 z-50 h-[64px] sm:h-[80px] w-full" data-name="navigation-bar">
      <div className="absolute inset-0 bg-[rgba(17,19,21,0.6)] pointer-events-none" />

      <div className="relative flex items-center justify-between h-full px-4 sm:px-5 md:px-[80px]">
        {/* Logo */}
        <Link to="/" className="flex flex-col gap-[2px] items-start no-underline min-w-0 shrink">
          <LogoMark />
          <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-normal text-[10px] sm:text-[18px] text-white whitespace-nowrap">Ing. Juan Carlos Mogollón</p>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-3">
          <Link to="/" className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[14px] hover:text-white transition-colors">
            Inicio
          </Link>
          <ServicesDropdown />
          {otherLinks.map((l) =>
            l.to ? (
              <Link key={l.to} to={l.to} className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[14px] hover:text-white transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[14px] hover:text-white transition-colors">
                {l.label}
              </a>
            )
          )}
          <a
            href={PHONE_TEL}
            className="flex items-center gap-[10px] bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-5 py-3 text-white hover:bg-[#1e2124] transition-colors"
          >
            <PhoneIcon />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px]">Llámanos Ahora</span>
          </a>
        </nav>

        {/* Mobile: icon-only call + hamburger */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <a
            href={PHONE_TEL}
            aria-label="Llamar"
            className="flex items-center justify-center bg-[#111315] border-2 border-[#ffd200] rounded-[8px] size-[40px] text-white hover:bg-[#1e2124] transition-colors"
          >
            <PhoneIcon size={18} />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMobileMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
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

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación principal"
          className="absolute top-full left-0 w-full bg-[#111315] border-t border-[#2c3035] flex flex-col z-40"
        >
          {/* Inicio */}
          <Link
            ref={firstMobileLinkRef}
            to="/"
            onClick={closeMobileMenu}
            className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[15px] px-5 py-4 border-b border-[#2c3035] hover:text-white hover:bg-[#1e2124] transition-colors min-h-[52px] flex items-center"
          >
            Inicio
          </Link>
          {/* Services accordion */}
          <button
            type="button"
            onClick={() => setServicesOpen((v) => !v)}
            aria-expanded={servicesOpen}
            aria-controls="mobile-services-submenu"
            className="flex items-center justify-between font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[15px] px-5 py-4 border-b border-[#2c3035] hover:text-white hover:bg-[#1e2124] transition-colors min-h-[52px]"
          >
            Servicios
            <svg
              width="14" height="14" fill="none" viewBox="0 0 12 12"
              style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {servicesOpen && (
            <div id="mobile-services-submenu" className="bg-[#0d0f11] flex flex-col border-b border-[#2c3035]">
              <Link
                to="/servicios"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-7 py-3 font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] uppercase tracking-wide hover:bg-[#1e2124] transition-colors"
              >
                Ver todos →
              </Link>
              {serviceLinks.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-7 py-3 font-['Inter:Regular',sans-serif] text-[#ced4da] text-[14px] hover:text-white hover:bg-[#1e2124] transition-colors border-t border-[#1e2124]"
                >
                  <span className="w-[4px] h-[4px] rounded-full bg-[#ffd200] shrink-0" />
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          {/* Other links */}
          {otherLinks.map((l) =>
            l.to ? (
              <Link
                key={l.to}
                to={l.to}
                onClick={closeMobileMenu}
                className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[15px] px-5 py-4 border-b border-[#2c3035] hover:text-white hover:bg-[#1e2124] transition-colors min-h-[52px] flex items-center"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMobileMenu}
                className="font-['Inter:Semi Bold',sans-serif] font-semibold text-[#ced4da] text-[15px] px-5 py-4 border-b border-[#2c3035] hover:text-white hover:bg-[#1e2124] transition-colors min-h-[52px] flex items-center"
              >
                {l.label}
              </a>
            )
          )}

          <div className="p-4 flex flex-col gap-3">
            <button
              {...triggerProps}
              onClick={trigger}
              className="flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-4 py-4 text-white font-['Inter:Bold',sans-serif] font-bold text-[15px] min-h-[52px] border-none cursor-pointer w-full"
            >
              Escríbenos por WhatsApp
            </button>
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-2 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-4 py-4 text-white font-['Inter:Bold',sans-serif] font-bold text-[15px] min-h-[52px]"
            >
              Llámanos Ahora
            </a>
          </div>
        </nav>
      )}
    </header>
    </>
  );
}
