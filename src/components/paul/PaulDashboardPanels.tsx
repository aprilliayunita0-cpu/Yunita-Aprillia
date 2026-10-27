import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Truck,
  DollarSign,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  FileCheck,
  FileWarning,
  Eye,
  MessageSquare,
  ArrowRight,
  Filter,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Calendar,
  Send,
  Users2,
  Store,
} from 'lucide-react';
import {
  OwnerApprovalRequest,
  PaulLead,
  PaulShipment,
  PaulFinancialTransaction,
  PaulComplaint,
  PaulCarrierPartner,
} from '../../data/paulSopData';
import { formatRupiah } from '../../utils/toroCalculators';

interface PaulDashboardPanelsProps {
  approvals: OwnerApprovalRequest[];
  onUpdateApprovals: (updated: OwnerApprovalRequest[]) => void;
  leads: PaulLead[];
  onUpdateLeads: (updated: PaulLead[]) => void;
  shipments: PaulShipment[];
  onUpdateShipments: (updated: PaulShipment[]) => void;
  transactions: PaulFinancialTransaction[];
  onUpdateTransactions: (updated: PaulFinancialTransaction[]) => void;
  complaints: PaulComplaint[];
  onUpdateComplaints: (updated: PaulComplaint[]) => void;
  partners: PaulCarrierPartner[];
  onNavigateToTab: (tabId: string) => void;
}

