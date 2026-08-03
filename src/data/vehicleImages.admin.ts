"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { buildStoragePath, VEHICLE_BUCKET } from "@/lib/images";
import type { ActionResult } from "@/data/vehicles.admin";

/**
 * Gestão de fotos do veículo — upload já chega comprimido em WebP do cliente
 * (lib/images.ts `compressToWebp`), então aqui só sobe o arquivo e grava a linha.
 */

function revalidateVehiclePaths(vehicleId: string) {
  revalidatePath(`/admin/veiculos/${vehicleId}/editar`);
  revalidatePath("/admin/veiculos");
  revalidatePath("/");
  revalidatePath("/estoque");
}

export async function uploadVehicleImage(
  vehicleId: string,
  formData: FormData,
): Promise<ActionResult> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false, error: "Nenhum arquivo recebido." };
  }

  const supabase = await createClient();
  const storagePath = buildStoragePath(vehicleId);

  const { error: uploadError } = await supabase.storage
    .from(VEHICLE_BUCKET)
    .upload(storagePath, file, { contentType: "image/webp" });
  if (uploadError) return { success: false, error: uploadError.message };

  const { data: existingImages, error: countError } = await supabase
    .from("vehicle_images")
    .select("sort_order")
    .eq("vehicle_id", vehicleId)
    .order("sort_order", { ascending: false })
    .limit(1);
  if (countError) return { success: false, error: countError.message };

  const nextSortOrder = (existingImages?.[0]?.sort_order ?? -1) + 1;

  const { error: insertError } = await supabase
    .from("vehicle_images")
    .insert({ vehicle_id: vehicleId, storage_path: storagePath, sort_order: nextSortOrder });
  if (insertError) return { success: false, error: insertError.message };

  if (nextSortOrder === 0) {
    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("cover_image")
      .eq("id", vehicleId)
      .maybeSingle();

    if (!vehicle?.cover_image) {
      await supabase.from("vehicles").update({ cover_image: storagePath }).eq("id", vehicleId);
    }
  }

  revalidateVehiclePaths(vehicleId);
  return { success: true };
}

/** Usada via `<form action={deleteVehicleImage.bind(null, ...)}>` — por isso `Promise<void>`. */
export async function deleteVehicleImage(
  vehicleId: string,
  imageId: string,
  storagePath: string,
): Promise<void> {
  const supabase = await createClient();

  const { error: removeError } = await supabase.storage.from(VEHICLE_BUCKET).remove([storagePath]);
  if (removeError) throw new Error(removeError.message);

  const { error: deleteError } = await supabase.from("vehicle_images").delete().eq("id", imageId);
  if (deleteError) throw new Error(deleteError.message);

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("cover_image")
    .eq("id", vehicleId)
    .maybeSingle();

  if (vehicle?.cover_image === storagePath) {
    const { data: remaining } = await supabase
      .from("vehicle_images")
      .select("storage_path")
      .eq("vehicle_id", vehicleId)
      .order("sort_order", { ascending: true })
      .limit(1);

    await supabase
      .from("vehicles")
      .update({ cover_image: remaining?.[0]?.storage_path ?? null })
      .eq("id", vehicleId);
  }

  revalidateVehiclePaths(vehicleId);
}

export async function reorderVehicleImages(
  vehicleId: string,
  orderedIds: string[],
): Promise<ActionResult> {
  const supabase = await createClient();

  const updates = orderedIds.map((imageId, index) =>
    supabase.from("vehicle_images").update({ sort_order: index }).eq("id", imageId),
  );
  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);
  if (failed?.error) return { success: false, error: failed.error.message };

  revalidateVehiclePaths(vehicleId);
  return { success: true };
}

export async function setCoverImage(vehicleId: string, storagePath: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("vehicles")
    .update({ cover_image: storagePath })
    .eq("id", vehicleId);
  if (error) return { success: false, error: error.message };

  revalidateVehiclePaths(vehicleId);
  return { success: true };
}
