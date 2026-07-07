import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, Clock } from "lucide-react";
import { StoryService } from "@/services/story.service";
import { StoryContent } from "@/components/website/StoryContent";
import { StorySidebar } from "@/components/website/StorySidebar";
import { SocialShareButtons } from "@/components/shared/SocialShareButtons";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { JsonLd } from "@/components/shared/JsonLd";
import { formatDate } from "@/helpers/date.helper";
import { buildMetadata } from "@/helpers/metadata.helper";
import { siteConfig } from "@/config/site.config";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await StoryService.getPublishedBySlug(slug);

  if (!story) {
    return { title: "Story not found" };
  }

  return buildMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${story.slug}`,
    image: story.bannerImage.url,
    type: "article",
    publishedTime: story.publishedAt ?? undefined,
    modifiedTime: story.updatedAt,
  });
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await StoryService.getPublishedBySlug(slug);

  if (!story) {
    notFound();
  }

  const [related, adjacent] = await Promise.all([
    StoryService.getRelated(story.id),
    StoryService.getAdjacent(story.publishedAt),
  ]);

  const storyUrl = `${siteConfig.url}/stories/${story.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.excerpt,
          image: [story.bannerImage.url],
          datePublished: story.publishedAt,
          dateModified: story.updatedAt,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.ogImage}` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": storyUrl },
        }}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: story.title }]} />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <article className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{story.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            {story.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {formatDate(story.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="size-4" />
              {story.readingTime} min read
            </span>
          </div>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-lg bg-muted">
            <Image
              src={story.bannerImage.url}
              alt={story.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-8">
            <StoryContent html={story.content} />
          </div>

          <div className="mt-10 border-t pt-6">
            <SocialShareButtons url={storyUrl} title={story.title} />
          </div>
        </article>

        <StorySidebar upNext={adjacent.next} related={related} />
      </div>
    </div>
  );
}
