import { SearchX } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

export function EmptyState({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="border-border bg-surface flex flex-col items-center gap-4 rounded-md border border-dashed px-6 py-16 text-center">
      <SearchX size={40} className="text-fg-muted" aria-hidden />
      <div>
        <Heading className="text-xl">Nenhum veículo encontrado</Heading>
        <p className="text-fg-muted mt-2 max-w-sm text-sm">
          Ajuste os filtros ou fale com a equipe. O estoque muda com frequência.
        </p>
      </div>
      <ButtonLink href="/estoque" variant="secondary">
        Limpar filtros
      </ButtonLink>
    </div>
  );
}
