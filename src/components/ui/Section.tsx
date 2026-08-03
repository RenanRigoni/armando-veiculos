import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
  /** Superfície levemente mais clara, para quebrar a sequência de blocos pretos. */
  tone?: "ink" | "surface";
};

export function Section({
  id,
  className,
  children,
  tone = "ink",
  "aria-labelledby": ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "px-4 py-16 sm:px-6 md:py-24",
        tone === "surface" ? "bg-surface" : "bg-ink",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  level?: 1 | 2;
};

export function SectionHeading({
  title,
  description,
  action,
  className,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="brand-rule max-w-2xl">
        <Heading className="text-3xl leading-none sm:text-4xl md:text-5xl">{title}</Heading>
        {description ? <p className="text-fg-muted mt-3 text-base">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
