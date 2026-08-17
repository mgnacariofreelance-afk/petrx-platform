import { redirect } from "next/navigation";
import type { OrganizationContext } from "./organization-context";

export const PERMISSIONS = {
  ORGANIZATION_READ: "organization.read",
  ORGANIZATION_UPDATE: "organization.update",
  USER_CREATE: "user.create",
  USER_READ: "user.read",
  USER_UPDATE: "user.update",
  USER_SUSPEND: "user.suspend",
  ROLE_READ: "role.read",
  ROLE_MANAGE: "role.manage",
  PERMISSION_READ: "permission.read",
  BRANCH_MANAGE: "branch.manage",
  DEPARTMENT_MANAGE: "department.manage",
  CLIENT_CREATE: "client.create",
  CLIENT_READ: "client.read",
  CLIENT_UPDATE: "client.update",
  ANIMAL_CREATE: "animal.create",
  ANIMAL_READ: "animal.read",
  ANIMAL_UPDATE: "animal.update",
  APPOINTMENT_CREATE: "appointment.create",
  APPOINTMENT_READ: "appointment.read",
  APPOINTMENT_UPDATE: "appointment.update",
  APPOINTMENT_CANCEL: "appointment.cancel",
  APPOINTMENT_CHECKIN: "appointment.checkin",
  MEDICAL_RECORD_CREATE: "medical_record.create",
  MEDICAL_RECORD_READ: "medical_record.read",
  MEDICAL_RECORD_UPDATE: "medical_record.update",
  MEDICAL_RECORD_FINALIZE: "medical_record.finalize",
  AUDIT_READ: "audit.read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS] | string;

export function hasPermission(context: Pick<OrganizationContext, "permissions"> | null, permission: Permission) {
  return Boolean(context?.permissions.includes(permission));
}

export function hasAnyPermission(context: Pick<OrganizationContext, "permissions"> | null, permissions: Permission[]) {
  return permissions.some((permission) => hasPermission(context, permission));
}

export function requirePermission(context: Pick<OrganizationContext, "permissions"> | null, permission: Permission) {
  if (!hasPermission(context, permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }
}

export function requirePermissionOrRedirect(
  context: Pick<OrganizationContext, "permissions"> | null,
  permission: Permission,
) {
  if (!hasPermission(context, permission)) {
    redirect("/clinic/access-denied");
  }
}

export function hasRole(context: Pick<OrganizationContext, "roles"> | null, role: string) {
  return Boolean(context?.roles.includes(role));
}
