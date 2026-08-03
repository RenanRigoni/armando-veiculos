import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { Toaster } from "sonner";

import { business, formatFullAddress, siteUrl } from "@/config/business";

import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${business.name} | Carros, motos e náutica em ${business.address.city}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Carros, motos e náutica selecionados. Compra, venda, consignação e financiamento em um só lugar.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: business.name,
    title: `${business.name} | Carros, motos e náutica`,
    description:
      "Carros, motos e náutica selecionados. Compra, venda, consignação e financiamento em um só lugar.",
  },
  other: {
    "geo.placename": `${business.address.city} - ${business.address.state}`,
    address: formatFullAddress(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-ink text-fg flex min-h-full flex-col">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--color-surface-2)",
              color: "var(--color-fg)",
              border: "1px solid var(--color-border)",
            },
          }}
        />
      </body>
    </html>
  );
}
