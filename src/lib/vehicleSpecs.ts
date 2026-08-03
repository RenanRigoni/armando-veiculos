import { Fuel, Gauge, Settings2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  formatDisplacement,
  formatEngineHours,
  formatMileage,
} from "@/lib/format";
import type { Spec, Vehicle } from "@/types/vehicle";

export type QuickSpec = { icon: LucideIcon; label: string };

/** Specs compactas usadas no VehicleCard e no topo do SummaryPanel. */
export function buildQuickSpecs(vehicle: Vehicle, limit = 3): QuickSpec[] {
  const specs: QuickSpec[] = [];

  const km = formatMileage(vehicle.mileage);
  if (km) specs.push({ icon: Gauge, label: km });

  const hours = formatEngineHours(vehicle.engineHours);
  if (hours) specs.push({ icon: Gauge, label: `${hours} de uso` });

  if (vehicle.transmission) specs.push({ icon: Settings2, label: vehicle.transmission });
  if (vehicle.fuel) specs.push({ icon: Fuel, label: vehicle.fuel });

  return specs.slice(0, limit);
}

/**
 * Especificações completas pro SpecGrid da página de detalhe.
 * Campo por categoria travado no AGENTS.md — nunca forçar campo de carro em barco.
 */
export function buildFullSpecs(vehicle: Vehicle): Spec[] {
  const specs: Spec[] = [];
  const push = (label: string, value: string | null | undefined) => {
    if (value) specs.push({ label, value });
  };

  if (vehicle.category === "carros") {
    push("Quilometragem", formatMileage(vehicle.mileage));
    push("Câmbio", vehicle.transmission);
    push("Combustível", vehicle.fuel);
    push("Motor", vehicle.engine);
    push("Carroceria", vehicle.bodyType);
    push("Portas", vehicle.doors ? String(vehicle.doors) : null);
  } else if (vehicle.category === "motos") {
    push("Quilometragem", formatMileage(vehicle.mileage));
    push("Cilindrada", formatDisplacement(vehicle.engineDisplacement));
    push("Combustível", vehicle.fuel);
    push("Motor", vehicle.engine);
  } else {
    push("Horas de motor", formatEngineHours(vehicle.engineHours));
    push("Motor", vehicle.engine);
    push("Combustível", vehicle.fuel);
  }

  push("Cor", vehicle.color);
  push("Condição", vehicle.condition);

  return specs;
}

export type StatusBadgeInfo = { label: string; tone: "warning" | "brand" };

export function statusBadge(vehicle: Vehicle): StatusBadgeInfo | null {
  if (vehicle.status === "reservado") return { label: "Reservado", tone: "warning" };
  if (vehicle.condition?.toLowerCase() === "novo") return { label: "Novo", tone: "brand" };
  return null;
}
