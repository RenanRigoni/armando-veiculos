import type { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

type IntrinsicVehicleImageProps = {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
};

/**
 * Displays catalog photos at their native proportions and never enlarges them
 * past their intrinsic dimensions. The legacy catalog does not store width or
 * height metadata, so a native image is required here instead of guessing an
 * aspect ratio for next/image.
 */
export function IntrinsicVehicleImage({
  src,
  alt,
  eager = false,
  className,
  onClick,
}: IntrinsicVehicleImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Remote legacy photos have unknown, mixed intrinsic dimensions.
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn("block h-auto w-auto max-h-full max-w-full object-contain", className)}
      onClick={onClick}
    />
  );
}
