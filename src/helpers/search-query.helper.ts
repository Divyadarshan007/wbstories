import type { QueryFilter } from "mongoose";
import type { IStory } from "@/interfaces/story.interface";

export function buildStorySearchFilter(query?: string | null): QueryFilter<IStory> {
  if (!query || !query.trim()) {
    return {};
  }
  return { $text: { $search: query.trim() } };
}
