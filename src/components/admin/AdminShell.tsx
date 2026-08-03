import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink, LogOut } from "lucide-react";

import { signOut } from "@/app/admin/actions";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { business } from "@/config/business";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-ink flex min-h-dvh flex-col">
      <header className="border-border bg-surface sticky top-0 z-30 border-b">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex min-h-11 shrink-0 items-center"
              aria-label={`Ir para o painel da ${business.name}`}
            >
              <Image
                src="/logo-dark.png"
                alt={business.name}
                width={140}
                height={53}
                className="h-8 w-auto"
              />
            </Link>

            <AdminNavigation className="hidden sm:block" />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-brand-text hidden min-h-11 items-center gap-1.5 text-sm sm:flex"
            >
              Ver estoque público
              <ExternalLink size={14} aria-hidden />
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="text-fg-muted hover:text-brand-text flex min-h-11 items-center gap-1.5 text-sm"
              >
                <LogOut size={16} aria-hidden />
                Sair
              </button>
            </form>
          </div>
        </div>
        <AdminNavigation className="border-border border-t sm:hidden" mobile />
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6"
      >
        {children}
      </main>
    </div>
  );
}
