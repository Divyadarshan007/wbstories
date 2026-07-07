import { asyncHandler } from "@/helpers/async-handler";
import { AdminStoryController } from "@/controllers/admin-story.controller";

export const GET = asyncHandler(AdminStoryController.list);
export const POST = asyncHandler(AdminStoryController.create);
