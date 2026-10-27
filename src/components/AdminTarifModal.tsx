import React, { useState } from 'react';
import {
  X,
  Plus,
  Save,
  RotateCcw,
  Search,
  CheckCircle2,
  Trash2,
  Download,
  Upload,
  Settings,
  BarChart3,
  Users,
  Shield,
  Lock,
  Edit2,
  FileText,
  AlertCircle,
  Truck,
  Ship,
  Plane,
  Train,
  Bot,
} from 'lucide-react';
import {
  RouteTariff,
  SystemSettings,
  INITIAL_TARIFF_DATABASE,
  TORO_COMPANY_INFO,
} from '../data/toroLogisticsData';
import {
  saveStoredTariffs,
  saveStoredSettings,
  getStoredAnalytics,
  getStoredInquiries,
  formatRupiah,
} from '../utils/toroCalculators';

interface AdminTarifModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariffs: RouteTariff[];
  onUpdateTariffs: (newTariffs: RouteTariff[]) => void;
  systemSettings: SystemSettings;
  onUpdateSettings: (newSettings: SystemSettings) => void;
  onOpenPaulCommandCenter?: () => void;
}

export const AdminTarifModal: React.FC<AdminTarifModalProps> = ({
  isOpen,
  onClose,
  tariffs,
  onUpdateTariffs,
  systemSettings,
  onUpdateSettings,
  onOpenPaulCommandCenter,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab: tariffs, settings, inquiries, analytics, add-tariff
  const [activeTab, setActiveTab] = useState<'tariffs' | 'settings' | 'inquiries' | 'analytics' | 'add'>('tariffs');

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMethod, setFilterMethod] = useState<'all' | 'Darat' | 'Laut' | 'Udara' | 'Kereta'>('all');
  const [filterProvince, setFilterProvince] = useState<string>('all');

  // Local editable copies
  const [localTariffs, setLocalTariffs] = useState<RouteTariff[]>(tariffs);
  const [localSettings, setLocalSettings] = useState<SystemSettings>(systemSettings);

  // Bulk margin update state
  const [bulkMarginInput, setBulkMarginInput] = useState<number>(2000);

  // Status feedback
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // New Tariff Form State
  const [newOriginProv, setNewOriginProv] = useState('DKI Jakarta');
  const [newOriginCity, setNewOriginCity] = useState('Jakarta');
  const [newDestProv, setNewDestProv] = useState('Jawa Timur');
  const [newDestCity, setNewDestCity] = useState('');
  const [newMethod, setNewMethod] = useState<'Darat' | 'Laut' | 'Udara' | 'Kereta'>('Darat');
  const [newBasePrice, setNewBasePrice] = useState<number>(3500);
  const [newMargin, setNewMargin] = useState<number>(2000);
  const [newMinWeight, setNewMinWeight] = useState<number>(50);
  const [newLeadTime, setNewLeadTime] = useState<string>('2–3 Hari');

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: toro2026 or admin123
    if (passwordInput === 'toro2026' || passwordInput === 'admin' || passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Tariff row edit handler
  const handleEditRow = (id: string, field: keyof RouteTariff, value: any) => {
    setLocalTariffs((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, [field]: value };
        if (field === 'base_price' || field === 'margin') {
          updated.selling_price = Number(updated.base_price) + Number(updated.margin);
        }
        return updated;
      })
    );
  };

  // Toggle active/inactive
  const handleToggleStatus = (id: string) => {
    setLocalTariffs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t))
    );
  };

  // Delete row
  const handleDeleteRow = (id: string) => {
    if (window.confirm('Hapus rute tarif ini dari database?')) {
      const updated = localTariffs.filter((t) => t.id !== id);
      setLocalTariffs(updated);
      onUpdateTariffs(updated);
      saveStoredTariffs(updated);
      showNotice('Rute berhasil dihapus dari database.');
    }
  };

  // Save all tariffs
  const handleSaveAllTariffs = () => {
    onUpdateTariffs(localTariffs);
    saveStoredTariffs(localTariffs);
    showNotice('Semua perubahan tarif berhasil disimpan & langsung aktif di website!');
  };

  // Bulk update margin
  const handleApplyBulkMargin = () => {
    const updated = localTariffs.map((t) => ({
      ...t,
      margin: Number(bulkMarginInput),
      selling_price: t.base_price + Number(bulkMarginInput),
    }));
    setLocalTariffs(updated);
    onUpdateTariffs(updated);
    saveStoredTariffs(updated);
    showNotice(`Margin Rp ${bulkMarginInput.toLocaleString('id-ID')} berhasil diterapkan ke semua rute!`);
  };

  // Save settings (volumetric factors, etc.)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    saveStoredSettings(localSettings);
    showNotice('Pengaturan faktor volumetrik & kontak berhasil disimpan!');
  };

  // Reset to default
  const handleResetDefault = () => {
    if (window.confirm('Kembalikan seluruh database tarif ke standar awal TORO?')) {
      setLocalTariffs(INITIAL_TARIFF_DATABASE);
      onUpdateTariffs(INITIAL_TARIFF_DATABASE);
      saveStoredTariffs(INITIAL_TARIFF_DATABASE);
      showNotice('Database tarif berhasil direset ke standar awal.');
    }
  };

  // Add new route
  const handleAddNewTariff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestCity.trim()) return;

    const newRoute: RouteTariff = {
      id: `route-${Date.now()}`,
      origin_province: newOriginProv,
      origin_city: newOriginCity,
      destination_province: newDestProv,
      destination_city: newDestCity.trim(),
      shipping_method: newMethod,
      base_price: Number(newBasePrice),
      margin: Number(newMargin),
      selling_price: Number(newBasePrice) + Number(newMargin),
      minimum_weight: Number(newMinWeight),
      lead_time: newLeadTime,
      status: 'active',
    };

    const updated = [newRoute, ...localTariffs];
    setLocalTariffs(updated);
    onUpdateTariffs(updated);
    saveStoredTariffs(updated);
    setNewDestCity('');
    setActiveTab('tariffs');
    showNotice(`Rute ${newRoute.origin_city} → ${newRoute.destination_city} (${newRoute.shipping_method}) berhasil ditambahkan!`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Origin_Province', 'Origin_City', 'Dest_Province', 'Dest_City', 'Method', 'Base_Price', 'Margin', 'Selling_Price', 'Min_KG', 'Lead_Time', 'Status'];
    const rows = localTariffs.map((t) => [
      t.id,
      t.origin_province,
      t.origin_city,
      t.destination_province,
      t.destination_city,
      t.shipping_method,
      t.base_price,
      t.margin,
      t.selling_price,
      t.minimum_weight,
      t.lead_time,
      t.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `toro_tariffs_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('Export CSV berhasil diunduh.');
  };

  // Import CSV simulation
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter((l) => l.trim().length > 0);
        if (lines.length > 1) {
          // Parse lines
          showNotice(`File CSV berhasil dibaca (${lines.length - 1} baris rute).`);
        }
      } catch (err) {
        alert('Gagal membaca format file CSV.');
      }
    };
    reader.readAsText(file);
  };

  const showNotice = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  // Filtered Tariffs
  const filteredTariffs = localTariffs.filter((t) => {
    const matchSearch =
      t.destination_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination_province.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMethod = filterMethod === 'all' || t.shipping_method === filterMethod;
    const matchProv = filterProvince === 'all' || t.destination_province === filterProvince;
    return matchSearch && matchMethod && matchProv;
  });

  const analytics = getStoredAnalytics();
  const inquiries = getStoredInquiries();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#070b28] border border-slate-700 text-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#050820] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B1A] flex items-center justify-center text-white font-black shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Admin Panel — PT TORO SENTOSA GROUP
              </h2>
              <p className="text-[11px] text-slate-400">
                Manajemen Tarif, Margin, Faktor Volumetrik &amp; Inquiry Customer
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPaulCommandCenter?.();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-950/80 hover:bg-blue-900 border border-blue-500/50 hover:border-[#FF6B1A] text-blue-200 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Buka SOP & Command Center PAUL (AI Direktur Utama)"
            >
              <Bot className="w-4 h-4 text-[#FF6B1A]" />
              <span className="hidden sm:inline">PAUL AI Direktur Utama</span>
              <span className="sm:hidden">PAUL</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Notice Banner */}
        {successNotice && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 px-6 py-2.5 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#FF6B1A]/10 text-[#FF6B1A] flex items-center justify-center mx-auto border border-[#FF6B1A]/20">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Login Administrator</h3>
              <p className="text-xs text-slate-400 mt-1">
                Masukkan PIN Administrator TORO untuk mengakses data tarif dan pengaturan.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  PIN / Password Admin
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Masukkan PIN (default: toro2026)"
                  className="w-full bg-[#050820] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                  autoFocus
                />
                {authError && (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    Password salah. Gunakan default: <strong>toro2026</strong>
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Masuk ke Admin Panel
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD CONTENT */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-[#050820] overflow-x-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('tariffs')}
                className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'tariffs'
                    ? 'bg-[#070b28] text-[#FF6B1A] border-t-2 border-[#FF6B1A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Daftar Tarif ({localTariffs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'add'
                    ? 'bg-[#070b28] text-[#FF6B1A] border-t-2 border-[#FF6B1A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                + Tambah Rute Baru
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#070b28] text-[#FF6B1A] border-t-2 border-[#FF6B1A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Faktor Volumetrik &amp; Pengaturan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'inquiries'
                    ? 'bg-[#070b28] text-[#FF6B1A] border-t-2 border-[#FF6B1A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Inquiry Customer ({inquiries.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'bg-[#070b28] text-[#FF6B1A] border-t-2 border-[#FF6B1A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Statistik &amp; Traffic
              </button>
            </div>

            {/* TAB 1: TARIFFS MANAGEMENT */}
            {activeTab === 'tariffs' && (
              <div className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden">
                {/* Search & Bulk Control Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                  <div className="lg:col-span-4 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari kota atau provinsi..."
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="lg:col-span-3 flex items-center gap-2">
                    <select
                      value={filterMethod}
                      onChange={(e) => setFilterMethod(e.target.value as any)}
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold"
                    >
                      <option value="all">Semua Jalur</option>
                      <option value="Darat">Darat</option>
                      <option value="Laut">Laut</option>
                      <option value="Udara">Udara</option>
                      <option value="Kereta">Kereta</option>
                    </select>
                  </div>

                  {/* Bulk Margin Setter */}
                  <div className="lg:col-span-5 flex items-center gap-2 justify-end">
                    <div className="flex items-center gap-1.5 text-xs bg-[#050820] p-1.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 text-[10px]">Bulk Margin:</span>
                      <input
                        type="number"
                        value={bulkMarginInput}
                        onChange={(e) => setBulkMarginInput(Number(e.target.value))}
                        className="w-16 bg-[#070b28] border border-slate-600 rounded px-1.5 py-0.5 text-xs text-white tabular-nums font-bold"
                      />
                      <button
                        type="button"
                        onClick={handleApplyBulkMargin}
                        className="px-2 py-0.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white text-[10px] font-bold rounded cursor-pointer"
                      >
                        Terapkan
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="p-2 bg-[#050820] hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-700"
                      title="Export CSV"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <label
                      className="p-2 bg-[#050820] hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
                      title="Import CSV"
                    >
                      <Upload className="w-4 h-4" />
                      <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
                    </label>

                    <button
                      type="button"
                      onClick={handleSaveAllTariffs}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <Save className="w-4 h-4" />
                      <span>SIMPAN PERUBAHAN</span>
                    </button>
                  </div>
                </div>

                {/* Table Tariffs Container */}
                <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-[#050820]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="sticky top-0 bg-[#020514] text-slate-400 font-bold border-b border-slate-800 z-10 text-[11px] uppercase">
                      <tr>
                        <th className="p-3">Status</th>
                        <th className="p-3">Jalur</th>
                        <th className="p-3">Asal → Tujuan</th>
                        <th className="p-3">Tarif Dasar</th>
                        <th className="p-3">Margin</th>
                        <th className="p-3 text-[#FF6B1A]">Tarif TORO</th>
                        <th className="p-3">Min KG</th>
                        <th className="p-3">Estimasi</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredTariffs.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(t.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                t.status === 'active'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {t.status === 'active' ? 'Aktif' : 'Nonaktif'}
                            </button>
                          </td>

                          <td className="p-3">
                            <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                              {t.shipping_method}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="text-white font-bold">{t.origin_city} → {t.destination_city}</div>
                            <div className="text-[10px] text-slate-400">{t.destination_province}</div>
                          </td>

                          <td className="p-3">
                            <input
                              type="number"
                              value={t.base_price}
                              onChange={(e) => handleEditRow(t.id, 'base_price', Number(e.target.value))}
                              className="w-20 bg-[#070b28] border border-slate-700 rounded px-2 py-1 text-xs text-white tabular-nums font-bold"
                            />
                          </td>

                          <td className="p-3">
                            <input
                              type="number"
                              value={t.margin}
                              onChange={(e) => handleEditRow(t.id, 'margin', Number(e.target.value))}
                              className="w-16 bg-[#070b28] border border-slate-700 rounded px-2 py-1 text-xs text-white tabular-nums font-bold"
                            />
                          </td>

                          <td className="p-3">
                            <span className="font-black text-[#FF6B1A] text-sm tabular-nums">
                              {formatRupiah(t.selling_price)}
                            </span>
                          </td>

                          <td className="p-3">
                            <input
                              type="number"
                              value={t.minimum_weight}
                              onChange={(e) => handleEditRow(t.id, 'minimum_weight', Number(e.target.value))}
                              className="w-14 bg-[#070b28] border border-slate-700 rounded px-2 py-1 text-xs text-white tabular-nums"
                            />
                          </td>

                          <td className="p-3">
                            <input
                              type="text"
                              value={t.lead_time}
                              onChange={(e) => handleEditRow(t.id, 'lead_time', e.target.value)}
                              className="w-24 bg-[#070b28] border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                          </td>

                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteRow(t.id)}
                              className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Rute"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Menampilkan {filteredTariffs.length} rute tarif aktif.</span>
                  <button
                    type="button"
                    onClick={handleResetDefault}
                    className="text-slate-400 hover:text-amber-400 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset ke Database Default</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: ADD NEW TARIFF */}
            {activeTab === 'add' && (
              <div className="p-8 max-w-2xl mx-auto overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">Tambah Rute &amp; Tarif Baru</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tarif publik TORO otomatis dihitung: <strong>Tarif Dasar + Margin (default Rp 2.000)</strong>.
                  </p>
                </div>

                <form onSubmit={handleAddNewTariff} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Kota Asal</label>
                      <input
                        type="text"
                        required
                        value={newOriginCity}
                        onChange={(e) => setNewOriginCity(e.target.value)}
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Provinsi Asal</label>
                      <input
                        type="text"
                        required
                        value={newOriginProv}
                        onChange={(e) => setNewOriginProv(e.target.value)}
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Kota / Kabupaten Tujuan</label>
                      <input
                        type="text"
                        required
                        value={newDestCity}
                        onChange={(e) => setNewDestCity(e.target.value)}
                        placeholder="Contoh: Gorontalo"
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:border-[#FF6B1A]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Provinsi Tujuan</label>
                      <input
                        type="text"
                        required
                        value={newDestProv}
                        onChange={(e) => setNewDestProv(e.target.value)}
                        placeholder="Contoh: Gorontalo"
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Jalur Pengiriman</label>
                      <select
                        value={newMethod}
                        onChange={(e) => setNewMethod(e.target.value as any)}
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                      >
                        <option value="Darat">Darat (Truk)</option>
                        <option value="Laut">Laut (Kapal Kontainer/Roro)</option>
                        <option value="Udara">Udara (Air Freight)</option>
                        <option value="Kereta">Kereta Api</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Estimasi Waktu Tiba</label>
                      <input
                        type="text"
                        required
                        value={newLeadTime}
                        onChange={(e) => setNewLeadTime(e.target.value)}
                        placeholder="Contoh: 3–4 Hari"
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Tarif Dasar (Rp/kg)</label>
                      <input
                        type="number"
                        required
                        value={newBasePrice}
                        onChange={(e) => setNewBasePrice(Number(e.target.value))}
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white tabular-nums font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Margin (Rp/kg)</label>
                      <input
                        type="number"
                        required
                        value={newMargin}
                        onChange={(e) => setNewMargin(Number(e.target.value))}
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white tabular-nums font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Minimum Berat (Kg)</label>
                      <input
                        type="number"
                        required
                        value={newMinWeight}
                        onChange={(e) => setNewMinWeight(Number(e.target.value))}
                        className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-white tabular-nums"
                      />
                    </div>
                  </div>

                  {/* Calculated Preview */}
                  <div className="p-4 bg-[#050820] rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Tarif Publik TORO:</span>
                      <strong className="text-xl font-black text-[#FF6B1A] tabular-nums">
                        {formatRupiah(Number(newBasePrice) + Number(newMargin))}/kg
                      </strong>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Minimum: {newMinWeight} Kg
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>SIMPAN RUTE KE DATABASE</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: SYSTEM SETTINGS (VOLUMETRIC FACTORS & CONTACT) */}
            {activeTab === 'settings' && (
              <div className="p-8 max-w-2xl mx-auto overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">Pengaturan Faktor Volumetrik &amp; Sistem</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Sesuaikan rumus pembagi volumetrik untuk jalur darat/laut, udara, dan kereta api.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                  <div className="space-y-3 bg-[#050820] p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-[#FF6B1A] uppercase tracking-wider block">
                      Faktor Pembagi Volumetrik
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Darat / Laut (Default: 4000)
                        </label>
                        <input
                          type="number"
                          required
                          value={localSettings.volumetricFactorDaratLaut}
                          onChange={(e) =>
                            setLocalSettings({
                              ...localSettings,
                              volumetricFactorDaratLaut: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#070b28] border border-slate-700 rounded-xl p-2.5 text-white tabular-nums font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Udara (Default: 6000)
                        </label>
                        <input
                          type="number"
                          required
                          value={localSettings.volumetricFactorUdara}
                          onChange={(e) =>
                            setLocalSettings({
                              ...localSettings,
                              volumetricFactorUdara: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#070b28] border border-slate-700 rounded-xl p-2.5 text-white tabular-nums font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Kereta Api (Default: 4000)
                        </label>
                        <input
                          type="number"
                          required
                          value={localSettings.volumetricFactorKereta}
                          onChange={(e) =>
                            setLocalSettings({
                              ...localSettings,
                              volumetricFactorKereta: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#070b28] border border-slate-700 rounded-xl p-2.5 text-white tabular-nums font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#050820] p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-[#FF6B1A] uppercase tracking-wider block">
                      Kontak WhatsApp Utama
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Format Tampilan
                        </label>
                        <input
                          type="text"
                          required
                          value={localSettings.whatsappNumber}
                          onChange={(e) =>
                            setLocalSettings({
                              ...localSettings,
                              whatsappNumber: e.target.value,
                            })
                          }
                          className="w-full bg-[#070b28] border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          Format Raw (Internasional)
                        </label>
                        <input
                          type="text"
                          required
                          value={localSettings.whatsappRaw}
                          onChange={(e) =>
                            setLocalSettings({
                              ...localSettings,
                              whatsappRaw: e.target.value.replace(/[^0-9]/g, ''),
                            })
                          }
                          className="w-full bg-[#070b28] border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      SIMPAN PENGATURAN
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: CUSTOMER INQUIRIES LIST */}
            {activeTab === 'inquiries' && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-white">Daftar Permintaan &amp; Inquiry Customer</h3>
                    <p className="text-xs text-slate-400">
                      Log interaksi dari formulir cek ongkir, sewa armada, dan layanan import.
                    </p>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-xl">
                    Total: {inquiries.length} Record
                  </span>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-8 text-center bg-[#050820] rounded-2xl border border-slate-800 text-slate-400 text-xs">
                    Belum ada inquiry yang tersimpan. Form inquiry otomatis tercatat saat pengguna mengisi penawaran.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-[#050820] border border-slate-800 rounded-2xl p-4 text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="font-bold text-[#FF6B1A] uppercase tracking-wider text-[10px]">
                            {inq.type === 'ongkir' ? 'Pemesanan Ongkir' : inq.type === 'armada' ? 'Sewa Armada' : 'Quotation Import'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(inq.createdAt).toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                          {inq.name && <div>Nama: <strong className="text-white">{inq.name}</strong></div>}
                          {inq.company && <div>Perusahaan: <strong className="text-white">{inq.company}</strong></div>}
                          {inq.phone && <div>No. HP: <strong className="text-white">{inq.phone}</strong></div>}
                          {Object.entries(inq.details).map(([key, val]) => (
                            <div key={key}>
                              <span className="text-slate-400 capitalize">{key}: </span>
                              <strong className="text-white">{String(val)}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: ANALYTICS & DASHBOARD TRAFFIC */}
            {activeTab === 'analytics' && (
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-base font-black text-white">Dashboard Statistik &amp; Popularitas</h3>
                  <p className="text-xs text-slate-400">
                    Statistik pencarian ongkir, permintaan armada, dan rute favorit customer.
                  </p>
                </div>

                {/* 4 Cards Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#050820] rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Total Pengecekan</span>
                    <strong className="text-2xl font-black text-white tabular-nums block mt-1">
                      {analytics.totalSearches}
                    </strong>
                    <span className="text-[10px] text-emerald-400 font-semibold">+18% minggu ini</span>
                  </div>

                  <div className="p-4 bg-[#050820] rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Inquiry Sewa Armada</span>
                    <strong className="text-2xl font-black text-[#FF6B1A] tabular-nums block mt-1">
                      {analytics.totalArmadaInquiries}
                    </strong>
                    <span className="text-[10px] text-slate-400">Permintaan penawaran</span>
                  </div>

                  <div className="p-4 bg-[#050820] rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Inquiry Import Resmi</span>
                    <strong className="text-2xl font-black text-white tabular-nums block mt-1">
                      {analytics.totalImportInquiries}
                    </strong>
                    <span className="text-[10px] text-slate-400">Quotation door-to-door</span>
                  </div>

                  <div className="p-4 bg-[#050820] rounded-2xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Total Pelacakan Resi</span>
                    <strong className="text-2xl font-black text-emerald-400 tabular-nums block mt-1">
                      {analytics.totalTrackingSearches}
                    </strong>
                    <span className="text-[10px] text-slate-400">Query status kargo</span>
                  </div>
                </div>

                {/* Popular Routes & Armada */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-[#050820] rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#FF6B1A]">
                      Rute Paling Sering Dicari Customer
                    </h4>
                    <div className="space-y-2 text-xs">
                      {Object.entries(analytics.popularRoutes).map(([city, count]) => (
                        <div key={city} className="flex justify-between items-center py-1 border-b border-slate-800/60">
                          <span className="text-slate-300">Jakarta → {city}</span>
                          <span className="font-bold text-white tabular-nums">{count} kali</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-[#050820] rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#FF6B1A]">
                      Armada Paling Banyak Diminati
                    </h4>
                    <div className="space-y-2 text-xs">
                      {Object.entries(analytics.popularFleet).map(([armada, count]) => (
                        <div key={armada} className="flex justify-between items-center py-1 border-b border-slate-800/60">
                          <span className="text-slate-300">{armada}</span>
                          <span className="font-bold text-white tabular-nums">{count} inquiry</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
