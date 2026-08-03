import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const control =
  "h-11 w-full rounded-sm border border-border-strong bg-surface-2 px-3 text-base text-fg " +
  "placeholder:text-fg-muted focus:border-brand " +
  "disabled:cursor-not-allowed disabled:opacity-50";

type LabelProps = {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-fg-muted mb-1.5 block text-sm font-medium", className)}
    >
      {children}
    </label>
  );
}

export function FieldError({ id, children }: { id?: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="text-brand-text mt-1.5 text-sm">
      {children}
    </p>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} className={cn(control, className)} />;
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...rest} className={cn(control, "appearance-none pr-8", className)}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...rest} className={cn(control, "h-auto min-h-28 py-2.5", className)} />;
}
