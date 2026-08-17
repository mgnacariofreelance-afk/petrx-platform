export default function InventoryPage() {
  return (
    <main className="workspace-page">
      <header className="workspace-header"><div><p className="eyebrow">Clinic operations</p><h1>Inventory</h1><p className="muted">Monitor medicines, supplies, stock movements, and low-stock alerts.</p></div><button>+ Add product</button></header>
      <section className="stat-grid"><article className="stat-card"><span>Total products</span><strong>0</strong><small>Connect inventory service</small></article><article className="stat-card"><span>Low stock</span><strong>0</strong><small>Items requiring attention</small></article><article className="stat-card"><span>Expiring soon</span><strong>0</strong><small>Next 90 days</small></article></section>
      <section className="panel"><div className="toolbar"><input placeholder="Search product, SKU, or category"/><button>Search</button></div><div className="empty-state">Inventory records will appear here when the inventory service is connected.</div></section>
    </main>
  );
}
