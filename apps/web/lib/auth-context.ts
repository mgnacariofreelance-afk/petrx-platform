import { redirect } from "next/navigation";
import {
  getOrganizationContext,
  hasOrganizationPermission,
  requireOrganizationPermission,
  type OrganizationContext,
} from "./organization-context";

export type AuthContext = OrganizationContext & {
  email: string;
};

export async function getAuthContext(): Promise<AuthContext | null> {
  const context = await getOrganizationContext();
  if (!context) return null;

  const email = "";
  return { ...context, email };
}

export async function requireAuthContext() {
  const context = await getOrganizationContext();
  if (!context) redirect("/login");

  return {
    ...context,
    email: "",
  } satisfies AuthContext;
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
