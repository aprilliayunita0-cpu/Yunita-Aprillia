import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Copy,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  MapPin,
  Phone,
  FileCheck,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Send,
  Eye,
  Check,
  Percent,
  Truck,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';
import {
  PaulAgent,
  PaulTask,
  OwnerApprovalRequest,
} from '../../data/paulSopData';
import { formatRupiah } from '../../utils/toroCalculators';

interface PaulKeagenanViewProps {
  agents: PaulAgent[];
  onUpdateAgents: (agents: PaulAgent[]) => void;
  onAddTask?: (task: PaulTask) => void;
  onRequestApproval?: (request: OwnerApprovalRequest) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const PaulKeagenanView: React.FC<PaulKeagenanViewProps> = ({
  agents,
  onUpdateAgents,
  onAddTask,
  onRequestApproval,
  onNavigateToTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<PaulAgent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Agent Form State (21 Columns)
  const [formData, setFormData] = useState<Partial<PaulAgent>>({
    namaAgen: '',
    namaUsaha: '',
    wilayah: '',
    kontakBisnis: '',
    ruteLayanan: 'Jabodetabek & Seluruh Indonesia via Hub',
    kapasitas: 'Ruko / Gudang Transit, Timbangan Kargo',
    statusPendekatan: 'Pendekatan',
    statusVerifikasi: 'Sedang Diverifikasi',
    dokumen: ['KTP'],
    usulanKomisi: '15% per transaksi kargo',
    statusPersetujuan: 'Menunggu Persetujuan Pemilik',
    tanggalAktivasi: 'Menunggu Persetujuan',
    jumlahPengiriman: 0,
    biaya: 0,
    komisiTerutang: 0,
    keluhan: 'Nihil',
    pic: 'SASA',
    tindakLanjut: 'Kumpulkan kelengkapan dokumen NIB & survei lokasi',
    tanggalEvaluasi: '30 hari setelah aktivasi',
    catatan: 'Calon mitra potensial hasil pemetaan wilayah Divisi SASA.',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered agents
  const filteredAgents = agents.filter((ag) => {
    const matchSearch =
      ag.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.namaAgen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.namaUsaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.wilayah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.ruteLayanan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === 'all'
        ? true
        : ag.statusPendekatan.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  // Key metrics
  const totalAgents = agents.length;
  const activeAgents = agents.filter((a) => a.statusPendekatan === 'Aktif').length;
  const pendingApprovals = agents.filter(
    (a) => a.statusPersetujuan === 'Menunggu Persetujuan Pemilik'
  ).length;
  const totalShipmentsByAgents = agents.reduce((sum, a) => sum + (a.jumlahPengiriman || 0), 0);
  const totalAccruedCommission = agents.reduce((sum, a) => sum + (a.komisiTerutang || 0), 0);

  // Export to CSV matching the 21 columns
  const handleExportCsv = () => {
    const headers = [
      'ID Agen',
      'Tanggal Masuk',
      'Nama Agen',
      'Nama Usaha',
      'Wilayah',
      'Kontak Bisnis',
      'Rute Layanan',
      'Kapasitas',
      'Status Pendekatan',
      'Status Verifikasi',
      'Dokumen',
      'Usulan Komisi',
      'Status Persetujuan',
      'Tanggal Aktivasi',
      'Jumlah Pengiriman',
      'Biaya',
      'Komisi Terutang',
      'Keluhan',
      'PIC',
      'Tindak Lanjut',
      'Tanggal Evaluasi',
      'Catatan',
    ];

    const rows = agents.map((a) => [
      a.id,
      a.tanggalMasuk,
      `"${a.namaAgen}"`,
      `"${a.namaUsaha}"`,
      `"${a.wilayah}"`,
      a.kontakBisnis,
      `"${a.ruteLayanan}"`,
      `"${a.kapasitas}"`,
      a.statusPendekatan,
      a.statusVerifikasi,
      `"${a.dokumen.join(', ')}"`,
      `"${a.usulanKomisi}"`,
      a.statusPersetujuan,
      a.tanggalAktivasi,
      a.jumlahPengiriman,
      a.biaya,
      a.komisiTerutang,
      `"${a.keluhan}"`,
      a.pic,
      `"${a.tindakLanjut}"`,
      a.tanggalEvaluasi,
      `"${a.catatan}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TORO_KEAGENAN_21_KOLOM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('File CSV Tab KEAGENAN (21 Kolom) berhasil diunduh!');
  };

  const handleCopySheetsSchema = () => {
    const schemaText = `ID Agen; tanggal masuk; nama agen; nama usaha; wilayah; kontak bisnis; rute layanan; kapasitas; status pendekatan; status verifikasi; dokumen; usulan komisi; status persetujuan; tanggal aktivasi; jumlah pengiriman; biaya; komisi terutang; keluhan; PIC; tindak lanjut; tanggal evaluasi; catatan`;
    navigator.clipboard.writeText(schemaText);
    showToast('Struktur 21 Kolor Tab KEAGENAN disalin ke Clipboard!');
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaAgen || !formData.namaUsaha || !formData.wilayah) {
      alert('Nama agen, nama usaha, dan wilayah wajib diisi!');
      return;
    }

    const nextIdNumber = agents.length + 1;
    const newId = `AGN-${String(nextIdNumber).padStart(4, '0')}`;
    const todayStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newAgent: PaulAgent = {
      id: newId,
      tanggalMasuk: todayStr,
      namaAgen: formData.namaAgen || '',
      namaUsaha: formData.namaUsaha || '',
      wilayah: formData.wilayah || '',
      kontakBisnis: formData.kontakBisnis || '08...',
      ruteLayanan: formData.ruteLayanan || 'Kargo via Hub Pusat',
      kapasitas: formData.kapasitas || 'Toko Retail & Timbangan',
      statusPendekatan: (formData.statusPendekatan as any) || 'Pendekatan',
      statusVerifikasi: (formData.statusVerifikasi as any) || 'Sedang Diverifikasi',
      dokumen: formData.dokumen && formData.dokumen.length > 0 ? formData.dokumen : ['KTP'],
      usulanKomisi: formData.usulanKomisi || '15% per transaksi',
      statusPersetujuan: 'Menunggu Persetujuan Pemilik',
      tanggalAktivasi: 'Menunggu Persetujuan',
      jumlahPengiriman: 0,
      biaya: 0,
      komisiTerutang: 0,
      keluhan: 'Nihil',
      pic: (formData.pic as any) || 'SASA',
      tindakLanjut: formData.tindakLanjut || 'Minta kelengkapan dokumen NIB & survei lokasi',
      tanggalEvaluasi: formData.tanggalEvaluasi || '30 hari setelah aktivasi',
      catatan: formData.catatan || 'Calon agen baru hasil rekrutmen Divisi Keagenan (SASA).',
    };

    const updated = [newAgent, ...agents];
    onUpdateAgents(updated);
    setShowAddModal(false);
    setSelectedAgent(newAgent);
    showToast(`Agen ${newId} (${newAgent.namaUsaha}) berhasil didaftarkan di Tab KEAGENAN!`);

    // Otomatis buat tugas antar divisi untuk IQBAL & FIQA
    if (onAddTask) {
      onAddTask({
        id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
        title: `Verifikasi Kesiapan Operasional Rute & Akses Armada Agen ${newAgent.namaUsaha} (${newId})`,
        pic: 'IQBAL',
        deadline: '3 hari kerja',
        status: 'Menunggu',
        result: 'Menunggu inspeksi rute dan akses truk pickup.',
        relatedEntityId: newId,
      });

      onAddTask({
        id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
        title: `Audit Skema Komisi & Perhitungan Margin TORO untuk Agen ${newId} (${newAgent.usulanKomisi})`,
        pic: 'FIQA',
        deadline: '2 hari kerja',
        status: 'Menunggu',
        result: 'Menunggu analisis batas margin minimal Rp2.000/kg.',
        relatedEntityId: newId,
      });
    }
  };

  // Eskalasi persetujuan ke Pemilik
  const handleEscalateToOwner = (agent: PaulAgent) => {
    if (onRequestApproval) {
      const newApproval: OwnerApprovalRequest = {
        id: `appr-agn-${Date.now()}`,
        requestNumber: `REQ-AGN-${agent.id}`,
        requestDate: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        decisionType: 'Kontrak Besar / Strategis',
        monetaryValue: 0,
        reason: `Pengajuan pembukaan keagenan resmi baru di wilayah ${agent.wilayah} untuk ${agent.namaUsaha} (${agent.namaAgen}) dengan usulan komisi ${agent.usulanKomisi}. Dokumen legalitas dan verifikasi operasional telah di-review SASA, IQBAL, dan FIQA.`,
        benefit: `Memperluas jangkauan layanan TORO di koridor ${agent.wilayah}, menampung kiriman kargo ritel & UMKM lokal tanpa investasi sewa ruko perusahaan.`,
        riskIfApproved: `Komitmen skema komisi ${agent.usulanKomisi} harus dipenuhi tepat waktu. Kepatuhan SOP penanganan barang wajib diawasi IQBAL.`,
        riskIfRejected: `Potensi pasar kargo di wilayah ${agent.wilayah} diambil ekspedisi kompetitor.`,
        supportingDocuments: [
          `Dokumen Agen: ${agent.dokumen.join(', ')}`,
          `Rekomendasi Operasional Kargo (IQBAL)`,
          `Simulasi Margin & Skema Komisi (FIQA)`,
        ],
        status: 'menunggu',
      };
      onRequestApproval(newApproval);
      showToast(`Pengajuan keagenan ${agent.id} berhasil dieskalasikan ke Pemilik di Panel 5!`);
    } else {
      showToast(`Permintaan persetujuan telah disiapkan.`);
    }
  };

  // Verifikasi Dokumen & Operasional (IQBAL / FIQA / SASA)
  const handleVerifyAgent = (agentId: string, isApprovedByOwner: boolean) => {
    const updated = agents.map((ag) => {
      if (ag.id === agentId) {
        if (isApprovedByOwner) {
          return {
            ...ag,
            statusPendekatan: 'Aktif' as const,
            statusVerifikasi: 'Terverifikasi Sah' as const,
            statusPersetujuan: 'Disetujui Pemilik' as const,
            tanggalAktivasi: new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
            tindakLanjut: 'Serah terima spanduk TORO, pelatihan resi, & koordinasi penjemputan IQBAL.',
          };
        } else {
          return {
            ...ag,
            statusVerifikasi: 'Lolos Dokumen' as const,
            statusPendekatan: 'Menunggu Otorisasi' as const,
            tindakLanjut: 'Dokumen lolos. Menunggu keputusan persetujuan akhir Pemilik.',
          };
        }
      }
      return ag;
    });

    onUpdateAgents(updated);
    if (selectedAgent && selectedAgent.id === agentId) {
      setSelectedAgent(updated.find((a) => a.id === agentId) || null);
    }
    showToast(`Status agen ${agentId} berhasil diperbarui!`);
    setShowVerificationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#FF6B1A] text-white font-semibold rounded-xl shadow-2xl flex items-center gap-2 border border-orange-400/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner - Divisi Keagenan (SASA) */}
      <div className="bg-gradient-to-r from-[#170a24] via-[#230f35] to-[#12081c] p-6 rounded-2xl border border-pink-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold uppercase rounded-lg tracking-wider">
                DIVISI KEAGENAN · SASA
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-mono rounded">
                Tab: KEAGENAN (21 Kolom)
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded">
                Google Sheets Linked
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Pusat Data &amp; Jaringan Keagenan TORO Logistic
            </h1>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Dikelola oleh <strong className="text-pink-400">SASA (Kepala Divisi Keagenan)</strong> bekerja sama dengan 
              <strong className="text-amber-400"> IQBAL</strong> (uji operasional kargo) dan 
              <strong className="text-emerald-400"> FIQA</strong> (audit komisi &amp; margin). 
              Komitmen pembukaan titik dan komisi khusus wajib mendapat otorisasi pemilik.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopySheetsSchema}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-colors shadow-sm"
              title="Salin 21 nama kolom sesuai standar Google Sheets"
            >
              <Copy className="w-4 h-4 text-pink-400" />
              <span>Salin 21 Kolom</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-colors shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Ekspor CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-pink-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Rekrut Calon Agen Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-[#0b1033] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Database Agen</span>
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalAgents}</div>
          <div className="text-[11px] text-slate-400 mt-1">Calon &amp; Mitra Terdata</div>
        </div>

        <div className="bg-[#0b1033] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Agen Aktif Beroperasi</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{activeAgents}</div>
          <div className="text-[11px] text-emerald-500/80 mt-1">Lolos SOP &amp; Izin Pemilik</div>
        </div>

        <div className="bg-[#0b1033] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Menunggu Persetujuan</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingApprovals}</div>
          <div className="text-[11px] text-amber-500/80 mt-1">Otorisasi Pemilik (Panel 5)</div>
        </div>

        <div className="bg-[#0b1033] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Volume Kirim Agen</span>
            <Truck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalShipmentsByAgents} <span className="text-xs font-normal text-slate-400">resi</span></div>
          <div className="text-[11px] text-slate-400 mt-1">Tersinkron ID Pengiriman</div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-[#0b1033] p-4 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Komisi Terutang</span>
            <DollarSign className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-xl font-black text-pink-400">{formatRupiah(totalAccruedCommission)}</div>
          <div className="text-[11px] text-slate-400 mt-1">Diverifikasi Keuangan FIQA</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0b1033] p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ID Agen (AGN-0001), nama usaha, kota/wilayah, atau rute..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-pink-500"
          >
            <option value="all">Semua Status Pendekatan</option>
            <option value="Pemetaan">Pemetaan (AVAN & SASA)</option>
            <option value="Pendekatan">Pendekatan</option>
            <option value="Verifikasi">Verifikasi Dokumen & Operasional</option>
            <option value="Menunggu Otorisasi">Menunggu Otorisasi Pemilik</option>
            <option value="Aktif">Aktif Beroperasi</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>
      </div>

      {/* Main 21-Column Table Container */}
      <div className="bg-[#070b28] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Data Tabel Google Sheets KEAGENAN (21 Kolom)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ({filteredAgents.length} dari {agents.length} agen)
            </span>
          </div>
          <div className="text-xs text-slate-400 hidden sm:block">
            Scroll horizontal untuk melihat seluruh 21 kolom
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0b1033] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                <th className="py-3 px-4 sticky left-0 bg-[#0b1033] z-20 shadow-md">ID Agen</th>
                <th className="py-3 px-4 sticky left-24 bg-[#0b1033] z-20 shadow-md">Nama Usaha &amp; Pemilik</th>
                <th className="py-3 px-4">Tgl Masuk</th>
                <th className="py-3 px-4">Wilayah</th>
                <th className="py-3 px-4">Kontak Bisnis</th>
                <th className="py-3 px-4">Rute Layanan</th>
                <th className="py-3 px-4">Kapasitas</th>
                <th className="py-3 px-4">Status Pendekatan</th>
                <th className="py-3 px-4">Status Verifikasi</th>
                <th className="py-3 px-4">Dokumen</th>
                <th className="py-3 px-4">Usulan Komisi</th>
                <th className="py-3 px-4">Status Persetujuan</th>
                <th className="py-3 px-4">Tgl Aktivasi</th>
                <th className="py-3 px-4 text-center">Jml Kirim</th>
                <th className="py-3 px-4 text-right">Biaya (Rp)</th>
                <th className="py-3 px-4 text-right">Komisi Terutang</th>
                <th className="py-3 px-4">Keluhan</th>
                <th className="py-3 px-4">PIC</th>
                <th className="py-3 px-4">Tindak Lanjut</th>
                <th className="py-3 px-4">Tgl Evaluasi</th>
                <th className="py-3 px-4">Catatan</th>
                <th className="py-3 px-4 sticky right-0 bg-[#0b1033] z-20 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredAgents.map((ag) => {
                const isApproved = ag.statusPersetujuan === 'Disetujui Pemilik';
                const isPendingApproval = ag.statusPersetujuan === 'Menunggu Persetujuan Pemilik';

                return (
                  <tr
                    key={ag.id}
                    className="hover:bg-slate-800/40 transition-colors whitespace-nowrap text-slate-200"
                  >
                    {/* Col 1: ID Agen (Sticky) */}
                    <td className="py-3.5 px-4 sticky left-0 bg-[#070b28] z-10 font-mono font-bold text-pink-400 shadow-sm">
                      {ag.id}
                    </td>

                    {/* Col 3 & 4: Nama Usaha & Agen (Sticky) */}
                    <td className="py-3.5 px-4 sticky left-24 bg-[#070b28] z-10 shadow-sm">
                      <div className="font-bold text-white max-w-[200px] truncate" title={ag.namaUsaha}>
                        {ag.namaUsaha}
                      </div>
                      <div className="text-[11px] text-slate-400">{ag.namaAgen}</div>
                    </td>

                    {/* Col 2: Tanggal Masuk */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{ag.tanggalMasuk}</td>

                    {/* Col 5: Wilayah */}
                    <td className="py-3.5 px-4 max-w-[180px] truncate" title={ag.wilayah}>
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span className="truncate">{ag.wilayah}</span>
                      </span>
                    </td>

                    {/* Col 6: Kontak Bisnis */}
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        {ag.kontakBisnis}
                      </span>
                    </td>

                    {/* Col 7: Rute Layanan */}
                    <td className="py-3.5 px-4 max-w-[180px] truncate text-slate-300" title={ag.ruteLayanan}>
                      {ag.ruteLayanan}
                    </td>

                    {/* Col 8: Kapasitas */}
                    <td className="py-3.5 px-4 max-w-[180px] truncate text-slate-400" title={ag.kapasitas}>
                      {ag.kapasitas}
                    </td>

                    {/* Col 9: Status Pendekatan */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          ag.statusPendekatan === 'Aktif'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : ag.statusPendekatan === 'Menunggu Otorisasi'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : ag.statusPendekatan === 'Verifikasi'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : 'bg-slate-700/50 text-slate-300 border-slate-600'
                        }`}
                      >
                        {ag.statusPendekatan}
                      </span>
                    </td>

                    {/* Col 10: Status Verifikasi */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          ag.statusVerifikasi === 'Terverifikasi Sah'
                            ? 'text-emerald-400 bg-emerald-950/40'
                            : ag.statusVerifikasi === 'Lolos Dokumen'
                            ? 'text-blue-400 bg-blue-950/40'
                            : 'text-amber-400 bg-amber-950/40'
                        }`}
                      >
                        <FileCheck className="w-3 h-3" />
                        {ag.statusVerifikasi}
                      </span>
                    </td>

                    {/* Col 11: Dokumen */}
                    <td className="py-3.5 px-4">
                      <div className="flex gap-1 flex-wrap max-w-[150px]">
                        {ag.dokumen.map((doc, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300 font-mono"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Col 12: Usulan Komisi */}
                    <td className="py-3.5 px-4 font-semibold text-pink-300">
                      {ag.usulanKomisi}
                    </td>

                    {/* Col 13: Status Persetujuan */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                          isApproved
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : isPendingApproval
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}
                      >
                        {isApproved ? (
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                        )}
                        {ag.statusPersetujuan}
                      </span>
                    </td>

                    {/* Col 14: Tanggal Aktivasi */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {ag.tanggalAktivasi}
                    </td>

                    {/* Col 15: Jumlah Pengiriman */}
                    <td className="py-3.5 px-4 text-center font-bold text-white">
                      {ag.jumlahPengiriman > 0 ? (
                        <span className="px-2 py-0.5 bg-blue-900/40 text-blue-300 rounded font-mono">
                          {ag.jumlahPengiriman}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>

                    {/* Col 16: Biaya */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {ag.biaya > 0 ? formatRupiah(ag.biaya) : '—'}
                    </td>

                    {/* Col 17: Komisi Terutang */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-pink-400">
                      {ag.komisiTerutang > 0 ? formatRupiah(ag.komisiTerutang) : '—'}
                    </td>

                    {/* Col 18: Keluhan */}
                    <td className="py-3.5 px-4 text-slate-400">
                      {ag.keluhan === 'Nihil' ? (
                        <span className="text-emerald-400">Nihil</span>
                      ) : (
                        <span className="text-amber-400 font-medium">{ag.keluhan}</span>
                      )}
                    </td>

                    {/* Col 19: PIC */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        {ag.pic}
                      </span>
                    </td>

                    {/* Col 20: Tindak Lanjut */}
                    <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-300" title={ag.tindakLanjut}>
                      {ag.tindakLanjut}
                    </td>

                    {/* Col 21: Tanggal Evaluasi */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {ag.tanggalEvaluasi}
                    </td>

                    {/* Col 22: Catatan */}
                    <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-400" title={ag.catatan}>
                      {ag.catatan}
                    </td>

                    {/* Actions (Sticky) */}
                    <td className="py-3.5 px-4 sticky right-0 bg-[#070b28] z-10 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedAgent(ag)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                          title="Lihat Detail 21 Kolom"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {isPendingApproval && (
                          <button
                            type="button"
                            onClick={() => handleEscalateToOwner(ag)}
                            className="px-2 py-1 bg-[#FF6B1A]/20 hover:bg-[#FF6B1A]/30 border border-[#FF6B1A]/40 text-[#FF6B1A] rounded-lg text-[10px] font-bold"
                            title="Eskalasi ke Pemilik (Panel 5)"
                          >
                            Otorisasi
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal for Selected Agent */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0b1033] border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
            <div className="px-6 py-4 bg-[#12081c] border-b border-pink-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center font-black">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-white">{selectedAgent.namaUsaha}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300">
                      {selectedAgent.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Pemilik: {selectedAgent.namaAgen} · Wilayah: {selectedAgent.wilayah}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAgent(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              {/* Row 1: Status Banner */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-slate-400 text-[11px]">Status Otorisasi Pemilik</div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5 mt-0.5">
                    {selectedAgent.statusPersetujuan === 'Disetujui Pemilik' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                    <span>{selectedAgent.statusPersetujuan}</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Verifikasi Berkas</div>
                  <div className="font-bold text-sm text-blue-400 mt-0.5">
                    {selectedAgent.statusVerifikasi}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">PIC Penanggung Jawab</div>
                  <div className="font-extrabold text-sm text-pink-400 mt-0.5">
                    {selectedAgent.pic} (Divisi Keagenan)
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Usulan Komisi</div>
                  <div className="font-bold text-sm text-white mt-0.5">
                    {selectedAgent.usulanKomisi}
                  </div>
                </div>
              </div>

              {/* 21 Columns Detailed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">
                    Profil Usaha &amp; Operasional
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Rute Layanan:</span>
                    <span className="col-span-2 text-white font-medium">{selectedAgent.ruteLayanan}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Kapasitas Tempat:</span>
                    <span className="col-span-2 text-slate-300">{selectedAgent.kapasitas}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Kontak Bisnis:</span>
                    <span className="col-span-2 text-emerald-400 font-mono font-bold">
                      {selectedAgent.kontakBisnis}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Dokumen Sah:</span>
                    <span className="col-span-2 flex flex-wrap gap-1">
                      {selectedAgent.dokumen.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800 rounded text-slate-200 font-mono">
                          {d}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Tgl Masuk:</span>
                    <span className="col-span-2 text-slate-300 font-mono">{selectedAgent.tanggalMasuk}</span>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2">
                    Keuangan &amp; Akun Transaksi
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Tgl Aktivasi:</span>
                    <span className="col-span-2 text-slate-300 font-mono">{selectedAgent.tanggalAktivasi}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Jumlah Kirim:</span>
                    <span className="col-span-2 text-white font-bold">
                      {selectedAgent.jumlahPengiriman} Pengiriman
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Total Biaya:</span>
                    <span className="col-span-2 font-mono text-slate-300">
                      {selectedAgent.biaya > 0 ? formatRupiah(selectedAgent.biaya) : '—'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Komisi Terutang:</span>
                    <span className="col-span-2 font-mono font-bold text-pink-400">
                      {selectedAgent.komisiTerutang > 0 ? formatRupiah(selectedAgent.komisiTerutang) : '—'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400">Keluhan:</span>
                    <span className="col-span-2 text-slate-300">{selectedAgent.keluhan}</span>
                  </div>
                </div>
              </div>

              {/* Action Plan & Evaluation */}
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">Tindak Lanjut &amp; Catatan Koordinasi</div>
                <div className="text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <strong>Tindak Lanjut:</strong> {selectedAgent.tindakLanjut}
                </div>
                <div className="text-slate-400 text-[11px]">
                  <strong>Catatan SASA:</strong> {selectedAgent.catatan}
                </div>
                <div className="text-slate-500 text-[11px] font-mono">
                  Tanggal Evaluasi Kinerja Berikutnya: {selectedAgent.tanggalEvaluasi}
                </div>
              </div>

              {/* Resi Terkait */}
              {selectedAgent.relatedOrderIds && selectedAgent.relatedOrderIds.length > 0 && (
                <div className="p-4 bg-blue-950/30 rounded-xl border border-blue-500/20">
                  <div className="font-bold text-blue-300 mb-2 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>ID Pengiriman Terkait (Tersambung ke Resi):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.relatedOrderIds.map((orderId) => (
                      <span
                        key={orderId}
                        className="px-2.5 py-1 bg-blue-900/50 text-blue-200 rounded font-mono font-semibold"
                      >
                        {orderId}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedAgent.statusPersetujuan === 'Menunggu Persetujuan Pemilik' && (
                  <button
                    type="button"
                    onClick={() => handleEscalateToOwner(selectedAgent)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#FF6B1A] hover:bg-orange-600 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Eskalasi ke Otorisasi Pemilik</span>
                  </button>
                )}

                {selectedAgent.statusVerifikasi !== 'Terverifikasi Sah' && (
                  <button
                    type="button"
                    onClick={() => handleVerifyAgent(selectedAgent.id, false)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Tandai Lolos Dokumen (IQBAL/FIQA)</span>
                  </button>
                )}

                {selectedAgent.statusPersetujuan === 'Disetujui Pemilik' &&
                  selectedAgent.statusPendekatan !== 'Aktif' && (
                    <button
                      type="button"
                      onClick={() => handleVerifyAgent(selectedAgent.id, true)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aktifkan Agen (Lolos Pemilik)</span>
                    </button>
                  )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Rekrut Calon Agen Baru (21 Columns) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0b1033] border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-6">
            <div className="px-6 py-4 bg-[#170a24] border-b border-pink-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    Rekrut Calon Agen Baru (Tab KEAGENAN)
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Format lengkap terhubung ke Google Sheets (21 Kolom)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nama Usaha / Gerai <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.namaUsaha || ''}
                    onChange={(e) => setFormData({ ...formData, namaUsaha: e.target.value })}
                    placeholder="Contoh: Toko Berkah Mandiri / Fotocopy Jaya"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Nama Pemilik / Penanggung Jawab <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.namaAgen || ''}
                    onChange={(e) => setFormData({ ...formData, namaAgen: e.target.value })}
                    placeholder="Contoh: Bpk. Bambang Pamungkas"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Wilayah / Kota / Koridor <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.wilayah || ''}
                    onChange={(e) => setFormData({ ...formData, wilayah: e.target.value })}
                    placeholder="Contoh: Subang Kota, Jawa Barat"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Kontak Bisnis (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={formData.kontakBisnis || ''}
                    onChange={(e) => setFormData({ ...formData, kontakBisnis: e.target.value })}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Rute Layanan Kargo
                  </label>
                  <input
                    type="text"
                    value={formData.ruteLayanan || ''}
                    onChange={(e) => setFormData({ ...formData, ruteLayanan: e.target.value })}
                    placeholder="Contoh: Dari wilayah ke seluruh Indonesia via Hub"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Kapasitas Tempat / Armada
                  </label>
                  <input
                    type="text"
                    value={formData.kapasitas || ''}
                    onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                    placeholder="Contoh: Ruko 2 lantai, timbangan 300kg, parkir pickup"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Usulan Skema Komisi
                  </label>
                  <input
                    type="text"
                    value={formData.usulanKomisi || ''}
                    onChange={(e) => setFormData({ ...formData, usulanKomisi: e.target.value })}
                    placeholder="Contoh: 15% dari omset kirim atau Rp500/kg"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    Akan diaudit oleh FIQA (wajib margin minimal Rp2.000/kg)
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    PIC Penanggung Jawab
                  </label>
                  <select
                    value={formData.pic || 'SASA'}
                    onChange={(e) => setFormData({ ...formData, pic: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="SASA">SASA — Kepala Divisi Keagenan</option>
                    <option value="IQBAL">IQBAL — Kesiapan Operasional</option>
                    <option value="FIQA">FIQA — Keuangan & Komisi</option>
                    <option value="AVAN">AVAN — Pemetaan Peluang</option>
                    <option value="PAUL">PAUL — Direktur Utama</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Rencana Tindak Lanjut
                </label>
                <textarea
                  rows={2}
                  value={formData.tindakLanjut || ''}
                  onChange={(e) => setFormData({ ...formData, tindakLanjut: e.target.value })}
                  placeholder="Langkah berikutnya yang harus dikerjakan tim..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="p-3 bg-pink-950/30 border border-pink-500/20 rounded-xl text-[11px] text-pink-200 leading-relaxed">
                <strong className="text-pink-300">Prinsip Integritas Keagenan:</strong> Calon agen tidak boleh dianggap aktif sebelum izin resmi pemilik diberikan. Penyimpanan data langsung memperbarui basis data lokal dan siap diekspor ke Google Sheets Tab KEAGENAN.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-bold shadow-lg shadow-pink-600/30"
                >
                  Simpan ke Tab KEAGENAN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
