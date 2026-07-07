import { asyncHandler } from "@/helpers/async-handler";
import { StoryController } from "@/controllers/story.controller";

export const GET = asyncHandler(StoryController.related);
