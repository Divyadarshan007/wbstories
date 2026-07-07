import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/constants/http-status.constants";
import type { ApiResponse, PaginationMeta } from "@/types/api.types";

export const ResponseBuilder = {
  success<T>(
    data: T,
    message = "Success",
    status: number = HTTP_STATUS.OK,
    meta?: PaginationMeta,
  ) {
    const body: ApiResponse<T> = {
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    };
    return NextResponse.json(body, { status });
  },

  error(
    message: string,
    status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    code?: string,
    details?: unknown,
  ) {
    const body: ApiResponse<null> = {
      success: false,
      message,
      data: null,
      ...(code ? { code } : {}),
      ...(details ? { details } : {}),
    };
    return NextResponse.json(body, { status });
  },
};
