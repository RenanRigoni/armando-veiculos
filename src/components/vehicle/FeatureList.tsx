/** Só renderiza o que veio do banco — nunca inventar item de série. */
export function FeatureList({ features }: { features: string[] }) {
  if (features.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="text-fg-muted max-w-3xl text-base">
          {feature}
        </li>
      ))}
    </ul>
  );
}
