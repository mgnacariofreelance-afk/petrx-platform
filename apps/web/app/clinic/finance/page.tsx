export default function FinancePage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinic operations</p><h1>Sales, AR &amp; AP</h1><p className="muted">Track clinic sales, payments, client receivables, supplier bills, and payables without a general-ledger accounting module.</p></div><button>+ New transaction</button></header>
      <section className="stat-grid"><article className="stat-card"><span>Today&apos;s sales</span><strong>₱0</strong><small>Operational sales</small></article><article className="stat-card"><span>Client AR</span><strong>₱0</strong><small>Outstanding receivables</small></article><article className="stat-card"><span>Supplier AP</span><strong>₱0</strong><small>Outstanding payables</small></article></section>
      <section className="panel"><div className="toolbar"><select defaultValue="sales"><option value="sales">Sales</option><option value="ar">Accounts Receivable</option><option value="ap">Accounts Payable</option></select><input placeholder="Search transaction, client, or supplier"/><button>Search</button></div><div className="empty-state">Operational finance records will appear here when the transaction services are connected.</div></section>
    </main>
  );
}
