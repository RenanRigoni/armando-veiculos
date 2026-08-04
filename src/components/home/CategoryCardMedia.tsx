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

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % images.length);
      intervalId = setInterval(() => {
        setActiveIndex((current) => (current + 1) % images.length);
      }, intervalMs);
    }, firstChangeDelayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, intervalMs, firstChangeDelayMs]);

  return (
    <>
      {images.map((src, index) => (
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
      ))}
    </>
  );
}
