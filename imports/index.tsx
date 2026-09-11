import svgPaths from "./svg-1jh7odq5fn";
import imgNavigationBar from "./6441610d805bf023ff7bc582a38d3531b1c0d4ec.png";
import imgCtaWrapper from "./9e6aae16d51c4afd461e3d1458cda9c12495b87b.png";

function CircleX() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="circle-x">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="circle-x">
          <path d={svgPaths.p50a0200} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Frame">
      <CircleX />
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">obrasciviles.com</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#ffd100] text-[11px] whitespace-nowrap">Ing. Juan Carlos Mogollon</p>
    </div>
  );
}

function Phone() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="phone">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip0_0_23)" id="phone">
          <path d={svgPaths.p2a029800} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_23">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CallButton() {
  return (
    <div className="bg-[#111315] content-stretch flex gap-[10px] items-center px-[20px] py-[12px] relative rounded-[8px] shrink-0" data-name="call-button">
      <div aria-hidden className="absolute border-2 border-[#ffd200] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Phone />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Llámanos Ahora</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#ced4da] text-[14px] whitespace-nowrap">¿Listo para construir?</p>
      <CallButton />
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="navigation-bar">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[787.5%] left-0 max-w-none top-[-31.25%] w-full" src={imgNavigationBar} />
        </div>
        <div className="absolute bg-[rgba(17,19,21,0.6)] inset-0" />
      </div>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[80px] relative size-full">
          <Frame />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(255,210,0,0.13)] content-stretch flex items-start px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-[#ffd200] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffd200] text-[11px] whitespace-nowrap">INGENIERÍA CIVIL Y CONSTRUCCIÓN EN VENEZUELA</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Frame">
      <Frame3 />
      <p className="[word-break:break-word] font-['Unbounded:Black',sans-serif] font-black leading-[1.15] relative shrink-0 text-[56px] text-center text-white w-[1000px]">Obras Civiles en Venezuela</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.6] not-italic relative shrink-0 text-[#ced4da] text-[20px] text-center w-[840px]">Construcción, rehabilitación y proyectos de ingeniería civil con el respaldo del Ingeniero Juan Carlos Mogollón (C.I.V.: 72.381), especialista en patología estructural, estabilización de taludes y gerencia de construcción con más de 30 años de trayectoria.</p>
    </div>
  );
}

function CircleX1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="circle-x">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g clipPath="url(#clip0_0_30)" id="circle-x">
          <path d={svgPaths.p30a06080} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_30">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WhatsappButton() {
  return (
    <div className="bg-[#25d366] content-stretch flex gap-[10px] items-center px-[28px] py-[16px] relative rounded-[8px] shrink-0" data-name="whatsapp-button">
      <CircleX1 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Escríbenos por WhatsApp</p>
    </div>
  );
}

function Phone1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="phone">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip0_0_23)" id="phone">
          <path d={svgPaths.p2a029800} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_23">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CallButton1() {
  return (
    <div className="bg-[#111315] content-stretch flex gap-[10px] items-center px-[28px] py-[16px] relative rounded-[8px] shrink-0" data-name="call-button">
      <div aria-hidden className="absolute border-2 border-[#ffd200] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Phone1 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Llámanos Ahora</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Frame">
      <WhatsappButton />
      <CallButton1 />
    </div>
  );
}

function Shield() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="shield">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="shield">
          <path d={svgPaths.p332da700} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Frame">
      <Shield />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">30+ años de Trayectoria</p>
    </div>
  );
}

function Award() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="award">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="award">
          <path d={svgPaths.p22269700} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Frame">
      <Award />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Obras Garantizadas</p>
    </div>
  );
}

