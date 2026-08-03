"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { resolveImageUrl, VEHICLE_BUCKET } from "@/lib/images";
import { buildVehicleSlug, slugify, withSlugSuffix } from "@/lib/slug";
import { vehicleDraftSchema, vehiclePublishSchema } from "@/schemas/vehicle";
import type { VehicleDraftSchema } from "@/schemas/vehicle";
import type {
  AdminVehicle,
  AdminVehicleImage,
  VehicleCategory,
  VehicleStatus,
} from "@/types/vehicle";
import type { Database } from "@/types/database";
import type { VehicleRow } from "@/types/database";

/**
 * Leituras e mutações do painel. Nenhum componente admin fala com o Supabase
 * direto — tudo passa por aqui (mesma regra do site público em data/vehicles.ts).
 */

const ADMIN_VEHICLE_COLUMNS = `
  id, slug, category, make, model, version, title,
  year_manufacture, year_model, price, previous_price,
  mileage, engine_hours, transmission, fuel, engine, engine_displacement,
  body_type, doors, color, condition, description, features,
  status, featured, financing_note, cover_image, internal_notes, created_at, updated_at,
  vehicle_images ( id, storage_path, alt_text, sort_order )
`;

type ImageRelation = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
};

type AdminVehicleRow = VehicleRow & { vehicle_images: ImageRelation[] | null };

export type ActionResult = { success: true; id?: string } | { success: false; error: string };

function toFeatures(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function toImages(rows: ImageRelation[] | null): AdminVehicleImage[] {
  if (!rows?.length) return [];
  return rows
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({
      id: row.id,
      url: resolveImageUrl(row.storage_path),
      storagePath: row.storage_path,
      alt: row.alt_text,
      sortOrder: row.sort_order,
    }));
}

function mapAdminVehicle(row: AdminVehicleRow): AdminVehicle {
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
    price: row.price === null ? null : Number(row.price),
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
    internalNotes: row.internal_notes,
    coverImage: resolveImageUrl(row.cover_image ?? images[0]?.url ?? null),
    images,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRowPayload(values: VehicleDraftSchema) {
  return {
    category: values.category,
    slug: values.slug?.trim() || null,
    make: values.make?.trim() || null,
    model: values.model?.trim() || null,
    version: values.version?.trim() || null,
    title: values.title?.trim() || null,
    year_manufacture: values.yearManufacture ?? null,
    year_model: values.yearModel ?? null,
    price: values.price ?? null,
    previous_price: values.previousPrice ?? null,
    mileage: values.mileage ?? null,
    engine_hours: values.engineHours ?? null,
    transmission: values.transmission?.trim() || null,
    fuel: values.fuel?.trim() || null,
    engine: values.engine?.trim() || null,
    engine_displacement: values.engineDisplacement ?? null,
    body_type: values.bodyType?.trim() || null,
    doors: values.doors ?? null,
    color: values.color?.trim() || null,
    condition: values.condition?.trim() || null,
    description: values.description?.trim() || null,
    features: values.features ?? [],
    financing_note: values.financingNote?.trim() || null,
  };
}

async function ensureUniqueSlug(
  supabase: SupabaseClient<Database>,
  baseSlug: string,
  excludeId?: string,
): Promise<string> {
  let attempt = 1;
  let candidate = baseSlug;

  for (;;) {
    let query = supabase.from("vehicles").select("id").eq("slug", candidate).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    if (!data) return candidate;
    attempt += 1;
    candidate = withSlugSuffix(baseSlug, attempt);
  }
}

function fallbackSlug(values: VehicleDraftSchema): string {
  const fromFields = buildVehicleSlug(values);
  return fromFields || `veiculo-${values.category}-${Date.now()}`;
}

export type AdminVehicleFilters = {
  query?: string;
  category?: VehicleCategory;
  status?: VehicleStatus;
  featured?: boolean;
  sort?: "newest" | "oldest" | "price_asc" | "price_desc";
};

export type AdminPagination = { page: number; perPage: number };

const ADMIN_DEFAULT_PER_PAGE = 20;

export async function getAdminVehicles(
  filters: AdminVehicleFilters = {},
  pagination: AdminPagination = { page: 1, perPage: ADMIN_DEFAULT_PER_PAGE },
): Promise<{ items: AdminVehicle[]; total: number }> {
  const supabase = await createClient();

  const page = Math.max(1, pagination.page);
  const perPage = Math.max(1, pagination.perPage);
  const from = (page - 1) * perPage;

  let query = supabase.from("vehicles").select(ADMIN_VEHICLE_COLUMNS, { count: "exact" });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.featured !== undefined) query = query.eq("featured", filters.featured);
  if (filters.query) {
    const term = `%${filters.query}%`;
    query = query.or(
      `title.ilike.${term},make.ilike.${term},model.ilike.${term},version.ilike.${term}`,
    );
  }

  const sort = filters.sort ?? "newest";
  if (sort === "oldest") query = query.order("created_at", { ascending: true });
  else if (sort === "price_asc") query = query.order("price", { ascending: true, nullsFirst: true });
  else if (sort === "price_desc") query = query.order("price", { ascending: false, nullsFirst: false });
  else query = query.order("created_at", { ascending: false });

  const { data, count, error } = await query.range(from, from + perPage - 1);
  if (error) throw new Error(`Falha ao carregar veículos: ${error.message}`);

  return {
    items: ((data ?? []) as unknown as AdminVehicleRow[]).map(mapAdminVehicle),
    total: count ?? 0,
  };
}

