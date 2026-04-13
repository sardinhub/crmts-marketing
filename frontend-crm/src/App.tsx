import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Chatbot } from './pages/Chatbot';

// Shared PrivateRoute component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="gradient-text" style={{ fontSize: '24px' }}>Memuat Sistem...</div>
    </div>
  );
  
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/leads" element={
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          } />

          <Route path="/chatbot" element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          } />

          <Route path="/campaign" element={
            <PrivateRoute>
              <div className="glass-card" style={{ padding: '30px' }}>
                <h2>WhatsApp Campaigns</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>Halaman sedang dalam pengembangan...</p>
              </div>
            </PrivateRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
