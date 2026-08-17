import Link from "next/link";

export default function TrialExpiredPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">P</div>
        <p className="eyebrow">PetRx Platform</p>
        <h1>Your trial has ended</h1>
        <p className="muted">
          Your time-based PetRx trial has expired. Your clinic data remains associated with your workspace while the account is inactive.
        </p>
        <div className="trial-note">
          Contact PetRx to activate a paid plan and continue using your clinic workspace.
        </div>
        <Link className="button-link" href="/login">Return to sign in</Link>
      </section>
    </main>
  );
}
