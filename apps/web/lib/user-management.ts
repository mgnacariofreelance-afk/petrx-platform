import { createAdminClient } from "./supabase/admin";
import { getOrganizationContext, requireOrganizationPermission } from "./organization-context";

export const USER_MANAGEMENT_PERMISSIONS = { READ: "user.read", CREATE: "user.create", UPDATE: "user.update", DEACTIVATE: "user.deactivate", ASSIGN_ROLE: "user.assign_role" } as const;
export type ManagedUser = { userId: string; email: string; status: string; membershipId: string; membershipStatus: string; roles: string[] };

async function requireContext(permission: string) { const context = await getOrganizationContext(); if (!context) throw new Error("UNAUTHENTICATED"); requireOrganizationPermission(context, permission); return context; }

export async function listOrganizationUsers() {
  const context = await requireContext(USER_MANAGEMENT_PERMISSIONS.READ); const admin = createAdminClient();
  const { data, error } = await admin.from("organization_memberships").select("id,status,user_id,users!inner(id,email,status),user_roles(role_id,roles(code))").eq("organization_id", context.organizationId).order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return ((data ?? []) as any[]).map((m) => ({ userId:m.user_id, email:m.users?.email ?? "", status:m.users?.status ?? "UNKNOWN", membershipId:m.id, membershipStatus:m.status, roles:(m.user_roles ?? []).map((r:any)=>r.roles?.code).filter(Boolean) })) as ManagedUser[];
}

export async function inviteOrganizationUser(input: { email: string; roleCodes: string[] }) {
  const context = await requireContext(USER_MANAGEMENT_PERMISSIONS.CREATE); requireOrganizationPermission(context, USER_MANAGEMENT_PERMISSIONS.ASSIGN_ROLE);
  const email = input.email.trim().toLowerCase(); if (!email) throw new Error("EMAIL_REQUIRED"); if (!input.roleCodes.length) throw new Error("ROLE_REQUIRED");
  const admin = createAdminClient(); const { data: existing } = await admin.from("users").select("id").eq("email", email).maybeSingle(); let userId = existing?.id;
  if (!userId) { const { data, error } = await admin.from("users").insert({ email, status:"INVITED" }).select("id").single(); if (error) throw new Error(error.message); userId=data.id; }
  const { data: membership, error: me } = await admin.from("organization_memberships").upsert({ organization_id:context.organizationId,user_id:userId,status:"ACTIVE" }, { onConflict:"organization_id,user_id" }).select("id").single();
  if (me) throw new Error(me.message);
  const { data: roles, error: re } = await admin.from("roles").select("id,code").in("code", input.roleCodes); if (re) throw new Error(re.message); if ((roles ?? []).length !== input.roleCodes.length) throw new Error("INVALID_ROLE");
  await admin.from("user_roles").delete().eq("membership_id", membership.id); const { error: ue } = await admin.from("user_roles").insert((roles ?? []).map(r=>({membership_id:membership.id,role_id:r.id}))); if (ue) throw new Error(ue.message);
  return { userId, membershipId:membership.id, email, roleCodes:input.roleCodes };
}

export async function updateOrganizationUser(userId:string,input:{status?:string;roleCodes?:string[]}) {
  const context=await requireContext(USER_MANAGEMENT_PERMISSIONS.UPDATE); const admin=createAdminClient(); const {data:membership}=await admin.from("organization_memberships").select("id").eq("organization_id",context.organizationId).eq("user_id",userId).maybeSingle(); if(!membership) throw new Error("USER_NOT_IN_ORGANIZATION");
  if(input.status){requireOrganizationPermission(context,USER_MANAGEMENT_PERMISSIONS.DEACTIVATE);const {error}=await admin.from("users").update({status:input.status}).eq("id",userId);if(error)throw new Error(error.message);}
  if(input.roleCodes){requireOrganizationPermission(context,USER_MANAGEMENT_PERMISSIONS.ASSIGN_ROLE);const {data:roles,error}=await admin.from("roles").select("id,code").in("code",input.roleCodes);if(error)throw new Error(error.message);if((roles??[]).length!==input.roleCodes.length)throw new Error("INVALID_ROLE");await admin.from("user_roles").delete().eq("membership_id",membership.id);const {error:re}=await admin.from("user_roles").insert((roles??[]).map(r=>({membership_id:membership.id,role_id:r.id})));if(re)throw new Error(re.message);}
}
