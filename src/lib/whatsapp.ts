import { business, formatFullAddress, salesWhatsapp } from "@/config/business";
import { formatBRL, formatYearPair } from "@/lib/format";

/**
 * Toda saída de lead do site passa por aqui.
 * Nenhum componente deve montar URL "wa.me" à mão.
 */

export type ContactFormValues = {
  name: string;
  whatsapp: string;
  message?: string;
};

export type TradeInFormValues = ContactFormValues & {
  make?: string;
  model?: string;
  year?: string;
  mileage?: string;
};

export type FinancingFormValues = ContactFormValues & {
  downPayment?: string;
  term?: string;
};

/** Dados mínimos de veículo necessários para montar uma mensagem. */
export type VehicleRef = {
  title: string;
  slug: string;
  price?: number | null;
  yearManufacture?: number | null;
  yearModel?: number | null;
};

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function vehicleUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}/estoque/${slug}`;
}

function vehicleLabel(vehicle: VehicleRef): string {
  const years = formatYearPair(vehicle.yearManufacture, vehicle.yearModel);
  return years ? `${vehicle.title} ${years}` : vehicle.title;
}

function appendNotes(lines: string[], message?: string): string[] {
  return message?.trim() ? [...lines, "", `Observações: ${message.trim()}`] : lines;
}

export const messages = {
  /** CTA principal da página de veículo. */
  vehicleInterest(vehicle: VehicleRef): string {
    const price = formatBRL(vehicle.price ?? null);
    const lines = [
      `Olá! Tenho interesse no ${vehicleLabel(vehicle)} anunciado no site.`,
      price ? `Valor anunciado: ${price}.` : null,
      "Gostaria de mais informações.",
      vehicleUrl(vehicle.slug),
    ].filter(Boolean) as string[];
    return lines.join("\n");
  },

  financing(values: FinancingFormValues, vehicle?: VehicleRef): string {
    const lines = [
      `Olá, ${business.financing.contactName}! Quero simular um financiamento.`,
      "",
      `Nome: ${values.name}`,
      `WhatsApp: ${values.whatsapp}`,
      vehicle ? `Veículo: ${vehicleLabel(vehicle)}` : null,
      values.downPayment ? `Entrada desejada: ${values.downPayment}` : null,
      values.term ? `Prazo pretendido: ${values.term}` : null,
      vehicle ? vehicleUrl(vehicle.slug) : null,
    ].filter(Boolean) as string[];
    return appendNotes(lines, values.message).join("\n");
  },

  tradeIn(values: TradeInFormValues, vehicle?: VehicleRef): string {
    const lines = [
      "Olá! Quero uma avaliação do meu veículo.",
      "",
      `Nome: ${values.name}`,
      `WhatsApp: ${values.whatsapp}`,
      values.make ? `Marca: ${values.make}` : null,
      values.model ? `Modelo: ${values.model}` : null,
      values.year ? `Ano: ${values.year}` : null,
      values.mileage ? `Quilometragem: ${values.mileage}` : null,
      vehicle ? "" : null,
      vehicle ? `Tenho interesse no ${vehicleLabel(vehicle)}` : null,
      vehicle ? vehicleUrl(vehicle.slug) : null,
    ].filter((line) => line !== null) as string[];
    return appendNotes(lines, values.message).join("\n");
  },

  generalContact(values: ContactFormValues): string {
    const lines = [
      `Olá, ${business.name}! Vim pelo site.`,
      "",
      `Nome: ${values.name}`,
      `WhatsApp: ${values.whatsapp}`,
    ];
    return appendNotes(lines, values.message).join("\n");
  },

  /** CTA genérico do rodapé/hero, sem formulário. */
  quickContact(): string {
    return `Olá, ${business.name}! Vim pelo site e gostaria de falar com um consultor.`;
  },

  /** CTA rápido do bloco de consignação, sem formulário dedicado. */
  consignment(): string {
    return `Olá! Tenho interesse em consignar meu veículo na ${business.name}. Podem me passar mais informações?`;
  },

  /** CTA rápido do bloco de financiamento, sem formulário dedicado. */
  financingQuickInterest(): string {
    return `Olá, ${business.financing.contactName}! Quero simular um financiamento de veículo.`;
  },

  /** Pedido de rota até a loja. */
  directions(): string {
    return `Olá! Como chego até a loja em ${formatFullAddress()}?`;
  },
};

/** URLs prontas para os CTAs mais comuns. */
export const whatsappLinks = {
  sales: (message: string) => buildWhatsAppUrl(salesWhatsapp(), message),
  financing: (message: string) => buildWhatsAppUrl(business.financing.whatsapp, message),
};
