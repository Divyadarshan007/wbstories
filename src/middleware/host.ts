import type { NextRequest } from "next/server";

export interface RequestContext {
  /** True on the real admin.* subdomain in production, or via the dev ?view=admin toggle. */
  isAdmin: boolean;
  /** The dev-only ?view= query value, so it can be preserved across a login redirect. Always null in production. */
  devViewParam: string | null;
}

export function resolveContext(request: NextRequest): RequestContext {
  const hostname = request.headers.get("host") ?? "";
  const isAdminHost = hostname.startsWith("admin.");
  const isDev = process.env.NODE_ENV !== "production";
  const devViewParam = isDev ? request.nextUrl.searchParams.get("view") : null;

  return {
    isAdmin: isAdminHost || devViewParam === "admin",
    devViewParam,
  };
}
