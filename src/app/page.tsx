import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import type { CategoryCardData } from "@/components/home/CategoryCards";
import { FeaturedInventory } from "@/components/home/FeaturedInventory";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TradeInSection } from "@/components/home/TradeInSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FinalCta } from "@/components/home/FinalCta";
import { SearchFilters } from "@/components/inventory/SearchFilters";
import { getFeaturedVehicles, getInventoryFacets, getVehicles } from "@/data/vehicles";
import { PLACEHOLDER_IMAGE } from "@/lib/images";
import type { VehicleCategory } from "@/types/vehicle";

const CATEGORIES: VehicleCategory[] = ["carros", "motos", "nautica"];

export default async function HomePage() {
  const [featured, facets, categoryResults] = await Promise.all([
    getFeaturedVehicles(8),
    getInventoryFacets(),
    Promise.all(
      CATEGORIES.map((category) => getVehicles({ category }, { page: 1, perPage: 1 })),
    ),
  ]);

  const categories: CategoryCardData[] = CATEGORIES.map((category, index) => ({
    category,
    count: categoryResults[index].total,
    image: categoryResults[index].items[0]?.coverImage ?? PLACEHOLDER_IMAGE,
  }));

  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />

        <Section tone="surface" className="py-10 md:py-12">
          <div className="border-border bg-ink rounded-md border p-5 sm:p-6">
            <SearchFilters facets={facets} initialValues={{}} />
          </div>
        </Section>

        <Section aria-labelledby="category-heading">
          <div className="brand-rule mb-8 max-w-2xl">
            <h2 id="category-heading" className="text-3xl leading-none sm:text-4xl">
              Encontre por categoria
            </h2>
            <p className="text-fg-muted mt-3">
              Explore o estoque disponível de carros, motos e náutica.
            </p>
          </div>
          <CategoryCards categories={categories} />
        </Section>

        <FeaturedInventory vehicles={featured} />
        <ServicesGrid />
        <TradeInSection />
        <AboutSection />
        <ContactSection />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
