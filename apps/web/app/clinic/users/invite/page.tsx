import Link from "next/link";
import { requireOrganizationContext, requireOrganizationPermissionOrRedirect } from "../../../../lib/organization-context";
import { USER_MANAGEMENT_PERMISSIONS } from "../../../../lib/user-management";
import InviteForm from "./invite-form";
export const dynamic="force-dynamic";
export default async function InviteUserPage(){const context=await requireOrganizationContext();requireOrganizationPermissionOrRedirect(context,USER_MANAGEMENT_PERMISSIONS.CREATE);return <main className="workspace-page"><header className="workspace-header"><div><p className="eyebrow">User management</p><h1>Invite a staff member</h1><p className="muted">Assign one or more roles. A person can be a receptionist, cashier, pharmacist, or any combination your clinic allows.</p></div><Link href="/clinic/users">Back to users</Link></header><InviteForm/></main>}
