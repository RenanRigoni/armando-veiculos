import { SearchX } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

export function EmptyState() {
  return (
    <div className="border-border bg-surface flex flex-col items-center gap-4 rounded-md border border-dashed px-6 py-16 text-center">
      <SearchX size={40} className="text-fg-muted" aria-hidden />
      <div>
        <h3 className="text-xl">Nenhum veículo encontrado</h3>
        <p className="text-fg-muted mt-2 max-w-sm text-sm">
          Ajuste os filtros ou fale com a equipe — o estoque muda com frequência.
        </p>
      </div>
      <ButtonLink href="/estoque" variant="secondary">
        Limpar filtros
      </ButtonLink>
    </div>
  );
}
