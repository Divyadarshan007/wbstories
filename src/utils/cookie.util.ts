import type { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE, ADMIN_TOKEN_MAX_AGE_SECONDS } from "@/constants/cookie.constants";

export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_TOKEN_MAX_AGE_SECONDS,
    // No explicit `domain`: it defaults to the exact host that set the
    // cookie (admin.mydomain.com in production), so the public site can
    // never read the admin session — least privilege, smaller XSS blast radius.
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
