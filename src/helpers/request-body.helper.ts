import type { NextRequest } from "next/server";
import { ApiError } from "@/helpers/api-error";

/** A malformed body is a client error (400), not a server fault (500). */
export async function parseJsonBody<T = unknown>(req: NextRequest): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    throw ApiError.badRequest("Request body must be valid JSON");
  }
}

export async function parseFormData(req: NextRequest): Promise<FormData> {
  try {
    return await req.formData();
  } catch {
    throw ApiError.badRequest("Request body must be valid multipart/form-data");
  }
}
