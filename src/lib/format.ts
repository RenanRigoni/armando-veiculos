const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("pt-BR");

export function formatBRL(value: number | null | undefined): string | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  return brlFormatter.format(value);
}

export function formatMileage(km: number | null | undefined): string | null {
  if (km === null || km === undefined) return null;
  return `${numberFormatter.format(km)} km`;
}

export function formatEngineHours(hours: number | null | undefined): string | null {
  if (hours === null || hours === undefined) return null;
  return `${numberFormatter.format(hours)} h`;
}

export function formatDisplacement(cc: number | null | undefined): string | null {
  if (cc === null || cc === undefined) return null;
  return `${numberFormatter.format(cc)} cc`;
}

/** "2025/2026" — ou só o ano quando fabricação e modelo coincidem. */
export function formatYearPair(
  yearManufacture: number | null | undefined,
  yearModel: number | null | undefined,
): string | null {
  if (!yearManufacture && !yearModel) return null;
  if (!yearModel || yearManufacture === yearModel) return String(yearManufacture);
  if (!yearManufacture) return String(yearModel);
  return `${yearManufacture}/${yearModel}`;
}

export function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}
