import { getAuthContext } from "../../lib/auth-context";

export const dynamic = "force-dynamic";

export default async function AuthHealthPage() {
  const context = await getAuthContext();

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">PetRx Platform</p>
        <h1>Authentication status</h1>
        <p className="muted">
          {context ? "Your authenticated clinic context is available." : "No authenticated clinic context is available."}
        </p>
        {context ? (
          <div className="trial-note">
            <strong>{context.organizationName}</strong><br />
            Role: {context.roles[0] ?? "No role"}<br />
            Subscription: {context.subscriptionStatus}
          </div>
        ) : null}
      </section>
    </main>
  );
}
