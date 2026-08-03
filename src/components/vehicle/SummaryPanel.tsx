import { MessageCircle, Repeat, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { formatBRL, formatYearPair } from "@/lib/format";
import { messages, whatsappLinks } from "@/lib/whatsapp";
import { buildQuickSpecs, statusBadge } from "@/lib/vehicleSpecs";
import { CATEGORY_LABELS } from "@/types/vehicle";
import type { Vehicle } from "@/types/vehicle";

export function SummaryPanel({ vehicle }: { vehicle: Vehicle }) {
  const badge = statusBadge(vehicle);
  const quickSpecs = buildQuickSpecs(vehicle, 4);
  const years = formatYearPair(vehicle.yearManufacture, vehicle.yearModel);
  const price = formatBRL(vehicle.price);
  const previousPrice =
    vehicle.previousPrice && vehicle.previousPrice > vehicle.price
      ? formatBRL(vehicle.previousPrice)
      : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="muted">{CATEGORY_LABELS[vehicle.category]}</Badge>
        {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
      </div>

      <h1 className="mt-3 text-3xl leading-[1.05] normal-case sm:text-4xl">
        {vehicle.make} {vehicle.model}
        {vehicle.version ? ` ${vehicle.version}` : ""}
      </h1>
      {years ? <p className="text-fg-muted mt-2 text-base">{years}</p> : null}

      <div className="mt-5">
        {previousPrice ? (
          <p className="text-fg-muted text-sm line-through">{previousPrice}</p>
        ) : null}
        <p className="font-display text-4xl tracking-tight sm:text-5xl">{price}</p>
      </div>

      {quickSpecs.length > 0 ? (
        <ul className="border-border text-fg-muted mt-6 grid grid-cols-2 gap-3 border-y py-4 text-sm sm:grid-cols-4">
          {quickSpecs.map((spec) => (
            <li key={spec.label} className="flex items-center gap-1.5">
              <spec.icon size={16} className="text-brand shrink-0" aria-hidden />
              {spec.label}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex flex-col gap-3">
        <ButtonLink href={whatsappLinks.sales(messages.vehicleInterest(vehicle))} size="lg">
          <MessageCircle size={18} aria-hidden />
          Tenho interesse
        </ButtonLink>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#financiamento" variant="secondary">
            <Wallet size={16} aria-hidden />
            Simular financiamento
          </ButtonLink>
          <ButtonLink href="#troca" variant="secondary">
            <Repeat size={16} aria-hidden />
            Tenho veículo na troca
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
