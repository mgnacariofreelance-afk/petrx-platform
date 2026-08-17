"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace("/clinic");
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">P</div>
        <p className="eyebrow">PetRx Platform</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to your clinic workspace.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@clinic.com" required /></label>
          <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="••••••••" required /></label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
        </form>
        <a className="text-link" href="/forgot-password">Forgot password?</a>
        <p className="auth-secondary">Trying PetRx first? <a className="text-link" href="/start-trial">Start a free trial</a></p>
      </section>
    </main>
  );
}
