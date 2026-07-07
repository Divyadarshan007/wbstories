import type { Mongoose } from "mongoose";

declare global {
  // Cached across hot-reloads (dev) and serverless invocations (prod) so we
  // never open more than one connection per process.
  var mongooseCache:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

export {};
