import { NextResponse, type NextRequest } from "next/server";
import { resolveContext } from "@/middleware/host";
import { verifyAdminSession } from "@/middleware/auth-guard";

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { isAdmin: isAdminHost, devViewParam } = resolveContext(request);
  const isProd = process.env.NODE_ENV === "production";

  const isApiAuthPath = url.pathname.startsWith("/api/auth");
  const isApiAdminPath = url.pathname.startsWith("/api/admin");
  const isAdminPagePath = url.pathname.startsWith("/admin");

  // On the public host in production, the admin tree must never be reachable
  // by guessing the path directly — only via the admin subdomain.
  // TEMPORARY: disabled until a custom domain is attached (no admin.*
  // subdomain is possible on the shared *.vercel.app domain). /admin/* is
  // reachable by path for now; verifyAdminSession below still fully gates it.
  const hostGateEnabled = false;
  if (hostGateEnabled && !isAdminHost && isProd && (isAdminPagePath || isApiAdminPath)) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // On the admin host, rewrite clean paths ("/", "/stories/new") to the
  // internal /admin/* tree without changing what the browser shows.
  if (isAdminHost && !isAdminPagePath && !isApiAdminPath && !isApiAuthPath) {
    url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
  }

  // Guarded whenever the (possibly rewritten) path targets the admin tree —
  // covers both the admin host and a direct /admin/* path hit in dev.
  const targetsAdminTree = url.pathname.startsWith("/admin") || isApiAdminPath;
  const isLoginPage = url.pathname === "/admin/login";

  if (targetsAdminTree && !isLoginPage) {
    const session = await verifyAdminSession(request);
    if (!session) {
      if (isApiAdminPath) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      if (devViewParam) {
        loginUrl.searchParams.set("view", devViewParam);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return url.pathname === request.nextUrl.pathname
    ? NextResponse.next()
    : NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
