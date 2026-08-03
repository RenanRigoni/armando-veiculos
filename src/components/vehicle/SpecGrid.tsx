import type { Spec } from "@/types/vehicle";

/** Especificações genéricas — spec vazia nunca chega até aqui, mas o filtro fica por garantia. */
export function SpecGrid({ specs }: { specs: Spec[] }) {
  const visible = specs.filter((spec) => Boolean(spec.value));
  if (visible.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {visible.map((spec) => (
        <div key={spec.label}>
          <dt className="text-fg-muted text-xs tracking-wide uppercase">{spec.label}</dt>
          <dd className="mt-1 text-base normal-case">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
