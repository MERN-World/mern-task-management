import bcrypt from "bcrypt";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import {hashPassword} from '../services/auth/authService.js'

export const seedUsers = async () => {
  const email = "superadmin@example.com";
  const password = "Admin@123";

  let superAdmin = await User.findOne({ email });

  if (!superAdmin) {
    const hashedPassword = await hashPassword(password);
    const adminRole = await Role.findOne({ slug: "admin" });
    const allPermissions = await Permission.find();

    superAdmin = await User.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      active: true,
      roles: [adminRole._id],
      permissions: allPermissions.map((p) => p._id),
    });
  } 

  console.log("✓ User seeding complete!");
};
