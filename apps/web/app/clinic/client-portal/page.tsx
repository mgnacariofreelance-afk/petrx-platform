export default function ClientPortalPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Client portal</p><h1>Client Portal</h1><p className="muted">Manage client access, invitations, notifications, and portal activity.</p></div><button>+ Invite client</button></header>
      <section className="stat-grid"><article className="stat-card"><span>Portal clients</span><strong>0</strong><small>Active client accounts</small></article><article className="stat-card"><span>Pending invitations</span><strong>0</strong><small>Awaiting activation</small></article><article className="stat-card"><span>Unread messages</span><strong>0</strong><small>Client notifications</small></article></section>
      <section className="panel"><div className="toolbar"><input placeholder="Search client email or name"/><select defaultValue="all"><option value="all">All portal statuses</option><option>Active</option><option>Invitation sent</option><option>Disabled</option></select><button>Search</button></div><div className="empty-state">Client portal accounts will appear here when authentication and portal services are connected.</div></section>
    </main>
  );
}
