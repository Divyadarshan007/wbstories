import { asyncHandler } from "@/helpers/async-handler";
import { AuthController } from "@/controllers/auth.controller";

export const POST = asyncHandler(AuthController.logout);
