import { asyncHandler } from "@/helpers/async-handler";
import { LinkPreviewController } from "@/controllers/link-preview.controller";

// node:dns/node:net (used for the SSRF guard in link-preview.service.ts)
// require the Node runtime.
export const runtime = "nodejs";

export const GET = asyncHandler(LinkPreviewController.getPreview);
