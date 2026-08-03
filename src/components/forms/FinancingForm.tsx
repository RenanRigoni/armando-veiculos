"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/Field";
import { messages, whatsappLinks } from "@/lib/whatsapp";
import type { VehicleRef } from "@/lib/whatsapp";
import { financingSchema, type FinancingSchema } from "@/schemas/leads";

type FinancingFormProps = {
  vehicle?: VehicleRef;
};

/**
 * Só qualifica o lead — nunca calcula ou promete taxa/parcela.
 * Submit abre WhatsApp com o contato de financiamento (Bruna).
 */
export function FinancingForm({ vehicle }: FinancingFormProps) {
  const idPrefix = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FinancingSchema>({
    resolver: zodResolver(financingSchema),
  });

  function onSubmit(values: FinancingSchema) {
    const url = whatsappLinks.financing(messages.financing(values, vehicle));
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Redirecionando para o WhatsApp com os dados do financiamento.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor={`${idPrefix}-name`}>Nome</Label>
        <Input id={`${idPrefix}-name`} autoComplete="name" {...register("name")} />
        <FieldError>{errors.name?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-whatsapp`}>WhatsApp</Label>
        <Input
          id={`${idPrefix}-whatsapp`}
          inputMode="tel"
          autoComplete="tel"
          placeholder="(18) 90000-0000"
          {...register("whatsapp")}
        />
        <FieldError>{errors.whatsapp?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-down`}>Entrada desejada (opcional)</Label>
        <Input id={`${idPrefix}-down`} placeholder="R$ 20.000" {...register("downPayment")} />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-term`}>Prazo pretendido (opcional)</Label>
        <Input id={`${idPrefix}-term`} placeholder="48x" {...register("term")} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor={`${idPrefix}-message`}>Mensagem (opcional)</Label>
        <Textarea id={`${idPrefix}-message`} rows={3} {...register("message")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="sm:col-span-2">
        Simular financiamento
      </Button>
    </form>
  );
}
