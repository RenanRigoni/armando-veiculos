import { MessageCircle } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { messages, whatsappLinks } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <Section className="text-center">
      <h2 className="mx-auto max-w-2xl text-4xl sm:text-5xl">
        Não encontrou o veículo que procura?
      </h2>
      <p className="text-fg-muted mx-auto mt-4 max-w-lg text-base">
        Conte para a nossa equipe qual modelo você busca — avisamos assim que ele entrar no
        estoque.
      </p>
      <div className="mt-8">
        <ButtonLink href={whatsappLinks.sales(messages.quickContact())} size="lg">
          <MessageCircle size={18} aria-hidden />
          Falar com um consultor
        </ButtonLink>
      </div>
    </Section>
  );
}
