import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VehicleForm } from "@/components/admin/VehicleForm";
import { ImageManager } from "@/components/admin/ImageManager";
import { getAdminVehicleById } from "@/data/vehicles.admin";

type EditVehiclePageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar veículo" };

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const vehicle = await getAdminVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl normal-case">{vehicle.title ?? "Editar veículo"}</h1>
        <p className="text-fg-muted mt-1 text-sm">Slug: {vehicle.slug ?? "não definido"}</p>
      </div>

      <section className="border-border bg-surface rounded-md border p-6">
        <h2 className="mb-4 text-xl">Fotos</h2>
        <ImageManager vehicleId={vehicle.id} images={vehicle.images} coverImage={vehicle.coverImage} />
      </section>

      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
