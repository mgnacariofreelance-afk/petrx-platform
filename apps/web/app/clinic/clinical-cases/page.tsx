export default function ClinicalCasesPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinical resources</p><h1>Clinical Cases</h1><p className="muted">Review documented cases and prepare eligible cases for research workflows.</p></div><button>+ New clinical case</button></header>
      <section className="panel"><div className="toolbar"><input placeholder="Search case, patient, condition, or case number"/><select defaultValue="all"><option value="all">All case statuses</option><option>Open</option><option>Under review</option><option>Resolved</option><option>Research eligible</option></select></div><div className="empty-state">Clinical case records will appear here when the medical-record service is connected.</div></section>
    </main>
  );
}
