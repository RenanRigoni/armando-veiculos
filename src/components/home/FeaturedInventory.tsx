import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { VehicleGrid } from "@/components/inventory/VehicleGrid";
import { EmptyState } from "@/components/inventory/EmptyState";
import type { Vehicle } from "@/types/vehicle";

export function FeaturedInventory({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <Section tone="surface">
      <SectionHeading
        title="Veículos em destaque"
        description="Uma seleção do estoque disponível agora."
        action={<ButtonLink href="/estoque">Ver estoque</ButtonLink>}
      />
      {vehicles.length > 0 ? <VehicleGrid vehicles={vehicles} /> : <EmptyState />}
    </Section>
  );
}
