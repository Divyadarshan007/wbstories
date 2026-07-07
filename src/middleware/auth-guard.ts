import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/utils/jwt.util";
import { ADMIN_TOKEN_COOKIE } from "@/constants/cookie.constants";

export async function verifyAdminSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verifyAdminToken(token);
}
