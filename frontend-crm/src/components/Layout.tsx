import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Send, Settings, LogOut, BarChart3 } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { useAuth } from '../context/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="gradient-text" style={{ marginBottom: '40px', fontSize: '24px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          CRMTS Pro
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={isActive('/')} 
            onClick={() => navigate('/')} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Leads" 
            active={isActive('/leads')} 
            onClick={() => navigate('/leads')} 
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            label="Chatbot AI" 
            active={isActive('/chatbot')} 
            onClick={() => navigate('/chatbot')} 
          />
          <SidebarItem 
            icon={<Send size={20} />} 
            label="Kampanye WA" 
            active={isActive('/campaign')} 
            onClick={() => navigate('/campaign')} 
          />
          
          {user?.role === 'MANAGER' && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase' }}>Management</p>
              <SidebarItem 
                icon={<BarChart3 size={20} />} 
                label="Analytics" 
                active={isActive('/analytics')} 
                onClick={() => navigate('/analytics')} 
              />
              <SidebarItem 
                icon={<Settings size={20} />} 
                label="Settings" 
                active={isActive('/settings')} 
                onClick={() => navigate('/settings')} 
              />
            </div>
          )}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button 
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', padding: '12px 16px' }}
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '28px' }}>Selamat Datang, {user?.name || 'User'}!</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sistem CRM WhatsApp Marketing Terintegrasi</p>
          </div>
          <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-purple)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{user?.name}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{user?.role}</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
