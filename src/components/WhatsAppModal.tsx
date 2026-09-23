import { useState, useEffect, useCallback } from "react";

const WA_URL = "https://wa.me/584141242017";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function Modal({ onConfirm, onCancel }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className="relative bg-[#111315] border border-[#2c3035] rounded-[16px] p-8 max-w-[400px] w-full flex flex-col gap-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#25d366]/15 shrink-0 mx-auto">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2.333C7.557 2.333 2.333 7.557 2.333 14c0 2.02.527 3.916 1.449 5.557L2.333 25.667l6.287-1.423A11.594 11.594 0 0014 25.667c6.443 0 11.667-5.224 11.667-11.667S20.443 2.333 14 2.333z"
              fill="#25d366"
              fillOpacity="0.25"
            />
            <path
              d="M19.833 16.705c-.28-.14-1.654-.815-1.91-.909-.255-.093-.44-.14-.626.14-.186.28-.719.909-.882 1.095-.163.187-.326.21-.606.07-.28-.14-1.182-.436-2.25-1.389-.832-.742-1.393-1.657-1.557-1.937-.163-.28-.017-.431.123-.57.126-.125.28-.327.42-.49.14-.164.187-.28.28-.467.094-.186.047-.35-.023-.49-.07-.14-.627-1.51-.859-2.067-.226-.543-.456-.47-.626-.478l-.536-.01a1.03 1.03 0 00-.746.35c-.256.28-.977.955-.977 2.33 0 1.374 1 2.703 1.14 2.89.14.186 1.97 3.007 4.774 4.218.667.288 1.188.46 1.594.589.67.213 1.28.183 1.762.111.538-.08 1.655-.676 1.888-1.329.233-.653.233-1.213.163-1.329-.07-.117-.256-.187-.536-.327z"
              fill="#25d366"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-['Unbounded:Bold',sans-serif] font-bold text-white text-[15px] sm:text-[16px] leading-snug">
            Toda consulta genera honorarios
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[#adb5bd] text-[13px] sm:text-[14px] leading-[1.5]">
            ¿Deseas continuar hacia WhatsApp?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 inline-flex items-center justify-center bg-transparent border border-[#2c3035] hover:border-[#ffd200] rounded-[8px] px-5 py-3 text-[#adb5bd] hover:text-white transition-colors font-['Inter:Semi Bold',sans-serif] font-semibold text-[14px] cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb558] rounded-[8px] px-5 py-3 text-white transition-colors font-['Inter:Bold',sans-serif] font-bold text-[14px] cursor-pointer"
          >
            Continuar a WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export function useWhatsApp() {
  const [open, setOpen] = useState(false);

  const trigger = useCallback(() => setOpen(true), []);
  const cancel = useCallback(() => setOpen(false), []);
  const confirm = useCallback(() => {
    setOpen(false);
    window.open(WA_URL, "_blank", "noopener,noreferrer");
  }, []);

  const modal = open ? <Modal onConfirm={confirm} onCancel={cancel} /> : null;
  return { trigger, modal };
}
