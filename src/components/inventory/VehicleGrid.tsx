import { VehicleCard } from "@/components/inventory/VehicleCard";
import { VehicleCardSkeleton } from "@/components/inventory/VehicleCardSkeleton";
import type { Vehicle } from "@/types/vehicle";

export function VehicleGrid({
  vehicles,
  headingLevel = 3,
}: {
  vehicles: Vehicle[];
  headingLevel?: 2 | 3;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

export function VehicleGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </div>
  );
}
