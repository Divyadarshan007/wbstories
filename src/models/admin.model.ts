import mongoose, { Schema } from "mongoose";
import type { IAdmin } from "@/interfaces/admin.interface";

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

export const AdminModel =
  (mongoose.models.Admin as mongoose.Model<IAdmin>) ??
  mongoose.model<IAdmin>("Admin", AdminSchema);
