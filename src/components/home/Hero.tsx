import { Bike, Car, Handshake, Repeat, Sailboat, Wallet } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

const highlights = [
  { icon: Repeat, label: "Compra e venda" },
  { icon: Handshake, label: "Consignação" },
  { icon: Wallet, label: "Financiamento" },
];

export function Hero() {
  return (
    <section className="border-border bg-ink relative overflow-hidden border-b">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
        <div className="relative z-10">
          <p className="brand-rule text-brand text-sm tracking-widest uppercase">
            Armando Veículos
          </p>
          <h1 className="max-w-xl text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Seu próximo veículo começa aqui.
          </h1>
          <p className="text-fg-muted mt-6 max-w-lg text-base sm:text-lg">
            Carros, motos e náutica selecionados. Compra, venda, consignação e financiamento em
            um só lugar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/estoque" size="lg">
              Ver estoque
            </ButtonLink>
            <ButtonLink href="/#vender" variant="secondary" size="lg">
              Vender meu veículo
            </ButtonLink>
          </div>

          <ul className="border-border mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
            {highlights.map((item) => (
              <li key={item.label} className="text-fg-muted flex items-center gap-2 text-sm">
                <item.icon size={18} className="text-brand" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden aspect-square lg:block" aria-hidden>
          <div
            className="bg-brand/10 absolute inset-0 rounded-lg blur-3xl"
            style={{ transform: "scale(0.8)" }}
          />
          <div className="border-border bg-surface absolute inset-0 rounded-lg border">
            <div className="bg-brand absolute top-8 -left-3 h-1 w-24 -rotate-45" />
            <div className="grid h-full grid-cols-2 grid-rows-2 gap-px overflow-hidden rounded-lg">
              <div className="bg-surface-2 flex items-center justify-center">
                <Car size={64} className="text-fg-muted/40" />
              </div>
              <div className="bg-surface flex items-center justify-center">
                <Bike size={56} className="text-fg-muted/30" />
              </div>
              <div className="bg-surface flex items-center justify-center">
                <Sailboat size={56} className="text-fg-muted/30" />
              </div>
              <div className="bg-surface-2 flex items-center justify-center">
                <span className="font-display text-fg-muted/40 text-4xl">AV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
