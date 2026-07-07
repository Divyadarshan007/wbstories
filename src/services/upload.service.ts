import { uploadFileSchema } from "@/validations/upload.validation";
import { uploadImageBuffer, deleteImage } from "@/utils/cloudinary.util";
import type { IBannerImage } from "@/interfaces/story.interface";

export const UploadService = {
  async uploadBannerImage(file: File, previousPublicId?: string): Promise<IBannerImage> {
    uploadFileSchema.parse(file);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await uploadImageBuffer(buffer);

    if (previousPublicId) {
      // Best-effort cleanup — a failed delete of the old asset should never
      // block the new upload from succeeding.
      await deleteImage(previousPublicId).catch((error: unknown) => {
        console.error("Failed to delete previous Cloudinary asset:", error);
      });
    }

    return { url: result.url, publicId: result.publicId };
  },
};
