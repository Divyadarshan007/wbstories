import type { Document, Types } from "mongoose";

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Shape returned by `.lean()` queries — same fields, no Document methods. */
export type LeanAdmin = Omit<IAdmin, keyof Document> & { _id: Types.ObjectId };
