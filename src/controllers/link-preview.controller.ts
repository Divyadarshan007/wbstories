import type { NextRequest } from "next/server";
import { linkPreviewQuerySchema } from "@/validations/link-preview.validation";
import { LinkPreviewService } from "@/services/link-preview.service";
import { ResponseBuilder } from "@/helpers/api-response";

export const LinkPreviewController = {
  /** GET /api/admin/link-preview?url=... — Open Graph metadata for a pasted URL. */
  async getPreview(req: NextRequest) {
    const { url } = linkPreviewQuerySchema.parse({
      url: req.nextUrl.searchParams.get("url"),
    });

    const preview = await LinkPreviewService.fetchPreview(url);
    return ResponseBuilder.success(preview);
  },
};
