import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryCardMedia } from "@/components/home/CategoryCardMedia";
import { CATEGORY_LABELS } from "@/types/vehicle";
import type { VehicleCategory } from "@/types/vehicle";
import { cn } from "@/lib/utils";

const descriptors: Record<VehicleCategory, string> = {
  carros: "Sedans, SUVs, hatches e picapes.",
  motos: "Naked, urbanas e esportivas.",
  nautica: "Lanchas e jet skis.",
};

const ROTATE_INTERVAL_MS = 5000;

/** Escalona a primeira troca de cada card em terços do intervalo. */
const firstChangeDelayMs: Record<VehicleCategory, number> = {
  carros: ROTATE_INTERVAL_MS,
  motos: ROTATE_INTERVAL_MS / 3,
  nautica: (ROTATE_INTERVAL_MS / 3) * 2,
};

export type CategoryCardData = {
  category: VehicleCategory;
  images: string[];
  count: number;
};

export function CategoryCards({ categories }: { categories: CategoryCardData[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {categories.map((item) => (
        <Link
          key={item.category}
          href={`/estoque?categoria=${item.category}`}
          className={cn(
            "group border-border bg-surface hover:border-brand/50 relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-md border transition-[border-color,box-shadow] duration-300 hover:shadow-[0_12px_32px_-16px_rgba(225,30,37,0.35)]",
          )}
        >
          <CategoryCardMedia
            images={item.images}
            alt={CATEGORY_LABELS[item.category]}
            intervalMs={ROTATE_INTERVAL_MS}
            firstChangeDelayMs={firstChangeDelayMs[item.category]}
          />
          <div className="from-ink absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

          <div className="relative z-10 p-5">
            {item.count > 0 ? (
              <p className="text-brand-text mb-2 text-xs tracking-widest uppercase">
                {item.count} {item.count === 1 ? "disponível" : "disponíveis"}
              </p>
            ) : null}
            <h3 className="text-2xl">{CATEGORY_LABELS[item.category]}</h3>
            <p className="text-fg-muted mt-1 text-sm">{descriptors[item.category]}</p>
            <span className="font-display text-fg group-hover:text-brand-text mt-4 inline-flex items-center gap-1.5 text-sm tracking-wide uppercase transition-colors">
              Ver estoque
              <ArrowRight size={14} aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
