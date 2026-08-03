import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Star, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { AdminVehicleImage } from "@/types/vehicle";

type ImageThumbProps = {
  image: AdminVehicleImage;
  isCover: boolean;
  isReordering: boolean;
  onSetCover: () => void;
  onDelete: (formData: FormData) => void | Promise<void>;
};

export function ImageThumb({
  image,
  isCover,
  isReordering,
  onSetCover,
  onDelete,
}: ImageThumbProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
    disabled: isReordering,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="border-border bg-ink relative w-32 shrink-0 overflow-hidden rounded-sm border"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={image.url}
          alt={image.alt?.trim() || "Foto cadastrada do veículo"}
          fill
          sizes="128px"
          className="object-cover"
        />
        {isCover ? (
          <span className="bg-brand text-fg absolute top-1 left-1 rounded-sm px-1.5 py-0.5 text-[10px] tracking-wide uppercase">
            Capa
          </span>
        ) : null}
        <button
          type="button"
          {...attributes}
          {...listeners}
          disabled={isReordering}
          className="bg-ink/70 text-fg absolute top-1 right-1 flex size-11 items-center justify-center rounded-sm disabled:cursor-wait disabled:opacity-60"
          aria-label={`Reordenar ${image.alt?.trim() || "foto do veículo"}`}
        >
          <GripVertical size={14} aria-hidden />
        </button>
      </div>
      <div className="flex items-center justify-between gap-1 p-1.5">
        <button
          type="button"
          onClick={onSetCover}
          disabled={isCover}
          className="text-fg-muted hover:text-brand-text disabled:text-brand-text flex min-h-11 items-center gap-1 px-1 text-xs"
          aria-label={isCover ? "Esta foto já é a capa" : "Definir esta foto como capa"}
        >
          <Star size={12} aria-hidden />
          Capa
        </button>
        <ConfirmDialog
          action={onDelete}
          title="Excluir foto"
          description="Essa foto será removida permanentemente."
          confirmLabel="Excluir foto"
          trigger={
            <span className="flex size-11 items-center justify-center">
              <Trash2 size={14} aria-hidden />
              <span className="sr-only">Excluir foto</span>
            </span>
          }
        />
      </div>
    </li>
  );
}
