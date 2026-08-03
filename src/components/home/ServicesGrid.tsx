import { Handshake, Repeat, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { messages, whatsappLinks } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

const services: Service[] = [
  {
    icon: Repeat,
    title: "Compra e venda",
    description: "Encontre seu próximo veículo ou venda o atual com a nossa equipe.",
    ctaLabel: "Quero vender meu veículo",
    href: "/#vender",
  },
  {
    icon: Handshake,
    title: "Consignação",
    description: "Deixe seu veículo conosco para vender com mais visibilidade e segurança.",
    ctaLabel: "Quero consignar",
    href: whatsappLinks.sales(messages.consignment()),
  },
  {
    icon: Wallet,
    title: "Financiamento",
    description: "Condições de financiamento com a equipe da Bruna, direto pelo WhatsApp.",
    ctaLabel: "Simular financiamento",
    href: whatsappLinks.financing(messages.financingQuickInterest()),
  },
];

export function ServicesGrid() {
  return (
    <Section id="servicos">
      <SectionHeading
        title="Serviços"
        description="Compra, venda, consignação e financiamento em um só lugar."
      />
      <div className="border-border grid grid-cols-1 border-y sm:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={cn(
              "border-border flex flex-col gap-4 py-7",
              index < services.length - 1 && "border-b",
              "sm:border-b-0 sm:px-7",
              index > 0 && "sm:border-l",
              index === 0 && "sm:pr-7",
            )}
          >
            <service.icon size={28} className="text-brand" aria-hidden />
            <h3 className="text-xl">{service.title}</h3>
            <p className="text-fg-muted flex-1 text-sm">{service.description}</p>
            <ButtonLink href={service.href} variant="secondary" className="self-start">
              {service.ctaLabel}
            </ButtonLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
