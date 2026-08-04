"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { IntrinsicVehicleImage } from "@/components/vehicle/IntrinsicVehicleImage";
import { useDialogFocus } from "@/hooks/useDialogFocus";
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
  const dialogTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % total);
  }, [index, onIndexChange, total]);

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + total) % total);
  }, [index, onIndexChange, total]);

  const swipeHandlers = useSwipe(goNext, goPrev);
  const dialogRef = useDialogFocus({
    isOpen: Boolean(current),
    onClose,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" && total > 1) goNext();
      if (event.key === "ArrowLeft" && total > 1) goPrev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, total]);

  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      className="bg-scrim/95 fixed inset-0 z-[60] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4">
        <h2 id={dialogTitleId} className="sr-only">
          Galeria de fotos: {title}
        </h2>
        {total > 1 ? (
          <p className="text-on-brand/60 text-sm" aria-hidden>
            {index + 1} / {total}
          </p>
        ) : (
          <span />
        )}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="text-on-brand hover:text-brand-text inline-flex size-11 items-center justify-center"
          aria-label="Fechar galeria"
        >
          <X size={28} aria-hidden />
        </button>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Foto {index + 1} de {total}: {current.alt ?? title}
      </p>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        <IntrinsicVehicleImage
          src={current.url}
          alt={current.alt ?? title}
          eager
          className="max-h-[calc(95svh-4rem)] max-w-[95vw]"
          onClick={(event) => event.stopPropagation()}
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className="bg-scrim/60 hover:bg-brand text-on-brand absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full sm:left-6"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={28} aria-hidden />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className="bg-scrim/60 hover:bg-brand text-on-brand absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full sm:right-6"
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
