import { useState, useEffect } from 'react';
import { Plus, Download, Upload, Search, Filter, X } from 'lucide-react';
import api from '../lib/api';
import * as XLSX from 'xlsx';

export function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStep, setImportStep] = useState(1); // 1: Select, 2: Map
  const [excelData, setExcelData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<any>({ phone: '', name: '', source: '' });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads');
      setLeads(response.data);
    } catch (err) {
      console.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      if (data.length > 0) {
        setExcelData(data);
        setColumns(Object.keys(data[0] as object));
        setImportStep(2);
      }
    };
    reader.readAsBinaryString(file);
  };

  const executeImport = async () => {
    const mappedLeads = excelData.map(row => ({
      phone: row[mapping.phone],
      name: mapping.name ? row[mapping.name] : 'Unknown',
      source: mapping.source ? row[mapping.source] : 'Excel Import',
      metadata: row // Keep everything else as metadata
    })).filter(l => l.phone); // Must have phone

    try {
      await api.post('/leads/import', { leads: mappedLeads });
      setShowImportModal(false);
      fetchLeads();
      alert(`Berhasil mengimpor ${mappedLeads.length} leads!`);
    } catch (err) {
      alert('Gagal mengimpor leads. Pastikan data benar.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>Manajemen Leads</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Kelola data calon pelanggan dan potensi sales.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="glass-card" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Download size={18} /> Ekspor
          </button>
          <button 
            onClick={() => { setShowImportModal(true); setImportStep(1); }}
            className="gradient-bg" 
            style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            <Upload size={18} /> Impor Excel
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="glass-card" style={{ padding: '15px', marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Cari nama atau nomor telepon..." 
            style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: 'white' }}
          />
        </div>
        <button className="glass-card" style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Leads Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px' }}>Nama</th>
              <th style={{ padding: '16px' }}>Telepon</th>
              <th style={{ padding: '16px' }}>Sumber</th>
              <th style={{ padding: '16px' }}>Status</th>
              <th style={{ padding: '16px' }}>Tanggal</th>
              <th style={{ padding: '16px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Memuat data leads...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Belum ada data leads. Silakan impor file Excel.</td></tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '16px' }}>{lead.name}</td>
                  <td style={{ padding: '16px' }}>{lead.phone}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>{lead.source}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700',
                      padding: '4px 8px', 
                      borderRadius: '20px', 
                      background: lead.status === 'NEW' ? 'rgba(74, 144, 226, 0.2)' : 'rgba(46, 204, 113, 0.2)',
                      color: lead.status === 'NEW' ? '#4a90e2' : '#2ecc71'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button style={{ color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Detail</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '30px', position: 'relative' }}>
            <button onClick={() => setShowImportModal(false)} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <h3 style={{ marginBottom: '20px' }}>Impor Data Leads</h3>

            {importStep === 1 ? (
              <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed var(--glass-border)', borderRadius: '15px' }}>
                <Upload size={48} style={{ color: 'var(--accent-blue)', marginBottom: '15px' }} />
                <p>Klik tombol di bawah untuk memilih file Excel (.xlsx atau .csv)</p>
                <input type="file" id="excelFile" hidden accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
                <label htmlFor="excelFile" className="gradient-bg" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
                  Pilih File
                </label>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Petakan kolom dari file Excel Anda ke sistem CRMTS.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <MappingField label="Nomor Telepon (Wajib)" value={mapping.phone} options={columns} onChange={(v: string) => setMapping({...mapping, phone: v})} />
                  <MappingField label="Nama Lengkap" value={mapping.name} options={columns} onChange={(v: string) => setMapping({...mapping, name: v})} />
                  <MappingField label="Sumber Data" value={mapping.source} options={columns} onChange={(v: string) => setMapping({...mapping, source: v})} />
                </div>
                
                <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => setImportStep(1)} className="glass-card" style={{ flex: 1, padding: '12px', cursor: 'pointer' }}>Batal</button>
                  <button 
                    onClick={executeImport}
                    disabled={!mapping.phone}
                    className="gradient-bg" 
                    style={{ flex: 1, padding: '12px', border: 'none', color: 'white', fontWeight: '600', borderRadius: '10px', cursor: mapping.phone ? 'pointer' : 'not-allowed', opacity: mapping.phone ? 1 : 0.5 }}
                  >
                    Mulai Impor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MappingField({ label, value, options, onChange }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="glass-card"
        style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none' }}
      >
        <option value="">-- Pilih Kolom --</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
