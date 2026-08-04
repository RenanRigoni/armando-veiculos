import type { VehicleCategory, VehicleRow, VehicleStatus } from "@/types/database";

export type { VehicleCategory, VehicleStatus };

export type VehicleImage = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
};

/**
 * Tipo de domínio usado por toda a UI pública.
 * Não contém `internal_notes` — anotações internas só existem em AdminVehicle.
 */
export type Vehicle = {
  id: string;
  slug: string;
  category: VehicleCategory;
  make: string;
  model: string;
  version: string | null;
  title: string;
  yearManufacture: number;
  yearModel: number;
  price: number;
  previousPrice: number | null;
  mileage: number | null;
  engineHours: number | null;
  transmission: string | null;
  fuel: string | null;
  engine: string | null;
  engineDisplacement: number | null;
  bodyType: string | null;
  doors: number | null;
  color: string | null;
  condition: string | null;
  description: string | null;
  features: string[];
  status: VehicleStatus;
  featured: boolean;
  financingNote: string | null;
  coverImage: string;
  images: VehicleImage[];
  createdAt: string;
  updatedAt: string;
};

/** Imagem com o `storagePath` cru — o painel precisa dele pra capa/reordenar/deletar. */
export type AdminVehicleImage = VehicleImage & { storagePath: string };

/**
 * Visão do painel — rascunho só exige `category` (ver 0005_draft_nullable.sql),
 * então os campos essenciais do site público aqui são nullable. Nunca use este
 * tipo em componentes públicos; `internalNotes` não pode vazar para lá.
 */
export type AdminVehicle = {
  id: string;
  slug: string | null;
  category: VehicleCategory;
  make: string | null;
  model: string | null;
  version: string | null;
  title: string | null;
  yearManufacture: number | null;
  yearModel: number | null;
  price: number | null;
  previousPrice: number | null;
  mileage: number | null;
  engineHours: number | null;
  transmission: string | null;
  fuel: string | null;
  engine: string | null;
  engineDisplacement: number | null;
  bodyType: string | null;
  doors: number | null;
  color: string | null;
  condition: string | null;
  description: string | null;
  features: string[];
  status: VehicleStatus;
  featured: boolean;
  financingNote: string | null;
  internalNotes: string | null;
  /** Sempre resolvida via `resolveImageUrl` — cai no placeholder quando não há foto. */
  coverImage: string;
  images: AdminVehicleImage[];
  createdAt: string;
  updatedAt: string;
};

export const CATEGORY_LABELS: Record<VehicleCategory, string> = {
  carros: "Carros",
  motos: "Motos",
  nautica: "Náutica",
};

export const CATEGORY_SINGULAR: Record<VehicleCategory, string> = {
  carros: "Carro",
  motos: "Moto",
  nautica: "Náutica",
};

export const STATUS_LABELS: Record<VehicleStatus, string> = {
  rascunho: "Rascunho",
  ativo: "Ativo",
  reservado: "Reservado",
  vendido: "Vendido",
};

/** Status que aparecem no site público. */
export const PUBLIC_STATUSES: VehicleStatus[] = ["ativo", "reservado"];

export type VehicleFilters = {
  category?: VehicleCategory;
  make?: string;
  model?: string;
  yearMin?: number;
  priceMax?: number;
  mileageMax?: number;
  query?: string;
};

export type Pagination = {
  page: number;
  perPage: number;
};

export type VehicleListResult = {
  items: Vehicle[];
  total: number;
};

export type InventoryFacets = {
  makes: string[];
  models: string[];
  years: number[];
  priceRange: { min: number; max: number };
  makesByCategory: Record<VehicleCategory, string[]>;
  modelsByCategory: Record<VehicleCategory, string[]>;
};

export type InventoryStats = {
  active: number;
  carros: number;
  motos: number;
  nautica: number;
  reserved: number;
  sold: number;
  drafts: number;
};

export function isVehicleCategory(value: string): value is VehicleCategory {
  return value === "carros" || value === "motos" || value === "nautica";
}

/**
 * Especificações relevantes por categoria, já filtradas.
 * Campos vazios nunca chegam à UI — o SpecGrid não renderiza rótulo órfão.
 */
export type Spec = { label: string; value: string };

export type { VehicleRow };
