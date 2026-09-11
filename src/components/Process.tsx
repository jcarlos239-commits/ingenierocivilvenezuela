interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, title, description, isLast }: StepProps) {
  return (
    <>
      <div className="flex gap-8 items-start py-4 w-full">
        <div className="bg-[#ffd200] flex items-center justify-center rounded-full shrink-0 size-[56px]">
          <span className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[20px]">{number}</span>
        </div>
        <div className="flex flex-col gap-[6px] flex-1 min-w-0">
          <h3 className="font-['Unbounded:Bold',sans-serif] font-bold text-[#111315] text-[18px] leading-normal">{title}</h3>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[15px] leading-[1.5]">{description}</p>
        </div>
      </div>
      {!isLast && <div className="h-px w-full bg-[#e9ecef]" />}
    </>
  );
}

const steps = [
  {
    number: "1",
    title: "Consulta Inicial",
    description: "Conversamos sobre tu idea por llamada o WhatsApp, agendamos una visita técnica de inspección al sitio del proyecto.",
  },
  {
    number: "2",
    title: "Presupuesto",
    description: "Elaboramos un cómputo métrico detallado con desglose de materiales, mano de obra y cronograma estimado de ejecución de la obra.",
  },
  {
    number: "3",
    title: "Ejecución de la Obra",
    description: "Comenzamos los trabajos bajo supervisión de ingenieros colegiados residentes, asegurando el cumplimiento de normas de seguridad industrial.",
  },
  {
    number: "4",
    title: "Entrega y Garantía",
    description: "Inspeccionamos los acabados junto a ti y hacemos entrega formal de la obra civil respaldada por nuestra sólida garantía escrita.",
    isLast: true,
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-[#f8f9fa] w-full">
      <div className="flex flex-col lg:flex-row gap-[60px] lg:gap-[80px] items-start lg:items-center px-5 md:px-[80px] py-[60px]">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:w-[500px] shrink-0">
          <p className="font-['Unbounded:Bold',sans-serif] font-bold text-[#e0bc00] text-[12px] uppercase tracking-wide">NUESTRO MÉTODO</p>
          <h2 className="font-['Unbounded:ExtraBold',sans-serif] font-extrabold text-[#111315] text-[clamp(28px,4vw,36px)] leading-[1.2]">¿Cómo Trabajamos?</h2>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#6c757d] text-[16px] leading-[1.6]">
            Diseñamos un proceso ágil y transparente desde el primer contacto para que conozcas el estatus real de tu obra en cada fase.
          </p>
          <a
            href="https://wa.me/584141242017"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] bg-[#25d366] rounded-[8px] px-7 py-4 text-white hover:bg-[#1fb558] transition-colors self-start"
          >
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[16px]">Solicitar Presupuesto</span>
          </a>
        </div>

        {/* Steps */}
        <div className="flex flex-col flex-1 min-w-0 w-full">
          {steps.map((s) => (
            <Step key={s.number} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
