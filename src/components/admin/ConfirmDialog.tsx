"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";

type ConfirmDialogProps = {
  action: (formData: FormData) => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  trigger?: ReactNode;
};

/** Botão que só executa a server action depois de confirmar num modal. */
export function ConfirmDialog({
  action,
  title,
  description,
  confirmLabel = "Excluir",
  trigger,
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-brand hover:text-brand-bright flex items-center gap-1 text-sm"
      >
        {trigger ?? (
          <>
            <Trash2 size={14} aria-hidden />
            Excluir
          </>
        )}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="border-border bg-surface w-full max-w-sm rounded-md border p-6">
            <h2 className="text-lg normal-case">{title}</h2>
            <p className="text-fg-muted mt-2 text-sm">{description}</p>
            <form action={action} className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-fg-muted hover:text-fg text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-brand hover:bg-brand-bright rounded-sm px-4 py-2 text-sm text-white"
              >
                {confirmLabel}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
