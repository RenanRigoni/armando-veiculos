"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { mainNav } from "@/config/navigation";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
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
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-fg hover:text-brand-text inline-flex size-11 items-center justify-center lg:hidden"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
      >
        <Menu size={24} aria-hidden />
      </button>

      {isOpen ? (
        <div
          ref={dialogRef}
          id={dialogId}
          className="bg-ink fixed inset-0 z-50 flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          tabIndex={-1}
        >
          <div className="border-border flex h-16 items-center justify-between border-b px-4">
            <span id={dialogTitleId} className="font-display text-lg tracking-wide uppercase">
              Menu
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-fg hover:text-brand-text inline-flex size-11 items-center justify-center"
              aria-label="Fechar menu"
            >
              <X size={24} aria-hidden />
            </button>
          </div>

          <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1">
              {mainNav.map((link) => {
                const isActive =
                  (link.href === "/" && pathname === "/") ||
                  (link.href === "/estoque" && pathname.startsWith("/estoque"));

                return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "font-display hover:text-brand-text block border-l-2 py-3 pl-4 text-2xl tracking-wide uppercase",
                      isActive ? "border-brand text-fg" : "border-transparent",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
