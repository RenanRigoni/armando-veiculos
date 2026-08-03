import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { VehicleTable } from "@/components/admin/VehicleTable";
import { getAdminVehicles } from "@/data/vehicles.admin";
import { CATEGORY_LABELS, STATUS_LABELS, isVehicleCategory } from "@/types/vehicle";
import type { VehicleStatus } from "@/types/vehicle";

export const metadata: Metadata = { title: "Veículos" };

const PER_PAGE = 20;
const STATUS_VALUES: VehicleStatus[] = ["rascunho", "ativo", "reservado", "vendido"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isVehicleStatus(value: string): value is VehicleStatus {
  return (STATUS_VALUES as string[]).includes(value);
}

type SearchParams = Record<string, string | string[] | undefined>;

export default async function AdminVehiclesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = first(params.q) ?? "";
  const categoria = first(params.categoria);
  const status = first(params.status);
  const page = Number(first(params.page)) || 1;

  const { items, total } = await getAdminVehicles(
    {
      query: q || undefined,
      category: categoria && isVehicleCategory(categoria) ? categoria : undefined,
      status: status && isVehicleStatus(status) ? status : undefined,
    },
    { page, perPage: PER_PAGE },
  );

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Veículos</h1>
          <p className="text-fg-muted mt-1 text-sm">{total} no total</p>
        </div>
        <ButtonLink href="/admin/veiculos/novo">
          <Plus size={16} aria-hidden />
          Cadastrar veículo
        </ButtonLink>
      </div>

      <form
        method="GET"
        className="border-border bg-surface flex flex-wrap items-center gap-3 rounded-md border p-4"
      >
        <Input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por marca, modelo ou versão"
          aria-label="Buscar veículos"
          className="h-10 min-w-[220px] flex-1"
        />
        <Select name="categoria" defaultValue={categoria ?? ""} aria-label="Categoria" className="h-10 w-auto">
          <option value="">Todas categorias</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select name="status" defaultValue={status ?? ""} aria-label="Status" className="h-10 w-auto">
          <option value="">Todos status</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <button
          type="submit"
          className="bg-brand hover:bg-brand-bright h-10 rounded-sm px-4 text-sm text-white"
        >
          Filtrar
        </button>
      </form>

      <VehicleTable vehicles={items} />

      {totalPages > 1 ? (
        <nav aria-label="Paginação" className="flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const qs = new URLSearchParams();
            if (q) qs.set("q", q);
            if (categoria) qs.set("categoria", categoria);
            if (status) qs.set("status", status);
            if (pageNumber > 1) qs.set("page", String(pageNumber));
            const href = qs.toString() ? `/admin/veiculos?${qs}` : "/admin/veiculos";

            return (
              <Link
                key={pageNumber}
                href={href}
                className={pageNumber === page ? "text-brand text-sm" : "text-fg-muted text-sm"}
              >
                {pageNumber}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
