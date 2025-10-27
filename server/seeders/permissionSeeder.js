import Permission from '../models/Permission.js'

const DEFAULT_PERMISSIONS = {
  ROLE: [
    { title: "Create Role", slug: "role.create", module: "role" },
    { title: "Update Role", slug: "role.update", module: "role" },
    { title: "Delete Role", slug: "role.delete", module: "role" },
    { title: "View Role", slug: "role.view", module: "role" },
    { title: "List Roles", slug: "role.list", module: "role" },
    { title: "Assign Role", slug: "role.assign", module: "role" },
  ],

  PERMISSION: [
    { title: "Create Permission", slug: "permission.create", module: "permission" },
    { title: "Update Permission", slug: "permission.update", module: "permission" },
    { title: "Delete Permission", slug: "permission.delete", module: "permission" },
    { title: "View Permission", slug: "permission.view", module: "permission" },
    { title: "List Permissions", slug: "permission.list", module: "permission" },
    { title: "Assign Permission", slug: "permission.assign", module: "permission" },
  ],

  USER: [
    { title: "Create User", slug: "user.create", module: "user" },
    { title: "Update User", slug: "user.update", module: "user" },
    { title: "Delete User", slug: "user.delete", module: "user" },
    { title: "View User", slug: "user.view", module: "user" },
    { title: "List Users", slug: "user.list", module: "user" },
    { title: "Assign Role to User", slug: "user.assign_role", module: "user" },
    { title: "Assign Permission to User", slug: "user.assign_permission", module: "user" },
    { title: "Activate User", slug: "user.activate", module: "user" },
    { title: "Deactivate User", slug: "user.deactivate", module: "user" },
  ],
};

export const seedPermissions = async () => {
  
  const allPerms = Object.values(DEFAULT_PERMISSIONS).flat();

  for (const perm of allPerms) {
    const exists = await Permission.findOne({ slug: perm.slug });
    if (!exists) {
      await Permission.create({
        ...perm,
        description: `${perm.title} permission`,
        active: true,
      });
    }
  }

  console.log("✓ Permission seeding complete!");
};
