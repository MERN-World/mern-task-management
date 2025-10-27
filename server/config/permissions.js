export const PERMISSIONS = {
  ROLE: {
    CREATE: "role.create",
    UPDATE: "role.update",
    DELETE: "role.delete",
    VIEW: "role.view",   
    LIST: "role.list",  
    ASSIGN: "role.assign", 
  },

  PERMISSION: {
    CREATE: "permission.create",
    UPDATE: "permission.update",
    DELETE: "permission.delete",
    VIEW: "permission.view",
    LIST: "permission.list",
    ASSIGN: "permission.assign",
  },

  USER: {
    CREATE: "user.create",
    UPDATE: "user.update",
    DELETE: "user.delete",
    VIEW: "user.view",
    LIST: "user.list",
    ASSIGN_ROLE: "user.assign_role",         
    ASSIGN_PERMISSION: "user.assign_permission", 
    DEACTIVATE: "user.deactivate",            
    ACTIVATE: "user.activate",                
  },
};
