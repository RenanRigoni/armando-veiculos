import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";
import { VehicleGridSkeleton } from "@/components/inventory/VehicleGrid";

export default function EstoqueLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Section tone="surface" className="py-8 md:py-10">
          <Skeleton className="h-11 w-full" />
        </Section>
        <Section>
          <SectionHeading title="Estoque" />
          <VehicleGridSkeleton />
        </Section>
      </main>
      <Footer />
    </>
  );
}
