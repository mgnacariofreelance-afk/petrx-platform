import { redirect } from "next/navigation";
import {
  getOrganizationContext,
  hasOrganizationPermission,
  requireOrganizationPermission,
  type OrganizationContext,
} from "./organization-context";

export type AuthContext = OrganizationContext;

export async function getAuthContext(): Promise<AuthContext | null> {
  return getOrganizationContext();
}

export async function requireAuthContext(): Promise<AuthContext> {
  const context = await getOrganizationContext();
  if (!context) redirect("/login");
  return context;
}

export function hasPermission(context: AuthContext, permission: string) {
  return hasOrganizationPermission(context, permission);
}

export function requirePermission(context: AuthContext, permission: string) {
  return requireOrganizationPermission(context, permission);
}

export function hasRole(context: AuthContext, role: string) {
  return context.roles.includes(role);
}
