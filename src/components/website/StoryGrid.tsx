import { StoryCard } from "@/components/website/StoryCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { StorySummaryDTO } from "@/types/story.types";

interface StoryGridProps {
  stories: StorySummaryDTO[];
}

export function StoryGrid({ stories }: StoryGridProps) {
  if (stories.length === 0) {
    return (
      <EmptyState
        title="No stories found"
        description="Try a different search, or check back soon for new stories."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
