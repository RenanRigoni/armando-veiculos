"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Lightbox } from "@/components/vehicle/Lightbox";
import { useSwipe } from "@/hooks/useSwipe";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/types/vehicle";

type GalleryProps = {
  images: VehicleImage[];
  title: string;
};

export function Gallery({ images, title }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const total = images.length;
  const current = images[index];

  function goNext() {
    setIndex((value) => (value + 1) % total);
  }

  function goPrev() {
    setIndex((value) => (value - 1 + total) % total);
  }

  const swipeHandlers = useSwipe(goNext, goPrev);

  if (!current) return null;

  return (
    <div>
      <div
        className="border-border bg-ink relative aspect-[3/2] w-full overflow-hidden rounded-md border"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label="Abrir galeria em tela cheia"
        >
          <Image
            key={current.id}
            src={current.url}
            alt={current.alt ?? title}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            className="object-cover"
          />

          {total > 1 ? (
            <span className="bg-ink/80 absolute right-3 bottom-3 rounded-sm px-2 py-1 text-xs">
              {index + 1} / {total}
            </span>
          ) : null}
        </button>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className="bg-ink/60 hover:bg-brand text-fg absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className="bg-ink/60 hover:bg-brand text-fg absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full"
              aria-label="Próxima foto"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, imageIndex) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={cn(
                "border-border relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border",
                imageIndex === index && "ring-brand ring-2",
              )}
              aria-label={`Ver foto ${imageIndex + 1}`}
              aria-current={imageIndex === index}
            >
              <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {isLightboxOpen ? (
        <Lightbox
          images={images}
          index={index}
          title={title}
          onIndexChange={setIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      ) : null}
    </div>
  );
}