export const PaulDashboardPanels: React.FC<PaulDashboardPanelsProps> = ({
  approvals,
  onUpdateApprovals,
  leads,
  onUpdateLeads,
  shipments,
  onUpdateShipments,
  transactions,
  onUpdateTransactions,
  complaints,
  onUpdateComplaints,
  partners,
  onNavigateToTab,
}) => {
  // Toggle for Blueprint vs Live Mode
  const [showBlueprintView, setShowBlueprintView] = useState<boolean>(false);

  // Modal / action state for Owner Approvals
  const [selectedApproval, setSelectedApproval] = useState<OwnerApprovalRequest | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [approvalFeedback, setApprovalFeedback] = useState<string | null>(null);

  // Quick Action Modals
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState<Partial<PaulLead>>({
    companyName: '',
    contactPerson: '',
    phone: '',
    businessType: 'Distributor',
    cargoNeeds: '',
    routeInterest: '',
    estimatedVolume: '',
    priority: 'Tinggi',
  });

  // PoD Verification Modal
  const [verifyingShipment, setVerifyingShipment] = useState<PaulShipment | null>(null);
  const [podNote, setPodNote] = useState('');

  // 1. CALCULATE PANEL 1 METRICS (Ringkasan Hari Ini)
  const pendingApprovals = approvals.filter((a) => a.status === 'menunggu');
  const leadsNeedContact = leads.filter(
    (l) => l.status === 'belum merespons' || l.status === 'perlu tindak lanjut'
  );
  const quotesNeedFollowUp = leads.filter((l) => l.status === 'penawaran terkirim');
  const activeShipments = shipments.filter(
    (s) => s.status !== 'Selesai'
  );
  const completedShipmentsWithPoD = shipments.filter(
    (s) => s.status === 'Selesai' && s.hasProofOfDelivery
  );
  const completedShipmentsNoPoD = shipments.filter(
    (s) => s.status === 'Tiba di Kota Tujuan' && !s.hasProofOfDelivery
  );
  const delayedShipments = shipments.filter((s) => s.isDelayed);
  const overdueReceivables = transactions.filter(
    (t) => t.type === 'Pendapatan' && t.paymentStatus === 'Belum Dibayar (Piutang)'
  );

  // 2. CALCULATE PANEL 2 METRICS (Penjualan)
  const totalLeads = leads.length;
  const contactedLeads = leads.filter((l) => l.status !== 'belum merespons').length;
  const quotesSentCount = leads.filter(
    (l) => l.status === 'penawaran terkirim' || l.status === 'menang'
  ).length;
  const wonCustomers = leads.filter((l) => l.status === 'menang').length;
  const conversionRate = quotesSentCount > 0 ? ((wonCustomers / quotesSentCount) * 100).toFixed(1) : '0';
  const confirmedOrderValue = shipments.reduce((sum, s) => sum + s.sellingPriceTotal, 0);

  // 3. CALCULATE PANEL 3 METRICS (Operasional)
  const openComplaints = complaints.filter((c) => c.status !== 'Selesai');

  // 4. CALCULATE PANEL 4 METRICS (Keuangan)
  const totalRecordedRevenue = transactions
    .filter((t) => t.type === 'Pendapatan')
    .reduce((sum, t) => sum + t.amount, 0);
  const cashIn = transactions
    .filter((t) => t.type === 'Kas Masuk' && t.hasDocumentProof)
    .reduce((sum, t) => sum + t.amount, 0);
  const cashOut = transactions
    .filter((t) => (t.type === 'Kas Keluar' || (t.type === 'Biaya Mitra' && t.paymentStatus === 'Lunas') || (t.type === 'Biaya Operasional' && t.paymentStatus === 'Lunas')) && t.hasDocumentProof)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPartnerCost = shipments.reduce((sum, s) => sum + s.partnerCostTotal, 0);
  const totalGrossMargin = shipments.reduce((sum, s) => sum + s.grossMargin, 0);
  const totalReceivables = transactions
    .filter((t) => t.paymentStatus === 'Belum Dibayar (Piutang)')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPayables = transactions
    .filter((t) => t.paymentStatus === 'Utang Mitra')
    .reduce((sum, t) => sum + t.amount, 0);
  const unreconciledTx = transactions.filter((t) => !t.isReconciled || !t.hasDocumentProof);

  // OWNER APPROVAL HANDLER (Section D & Panel 5)
  const handleDecision = (
    newStatus: 'disetujui' | 'ditolak' | 'perlu revisi'
  ) => {
    if (!selectedApproval) return;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

    const updated = approvals.map((a) => {
      if (a.id === selectedApproval.id) {
        return {
          ...a,
          status: newStatus,
          ownerDecisionNotes: decisionNotes || (newStatus === 'disetujui' ? 'Disetujui oleh Pemilik TORO Logistic.' : 'Ditolak/Direvisi sesuai instruksi Pemilik.'),
          decisionDate: formattedDate,
        };
      }
      return a;
    });

    onUpdateApprovals(updated);
    setApprovalFeedback(`Keputusan berhasil disimpan: Permintaan ${selectedApproval.requestNumber} status '${newStatus.toUpperCase()}'.`);
    setTimeout(() => {
      setSelectedApproval(null);
      setDecisionNotes('');
      setApprovalFeedback(null);
    }, 1500);
  };

  // ADD LEAD HANDLER
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.companyName || !newLeadForm.phone) return;

    const newLead: PaulLead = {
      id: `lead-${Date.now()}`,
      companyName: newLeadForm.companyName,
      contactPerson: newLeadForm.contactPerson || '-',
      phone: newLeadForm.phone,
      businessType: (newLeadForm.businessType as any) || 'Distributor',
      cargoNeeds: newLeadForm.cargoNeeds || 'Kebutuhan kargo reguler',
      routeInterest: newLeadForm.routeInterest || 'Jakarta ke Luar Kota',
      estimatedVolume: newLeadForm.estimatedVolume || '1–2 Ton',
      status: 'belum merespons',
      priority: (newLeadForm.priority as any) || 'Tinggi',
      lastContact: 'Hari Ini',
      nextFollowUpDate: 'Besok',
      notes: 'Ditambahkan via Dashboard PAUL untuk kontak prospek.',
    };

    onUpdateLeads([newLead, ...leads]);
    setShowAddLeadModal(false);
    setNewLeadForm({
      companyName: '',
      contactPerson: '',
      phone: '',
      businessType: 'Distributor',
      cargoNeeds: '',
      routeInterest: '',
      estimatedVolume: '',
      priority: 'Tinggi',
    });
  };

  // VERIFY POD HANDLER (Strict SOP: PAUL tidak boleh menyatakan selesai sebelum PoD diverifikasi)
  const handleVerifyPoD = (shipmentId: string) => {
    const updated = shipments.map((s) => {
      if (s.id === shipmentId) {
        return {
          ...s,
          status: 'Selesai' as const,
          hasProofOfDelivery: true,
          podDocumentUrl: `POD-${s.orderNumber}.jpg`,
          podVerifiedAt: `${new Date().toLocaleDateString('id-ID')}, ${new Date().toLocaleTimeString('id-ID')} WIB (Diverifikasi PAUL)`,
        };
      }
      return s;
    });
    onUpdateShipments(updated);
    setVerifyingShipment(null);
    setPodNote('');
  };

  return (
    <div className="space-y-8">
      {/* ========================================================
          BANNER: PAUL CONTROL CENTER · RANCANGAN TAMPILAN SEDERHANA
          (Menunggu Integrasi & Prinsip Integritas Data Anti-Halusinasi)
          ======================================================== */}
      <div className="bg-[#070b28] border-2 border-blue-500/40 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#FF6B1A] uppercase tracking-wider">
                PAUL Control Center
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-300 font-semibold">TORO Logistic · Tampilan rancangan</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Menunggu integrasi
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Rancangan dashboard eksekutif sederhana sebelum integrasi API &amp; CRM operasional terhubung penuh.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowBlueprintView(!showBlueprintView)}
              className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              {showBlueprintView ? 'Tutup Tampilan Rancangan' : 'Buka Rancangan 4 Kartu (Tanda “—”)'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab('roadmap')}
              className="px-3.5 py-1.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1"
            >
              <span>Roadmap 6 Langkah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* The 4 Blueprint Cards (Tanda “—”) */}
        {showBlueprintView && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Card 1 */}
              <div className="bg-[#0b1033] border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Prospek hari ini
                </div>
                <div className="text-4xl font-black text-white my-2.5 font-mono">
                  —
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 py-1 px-2 rounded border border-slate-800">
                  Menunggu data CRM
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0b1033] border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Pengiriman aktif
                </div>
                <div className="text-4xl font-black text-[#FF6B1A] my-2.5 font-mono">
                  —
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 py-1 px-2 rounded border border-slate-800">
                  Menunggu data operasional
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0b1033] border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Margin kotor
                </div>
                <div className="text-4xl font-black text-emerald-400 my-2.5 font-mono">
                  —
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 py-1 px-2 rounded border border-slate-800">
                  Belum dihitung dari transaksi
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#0b1033] border border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Persetujuan pemilik
                </div>
                <div className="text-4xl font-black text-amber-400 my-2.5 font-mono">
                  —
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900 py-1 px-2 rounded border border-slate-800">
                  Belum terhubung ke alur persetujuan
                </div>
              </div>
            </div>

            {/* Crucial Note from Prompt */}
            <div className="p-3 bg-amber-950/20 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-center justify-between">
              <div>
                <strong className="text-amber-300">Prinsip Integritas PAUL: </strong>
                <span>Tanda “—” berarti belum ada data yang terhubung, bukan berarti nilainya nol. PAUL tidak mengisi angka dengan perkiraan seolah-olah fakta.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          INTEGRATED SIX-DIVISION AI MANAGEMENT BANNER
          ======================================================== */}
      <div className="bg-gradient-to-r from-[#0b1033] via-[#151c4a] to-[#0b1033] p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B1A] to-pink-600 flex items-center justify-center text-white shadow-md">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-sm">
                TORO LOGISTIC — INTEGRATED SIX-DIVISION AI MANAGEMENT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                PAUL · ENIS · IQBAL · FIQA · AVAN · SASA
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              6 kepala divisi AI berkoordinasi dalam satu sistem terpadu: Prospek CRM, Operasional Kargo, Kas Riil, Riset Pasar, dan Tab KEAGENAN (21 Kolom Google Sheets).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateToTab('keagenan')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            <Store className="w-4 h-4 text-pink-400" />
            <span>Tab KEAGENAN (SASA)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab('six-divisions')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-all"
          >
            <Users2 className="w-4 h-4 text-[#FF6B1A]" />
            <span>Ruang Koordinasi 6 AI</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          PANEL 1: RINGKASAN HARI INI (SOP Bagian F - Panel 1)
          ======================================================== */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                PANEL 1 · RINGKASAN HARI INI
              </span>
              <span className="text-xs text-slate-400">Pusat Kendali Eksekutif PAUL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Status Operasional &amp; Keputusan Terkini
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {pendingApprovals.length > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-950/70 border border-red-500/50 text-red-300 text-xs font-bold rounded-lg animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                {pendingApprovals.length} Butuh Persetujuan Pemilik
              </span>
            )}
            <button
              type="button"
              onClick={() => onNavigateToTab('schedule')}
              className="text-xs text-[#FF6B1A] hover:underline font-semibold flex items-center gap-1"
            >
              Lihat Siklus Kerja PAUL <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
          {/* 1. Prospek Perlu Dihubungi */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Prospek Perlu Dihubungi</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{leadsNeedContact.length}</div>
            <div className="text-[11px] text-blue-400/90 mt-1 flex items-center gap-1">
              <span>Target: ~10 kontak / hari kerja</span>
            </div>
          </div>

          {/* 2. Penawaran Perlu Ditindaklanjuti */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Follow-Up Penawaran</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{quotesNeedFollowUp.length}</div>
            <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1">
              <span>Target: 8–12 penawaran / minggu</span>
            </div>
          </div>

          {/* 3. Pengiriman Aktif & Selesai */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Pengiriman Berjalan</span>
              <Truck className="w-4 h-4 text-[#FF6B1A]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{activeShipments.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">
              {completedShipmentsWithPoD.length} selesai dgn PoD sah
            </div>
          </div>

          {/* 4. Butuh Otorisasi Pemilik */}
          <div
            onClick={() => {
              const el = document.getElementById('panel-approval');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`border rounded-xl p-4 transition-all cursor-pointer ${
              pendingApprovals.length > 0
                ? 'bg-red-950/30 border-red-500/40 hover:border-red-400 shadow-lg shadow-red-950/20'
                : 'bg-[#0b1033] border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium text-red-300">Menunggu Persetujuan</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-red-400">
              {pendingApprovals.length}
            </div>
            <div className="text-[11px] text-red-300/80 mt-1 flex items-center gap-1">
              <span>Klik untuk respon otorisasi</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* 5. Pengiriman Terlambat / Kendala */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Keterlambatan / Kendala</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{delayedShipments.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">
              {delayedShipments.length === 0 ? 'Semua pengiriman tepat jadwal' : 'Pantau mitigasi rute'}
            </div>
          </div>

          {/* 6. Menunggu Verifikasi PoD */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Tiba Menunggu PoD</span>
              <FileWarning className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-yellow-300">
              {completedShipmentsNoPoD.length}
            </div>
            <div className="text-[11px] text-yellow-400/80 mt-1">
              Wajib ada bukti sebelum di-ACC
            </div>
          </div>

          {/* 7. Tagihan Jatuh Tempo (Piutang) */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Piutang Pelanggan</span>
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatRupiah(totalReceivables)}
            </div>
            <div className="text-[11px] text-purple-300/80 mt-1">
              {overdueReceivables.length} invoice aktif
            </div>
          </div>

          {/* 8. Kas Masuk Terverifikasi */}
          <div className="bg-[#0b1033] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Kas Masuk Riil</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {formatRupiah(cashIn)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Berdasarkan bukti transfer sah
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PANEL 5: PERSETUJUAN PEMILIK (OWNER APPROVAL INBOX - Bagian F & D)
          ======================================================== */}
      <div id="panel-approval" className="bg-[#080d2c] border-2 border-red-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                PANEL 5 · KENDALI OTORISASI PEMILIK
              </span>
              <span className="text-xs text-slate-400">Kewenangan Mutlak Pemilik TORO Logistic</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Daftar Permintaan Otorisasi &amp; Keputusan Strategis
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              SOP Batas Wewenang PAUL: PAUL dilarang mengeksekusi pengeluaran, diskon bawah margin, tempo kredit, kontrak besar, atau klaim tanpa persetujuan tertulis Pemilik.
            </p>
          </div>
        </div>

        {approvalFeedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {approvalFeedback}
          </div>
        )}

        <div className="mt-4 space-y-3">
          {approvals.map((req) => (
            <div
              key={req.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                req.status === 'menunggu'
                  ? 'bg-[#0e1642] border-amber-500/50 shadow-md shadow-amber-950/20'
                  : req.status === 'disetujui'
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      req.status === 'menunggu'
                        ? 'bg-amber-500/20 text-amber-400'
                        : req.status === 'disetujui'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#FF6B1A]">
                        {req.requestNumber}
                      </span>
                      <span className="text-xs text-slate-500">·</span>
                      <span className="text-xs text-slate-400">{req.requestDate}</span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          req.status === 'menunggu'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : req.status === 'disetujui'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white mt-1">
                      {req.decisionType}
                      {req.monetaryValue && (
                        <span className="ml-2 text-emerald-400 font-mono">
                          ({formatRupiah(req.monetaryValue)})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 max-w-3xl">
                      <strong className="text-slate-200">Alasan:</strong> {req.reason}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      <strong className="text-slate-300">Manfaat:</strong> {req.benefit}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-slate-400">
                      <div>
                        <span className="text-amber-400">Risiko jika disetujui:</span> {req.riskIfApproved}
                      </div>
                      <div>
                        <span className="text-red-400">Risiko jika ditolak:</span> {req.riskIfRejected}
                      </div>
                    </div>
                    {req.supportingDocuments.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-[11px] text-slate-500">Dokumen pendukung:</span>
                        {req.supportingDocuments.map((doc, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-800 text-[11px] text-slate-300 rounded border border-slate-700"
                          >
                            📎 {doc}
                          </span>
                        ))}
                      </div>
                    )}
                    {req.ownerDecisionNotes && (
                      <div className="mt-2.5 p-2.5 bg-slate-800/80 rounded-lg text-xs border border-slate-700">
                        <span className="text-slate-400 font-semibold">Keputusan Pemilik: </span>
                        <span className="text-white italic">"{req.ownerDecisionNotes}"</span>
                        {req.decisionDate && (
                          <span className="block text-[10px] text-slate-500 mt-0.5">
                            Waktu pengesahan: {req.decisionDate}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Owner Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0">
                  {req.status === 'menunggu' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedApproval(req)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Beri Otorisasi</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedApproval(req)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Ubah / Tinjau
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          PANEL 2 & 3: PENJUALAN & OPERASIONAL (SOP Bagian F - Panel 2 & 3)
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PANEL 2: PENJUALAN & PROSPEK */}
        <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  PANEL 2 · PENJUALAN
                </span>
                <span className="text-xs text-slate-400">CRM &amp; Pipeline Kargo</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                Kinerja Penjualan &amp; Prospek
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddLeadModal(true)}
              className="px-3 py-1.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Prospek</span>
            </button>
          </div>

          {/* Sales KPI Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-800 text-center">
            <div>
              <div className="text-[11px] text-slate-400">Penawaran Terkirim</div>
              <div className="text-lg font-black text-white">{quotesSentCount}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Rasio Menang (Win)</div>
              <div className="text-lg font-black text-emerald-400">{conversionRate}%</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Order Terkonfirmasi</div>
              <div className="text-sm font-black text-[#FF6B1A] truncate">
                {formatRupiah(confirmedOrderValue)}
              </div>
            </div>
          </div>

          {/* Lead List Mini */}
          <div className="mt-3 space-y-2 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-sm text-white">{lead.companyName}</div>
                    <div className="text-xs text-slate-400">
                      PIC: {lead.contactPerson} ({lead.phone})
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      📦 {lead.cargoNeeds} · <span className="text-[#FF6B1A]">{lead.routeInterest}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      lead.status === 'menang'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : lead.status === 'penawaran terkirim'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : lead.status === 'perlu tindak lanjut'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Kontak: {lead.lastContact}</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/62${lead.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                        `Halo Bpk/Ibu ${lead.contactPerson} dari ${lead.companyName}, salam hangat dari PAUL - AI Direktur Utama TORO Transportasi & Logistic. Menindaklanjuti kebutuhan pengiriman kargo ${lead.routeInterest}, kami siap memberikan penawaran tarif kompetitif dengan jaminan armada aman dan tepat waktu. Apakah ada waktu luang untuk kami kirimkan rincian lengkapnya hari ini?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 rounded flex items-center gap-1 font-semibold"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WA Prospek</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => onNavigateToTab('procedures')}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              Buka Prosedur Penjualan &amp; Template Lengkap →
            </button>
          </div>
        </div>

        {/* PANEL 3: OPERASIONAL KARGO & PoD */}
        <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                  PANEL 3 · OPERASIONAL
                </span>
                <span className="text-xs text-slate-400">Pemantauan &amp; Proof of Delivery</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                Pengiriman &amp; Validasi Serah Terima
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('procedures')}
              className="text-xs text-[#FF6B1A] hover:underline font-semibold"
            >
              Prosedur Kargo →
            </button>
          </div>

          {/* Operational Metrics */}
          <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-800 text-center">
            <div>
              <div className="text-[11px] text-slate-400">Pengiriman Aktif</div>
              <div className="text-lg font-black text-white">{activeShipments.length}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">PoD Terverifikasi</div>
              <div className="text-lg font-black text-emerald-400">
                {completedShipmentsWithPoD.length}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Keluhan Terbuka</div>
              <div className="text-lg font-black text-amber-400">{openComplaints.length}</div>
            </div>
          </div>

          {/* Shipments List */}
          <div className="mt-3 space-y-2 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {shipments.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#FF6B1A]">{s.orderNumber}</span>
                      <span className="text-xs text-slate-400">({s.serviceMethod})</span>
                    </div>
                    <div className="font-bold text-sm text-white mt-0.5">{s.customerName}</div>
                    <div className="text-xs text-slate-300">
                      Tujuan: <strong className="text-white">{s.destinationCity}</strong> · {s.weightKg} KG ({s.koli} Koli)
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      s.status === 'Selesai'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : s.isDelayed
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}
                  >
                    {s.isDelayed ? 'Keterlambatan Cuaca' : s.status}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    {s.hasProofOfDelivery ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" /> PoD Diverifikasi Sah
                      </span>
                    ) : (
                      <span className="text-yellow-400 flex items-center gap-1">
                        <FileWarning className="w-3.5 h-3.5" /> PoD Belum Ada (Jangan ACC)
                      </span>
                    )}
                  </div>
                  {!s.hasProofOfDelivery && s.status === 'Tiba di Kota Tujuan' && (
                    <button
                      type="button"
                      onClick={() => setVerifyingShipment(s)}
                      className="px-2 py-0.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Verifikasi PoD
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 italic">
            *Aturan PAUL: Dilarang menyatakan barang selesai tanpa dokumen Proof of Delivery fisik/digital yang valid.
          </div>
        </div>
      </div>

      {/* ========================================================
          PANEL 4: KEUANGAN (SOP Bagian F - Panel 4)
          ======================================================== */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PANEL 4 · PENGAWASAN KEUANGAN
              </span>
              <span className="text-xs text-slate-400">Audit Margin &amp; Pemisahan Kas vs Piutang</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Pendapatan, Biaya Mitra, Margin Kotor, Kas &amp; Piutang
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Prinsip Keuangan PAUL: Nilai invoice TIDAK BOLEH dianggap uang yang sudah diterima. Semua transaksi wajib berbasis bukti sah.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('procedures')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold self-start"
          >
            Buka Pembukuan Lengkap
          </button>
        </div>

        {/* Financial Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
          <div className="bg-[#070b28] p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Pendapatan Tercatat (Invoiced)</span>
            <span className="text-lg sm:text-xl font-black text-white block mt-1">
              {formatRupiah(totalRecordedRevenue)}
            </span>
            <span className="text-[10px] text-slate-500">Nilai total tagihan kargo</span>
          </div>

          <div className="bg-[#070b28] p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Biaya Mitra Angkutan</span>
            <span className="text-lg sm:text-xl font-black text-rose-400 block mt-1">
              {formatRupiah(totalPartnerCost)}
            </span>
            <span className="text-[10px] text-slate-500">HPP Vendor pengiriman</span>
          </div>

          <div className="bg-[#070b28] p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Margin Kotor Kargo</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 block mt-1">
              {formatRupiah(totalGrossMargin)}
            </span>
            <span className="text-[10px] text-emerald-400/80">Rata-rata Rp2.000/KG</span>
          </div>

          <div className="bg-[#070b28] p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Kas Masuk Riil (Bukti Sah)</span>
            <span className="text-lg sm:text-xl font-black text-cyan-400 block mt-1">
              {formatRupiah(cashIn)}
            </span>
            <span className="text-[10px] text-cyan-400/80">Terverifikasi mutasi rekening</span>
          </div>
        </div>

        {/* Transactions Mini Ledger */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
            <span>Catatan Transaksi &amp; Jejak Rekonsiliasi Terkini</span>
            {unreconciledTx.length > 0 && (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {unreconciledTx.length} transaksi belum dicocokkan
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070b28] text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">No. Ref &amp; Tanggal</th>
                  <th className="py-2.5 px-3">Jenis</th>
                  <th className="py-2.5 px-3">Pihak Terkait</th>
                  <th className="py-2.5 px-3 text-right">Nominal</th>
                  <th className="py-2.5 px-3">Status Bayar</th>
                  <th className="py-2.5 px-3">Bukti Dokumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3">
                      <div className="font-mono font-bold text-white">{tx.txNumber}</div>
                      <div className="text-[10px] text-slate-500">{tx.date}</div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-200">{tx.type}</td>
                    <td className="py-2.5 px-3">{tx.counterparty}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-white">
                      {formatRupiah(tx.amount)}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.paymentStatus === 'Lunas'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : tx.paymentStatus === 'Belum Dibayar (Piutang)'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {tx.paymentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {tx.hasDocumentProof ? (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> {tx.proofDocumentNote}
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1 text-[11px]">
                          <AlertTriangle className="w-3 h-3" /> Tanpa Bukti Sah
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================
          PANEL 6: TUGAS, PERINGATAN & REKOMENDASI PRIORITAS PAUL (SOP Bagian F - Panel 6)
          ======================================================== */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                PANEL 6 · REKOMENDASI &amp; PERINGATAN PAUL
              </span>
              <span className="text-xs text-slate-400">Analisis Proaktif Berbasis Data</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Peringatan Risiko &amp; 3 Rekomendasi Prioritas Kerja PAUL
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Active Risk Alerts */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Peringatan Risiko &amp; Hal yang Perlu Ditindaklanjuti
            </h4>
            <div className="space-y-2.5">
              {delayedShipments.map((s) => (
                <div
                  key={s.id}
                  className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-xs"
                >
                  <div className="font-bold text-red-300">
                    Keterlambatan Armada: Resi {s.orderNumber} ({s.destinationCity})
                  </div>
                  <div className="text-slate-300 mt-1">
                    Mitra: {s.partnerName} · Alasan: {s.delayReason || 'Kendala perjalanan laut/darat'}
                  </div>
                  <div className="text-[11px] text-amber-300 mt-1">
                    Tindakan PAUL: Telah menghubungi koordinator lapangan mitra dan mengirim revisi ETA transparan kepada pelanggan.
                  </div>
                </div>
              ))}

              {completedShipmentsNoPoD.map((s) => (
                <div
                  key={s.id}
                  className="p-3 bg-yellow-950/20 border border-yellow-500/30 rounded-xl text-xs"
                >
                  <div className="font-bold text-yellow-300">
                    Menunggu Bukti Serah Terima (PoD): {s.orderNumber}
                  </div>
                  <div className="text-slate-300 mt-1">
                    Kargo tiba di {s.destinationCity}. Tim pengantar belum mengunggah lembar tanda tangan penerima sah.
                  </div>
                </div>
              ))}

              {totalReceivables > 0 && (
                <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-xl text-xs">
                  <div className="font-bold text-purple-300">
                    Tagihan Piutang Menjelang Jatuh Tempo: {formatRupiah(totalReceivables)}
                  </div>
                  <div className="text-slate-300 mt-1">
                    2 pelanggan korporat mendekati jatuh tempo pembayaran invoice 7 hari ke depan.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3 Executive Priorities from PAUL */}
          <div className="bg-[#080d2c] border border-blue-500/30 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                  AI
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    REKOMENDASI 3 PRIORITAS PAUL UNTUK PEMILIK
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Fokus eksekusi hari kerja berikutnya (27 Oktober 2026)
                  </div>
                </div>
              </div>

              <ol className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FF6B1A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Putuskan Otorisasi Permintaan Diskon PT Mega Distribusi (REQ-001):</strong>
                    <p className="text-slate-400 mt-0.5">
                      Margin per kg Rp1.400 masih memberikan laba kotor positif Rp28.000.000/bulan dengan volume 20 ton. Disarankan disetujui dengan klausul minimal kontrak 3 bulan.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Eksekusi Kontak 10 Prospek Sektor Manufaktur &amp; Kimia:</strong>
                    <p className="text-slate-400 mt-0.5">
                      Fokus pada koridor Jakarta–Surabaya dan Jakarta–Medan untuk memaksimalkan utilisasi armada sewa balik TORO dengan margin Rp2.000/kg.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Verifikasi Fisik PoD Resi TR-990212-MKS (Makassar):</strong>
                    <p className="text-slate-400 mt-0.5">
                      Instruksikan kurir cabang Panakkukang untuk mengunggah foto tanda tangan dan stempel toko penerima sebelum invoice pelunasan diterbitkan.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>SOP Kode: TORO-DIR-001</span>
              <button
                type="button"
                onClick={() => onNavigateToTab('reports')}
                className="text-blue-400 hover:underline font-bold"
              >
                Susun Laporan Harian Lengkap →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL: OWNER APPROVAL DECISION MODAL
          ======================================================== */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1033] border-2 border-red-500/40 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-lg">Lembar Keputusan Pemilik TORO Logistic</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApproval(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400">Nomor Pengajuan: <strong className="text-[#FF6B1A] font-mono">{selectedApproval.requestNumber}</strong></div>
                <div className="text-base font-bold text-white mt-1">{selectedApproval.decisionType}</div>
                {selectedApproval.monetaryValue && (
                  <div className="text-emerald-400 font-mono font-bold text-sm mt-0.5">
                    Nilai Nominal: {formatRupiah(selectedApproval.monetaryValue)}
                  </div>
                )}
              </div>

              <div>
                <span className="text-slate-400 block font-semibold">Alasan &amp; Latar Belakang dari PAUL:</span>
                <p className="text-slate-200 mt-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  {selectedApproval.reason}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold">Manfaat Bisnis:</span>
                <p className="text-slate-300 mt-0.5">{selectedApproval.benefit}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-amber-950/30 border border-amber-500/30 text-amber-200">
                  <strong>Risiko Disetujui:</strong> {selectedApproval.riskIfApproved}
                </div>
                <div className="p-2 rounded bg-red-950/30 border border-red-500/30 text-red-200">
                  <strong>Risiko Ditolak:</strong> {selectedApproval.riskIfRejected}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Catatan Otorisasi Pemilik (Akan dicatat di Jejak Audit):
                </label>
                <textarea
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Contoh: Disetujui dengan syarat pembayaran tempo maksimal 21 hari kalender..."
                  rows={3}
                  className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B1A]"
                />
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedApproval(null)}
                className="px-3 py-2 text-slate-400 hover:text-white text-xs"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDecision('perlu revisi')}
                  className="px-3 py-2 bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300 rounded-lg text-xs font-bold transition-colors"
                >
                  Minta Revisi
                </button>
                <button
                  type="button"
                  onClick={() => handleDecision('ditolak')}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Tolak Permintaan
                </button>
                <button
                  type="button"
                  onClick={() => handleDecision('disetujui')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black shadow-lg shadow-emerald-950/40 transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>SETUJUI SEBAGAI PEMILIK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD NEW PROSPECT (LEAD)
          ======================================================== */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1033] border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-lg">Tambah Prospek Kargo Baru (Target: 10/Hari)</h3>
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nama Perusahaan / Bisnis *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT. Karya Baja Indonesia"
                  value={newLeadForm.companyName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                  className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Nama PIC *</label>
                  <input
                    type="text"
                    required
                    placeholder="Bpk / Ibu..."
                    value={newLeadForm.contactPerson}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactPerson: e.target.value })}
                    className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Jenis Usaha</label>
                  <select
                    value={newLeadForm.businessType}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, businessType: e.target.value as any })}
                    className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="Distributor">Distributor</option>
                    <option value="Manufaktur">Manufaktur</option>
                    <option value="Toko Retail">Toko Retail</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Kontraktor">Kontraktor</option>
                    <option value="Importir">Importir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Prioritas</label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value as any })}
                    className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Rute Kargo yang Diminati</label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta ke Surabaya & Makassar"
                  value={newLeadForm.routeInterest}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, routeInterest: e.target.value })}
                  className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Kebutuhan Barang &amp; Estimasi Volume</label>
                <input
                  type="text"
                  placeholder="Contoh: 3 Ton / pengiriman kargo darat CDD"
                  value={newLeadForm.cargoNeeds}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, cargoNeeds: e.target.value })}
                  className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-bold rounded-lg"
                >
                  Simpan Prospek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VERIFIKASI PROOF OF DELIVERY (PoD)
          ======================================================== */}
      {verifyingShipment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1033] border border-yellow-500/50 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-base">Verifikasi Proof of Delivery (PoD)</h3>
              </div>
              <button
                type="button"
                onClick={() => setVerifyingShipment(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl">
                <div className="font-mono text-[#FF6B1A] font-bold">{verifyingShipment.orderNumber}</div>
                <div className="text-white font-semibold mt-0.5">{verifyingShipment.customerName}</div>
                <div className="text-slate-400">Penerima: {verifyingShipment.receiverName} ({verifyingShipment.destinationCity})</div>
              </div>

              <div className="p-3 bg-yellow-950/30 border border-yellow-500/30 rounded-xl text-yellow-200 text-[11px]">
                <strong>Aturan SOP TORO-DIR-001 Prosedur 2:</strong>
                <p className="mt-1">
                  "PAUL tidak boleh menyatakan barang telah diterima apabila bukti penerimaan belum tersedia atau belum diverifikasi."
                </p>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Pemeriksaan Kelengkapan Bukti:</label>
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded accent-[#FF6B1A]" />
                    <span>Tanda tangan &amp; nama jelas penerima sah</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded accent-[#FF6B1A]" />
                    <span>Stempel toko / perusahaan penerima</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded accent-[#FF6B1A]" />
                    <span>Foto barang saat serah terima dalam kondisi baik</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setVerifyingShipment(null)}
                className="px-3 py-2 text-slate-400 hover:text-white text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleVerifyPoD(verifyingShipment.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Sahkan &amp; Tandai Selesai</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
