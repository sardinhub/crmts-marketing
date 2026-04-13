import { useState } from 'react';
import { Bot, Zap, MessageCircle, Settings, ShieldCheck, Clock } from 'lucide-react';

export function Chatbot() {
  const [isBotActive, setIsBotActive] = useState(true);
  const [aiTone, setAiTone] = useState('Professional & Ramah');

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>Integrated AI Chatbot</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Otomasi respons pesan WhatsApp menggunakan Google Gemini AI.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Main Configuration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: isBotActive ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255,255,255,0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Bot size={28} color={isBotActive ? '#2ecc71' : 'var(--text-secondary)'} />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px' }}>Status Chatbot 24/7</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{isBotActive ? 'Aktif dan sedang membalas pesan secara otomatis' : 'Nonaktif (Pesan akan dibalas manual)'}</p>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <div 
                onClick={() => setIsBotActive(!isBotActive)}
                style={{ 
                  width: '60px', 
                  height: '32px', 
                  borderRadius: '20px', 
                  background: isBotActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)', 
                  position: 'relative', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  position: 'absolute', 
                  top: '4px', 
                  left: isBotActive ? '32px' : '4px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Model AI</p>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>Google Gemini 1.5 Pro</p>
              </div>
              <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '5px' }}>Waktu Respons</p>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>&lt; 5 Detik</p>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Settings size={20} /> Pengaturan Instruksi AI
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Instruksi Role (Prompt)</label>
                <textarea 
                  rows={6}
                  className="glass-card"
                  style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', resize: 'none', fontSize: '14px', lineHeight: '1.5' }}
                  defaultValue="Kamu adalah asisten profesional CRMTS Marketing. Tugasmu adalah menyapa calon siswa baru dengan ramah, memberikan informasi program keunggulan, dan mengajak mereka untuk konsultasi lebih lanjut via telepon atau datang ke lokasi. Gunakan bahasa Indonesia yang sopan namun tetap modern."
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Tone & Gaya Bahasa</label>
                <select 
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="glass-card"
                  style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                >
                  <option>Professional & Ramah</option>
                  <option>Santai & Gaul (Target Gen-Z)</option>
                  <option>Formal & Informatif</option>
                  <option>Singkat & To-the-point</option>
                </select>
              </div>

              <button className="gradient-bg" style={{ padding: '12px', border: 'none', color: 'white', fontWeight: '600', borderRadius: '10px', cursor: 'pointer', marginTop: '10px' }}>
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>

        {/* Status & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Keamanan & Presisi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <ShieldCheck color="#2ecc71" size={18} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Filter Spam Aktif</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Clock color="#4a90e2" size={18} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Pembatasan Balasan (Anti-Bot Loop)</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Zap color="#f1c40f" size={18} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Fast-Reply Terverifikasi</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Log Aktivitas AI Terbaru</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600' }}>Lead #82{i}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>2m ago</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"Menjawab pertanyaan biaya kuliah..."</p>
                </div>
              ))}
              <button style={{ textAlign: 'center', background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '12px', cursor: 'pointer', marginTop: '10px' }}>
                Lihat Semua Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
