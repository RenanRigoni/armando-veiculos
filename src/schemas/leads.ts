import { z } from "zod";

/** Só dígitos, DDD + número — aceita o usuário digitar com máscara. */
function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

const namePattern = z.string().trim().min(2, "Informe seu nome.");
const whatsappPattern = z
  .string()
  .trim()
  .refine((value) => countDigits(value) >= 10, "Informe um WhatsApp válido com DDD.");

export const tradeInSchema = z.object({
  name: namePattern,
  whatsapp: whatsappPattern,
  make: z.string().trim().optional(),
  model: z.string().trim().optional(),
  year: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^\d{4}$/.test(value), "Use o formato AAAA."),
  mileage: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type TradeInSchema = z.infer<typeof tradeInSchema>;

export const financingSchema = z.object({
  name: namePattern,
  whatsapp: whatsappPattern,
  downPayment: z.string().trim().optional(),
  term: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type FinancingSchema = z.infer<typeof financingSchema>;
