import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "touch-target inline-flex cursor-pointer items-center justify-center gap-2 font-display uppercase tracking-wide " +
  "transition-[color,background-color,border-color,transform] duration-150 active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-fg hover:bg-brand-dark active:bg-brand-dark",
  secondary:
    "border border-border-strong bg-transparent text-fg hover:border-brand hover:text-brand-text",
  ghost: "bg-transparent text-fg-muted hover:text-fg",
  danger:
    "border border-brand bg-transparent text-brand-text hover:bg-brand-dark hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-sm px-3 text-sm",
  md: "h-11 rounded-md px-5 text-base",
  lg: "h-13 rounded-md px-7 text-lg",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = StyleProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={buttonClasses(variant, size, className)}>
      {children}
    </button>
  );
}

type ButtonLinkProps = StyleProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "href"
  >;

/** Mesma aparência do Button, para navegação. URLs externas abrem em nova aba. */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    const isExternalTab = href.startsWith("http");
    return (
      <a
        {...rest}
        href={href}
        className={classes}
        {...(isExternalTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...rest} href={href} className={classes}>
      {children}
    </Link>
  );
}
