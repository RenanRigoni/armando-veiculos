import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CATEGORY_LABELS } from "@/types/vehicle";
import type { VehicleCategory } from "@/types/vehicle";
import { cn } from "@/lib/utils";

const descriptors: Record<VehicleCategory, string> = {
  carros: "Sedans, SUVs, hatches e picapes.",
  motos: "Naked, urbanas e esportivas.",
  nautica: "Lanchas e jet skis.",
};

export type CategoryCardData = {
  category: VehicleCategory;
  image: string;
  count: number;
};

export function CategoryCards({ categories }: { categories: CategoryCardData[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {categories.map((item, index) => (
        <Link
          key={item.category}
          href={`/estoque?categoria=${item.category}`}
          className={cn(
            "group border-border bg-surface relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-md border",
            index === 0 ? "sm:col-span-2 sm:aspect-[2/1]" : "sm:aspect-[4/3]",
          )}
        >
          <Image
            src={item.image}
            alt={CATEGORY_LABELS[item.category]}
            fill
            sizes={
              index === 0
                ? "(min-width: 640px) 100vw, 92vw"
                : "(min-width: 640px) 50vw, 92vw"
            }
            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
