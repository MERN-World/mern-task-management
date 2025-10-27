import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

export const seedRoles = async () => {
  await Role.deleteMany()

  const rolesData = [
    { title: "Administrator", slug: "admin", description: "Full system access" },
    { title: "Manager", slug: "manager", description: "Can manage users and roles" },
    { title: "Viewer", slug: "viewer", description: "Read-only access" },
  ];

  for (const roleData of rolesData) {
    let role = await Role.findOne({ slug: roleData.slug });
    if (!role) {
      role = await Role.create(roleData);
    }

    if (role.slug === "admin") {
      const permissions = await Permission.find();
      role.permissions = permissions.map((p) => p._id);
      await role.save();
    }
  }

  console.log("✓ Role seeding complete!");
};
