export default function ForgotPasswordPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Account recovery</p>
        <h1>Reset your password</h1>
        <p className="muted">Enter your registered email and we&apos;ll send instructions to recover your PetRx account.</p>
        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <button type="submit">Send reset instructions</button>
        </form>
        <a className="text-link" href="/login">Back to sign in</a>
      </section>
    </main>
  );
}
