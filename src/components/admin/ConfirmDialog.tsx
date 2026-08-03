"use client";

import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";

import { useDialogFocus } from "@/hooks/useDialogFocus";

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
  const dialogId = useId();
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useDialogFocus({
    isOpen,
    onClose: () => setIsOpen(false),
    initialFocusRef: cancelButtonRef,
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-brand-text hover:text-fg inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-sm text-sm"
        aria-label={`Abrir confirmação: ${title}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
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
          ref={dialogRef}
          id={dialogId}
          className="bg-ink/80 fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          aria-describedby={dialogDescriptionId}
          tabIndex={-1}
        >
          <div className="border-border bg-surface w-full max-w-sm rounded-md border p-6">
            <h2 id={dialogTitleId} className="text-lg normal-case">
              {title}
            </h2>
            <p id={dialogDescriptionId} className="text-fg-muted mt-2 text-sm">
              {description}
            </p>
            <form action={action} className="mt-6 flex justify-end gap-3">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-fg-muted hover:text-fg min-h-11 rounded-sm px-4 text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-brand hover:bg-brand-bright text-fg min-h-11 rounded-sm px-4 text-sm"
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
