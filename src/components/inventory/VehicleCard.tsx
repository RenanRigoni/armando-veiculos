import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { formatBRL, formatYearPair } from "@/lib/format";
import { buildQuickSpecs, statusBadge } from "@/lib/vehicleSpecs";
import { CATEGORY_LABELS } from "@/types/vehicle";
import type { Vehicle } from "@/types/vehicle";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const badge = statusBadge(vehicle);
  const specs = buildQuickSpecs(vehicle);
  const years = formatYearPair(vehicle.yearManufacture, vehicle.yearModel);
  const price = formatBRL(vehicle.price);
  const previousPrice =
    vehicle.previousPrice && vehicle.previousPrice > vehicle.price
      ? formatBRL(vehicle.previousPrice)
      : null;

  return (
    <article className="border-border bg-surface group flex flex-col overflow-hidden rounded-md border">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-black">
        <Image
          src={vehicle.coverImage}
          alt={vehicle.title}
          fill
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <Badge tone="muted" className="bg-ink/80 border-border/60">
            {CATEGORY_LABELS[vehicle.category]}
          </Badge>
          {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg leading-tight normal-case">
            {vehicle.make} {vehicle.model}
            {vehicle.version ? ` ${vehicle.version}` : ""}
          </h3>
          {years ? <p className="text-fg-muted mt-1 text-sm">{years}</p> : null}
        </div>

        {specs.length > 0 ? (
          <ul className="text-fg-muted flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {specs.map((spec) => (
              <li key={spec.label} className="flex items-center gap-1.5">
                <spec.icon size={15} className="text-brand shrink-0" aria-hidden />
                {spec.label}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            {previousPrice ? (
              <p className="text-fg-muted text-xs line-through">{previousPrice}</p>
            ) : null}
            <p className="font-display text-xl tracking-tight">{price}</p>
          </div>
          <ButtonLink href={`/estoque/${vehicle.slug}`} size="sm">
            Ver detalhes
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
