import { Skeleton } from "@/components/ui/skeleton";
import { StoryGridSkeleton } from "@/components/shared/skeletons/StoryGridSkeleton";

export default function HomeLoading() {
  return (
    <>
      <div className="border-b bg-muted/30 py-16 text-center sm:py-24">
        <Skeleton className="mx-auto h-10 w-2/3 max-w-md" />
        <Skeleton className="mx-auto mt-4 h-5 w-1/2 max-w-sm" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Skeleton className="mb-6 h-8 w-48" />
        <StoryGridSkeleton count={6} />
      </div>
    </>
  );
}
