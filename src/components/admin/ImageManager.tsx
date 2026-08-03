"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { ImagePlus } from "lucide-react";

import { ImageThumb } from "@/components/admin/ImageThumb";
import { compressToWebp, validateImageFile } from "@/lib/images";
import {
  deleteVehicleImage,
  reorderVehicleImages,
  setCoverImage,
  uploadVehicleImage,
} from "@/data/vehicleImages.admin";
import type { AdminVehicleImage } from "@/types/vehicle";

type UploadTask = {
  id: string;
  name: string;
  status: "compressing" | "uploading" | "done" | "error";
  error?: string;
};

type ImageManagerProps = {
  vehicleId: string;
  images: AdminVehicleImage[];
  coverImage: string;
};

export function ImageManager({ vehicleId, images, coverImage }: ImageManagerProps) {
  const router = useRouter();
  const [order, setOrder] = useState(images.map((image) => image.id));
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const [isReordering, setIsReordering] = useState(false);
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const orderedImages = order
    .map((id) => images.find((image) => image.id === id))
    .filter((image): image is AdminVehicleImage => Boolean(image));
  const knownIds = new Set(orderedImages.map((image) => image.id));
  const displayImages = [...orderedImages, ...images.filter((image) => !knownIds.has(image.id))];

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;

    for (const file of Array.from(fileList)) {
      const validationError = validateImageFile(file);
      if (validationError) {
        toast.error(validationError);
        continue;
      }

      const taskId = crypto.randomUUID();
      setTasks((current) => [...current, { id: taskId, name: file.name, status: "compressing" }]);

      try {
        const blob = await compressToWebp(file);
        setTasks((current) =>
          current.map((task) => (task.id === taskId ? { ...task, status: "uploading" } : task)),
        );

        const formData = new FormData();
        formData.set("file", new File([blob], `${taskId}.webp`, { type: "image/webp" }));

        const result = await uploadVehicleImage(vehicleId, formData);
        if (!result.success) throw new Error(result.error);

        setTasks((current) =>
          current.map((task) => (task.id === taskId ? { ...task, status: "done" } : task)),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : "Falha ao enviar foto.";
        setTasks((current) =>
          current.map((task) => (task.id === taskId ? { ...task, status: "error", error: message } : task)),
        );
        toast.error(message);
      }
    }

    router.refresh();
  }

  function handleDragEnd(event: DragEndEvent) {
    if (isReordering) return;

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const previous = displayImages.map((image) => image.id);
    const oldIndex = previous.indexOf(String(active.id));
    const newIndex = previous.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    const next = arrayMove(previous, oldIndex, newIndex);
    setOrder(next);
    setIsReordering(true);

    startTransition(async () => {
      try {
        const result = await reorderVehicleImages(vehicleId, next);
        if (!result.success) {
          setOrder(previous);
          toast.error(result.error);
          return;
        }

        router.refresh();
      } catch (error) {
        setOrder(previous);
        toast.error(error instanceof Error ? error.message : "Falha ao reordenar as fotos.");
      } finally {
        setIsReordering(false);
      }
    });
  }

  async function handleSetCover(image: AdminVehicleImage) {
    const result = await setCoverImage(vehicleId, image.storagePath);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Capa definida.");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-5">
      <label className="border-border hover:border-brand flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed p-8 text-center">
        <ImagePlus size={28} className="text-fg-muted" aria-hidden />
        <span className="text-fg-muted text-sm">Clique para escolher fotos (JPG, PNG ou WebP)</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(event) => {
            void handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </label>

      {tasks.length > 0 ? (
        <ul
          className="flex flex-col gap-1 text-sm"
          aria-label="Progresso do envio das fotos"
          aria-live="polite"
        >
          {tasks.map((task) => (
            <li key={task.id} className="text-fg-muted flex items-center gap-2">
              <span className="truncate">{task.name}</span>
              <span className="text-xs">
                {task.status === "compressing" ? "comprimindo…" : null}
                {task.status === "uploading" ? "enviando…" : null}
                {task.status === "done" ? "concluído" : null}
                {task.status === "error" ? `erro: ${task.error}` : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {displayImages.length === 0 ? (
        <p className="text-fg-muted text-sm">Nenhuma foto ainda.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={displayImages.map((image) => image.id)}
            strategy={horizontalListSortingStrategy}
          >
            <ul className="flex flex-wrap gap-4">
              {displayImages.map((image) => (
                <ImageThumb
                  key={image.id}
                  image={image}
                  isCover={image.url === coverImage}
                  isReordering={isReordering}
                  onSetCover={() => handleSetCover(image)}
                  onDelete={deleteVehicleImage.bind(null, vehicleId, image.id, image.storagePath)}
                />
              ))}
            </ul>
          </SortableContext>
          <p className="sr-only" aria-live="polite">
            {isReordering ? "Salvando nova ordem das fotos" : ""}
          </p>
        </DndContext>
      )}
    </div>
  );
}
