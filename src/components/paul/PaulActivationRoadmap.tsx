import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Database,
  Table,
  Clock,
  Radio,
  Lock,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Download,
  Copy,
  ShieldCheck,
  Bot,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { formatRupiah } from '../../utils/toroCalculators';

interface PaulActivationRoadmapProps {
  onSwitchToAiChat: (initialPrompt?: string) => void;
}

export const PaulActivationRoadmap: React.FC<PaulActivationRoadmapProps> = ({
  onSwitchToAiChat,
}) => {
  // Mode toggle for Rancangan Dashboard Sederhana
  const [dashboardViewMode, setDashboardViewMode] = useState<'rancangan' | 'terhubung'>('rancangan');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Completed steps tracker in LocalStorage
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: true,
    6: false,
  });

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const spreadsheetTemplateText = `ID,Tanggal,Kategori,Pelanggan_Mitra,Rute,Berat_KG,Harga_Jual,Biaya_Mitra,Margin_Kotor,Kas_Masuk,Status_PoD,Keterangan
TR-882109,2026-10-25,Pesanan,CV. Indo Berkah Mandiri,Jakarta-Surabaya,250,1375000,875000,500000,0,Belum Ada,Invoice terbit jatuh tempo 7 hari
TR-665123,2026-10-24,Pesanan,CV. Sandang Prima Bandung,Jakarta-Bandung,650,2925000,1625000,1300000,2925000,Ada Sah,Lunas transfer BCA verified
TR-773401,2026-10-23,Pesanan,PT. Sumatra Multi Niaga,Jakarta-Medan,480,2304000,1344000,960000,0,Transit Laut,Kapal menuju Belawan
EXP-001,2026-10-24,Biaya Ops,Gudang Packaging Cengkareng,-,0,0,450000,-450000,0,-,Plastik bubble & karung`;

  const handleCopySpreadsheetTemplate = () => {
    navigator.clipboard.writeText(spreadsheetTemplateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleDownloadCsv = () => {
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + spreadsheetTemplateText);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'TORO_Logistic_BasisData_Master.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                ROADMAP AKTIVASI &amp; KLASIFIKASI KAPABILITAS
              </span>
              <span className="text-xs text-slate-400">Arsitektur Operasional PAUL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Batas Kemampuan Sistem &amp; 6 Langkah Aktivasi PAUL
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Panduan implementasi bertahap untuk pemilik TORO Logistic: membedakan kemampuan percakapan mandiri, fitur yang memerlukan integrasi, batasan otorisasi mutlak pemilik, serta roadmap 6 langkah aktivasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSwitchToAiChat('Bagaimana langkah implementasi integrasi CRM dan spreadsheet untuk TORO Logistic?')}
            className="px-4 py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 border border-blue-500/50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[#FF6B1A]" />
            <span>Konsultasikan Roadmap ke PAUL</span>
          </button>
        </div>

        {/* 3 Categories Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* 1. Bisa Dilakukan dalam Percakapan */}
          <div className="bg-[#070b28] border-2 border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Bisa dalam Percakapan AI</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                Analisis, Draf, &amp; Perhitungan
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Menyusun strategi penjualan kargo</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Membuat draf penawaran (*Quotation*)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Menghitung margin dari data yang diberikan</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Menganalisis risiko pengiriman rute</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Membuat format dashboard spreadsheet</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Menyiapkan draf laporan harian/mingguan</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-emerald-400/90 font-medium">
              ✓ Siap digunakan langsung di Konsol AI
            </div>
          </div>

          {/* 2. Memerlukan Integrasi */}
          <div className="bg-[#070b28] border-2 border-blue-500/40 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Radio className="w-4 h-4" />
                <span>Memerlukan Integrasi</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                Automasi Data &amp; Webhook Eksternal
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Mengambil data transaksi otomatis</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Membaca status live pengiriman ekspedisi</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Sinkronisasi spreadsheet atau CRM</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Kirim WhatsApp terjadwal ke pelanggan</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Kirim laporan otomatis jam 16.00 WIB</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-blue-400/90 font-medium">
              * Bergantung aplikasi, izin &amp; fitur API
            </div>
          </div>

          {/* 3. Memerlukan Persetujuan Pemilik */}
          <div className="bg-[#070b28] border-2 border-amber-500/40 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" />
                <span>Memerlukan Izin Pemilik</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                Keputusan Finansial &amp; Strategis
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Keputusan keuangan bernominal besar</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Investasi, pinjaman, pembelian aset</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Pembayaran vendor &amp; transfer rekening</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Kontrak penting &amp; kerja sama jangka panjang</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Pemberian tempo kredit (TOP) pelanggan</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Perubahan kebijakan margin minimum</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-amber-300 font-semibold">
              PAUL menganalisis, Pemilik memutuskan
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          RANCANGAN DASHBOARD SEDERHANA (PAUL Control Center)
          ======================================================== */}
      <div className="bg-[#0b1033] border-2 border-slate-700 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#FF6B1A] uppercase tracking-wider">
                PAUL Control Center
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-300 font-medium">TORO Logistic · Tampilan rancangan</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              Rancangan Dashboard Sederhana (Status: Menunggu Integrasi)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDashboardViewMode('rancangan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dashboardViewMode === 'rancangan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mode Rancangan Murni (Tanda “—”)
            </button>
            <button
              type="button"
              onClick={() => setDashboardViewMode('terhubung')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dashboardViewMode === 'terhubung'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mode Data Terhubung (Simulasi)
            </button>
          </div>
        </div>

        {/* The 4 Core Blueprint Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {/* Card 1: Prospek hari ini */}
          <div className="bg-[#070b28] border border-slate-800 rounded-xl p-5 text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Prospek hari ini
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white my-3 font-mono">
                {dashboardViewMode === 'rancangan' ? '—' : '5'}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900/80 py-1.5 px-2 rounded-lg border border-slate-800">
              {dashboardViewMode === 'rancangan' ? 'Menunggu data CRM' : '5 prospek aktif terdaftar'}
            </div>
          </div>

          {/* Card 2: Pengiriman aktif */}
          <div className="bg-[#070b28] border border-slate-800 rounded-xl p-5 text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Pengiriman aktif
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#FF6B1A] my-3 font-mono">
                {dashboardViewMode === 'rancangan' ? '—' : '4'}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900/80 py-1.5 px-2 rounded-lg border border-slate-800">
              {dashboardViewMode === 'rancangan' ? 'Menunggu data operasional' : '4 armada dalam transit'}
            </div>
          </div>

          {/* Card 3: Margin kotor */}
          <div className="bg-[#070b28] border border-slate-800 rounded-xl p-5 text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Margin kotor
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 my-3 font-mono">
                {dashboardViewMode === 'rancangan' ? '—' : 'Rp3.490.000'}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900/80 py-1.5 px-2 rounded-lg border border-slate-800">
              {dashboardViewMode === 'rancangan' ? 'Belum dihitung dari transaksi' : 'Rata-rata Rp2.000/KG'}
            </div>
          </div>

          {/* Card 4: Persetujuan pemilik */}
          <div className="bg-[#070b28] border border-slate-800 rounded-xl p-5 text-center flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide text-amber-300">
                Persetujuan pemilik
              </div>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 my-3 font-mono">
                {dashboardViewMode === 'rancangan' ? '—' : '2'}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900/80 py-1.5 px-2 rounded-lg border border-slate-800">
              {dashboardViewMode === 'rancangan' ? 'Belum terhubung ke alur persetujuan' : '2 permintaan menunggu otorisasi'}
            </div>
          </div>
        </div>

        {/* Principle Note from User Prompt */}
        <div className="mt-5 p-3.5 bg-slate-900/80 border border-slate-700/80 rounded-xl flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A]" />
            <span className="font-semibold text-white">
              Prinsip Integritas Data TORO Logistic:
            </span>
            <span className="text-slate-300">
              Tanda <strong>“—”</strong> berarti belum ada data yang terhubung, bukan berarti nilainya nol.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Anti-Halusinasi Data</span>
        </div>
      </div>

      {/* ========================================================
          URUTAN IMPLEMENTASI 6 LANGKAH AKTIVASI PAUL
          ======================================================== */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
              ROADMAP IMPLEMENTASI
            </span>
            <span className="text-xs text-slate-400">Rencana Kerja Bertahap</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Langkah Berikutnya untuk Mengaktifkan PAUL Secara Penuh
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ikuti 6 langkah implementasi berikut agar seluruh fitur otomatisasi dan pengawasan PAUL dapat berjalan mulus tanpa risiko disrupsi operasional.
          </p>
        </div>

        <div className="space-y-4 mt-5">
          {/* Langkah 1 */}
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              completedSteps[1]
                ? 'bg-[#070b28] border-emerald-500/40'
                : 'bg-[#070b28] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(1)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                    completedSteps[1]
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600 bg-slate-800 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B1A]">LANGKAH 1</span>
                    <h4 className="font-bold text-white text-base">
                      Basis Data Terpadu (Single Source of Truth)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Buat satu sumber data pelanggan, penawaran, pesanan, pengiriman, biaya, dan pembayaran. Tidak boleh ada catatan terpisah yang menimbulkan selisih angka.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleCopySpreadsheetTemplate}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedTemplate ? 'Tersalin!' : 'Salin Skema Basis Data CSV'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadCsv}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh File Template (.csv)</span>
                    </button>
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  completedSteps[1]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {completedSteps[1] ? 'Siap / Terkonfigurasi' : 'Perlu Disiapkan'}
              </span>
            </div>
          </div>

          {/* Langkah 2 */}
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              completedSteps[2]
                ? 'bg-[#070b28] border-emerald-500/40'
                : 'bg-[#070b28] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(2)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                    completedSteps[2]
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600 bg-slate-800 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B1A]">LANGKAH 2</span>
                    <h4 className="font-bold text-white text-base">
                      Dashboard Spreadsheet Awal
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Mulai dengan spreadsheet (Google Sheets / Excel) agar pemilik bisa melihat angka tanpa menunggu aplikasi besar selesai.
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Kelebihan: Cepat, transparan, dapat diedit langsung oleh tim administrasi, dan mudah divalidasi oleh PAUL.
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  completedSteps[2]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {completedSteps[2] ? 'Siap / Tersedia' : 'Dalam Persiapan'}
              </span>
            </div>
          </div>

          {/* Langkah 3 */}
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              completedSteps[3]
                ? 'bg-[#070b28] border-emerald-500/40'
                : 'bg-[#070b28] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(3)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                    completedSteps[3]
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600 bg-slate-800 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B1A]">LANGKAH 3</span>
                    <h4 className="font-bold text-white text-base">
                      Laporan Terjadwal
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Tentukan jam laporan harian (pukul 15.30–16.00 WIB) dan mingguan (setiap akhir pekan), lalu aktifkan melalui fitur penjadwalan atau integrasi yang tersedia.
                  </p>
                  <div className="mt-2 text-[11px] text-blue-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Jadwal acuan: 15.30–16.00 WIB draf laporan selesai dirangkum</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  completedSteps[3]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {completedSteps[3] ? 'Aktif' : 'Menunggu Otomatisasi'}
              </span>
            </div>
          </div>

          {/* Langkah 4 */}
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              completedSteps[4]
                ? 'bg-[#070b28] border-emerald-500/40'
                : 'bg-[#070b28] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(4)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                    completedSteps[4]
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600 bg-slate-800 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B1A]">LANGKAH 4</span>
                    <h4 className="font-bold text-white text-base">
                      Integrasi Operasional (Kanal Komunikasi &amp; Pelacakan)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Sambungkan kanal komunikasi (WhatsApp API / Webhook resmi) dan sumber status pengiriman yang benar-benar digunakan TORO Logistic (sistem manifest vendor darat, laut, udara).
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  completedSteps[4]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {completedSteps[4] ? 'Terhubung' : 'Tahap Integrasi'}
              </span>
            </div>
          </div>

          {/* Langkah 5 */}
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              completedSteps[5]
                ? 'bg-[#070b28] border-emerald-500/40'
                : 'bg-[#070b28] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(5)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                    completedSteps[5]
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600 bg-slate-800 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B1A]">LANGKAH 5</span>
                    <h4 className="font-bold text-white text-base">
                      Otorisasi &amp; Matriks Hak Akses
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Tetapkan siapa yang boleh membaca, mengubah, mengirim, dan menyetujui setiap jenis tindakan. Pemilik memegang kendali mutlak atas keputusan keuangan, diskon di bawah margin, dan syarat tempo pembayaran.
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  completedSteps[5]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {completedSteps[5] ? 'Ditetapkan di SOP' : 'Perlu Penetapan'}
              </span>
            </div>
          </div>

          {/* Langkah 6 */}
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all ${
              completedSteps[6]
                ? 'bg-[#070b28] border-emerald-500/40'
                : 'bg-[#070b28] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleStep(6)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                    completedSteps[6]
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-slate-600 bg-slate-800 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 fill-current" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B1A]">LANGKAH 6</span>
                    <h4 className="font-bold text-white text-base">
                      Uji Coba &amp; Aktivasi Bertahap (Sandbox Mode)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Jalankan dahulu dalam mode uji (*Test / Sandbox Mode*), periksa hasil perhitungan dan laporan, lalu aktifkan tindakan otomatis secara bertahap untuk menjaga stabilitas bisnis.
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  completedSteps[6]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {completedSteps[6] ? 'Lulus Uji Coba' : 'Tahap Simulasi'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
