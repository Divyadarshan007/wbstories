import mongoose from "mongoose";
import { AdminModel } from "../src/models/admin.model";
import { hashPassword } from "../src/utils/password.util";

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  const mongoUri = process.env.MONGODB_URI;

  if (!email || !password) {
    throw new Error(
      "ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set in .env.local (see .env.local.example).",
    );
  }
  if (!mongoUri) {
    throw new Error("MONGODB_URI must be set in .env.local.");
  }

  await mongoose.connect(mongoUri);

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await AdminModel.findOne({ email: normalizedEmail });
  if (existing) {
    console.log(`Admin with email "${normalizedEmail}" already exists. Nothing to do.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await hashPassword(password);
  await AdminModel.create({ email: normalizedEmail, password: hashedPassword });
  console.log(`Admin account created for "${normalizedEmail}".`);

  await mongoose.disconnect();
}

main().catch((error: unknown) => {
  console.error("Failed to seed admin:", error);
  process.exit(1);
});
