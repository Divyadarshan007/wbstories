import type { NextRequest } from "next/server";
import { UploadService } from "@/services/upload.service";
import { ResponseBuilder } from "@/helpers/api-response";
import { ApiError } from "@/helpers/api-error";
import { parseFormData } from "@/helpers/request-body.helper";
import { HTTP_STATUS } from "@/constants/http-status.constants";

export const UploadController = {
  /** POST /api/upload — multipart/form-data with a "file" field (and optional "previousPublicId"). */
  async uploadImage(req: NextRequest) {
    const formData = await parseFormData(req);
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw ApiError.badRequest('A file field named "file" is required');
    }

    const previousPublicId = formData.get("previousPublicId");
    const bannerImage = await UploadService.uploadBannerImage(
      file,
      typeof previousPublicId === "string" && previousPublicId ? previousPublicId : undefined,
    );

    return ResponseBuilder.success(bannerImage, "Image uploaded", HTTP_STATUS.CREATED);
  },
};
