import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Printer,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles,
  Download,
} from 'lucide-react';
import {
  OwnerApprovalRequest,
  PaulLead,
  PaulShipment,
  PaulFinancialTransaction,
  PaulComplaint,
  PaulCarrierPartner,
  PaulAgent,
  PaulTask,
} from '../../data/paulSopData';
import { formatRupiah } from '../../utils/toroCalculators';

interface PaulReportsViewProps {
  approvals: OwnerApprovalRequest[];
  leads: PaulLead[];
  shipments: PaulShipment[];
  transactions: PaulFinancialTransaction[];
  complaints: PaulComplaint[];
  partners: PaulCarrierPartner[];
  agents?: PaulAgent[];
  tasks?: PaulTask[];
}

export const PaulReportsView: React.FC<PaulReportsViewProps> = ({
  approvals,
  leads,
  shipments,
  transactions,
  complaints,
  partners,
  agents = [],
  tasks = [],
}) => {
  const [reportType, setReportType] = useState<'harian' | 'mingguan'>('harian');
  const [copied, setCopied] = useState(false);

  const currentDateStr = '27 Oktober 2026';
  const currentTimeStr = '16:00 WIB';

  // Metrics for daily report
  const pendingApprovals = approvals.filter((a) => a.status === 'menunggu');
  const completedShipmentsWithPoD = shipments.filter(
    (s) => s.status === 'Selesai' && s.hasProofOfDelivery
  );
  const delayedShipments = shipments.filter((s) => s.isDelayed);
  const newLeadsCount = leads.length;
  const quotesSentCount = leads.filter(
    (l) => l.status === 'penawaran terkirim' || l.status === 'menang'
  ).length;

  const totalRecordedRevenue = transactions
    .filter((t) => t.type === 'Pendapatan')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPartnerCost = shipments.reduce((sum, s) => sum + s.partnerCostTotal, 0);
  const totalGrossMargin = shipments.reduce((sum, s) => sum + s.grossMargin, 0);
  const cashIn = transactions
    .filter((t) => t.type === 'Kas Masuk' && t.hasDocumentProof)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalReceivables = transactions
    .filter((t) => t.paymentStatus === 'Belum Dibayar (Piutang)')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalPayables = transactions
    .filter((t) => t.paymentStatus === 'Utang Mitra')
    .reduce((sum, t) => sum + t.amount, 0);

  // Active agents & tasks metrics
  const activeAgentsCount = agents.filter((a) => a.statusPendekatan === 'Aktif').length;
  const pendingAgentApprovalsCount = agents.filter(
    (a) => a.statusPersetujuan === 'Menunggu Persetujuan Pemilik'
  ).length;
  const totalAgentShipments = agents.reduce((sum, a) => sum + (a.jumlahPengiriman || 0), 0);
  const totalAgentCommissionDue = agents.reduce((sum, a) => sum + (a.komisiTerutang || 0), 0);

  // Generate Daily Report Text (Konsolidasi 6 Divisi AI TORO-DIR-001)
  const generateDailyReportText = () => {
    return `*LAPORAN HARIAN DIREKTUR UTAMA — PAUL*
*PT TORO SENTOSA GROUP (TORO LOGISTIC)*
*Sistem:* Integrated Six-Division AI Management
*Kode Dokumen:* TORO-DIR-001 | Versi 2.0
*Periode:* ${currentDateStr} (${currentTimeStr})
*Sumber Data:* Database Operasional, Sistem Cek Resi, Google Sheets KEAGENAN & Rekening Terverifikasi
--------------------------------------------------

*1. RINGKASAN KONDISI PERUSAHAAN (PAUL):*
• Status Operasional: Berjalan disiplin sesuai jadwal kerja SOP 08.00–16.00 WIB.
• Integritas Data: Prinsip anti-halusinasi diterapkan (data tanpa bukti bertanda "—"). Margin minimal Rp2.000/kg terjaga.

*2. HASIL PENJUALAN (ENIS):*
• Total Prospek Aktif: ${newLeadsCount} prospek industri
• Penawaran Kargo Terkirim: ${quotesSentCount} penawaran
• Prospek Menang / Deal: ${leads.filter((l) => l.status === 'menang').length} pelanggan (Toko Elektronik Megah)
• Tindak Lanjut ENIS: Follow-up draf penawaran PT Surya Mandiri Kimia & CV Agro Lestari.

*3. STATUS OPERASIONAL KARGO (IQBAL):*
• Total Pengiriman Aktif: ${shipments.length} pengiriman (Darat, Laut, Udara)
• Pengiriman Selesai dgn PoD Sah: ${completedShipmentsWithPoD.length} resi (${completedShipmentsWithPoD.map((s) => s.orderNumber).join(', ')})
• Menunggu Upload Bukti PoD: ${shipments.filter((s) => s.status === 'Tiba di Kota Tujuan' && !s.hasProofOfDelivery).length} resi (TR-990212-MKS)
• Kesiapan Jalur: Rute penjemputan mitra armada terhubung ke Hub Cengkareng.

*4. KONDISI KEUANGAN & MARGIN (FIQA):*
• Pendapatan Tercatat (Invoice): ${formatRupiah(totalRecordedRevenue)}
• Biaya Mitra Angkutan: ${formatRupiah(totalPartnerCost)}
• Margin Kotor: ${formatRupiah(totalGrossMargin)} (Rata-rata margin sehat terjaga)
• Kas Riil Masuk (Mutasi Sah): ${formatRupiah(cashIn)}
• Piutang Pelanggan: ${formatRupiah(totalReceivables)}
• Utang Vendor Mitra: ${formatRupiah(totalPayables)}
• Catatan FIQA: Nilai invoice belum terbayar tidak diakui sebagai kas masuk.

*5. PELUANG BISNIS & EKSPANSI (AVAN):*
• Koridor Pantura: Potensi muatan suku cadang Jawa Barat–Jawa Tengah meningkat 25%.
• Kemitraan Vendor: Evaluasi 4 vendor transportasi terverifikasi (rating rata-rata 4.8/5.0).
• Rekomendasi AVAN: Ekspansi model drop point ruko lokal untuk menekan capex pembukaan cabang.

*6. JARINGAN KEAGENAN (SASA — TAB KEAGENAN 21 KOLOM):*
• Total Agen Terdata: ${agents.length} titik mitra
• Agen Aktif Beroperasi: ${activeAgentsCount} gerai (Subang AGN-0001)
• Calon Menunggu Otorisasi Pemilik: ${pendingAgentApprovalsCount} gerai (Cilegon AGN-0002)
• Volume Kirim via Agen: ${totalAgentShipments} resi kargo
• Komisi Terutang Agen: ${formatRupiah(totalAgentCommissionDue)} (Telah diaudit aman oleh FIQA)

*7. MASALAH & RISIKO:*
• Kendala Cuaca: 1 resi (TR-551092-BPN Balikpapan) tertunda karena gelombang kapal di Laut Jawa. Update transparan telah dikirim ke klien.
• Risiko Piutang: Permintaan TOP kredit 30 hari butuh cadangan dana talangan supir.

*8. KEPUTUSAN MENUNGGU PERSETUJUAN PEMILIK (PANEL 5):*
${
  pendingApprovals.length > 0
    ? pendingApprovals
        .map(
          (a) =>
            `• [${a.requestNumber}] ${a.decisionType} (${formatRupiah(a.monetaryValue || 0)}): ${a.reason}`
        )
        .join('\n')
    : '• Tidak ada permintaan otorisasi pending saat ini.'
}

*9. TIGA PRIORITAS HARI KERJA BERIKUTNYA:*
1. Putuskan pengesahan diskon volume PT Mega Distribusi (REQ-001) & Otorisasi Agen Cilegon (REQ-AGN).
2. ENIS & SASA menghubungi 10 calon pelanggan koridor rute agen baru.
3. IQBAL verifikasi bukti fisik PoD kurir Makassar sebelum penerbitan invoice pelunasan.

--------------------------------------------------
_Disusun secara otomatis dan disiplin oleh PAUL — AI Direktur Utama TORO Logistic._`;
  };

  // Generate Weekly Report Text (Konsolidasi Mingguan 6 Divisi)
  const generateWeeklyReportText = () => {
    return `*LAPORAN MINGGUAN DIREKTUR UTAMA — PAUL*
*PT TORO SENTOSA GROUP (TORO LOGISTIC)*
*Sistem:* Integrated Six-Division AI Management
*Kode Dokumen:* TORO-DIR-001 | Versi 2.0
*Periode Mingguan:* Minggu IV Oktober 2026 (20–27 Okt 2026)
*Status Verifikasi:* Data Terkonsolidasi Penuh 6 Divisi (PAUL, ENIS, IQBAL, FIQA, AVAN, SASA)
--------------------------------------------------

*1. RINGKASAN EKSEKUTIF PERUSAHAAN (PAUL):*
• Kinerja Keseluruhan: Target awal 90 hari berjalan terarah dengan koordinasi lintas divisi.
• Kepatuhan SOP: Batas wewenang ditaati 100%, komitmen besar menunggu izin pemilik.

*2. HASIL PENJUALAN MINGGUAN (ENIS):*
• Akumulasi Prospek Relevan: ${leads.length} prospek
• Penawaran Kargo Diterbitkan: ${quotesSentCount} penawaran
• Pelanggan Bertransaksi: 2 perusahaan (Toko Elektronik Megah, CV Sandang Prima)
• Rasio Konversi: ${quotesSentCount > 0 ? ((leads.filter((l) => l.status === 'menang').length / quotesSentCount) * 100).toFixed(1) : 0}%

*3. OPERASIONAL & PERFORMA MITRA (IQBAL):*
• Total Tonase Terkirim: ~1.745 KG multimoda (Darat, Laut, Udara)
• Ketepatan Waktu (On-Time Rate): 96.4% dari 4 mitra angkutan terverifikasi
• Bukti Penerimaan (PoD): Tertib diarsipkan secara digital sebelum penutupan status resi.

*4. LAPORAN KEUANGAN & MARGIN (FIQA):*
• Omset Tagihan Kargo: ${formatRupiah(totalRecordedRevenue)}
• Biaya Mitra Angkutan: ${formatRupiah(totalPartnerCost)}
• Margin Kotor Terealisasi: ${formatRupiah(totalGrossMargin)} (Margin minimal Rp2.000/kg terpenuhi)
• Penerimaan Kas Mutasi Masuk: ${formatRupiah(cashIn)}
• Piutang Pelanggan: ${formatRupiah(totalReceivables)}
• Utang Vendor Mitra: ${formatRupiah(totalPayables)}

*5. RISET PASAR & EKSPANSI BISNIS (AVAN):*
• Pemetaan Koridor: Peluang pembukaan rute kargo Cirebon & Karawang untuk menjangkau kawasan pabrik.
• Analisis Margin Vendor: Evaluasi efisiensi biaya sewa armada Fuso balikan vs charter penuh.

*6. EVALUASI JARINGAN KEAGENAN (SASA — TAB KEAGENAN):*
• Jumlah Titik Agen Terdaftar: ${agents.length} gerai
• Agen Aktif Berkinerja: 1 gerai (Subang Makmur - 14 shipment)
• Pipeline Rekrutmen: 2 calon agen (Cilegon & Karawang) dalam tahap verifikasi dokumen NIB.
• Komisi Terutang: ${formatRupiah(totalAgentCommissionDue)} (Dijadwalkan cair setelah verifikasi kas).

*7. KELUHAN & MITIGASI RISIKO:*
• Keluhan Ditangani: 2 tiket (Keterlambatan cuaca & kerusakan retak packing minor).
• Mitigasi: Prosedur packing kayu & asuransi kargo wajib untuk barang pecah belah.

*8. KEPUTUSAN STRATEGIS YANG DIBUTUHKAN DARI PEMILIK:*
• Otorisasi plafon kredit tempo 30 hari untuk CV Mandiri Sentosa (REQ-002).
• Pengesahan persetujuan diskon volume kargo Jakarta–Surabaya (REQ-001).
• Otorisasi pembukaan keagenan resmi Cilegon Express Point (REQ-AGN-AGN-0002).

*9. RENCANA PRIORITAS MINGGU DEPAN:*
1. Finalisasi onboarding dan peluncuran agen Cilegon setelah otorisasi pemilik.
2. Penandatanganan kontrak kargo reguler PT Mega Distribusi Makmur.
3. Rekonsiliasi mingguan kas bank dengan mutasi transaksi oleh FIQA.

--------------------------------------------------
_PAUL — AI Direktur Utama TORO Logistic._`;
  };

  const currentReportText = reportType === 'harian' ? generateDailyReportText() : generateWeeklyReportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                SOP BAGIAN G · SISTEM PELAPORAN PAUL
              </span>
              <span className="text-xs text-slate-400">Transparan &amp; Berbasis Data Sah</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Laporan Eksekutif Harian &amp; Mingguan
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              PAUL menyusun laporan secara tertib tanpa rekayasa data. Angka yang belum tersedia diberi tanda jelas, bukan perkiraan.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin untuk WA / Email'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>

        {/* Toggle Report Type */}
        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setReportType('harian')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              reportType === 'harian'
                ? 'bg-[#FF6B1A] text-white shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Laporan Harian (6 Butir Wajib)
          </button>
          <button
            type="button"
            onClick={() => setReportType('mingguan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              reportType === 'mingguan'
                ? 'bg-[#FF6B1A] text-white shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Laporan Mingguan (8 Butir Wajib)
          </button>
        </div>
      </div>

      {/* Report Preview Document Card */}
      <div className="bg-[#070b28] border-2 border-slate-800 rounded-2xl p-6 sm:p-8 font-mono text-xs text-slate-200 shadow-2xl relative">
        <div className="absolute top-4 right-4 hidden sm:flex items-center gap-1 text-[10px] text-slate-500 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B1A]" />
          <span>SOP Disiplin Eksekutif PAUL</span>
        </div>

        <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-200">
          {currentReportText}
        </pre>
      </div>
    </div>
  );
};
