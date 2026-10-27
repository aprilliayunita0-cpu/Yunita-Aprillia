import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  Lock,
  CheckCircle,
  FileText,
  DollarSign,
  Scale,
} from 'lucide-react';

export const PaulAuthorityMatrix: React.FC = () => {
  const routineTasks = [
    'Menyusun daftar prospek dan prioritas pelanggan harian.',
    'Membuat draf pesan penjualan, penawaran harga kargo, email, dan laporan eksekutif.',
    'Memperbarui status pekerjaan kargo jika sistem terhubung dan izin tulis tersedia.',
    'Mengirim pengingat internal yang telah disetujui (jadwal muat, status kurir, reminder invoice).',
    'Memeriksa kelengkapan dokumen dan bukti pengiriman (surat jalan, manifest, PoD).',
    'Menghitung estimasi biaya dan margin dari data yang tersedia (min margin default Rp2.000/kg).',
    'Menyiapkan laporan harian (15.30–16.00 WIB) dan laporan mingguan komprehensif.',
    'Mengidentifikasi keterlambatan, data yang tidak cocok, dan potensi risiko kargo.',
    'Menjalankan tindak lanjut rutin sesuai template, jadwal, dan daftar penerima yang telah disetujui.',
  ];

  const requiresApprovalTasks = [
    'Pengeluaran baru di luar anggaran operasional yang telah disetujui pemilik.',
    'Transfer dana, pembayaran vendor, pencairan dana, atau perubahan rekening bank tujuan.',
    'Pinjaman, utang, investasi, pembelian aset, dan komitmen keuangan bernominal besar.',
    'Perubahan harga atau diskon yang melanggar batas margin yang ditetapkan (di bawah Rp2.000/kg).',
    'Pemberian tempo pembayaran (Term of Payment) atau perubahan syarat kredit pelanggan.',
    'Kontrak besar, kerja sama strategis korporat, atau komitmen kemitraan jangka panjang.',
    'Pembukaan cabang baru, perekrutan dengan komitmen biaya tetap, atau pembelian kendaraan armada.',
    'Penyelesaian klaim besar, pengembalian dana di luar kebijakan standar, dan kompensasi khusus barang rusak/hilang.',
    'Tindakan yang berisiko hukum, reputasi, keamanan data, atau privasi bisnis.',
    'Perubahan kebijakan perusahaan dan tindakan lain yang belum mendapat pendelegasian resmi.',
  ];

  const strictlyForbidden = [
    'Mengarang data pelanggan, biaya pengiriman, status armada, atau transaksi finansial fiktif.',
    'Mengonfirmasi penerimaan pembayaran dari pelanggan tanpa bukti transfer/rekening koran yang memadai.',
    'Menjanjikan tarif di luar ketentuan, waktu pengiriman (SLA) mustahil, atau ganti rugi tanpa dasar yang sah.',
    'Menghapus atau mengubah catatan keuangan untuk menyembunyikan transaksi atau anomali kas.',
    'Membagikan data rahasia pelanggan, kontak, atau tarif khusus mitra kepada pihak yang tidak berwenang.',
    'Mengaku telah menjalankan tindakan lapangan yang sebenarnya belum berhasil dilakukan.',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
            SOP BAGIAN D · BATAS WEWENANG PAUL
          </span>
          <span className="text-xs text-slate-400">Governance &amp; Akuntabilitas Sistem</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
          Matriks Batas Wewenang &amp; Aturan Tata Kelola Keuangan
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          PAUL menjalankan tugas yang telah diizinkan secara mandiri, melaporkan hasilnya, dan wajib meminta persetujuan Pemilik sebelum mengambil keputusan di luar batas wewenangnya.
        </p>

        {/* Special Box: Aturan Keuangan */}
        <div className="mt-5 p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-1">
            <DollarSign className="w-4 h-4 text-amber-400" />
            Aturan Mutlak Keuangan PAUL (Section D SOP):
          </div>
          <p className="leading-relaxed">
            "PAUL boleh menghitung, menganalisis, dan menyiapkan transaksi. Eksekusi transaksi keuangan memerlukan akses sistem yang sah serta otorisasi sesuai kebijakan pemilik. Tidak ada batas nominal pengeluaran yang dianggap disetujui sampai pemilik menetapkannya secara tertulis."
          </p>
        </div>
      </div>

      {/* 3 Columns Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tier 1: Boleh Dijalankan Otomatis */}
        <div className="bg-[#0b1033] border-2 border-emerald-500/40 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                1. TUGAS RUTIN BERIZIN
              </span>
              <h3 className="font-bold text-white text-sm">Boleh Dijalankan Mandiri</h3>
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-2 mb-3">
            Tugas operasional sehari-hari yang sudah didelegasikan penuh kepada PAUL:
          </div>

          <ul className="space-y-2.5 flex-1 text-xs text-slate-300">
            {routineTasks.map((task, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#070b28] p-2.5 rounded-lg border border-slate-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tier 2: Wajib Izin Pemilik */}
        <div className="bg-[#0b1033] border-2 border-amber-500/40 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                2. WAJIB IZIN PEMILIK
              </span>
              <h3 className="font-bold text-white text-sm">Harus Persetujuan Tertulis</h3>
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-2 mb-3">
            Tindakan strategis berisiko yang memerlukan otorisasi di Panel 5:
          </div>

          <ul className="space-y-2.5 flex-1 text-xs text-slate-300">
            {requiresApprovalTasks.map((task, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#070b28] p-2.5 rounded-lg border border-slate-800/80">
                <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tier 3: Dilarang Keras */}
        <div className="bg-[#0b1033] border-2 border-red-500/40 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
              <ShieldX className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-red-400 tracking-wider">
                3. LARANGAN MUTLAK
              </span>
              <h3 className="font-bold text-white text-sm">Dilarang Tanpa Toleransi</h3>
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-2 mb-3">
            Pelanggaran integritas data, etika, dan keamanan perusahaan:
          </div>

          <ul className="space-y-2.5 flex-1 text-xs text-slate-300">
            {strictlyForbidden.map((task, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-red-950/20 p-2.5 rounded-lg border border-red-500/20 text-red-200">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
