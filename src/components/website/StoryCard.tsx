import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/helpers/date.helper";
import { sanitizeHtml } from "@/services/sanitize.service";
import type { StorySummaryDTO } from "@/types/story.types";

interface StoryCardProps {
  story: StorySummaryDTO;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/stories/${story.slug}`}
        className="relative block aspect-video overflow-hidden rounded-lg bg-muted"
      >
        {story.bannerImage ? (
          <Image
            src={story.bannerImage.url}
            alt={story.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          story.bannerVideo && (
            // No image to show — fall back to the story's own leading video
            // embed. pointer-events-none keeps the card a single click target
            // (the video's cross-origin iframe would otherwise swallow clicks).
            <div
              className="pointer-events-none absolute inset-0"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.bannerVideo.embedHtml) }}
            />
          )
        )}
      </Link>
      <div className="mt-3">
        <h3 className="line-clamp-2 leading-snug font-semibold">
          <Link href={`/stories/${story.slug}`} className="hover:underline">
            {story.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {story.readingTime} min read
          {story.publishedAt && <> · {formatDate(story.publishedAt)}</>}
        </p>
      </div>
    </article>
  );
}
