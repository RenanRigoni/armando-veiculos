import { MapPin, MessageCircle, Phone } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { business, formatFullAddress } from "@/config/business";
import { messages, whatsappLinks } from "@/lib/whatsapp";

export function ContactSection() {
  return (
    <Section id="contato" tone="surface">
      <SectionHeading title="Localização e contato" />
      <div
        className={
          business.mapsEmbedUrl ? "grid gap-8 lg:grid-cols-2 lg:gap-12" : "max-w-2xl"
        }
      >
        <div className="flex flex-col gap-5 text-base">
          <ul className="flex flex-col gap-5">
            <li className="flex gap-3">
              <MapPin size={20} className="text-brand mt-0.5 shrink-0" aria-hidden />
              <span className="text-fg-muted">{formatFullAddress()}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="text-brand mt-0.5 shrink-0" aria-hidden />
              <a
                href={business.phone.href}
                className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center"
              >
                {business.phone.display}
              </a>
            </li>
            <li className="text-fg-muted flex gap-3">
              <MessageCircle size={20} className="text-brand mt-0.5 shrink-0" aria-hidden />
              <span>
                Financiamento: {business.financing.contactName}, {business.financing.phoneDisplay}
              </span>
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

        {business.mapsEmbedUrl ? (
          <iframe
            src={business.mapsEmbedUrl}
            title={`Mapa da ${business.name}`}
            className="border-border aspect-[4/3] w-full rounded-md border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : null}
      </div>
    </Section>
  );
}
