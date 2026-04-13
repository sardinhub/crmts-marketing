interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  color: string;
}

export function StatCard({ label, value, change, color }: StatCardProps) {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
        <h2 style={{ fontSize: '32px' }}>{value}</h2>
        <span style={{ color: color, fontSize: '12px', fontWeight: '600' }}>{change}</span>
      </div>
    </div>
  );
}