export async function getAdminVehicleById(id: string): Promise<AdminVehicle | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(ADMIN_VEHICLE_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Falha ao carregar veículo: ${error.message}`);
  if (!data) return null;

  return mapAdminVehicle(data as unknown as AdminVehicleRow);
}

/** "Salvar rascunho" a partir de /admin/veiculos/novo — cria e já redireciona pra edição. */
export async function createVehicleDraft(values: VehicleDraftSchema): Promise<ActionResult> {
  const parsed = vehicleDraftSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  let newId: string;

  try {
    const baseSlug = slugify(parsed.data.slug?.trim() || fallbackSlug(parsed.data));
    const uniqueSlug = await ensureUniqueSlug(supabase, baseSlug);

    const { data, error } = await supabase
      .from("vehicles")
      .insert({ ...toRowPayload(parsed.data), slug: uniqueSlug, status: "rascunho" })
      .select("id")
      .single();

    if (error) throw error;
    newId = data.id;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Falha ao criar rascunho.",
    };
  }

  revalidatePath("/admin/veiculos");
  redirect(`/admin/veiculos/${newId}/editar`);
}

/** "Salvar rascunho" a partir da edição — mantém status rascunho, validação permissiva. */
export async function saveVehicleDraft(id: string, values: VehicleDraftSchema): Promise<ActionResult> {
  const parsed = vehicleDraftSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();

  try {
    const baseSlug = slugify(parsed.data.slug?.trim() || fallbackSlug(parsed.data));
    const uniqueSlug = await ensureUniqueSlug(supabase, baseSlug, id);

    const { error } = await supabase
      .from("vehicles")
      .update({ ...toRowPayload(parsed.data), slug: uniqueSlug, status: "rascunho" })
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Falha ao salvar rascunho.",
    };
  }

  revalidatePath("/admin/veiculos");
  revalidatePath(`/admin/veiculos/${id}/editar`);
  revalidatePath("/");
  revalidatePath("/estoque");
  return { success: true };
}

export type PublishStatus = Exclude<VehicleStatus, "rascunho">;

/** "Publicar" / "Salvar alterações" — exige campos essenciais e ao menos 1 foto. */
export async function publishVehicle(
  id: string,
  values: VehicleDraftSchema,
  status: PublishStatus,
): Promise<ActionResult> {
  const parsed = vehiclePublishSchema.omit({ images: true }).safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Preencha os campos obrigatórios.",
    };
  }

  const supabase = await createClient();

  const { count: imageCount, error: imagesError } = await supabase
    .from("vehicle_images")
    .select("id", { count: "exact", head: true })
    .eq("vehicle_id", id);

  if (imagesError) {
    return { success: false, error: `Falha ao verificar fotos: ${imagesError.message}` };
  }
  if (!imageCount) {
    return { success: false, error: "Adicione ao menos uma foto antes de publicar." };
  }

  try {
    const uniqueSlug = await ensureUniqueSlug(supabase, slugify(parsed.data.slug), id);

    const { error } = await supabase
      .from("vehicles")
      .update({ ...toRowPayload(parsed.data), slug: uniqueSlug, status })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/veiculos");
    revalidatePath(`/admin/veiculos/${id}/editar`);
    revalidatePath("/");
    revalidatePath("/estoque");
    revalidatePath(`/estoque/${uniqueSlug}`);
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Falha ao publicar." };
  }

  return { success: true };
}

/**
 * Ações rápidas da tabela: reservar, vender, republicar, voltar a rascunho.
 * Usada direto como `<form action={setVehicleStatus.bind(null, id, status)}>` —
 * por isso `Promise<void>` (o tipo de `action` de um form não aceita retorno);
 * erro real joga exceção, que o Next mostra via error boundary.
 */
export async function setVehicleStatus(id: string, status: VehicleStatus): Promise<void> {
  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("vehicles")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw new Error(fetchError.message);

  const { error } = await supabase.from("vehicles").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/veiculos");
  revalidatePath("/");
  revalidatePath("/estoque");
  if (existing?.slug) revalidatePath(`/estoque/${existing.slug}`);
}

export async function toggleVehicleFeatured(id: string, featured: boolean): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").update({ featured }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/veiculos");
  revalidatePath("/");
}

/** Remove o veículo, as fotos no banco e os arquivos no Storage. */
export async function deleteVehicle(id: string): Promise<void> {
  const supabase = await createClient();

  const { data: vehicle, error: fetchError } = await supabase
    .from("vehicles")
    .select("slug, vehicle_images ( storage_path )")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw new Error(fetchError.message);

  const paths = (vehicle?.vehicle_images ?? []).map((image) => image.storage_path);
  if (paths.length > 0) {
    await supabase.storage.from(VEHICLE_BUCKET).remove(paths);
  }

  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/veiculos");
  revalidatePath("/");
  revalidatePath("/estoque");
  if (vehicle?.slug) revalidatePath(`/estoque/${vehicle.slug}`);
}
