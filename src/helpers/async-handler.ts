import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/helpers/api-error";
import { ResponseBuilder } from "@/helpers/api-response";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import { ERROR_CODES } from "@/constants/error-codes.constants";

type RouteHandler<Context> = (req: NextRequest, context: Context) => Promise<Response>;

/**
 * Wraps a Controller method as a Route Handler: catches ApiError/ZodError and
 * anything unexpected, and always returns a shaped ApiResponse instead of
 * letting Next.js render a raw framework error page. This is the single
 * global error handler for every API route.
 */
export function asyncHandler<Context = unknown>(
  handler: RouteHandler<Context>,
): RouteHandler<Context> {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return ResponseBuilder.error(error.message, error.statusCode, error.code, error.details);
      }

      if (error instanceof ZodError) {
        return ResponseBuilder.error(
          "Validation failed",
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          error.flatten(),
        );
      }

      console.error("Unhandled API error:", error);
      return ResponseBuilder.error(
        "Something went wrong. Please try again later.",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.INTERNAL_ERROR,
      );
    }
  };
}
