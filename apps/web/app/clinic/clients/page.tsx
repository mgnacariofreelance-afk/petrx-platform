export default function ClientsPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinic workspace</p><h1>Clients &amp; Pets</h1><p className="muted">Manage client profiles, owners, and their companion animals.</p></div><button>+ New client</button></header>
      <section className="panel"><div className="toolbar"><input placeholder="Search client, pet, email, or contact number"/><button>Search</button></div><div className="empty-state">Client and pet records will appear here once the database service is connected.</div></section>
    </main>
  );
}
