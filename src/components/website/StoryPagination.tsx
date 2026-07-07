import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryPaginationProps {
  page: number;
  totalPages: number;
  query?: string;
}

function buildHref(page: number, query?: string): string {
  const params = new URLSearchParams();
  if (query) {
    params.set("q", query);
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  const queryString = params.toString();
  return queryString ? `/?${queryString}` : "/";
}

// Real <Link> hrefs rather than client-side onClick handlers — pagination
// stays crawlable and works without JS, matching StorySearchForm's approach.
export function StoryPagination({ page, totalPages, query }: StoryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={buildHref(Math.max(1, page - 1), query)}
        aria-disabled={isFirstPage}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-md border text-sm",
          isFirstPage ? "pointer-events-none opacity-50" : "hover:bg-muted",
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>
      <span className="px-2 text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Link
        href={buildHref(Math.min(totalPages, page + 1), query)}
        aria-disabled={isLastPage}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-md border text-sm",
          isLastPage ? "pointer-events-none opacity-50" : "hover:bg-muted",
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
