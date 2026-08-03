import { Skeleton } from "@/components/ui/Skeleton";

export function VehicleCardSkeleton() {
  return (
    <div className="border-border bg-surface flex flex-col overflow-hidden rounded-md border">
      <Skeleton className="aspect-[3/2] w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-2 flex items-end justify-between gap-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}
