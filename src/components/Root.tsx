import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/584141242017"
      target="_blank"
      rel="noopener noreferrer"
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
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.35)";
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 2.333C7.557 2.333 2.333 7.557 2.333 14c0 2.02.527 3.916 1.449 5.557L2.333 25.667l6.287-1.423A11.594 11.594 0 0014 25.667c6.443 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333z"
          fill="white"
          fillOpacity="0.15"
        />
        <path
          d="M19.833 16.705c-.28-.14-1.654-.815-1.91-.909-.255-.093-.44-.14-.626.14-.186.28-.719.909-.882 1.095-.163.187-.326.21-.606.07-.28-.14-1.182-.436-2.25-1.389-.832-.742-1.393-1.657-1.557-1.937-.163-.28-.017-.431.123-.57.126-.125.28-.327.42-.49.14-.164.187-.28.28-.467.094-.186.047-.35-.023-.49-.07-.14-.627-1.51-.859-2.067-.226-.543-.456-.47-.626-.478l-.536-.01a1.03 1.03 0 00-.746.35c-.256.28-.977.955-.977 2.33 0 1.374 1 2.703 1.14 2.89.14.186 1.97 3.007 4.774 4.218.667.288 1.188.46 1.594.589.67.213 1.28.183 1.762.111.538-.08 1.655-.676 1.888-1.329.233-.653.233-1.213.163-1.329-.07-.117-.256-.187-.536-.327z"
          fill="white"
        />
      </svg>
    </a>
  );
}

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white flex flex-col items-start w-full min-h-full">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
