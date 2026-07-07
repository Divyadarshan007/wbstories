import { z } from "zod";
import { paginationQuerySchema, searchQuerySchema, sortQuerySchema } from "@/validations/common.validation";

const bannerImageSchema = z.object({
  url: z.string().url("Banner image URL must be valid"),
  publicId: z.string().min(1, "Banner image publicId is required"),
});

export const createStorySchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters").max(500),
  bannerImage: bannerImageSchema,
  content: z.string().min(1, "Story content is required"),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const updateStorySchema = createStorySchema.partial();

export const adminStoryListQuerySchema = paginationQuerySchema
  .merge(searchQuerySchema)
  .merge(sortQuerySchema)
  .extend({
    status: z.enum(["draft", "published", "all"]).optional().default("all"),
  });

export type CreateStoryInput = z.infer<typeof createStorySchema>;
export type UpdateStoryInput = z.infer<typeof updateStorySchema>;
export type AdminStoryListQuery = z.infer<typeof adminStoryListQuerySchema>;
