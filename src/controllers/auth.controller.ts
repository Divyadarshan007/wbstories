import type { NextRequest } from "next/server";
import { AuthService } from "@/services/auth.service";
import { ResponseBuilder } from "@/helpers/api-response";
import { ApiError } from "@/helpers/api-error";
import { setAuthCookie, clearAuthCookie } from "@/utils/cookie.util";
import { verifyAdminToken } from "@/utils/jwt.util";
import { loginSchema } from "@/validations/auth.validation";
import { ADMIN_TOKEN_COOKIE } from "@/constants/cookie.constants";
import { parseJsonBody } from "@/helpers/request-body.helper";

export const AuthController = {
  /** POST /api/auth/login */
  async login(req: NextRequest) {
    const body = await parseJsonBody(req);
    const input = loginSchema.parse(body);
    const { token, email } = await AuthService.login(input);

    const response = ResponseBuilder.success({ email }, "Logged in successfully");
    setAuthCookie(response, token);
    return response;
  },

  /** POST /api/auth/logout */
  async logout(_req: NextRequest) {
    const response = ResponseBuilder.success(null, "Logged out successfully");
    clearAuthCookie(response);
    return response;
  },

  /** GET /api/auth/me */
  async me(req: NextRequest) {
    const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
    if (!token) {
      throw ApiError.unauthorized("Not authenticated");
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      throw ApiError.unauthorized("Session expired or invalid");
    }

    const admin = await AuthService.getCurrentAdmin(payload.sub);
    return ResponseBuilder.success(admin, "Current admin fetched");
  },
};