function MapPin() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="map-pin">
          <path d={svgPaths.p3d476500} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Frame">
      <MapPin />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Cobertura en Toda Venezuela</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[48px] items-center pt-[40px] relative shrink-0" data-name="Frame">
      <Frame6 />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="h-[500px] relative shrink-0 w-full" data-name="hero-section">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[126%] left-0 max-w-none top-[-21%] w-full" src={imgNavigationBar} />
        </div>
        <div className="absolute bg-[rgba(17,19,21,0.6)] inset-0" />
      </div>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center justify-center pb-[46px] pt-[14px] px-[80px] relative size-full">
          <Frame2 />
          <Frame4 />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="section-header">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1a1d20] text-[12px] uppercase whitespace-nowrap">Especialistas a tu disposición</p>
      <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[1.2] min-w-full relative shrink-0 text-[#111315] text-[36px] text-center w-[min-content]">Nuestros Servicios</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[16px] text-center w-[720px]">Soluciones integrales respaldadas por más de 30 años de experiencia en inspección, residencia de obras y gerencia de proyectos en el sector público y privado.</p>
    </div>
  );
}

function Building() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="building">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="building">
          <path d={svgPaths.p21a55c40} id="Vector" stroke="#111315" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[rgba(17,19,21,0.08)] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="icon-container">
      <Building />
    </div>
  );
}

function Frame11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[16px] w-full">Construcción de Obras Civiles</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[14px] w-full">Desarrollo de proyectos desde fundaciones hasta acabados. Edificaciones residenciales, comerciales e infraestructura pública con estricto cumplimiento de normativas COVENIN.</p>
    </div>
  );
}

function ServiceCard() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="service-card">
      <div aria-hidden className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <IconContainer />
        <Frame11 />
      </div>
    </div>
  );
}

function Wrench() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="wrench">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="wrench">
          <path d={svgPaths.p3ee14400} id="Vector" stroke="#111315" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="bg-[rgba(17,19,21,0.08)] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="icon-container">
      <Wrench />
    </div>
  );
}

function Frame12() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[16px] w-full">Remodelaciones</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[14px] w-full">Transformación de espacios residenciales y comerciales. Modernización de oficinas, locales y viviendas adaptados a tus requerimientos.</p>
    </div>
  );
}

function ServiceCard1() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="service-card">
      <div aria-hidden className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <IconContainer1 />
        <Frame12 />
      </div>
    </div>
  );
}

function Maximize() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="maximize">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="maximize">
          <path d={svgPaths.p2b2a380} id="Vector" stroke="#111315" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer2() {
  return (
    <div className="bg-[rgba(17,19,21,0.08)] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="icon-container">
      <Maximize />
    </div>
  );
}

function Frame13() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[16px] w-full">Ampliaciones</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[14px] w-full">Maximizamos tu espacio útil. Estructuras adicionales seguras con cálculos de ingeniería rigurosos y ejecución impecable.</p>
    </div>
  );
}

function ServiceCard2() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="service-card">
      <div aria-hidden className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <IconContainer2 />
        <Frame13 />
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Frame">
      <ServiceCard />
      <ServiceCard1 />
      <ServiceCard2 />
    </div>
  );
}

function DropletOff() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="droplet-off">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="droplet-off">
          <path d={svgPaths.p220e9980} id="Vector" stroke="#111315" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer3() {
  return (
    <div className="bg-[rgba(17,19,21,0.08)] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="icon-container">
      <DropletOff />
    </div>
  );
}

function Frame15() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[16px] w-full">Patología Estructural</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[14px] w-full">Diagnóstico y evaluación de patologías en edificaciones, determinando su origen, causas y mecanismos de deterioro. Diseño y ejecución de soluciones integrales para la reparación, rehabilitación y recuperación de elementos estructurales afectados por procesos de corrosión asociados a la acción de iones cloruro y carbonatación del concreto, incluyendo pantallas de concreto armado y vigas de carga</p>
    </div>
  );
}

function ServiceCard3() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="service-card">
      <div aria-hidden className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <IconContainer3 />
        <Frame15 />
      </div>
    </div>
  );
}

function Grid() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="grid">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="grid">
          <path d={svgPaths.pa5f0880} id="Vector" stroke="#111315" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer4() {
  return (
    <div className="bg-[rgba(17,19,21,0.08)] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="icon-container">
      <Grid />
    </div>
  );
}

