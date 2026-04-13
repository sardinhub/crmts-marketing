import { useState } from 'react';
import { LayoutDashboard, Users, MessageSquare, Send, Settings, LogOut, BarChart3 } from 'lucide-react';

function App() {
  const [role, setRole] = useState<'MANAGER' | 'STAFF'>('MANAGER'); // Mocked for demo
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="gradient-text" style={{ marginBottom: '40px', fontSize: '24px' }}>CRMTS Pro</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Leads" 
            active={activeTab === 'leads'} 
            onClick={() => setActiveTab('leads')} 
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            label="Chatbot AI" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
          />
          <SidebarItem 
            icon={<Send size={20} />} 
            label="Kampanye WA" 
            active={activeTab === 'campaign'} 
            onClick={() => setActiveTab('campaign')} 
          />
          
          {role === 'MANAGER' && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase' }}>Management</p>
              <SidebarItem 
                icon={<BarChart3 size={20} />} 
                label="Analytics" 
                active={activeTab === 'analytics'} 
                onClick={() => setActiveTab('analytics')} 
              />
              <SidebarItem 
                icon={<Settings size={20} />} 
                label="Settings" 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')} 
              />
            </div>
          )}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--danger)', background: 'none' }}>
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '28px' }}>Selamat Datang, {role === 'MANAGER' ? 'Admin' : 'Marketing Staff'}!</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sistem CRM WhatsApp Marketing Terintegrasi</p>
          </div>
          <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-purple)' }}></div>
            <span>{role === 'MANAGER' ? 'Manager' : 'Staff'}</span>
          </div>
        </header>

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
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        background: active ? 'var(--glass)' : 'transparent',
        color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
        transition: 'all 0.3s ease'
      }}
    >
      {icon}
      <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
    </div>
  );
}

function StatCard({ label, value, change, color }: any) {
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

export default App;
