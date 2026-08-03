import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/config/business";

export function AboutSection() {
  return (
    <Section id="sobre">
      <div className="max-w-3xl">
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
      </div>
    </Section>
  );
}
