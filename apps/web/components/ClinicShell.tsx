import Link from "next/link";
import { clinicNavigation } from "../lib/navigation";
import type { AuthContext } from "../lib/auth-context";
import { LogoutButton } from "./LogoutButton";
import { THEME_PRESETS, isValidThemePreset } from "../lib/theme-presets";

const icons: Record<string, string> = {
  Dashboard: "⌂",
  Appointments: "◷",
  "Clients & Pets": "♙",
  "Medical Records": "▤",
  "Clinical Cases": "✚",
  "AI Evidence Search": "⌕",
  Inventory: "▦",
  "Sales & AR / AP": "₱",
  "Client Portal": "◎",
};

export function ClinicShell({ children, context }: { children: React.ReactNode; context: AuthContext }) {
  const initials = context.email.slice(0, 2).toUpperCase();
  const primaryRole = context.roles[0]?.replaceAll("_", " ") ?? "Staff";
  const presetId = isValidThemePreset(context.themePreset) ? context.themePreset : "teal";
  const preset = THEME_PRESETS[presetId];
  const themeOverrideCss = `:root{--petrx-primary:${preset.light.primary};--petrx-primary-dark:${preset.light.primaryDark};--petrx-soft:${preset.light.soft};}html[data-theme="dark"]{--petrx-primary:${preset.dark.primary};--petrx-primary-dark:${preset.dark.primaryDark};--petrx-soft:${preset.dark.soft};}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeOverrideCss }} />
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-block"><div className="brand-icon">P</div><div><strong>PetRx</strong><span>Clinic Platform</span></div></div>
          <div className="clinic-switcher"><span>WORKSPACE</span><strong>{context.organizationName}</strong><small>{context.organizationType} · {context.subscriptionStatus}</small></div>
          <nav className="sidebar-nav" aria-label="Clinic navigation">
            {clinicNavigation.map((item) => <Link key={item.href} href={item.href}><span className="nav-icon">{icons[item.label] ?? "•"}</span><span>{item.label}</span></Link>)}
          </nav>
          <div className="sidebar-footer"><Link href="#settings">⚙ Settings</Link><Link href="#help">? Help Center</Link><LogoutButton /></div>
        </aside>
        <div className="app-main">
          <header className="topbar">
            <div className="mobile-brand"><span className="brand-icon">P</span><strong>PetRx</strong></div>
            <div className="topbar-search"><span>⌕</span><input placeholder="Search clients, pets, records..." aria-label="Global search" /></div>
            <div className="topbar-actions"><button aria-label="Notifications">◌</button><div className="user-chip"><span className="avatar">{initials}</span><span><strong>{context.email}</strong><small>{primaryRole}</small></span></div></div>
          </header>
          <main className="page-content">{children}</main>
        </div>
      </div>
    </>
  );
}
