import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { env } from "@/config/env";
import type { AdminJwtPayload } from "@/interfaces/jwt-payload.interface";

// jose is WebCrypto-based (unlike jsonwebtoken, which needs Node's `crypto`),
// so this same util works identically in Edge middleware, Node route
// handlers, and a VPS `next start` process. Importing the scoped
// `jose/jwt/sign` and `jose/jwt/verify` entry points (instead of the root
// barrel) keeps jose's JWE/compression code — which we never use and which
// isn't Edge-runtime-supported — out of the bundle entirely.
const secretKey = new TextEncoder().encode(env.JWT_SECRET);
const ALGORITHM = "HS256";
const EXPIRES_IN = "7d";

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(secretKey);
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
