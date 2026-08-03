import { VehicleTableRow } from "@/components/admin/VehicleTableRow";
import type { AdminVehicle } from "@/types/vehicle";

const COLUMNS = ["Foto", "Veículo", "Categoria", "Preço", "Status", "Destaque", "Atualizado", "Ações"];

export function VehicleTable({ vehicles }: { vehicles: AdminVehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="border-border bg-surface rounded-md border border-dashed px-6 py-12 text-center">
        <p className="text-fg-muted text-sm">Nenhum veículo encontrado.</p>
      </div>
    );
  }

  return (
    <div className="border-border bg-surface overflow-x-auto rounded-md border">
      <table className="w-full min-w-[820px] text-left">
        <thead>
          <tr className="border-border text-fg-muted border-b text-xs tracking-wide uppercase">
            {COLUMNS.map((column) => (
              <th key={column} className="px-4 py-3 font-normal">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="px-4">
          {vehicles.map((vehicle) => (
            <VehicleTableRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
