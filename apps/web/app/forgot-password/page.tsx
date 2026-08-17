"use client";

import { FormEvent, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setMessage("If an account exists for that email, password reset instructions have been sent.");
    setLoading(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">P</div>
        <p className="eyebrow">Account recovery</p>
        <h1>Reset your password</h1>
        <p className="muted">Enter your registered email and we&apos;ll send instructions to recover your PetRx account.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label>
          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Sending…" : "Send reset instructions"}</button>
        </form>
        <a className="text-link" href="/login">Back to sign in</a>
      </section>
    </main>
  );
}
