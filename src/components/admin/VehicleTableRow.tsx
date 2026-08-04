import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Pencil, Star } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { deleteVehicle, setVehicleStatus, toggleVehicleFeatured } from "@/data/vehicles.admin";
import { formatBRL, formatDate, formatYearPair } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types/vehicle";
import type { AdminVehicle, VehicleStatus } from "@/types/vehicle";

function isPublishReady(vehicle: AdminVehicle): boolean {
  return Boolean(
    vehicle.slug &&
      vehicle.make &&
      vehicle.model &&
      vehicle.title &&
      vehicle.yearManufacture &&
      vehicle.yearModel &&
      vehicle.price &&
      vehicle.images.length > 0,
  );
}

function StatusAction({
  vehicleId,
  status,
  label,
}: {
  vehicleId: string;
  status: VehicleStatus;
  label: string;
}) {
  return (
    <form action={setVehicleStatus.bind(null, vehicleId, status)}>
      <button
        type="submit"
        className="border-border text-fg-muted hover:border-brand hover:text-brand-text min-h-11 rounded-sm border px-2.5 text-xs whitespace-nowrap"
      >
        {label}
      </button>
    </form>
  );
}

function StatusActions({ vehicle }: { vehicle: AdminVehicle }) {
  const actions = (() => {
    switch (vehicle.status) {
      case "rascunho":
        return isPublishReady(vehicle) ? (
          <StatusAction vehicleId={vehicle.id} status="ativo" label="Publicar" />
        ) : null;
      case "ativo":
        return (
          <>
            <StatusAction vehicleId={vehicle.id} status="reservado" label="Reservar" />
            <StatusAction vehicleId={vehicle.id} status="vendido" label="Marcar vendido" />
            <StatusAction vehicleId={vehicle.id} status="rascunho" label="Desativar" />
          </>
        );
      case "reservado":
        return (
          <>
            <StatusAction vehicleId={vehicle.id} status="ativo" label="Reativar" />
            <StatusAction vehicleId={vehicle.id} status="vendido" label="Marcar vendido" />
            <StatusAction vehicleId={vehicle.id} status="rascunho" label="Desativar" />
          </>
        );
      case "vendido":
        return (
          <>
            <StatusAction vehicleId={vehicle.id} status="ativo" label="Reativar" />
            <StatusAction vehicleId={vehicle.id} status="rascunho" label="Desativar" />
          </>
        );
      default:
        return null;
    }
  })();

  if (!actions) return null;

  return <div className="flex flex-wrap items-center gap-2">{actions}</div>;
}

export function VehicleTableRow({ vehicle }: { vehicle: AdminVehicle }) {
  const isPublic = vehicle.status === "ativo" || vehicle.status === "reservado";
  const title =
    vehicle.title ?? ([vehicle.make, vehicle.model].filter(Boolean).join(" ") || "(sem título)");
  const years = formatYearPair(vehicle.yearManufacture, vehicle.yearModel);
  const price = formatBRL(vehicle.price);

  return (
    <tr className="border-border border-b last:border-0">
      <td className="px-4 py-3">
        <div className="bg-surface-2 relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
          <Image
            src={vehicle.coverImage}
            alt={`Foto de ${title}`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="normal-case">{title}</p>
        {years ? <p className="text-fg-muted text-xs">{years}</p> : null}
      </td>
      <td className="text-fg-muted px-4 py-3 text-sm">{CATEGORY_LABELS[vehicle.category]}</td>
      <td className="px-4 py-3 text-sm">
        {price ?? <span className="sr-only">Preço não informado</span>}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={vehicle.status} />
      </td>
      <td className="px-4 py-3">
        <form action={toggleVehicleFeatured.bind(null, vehicle.id, !vehicle.featured)}>
          <button
            type="submit"
            aria-label={vehicle.featured ? "Remover destaque" : "Marcar como destaque"}
            aria-pressed={vehicle.featured}
            className="flex size-11 items-center justify-center"
          >
            <Star
              size={18}
              className={cn(vehicle.featured ? "fill-brand text-brand" : "text-fg-muted")}
              aria-hidden
            />
          </button>
        </form>
      </td>
      <td className="text-fg-muted px-4 py-3 text-sm whitespace-nowrap">
        {formatDate(vehicle.updatedAt)}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href={`/admin/veiculos/${vehicle.id}/editar`}
              className="text-fg-muted hover:text-brand-text flex min-h-11 items-center gap-1 text-sm"
            >
              <Pencil size={14} aria-hidden />
              Editar
            </Link>
            {isPublic && vehicle.slug ? (
              <Link
                href={`/estoque/${vehicle.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-brand-text flex min-h-11 items-center gap-1 text-sm"
              >
                <ExternalLink size={14} aria-hidden />
                Ver no site
              </Link>
            ) : null}
          </div>
          <StatusActions vehicle={vehicle} />
          <ConfirmDialog
            action={deleteVehicle.bind(null, vehicle.id)}
            title="Excluir veículo"
            description={`"${title}" e todas as fotos serão removidos permanentemente.`}
          />
        </div>
      </td>
    </tr>
  );
}
