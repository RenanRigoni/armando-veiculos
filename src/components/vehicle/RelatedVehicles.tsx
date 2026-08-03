import { Section, SectionHeading } from "@/components/ui/Section";
import { VehicleGrid } from "@/components/inventory/VehicleGrid";
import type { Vehicle } from "@/types/vehicle";

export function RelatedVehicles({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) return null;

  return (
    <Section tone="surface">
      <SectionHeading title="Você também pode gostar" />
      <VehicleGrid vehicles={vehicles} />
    </Section>
  );
}
