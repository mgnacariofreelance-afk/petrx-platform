import { NextResponse } from "next/server";
import { getOrganizationContext } from "../../../lib/organization-context";

export const dynamic = "force-dynamic";

export async function GET() {
  const context = await getOrganizationContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: context.userId,
      email: context.email,
      roles: context.roles,
      permissions: context.permissions,
    },
    organization: {
      id: context.organizationId,
      name: context.organizationName,
      type: context.organizationType,
      status: context.organizationStatus,
      subscriptionStatus: context.subscriptionStatus,
      trialStartedAt: context.trialStartedAt,
      trialExpiresAt: context.trialExpiresAt,
    },
    membershipId: context.membershipId,
  });
}
