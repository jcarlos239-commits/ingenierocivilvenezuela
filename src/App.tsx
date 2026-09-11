import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import CoverageAndCta from "./components/CoverageAndCta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white flex flex-col items-start w-full min-h-full">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <Services />
        <Process />
        <CoverageAndCta />
      </main>
      <Footer />
    </div>
  );
}
