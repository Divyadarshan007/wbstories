import { ChevronDown } from "lucide-react";

function HeroDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* left side */}
      <svg
        className="animate-float absolute top-16 left-[8%] size-24 text-[var(--chart-3)] xl:left-[14%]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          fill="currentColor"
          fillOpacity="0.5"
          d="M52.1,-62.8C66.4,-53.3,76.3,-36.8,79.6,-19.4C82.9,-2,79.7,16.3,71.1,31.6C62.6,46.9,48.7,59.2,32.7,66.4C16.7,73.6,-1.5,75.7,-18.5,71.2C-35.6,66.7,-51.5,55.6,-62.1,40.8C-72.7,26,-78,7.5,-75.3,-9.7C-72.6,-26.9,-61.9,-42.8,-47.9,-52.4C-33.9,-62,-16.9,-65.3,1.4,-67C19.8,-68.7,39.6,-68.8,52.1,-62.8Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="animate-spin-slow absolute top-[42%] left-[3%] size-16 text-[var(--primary)] opacity-40 xl:left-[8%]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
      </svg>

      <span className="animate-float-reverse absolute bottom-24 left-[12%] size-3 rounded-full bg-[var(--chart-1)] opacity-60 xl:left-[18%]" />

      {/* right side */}
      <svg
        className="animate-float-reverse absolute top-10 right-[6%] size-28 text-[var(--chart-5)] xl:right-[12%]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          fill="currentColor"
          fillOpacity="0.6"
          d="M44.7,-54.4C57.5,-45.6,66.6,-31.1,70.1,-15.4C73.5,0.3,71.3,17.2,63.3,31.1C55.3,44.9,41.6,55.7,26.2,61.9C10.8,68.1,-6.3,69.7,-22.1,65.2C-37.9,60.7,-52.4,50.1,-61.2,35.9C-70,21.7,-73.1,3.8,-69.5,-12.5C-65.9,-28.8,-55.6,-43.5,-42.1,-52.3C-28.6,-61.1,-14.3,-64,1.3,-65.7C16.9,-67.4,31.8,-63.2,44.7,-54.4Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="animate-spin-slow absolute top-[46%] right-[4%] size-20 text-[var(--primary)] opacity-40 xl:right-[10%]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
      </svg>

      <span className="animate-float absolute bottom-28 right-[14%] size-4 rounded-full bg-[var(--chart-2)] opacity-50 xl:right-[20%]" />
      <span className="animate-float-reverse absolute top-[18%] right-[20%] size-2 rounded-full bg-[var(--chart-4)] opacity-60 xl:right-[26%]" />
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <HeroDecorations />

      <h1 className="relative max-w-3xl font-serif text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
        Every business has a story <em className="italic">worth telling</em>
      </h1>

      <blockquote className="relative mt-10 max-w-md text-sm text-muted-foreground sm:text-base">
        <p className="font-serif italic">
          &ldquo;The best stories don&rsquo;t stop at what happened — they show why it mattered,
          and who made the call.&rdquo;
        </p>
        <footer className="mt-3 font-serif italic">— WB Stories</footer>
      </blockquote>

      <a
        href="#latest-stories"
        aria-label="Scroll to latest stories"
        className="absolute bottom-10 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  );
}
