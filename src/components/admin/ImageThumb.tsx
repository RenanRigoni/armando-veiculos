import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Star, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { AdminVehicleImage } from "@/types/vehicle";

type ImageThumbProps = {
  image: AdminVehicleImage;
  isCover: boolean;
  onSetCover: () => void;
  onDelete: (formData: FormData) => void | Promise<void>;
};

export function ImageThumb({ image, isCover, onSetCover, onDelete }: ImageThumbProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
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
        <Image src={image.url} alt={image.alt ?? ""} fill sizes="128px" className="object-cover" />
        {isCover ? (
          <span className="bg-brand absolute top-1 left-1 rounded-sm px-1.5 py-0.5 text-[10px] tracking-wide text-white uppercase">
            Capa
          </span>
        ) : null}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="bg-ink/70 absolute top-1 right-1 rounded-sm p-1 text-white"
          aria-label="Arrastar para reordenar"
        >
          <GripVertical size={14} aria-hidden />
        </button>
      </div>
      <div className="flex items-center justify-between gap-1 p-1.5">
        <button
          type="button"
          onClick={onSetCover}
          disabled={isCover}
          className="text-fg-muted hover:text-brand disabled:text-brand flex items-center gap-1 text-xs"
        >
          <Star size={12} aria-hidden />
          Capa
        </button>
        <ConfirmDialog
          action={onDelete}
          title="Excluir foto"
          description="Essa foto será removida permanentemente."
          confirmLabel="Excluir foto"
          trigger={<Trash2 size={14} aria-hidden />}
        />
      </div>
    </li>
  );
}
