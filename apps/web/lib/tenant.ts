export type OrganizationContext = {
  organizationId: string;
  branchId?: string;
  userId: string;
};

export function requireOrganizationContext(context: OrganizationContext | null): OrganizationContext {
  if (!context?.organizationId || !context.userId) {
    throw new Error("Organization context is required");
  }
  return context;
}
