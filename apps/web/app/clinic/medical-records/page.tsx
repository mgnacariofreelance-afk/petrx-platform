export default function MedicalRecordsPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinical care</p><h1>Medical Records</h1><p className="muted">Access patient history, consultations, SOAP notes, prescriptions, and clinical documentation.</p></div><button>+ New record</button></header>
      <section className="panel"><div className="toolbar"><input placeholder="Search patient, owner, record number, or veterinarian"/><select defaultValue="all"><option value="all">All record types</option><option>Consultation</option><option>Follow-up</option><option>Procedure</option><option>Surgery</option></select></div><div className="empty-state">Medical records will appear here when the clinical records service is connected.</div></section>
    </main>
  );
}
