const stats = [
  ["Today’s Appointments", "12"],
  ["Active Patients", "248"],
  ["Pending Cases", "7"],
  ["Low Stock Items", "5"],
];

const quickActions = [
  ["New Client", "Register a client and their pet"],
  ["New Appointment", "Schedule a consultation or follow-up"],
  ["New Medical Record", "Start a clinical encounter"],
  ["Clinical Evidence Search", "Search public veterinary evidence"],
  ["Inventory", "Review stock and movements"],
  ["Client Portal", "Manage client access and invitations"],
];

export default function HomePage() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">PetRx</div>
        <nav className="nav" aria-label="Main navigation">
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#appointments">Appointments</a>
          <a href="#clients">Clients &amp; Pets</a>
          <a href="#records">Medical Records</a>
          <a href="#cases">Clinical Cases</a>
          <a href="#evidence">AI Evidence Search</a>
          <a href="#inventory">Inventory</a>
          <a href="#sales">Sales &amp; AR</a>
          <a href="#purchases">Purchasing &amp; AP</a>
          <a href="#portal">Client Portal</a>
          <a href="#settings">Clinic Settings</a>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <strong>Clinic Workspace</strong>
          <span>Demo Clinic · Administrator</span>
        </header>

        <div className="content" id="dashboard">
          <div className="eyebrow">Veterinary Clinic Management</div>
          <h1>Good morning.</h1>
          <p className="subtitle">Your clinic operations, patient care, and clinical evidence in one workspace.</p>

          <section className="grid" aria-label="Clinic overview">
            {stats.map(([label, value]) => (
              <div className="card" key={label}>
                <div className="metric-label">{label}</div>
                <div className="metric">{value}</div>
              </div>
            ))}
          </section>

          <section className="section">
            <h2>Quick actions</h2>
            <div className="quick-grid">
              {quickActions.map(([title, description]) => (
                <a className="quick" href="#" key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
