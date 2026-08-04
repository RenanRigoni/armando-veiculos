"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type CategoryCardMediaProps = {
  images: string[];
  alt: string;
  intervalMs: number;
  /** Atraso até a primeira troca, para escalonar o início entre cards. Default: intervalMs. */
  firstChangeDelayMs?: number;
};

export function CategoryCardMedia({
  images,
  alt,
  intervalMs,
  firstChangeDelayMs = intervalMs,
}: CategoryCardMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Só monta a foto quando o carrossel realmente chega nela — evita buscar todas
  // as fotos do card de largada, já que o object-fit "fill" faz todas ocuparem a
  // mesma área e o lazy-loading nativo (baseado em posição, não em opacidade) não
  // adiaria nada sozinho.
  const [loadedIndices, setLoadedIndices] = useState<ReadonlySet<number>>(() => new Set([0]));

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function advance() {
      setActiveIndex((current) => {
        const next = (current + 1) % images.length;
        setLoadedIndices((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
        return next;
      });
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      advance();
      intervalId = setInterval(advance, intervalMs);
    }, firstChangeDelayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, intervalMs, firstChangeDelayMs]);

  return (
    <>
      {images.map((src, index) =>
        loadedIndices.has(index) ? (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 640px) 33vw, 92vw"
            priority={index === 0}
            className={cn(
              "object-cover transition-[opacity,transform] duration-700 group-hover:scale-105",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null,
      )}
    </>
  );
}
