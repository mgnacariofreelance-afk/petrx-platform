export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">P</div>
        <p className="eyebrow">PetRx Platform</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to your clinic workspace.</p>
        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" placeholder="you@clinic.com" autoComplete="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" autoComplete="current-password" />
          </label>
          <button type="submit">Sign in</button>
        </form>
        <a className="text-link" href="/forgot-password">Forgot password?</a>
      </section>
    </main>
  );
}
