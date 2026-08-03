"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { mainNav } from "@/config/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-fg hover:text-brand p-2 lg:hidden"
        aria-label="Abrir menu"
        aria-expanded={isOpen}
      >
        <Menu size={24} aria-hidden />
      </button>

      {isOpen ? (
        <div className="bg-ink fixed inset-0 z-50 flex flex-col lg:hidden">
          <div className="border-border flex h-16 items-center justify-between border-b px-4">
            <span className="font-display text-lg tracking-wide uppercase">Menu</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-fg hover:text-brand p-2"
              aria-label="Fechar menu"
            >
              <X size={24} aria-hidden />
            </button>
          </div>

          <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1">
              {mainNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display hover:text-brand block py-3 text-2xl tracking-wide uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
