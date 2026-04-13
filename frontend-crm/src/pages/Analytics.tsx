import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { Target, TrendingUp, Users, Smartphone } from 'lucide-react';
import { StatCard } from '../components/StatCard';

const leadData = [
  { name: 'Mon', total: 40 },
  { name: 'Tue', total: 55 },
  { name: 'Wed', total: 48 },
  { name: 'Thu', total: 70 },
  { name: 'Fri', total: 91 },
  { name: 'Sat', total: 65 },
  { name: 'Sun', total: 75 },
];

const sourceData = [
  { name: 'Facebook', value: 400 },
  { name: 'Instagram', value: 300 },
  { name: 'Organic', value: 200 },
  { name: 'Referral', value: 150 },
];

const COLORS = ['#4a90e2', '#a29bfe', '#2ecc71', '#f1c40f'];

export function Analytics() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px' }}>Marketing Analytics</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Analisis performa leads dan efektivitas kampanye pemasaran Anda.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <StatCard label="Total Leads" value="1,284" change="+12%" color="var(--accent-blue)" />
        <StatCard label="Conversion Rate" value="3.2%" change="+0.4%" color="var(--success)" />
        <StatCard label="Hot Leads" value="450" change="35% total" color="var(--accent-purple)" />
        <StatCard label="Cost per Lead" value="Rp 4.5k" change="-Rp 500" color="var(--warning)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        {/* Lead Growth Chart */}
        <div className="glass-card" style={{ padding: '30px', height: '400px' }}>
          <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={20} color="var(--accent-blue)" /> Tren Pertumbuhan Leads Mingguan
          </h4>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={leadData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: 'white' }}
              />
              <Area type="monotone" dataKey="total" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source Distribution */}
        <div className="glass-card" style={{ padding: '30px', height: '400px' }}>
          <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={20} color="var(--accent-purple)" /> Distribusi Sumber Data
          </h4>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={sourceData} layout="vertical" margin={{ left: -20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: 'var(--glass-bg)', border: 'none', borderRadius: '10px' }} />
              <Bar dataKey="value" radius={[0, 5, 5, 0]} barSize={20}>
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables/Extra Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '30px' }}>
        <AnalyticsMiniCard icon={<Users size={20} color="#4a90e2" />} label="Top Staff" value="Aditya Rama" extra="124 Enrollments" />
        <AnalyticsMiniCard icon={<Smartphone size={20} color="#a29bfe" />} label="Top Channel" value="WhatsApp Official" extra="92% Open Rate" />
        <AnalyticsMiniCard icon={<Target size={20} color="#2ecc71" />} label="Avg Response Time" value="4.2 Minutes" extra="-12s from last week" />
      </div>
    </div>
  );
}

function AnalyticsMiniCard({ icon, label, value, extra }: any) {
  return (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</p>
        <p style={{ fontSize: '16px', fontWeight: '600' }}>{value}</p>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{extra}</p>
      </div>
    </div>
  );
}
