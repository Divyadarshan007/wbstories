import { z } from "zod";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const uploadFileSchema = z
  .instanceof(File, { message: "A file is required" })
  .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number]), {
    message: `Unsupported file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE_BYTES, {
    message: `File too large. Max size is ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)}MB.`,
  });
