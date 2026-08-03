import "server-only";

import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { resolveImageUrl } from "@/lib/images";
import type {
  InventoryFacets,
  InventoryStats,
  Pagination,
  Vehicle,
  VehicleFilters,
  VehicleImage,
  VehicleListResult,
} from "@/types/vehicle";
import { PUBLIC_STATUSES } from "@/types/vehicle";
import type { VehicleRow } from "@/types/database";

/**
 * Única porta de leitura do estoque. Nenhum componente fala com o Supabase direto.
 *
 * Lista explícita de colunas em vez de select("*") — mantém `internal_notes`
 * fora de qualquer payload que chegue ao navegador.
 */
const PUBLIC_VEHICLE_COLUMNS = `
  id, slug, category, make, model, version, title,
  year_manufacture, year_model, price, previous_price,
  mileage, engine_hours, transmission, fuel, engine, engine_displacement,
  body_type, doors, color, condition, description, features,
  status, featured, financing_note, cover_image, created_at, updated_at,
  vehicle_images ( id, storage_path, alt_text, sort_order )
`;

type ImageRelation = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
};

type VehicleQueryRow = Omit<VehicleRow, "internal_notes"> & {
  vehicle_images: ImageRelation[] | null;
};

/**
 * `slug/make/model/title/year_manufacture/year_model/price` são nullable no banco
 * (rascunho só exige `category` — ver 0005_draft_nullable.sql), mas toda leitura
 * pública aqui filtra `status in ('ativo','reservado')`, e a constraint
 * `vehicles_publish_requires_core_fields` garante que essas linhas têm os campos
 * essenciais preenchidos. Rascunho nunca chega até aqui.
 */
type CompleteVehicleRow = VehicleQueryRow & {
  slug: string;
  make: string;
  model: string;
  title: string;
  year_manufacture: number;
  year_model: number;
  price: number;
};

function isCompleteVehicleRow(row: VehicleQueryRow): row is CompleteVehicleRow {
  return (
    row.slug !== null &&
    row.make !== null &&
    row.model !== null &&
    row.title !== null &&
    row.year_manufacture !== null &&
    row.year_model !== null &&
    row.price !== null
  );
}

const DEFAULT_PER_PAGE = 12;

function toFeatures(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function toImages(rows: ImageRelation[] | null): VehicleImage[] {
  if (!rows?.length) return [];
  return rows
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({
      id: row.id,
      url: resolveImageUrl(row.storage_path),
      alt: row.alt_text,
      sortOrder: row.sort_order,
    }));
}

function mapVehicle(row: CompleteVehicleRow): Vehicle {
  const images = toImages(row.vehicle_images);

  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    make: row.make,
    model: row.model,
    version: row.version,
    title: row.title,
    yearManufacture: row.year_manufacture,
    yearModel: row.year_model,
    price: Number(row.price),
    previousPrice: row.previous_price === null ? null : Number(row.previous_price),
    mileage: row.mileage,
    engineHours: row.engine_hours,
    transmission: row.transmission,
    fuel: row.fuel,
    engine: row.engine,
    engineDisplacement: row.engine_displacement,
    bodyType: row.body_type,
    doors: row.doors,
    color: row.color,
    condition: row.condition,
    description: row.description,
    features: toFeatures(row.features),
    status: row.status,
    featured: row.featured,
    financingNote: row.financing_note,
    coverImage: resolveImageUrl(row.cover_image ?? images[0]?.url ?? null),
    images,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getVehicles(
  filters: VehicleFilters = {},
  pagination: Pagination = { page: 1, perPage: DEFAULT_PER_PAGE },
): Promise<VehicleListResult> {
  const supabase = await createClient();

  const page = Math.max(1, pagination.page);
  const perPage = Math.max(1, pagination.perPage);
  const from = (page - 1) * perPage;

  let query = supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_COLUMNS, { count: "exact" })
    .in("status", PUBLIC_STATUSES);

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.make) query = query.ilike("make", filters.make);
  if (filters.model) query = query.ilike("model", `%${filters.model}%`);
  if (filters.yearMin) query = query.gte("year_model", filters.yearMin);
  if (filters.priceMax) query = query.lte("price", filters.priceMax);
  if (filters.mileageMax) query = query.lte("mileage", filters.mileageMax);
  if (filters.query) {
    const term = `%${filters.query}%`;
    query = query.or(`title.ilike.${term},make.ilike.${term},model.ilike.${term}`);
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, from + perPage - 1);

  if (error) throw new Error(`Falha ao carregar o estoque: ${error.message}`);

  return {
    items: ((data ?? []) as unknown as VehicleQueryRow[]).filter(isCompleteVehicleRow).map(mapVehicle),
    total: count ?? 0,
  };
}

