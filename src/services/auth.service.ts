import { AdminRepository } from "@/repositories/admin.repository";
import { comparePassword } from "@/utils/password.util";
import { signAdminToken } from "@/utils/jwt.util";
import { ApiError } from "@/helpers/api-error";
import type { LoginInput } from "@/validations/auth.validation";

export const AuthService = {
  async login(input: LoginInput): Promise<{ token: string; email: string }> {
    const admin = await AdminRepository.findByEmailWithPassword(input.email);
    // Same error for "no such admin" and "wrong password" — never let a
    // response reveal whether an email address exists in the system.
    if (!admin) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const isValidPassword = await comparePassword(input.password, admin.password);
    if (!isValidPassword) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const token = await signAdminToken({ sub: admin._id.toString(), email: admin.email });
    return { token, email: admin.email };
  },

  async getCurrentAdmin(adminId: string): Promise<{ id: string; email: string }> {
    const admin = await AdminRepository.findById(adminId);
    if (!admin) {
      throw ApiError.unauthorized("Session is no longer valid");
    }
    return { id: admin._id.toString(), email: admin.email };
  },
};
