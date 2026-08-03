import { Banknote, Handshake, Repeat, ShoppingCart } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";

const services = [
  { icon: ShoppingCart, label: "Compra" },
  { icon: Handshake, label: "Venda" },
  { icon: Repeat, label: "Consignação" },
  { icon: Banknote, label: "Financiamento" },
];

export function AboutSection() {
  return (
    <Section id="sobre">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading title={`Sobre a ${business.name}`} />
          <p className="text-fg-muted text-base">
            A {business.name} atua com compra, venda, consignação e financiamento de carros,
            motos e náutica em {business.address.city} - {business.address.state}.
          </p>
          <div className="mt-8">
            <ButtonLink href="/#contato" variant="secondary">
              Falar com a equipe
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="border-border bg-surface flex flex-col gap-3 rounded-md border p-5"
            >
              <Icon size={22} className="text-brand" aria-hidden />
              <span className="font-display text-lg tracking-wide uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
