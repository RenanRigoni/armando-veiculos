"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import type { FieldPath, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/Field";
import { CategoryFields } from "@/components/admin/CategoryFields";
import { createVehicleDraft, publishVehicle, saveVehicleDraft } from "@/data/vehicles.admin";
import type { PublishStatus } from "@/data/vehicles.admin";
import { buildVehicleSlug } from "@/lib/slug";
import {
  vehicleDraftSchema,
  vehiclePublishSchema,
  type VehicleDraftSchema,
} from "@/schemas/vehicle";
import { CATEGORY_LABELS } from "@/types/vehicle";
import type { AdminVehicle, VehicleCategory } from "@/types/vehicle";

const PUBLISH_STATUS_OPTIONS: { value: PublishStatus; label: string }[] = [
  { value: "ativo", label: "Ativo" },
  { value: "reservado", label: "Reservado" },
  { value: "vendido", label: "Vendido" },
];

function buildDefaultValues(vehicle?: AdminVehicle): VehicleDraftSchema {
  return {
    category: vehicle?.category ?? "carros",
    slug: vehicle?.slug ?? "",
    make: vehicle?.make ?? "",
    model: vehicle?.model ?? "",
    version: vehicle?.version ?? "",
    title: vehicle?.title ?? "",
    yearManufacture: vehicle?.yearManufacture ?? undefined,
    yearModel: vehicle?.yearModel ?? undefined,
    price: vehicle?.price ?? undefined,
    previousPrice: vehicle?.previousPrice ?? undefined,
    mileage: vehicle?.mileage ?? undefined,
    engineHours: vehicle?.engineHours ?? undefined,
    transmission: vehicle?.transmission ?? "",
    fuel: vehicle?.fuel ?? "",
    engine: vehicle?.engine ?? "",
    engineDisplacement: vehicle?.engineDisplacement ?? undefined,
    bodyType: vehicle?.bodyType ?? "",
    doors: vehicle?.doors ?? undefined,
    color: vehicle?.color ?? "",
    condition: vehicle?.condition ?? "",
    description: vehicle?.description ?? "",
    financingNote: vehicle?.financingNote ?? "",
  };
}

