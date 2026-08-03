import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { business } from "@/config/business";
import { messages, whatsappLinks } from "@/lib/whatsapp";

export function Header() {
  return (
    <header className="border-border bg-ink/95 sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
        <Link
          href="/"
          className="touch-target flex shrink-0 items-center"
          aria-label={`${business.name}, início`}
        >
          <Image
            src="/logo-dark.png"
            alt={business.name}
            width={241}
            height={92}
            sizes="(min-width: 768px) 116px, 94px"
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2">
          <ButtonLink
            href={whatsappLinks.sales(messages.quickContact())}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <MessageCircle size={16} aria-hidden />
            WhatsApp
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