function Frame16() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[16px] w-full">Estabilización de Taludes</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[14px] w-full">Diseño y desarrollo de soluciones de estabilización de terrenos mediante técnicas de terraceo y bermas. Diseño estructural de muros de contención tipo cantiléver, además de sistemas de mitigación de riesgos geológicos y muros de gravedad.</p>
    </div>
  );
}

function ServiceCard4() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="service-card">
      <div aria-hidden className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <IconContainer4 />
        <Frame16 />
      </div>
    </div>
  );
}

function FileSignature() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="file-signature">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="file-signature">
          <path d={svgPaths.p26218c80} id="Vector" stroke="#111315" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconContainer5() {
  return (
    <div className="bg-[rgba(17,19,21,0.08)] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="icon-container">
      <FileSignature />
    </div>
  );
}

function Frame17() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[16px] w-full">Proyectos</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[14px] w-full">Servicios integrales de ingeniería civil que incluyen cálculo y diseño estructural, proyectos de arquitectura, instalaciones sanitarias y eléctricas, estudios geotécnicos, elaboración de presupuestos mediante APU, gestión de permisologías municipales y coordinación con firmas de ingeniería avaladas por el CIV.</p>
    </div>
  );
}

function ServiceCard5() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_8px_rgba(0,0,0,0.02)] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="service-card">
      <div aria-hidden className="absolute border border-[#e9ecef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <IconContainer5 />
        <Frame17 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Frame">
      <ServiceCard3 />
      <ServiceCard4 />
      <ServiceCard5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame10 />
      <Frame14 />
    </div>
  );
}

function ServicesSection() {
  return (
    <div className="bg-[#f8f9fa] relative shrink-0 w-full" data-name="services-section">
      <div className="content-stretch flex flex-col gap-[60px] items-start pt-[48px] px-[80px] relative size-full">
        <SectionHeader />
        <Frame9 />
      </div>
    </div>
  );
}

function CircleX2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="circle-x">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g clipPath="url(#clip0_0_30)" id="circle-x">
          <path d={svgPaths.p30a06080} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_30">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WhatsappButton1() {
  return (
    <div className="bg-[#25d366] content-stretch flex gap-[10px] items-center px-[28px] py-[16px] relative rounded-[8px] shrink-0" data-name="whatsapp-button">
      <CircleX2 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Solicitar Presupuesto</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start pt-[16px] relative shrink-0" data-name="Frame">
      <WhatsappButton1 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[500px]" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#e0bc00] text-[12px] uppercase whitespace-nowrap">NUESTRO MÉTODO</p>
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[1.2] min-w-full relative shrink-0 text-[#111315] text-[36px] w-[min-content]">¿Cómo Trabajamos?</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.6] min-w-full not-italic relative shrink-0 text-[#6c757d] text-[16px] w-[min-content]">Diseñamos un proceso ágil y transparente desde el primer contacto para que conozcas el estatus real de tu obra en cada fase.</p>
      <Frame19 />
    </div>
  );
}

function StepNumber() {
  return (
    <div className="bg-[#ffd200] content-stretch flex items-center justify-center relative rounded-[28px] shrink-0 size-[56px]" data-name="step-number">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111315] text-[20px] whitespace-nowrap">1</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[18px] w-full">Consulta Inicial</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[15px] w-full">Conversamos sobre tu idea por llamada o WhatsApp, agendamos una visita técnica de inspección al sitio del proyecto.</p>
    </div>
  );
}

function StepRow() {
  return (
    <div className="content-stretch flex gap-[32px] items-start py-[16px] relative shrink-0 w-full" data-name="step-row">
      <StepNumber />
      <Frame21 />
    </div>
  );
}

function StepNumber1() {
  return (
    <div className="bg-[#ffd200] content-stretch flex items-center justify-center relative rounded-[28px] shrink-0 size-[56px]" data-name="step-number">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111315] text-[20px] whitespace-nowrap">2</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[18px] w-full">Presupuesto</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[15px] w-full">Elaboramos un cómputo métrico detallado con desglose de materiales, mano de obra y cronograma estimado de ejecución de la obra.</p>
    </div>
  );
}

