import React, { useState } from 'react';
import {
  Users2,
  Bot,
  Briefcase,
  TrendingUp,
  Truck,
  DollarSign,
  Compass,
  Store,
  Crown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  Filter,
  Check,
  Send,
  MessageSquare,
  Sparkles,
  ChevronRight,
  FileText,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  AI_SIX_DIVISIONS,
  AiDivisionHead,
  PaulTask,
  PaulAgent,
  OwnerApprovalRequest,
  PaulLead,
  PaulShipment,
} from '../../data/paulSopData';

interface PaulSixDivisionsViewProps {
  tasks: PaulTask[];
  onUpdateTasks: (tasks: PaulTask[]) => void;
  agents: PaulAgent[];
  onNavigateToTab?: (tab: string) => void;
}

export const PaulSixDivisionsView: React.FC<PaulSixDivisionsViewProps> = ({
  tasks,
  onUpdateTasks,
  agents,
  onNavigateToTab,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('ALL');
  const [activeHead, setActiveHead] = useState<AiDivisionHead>(AI_SIX_DIVISIONS[0]);
  const [taskFilterStatus, setTaskFilterStatus] = useState<string>('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick prompt interaction with selected AI head
  const [userPromptQuery, setUserPromptQuery] = useState<string>('');
  const [aiHeadResponse, setAiHeadResponse] = useState<{
    head: string;
    question: string;
    answer: string;
    timestamp: string;
  } | null>(null);

  // New task form
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    pic: 'PAUL' as 'PAUL' | 'ENIS' | 'IQBAL' | 'FIQA' | 'AVAN' | 'SASA',
    deadline: '24 Jam',
    notes: '',
    relatedEntityId: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'PAUL':
        return Bot;
      case 'ENIS':
        return TrendingUp;
      case 'IQBAL':
        return Truck;
      case 'FIQA':
        return DollarSign;
      case 'AVAN':
        return Compass;
      case 'SASA':
        return Store;
      default:
        return Users2;
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchPic = selectedDivision === 'ALL' || t.pic === selectedDivision;
    const matchStatus =
      taskFilterStatus === 'all' || t.status.toLowerCase() === taskFilterStatus.toLowerCase();
    return matchPic && matchStatus;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskForm.title.trim()) {
      alert('Judul tugas wajib diisi!');
      return;
    }

    const nextId = `TSK-${String(tasks.length + 1).padStart(3, '0')}`;
    const newTask: PaulTask = {
      id: nextId,
      title: newTaskForm.title,
      pic: newTaskForm.pic,
      deadline: newTaskForm.deadline || '1 Hari Kerja',
      status: 'Menunggu',
      result: 'Belum dieksekusi — baru didelegasikan dalam sistem.',
      notes: newTaskForm.notes,
      relatedEntityId: newTaskForm.relatedEntityId || undefined,
    };

    const updated = [newTask, ...tasks];
    onUpdateTasks(updated);
    setShowAddTaskModal(false);
    setNewTaskForm({
      title: '',
      pic: 'PAUL',
      deadline: '24 Jam',
      notes: '',
      relatedEntityId: '',
    });
    showToast(`Tugas ${nextId} berhasil didelegasikan ke ${newTask.pic}!`);
  };

  const handleUpdateTaskStatus = (
    taskId: string,
    newStatus: 'Menunggu' | 'Dalam Proses' | 'Selesai' | 'Dibatalkan'
  ) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        let resultNote = t.result;
        if (newStatus === 'Selesai') {
          resultNote = `Selesai dieksekusi oleh ${t.pic} dan telah diverifikasi bukti dokumen.`;
        } else if (newStatus === 'Dalam Proses') {
          resultNote = `Sedang dikerjakan oleh PIC ${t.pic}.`;
        }
        return {
          ...t,
          status: newStatus,
          result: resultNote,
        };
      }
      return t;
    });

    onUpdateTasks(updated);
    showToast(`Status tugas ${taskId} diubah menjadi ${newStatus}.`);
  };

  // Preset Simulated AI Division Head Consultations
  const handleConsultHead = (head: AiDivisionHead, queryText?: string) => {
    const query = queryText || userPromptQuery || `Bagaimana status dan rekomendasi divisi Anda hari ini?`;
    let responseText = '';

    switch (head.id) {
      case 'PAUL':
        responseText = `[PAUL — AI DIREKTUR UTAMA]\n` +
          `Laporan Konsolidasi 6 Divisi:\n` +
          `1. Disiplin Kerja: Menetapkan target harian untuk Enis, Iqbal, Fiqa, Avan, dan Sasa.\n` +
          `2. Integritas Data: Semua data tanpa bukti diberi tanda "—". Margin kargo minimal Rp2.000/kg terjaga.\n` +
          `3. Koordinasi Keagenan: SASA melaporkan 3 titik mitra strategis, 1 menunggu izin Pemilik di Panel 5.\n` +
          `4. Rekomendasi: Pemilik disarankan memutuskan REQ-001 (diskon volume 20 ton) dan REQ-AGN (izin agen Cilegon) agar momentum bisnis tidak terhambat.`;
        break;
      case 'ENIS':
        responseText = `[ENIS — KEPALA PENJUALAN]\n` +
          `Fokus Prospek & Akuisisi Kargo:\n` +
          `• Database prospek aktif terdata 5 perusahaan industri (kimia, tekstil, pupuk, retail).\n` +
          `• Koordinasi SASA: Memastikan tarif keagenan selaras dengan pamflet resmi TORO agar tidak terjadi perang harga.\n` +
          `• Penawaran Terkirim: Menunggu deal dari PT Surya Mandiri Kimia (2-3 ton/minggu).\n` +
          `• Permintaan ke PAUL: Mohon percepatan otorisasi diskon volume untuk prospek PT Mega Distribusi.`;
        break;
      case 'IQBAL':
        responseText = `[IQBAL — KEPALA OPERASIONAL KARGO]\n` +
          `Status Dispatch & Verifikasi PoD:\n` +
          `• Pemantauan Armada: 5 shipment dalam pantauan ketat (Darat, Laut, Udara).\n` +
          `• Kebijakan Selesai: Pengiriman hanya dianggap selesai jika foto Surat Jalan / PoD fisik bertanda tangan basah telah terverifikasi.\n` +
          `• Kesiapan Keagenan: Rute pickup Subang (AGN-0001) terhubung mulus via Tol Cipali ke Hub Cengkareng. Jalur Cilegon (AGN-0002) siap integrasi truk CDD.\n` +
          `• Kendala: Kapal roro Balikpapan sandar tertunda akibat ombak, update transparan sudah disampaikan ke pelanggan.`;
        break;
      case 'FIQA':
        responseText = `[FIQA — KEPALA KEUANGAN & ADMINISTRASI]\n` +
          `Audit Kas Riil & Skema Margin:\n` +
          `• Saldo Kas Riil: Hanya mencatat mutasi rekening koran dan kuitansi sah, bukan estimasi piutang.\n` +
          `• Penilaian Komisi Agen: Usulan komisi 15% agen AGN-0001 dan 12% agen AGN-0002 aman, menyisakan margin bersih TORO di atas batas aman.\n` +
          `• Tagihan Jatuh Tempo: Kewajiban utang mitra Samudera Jaya Rp1.344.000 dijadwalkan bayar saat kontainer sandar.\n` +
          `• Batas Wewenang: Pengeluaran di atas batas rutin wajib menunggu paraf digital Pemilik.`;
        break;
      case 'AVAN':
        responseText = `[AVAN — KEPALA PENGEMBANGAN BISNIS]\n` +
          `Peluang Pasar & Ekspanasi Jaringan:\n` +
          `• Analisis Koridor Pantura: Jawa Barat menuju Jawa Tengah menunjukkan lonjakan permintaan kargo suku cadang.\n` +
          `• Sinergi SASA: Mengusulkan SASA mendekati 2 toko logistik di Karawang Barat dan Cirebon untuk menjadi titik drop point resmi TORO.\n` +
          `• Rekomendasi: Gunakan model kemitraan agen ruko lokal untuk hemat biaya sewa cabang hingga Rp150jt/tahun.`;
        break;
      case 'SASA':
        responseText = `[SASA — KEPALA DIVISI KEAGENAN]\n` +
          `Laporan Jaringan Tab KEAGENAN (21 Kolom):\n` +
          `• Total Agen: 3 agen (AGN-0001 Aktif, AGN-0002 Menunggu Izin Pemilik, AGN-0003 Verifikasi Dokumen NIB).\n` +
          `• Volume Kirim Mitra: 14 pengiriman sukses via Agen Subang, komisi terutang Rp630.000 telah diverifikasi FIQA.\n` +
          `• Integrasi Tim: Kesiapan fisik gerai telah diinspeksi IQBAL; proyeksi komisi telah lolos simulasi FIQA.\n` +
          `• Otorisasi Pemilik: Mengajukan izin resmi pembukaan gerai Cilegon di Panel 5.`;
        break;
    }

    setAiHeadResponse({
      head: head.name,
      question: query,
      answer: responseText,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    });
    setUserPromptQuery('');
  };

  const workflowSteps = [
    {
      num: 1,
      actors: 'AVAN & SASA',
      title: 'Pemetaan Wilayah & Peluang',
      desc: 'Memetakan titik koridor kargo, potensi volume UMKM lokal, dan kebutuhan pembukaan jaringan baru.',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
    },
    {
      num: 2,
      actors: 'SASA, IQBAL & FIQA',
      title: 'Rekrutmen & Verifikasi Terpadu',
      desc: 'SASA mengumpulkan berkas 21 kolom; IQBAL memeriksa akses truk pickup; FIQA menguji simulasi margin & komisi.',
      color: 'border-pink-500/40 text-pink-400 bg-pink-950/20',
    },
    {
      num: 3,
      actors: 'ENIS & SASA',
      title: 'Koordinasi Penjualan Bersama',
      desc: 'Menyelaraskan database prospek agar tidak terjadi gesekan dan duplikasi penawaran klien pusat vs agen.',
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/20',
    },
    {
      num: 4,
      actors: 'PAUL',
      title: 'Konsolidasi & Rekomendasi Prioritas',
      desc: 'PAUL menggabungkan seluruh telaah divisi dan menyusun draf persetujuan terstruktur untuk pemilik.',
      color: 'border-orange-500/40 text-orange-400 bg-orange-950/20',
    },
    {
      num: 5,
      actors: 'PEMILIK TORO',
      title: 'Persetujuan Otorisasi Mutlak',
      desc: 'Pemilik memutuskan komitmen besar, kontrak eksklusivitas wilayah, dan perubahan skema komisi.',
      color: 'border-amber-500/50 text-amber-300 bg-amber-950/30 font-bold',
    },
    {
      num: 6,
      actors: 'SASA & IQBAL',
      title: 'Aktivasi Gerai & SOP Pengiriman',
      desc: 'Pemberian plang resmi TORO, pelatihan resi, dan penjadwalan armada penjemputan berkala.',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
    },
    {
      num: 7,
      actors: 'ENIS',
      title: 'Pertumbuhan Transaksi & Kargo',
      desc: 'Membantu agen memenangkan muatan grosir dan repeat order kargo industri di wilayahnya.',
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/20',
    },
    {
      num: 8,
      actors: 'FIQA',
      title: 'Pencatatan Keuangan Berbasis Bukti',
      desc: 'Merekonsiliasi pendapatan, biaya vendor, komisi agen terutang, dan penerimaan kas mutasi rekening.',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
    },
    {
      num: 9,
      actors: 'AVAN',
      title: 'Evaluasi Jaringan & Ekspansi',
      desc: 'Mengevaluasi rasio biaya vs omset ekspansi wilayah dan mengusulkan perbaikan strategi kemitraan.',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
    },
    {
      num: 10,
      actors: 'PAUL',
      title: 'Laporan Eksekutif Terpadu',
      desc: 'Menyampaikan laporan harian & mingguan 9 bagian kepada Pemilik TORO Logistic secara terukur.',
      color: 'border-orange-500/40 text-orange-400 bg-orange-950/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#FF6B1A] text-white font-semibold rounded-xl shadow-2xl flex items-center gap-2 border border-orange-400/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header: Integrated Six-Division AI Management */}
      <div className="bg-gradient-to-r from-[#0b1033] via-[#101744] to-[#070b28] p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B1A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30 text-xs font-black uppercase rounded-lg tracking-wider">
                STRUKTUR 6 KEPALA DIVISI AI
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-mono rounded">
                TORO SENTOSA GROUP
              </span>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                Pemilik: Pemegang Keputusan Mutlak
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              TORO LOGISTIC — INTEGRATED SIX-DIVISION AI MANAGEMENT
            </h1>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Sistem manajemen AI terpadu yang terdiri dari <strong className="text-[#FF6B1A]">PAUL</strong> (Direktur Utama), 
              <strong className="text-blue-400"> ENIS</strong> (Penjualan), 
              <strong className="text-amber-400"> IQBAL</strong> (Operasional), 
              <strong className="text-emerald-400"> FIQA</strong> (Keuangan), 
              <strong className="text-purple-400"> AVAN</strong> (Pengembangan Bisnis), dan 
              <strong className="text-pink-400"> SASA</strong> (Keagenan). 
              Semua peran bekerja dalam satu data terkoordinasi dengan pengawasan persetujuan pemilik.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF6B1A] to-[#d64e05] hover:from-[#ff7c33] hover:to-[#ea580c] text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Beri Tugas Antar-Divisi</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 AI Heads Grid + Owner Supreme Authority Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#FF6B1A]" />
            <span>Dewan Kepemimpinan &amp; 6 Kepala Divisi AI</span>
          </h2>
          <span className="text-xs text-slate-400">
            Klik kepala divisi untuk inspeksi tugas, batas wewenang, dan simulasi prompt
          </span>
        </div>

        {/* Supreme Owner Card */}
        <div className="p-4 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900/60 rounded-xl border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-200 text-sm">
                  PEMILIK TORO LOGISTIC
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PEMEGANG KEPUTUSAN AKHIR
                </span>
              </div>
              <div className="text-xs text-slate-300">
                Memegang hak mutlak atas kebijakan strategis, komitmen keuangan besar, kontrak kemitraan, eksklusivitas wilayah, dan pinjaman.
              </div>
            </div>
          </div>

          <div className="text-right text-xs font-medium text-amber-300/80 shrink-0">
            Kewenangan Mutlak SOP TORO-DIR-001
          </div>
        </div>

        {/* 6 AI Division Heads Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {AI_SIX_DIVISIONS.map((head) => {
            const Icon = getDivisionIcon(head.id);
            const isSelected = activeHead.id === head.id;

            return (
              <button
                key={head.id}
                type="button"
                onClick={() => {
                  setActiveHead(head);
                  setSelectedDivision(head.id);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-[#FF6B1A] ring-2 ring-[#FF6B1A]/40 shadow-lg'
                    : 'bg-[#0b1033] border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${head.avatarColor} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      DIVISI {head.id}
                    </span>
                  </div>

                  <div className="font-black text-white text-sm">{head.name}</div>
                  <div className="text-[11px] font-semibold text-slate-300 mt-0.5">
                    {head.role}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {head.title}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Tugas:</span>
                  <span className="font-bold text-white">
                    {tasks.filter((t) => t.pic === head.id).length} Active
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Division Head Deep-Dive Profile & Interactive Consultation */}
      <div className="bg-[#070b28] border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeHead.avatarColor} flex items-center justify-center text-white shadow-xl`}
            >
              {React.createElement(getDivisionIcon(activeHead.id), { className: 'w-7 h-7' })}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-black text-white">{activeHead.name}</h3>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-slate-800 text-slate-200 border border-slate-700">
                  {activeHead.role}
                </span>
                <span className="text-xs font-mono text-slate-400">{activeHead.title}</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
                "{activeHead.mission}"
              </p>
            </div>
          </div>

          {/* Quick Simulation Trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleConsultHead(activeHead)}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Minta Laporan Harian {activeHead.name}</span>
            </button>
          </div>
        </div>

        {/* 2-Columns: Duties & Reporting Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B1A]" />
              <span>Tanggung Jawab Utama ({activeHead.name})</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeHead.keyDuties.map((duty, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#FF6B1A] font-bold mt-0.5">•</span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Standar Format Pelaporan Tertib</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeHead.reportFormat.map((format, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold mt-0.5">»</span>
                  <span className="font-mono text-[11px] text-slate-300">{format}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Consultation Response Box */}
        {aiHeadResponse && aiHeadResponse.head === activeHead.name && (
          <div className="mt-6 p-4 bg-[#0b1033] rounded-xl border border-slate-700 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-[#FF6B1A]" />
                <span>Konsultasi Langsung: {aiHeadResponse.head}</span>
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {aiHeadResponse.timestamp} WIB
              </span>
            </div>
            <pre className="font-sans text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {aiHeadResponse.answer}
            </pre>
          </div>
        )}
      </div>

      {/* 10-Step Collaborative Workflow Visualizer */}
      <div className="bg-[#070b28] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>Alur Kerja Terpadu 10 Langkah (6 Divisi + Pemilik)</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Siklus koordinasi dari riset pasar, rekrutmen agen, uji operasional, audit komisi, otorisasi pemilik, hingga pelaporan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${step.color} transition-all`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                  <span>LANGKAH {step.num}</span>
                  <span className="uppercase">{step.actors}</span>
                </div>
                <div className="text-xs font-bold text-white mb-1.5">{step.title}</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unified Cross-Division Task Management Board */}
      <div className="bg-[#070b28] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#FF6B1A]" />
              <span>Papan Pendelegasian Tugas Lintas Divisi (ID, PIC, Tenggat, Status, Hasil)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Sesuai aturan koordinasi TORO Logistic: Setiap tugas harus memiliki ID, PIC, tenggat, status, dan hasil terverifikasi.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
            >
              <option value="ALL">Semua PIC Divisi</option>
              <option value="PAUL">PAUL (Direktur Utama)</option>
              <option value="ENIS">ENIS (Penjualan)</option>
              <option value="IQBAL">IQBAL (Operasional)</option>
              <option value="FIQA">FIQA (Keuangan)</option>
              <option value="AVAN">AVAN (Pengembangan)</option>
              <option value="SASA">SASA (Keagenan)</option>
            </select>

            <select
              value={taskFilterStatus}
              onChange={(e) => setTaskFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
            >
              <option value="all">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0b1033] border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px] whitespace-nowrap">
                <th className="py-3 px-4">ID Tugas</th>
                <th className="py-3 px-4">Judul &amp; Ruang Lingkup</th>
                <th className="py-3 px-4">PIC Penanggung Jawab</th>
                <th className="py-3 px-4">Tenggat Waktu</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Hasil Terverifikasi</th>
                <th className="py-3 px-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredTasks.map((t) => {
                const isDone = t.status === 'Selesai';
                const isProcess = t.status === 'Dalam Proses';

                return (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors text-slate-200">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#FF6B1A] whitespace-nowrap">
                      {t.id}
                      {t.relatedEntityId && (
                        <div className="text-[10px] text-slate-400 font-normal">
                          Ref: {t.relatedEntityId}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-[280px]">
                      <div className="font-semibold text-white">{t.title}</div>
                      {t.notes && <div className="text-[11px] text-slate-400 mt-0.5">{t.notes}</div>}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-800 text-slate-200 border border-slate-700">
                        {t.pic}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.deadline}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : isProcess
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-400" />
                        )}
                        {t.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 text-xs">
                      {t.result}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {!isDone && (
                          <button
                            type="button"
                            onClick={() => handleUpdateTaskStatus(t.id, 'Selesai')}
                            className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] font-bold transition-colors"
                          >
                            Tandai Selesai
                          </button>
                        )}
                        {!isProcess && !isDone && (
                          <button
                            type="button"
                            onClick={() => handleUpdateTaskStatus(t.id, 'Dalam Proses')}
                            className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 rounded-lg text-[10px] font-bold transition-colors"
                          >
                            Proses
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

      {/* Modal: Tambah Tugas Lintas Divisi */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#0b1033] border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#101744] border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B1A]/20 text-[#FF6B1A] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Delegasi Tugas Lintas Divisi</h3>
                  <p className="text-slate-400 text-xs">Pemberian tugas resmi antar kepala divisi AI</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTaskModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Judul &amp; Ruang Lingkup Tugas <span className="text-[#FF6B1A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  placeholder="Contoh: Audit kesiapan rute penjemputan armada ke Agen Cilegon"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    PIC Divisi Pelaksana <span className="text-[#FF6B1A]">*</span>
                  </label>
                  <select
                    value={newTaskForm.pic}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, pic: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#FF6B1A]"
                  >
                    <option value="ENIS">ENIS — Penjualan</option>
                    <option value="IQBAL">IQBAL — Operasional Kargo</option>
                    <option value="FIQA">FIQA — Keuangan</option>
                    <option value="AVAN">AVAN — Bisnis &amp; Pasar</option>
                    <option value="SASA">SASA — Keagenan</option>
                    <option value="PAUL">PAUL — Direktur Utama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Tenggat Waktu Selesai
                  </label>
                  <input
                    type="text"
                    value={newTaskForm.deadline}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, deadline: e.target.value })}
                    placeholder="Contoh: 27 Okt 2026 / 2 Hari Kerja"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  ID Terkait (Opsional)
                </label>
                <input
                  type="text"
                  value={newTaskForm.relatedEntityId}
                  onChange={(e) =>
                    setNewTaskForm({ ...newTaskForm, relatedEntityId: e.target.value })
                  }
                  placeholder="Contoh: AGN-0002 atau Resi TR-882109-SBY"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B1A]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={newTaskForm.notes}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, notes: e.target.value })}
                  placeholder="Instruksi khusus atau kriteria bukti selesai..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B1A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6B1A] hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-600/30"
                >
                  Delegasikan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
