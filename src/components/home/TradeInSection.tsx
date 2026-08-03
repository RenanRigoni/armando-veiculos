import { Section, SectionHeading } from "@/components/ui/Section";
import { TradeInForm } from "@/components/forms/TradeInForm";

export function TradeInSection() {
  return (
    <Section id="vender" tone="surface">
      <SectionHeading
        title="Quer vender ou trocar seu veículo?"
        description="Preencha os dados abaixo e solicite uma avaliação. Sua mensagem é enviada direto para o nosso WhatsApp."
      />
      <div className="border-border bg-ink mx-auto max-w-3xl rounded-md border p-6 sm:p-8">
        <TradeInForm />
      </div>
    </Section>
  );
}
