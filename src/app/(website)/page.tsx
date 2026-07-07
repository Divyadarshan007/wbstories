import { StoryService } from "@/services/story.service";
import { StoryGrid } from "@/components/website/StoryGrid";
import { StoryPagination } from "@/components/website/StoryPagination";
import { JsonLd } from "@/components/shared/JsonLd";
import { siteConfig } from "@/config/site.config";
import { buildMetadata } from "@/helpers/metadata.helper";

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = buildMetadata({
  title: siteConfig.tagline,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const latest = await StoryService.listPublicStories({
    page,
    limit: 9,
    sortBy: "publishedAt",
    order: "desc",
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{siteConfig.tagline}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground sm:text-lg">{siteConfig.description}</p>
        <div className="mt-10">
          <StoryGrid stories={latest.items} />
        </div>
        <div className="mt-10">
          <StoryPagination page={latest.meta.page} totalPages={latest.meta.totalPages} />
        </div>
      </div>
    </>
  );
}
