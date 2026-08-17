export type Permission = string;

export type AuthorizationContext = {
  permissions: Permission[];
};

export function hasPermission(context: AuthorizationContext, permission: Permission): boolean {
  return context.permissions.includes(permission);
}

export function requirePermission(context: AuthorizationContext, permission: Permission): void {
  if (!hasPermission(context, permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }
}
