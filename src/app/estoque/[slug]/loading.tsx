import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function VehicleLoading() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Section className="py-8 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Skeleton className="aspect-[3/2] w-full" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
