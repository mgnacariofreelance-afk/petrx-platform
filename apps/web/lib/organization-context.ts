import { redirect } from "next/navigation";
import { createAdminClient } from "./supabase/admin";
import { createClient } from "./supabase/server";

export type OrganizationContext = {
  userId: string;
  membershipId: string;
  organizationId: string;
  organizationName: string;
  organizationType: string;
  organizationStatus: string;
  subscriptionStatus: string;
  trialStartedAt: string | null;
  trialExpiresAt: string | null;
  roles: string[];
  permissions: string[];
};

export async function getOrganizationContext(): Promise<OrganizationContext | null> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return null;

  const admin = createAdminClient();
  const { data: user, error: userError } = await admin
    .from("users")
    .select("id, email, status")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (userError || !user || user.status !== "ACTIVE") return null;

  const { data: membership, error: membershipError } = await admin
    .from("organization_memberships")
    .select("id, organization_id, status")
    .eq("user_id", user.id)
    .eq("status", "ACTIVE")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError || !membership) return null;

  const [{ data: organization, error: organizationError }, { data: userRoles, error: rolesError }] = await Promise.all([
    admin
      .from("organizations")
      .select("id, name, organization_type, subscription_status, trial_started_at, trial_expires_at")
      .eq("id", membership.organization_id)
      .maybeSingle(),
    admin.from("user_roles").select("role_id").eq("membership_id", membership.id),
  ]);

  if (organizationError || rolesError || !organization) return null;

  const roleIds = [...new Set((userRoles ?? []).map((item) => item.role_id))];
  if (!roleIds.length) {
    return {
      userId: user.id,
      membershipId: membership.id,
      organizationId: organization.id,
      organizationName: organization.name,
      organizationType: organization.organization_type,
      organizationStatus: "ACTIVE",
      subscriptionStatus: organization.subscription_status,
      trialStartedAt: organization.trial_started_at,
      trialExpiresAt: organization.trial_expires_at,
      roles: [],
      permissions: [],
    };
  }

  const [{ data: roleRows, error: roleError }, { data: rolePermissions, error: permissionError }] = await Promise.all([
    admin.from("roles").select("id, code").in("id", roleIds),
    admin.from("role_permissions").select("permission_id").in("role_id", roleIds),
  ]);

  if (roleError || permissionError) return null;

  const permissionIds = [...new Set((rolePermissions ?? []).map((item) => item.permission_id))];
  const { data: permissionRows, error: permissionsError } = permissionIds.length
    ? await admin.from("permissions").select("code").in("id", permissionIds)
    : { data: [], error: null };

  if (permissionsError) return null;

  return {
    userId: user.id,
    membershipId: membership.id,
    organizationId: organization.id,
    organizationName: organization.name,
    organizationType: organization.organization_type,
    organizationStatus: "ACTIVE",
    subscriptionStatus: organization.subscription_status,
    trialStartedAt: organization.trial_started_at,
    trialExpiresAt: organization.trial_expires_at,
    roles: [...new Set((roleRows ?? []).map((role) => role.code))],
    permissions: [...new Set((permissionRows ?? []).map((permission) => permission.code))],
  };
}

export async function requireOrganizationContext() {
  const context = await getOrganizationContext();
  if (!context) redirect("/login");

  if (
    context.subscriptionStatus === "TRIAL" &&
    context.trialExpiresAt &&
    new Date(context.trialExpiresAt).getTime() <= Date.now()
  ) {
    redirect("/trial-expired");
  }

  return context;
}

export function hasOrganizationPermission(context: OrganizationContext, permission: string) {
  return context.permissions.includes(permission);
}

export function requireOrganizationPermission(context: OrganizationContext, permission: string) {
  if (!hasOrganizationPermission(context, permission)) {
    throw new Error(`Missing organization permission: ${permission}`);
  }
}
