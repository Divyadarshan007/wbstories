import { Skeleton } from "@/components/ui/skeleton";

export default function StoryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Skeleton className="h-4 w-48" />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="min-w-0">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="mt-4 h-4 w-1/3" />
          <Skeleton className="mt-8 aspect-video w-full" />
          <div className="mt-8 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-3">
            <Skeleton className="aspect-video w-28 shrink-0 rounded-md" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
