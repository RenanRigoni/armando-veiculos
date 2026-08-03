import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SearchFilters } from "@/components/inventory/SearchFilters";
import { FilterDrawer } from "@/components/inventory/FilterDrawer";
import { VehicleGrid } from "@/components/inventory/VehicleGrid";
import { EmptyState } from "@/components/inventory/EmptyState";
import { getInventoryFacets, getVehicles } from "@/data/vehicles";
import { buildEstoqueSearchParams, parseEstoqueSearchParams } from "@/lib/estoqueQuery";
import type { RawSearchParams } from "@/lib/estoqueQuery";
import { CATEGORY_LABELS } from "@/types/vehicle";

const PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Estoque",
  description: "Estoque completo de carros, motos e náutica da Armando Veículos.",
};

export default async function EstoquePage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const rawParams = await searchParams;
  const { filters, page } = parseEstoqueSearchParams(rawParams);

  const [{ items, total }, facets] = await Promise.all([
    getVehicles(filters, { page, perPage: PER_PAGE }),
    getInventoryFacets(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const filtersKey = JSON.stringify(filters);

  return (
    <>
      <Header />

      <main className="flex-1">
        <Section tone="surface" className="py-8 md:py-10">
          <div className="hidden lg:block">
            <SearchFilters key={filtersKey} facets={facets} initialValues={filters} />
          </div>
          <FilterDrawer key={`drawer-${filtersKey}`} facets={facets} initialValues={filters} />
        </Section>

        <Section>
          <SectionHeading
            title={filters.category ? CATEGORY_LABELS[filters.category] : "Estoque"}
            description={`${total} ${total === 1 ? "veículo encontrado" : "veículos encontrados"}`}
          />

          {items.length > 0 ? <VehicleGrid vehicles={items} /> : <EmptyState />}

          {totalPages > 1 ? (
            <nav aria-label="Paginação" className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                const query = buildEstoqueSearchParams(filters, pageNumber).toString();
                const href = query ? `/estoque?${query}` : "/estoque";

                return (
                  <ButtonLink
                    key={pageNumber}
                    href={href}
                    variant={pageNumber === page ? "primary" : "secondary"}
                    size="sm"
                  >
                    {pageNumber}
                  </ButtonLink>
                );
              })}
            </nav>
          ) : null}
        </Section>
      </main>

      <Footer />
    </>
  );
}
