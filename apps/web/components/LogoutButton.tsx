"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return <button type="button" onClick={handleLogout} className="logout-button">Sign out</button>;
}
