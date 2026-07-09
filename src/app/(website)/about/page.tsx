import Link from "next/link";
import { ArrowRight, Compass, PenLine, ShieldCheck, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/helpers/metadata.helper";
import { siteConfig } from "@/config/site.config";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn more about WB Stories — our mission and the stories we tell.",
  path: "/about",
});

const values = [
  {
    icon: PenLine,
    title: "Clarity over jargon",
    description:
      "Business can be complicated. We write so the ideas land — no buzzwords, no filler, just the story.",
  },
  {
    icon: ShieldCheck,
    title: "Honesty first",
    description:
      "We report what actually happened, setbacks included. Readers trust us because we don't sugarcoat.",
  },
  {
    icon: Users,
    title: "People, not just numbers",
    description:
      "Behind every launch, pivot, or failure is someone who made the call. We tell their side of it.",
  },
  {
    icon: Compass,
    title: "Curiosity-driven",
    description:
      "We chase the ‘why’ behind a decision as hard as the ‘what’ — that's usually where the real story lives.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <span className="animate-float absolute top-8 left-[12%] size-3 rounded-full bg-[var(--chart-1)] opacity-50" />
          <span className="animate-float-reverse absolute top-28 right-[16%] size-4 rounded-full bg-[var(--chart-2)] opacity-40" />
          <svg
            className="animate-spin-slow absolute bottom-2 right-[8%] size-20 text-[var(--primary)] opacity-30"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
          </svg>
        </div>

        <p className="text-sm font-medium tracking-wide text-primary uppercase">About WB Stories</p>
        <h1 className="relative mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
          Every business has a story <em className="italic">worth telling</em>
        </h1>
        <p className="relative mx-auto mt-6 max-w-xl text-muted-foreground">
          We&rsquo;re a home for the ideas, decisions, and people behind the businesses making
          news &mdash; told with the depth a press release never gives you.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p>
            WB Stories started with a simple frustration: most business coverage tells you{" "}
            <em>what</em> happened and stops there &mdash; a funding round, a product launch, a
            resignation, the headline and nothing else.
          </p>
          <p>
            We wanted the rest of it: the reasoning behind the bet, the tradeoffs nobody put in
            the press release, the moment someone in the room had to choose. So that&rsquo;s what
            we go after &mdash; business journalism that treats decisions as stories, not just
            data points.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 text-center">
        <blockquote className="mx-auto max-w-md">
          <p className="font-serif text-lg italic sm:text-xl">
            &ldquo;The best stories don&rsquo;t stop at what happened &mdash; they show why it
            mattered, and who made the call.&rdquo;
          </p>
          <footer className="mt-3 font-serif text-sm text-muted-foreground italic">
            &mdash; WB Stories
          </footer>
        </blockquote>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          What we stand for
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardContent className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Got a story we should be telling?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Reach out, or start with what we&rsquo;ve already published.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/#latest-stories" className={buttonVariants({ size: "lg" })}>
            Read our stories
            <ArrowRight />
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Get in touch
          </Link>
        </div>
        <p className="mt-10 text-xs text-muted-foreground">
          Site designed &amp; built by{" "}
          <Link
            href={siteConfig.builtBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 hover:text-foreground"
          >
            {siteConfig.builtBy.name}
          </Link>
        </p>
      </section>
    </>
  );
}
