import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Section className="text-center">
          <p className="font-display text-brand text-6xl md:text-8xl">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl">Página não encontrada</h1>
          <p className="text-fg-muted mx-auto mt-3 max-w-md">
            O endereço que você acessou não existe ou o veículo saiu do estoque.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/estoque">Ver estoque</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Voltar ao início
            </ButtonLink>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
