import { asyncHandler } from "@/helpers/async-handler";
import { AuthController } from "@/controllers/auth.controller";

export const GET = asyncHandler(AuthController.me);
