import { redirect } from "next/navigation";
import { createAdminClient } from "./supabase/admin";
import { createClient } from "./supabase/server";

export type AuthContext = {
  userId: string;
  email: string;
  membershipId: string;
  organizationId: string;
  organizationName: string;
  organizationType: string;
  subscriptionStatus: string;
  trialExpiresAt: string | null;
  roles: string[];
  permissions: string[];
};

export async function getAuthContext(): Promise<AuthContext | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const admin = createAdminClient();
  const { data: membership, error: membershipError } = await admin
    .from("organization_memberships")
    .select("id, organization_id, status")
    .eq("user_id", data.user.id)
    .eq("status", "ACTIVE")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError || !membership) return null;

  const [{ data: organization }, { data: userRoles }] = await Promise.all([
    admin.from("organizations").select("id, name, organization_type, subscription_status, trial_expires_at").eq("id", membership.organization_id).maybeSingle(),
    admin.from("user_roles").select("role_id").eq("membership_id", membership.id),
  ]);

  if (!organization) return null;

  const roleIds = (userRoles ?? []).map((item) => item.role_id);
  let roles: string[] = [];
  let permissions: string[] = [];

  if (roleIds.length) {
    const [{ data: roleRows }, { data: permissionRows }] = await Promise.all([
      admin.from("roles").select("id, code").in("id", roleIds),
      admin.from("role_permissions").select("permission_id").in("role_id", roleIds),
    ]);

    roles = (roleRows ?? []).map((role) => role.code);
    const permissionIds = (permissionRows ?? []).map((item) => item.permission_id);

    if (permissionIds.length) {
      const { data: permissionData } = await admin.from("permissions").select("code").in("id", permissionIds);
      permissions = [...new Set((permissionData ?? []).map((item) => item.code))];
    }
  }

  return {
    userId: data.user.id,
    email: data.user.email ?? "",
    membershipId: membership.id,
    organizationId: organization.id,
    organizationName: organization.name,
    organizationType: organization.organization_type,
    subscriptionStatus: organization.subscription_status,
    trialExpiresAt: organization.trial_expires_at,
    roles,
    permissions,
  };
}

export async function requireAuthContext() {
  const context = await getAuthContext();
  if (!context) redirect("/login");
  return context;
}

export function hasPermission(context: AuthContext, permission: string) {
  return context.permissions.includes(permission);
}

export function hasRole(context: AuthContext, role: string) {
  return context.roles.includes(role);
}
