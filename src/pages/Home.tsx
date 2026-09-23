import { useEffect } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CoverageAndCta from "@/components/CoverageAndCta";
import { applyPageSeo, resetPageSeo } from "@/utils/seo";
import { getRouteMeta } from "@/utils/prerender-meta";

export default function Home() {
  useEffect(() => {
    const m = getRouteMeta("/");
    applyPageSeo({ title: m.title, description: m.description, path: "/" });
    return () => resetPageSeo();
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <CoverageAndCta />
    </>
  );
}
