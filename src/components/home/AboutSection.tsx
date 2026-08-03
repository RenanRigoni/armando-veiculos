import { Building2 } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";

export function AboutSection() {
  return (
    <Section id="sobre">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading title={`Sobre a ${business.name}`} />
          <p className="text-fg-muted text-base">
            A {business.name} atua com compra, venda, consignação e financiamento de carros,
            motos e náutica em {business.address.city} - {business.address.state}.
          </p>
          <div className="mt-8">
            <ButtonLink href="/#contato" variant="secondary">
              Conhecer a {business.name}
            </ButtonLink>
          </div>
        </div>

        {/* TODO(dono): substituir por foto real da loja/fachada quando disponível. */}
        <div className="border-border bg-surface flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-md border">
          <Building2 size={48} className="text-fg-muted/50" aria-hidden />
          <p className="text-fg-muted text-sm">Foto da loja em breve</p>
        </div>
      </div>
    </Section>
  );
}
