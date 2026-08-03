"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal" className="hidden lg:block">
      <ul className="flex items-center gap-5 xl:gap-7">
        {mainNav.map((link) => {
          const isActive =
            (link.href === "/" && pathname === "/") ||
            (link.href === "/estoque" && pathname.startsWith("/estoque"));

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-display hover:text-brand-text border-b-2 py-2 text-sm tracking-wide whitespace-nowrap uppercase transition-colors",
                  isActive ? "border-brand text-fg" : "text-fg border-transparent",
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
