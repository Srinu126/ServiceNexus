import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col space-y-8">
      <Skeleton className="h-10 w-48" />
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" /> 
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-32 mt-6" /> {/* Button skeleton */}
    </div>
  );
}
