"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { useSwipe } from "@/hooks/useSwipe";
import type { VehicleImage } from "@/types/vehicle";

type LightboxProps = {
  images: VehicleImage[];
  index: number;
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ images, index, title, onIndexChange, onClose }: LightboxProps) {
  const total = images.length;
  const current = images[index];

  function goNext() {
    onIndexChange((index + 1) % total);
  }

  function goPrev() {
    onIndexChange((index - 1 + total) % total);
  }

  const swipeHandlers = useSwipe(goNext, goPrev);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && total > 1) goNext();
      if (event.key === "ArrowLeft" && total > 1) goPrev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- goNext/goPrev recriados por render, mas só o índice importa
  }, [index, onClose, total]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria — ${title}`}
    >
      <div className="flex items-center justify-between p-4">
        {total > 1 ? (
          <p className="text-fg-muted text-sm">
            {index + 1} / {total}
          </p>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onClose}
          className="text-fg hover:text-brand p-2"
          aria-label="Fechar galeria"
        >
          <X size={28} aria-hidden />
        </button>
      </div>

      <div
        className="relative flex-1 px-4 pb-4"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        <Image
          src={current.url}
          alt={current.alt ?? title}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="bg-ink/60 hover:bg-brand absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 text-white sm:left-6"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={28} aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="bg-ink/60 hover:bg-brand absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-white sm:right-6"
              aria-label="Próxima foto"
            >
              <ChevronRight size={28} aria-hidden />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
