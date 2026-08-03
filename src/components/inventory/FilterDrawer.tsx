"use client";

import { useId, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { SearchFilters } from "@/components/inventory/SearchFilters";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import type { InventoryFacets, VehicleFilters } from "@/types/vehicle";

type FilterDrawerProps = {
  facets: InventoryFacets;
  initialValues: VehicleFilters;
};

/**
 * Envolve o SearchFilters num painel mobile. Precisa renderizar o form aqui
 * dentro (em vez de recebê-lo por `children`) porque o callback que fecha o
 * drawer só pode existir no lado do cliente. Server Component não consegue
 * passar função para preencher `onApplied`.
 */
export function FilterDrawer({ facets, initialValues }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogTitleId = useId();
  const dialogId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useDialogFocus({
    isOpen,
    onClose: () => setIsOpen(false),
    initialFocusRef: closeButtonRef,
    closeOnMediaQuery: "(min-width: 64rem)",
  });

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="border-border-strong bg-surface font-display flex h-11 w-full items-center justify-center gap-2 rounded-sm border text-sm tracking-wide uppercase"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
      >
        <SlidersHorizontal size={16} aria-hidden />
        Filtros
      </button>

      {isOpen ? (
        <div
          ref={dialogRef}
          id={dialogId}
          className="bg-ink fixed inset-0 z-50 flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          tabIndex={-1}
        >
          <div className="border-border sticky top-0 flex h-16 items-center justify-between border-b px-4">
            <span id={dialogTitleId} className="font-display text-lg tracking-wide uppercase">
              Filtros
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-fg hover:text-brand-text inline-flex size-11 items-center justify-center"
              aria-label="Fechar filtros"
            >
              <X size={24} aria-hidden />
            </button>
          </div>
          <div className="p-4">
            <SearchFilters
              facets={facets}
              initialValues={initialValues}
              onApplied={() => setIsOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