function StepRow1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start py-[16px] relative shrink-0 w-full" data-name="step-row">
      <StepNumber1 />
      <Frame22 />
    </div>
  );
}

function StepNumber2() {
  return (
    <div className="bg-[#ffd200] content-stretch flex items-center justify-center relative rounded-[28px] shrink-0 size-[56px]" data-name="step-number">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111315] text-[20px] whitespace-nowrap">3</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[18px] w-full">Ejecución de la Obra</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[15px] w-full">Comenzamos los trabajos bajo supervisión de ingenieros colegiados residentes, asegurando el cumplimiento de normas de seguridad industrial.</p>
    </div>
  );
}

function StepRow2() {
  return (
    <div className="content-stretch flex gap-[32px] items-start py-[16px] relative shrink-0 w-full" data-name="step-row">
      <StepNumber2 />
      <Frame23 />
    </div>
  );
}

function StepNumber3() {
  return (
    <div className="bg-[#ffd200] content-stretch flex items-center justify-center relative rounded-[28px] shrink-0 size-[56px]" data-name="step-number">
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111315] text-[20px] whitespace-nowrap">4</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111315] text-[18px] w-full">Entrega y Garantía</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#6c757d] text-[15px] w-full">Inspeccionamos los acabados junto a ti y hacemos entrega formal de la obra civil respaldada por nuestra sólida garantía escrita.</p>
    </div>
  );
}

function StepRow3() {
  return (
    <div className="content-stretch flex gap-[32px] items-start py-[16px] relative shrink-0 w-full" data-name="step-row">
      <StepNumber3 />
      <Frame24 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative" data-name="Frame">
      <StepRow />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 700 1" width="700">
            <line id="Line" stroke="#E9ECEF" x2="700" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <StepRow1 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 700 1" width="700">
            <line id="Line" stroke="#E9ECEF" x2="700" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <StepRow2 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 700 1" width="700">
            <line id="Line" stroke="#E9ECEF" x2="700" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <StepRow3 />
    </div>
  );
}

function ProcessSection() {
  return (
    <div className="bg-[#f8f9fa] relative shrink-0 w-full" data-name="process-section">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[80px] items-center pb-[25px] pt-[13px] px-[80px] relative size-full">
          <Frame18 />
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center leading-[normal] relative shrink-0 w-full" data-name="Frame">
      <p className="font-['Unbounded:Bold',sans-serif] font-bold relative shrink-0 text-[#ffd200] text-[12px] uppercase whitespace-nowrap">DISPONIBILIDAD INMEDIATA</p>
      <p className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold min-w-full relative shrink-0 text-[32px] text-center text-white w-[min-content]">Cobertura en Toda Venezuela</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#ffd100] text-[16px] text-center w-[800px]">Desplegamos nuestros equipos de inspección y cuadrillas de construcción rápidamente en las principales zonas de la capital:</p>
    </div>
  );
}

function CoverageArea() {
  return (
    <div className="relative shrink-0 w-full" data-name="coverage-area">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[34px] pt-[20px] px-[80px] relative size-full">
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center w-full" data-name="Frame">
      <p className="font-['Unbounded:Black',sans-serif] font-black leading-[1.2] relative shrink-0 text-[40px] text-white w-[900px]">Solicita Tu Presupuesto</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#ffd200] text-[18px] w-[720px]">No dejes tu proyecto en manos de improvisados. Consigue hoy mismo una cotización profesional y detallada para tu obra.</p>
    </div>
  );
}

function CircleX3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="circle-x">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g clipPath="url(#clip0_0_30)" id="circle-x">
          <path d={svgPaths.p30a06080} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_30">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function WhatsappButton2() {
  return (
    <div className="bg-[#25d366] content-stretch flex gap-[10px] items-center px-[28px] py-[16px] relative rounded-[8px] shrink-0" data-name="whatsapp-button">
      <CircleX3 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Escríbenos por WhatsApp</p>
    </div>
  );
}

