import { useEffect } from "react"
import { Link } from "react-router"
import { applyNotFoundSeo, resetPageSeo } from "@/utils/seo"

export default function NotFound() {
  useEffect(() => {
    applyNotFoundSeo()
    return () => resetPageSeo()
  }, [])

  return (
    <section className="relative flex min-h-[560px] w-full items-center overflow-hidden bg-[#111315] px-4 py-20 sm:px-8 sm:py-28 md:px-[80px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full border border-[#ffd200]/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 h-[520px] w-[520px] rounded-full border border-white/10"
      />

      <div className="relative mx-auto flex w-full max-w-[820px] flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-8 bg-[#ffd200]" />
          <span className="font-['Unbounded:Bold',sans-serif] text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffd200]">
            Error 404
          </span>
          <span className="h-[3px] w-8 bg-[#ffd200]" />
        </div>

        <h1 className="font-['Unbounded:ExtraBold',sans-serif] text-[clamp(30px,6vw,58px)] font-extrabold leading-[1.12] text-white">
          Página no encontrada
        </h1>

        <p className="max-w-[680px] font-['Inter:Regular',sans-serif] text-[15px] leading-[1.75] text-[#ced4da] sm:text-[18px]">
          Lo sentimos, la página que busca no existe o ha sido movida. Puede
          regresar al inicio o consultar nuestros servicios de ingeniería civil.
        </p>

        <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-[54px] items-center justify-center rounded-[8px] bg-[#ffd200] px-7 py-4 font-['Inter:Bold',sans-serif] text-[15px] font-bold text-[#111315] transition-colors hover:bg-[#e6bd00]"
          >
            Volver al inicio
          </Link>
          <Link
            to="/servicios"
            className="inline-flex min-h-[54px] items-center justify-center rounded-[8px] border-2 border-[#ffd200] bg-transparent px-7 py-4 font-['Inter:Bold',sans-serif] text-[15px] font-bold text-white transition-colors hover:bg-[#1e2124]"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
