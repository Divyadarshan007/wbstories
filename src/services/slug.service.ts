import { slugify } from "@/utils/slugify.util";
import { StoryRepository } from "@/repositories/story.repository";

/** Generates story, story-1, story-2, ... until a free slug is found. */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = slugify(title) || "story";
  let candidate = base;
  let suffix = 0;

  while (await StoryRepository.existsBySlug(candidate, excludeId)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  return candidate;
}
