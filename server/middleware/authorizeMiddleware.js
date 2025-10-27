import { forbidden } from "../utils/responseHandler.js";

export const authorize = (permission) => {
  return async (req, res, next) => {
    const user = req.user;
    const allowed = await hasPermission(user, permission);

    if (!allowed) 
      return forbidden(res,"Forbidden: Access denied.")

    next();
  };
};


export const hasPermission = async (user, permission) => {
  await user.populate({
    path: "roles",
    populate: { path: "permissions" },
  });
  await user.populate("permissions");

  const rolePermissions = user.roles.flatMap(role => role.permissions.map(p => p.name));
  const userPermissions = user.permissions.map(p => p.name);

  return rolePermissions.includes(permission) || userPermissions.includes(permission);
};
