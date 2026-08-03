import type { Metadata } from "next";
import { Car, Bike, CheckCircle2, Clock3, ExternalLink, FileText, PackageCheck, Plus, Sailboat } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { StatCard } from "@/components/admin/StatCard";
import { VehicleTable } from "@/components/admin/VehicleTable";
import { getInventoryStats } from "@/data/vehicles";
import { getAdminVehicles } from "@/data/vehicles.admin";

export const metadata: Metadata = { title: "Painel" };

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([
    getInventoryStats(),
    getAdminVehicles({}, { page: 1, perPage: 5 }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Painel</h1>
          <p className="text-fg-muted mt-1 text-sm">Visão geral do estoque.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/admin/veiculos/novo">
            <Plus size={16} aria-hidden />
            Cadastrar veículo
          </ButtonLink>
          <ButtonLink href="/" variant="secondary" target="_blank" rel="noopener noreferrer">
            Ver estoque público
            <ExternalLink size={16} aria-hidden />
          </ButtonLink>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard label="Ativos" value={stats.active} icon={CheckCircle2} />
        <StatCard label="Carros" value={stats.carros} icon={Car} />
        <StatCard label="Motos" value={stats.motos} icon={Bike} />
        <StatCard label="Náutica" value={stats.nautica} icon={Sailboat} />
        <StatCard label="Reservados" value={stats.reserved} icon={Clock3} />
        <StatCard label="Vendidos" value={stats.sold} icon={PackageCheck} />
        <StatCard label="Rascunhos" value={stats.drafts} icon={FileText} />
      </div>

      <div>
        <h2 className="mb-4 text-xl">Adicionados recentemente</h2>
        <VehicleTable vehicles={recent.items} />
      </div>
    </div>
  );
}
