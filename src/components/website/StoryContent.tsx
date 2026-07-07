import { sanitizeHtml } from "@/services/sanitize.service";

interface StoryContentProps {
  html: string;
}

// Defense in depth: content is sanitized before it's ever persisted, and
// sanitized again here at render time in case the allowlist changes later.
export function StoryContent({ html }: StoryContentProps) {
  const safeHtml = sanitizeHtml(html);

  return (
    <div
      className="prose prose-neutral max-w-none dark:prose-invert prose-a:text-primary prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
