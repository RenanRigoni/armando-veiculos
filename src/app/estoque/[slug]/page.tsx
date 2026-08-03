import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactSection } from "@/components/home/ContactSection";
import { FinancingForm } from "@/components/forms/FinancingForm";
import { TradeInForm } from "@/components/forms/TradeInForm";
import { Gallery } from "@/components/vehicle/Gallery";
import { SummaryPanel } from "@/components/vehicle/SummaryPanel";
import { SpecGrid } from "@/components/vehicle/SpecGrid";
import { FeatureList } from "@/components/vehicle/FeatureList";
import { RelatedVehicles } from "@/components/vehicle/RelatedVehicles";
import { StickyMobileCta } from "@/components/vehicle/StickyMobileCta";
import { getRelatedVehicles, getVehicleBySlug } from "@/data/vehicles";
import { business, siteUrl } from "@/config/business";
import { formatYearPair } from "@/lib/format";
import { messages, whatsappLinks } from "@/lib/whatsapp";
import { buildFullSpecs } from "@/lib/vehicleSpecs";
import { CATEGORY_LABELS } from "@/types/vehicle";
import type { Vehicle } from "@/types/vehicle";

type VehiclePageProps = {
  params: Promise<{ slug: string }>;
};

async function loadVehicle(slug: string): Promise<Vehicle> {
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();
  return vehicle;
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return {};

  const years = formatYearPair(vehicle.yearManufacture, vehicle.yearModel);
  const title = years ? `${vehicle.title} ${years}` : vehicle.title;
  const description = vehicle.description
    ? vehicle.description.slice(0, 160)
    : `${title} à venda na ${business.name}, em ${business.address.city} - ${business.address.state}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: vehicle.coverImage }],
    },
  };
}

function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildJsonLd(vehicle: Vehicle) {
  const availability =
    vehicle.status === "reservado"
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: vehicle.title,
    image: vehicle.images.length > 0 ? vehicle.images.map((image) => image.url) : [vehicle.coverImage],
    brand: vehicle.make,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.yearModel),
    mileageFromOdometer: vehicle.mileage
      ? { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "KMT" }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: vehicle.price,
      availability,
      url: `${siteUrl()}/estoque/${vehicle.slug}`,
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = await loadVehicle(slug);
  const related = await getRelatedVehicles(vehicle, 4);

  const galleryImages =
    vehicle.images.length > 0
      ? vehicle.images
      : [{ id: "cover", url: vehicle.coverImage, alt: vehicle.title, sortOrder: 0 }];

  const specs = buildFullSpecs(vehicle);
  const vehicleRef = {
    title: vehicle.title,
    slug: vehicle.slug,
    price: vehicle.price,
    yearManufacture: vehicle.yearManufacture,
    yearModel: vehicle.yearModel,
  };
  const interestHref = whatsappLinks.sales(messages.vehicleInterest(vehicleRef));

  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 pb-24 lg:pb-0">
        <div className="border-border bg-surface border-b">
          <nav
            aria-label="Breadcrumb"
            className="text-fg-muted mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm sm:px-6"
          >
            <Link href="/" className="hover:text-brand-text">
              Início
            </Link>
            <ChevronRight size={14} aria-hidden />
            <Link href="/estoque" className="hover:text-brand-text">
              Estoque
            </Link>
            <ChevronRight size={14} aria-hidden />
            <Link
              href={`/estoque?categoria=${vehicle.category}`}
              className="hover:text-brand-text"
            >
              {CATEGORY_LABELS[vehicle.category]}
            </Link>
            <ChevronRight size={14} aria-hidden />
            <span aria-current="page" className="text-fg">
              {vehicle.make} {vehicle.model}
            </span>
          </nav>
        </div>

        <Section className="py-8 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Gallery images={galleryImages} title={vehicle.title} />
            <SummaryPanel vehicle={vehicle} />
          </div>
        </Section>

        {vehicle.description ? (
          <Section tone="surface">
            <SectionHeading title="Sobre este veículo" />
            <p className="text-fg-muted max-w-3xl text-base whitespace-pre-line">
              {vehicle.description}
            </p>
          </Section>
        ) : null}

        {vehicle.features.length > 0 ? (
          <Section>
            <SectionHeading title="Itens e detalhes" />
            <FeatureList features={vehicle.features} />
          </Section>
        ) : null}

        <Section tone="surface">
          <SectionHeading title="Especificações técnicas" />
          <SpecGrid specs={specs} />
        </Section>

        <Section id="financiamento">
          <SectionHeading
            title="Simular financiamento"
            description="Qualificação rápida, sem cálculo de taxa. A equipe de financiamento retorna pelo WhatsApp."
          />
          <div className="border-border bg-surface mx-auto max-w-3xl rounded-md border p-6 sm:p-8">
            <FinancingForm vehicle={vehicleRef} />
          </div>
        </Section>

        <Section id="troca" tone="surface">
          <SectionHeading title="Tem um veículo na troca?" />
          <div className="border-border bg-ink mx-auto max-w-3xl rounded-md border p-6 sm:p-8">
            <TradeInForm vehicle={vehicleRef} />
          </div>
        </Section>

        <ContactSection />

        <RelatedVehicles vehicles={related} />
      </main>

      <Footer />

      <StickyMobileCta price={vehicle.price} href={interestHref} />

      {/* JSON-LD gerado a partir de dados do próprio veículo — nunca HTML de usuário. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(buildJsonLd(vehicle)) }}
      />
    </>
  );
}
