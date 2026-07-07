import type { NextRequest } from "next/server";
import { StoryService } from "@/services/story.service";
import { ResponseBuilder } from "@/helpers/api-response";
import { ApiError } from "@/helpers/api-error";
import {
  paginationQuerySchema,
  searchQuerySchema,
  sortQuerySchema,
} from "@/validations/common.validation";

function queryToObject(searchParams: URLSearchParams): Record<string, string> {
  return Object.fromEntries(searchParams.entries());
}

export const StoryController = {
  /** GET /api/stories — published stories only, paginated/searchable/sortable. */
  async list(req: NextRequest) {
    const params = queryToObject(req.nextUrl.searchParams);
    const { page, limit } = paginationQuerySchema.parse(params);
    const { q } = searchQuerySchema.parse(params);
    const { sortBy, order } = sortQuerySchema.parse(params);

    const result = await StoryService.listPublicStories({ page, limit, q, sortBy, order });
    return ResponseBuilder.success(result.items, "Stories fetched", 200, result.meta);
  },

  /** GET /api/stories/[slug] */
  async getBySlug(_req: NextRequest, context: { params: Promise<{ slug: string }> }) {
    const { slug } = await context.params;
    const story = await StoryService.getPublishedBySlug(slug);
    if (!story) {
      throw ApiError.notFound("Story not found");
    }
    return ResponseBuilder.success(story, "Story fetched");
  },

  /** GET /api/stories/latest */
  async latest(req: NextRequest) {
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 6;
    const stories = await StoryService.getLatest(limit);
    return ResponseBuilder.success(stories, "Latest stories fetched");
  },

  /** GET /api/stories/related/[id] */
  async related(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 4;
    const stories = await StoryService.getRelated(id, limit);
    return ResponseBuilder.success(stories, "Related stories fetched");
  },
};
