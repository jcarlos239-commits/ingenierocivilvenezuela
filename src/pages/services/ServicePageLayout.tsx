import { Link } from "react-router";
import { useEffect } from "react";

interface RelatedService {
  title: string;
  path: string;
  icon: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  iconSrc: string;
  whatWeOffer: string;
  items: ServiceItem[];
  relatedServices: RelatedService[];
}

export default function ServicePageLayout({
  title,
  metaTitle,
  metaDescription,
  intro,
  iconSrc,
  whatWeOffer,
  items,
  relatedServices,
}: ServicePageLayoutProps) {
  useEffect(() => {
    document.title = metaTitle;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = metaDescription;
    return () => {
      document.title = "Obras Civiles en Venezuela | Ing. Juan Carlos Mogollón";
    };
  }, [metaTitle, metaDescription]);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-3">
        <nav className="flex items-center gap-2 text-[12px] sm:text-[13px] font-['Inter:Regular',sans-serif]">
          <Link to="/" className="text-[#6c757d] hover:text-[#ffd200] transition-colors">Inicio</Link>
          <span className="text-[#adb5bd]">/</span>
          <Link to="/servicios" className="text-[#6c757d] hover:text-[#ffd200] transition-colors">Servicios</Link>
          <span className="text-[#adb5bd]">/</span>
          <span className="text-[#111315] font-['Inter:Semi Bold',sans-serif] font-semibold">{title}</span>
        </nav>
      </div>

      {/* Page hero */}
      <div className="bg-white px-4 sm:px-8 md:px-[80px] py-10 sm:py-16 border-b border-[#e9ecef]">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-5 flex-1">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-[3px] bg-[#ffd200]" />
              <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#ffd200] text-[10px] sm:text-[11px] uppercase tracking-wide">
                Nuestros Servicios
              </span>
            </div>
            <h1 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(24px,4vw,44px)] leading-[1.15]">
              {title}
            </h1>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#495057] text-[15px] sm:text-[17px] leading-[1.7] max-w-[620px]">
              {intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://wa.me/584141242017"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-6 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px]"
              >
                Solicitar información
              </a>
              <a
                href="tel:+584141242017"
                className="inline-flex items-center justify-center gap-2 bg-[#111315] border-2 border-[#ffd200] rounded-[8px] px-6 py-4 text-white hover:bg-[#1e2124] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px]"
              >
                Llámanos
              </a>
            </div>
          </div>
          <div className="shrink-0 flex items-center justify-center w-full lg:w-auto">
            <img
              src={iconSrc}
              alt={title}
              style={{ width: 220, height: 220, objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* What we offer */}
      <div className="bg-[#f8f9fa] px-4 sm:px-8 md:px-[80px] py-10 sm:py-16">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(20px,3vw,30px)] leading-[1.2]">
              ¿Qué ofrecemos?
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#495057] text-[14px] sm:text-[16px] leading-[1.7] max-w-[780px]">
              {whatWeOffer}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {items.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[12px] border border-[#e9ecef] p-5 sm:p-6 flex flex-col gap-2"
              >
                <div className="flex items-start gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#ffd200] shrink-0 mt-[8px]" />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[13px] sm:text-[14px] leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[13px] sm:text-[14px] leading-[1.5]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#111315] px-4 sm:px-8 md:px-[80px] py-10 sm:py-14">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-white text-[clamp(18px,3vw,26px)] leading-[1.2]">
              ¿Necesitas asesoría para tu proyecto?
            </h2>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#ced4da] text-[14px] sm:text-[15px] leading-[1.6]">
              Contáctanos y cuéntanos sobre tu proyecto. Estamos listos para ayudarte.
            </p>
          </div>
          <a
            href="https://wa.me/584141242017"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors font-['Inter:Bold',sans-serif] font-bold text-[15px] sm:text-[16px] w-full sm:w-auto"
          >
            Solicitar información
          </a>
        </div>
      </div>

      {/* Related services */}
      <div className="bg-white px-4 sm:px-8 md:px-[80px] py-10 sm:py-14">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-7">
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(18px,3vw,26px)] leading-[1.2]">
            Servicios relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="group flex items-center gap-4 bg-[#f8f9fa] rounded-[12px] border border-[#e9ecef] p-4 hover:border-[#ffd200] hover:shadow-sm transition-all"
              >
                <img src={s.icon} alt={s.title} style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0 }} />
                <span className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[12px] sm:text-[13px] leading-snug group-hover:text-[#111315]">
                  {s.title}
                </span>
                <span className="ml-auto text-[#ffd200] opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="bg-[#f8f9fa] border-t border-[#e9ecef] px-4 sm:px-8 md:px-[80px] py-5">
        <div className="max-w-[1100px] mx-auto">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 text-[#111315] hover:text-[#ffd200] transition-colors font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px]"
          >
            ← Volver a Servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
