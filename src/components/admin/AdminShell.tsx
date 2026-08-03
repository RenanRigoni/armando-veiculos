import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink, LogOut } from "lucide-react";

import { signOut } from "@/app/admin/actions";
import { adminNav } from "@/config/navigation";
import { business } from "@/config/business";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-ink flex min-h-screen flex-col">
      <header className="border-border bg-surface sticky top-0 z-30 border-b">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex shrink-0 items-center" aria-label={business.name}>
              <Image
                src="/logo-dark.png"
                alt={business.name}
                width={140}
                height={53}
                className="h-8 w-auto"
              />
            </Link>

            <nav aria-label="Navegação do painel" className="hidden sm:block">
              <ul className="flex items-center gap-5">
                {adminNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-display text-fg-muted hover:text-brand text-sm tracking-wide uppercase transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-brand hidden items-center gap-1.5 text-sm sm:flex"
            >
              Ver estoque público
              <ExternalLink size={14} aria-hidden />
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="text-fg-muted hover:text-brand flex items-center gap-1.5 text-sm"
              >
                <LogOut size={16} aria-hidden />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
