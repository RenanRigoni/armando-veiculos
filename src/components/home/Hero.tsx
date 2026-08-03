import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="border-border bg-ink relative overflow-hidden border-b">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16">
        <div className="relative z-10">
          <p className="brand-rule text-brand-text text-sm tracking-widest uppercase">
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

        </div>

        <div
          className="border-border bg-surface relative hidden aspect-[4/3] overflow-hidden rounded-md border lg:flex lg:items-center lg:justify-center"
          aria-hidden
        >
          <div className="bg-brand absolute top-0 left-0 h-1 w-full" />
          <div className="w-full px-14">
            <Image
              src="/logo-dark.png"
              alt=""
              width={481}
              height={184}
              className="h-auto w-full"
            />
            <div className="brand-rule text-fg-muted mt-10 text-sm tracking-[0.18em] uppercase">
              Mirandópolis, SP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
