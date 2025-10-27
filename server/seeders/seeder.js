import connectDB from "../config/db.js";
import dotenv from "dotenv";
import { seedPermissions } from "./permissionSeeder.js";
import { seedRoles } from "./roleSeeder.js";
import { seedUsers } from "./userSeeder.js";

dotenv.config();

const runSeeders = async () => {
  await connectDB();

  try {
    await seedPermissions();
    await seedRoles();
    await seedUsers();

    console.log("🎉 All seeders completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder failed:", err);
    process.exit(1);
  }
};

runSeeders();
