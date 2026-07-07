import { connectToDatabase } from "@/db/connect";
import { AdminModel } from "@/models/admin.model";
import type { LeanAdmin } from "@/interfaces/admin.interface";

async function findByEmailWithPassword(email: string) {
  await connectToDatabase();
  return AdminModel.findOne({ email: email.toLowerCase() })
    .select("+password")
    .lean<LeanAdmin | null>();
}

async function findById(id: string) {
  await connectToDatabase();
  return AdminModel.findById(id).lean<LeanAdmin | null>();
}

export const AdminRepository = {
  findByEmailWithPassword,
  findById,
};
