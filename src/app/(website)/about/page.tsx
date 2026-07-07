import { buildMetadata } from "@/helpers/metadata.helper";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn more about WB Stories — our mission and the stories we tell.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About WB Stories</h1>
      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <p>
          WB Stories is a home for business stories, insights, and updates — sharing the
          ideas, decisions, and people behind the businesses we cover.
        </p>
        <p>
          Our mission is to tell these stories clearly and honestly, giving readers a real
          look at how businesses grow, adapt, and succeed.
        </p>
      </div>
    </div>
  );
}
