import { Badge } from "@/components/ui/Badge";
import { STATUS_LABELS } from "@/types/vehicle";
import type { VehicleStatus } from "@/types/vehicle";

const TONES: Record<VehicleStatus, "muted" | "brand" | "warning" | "success"> = {
  rascunho: "muted",
  ativo: "success",
  reservado: "warning",
  vendido: "muted",
};

export function StatusBadge({ status }: { status: VehicleStatus }) {
  return <Badge tone={TONES[status]}>{STATUS_LABELS[status]}</Badge>;
}
