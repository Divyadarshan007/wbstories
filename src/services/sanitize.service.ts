import sanitizeHtmlLib from "sanitize-html";

// Tag/attribute allowlist matches the CKEditor 5 toolbar configured in
// lib/ckeditor.config.ts (headings, lists, images, media embed, blockquote,
// hr, bookmark cards) — never widen this without widening the editor config
// to match, and vice versa. `iframe` stays allowed (and hostname-restricted
// below) for MediaEmbed's YouTube/Vimeo/etc. output; `blockquote` covers
// Twitter/X's link-only embed format, which its widgets.js upgrades
// client-side.
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "img",
  "figure",
  "figcaption",
  "hr",
  "iframe",
  "span",
  "div",
];

const ALLOWED_ATTR = [
  "href",
  "src",
  "alt",
  "title",
  "class",
  "target",
  "rel",
  "width",
  "height",
  "style",
  "colspan",
  "rowspan",
  "frameborder",
  "allow",
  "allowfullscreen",
  // CKEditor's MediaEmbed upcast converter (with previewsInData: true) looks
  // for this attribute on the <div> inside <figure class="media"> to
  // recognize and rebuild the media widget when loading data back into the
  // editor — without it, the embed is dropped silently on load even though
  // the iframe itself survives sanitization and still renders on the public
  // page. See lib/ckeditor.config.ts and @ckeditor/ckeditor5-media-embed's
  // createMediaFigureElement.
  "data-oembed-url",
  // Same round-trip purpose as data-oembed-url above, but for the bookmark
  // card widget (lib/ckeditor-bookmark-card.plugin.ts) — its upcast
  // converter rebuilds the model element straight from these instead of
  // reverse-parsing the visible thumbnail/title/description markup.
  "data-bookmark-url",
  "data-title",
  "data-description",
  "data-image",
  "data-site-name",
  "data-favicon",
];

// Scoped to just the layout properties MediaEmbed's iframe templates set
// inline (e.g. `width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0;
// display: block;`) — not a general style allowance.
const ALLOWED_STYLES = {
  width: [/^\d+(?:\.\d+)?(?:px|%)$/],
  height: [/^\d+(?:\.\d+)?(?:px|%)$/, /^auto$/],
  "aspect-ratio": [/^\d+\s*\/\s*\d+$/],
  border: [/^0$/],
  display: [/^block$/],
};

// The only hosts MediaEmbed is configured to embed from (lib/ckeditor.config.ts) —
// keeps the iframe allowance from becoming an open door to embed arbitrary sites.
const ALLOWED_IFRAME_HOSTNAMES = [
  "www.youtube.com",
  "player.vimeo.com",
  "www.dailymotion.com",
  "open.spotify.com",
];

/**
 * Single source of truth for sanitizing CKEditor HTML. Called on write
 * (before persisting) and again on read (defense in depth) — never trust
 * HTML pulled from the database either, in case the allowlist changes later.
 */
export function sanitizeHtml(dirtyHtml: string): string {
  return sanitizeHtmlLib(dirtyHtml, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      "*": ALLOWED_ATTR,
    },
    allowedStyles: {
      "*": ALLOWED_STYLES,
    },
    allowedIframeHostnames: ALLOWED_IFRAME_HOSTNAMES,
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
    },
  });
}
