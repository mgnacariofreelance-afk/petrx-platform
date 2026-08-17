import Link from "next/link";
import { clinicNavigation } from "../lib/navigation";

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

export function ClinicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block"><div className="brand-icon">P</div><div><strong>PetRx</strong><span>Clinic Platform</span></div></div>
        <div className="clinic-switcher"><span>WORKSPACE</span><strong>Demo Veterinary Clinic</strong><small>Main Branch ▾</small></div>
        <nav className="sidebar-nav" aria-label="Clinic navigation">
          {clinicNavigation.map((item) => <Link key={item.href} href={item.href}><span className="nav-icon">{icons[item.label] ?? "•"}</span><span>{item.label}</span></Link>)}
        </nav>
        <div className="sidebar-footer"><Link href="#settings">⚙ Settings</Link><Link href="#help">? Help Center</Link></div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-icon">P</span><strong>PetRx</strong></div>
          <div className="topbar-search"><span>⌕</span><input placeholder="Search clients, pets, records..." aria-label="Global search" /></div>
          <div className="topbar-actions"><button aria-label="Notifications">◌</button><div className="user-chip"><span className="avatar">DS</span><span><strong>Dr. Santos</strong><small>Clinic Owner</small></span><span>⌄</span></div></div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
