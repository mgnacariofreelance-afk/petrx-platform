"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function StartTrialPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({ organizationName: "", ownerFirstName: "", ownerLastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/trial/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Unable to start the trial.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    if (signInError) {
      setError("Your trial was created, but automatic sign-in failed. Please sign in manually.");
      setLoading(false);
      router.push("/login");
      return;
    }

    router.replace("/clinic");
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-wide">
        <div className="brand-mark">P</div>
        <p className="eyebrow">PetRx Platform</p>
        <h1>Start your free trial</h1>
        <p className="muted">Create a clinic workspace and explore PetRx without a consumption limit.</p>
        <div className="trial-note">Trial access is time-based. Your workspace will show the exact expiration date after registration.</div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Clinic name<input value={form.organizationName} onChange={(e) => update("organizationName", e.target.value)} required /></label>
          <div className="form-grid">
            <label>First name<input value={form.ownerFirstName} onChange={(e) => update("ownerFirstName", e.target.value)} required /></label>
            <label>Last name<input value={form.ownerLastName} onChange={(e) => update("ownerLastName", e.target.value)} required /></label>
          </div>
          <label>Email<input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" autoComplete="email" required /></label>
          <label>Password<input value={form.password} onChange={(e) => update("password", e.target.value)} type="password" autoComplete="new-password" minLength={8} required /></label>
          <p className="muted small">Use at least 8 characters with uppercase, lowercase, and a number.</p>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Creating workspace…" : "Start free trial"}</button>
        </form>
        <p className="auth-secondary">Already have an account? <a className="text-link" href="/login">Sign in</a></p>
      </section>
    </main>
  );
}
