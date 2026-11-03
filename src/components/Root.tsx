import { Outlet, useLocation, useNavigate } from "react-router"
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useWhatsApp } from "./WhatsAppModal"
import { normalizePathname } from "../utils/prerender-meta"
import SiteStructuredData from "./SiteStructuredData"
import WhatsAppIcon from "./WhatsAppIcon"

function WhatsAppButton() {
  const { trigger, triggerProps, modal } = useWhatsApp()
  return (
    <>
      {modal}
      <button
        {...triggerProps}
        onClick={trigger}
        aria-label="Escríbenos por WhatsApp"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = "scale(1.1)"
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            "0 6px 20px rgba(0,0,0,0.45)"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 16px rgba(0,0,0,0.35)"
        }}
      >
        <WhatsAppIcon size={28} />
      </button>
    </>
  )
}

export default function Root() {
  const location = useLocation()
  const navigate = useNavigate()
  const normalizedPath = normalizePathname(location.pathname)

  useEffect(() => {
    if (
      normalizedPath !== "/cobertura" &&
      normalizedPath !== location.pathname
    ) {
      navigate(`${normalizedPath}${location.search}${location.hash}`, {
        replace: true,
      })
      return
    }

    window.scrollTo(0, 0)
  }, [
    location.hash,
    location.pathname,
    location.search,
    navigate,
    normalizedPath,
  ])

  return (
    <div className="bg-white flex flex-col items-start w-full min-h-full">
      <SiteStructuredData />
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
