const cards = [
  ["Today’s appointments", "8", "4 awaiting check-in"],
  ["Active patients", "124", "Across this clinic"],
  ["Open clinical cases", "6", "2 need review"],
  ["Low stock items", "5", "Review inventory"],
];

const actions = ["New client", "New appointment", "Medical record", "Clinical evidence search"];

export default function ClinicPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <div>
          <p className="eyebrow">Clinic workspace</p>
          <h1>Good morning, Dr. Santos</h1>
          <p className="muted">Here&apos;s what needs your attention today.</p>
        </div>
        <div className="workspace-context">Main Branch</div>
      </header>

      <section className="stat-grid" aria-label="Clinic overview">
        {cards.map(([title, value, note]) => (
          <article className="stat-card" key={title}>
            <span>{title}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>

      <section className="workspace-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Quick actions</p>
            <h2>Run today&apos;s clinic</h2>
          </div>
        </div>
        <div className="action-grid">
          {actions.map((action) => (
            <button className="action-card" key={action}>{action}<span>→</span></button>
          ))}
        </div>
      </section>

      <section className="workspace-section split-grid">
        <article className="panel">
          <div className="section-heading"><h2>Upcoming appointments</h2><a href="#appointments">View all</a></div>
          <div className="empty-state">Appointment data will appear here when the scheduling module is connected.</div>
        </article>
        <article className="panel">
          <div className="section-heading"><h2>Clinical attention</h2><a href="#cases">View cases</a></div>
          <div className="empty-state">Open clinical cases and follow-up alerts will appear here.</div>
        </article>
      </section>
    </main>
  );
}
