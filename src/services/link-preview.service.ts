import ogs from "open-graph-scraper";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { ApiError } from "@/helpers/api-error";

export interface LinkPreviewDTO {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
  faviconUrl?: string;
}

const FETCH_TIMEOUT_SECONDS = 6;

// Plenty of sites (Medium included) 403 open-graph-scraper's default request
// — no User-Agent/Accept headers reads as a bot, not a browser tab.
const BROWSER_LIKE_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
};

// This endpoint fetches whatever URL gets pasted into the editor, server-side,
// on the admin's behalf — reject hostnames that resolve to loopback/private/
// link-local ranges so a pasted link can't be used to probe internal network
// services. Not a full DNS-rebinding defense (that requires pinning the
// resolved IP for the actual fetch too), just a best-effort guard behind the
// existing admin-session gate on this route.
function isPrivateAddress(address: string): boolean {
  const version = isIP(address);
  if (version === 4) {
    const parts = address.split(".").map(Number);
    const [a, b] = parts;
    return (
      a === 127 ||
      a === 10 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  if (version === 6) {
    const normalized = address.toLowerCase();
    return normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80:");
  }
  return true; // couldn't classify the address — fail closed
}

async function assertPublicHost(url: URL): Promise<void> {
  if (url.hostname === "localhost") {
    throw ApiError.badRequest("Cannot preview a local address");
  }

  const addresses = await lookup(url.hostname, { all: true }).catch(() => []);
  if (addresses.length === 0 || addresses.some((entry) => isPrivateAddress(entry.address))) {
    throw ApiError.badRequest("Cannot preview a local or private address");
  }
}

function resolveAgainst(base: string, maybeRelative?: string): string | undefined {
  if (!maybeRelative) {
    return undefined;
  }
  try {
    const resolved = new URL(maybeRelative, base);
    // open-graph-scraper falls back to an empty "data:," URI for sites with
    // no favicon at all (e.g. example.com) — not a usable image.
    if (resolved.protocol === "data:" && resolved.pathname === ",") {
      return undefined;
    }
    return resolved.toString();
  } catch {
    return undefined;
  }
}

export const LinkPreviewService = {
  async fetchPreview(rawUrl: string): Promise<LinkPreviewDTO> {
    const url = new URL(rawUrl);
    await assertPublicHost(url);

    const { error, result } = await ogs({
      url: url.toString(),
      timeout: FETCH_TIMEOUT_SECONDS,
      fetchOptions: { headers: BROWSER_LIKE_HEADERS },
    }).catch(() => ({
      error: true as const,
      result: undefined,
    }));

    if (error || !result) {
      throw ApiError.badRequest("Could not fetch a preview for that URL");
    }

    return {
      url: result.ogUrl ?? url.toString(),
      title: result.ogTitle ?? url.hostname,
      description: result.ogDescription,
      imageUrl: resolveAgainst(url.toString(), result.ogImage?.[0]?.url),
      siteName: result.ogSiteName ?? url.hostname,
      faviconUrl: resolveAgainst(url.toString(), result.favicon),
    };
  },
};
