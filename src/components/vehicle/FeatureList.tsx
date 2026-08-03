import { CheckCircle2 } from "lucide-react";

/** Só renderiza o que veio do banco — nunca inventar item de série. */
export function FeatureList({ features }: { features: string[] }) {
  if (features.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2 text-sm">
          <CheckCircle2 size={16} className="text-brand shrink-0" aria-hidden />
          {feature}
        </li>
      ))}
    </ul>
  );
}
