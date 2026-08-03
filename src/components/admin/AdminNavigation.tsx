"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

type AdminNavigationProps = {
  className?: string;
  mobile?: boolean;
};

function isActiveRoute(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNavigation({ className, mobile = false }: AdminNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação do painel" className={className}>
      <ul
        className={cn(
          "items-center",
          mobile ? "mx-auto grid w-full max-w-7xl grid-cols-2 px-4" : "flex gap-1",
        )}
      >
        {adminNav.map((link) => {
          const isActive = isActiveRoute(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-display hover:text-brand-text flex min-h-11 items-center justify-center border-b-2 px-3 text-sm tracking-wide uppercase transition-colors",
                  isActive
                    ? "border-brand text-fg"
                    : "text-fg-muted border-transparent hover:border-brand",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
