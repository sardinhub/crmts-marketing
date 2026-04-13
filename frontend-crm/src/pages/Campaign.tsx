import { useState, useEffect } from 'react';
import { Send, Users, MessageSquare, Info, Play, Clock, CheckCircle } from 'lucide-react';
import api from '../lib/api';

export function Campaign() {
  const [targetCount, setTargetCount] = useState(0);
  const [message, setMessage] = useState('Halo {{nama}}, kami dari tim CRMTS ingin mengonfirmasi...');
  const [campaignName, setCampaignName] = useState('Campaign - ' + new Date().toLocaleDateString());
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<any[]>([]);

  useEffect(() => {
    // Fetch total leads to show as target
    api.get('/leads').then(res => setTargetCount(res.data.length));
  }, []);

  const startCampaign = async () => {
    if (!confirm('Apakah Anda yakin ingin memulai kampanye broadcast ini?')) return;
    
    setIsSending(true);
    setProgress(0);
    
    try {
      // In a real app, this would be a single call to start a background worker
      // For this demo, we'll simulate the progress for the user
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSending(false);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);

      // Actual API call to record campaign in DB
      await api.post('/campaigns', {
        name: campaignName,
        content: message,
        targetCount: targetCount
      });

    } catch (err) {
      alert('Gagal membuat kampanye.');
      setIsSending(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px' }}>WhatsApp Campaign Builder</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Kirim pesan massal yang personal ke seluruh basis data leads Anda.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        {/* Campaign Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Nama Kampanye</label>
                <input 
                  type="text" 
                  className="glass-card"
                  style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Template Pesan</label>
                  <span style={{ fontSize: '11px', color: 'var(--accent-blue)' }}>Gunakan {"{{nama}}"} untuk personalisasi</span>
                </div>
                <textarea 
                  rows={8}
                  className="glass-card"
                  style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', resize: 'none', fontSize: '14px', lineHeight: '1.5' }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="glass-card" style={{ padding: '20px', background: 'rgba(74, 144, 226, 0.05)', border: '1px solid rgba(74, 144, 226, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Users size={24} color="var(--accent-blue)" />
                  <div>
                    <h5 style={{ fontSize: '16px' }}>Target Penerima</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{targetCount} Leads total dalam basis data</p>
                  </div>
                </div>
              </div>

              <button 
                disabled={isSending || targetCount === 0}
                onClick={startCampaign}
                className="gradient-bg" 
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  color: 'white', 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px',
                  cursor: isSending ? 'not-allowed' : 'pointer',
                  opacity: (isSending || targetCount === 0) ? 0.7 : 1
                }}
              >
                {isSending ? (
                  <>Mengirim... {progress}%</>
                ) : (
                  <>
                    <Play size={20} /> Mulai Broadcast Sekarang
                  </>
                )}
              </button>
            </div>
          </div>

          {isSending && (
            <div className="glass-card animate-fade-in" style={{ padding: '30px' }}>
              <h4 style={{ marginBottom: '15px' }}>Progress Kampanye</h4>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))', transition: 'width 0.3s ease' }}></div>
              </div>
              <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Memberikan jeda 5-10 detik antar pesan untuk keamanan.
              </p>
            </div>
          )}
        </div>

        {/* Live Preview & Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ marginBottom: '20px', fontSize: '16px' }}>Preview Pesan</h4>
            <div style={{ 
              background: '#075e54', 
              borderRadius: '15px', 
              padding: '15px', 
              color: 'white', 
              fontSize: '14px', 
              position: 'relative',
              maxWidth: '90%',
              marginLeft: '5px',
              borderBottomLeftRadius: '2px'
            }}>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {message.replace('{{nama}}', 'Budi Santoso')}
              </p>
              <div style={{ fontSize: '10px', textAlign: 'right', marginTop: '5px', opacity: 0.6 }}>12:45 PM</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '25px', border: '1px solid var(--warning-border)' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <Info size={24} color="var(--warning)" style={{ flexShrink: 0 }} />
              <div>
                <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Tips Keamanan Broadcast</h5>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.8' }}>
                  <li>Jangan mengirim pesan spam ke nomor yang tidak dikenal.</li>
                  <li>Gunakan personalisasi nama ({"{{nama}}"}) agar lebih humanis.</li>
                  <li>Sistem kami menyisipkan jeda waktu otomatis antar pesan.</li>
                  <li>Hindari pengiriman lebih dari 500 pesan per hari jika akun baru.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ marginBottom: '15px', fontSize: '16px' }}>Kampanye Terakhir</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={16} color="var(--success)" />
                <span style={{ fontSize: '13px' }}>Promo Akhir Tahun - 540 Pesan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={16} color="var(--success)" />
                <span style={{ fontSize: '13px' }}>Reminder Open House - 120 Pesan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
