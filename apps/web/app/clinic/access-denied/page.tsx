import Link from "next/link";
import { requireAuthContext } from "../../../lib/auth-context";

export const dynamic = "force-dynamic";

export default async function AccessDeniedPage() {
  const context = await requireAuthContext();

  return (
    <main className="workspace-page">
      <section className="panel" style={{ maxWidth: 720 }}>
        <p className="eyebrow">Access control</p>
        <h1>Access restricted</h1>
        <p className="muted">
          Your role does not currently have permission to access this area of {context.organizationName}.
          Ask an organization owner or administrator to update your role permissions.
        </p>
        <p className="muted">Current role: {context.roles.join(", ").replaceAll("_", " ") || "No role assigned"}</p>
        <Link href="/clinic" className="button-primary">Return to dashboard</Link>
      </section>
    </main>
  );
}