export const getVehicleBySlug = cache(async function getVehicleBySlug(
  slug: string,
): Promise<Vehicle | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_COLUMNS)
    .eq("slug", slug)
    .in("status", PUBLIC_STATUSES)
    .maybeSingle();

  if (error) throw new Error(`Falha ao carregar o veículo: ${error.message}`);
  if (!data) return null;

  const row = data as unknown as VehicleQueryRow;
  if (!isCompleteVehicleRow(row)) return null;

  return mapVehicle(row);
});

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_COLUMNS)
    .in("status", PUBLIC_STATUSES)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Falha ao carregar os destaques: ${error.message}`);

  return ((data ?? []) as unknown as VehicleQueryRow[]).filter(isCompleteVehicleRow).map(mapVehicle);
}

/** Veículos da mesma categoria, excluindo o atual. */
export async function getRelatedVehicles(vehicle: Vehicle, limit = 4): Promise<Vehicle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_COLUMNS)
    .in("status", PUBLIC_STATUSES)
    .eq("category", vehicle.category)
    .neq("id", vehicle.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Falha ao carregar veículos relacionados: ${error.message}`);

  return ((data ?? []) as unknown as VehicleQueryRow[]).filter(isCompleteVehicleRow).map(mapVehicle);
}

/** Alimenta os selects do formulário de busca com valores que existem no estoque. */
export async function getInventoryFacets(): Promise<InventoryFacets> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("make, model, year_model, price")
    .in("status", PUBLIC_STATUSES);

  if (error) throw new Error(`Falha ao carregar filtros: ${error.message}`);

  // make/model/year_model/price são nullable só em rascunho; o filtro de status
  // acima já garante que essas linhas estão completas (ver isCompleteVehicleRow).
  const rows = data.filter(
    (row): row is typeof row & { make: string; model: string; year_model: number; price: number } =>
      row.make !== null && row.model !== null && row.year_model !== null && row.price !== null,
  );
  const prices = rows.map((row) => Number(row.price));

  return {
    makes: [...new Set(rows.map((row) => row.make))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    models: [...new Set(rows.map((row) => row.model))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    years: [...new Set(rows.map((row) => row.year_model))].sort((a, b) => b - a),
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
  };
}

/** Contagens do dashboard do painel. Exige sessão — usa as políticas de admin. */
export async function getInventoryStats(): Promise<InventoryStats> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("vehicles").select("category, status");

  if (error) throw new Error(`Falha ao carregar as estatísticas: ${error.message}`);

  const rows = data ?? [];
  const activeRows = rows.filter((row) => row.status === "ativo");

  return {
    active: activeRows.length,
    carros: activeRows.filter((row) => row.category === "carros").length,
    motos: activeRows.filter((row) => row.category === "motos").length,
    nautica: activeRows.filter((row) => row.category === "nautica").length,
    reserved: rows.filter((row) => row.status === "reservado").length,
    sold: rows.filter((row) => row.status === "vendido").length,
    drafts: rows.filter((row) => row.status === "rascunho").length,
  };
}
