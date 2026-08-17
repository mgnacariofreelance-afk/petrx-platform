export default function AcceptInvitationPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">PetRx invitation</p>
        <h1>Activate your account</h1>
        <p className="muted">Create your password to access the clinic workspace you were invited to.</p>
        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" placeholder="invited@clinic.com" autoComplete="email" />
          </label>
          <label>
            New password
            <input type="password" name="password" placeholder="Create a strong password" autoComplete="new-password" />
          </label>
          <label>
            Confirm password
            <input type="password" name="confirmPassword" placeholder="Repeat your password" autoComplete="new-password" />
          </label>
          <button type="submit">Activate account</button>
        </form>
      </section>
    </main>
  );
}
