export async function register() {
  // Importing env.ts parses process.env through Zod at module load time and
  // throws immediately if anything required is missing — fail fast at boot
  // instead of inside a random request handler.
  await import("@/config/env");
}
