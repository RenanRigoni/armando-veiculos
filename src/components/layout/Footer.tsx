import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import { business, formatDisplayAddress } from "@/config/business";
import { categoryNav, mainNav } from "@/config/navigation";
import { messages, whatsappLinks } from "@/lib/whatsapp";

const institutionalLinks = mainNav.filter((link) =>
  ["Início", "Estoque", "Sobre", "Contato"].includes(link.label),
);

export function Footer() {
  const socialEntries = Object.entries(business.socials);

  return (
    <footer className="border-border bg-surface mt-auto border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo-dark.png"
              alt={business.name}
              width={241}
              height={92}
              className="h-11 w-auto"
            />
            <p className="text-fg-muted mt-4 max-w-xs text-sm">
              Compra, venda, consignação e financiamento de carros, motos e náutica.
            </p>
          </div>

          <nav aria-label="Institucional">
            <h2 className="mb-4 text-lg">Navegação</h2>
            <ul className="flex flex-col gap-2">
              {institutionalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Categorias">
            <h2 className="mb-4 text-lg">Categorias</h2>
            <ul className="flex flex-col gap-2">
              {categoryNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-lg">Contato</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex gap-2">
                <MapPin size={16} className="text-brand mt-0.5 shrink-0" aria-hidden />
                <span className="text-fg-muted">{formatDisplayAddress()}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand shrink-0" aria-hidden />
                <a
                  href={business.phone.href}
                  className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center"
                >
                  {business.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-brand shrink-0" aria-hidden />
                <a
                  href={whatsappLinks.financing(messages.financingQuickInterest())}
                  className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center"
                >
                  Financiamento
                </a>
              </li>
            </ul>

            {socialEntries.length > 0 ? (
              <ul className="mt-4 flex gap-3">
                {socialEntries.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target text-fg-muted hover:text-brand-text inline-flex items-center text-sm capitalize"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="border-border text-fg-muted mt-12 border-t pt-6 text-xs">
          <p>{business.name}, CNPJ {business.cnpj}</p>
        </div>
      </div>
    </footer>
  );
}
