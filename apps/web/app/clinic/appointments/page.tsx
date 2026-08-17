export default function AppointmentsPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinic workspace</p><h1>Appointments</h1><p className="muted">Schedule consultations, follow-ups, procedures, and check-ins.</p></div><button>+ New appointment</button></header>
      <section className="panel"><div className="toolbar"><input type="date"/><select defaultValue="all"><option value="all">All statuses</option><option>Scheduled</option><option>Checked in</option><option>Completed</option><option>Cancelled</option></select></div><div className="empty-state">Your appointment schedule will appear here when scheduling services are connected.</div></section>
    </main>
  );
}
