"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been updated. Redirecting to sign in…");
    await supabase.auth.signOut();
    setTimeout(() => router.replace("/login"), 700);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">P</div>
        <p className="eyebrow">Account recovery</p>
        <h1>Set a new password</h1>
        <p className="muted">Choose a new password for your PetRx account.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>New password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" required /></label>
          <label>Confirm password<input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" autoComplete="new-password" required /></label>
          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Updating…" : "Update password"}</button>
        </form>
        <a className="text-link" href="/login">Back to sign in</a>
      </section>
    </main>
  );
}
