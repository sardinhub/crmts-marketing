import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal login. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #1a1a2e, #16213e, #0f3460)'
    }}>
      <div className="glass-card animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '10px' }}>CRMTS</h1>
          <p style={{ color: 'var(--text-secondary)' }}>WhatsApp Marketing System</p>
        </div>

        {error && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            background: 'rgba(255, 71, 87, 0.1)', 
            color: 'var(--danger)', 
            fontSize: '14px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 71, 87, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              className="glass-card"
              style={{ padding: '12px', border: 'none', background: 'rgba(255,255,255,0.05)' }}
              placeholder="admin@crmts.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              className="glass-card"
              style={{ padding: '12px', border: 'none', background: 'rgba(255,255,255,0.05)' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="gradient-bg"
            style={{ 
              padding: '14px', 
              borderRadius: '10px', 
              border: 'none', 
              color: 'white', 
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Sedang Masuk...' : 'Masuk ke Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-secondary)', fontSize: '12px' }}>
          &copy; 2026 CRMTS Marketing System. v1.0
        </p>
      </div>
    </div>
  );
}
