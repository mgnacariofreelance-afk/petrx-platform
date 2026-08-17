const results = [
  ["95%", "Canine Parvovirus", "Research Paper"],
  ["91%", "Hemorrhagic Gastroenteritis", "Clinical Case"],
  ["82%", "Intestinal Parasites", "Veterinary Journal"],
  ["77%", "Giardia Infection", "Conference Material"],
];

export default function AIEvidencePage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinical Decision Support</p><h1>AI Clinical Evidence Search</h1><p className="muted">Search public veterinary research, clinical cases, journals, and conference materials for similar reported findings.</p></div></header>
      <section className="panel">
        <label className="search-label">Describe the clinical presentation</label>
        <textarea placeholder="Example: Dog with vomiting, bloody diarrhea, lethargy and dehydration..." rows={5}/>
        <button>Search clinical evidence</button>
      </section>
      <section className="panel">
        <div className="section-heading"><div><p className="eyebrow">Search results</p><h2>Potential evidence matches</h2></div></div>
        <div className="evidence-table" role="table" aria-label="Clinical evidence matches">
          {results.map(([match, condition, source]) => <a className="evidence-row" href="#source" key={condition}><strong>{match}</strong><span>{condition}</span><span>{source}</span></a>)}
        </div>
        <p className="disclaimer">PetRx provides evidence retrieval and clinical decision support. Results are not a diagnosis and must be interpreted by a qualified veterinary professional.</p>
      </section>
    </main>
  );
}
