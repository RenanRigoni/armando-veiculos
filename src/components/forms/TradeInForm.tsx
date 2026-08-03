"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/Field";
import { messages, whatsappLinks } from "@/lib/whatsapp";
import type { VehicleRef } from "@/lib/whatsapp";
import { tradeInSchema, type TradeInSchema } from "@/schemas/leads";

type TradeInFormProps = {
  /** Quando aberto a partir da página de um veículo, entra na mensagem enviada. */
  vehicle?: VehicleRef;
};

export function TradeInForm({ vehicle }: TradeInFormProps) {
  const idPrefix = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TradeInSchema>({
    resolver: zodResolver(tradeInSchema),
  });

  function onSubmit(values: TradeInSchema) {
    const url = whatsappLinks.sales(messages.tradeIn(values, vehicle));
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Redirecionando para o WhatsApp com os dados da avaliação.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor={`${idPrefix}-name`}>Nome</Label>
        <Input
          id={`${idPrefix}-name`}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
          {...register("name")}
        />
        <FieldError id={`${idPrefix}-name-error`}>{errors.name?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-whatsapp`}>WhatsApp</Label>
        <Input
          id={`${idPrefix}-whatsapp`}
          inputMode="tel"
          autoComplete="tel"
          placeholder="(18) 90000-0000"
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={errors.whatsapp ? `${idPrefix}-whatsapp-error` : undefined}
          {...register("whatsapp")}
        />
        <FieldError id={`${idPrefix}-whatsapp-error`}>{errors.whatsapp?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-make`}>Marca</Label>
        <Input
          id={`${idPrefix}-make`}
          aria-invalid={Boolean(errors.make)}
          aria-describedby={errors.make ? `${idPrefix}-make-error` : undefined}
          {...register("make")}
        />
        <FieldError id={`${idPrefix}-make-error`}>{errors.make?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-model`}>Modelo</Label>
        <Input
          id={`${idPrefix}-model`}
          aria-invalid={Boolean(errors.model)}
          aria-describedby={errors.model ? `${idPrefix}-model-error` : undefined}
          {...register("model")}
        />
        <FieldError id={`${idPrefix}-model-error`}>{errors.model?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-year`}>Ano</Label>
        <Input
          id={`${idPrefix}-year`}
          inputMode="numeric"
          placeholder="2020"
          aria-invalid={Boolean(errors.year)}
          aria-describedby={errors.year ? `${idPrefix}-year-error` : undefined}
          {...register("year")}
        />
        <FieldError id={`${idPrefix}-year-error`}>{errors.year?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-mileage`}>Quilometragem</Label>
        <Input
          id={`${idPrefix}-mileage`}
          inputMode="numeric"
          placeholder="45000"
          {...register("mileage")}
        />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor={`${idPrefix}-message`}>Mensagem (opcional)</Label>
        <Textarea
          id={`${idPrefix}-message`}
          rows={3}
          placeholder="Conte mais sobre o estado do veículo, quilometragem, etc."
          {...register("message")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="sm:col-span-2">
        Solicitar avaliação
      </Button>
    </form>
  );
}