function Phone2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="phone">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip0_0_23)" id="phone">
          <path d={svgPaths.p2a029800} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_23">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CallButton2() {
  return (
    <div className="bg-[#111315] content-stretch flex gap-[10px] items-center px-[28px] py-[16px] relative rounded-[8px] shrink-0" data-name="call-button">
      <div aria-hidden className="absolute border-2 border-[#ffd200] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Phone2 />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Llámanos Ahora Mismo</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Frame">
      <WhatsappButton2 />
      <CallButton2 />
    </div>
  );
}

function FinalCtaSection() {
  return (
    <div className="relative shrink-0 w-full" data-name="final-cta-section">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center pb-[40px] pt-[37px] px-[80px] relative size-full">
          <Frame26 />
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function CtaWrapper() {
  return (
    <div className="content-stretch flex flex-col h-[574px] items-start overflow-clip pt-[24px] relative shrink-0 w-[1440px]" data-name="cta-wrapper">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgCtaWrapper} />
        <div className="absolute bg-[rgba(20,20,20,0.6)] inset-0" />
      </div>
      <CoverageArea />
      <FinalCtaSection />
    </div>
  );
}

function CircleX4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="circle-x">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="circle-x">
          <path d={svgPaths.p1a5d0500} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <CircleX4 />
      <p className="[word-break:break-word] font-['Unbounded:ExtraBold',sans-serif] font-extrabold leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <span className="leading-[normal]">OBRAS</span>
        <span className="leading-[normal] text-[#ffd200]">CIVILES</span>
        <span className="leading-[normal]">.com</span>
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[110px] items-start relative shrink-0 w-[400px]" data-name="Frame">
      <Frame30 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.6] min-w-full not-italic relative shrink-0 text-[#ced4da] text-[14px] w-[min-content]">Somos una empresa de ingeniería civil y construcción comprometida con el desarrollo de infraestructura duradera y segura en Venezuela.</p>
    </div>
  );
}

function Phone3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="phone">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_17)" id="phone">
          <path d={svgPaths.p29098400} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_17">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Frame">
      <Phone3 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">+58 414 1242017</p>
    </div>
  );
}

function Mail() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="mail">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="mail">
          <path d={svgPaths.p10d0c00} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Frame">
      <Mail />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">jcarlosmogollon@hotmail.com</p>
    </div>
  );
}

function MapPin1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="map-pin">
          <path d={svgPaths.p8b99100} id="Vector" stroke="#FFD200" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <MapPin1 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-w-px not-italic relative text-[14px] text-white">Av. Francisco de Miranda, Torre Delta, Piso 8, Ofic. 8A, El Rosal, Chacao, Caracas.</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame33 />
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[300px]" data-name="Frame">
      <p className="[word-break:break-word] font-['Unbounded:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#ffd200] text-[12px] w-full">CONTÁCTANOS</p>
      <Frame32 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[202px] h-[167px] items-start justify-center relative shrink-0 w-full" data-name="Frame">
      <Frame29 />
      <Frame31 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[normal] not-italic relative shrink-0 text-[#6c757d] text-[12px] w-full whitespace-nowrap" data-name="Frame">
      <p className="relative shrink-0">© 2026 Obras Civiles Venezuela. Todos los derechos reservados. RIF J-30000000-0</p>
      <p className="relative shrink-0">Diseñado y desarrollado bajo normativas de ingeniería de Venezuela.</p>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#111315] h-[258px] relative shrink-0 w-full" data-name="footer">
      <div aria-hidden className="absolute border-[#2c3035] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[80px] relative size-full">
        <Frame28 />
        <div className="h-0 relative shrink-0 w-full" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1280 1" width="1280">
              <line id="Line" stroke="#2C3035" x2="1280" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Frame36 />
      </div>
    </div>
  );
}

export default function ObrasCivilesLanding() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="obras-civiles-landing">
      <NavigationBar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <CtaWrapper />
      <Footer />
    </div>
  );
}