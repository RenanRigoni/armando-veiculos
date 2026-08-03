import { isVehicleCategory } from "@/types/vehicle";
import type { VehicleFilters } from "@/types/vehicle";

/**
 * Único lugar que conhece os nomes dos parâmetros de `/estoque`.
 * `SearchFilters` (client, escreve a URL) e a página de estoque (server, lê a
 * URL) passam por aqui — os nomes nunca são digitados soltos em componente.
 */

export type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseEstoqueSearchParams(params: RawSearchParams): {
  filters: VehicleFilters;
  page: number;
} {
  const categoria = first(params.categoria);
  const anoMin = first(params.anoMin);
  const precoMax = first(params.precoMax);
  const kmMax = first(params.kmMax);
  const page = Number(first(params.page)) || 1;

  const filters: VehicleFilters = {
    category: categoria && isVehicleCategory(categoria) ? categoria : undefined,
    make: first(params.marca) || undefined,
    model: first(params.modelo) || undefined,
    yearMin: anoMin ? Number(anoMin) : undefined,
    priceMax: precoMax ? Number(precoMax) : undefined,
    mileageMax: kmMax ? Number(kmMax) : undefined,
    query: first(params.q) || undefined,
  };

  return { filters, page: Math.max(1, page) };
}

export function buildEstoqueSearchParams(filters: VehicleFilters, page = 1): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.category) params.set("categoria", filters.category);
  if (filters.make) params.set("marca", filters.make);
  if (filters.model) params.set("modelo", filters.model);
  if (filters.yearMin) params.set("anoMin", String(filters.yearMin));
  if (filters.priceMax) params.set("precoMax", String(filters.priceMax));
  if (filters.mileageMax) params.set("kmMax", String(filters.mileageMax));
  if (page > 1) params.set("page", String(page));
  return params;
}
