import { MessageCircle } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { formatBRL } from "@/lib/format";

type StickyMobileCtaProps = {
  price: number;
  href: string;
};

export function StickyMobileCta({ price, href }: StickyMobileCtaProps) {
  return (
    <div
      className="border-border bg-ink/95 fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t px-4 pt-3 lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <p className="font-display text-lg tracking-tight">{formatBRL(price)}</p>
      <ButtonLink href={href} className="max-w-[220px] flex-1">
        <MessageCircle size={16} aria-hidden />
        Tenho interesse
      </ButtonLink>
    </div>
  );
}
