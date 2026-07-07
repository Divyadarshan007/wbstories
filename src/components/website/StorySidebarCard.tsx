import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/helpers/date.helper";
import type { IBannerImage } from "@/interfaces/story.interface";

interface StorySidebarCardProps {
  slug: string;
  title: string;
  bannerImage: IBannerImage;
  publishedAt: string | null;
  readingTime: number;
}

export function StorySidebarCard({
  slug,
  title,
  bannerImage,
  publishedAt,
  readingTime,
}: StorySidebarCardProps) {
  return (
    <Link href={`/stories/${slug}`} className="group flex gap-3">
      <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={bannerImage.url}
          alt={title}
          fill
          sizes="112px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium group-hover:underline">
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">
          {publishedAt && formatDate(publishedAt)} · {readingTime} min read
        </span>
      </div>
    </Link>
  );
}
