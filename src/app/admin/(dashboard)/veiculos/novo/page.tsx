import type { Metadata } from "next";

import { VehicleForm } from "@/components/admin/VehicleForm";

export const metadata: Metadata = { title: "Cadastrar veículo" };

export default function NewVehiclePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl">Cadastrar veículo</h1>
        <p className="text-fg-muted mt-1 text-sm">
          Salve como rascunho pra depois subir fotos e publicar.
        </p>
      </div>
      <VehicleForm />
    </div>
  );
}
