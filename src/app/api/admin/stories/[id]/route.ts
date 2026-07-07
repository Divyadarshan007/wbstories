import { asyncHandler } from "@/helpers/async-handler";
import { AdminStoryController } from "@/controllers/admin-story.controller";

export const GET = asyncHandler(AdminStoryController.getById);
export const PUT = asyncHandler(AdminStoryController.update);
export const DELETE = asyncHandler(AdminStoryController.remove);
