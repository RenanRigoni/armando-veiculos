import { MapPin, MessageCircle, Phone } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { business, formatDisplayAddress, formatFullAddress } from "@/config/business";
import { messages, whatsappLinks } from "@/lib/whatsapp";

/** Sem URL de embed cadastrada pelo dono, usa o endereço verificado para gerar o mapa. */
const mapsEmbedSrc =
  business.mapsEmbedUrl ??
  `https://www.google.com/maps?q=${encodeURIComponent(formatFullAddress())}&output=embed`;

export function ContactSection({ tone = "surface" }: { tone?: "ink" | "surface" }) {
  return (
    <Section id="contato" tone={tone}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-5 text-base">
          <SectionHeading title="Localização e contato" className="mb-0" />
          <ul className="flex flex-col gap-5">
            <li className="flex gap-3">
              <MapPin size={20} className="text-brand mt-0.5 shrink-0" aria-hidden />
              <span className="text-fg-muted">{formatDisplayAddress()}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-brand shrink-0" aria-hidden />
              <a
                href={business.phone.href}
                className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center"
              >
                {business.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={20} className="text-brand shrink-0" aria-hidden />
              <a
                href={whatsappLinks.financing(messages.financingQuickInterest())}
                className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center"
              >
                Financiamento
              </a>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={whatsappLinks.sales(messages.quickContact())}>
              <MessageCircle size={16} aria-hidden />
              Falar no WhatsApp
            </ButtonLink>
            <ButtonLink href={whatsappLinks.sales(messages.directions())} variant="secondary">
              Como chegar
            </ButtonLink>
          </div>
        </div>

        <iframe
          src={mapsEmbedSrc}
          title={`Mapa da ${business.name}`}
          className="border-border aspect-[4/3] w-full rounded-md border lg:aspect-auto lg:h-full lg:min-h-[280px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
