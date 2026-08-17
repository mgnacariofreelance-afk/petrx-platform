import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "../../../../lib/supabase/admin";

const schema = z.object({
  organizationName: z.string().trim().min(2).max(255),
  ownerFirstName: z.string().trim().min(1).max(100),
  ownerLastName: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().email().max(320),
  password: z.string().min(8).max(72)
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

const TRIAL_DAYS = Number(process.env.PETRX_TRIAL_DAYS ?? 30);

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide valid clinic and owner information.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const admin = createAdminClient();
  const { data: existingUser } = await admin.from("users").select("id").eq("email", input.email).maybeSingle();

  if (existingUser) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: { first_name: input.ownerFirstName, last_name: input.ownerLastName },
  });

  if (authError || !authData.user) {
    return NextResponse.json({ error: authError?.message ?? "Unable to create account." }, { status: 400 });
  }

  const authUserId = authData.user.id;
  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);

  try {
    const { data: organization, error: organizationError } = await admin
      .from("organizations")
      .insert({ name: input.organizationName, organization_type: "CLINIC", subscription_status: "TRIAL", trial_started_at: startedAt.toISOString(), trial_expires_at: expiresAt.toISOString() })
      .select("id")
      .single();

    if (organizationError || !organization) throw new Error(organizationError?.message ?? "Unable to create clinic organization.");

    const { error: userError } = await admin.from("users").insert({
      id: authUserId,
      email: input.email,
      first_name: input.ownerFirstName,
      last_name: input.ownerLastName,
      status: "ACTIVE",
      email_verified_at: startedAt.toISOString(),
    });
    if (userError) throw new Error(userError.message);

    const { data: membership, error: membershipError } = await admin
      .from("organization_memberships")
      .insert({ organization_id: organization.id, user_id: authUserId, status: "ACTIVE" })
      .select("id")
      .single();
    if (membershipError || !membership) throw new Error(membershipError?.message ?? "Unable to create organization membership.");

    const { data: ownerRole, error: roleError } = await admin.from("roles").select("id").eq("code", "ORGANIZATION_OWNER").single();
    if (roleError || !ownerRole) throw new Error("Organization Owner role is not configured.");

    const { error: userRoleError } = await admin.from("user_roles").insert({ membership_id: membership.id, role_id: ownerRole.id });
    if (userRoleError) throw new Error(userRoleError.message);

    return NextResponse.json({ success: true, organizationId: organization.id, trialDays: TRIAL_DAYS, trialExpiresAt: expiresAt.toISOString() });
  } catch (error) {
    await admin.auth.admin.deleteUser(authUserId);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Trial registration failed." }, { status: 500 });
  }
}
