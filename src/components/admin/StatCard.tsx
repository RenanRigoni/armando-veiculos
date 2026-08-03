import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon?: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="border-border bg-surface flex items-center gap-4 rounded-md border p-5">
      {Icon ? (
        <div className="bg-ink text-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-sm">
          <Icon size={20} aria-hidden />
        </div>
      ) : null}
      <div>
        <p className="font-display text-3xl tracking-tight">{value}</p>
        <p className="text-fg-muted text-sm">{label}</p>
      </div>
    </div>
  );
}
