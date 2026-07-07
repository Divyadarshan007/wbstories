import { Share2 } from "lucide-react";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

function buildShareTargets(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];
}

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const targets = buildShareTargets(url, title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-sm text-muted-foreground">
        <Share2 className="size-4" /> Share:
      </span>
      {targets.map((target) => (
        <a
          key={target.label}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {target.label}
        </a>
      ))}
      <CopyLinkButton url={url} />
    </div>
  );
}