function parseFeatures(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function VehicleForm({ vehicle }: { vehicle?: AdminVehicle }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [featuresText, setFeaturesText] = useState(vehicle?.features.join("\n") ?? "");
  const [statusChoice, setStatusChoice] = useState<PublishStatus>(
    vehicle && vehicle.status !== "rascunho" ? vehicle.status : "ativo",
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    setFocus,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<VehicleDraftSchema>({
    // `@hookform/resolvers` e `react-hook-form` divergem no shape genérico do
    // Resolver com schemas zod v4 complexos — funciona em runtime, só o tipo bate errado.
    resolver: zodResolver(vehicleDraftSchema) as unknown as Resolver<VehicleDraftSchema>,
    defaultValues: buildDefaultValues(vehicle),
  });

  const category = useWatch({ control, name: "category" }) ?? "carros";

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (isDirty) event.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function handleGenerateSlug() {
    const values = getValues();
    const generated = buildVehicleSlug({
      make: values.make,
      model: values.model,
      version: values.version,
      yearModel: values.yearModel,
    });
    if (generated) setValue("slug", generated, { shouldDirty: true });
  }

  function onSaveDraft(values: VehicleDraftSchema) {
    const payload = { ...values, features: parseFeatures(featuresText) };
    startTransition(async () => {
      const result = vehicle
        ? await saveVehicleDraft(vehicle.id, payload)
        : await createVehicleDraft(payload);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Rascunho salvo.");
      router.refresh();
    });
  }

  function onPublish(values: VehicleDraftSchema) {
    if (!vehicle) return;

    const parsed = vehiclePublishSchema.omit({ images: true }).safeParse(values);
    if (!parsed.success) {
      clearErrors();
      const fieldIssues = parsed.error.issues.filter(
        (issue) => typeof issue.path[0] === "string",
      );

      fieldIssues.forEach((issue) => {
        setError(issue.path[0] as FieldPath<VehicleDraftSchema>, {
          type: "manual",
          message: issue.message,
        });
      });

      const firstField = fieldIssues[0]?.path[0];
      if (typeof firstField === "string") {
        setFocus(firstField as FieldPath<VehicleDraftSchema>);
      }
      toast.error("Revise os campos obrigatórios destacados.");
      return;
    }

    const payload = { ...values, features: parseFeatures(featuresText) };
    startTransition(async () => {
      const result = await publishVehicle(vehicle.id, payload, statusChoice);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(vehicle.status === "rascunho" ? "Veículo publicado." : "Alterações salvas.");
      router.refresh();
    });
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-8">
      <section className="border-border bg-surface grid grid-cols-1 gap-4 rounded-md border p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select id="category" {...register("category")}>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value as VehicleCategory}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="make">Marca</Label>
          <Input
            id="make"
            aria-invalid={Boolean(errors.make)}
            aria-describedby={errors.make ? "make-error" : undefined}
            {...register("make")}
          />
          <FieldError id="make-error">{errors.make?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="model">Modelo</Label>
          <Input
            id="model"
            aria-invalid={Boolean(errors.model)}
            aria-describedby={errors.model ? "model-error" : undefined}
            {...register("model")}
          />
          <FieldError id="model-error">{errors.model?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="version">Versão</Label>
          <Input id="version" {...register("version")} />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <Label htmlFor="title">Título de exibição</Label>
          <Input
            id="title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            {...register("title")}
          />
          <FieldError id="title-error">{errors.title?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <div className="flex gap-2">
            <Input
              id="slug"
              aria-invalid={Boolean(errors.slug)}
              aria-describedby={errors.slug ? "slug-error" : undefined}
              {...register("slug")}
            />
            <Button type="button" variant="secondary" size="md" onClick={handleGenerateSlug}>
              Gerar
            </Button>
          </div>
          <FieldError id="slug-error">{errors.slug?.message}</FieldError>
        </div>
      </section>

      <section className="border-border bg-surface grid grid-cols-1 gap-4 rounded-md border p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label htmlFor="yearManufacture">Ano de fabricação</Label>
          <Input
            id="yearManufacture"
            type="number"
            inputMode="numeric"
            aria-invalid={Boolean(errors.yearManufacture)}
            aria-describedby={errors.yearManufacture ? "year-manufacture-error" : undefined}
            {...register("yearManufacture")}
          />
          <FieldError id="year-manufacture-error">
            {errors.yearManufacture?.message}
          </FieldError>
        </div>
        <div>
          <Label htmlFor="yearModel">Ano do modelo</Label>
          <Input
            id="yearModel"
            type="number"
            inputMode="numeric"
            aria-invalid={Boolean(errors.yearModel)}
            aria-describedby={errors.yearModel ? "year-model-error" : undefined}
            {...register("yearModel")}
          />
          <FieldError id="year-model-error">{errors.yearModel?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="color">Cor</Label>
          <Input id="color" {...register("color")} />
        </div>
        <div>
          <Label htmlFor="condition">Condição</Label>
          <Input id="condition" placeholder="Seminovo" {...register("condition")} />
        </div>
        <CategoryFields category={category} register={register} />
      </section>

      <section className="border-border bg-surface grid grid-cols-1 gap-4 rounded-md border p-6 sm:grid-cols-3">
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            inputMode="numeric"
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? "price-error" : undefined}
            {...register("price")}
          />
          <FieldError id="price-error">{errors.price?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="previousPrice">Preço anterior (opcional)</Label>
          <Input
            id="previousPrice"
            type="number"
            inputMode="numeric"
            aria-invalid={Boolean(errors.previousPrice)}
            aria-describedby={errors.previousPrice ? "previous-price-error" : undefined}
            {...register("previousPrice")}
          />
          <FieldError id="previous-price-error">{errors.previousPrice?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="financingNote">Observação de financiamento (opcional)</Label>
          <Input id="financingNote" {...register("financingNote")} />
        </div>
      </section>

      <section className="border-border bg-surface flex flex-col gap-4 rounded-md border p-6">
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" rows={4} {...register("description")} />
        </div>
        <div>
          <Label htmlFor="features">Itens e equipamentos</Label>
          <Textarea
            id="features"
            rows={5}
            value={featuresText}
            onChange={(event) => setFeaturesText(event.target.value)}
            placeholder={"Um item por linha, ex.:\nAr-condicionado digital\nCâmera de ré"}
          />
        </div>
      </section>

      {vehicle ? (
        <section className="border-border bg-surface flex flex-col gap-4 rounded-md border p-6">
          <Label htmlFor="internalNotes">Observações internas (nunca aparecem no site)</Label>
          <Textarea id="internalNotes" rows={3} defaultValue={vehicle.internalNotes ?? ""} disabled />
          <p className="text-fg-muted text-xs">
            Edição de observações internas entra numa próxima fase. Hoje é só leitura.
          </p>
        </section>
      ) : null}

      <div className="border-border bg-surface sticky bottom-0 flex flex-wrap items-center justify-end gap-3 rounded-md border p-4">
        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={handleSubmit(onSaveDraft)}
        >
          Salvar rascunho
        </Button>

        {vehicle ? (
          <>
            <Select
              aria-label="Status ao salvar"
              value={statusChoice}
              onChange={(event) => setStatusChoice(event.target.value as PublishStatus)}
              className="h-11 w-auto"
            >
              {PUBLISH_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Button type="button" disabled={isPending} onClick={handleSubmit(onPublish)}>
              {vehicle.status === "rascunho" ? "Publicar" : "Salvar alterações"}
            </Button>
          </>
        ) : null}
      </div>
    </form>
  );
}
