import type { NextRequest } from "next/server";
import { StoryService } from "@/services/story.service";
import { ResponseBuilder } from "@/helpers/api-response";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import {
  createStorySchema,
  updateStorySchema,
  adminStoryListQuerySchema,
} from "@/validations/story.validation";
import { parseJsonBody } from "@/helpers/request-body.helper";

export const AdminStoryController = {
  /** GET /api/admin/stories — all statuses, paginated/search/sort/status-filter. */
  async list(req: NextRequest) {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const query = adminStoryListQuerySchema.parse(params);
    const result = await StoryService.listAdminStories(query);
    return ResponseBuilder.success(result.items, "Stories fetched", HTTP_STATUS.OK, result.meta);
  },

  /** GET /api/admin/stories/[id] */
  async getById(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const story = await StoryService.getByIdForAdmin(id);
    return ResponseBuilder.success(story, "Story fetched");
  },

  /** POST /api/admin/stories */
  async create(req: NextRequest) {
    const body = await parseJsonBody(req);
    const input = createStorySchema.parse(body);
    const story = await StoryService.createStory(input);
    return ResponseBuilder.success(story, "Story created", HTTP_STATUS.CREATED);
  },

  /** PUT /api/admin/stories/[id] */
  async update(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await parseJsonBody(req);
    const input = updateStorySchema.parse(body);
    const story = await StoryService.updateStory(id, input);
    return ResponseBuilder.success(story, "Story updated");
  },

  /** DELETE /api/admin/stories/[id] */
  async remove(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    await StoryService.deleteStory(id);
    return ResponseBuilder.success(null, "Story deleted");
  },
};
