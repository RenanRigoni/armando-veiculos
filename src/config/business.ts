/**
 * Fonte única de verdade dos dados do negócio.
 *
 * Nenhum telefone, endereço ou CNPJ pode ser escrito direto em componente —
 * tudo sai daqui. Só entram dados verificados; o que não foi confirmado fica
 * marcado como TODO e a UI omite a seção correspondente.
 */

export const business = {
  name: "Armando Veículos",
  legalName: "Armando Veículos",
  cnpj: "34.942.422/0001-26",

  address: {
    street: "Avenida São Paulo, 233",
    district: "Centro",
    city: "Mirandópolis",
    state: "SP",
    zip: "16800-025",
  },

  /** Telefone fixo da loja, exibido no site atual. */
  phone: {
    display: "(18) 3701-5015",
    href: "tel:+551837015015",
  },

  /**
   * TODO(dono): WhatsApp comercial de vendas não foi informado.
   * Enquanto não chegar, os CTAs de venda usam o contato de financiamento.
   * Substituir por "55" + DDD + número, só dígitos.
   */
  whatsappSales: null as string | null,

  /** Contato de financiamento verificado no site atual. */
  financing: {
    contactName: "Bruna",
    phoneDisplay: "(18) 99117-6409",
    whatsapp: "5518991176409",
  },

  /** TODO(dono): URL de embed do Google Maps da loja. Sem ela, o mapa não é renderizado. */
  mapsEmbedUrl: null as string | null,

  /** TODO(dono): horário de funcionamento não verificado. Não inventar. */
  hours: null as string[] | null,

  /** TODO(dono): só preencher com URLs reais. Links vazios não são renderizados. */
  socials: {} as Partial<Record<"instagram" | "facebook" | "youtube", string>>,
} as const;

/** Endereço em uma linha, para rodapé e mensagens de WhatsApp. */
export function formatFullAddress(): string {
  const { street, district, city, state, zip } = business.address;
  return `${street}, ${district}, ${city} - ${state}, ${zip}`;
}

/**
 * Número de WhatsApp usado nos CTAs comerciais.
 * Cai no contato de financiamento enquanto o número de vendas não for informado.
 */
export function salesWhatsapp(): string {
  return business.whatsappSales ?? business.financing.whatsapp;
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
