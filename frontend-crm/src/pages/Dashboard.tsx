import { StatCard } from '../components/StatCard';

export function Dashboard() {
  return (
    <section className="animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <StatCard label="Total Leads" value="1,284" change="+12%" color="var(--accent-blue)" />
        <StatCard label="Kampanye Aktif" value="6" change="Running" color="var(--success)" />
        <StatCard label="Respons AI" value="85%" change="Auto" color="var(--accent-purple)" />
        <StatCard label="Closing Rate" value="3.2%" change="+0.4%" color="var(--warning)" />
      </div>

      <div className="glass-card" style={{ padding: '30px', minHeight: '400px' }}>
        <h3>Aktivitas Terkini</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>Belum ada data aktivitas untuk ditampilkan.</p>
      </div>
    </section>
  );
}
