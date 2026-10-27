import React, { useState } from 'react';
import {
  Users,
  Truck,
  DollarSign,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  FileCheck,
  Send,
  Calculator,
  ShieldAlert,
} from 'lucide-react';
import {
  PaulLead,
  PaulShipment,
  PaulFinancialTransaction,
  PaulComplaint,
  PaulCarrierPartner,
} from '../../data/paulSopData';
import { formatRupiah } from '../../utils/toroCalculators';

interface PaulProceduresViewProps {
  leads: PaulLead[];
  onUpdateLeads: (leads: PaulLead[]) => void;
  shipments: PaulShipment[];
  onUpdateShipments: (shipments: PaulShipment[]) => void;
  transactions: PaulFinancialTransaction[];
  onUpdateTransactions: (transactions: PaulFinancialTransaction[]) => void;
  complaints: PaulComplaint[];
  onUpdateComplaints: (complaints: PaulComplaint[]) => void;
  partners: PaulCarrierPartner[];
  onUpdatePartners: (partners: PaulCarrierPartner[]) => void;
}

export const PaulProceduresView: React.FC<PaulProceduresViewProps> = ({
  leads,
  onUpdateLeads,
  shipments,
  onUpdateShipments,
  transactions,
  onUpdateTransactions,
  complaints,
  onUpdateComplaints,
  partners,
  onUpdatePartners,
}) => {
  const [activeProcedure, setActiveProcedure] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Outreach message generator state for Prosedur 1
  const [selectedLeadForOutreach, setSelectedLeadForOutreach] = useState<PaulLead | null>(leads[0] || null);
  const [outreachCopied, setOutreachCopied] = useState(false);

  // New Complaint Form State for Prosedur 4
  const [showAddComplaint, setShowAddComplaint] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    customerName: '',
    orderNumber: '',
    issueType: 'Keterlambatan' as any,
    urgency: 'Tinggi' as any,
    description: '',
    proposedResolution: '',
  });

  // Calculate outreach message
  const generateOutreachText = (lead: PaulLead) => {
    return `Yth. Bpk/Ibu ${lead.contactPerson}
${lead.companyName}

Perkenalkan saya PAUL, AI Direktur Utama TORO Transportasi & Logistic (PT TORO SENTOSA GROUP).

Kami mencatat kebutuhan distribusi logistik untuk:
📦 Kargo: ${lead.cargoNeeds}
📍 Rute Minat: ${lead.routeInterest}
⚖️ Estimasi Volume: ${lead.estimatedVolume}

TORO Logistic melayani ekspedisi Multimoda (Darat, Laut, Udara & Kereta Api) serta Sewa Armada Truk (Pick Up hingga Wingbox 30 Ton) ke seluruh Indonesia.

Keunggulan kami:
1. Jaminan armada terverifikasi & surat jalan resmi
2. Pemantauan posisi pengiriman real-time (Cek Resi Online)
3. Garansi Proof of Delivery (PoD) fisik dan digital
4. Tarif kompetitif dengan standar margin transparan

Apakah berkenan kami buatkan estimasi penawaran resmi untuk kebutuhan kirim ${lead.companyName} minggu ini?

Terima kasih,
Salam hangat,
PAUL — AI Direktur Utama
PT TORO SENTOSA GROUP
WhatsApp: 0896-5256-5123 | marketing.torologistic@gmail.com`;
  };

  const handleCopyOutreach = () => {
    if (!selectedLeadForOutreach) return;
    const text = generateOutreachText(selectedLeadForOutreach);
    navigator.clipboard.writeText(text);
    setOutreachCopied(true);
    setTimeout(() => setOutreachCopied(false), 2000);
  };

  // Handle Add Complaint
  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const newComplaint: PaulComplaint = {
      id: `cmp-${Date.now()}`,
      ticketNumber: `CMP-TORO-00${complaints.length + 1}`,
      timestamp: `${new Date().toLocaleDateString('id-ID')}, ${new Date().toLocaleTimeString('id-ID')} WIB`,
      customerName: complaintForm.customerName,
      orderNumber: complaintForm.orderNumber,
      issueType: complaintForm.issueType,
      urgency: complaintForm.urgency,
      description: complaintForm.description,
      proposedResolution: complaintForm.proposedResolution,
      isEscalatedToOwner: complaintForm.urgency === 'Kritis' || complaintForm.issueType === 'Kerusakan Barang' || complaintForm.issueType === 'Barang Kurang / Hilang',
      status: complaintForm.urgency === 'Kritis' ? 'Menunggu Otorisasi Pemilik' : 'Dalam Penanganan',
    };

    onUpdateComplaints([newComplaint, ...complaints]);
    setShowAddComplaint(false);
    setComplaintForm({
      customerName: '',
      orderNumber: '',
      issueType: 'Keterlambatan',
      urgency: 'Tinggi',
      description: '',
      proposedResolution: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
            SOP BAGIAN E · 5 PROSEDUR OPERASIONAL RESMI
          </span>
          <span className="text-xs text-slate-400">Standard Operating Procedures (TORO-DIR-001)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
          Pedoman Eksekusi &amp; Ruang Kerja Operasional PAUL
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Setiap prosedur operasional memiliki alur tertib, parameter verifikasi ketat, dan batas eskalasi ke Pemilik. Pilih prosedur di bawah untuk melihat rincian langkah dan mengeksekusinya.
        </p>

        {/* Procedure Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5">
          <button
            type="button"
            onClick={() => setActiveProcedure(1)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeProcedure === 1
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A] shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-80">Prosedur 1</div>
            <div className="text-xs sm:text-sm font-black mt-0.5">Penjualan &amp; CRM</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveProcedure(2)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeProcedure === 2
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A] shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-80">Prosedur 2</div>
            <div className="text-xs sm:text-sm font-black mt-0.5">Pengiriman Kargo</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveProcedure(3)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeProcedure === 3
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A] shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-80">Prosedur 3</div>
            <div className="text-xs sm:text-sm font-black mt-0.5">Keuangan &amp; Margin</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveProcedure(4)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeProcedure === 4
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A] shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-80">Prosedur 4</div>
            <div className="text-xs sm:text-sm font-black mt-0.5">Keluhan &amp; Risiko</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveProcedure(5)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeProcedure === 5
                ? 'bg-[#FF6B1A] text-white border-[#FF6B1A] shadow-md shadow-orange-950/40'
                : 'bg-[#070b28] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-80">Prosedur 5</div>
            <div className="text-xs sm:text-sm font-black mt-0.5">Pengelolaan Mitra</div>
          </button>
        </div>
      </div>

      {/* =======================================================
          TAB 1: PROSEDUR 1 — PENJUALAN DAN PELANGGAN
          ======================================================= */}
      {activeProcedure === 1 && (
        <div className="space-y-6">
          <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Prosedur 1 — Penjualan dan Pengelolaan Prospek Pelanggan
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target harian: Menghubungi ~10 prospek relevan per hari kerja, mengirim 8–12 penawaran per minggu, dan membangun repeat order.
                </p>
              </div>
              <div className="text-xs font-semibold px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg">
                Status Pipeline: {leads.length} Prospek Terdaftar
              </div>
            </div>

            {/* Steps Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
              <div className="p-3 bg-[#070b28] rounded-xl border border-slate-800">
                <span className="font-bold text-[#FF6B1A]">Langkah 1 &amp; 2:</span>
                <p className="text-slate-300 mt-1">
                  Kumpulkan data prospek dari kanal resmi, kelompokkan berdasarkan jenis usaha, wilayah, dan potensi muatan.
                </p>
              </div>
              <div className="p-3 bg-[#070b28] rounded-xl border border-slate-800">
                <span className="font-bold text-[#FF6B1A]">Langkah 3 &amp; 4:</span>
                <p className="text-slate-300 mt-1">
                  Kirim pesan perkenalan resmi dan susun penawaran kargo setelah biaya vendor dan margin dihitung aman.
                </p>
              </div>
              <div className="p-3 bg-[#070b28] rounded-xl border border-slate-800">
                <span className="font-bold text-[#FF6B1A]">Langkah 5 &amp; 6:</span>
                <p className="text-slate-300 mt-1">
                  Catat jadwal kontak berikutnya. Tandai prospek yang butuh negosiasi atau keputusan harga khusus dari Pemilik.
                </p>
              </div>
              <div className="p-3 bg-[#070b28] rounded-xl border border-slate-800">
                <span className="font-bold text-[#FF6B1A]">Langkah 7:</span>
                <p className="text-slate-300 mt-1">
                  Klasifikasikan status: <em>belum merespons</em>, <em>perlu tindak lanjut</em>, <em>penawaran terkirim</em>, <em>menang</em>, atau <em>tidak jadi</em>.
                </p>
              </div>
            </div>

            {/* Interactive WhatsApp Outreach Generator */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Generator Draf Pesan Penjualan Resmi PAUL
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLeadForOutreach?.id || ''}
                    onChange={(e) => {
                      const found = leads.find((l) => l.id === e.target.value);
                      if (found) setSelectedLeadForOutreach(found);
                    }}
                    className="bg-[#070b28] border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5"
                  >
                    {leads.map((lead) => (
                      <option key={lead.id} value={lead.id}>
                        {lead.companyName} ({lead.contactPerson})
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleCopyOutreach}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{outreachCopied ? 'Tersalin!' : 'Salin Pesan'}</span>
                  </button>

                  {selectedLeadForOutreach && (
                    <a
                      href={`https://wa.me/62${selectedLeadForOutreach.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                        generateOutreachText(selectedLeadForOutreach)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim ke WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {selectedLeadForOutreach && (
                <div className="bg-[#070b28] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {generateOutreachText(selectedLeadForOutreach)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          TAB 2: PROSEDUR 2 — PENGIRIMAN KARGO & PoD
          ======================================================= */}
      {activeProcedure === 2 && (
        <div className="space-y-6">
          <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                Prosedur 2 — Pengiriman Kargo &amp; Validasi Proof of Delivery (PoD)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Alur ketat penjemputan, perjalanan kargo, dan larangan mutlak menyatakan selesai sebelum bukti PoD sah.
              </p>
            </div>

            {/* Strict Notice */}
            <div className="my-4 p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-xs text-red-200">
              <div className="font-bold text-red-300 text-sm mb-1 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Larangan Mutlak PAUL (Section E - Prosedur 2):
              </div>
              <p>
                "PAUL tidak boleh menyatakan barang telah diterima apabila bukti penerimaan belum tersedia atau belum diverifikasi. Bukti wajib memiliki tanda tangan penerima yang sah, tanggal terima, dan dokumentasi visual barang."
              </p>
            </div>

            {/* Shipments Audit Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070b28] text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">No. Resi</th>
                    <th className="py-2.5 px-3">Pelanggan &amp; Muatan</th>
                    <th className="py-2.5 px-3">Rute &amp; Moda</th>
                    <th className="py-2.5 px-3">Mitra Angkutan</th>
                    <th className="py-2.5 px-3">Status Perjalanan</th>
                    <th className="py-2.5 px-3">Verifikasi Bukti (PoD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {shipments.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#FF6B1A]">
                        {s.orderNumber}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{s.customerName}</div>
                        <div className="text-[11px] text-slate-400">{s.cargoType} ({s.weightKg} KG)</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-slate-200">Ke {s.destinationCity}</span>
                        <span className="block text-[11px] text-slate-400">{s.serviceMethod}</span>
                      </td>
                      <td className="py-2.5 px-3">{s.partnerName}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'Selesai'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : s.isDelayed
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {s.hasProofOfDelivery ? (
                          <div className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>PoD Sah ({s.podVerifiedAt})</span>
                          </div>
                        ) : (
                          <span className="text-yellow-400 text-[11px] flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Belum Ada PoD
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
      )}

      {/* =======================================================
          TAB 3: PROSEDUR 3 — KEUANGAN & MARGIN
          ======================================================= */}
      {activeProcedure === 3 && (
        <div className="space-y-6">
          <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                Prosedur 3 — Tata Kelola Keuangan, Pemisahan Kas vs Piutang, dan Audit Margin
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mencatat transaksi berdasarkan invoice &amp; bukti riil, menghitung margin kotor per trip, dan rekonsiliasi.
              </p>
            </div>

            <div className="my-4 p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
              <strong>Prinsip Akuntansi PAUL (Section E - Prosedur 3):</strong>
              <p className="mt-1">
                "PAUL tidak boleh menganggap nilai invoice sebagai uang yang sudah diterima. Pendapatan, penerimaan kas, piutang, dan laba harus dibedakan secara tegas."
              </p>
            </div>

            {/* Shipment Margin Breakdown */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Simulasi Laba Kotor per Pengiriman (Kalkulasi PAUL)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#070b28] text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Resi &amp; Pelanggan</th>
                      <th className="py-2.5 px-3">Berat Kargo</th>
                      <th className="py-2.5 px-3 text-right">Tarif Jual Pelanggan</th>
                      <th className="py-2.5 px-3 text-right">Biaya Mitra Vendor</th>
                      <th className="py-2.5 px-3 text-right">Margin Kotor (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Persentase Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {shipments.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3">
                          <span className="font-mono text-[#FF6B1A] font-bold">{s.orderNumber}</span>
                          <span className="block text-[11px] text-slate-400">{s.customerName}</span>
                        </td>
                        <td className="py-2.5 px-3">{s.weightKg} KG</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-white">
                          {formatRupiah(s.sellingPriceTotal)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-rose-400">
                          {formatRupiah(s.partnerCostTotal)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                          {formatRupiah(s.grossMargin)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-300">
                          {s.marginPercentage.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          TAB 4: PROSEDUR 4 — KELUHAN & RISIKO
          ======================================================= */}
      {activeProcedure === 4 && (
        <div className="space-y-6">
          <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Prosedur 4 — Penanganan Keluhan Pelanggan &amp; Manajemen Risiko
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mencatat waktu, nomor resi, masalah, dan opsi penyelesaian. Eskalasi otomatis ke Pemilik untuk klaim besar/kerusakan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddComplaint(true)}
                className="px-3 py-1.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                + Catat Tiket Keluhan
              </button>
            </div>

            {/* Active Complaints */}
            <div className="mt-4 space-y-3">
              {complaints.map((cmp) => (
                <div
                  key={cmp.id}
                  className={`p-4 rounded-xl border ${
                    cmp.urgency === 'Kritis'
                      ? 'bg-red-950/20 border-red-500/40'
                      : 'bg-[#070b28] border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#FF6B1A]">{cmp.ticketNumber}</span>
                      <span className="text-xs text-slate-400">· {cmp.timestamp}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cmp.urgency === 'Kritis'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        Urgensi: {cmp.urgency}
                      </span>
                      {cmp.isEscalatedToOwner && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          Diteruskan ke Pemilik
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-300 font-semibold">{cmp.status}</span>
                  </div>

                  <div className="mt-2 text-xs">
                    <div className="font-bold text-white">
                      {cmp.customerName} (Resi: {cmp.orderNumber}) · Masalah: {cmp.issueType}
                    </div>
                    <p className="text-slate-300 mt-1">{cmp.description}</p>
                    <div className="mt-2 p-2 bg-slate-900/60 rounded text-slate-300 text-[11px] border border-slate-800">
                      <strong className="text-emerald-400">Rekomendasi Penyelesaian PAUL:</strong> {cmp.proposedResolution}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Add Complaint */}
            {showAddComplaint && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#0b1033] border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl">
                  <h3 className="font-bold text-lg mb-4">Catat Keluhan Pelanggan Baru</h3>
                  <form onSubmit={handleCreateComplaint} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1">Nama Pelanggan *</label>
                      <input
                        type="text"
                        required
                        value={complaintForm.customerName}
                        onChange={(e) => setComplaintForm({ ...complaintForm, customerName: e.target.value })}
                        className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1">Nomor Resi / Pesanan *</label>
                        <input
                          type="text"
                          required
                          placeholder="TR-..."
                          value={complaintForm.orderNumber}
                          onChange={(e) => setComplaintForm({ ...complaintForm, orderNumber: e.target.value })}
                          className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">Tingkat Urgensi</label>
                        <select
                          value={complaintForm.urgency}
                          onChange={(e) => setComplaintForm({ ...complaintForm, urgency: e.target.value as any })}
                          className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                        >
                          <option value="Kritis">Kritis (Eskalasi ke Pemilik)</option>
                          <option value="Tinggi">Tinggi</option>
                          <option value="Sedang">Sedang</option>
                          <option value="Rendah">Rendah</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Jenis Masalah</label>
                      <select
                        value={complaintForm.issueType}
                        onChange={(e) => setComplaintForm({ ...complaintForm, issueType: e.target.value as any })}
                        className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                      >
                        <option value="Keterlambatan">Keterlambatan</option>
                        <option value="Kerusakan Barang">Kerusakan Barang</option>
                        <option value="Barang Kurang / Hilang">Barang Kurang / Hilang</option>
                        <option value="Ketidaksesuaian Tarif">Ketidaksesuaian Tarif</option>
                        <option value="Layanan Kurir">Layanan Kurir</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Uraian Masalah</label>
                      <textarea
                        required
                        rows={2}
                        value={complaintForm.description}
                        onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                        className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Opsi Solusi Rekomendasi PAUL</label>
                      <textarea
                        required
                        rows={2}
                        value={complaintForm.proposedResolution}
                        onChange={(e) => setComplaintForm({ ...complaintForm, proposedResolution: e.target.value })}
                        className="w-full bg-[#070b28] border border-slate-700 rounded-lg p-2.5 text-white"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddComplaint(false)}
                        className="px-3 py-2 text-slate-400 hover:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-bold rounded-lg"
                      >
                        Simpan Tiket
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =======================================================
          TAB 5: PROSEDUR 5 — PENGELOLAAN MITRA ANGKUTAN
          ======================================================= */}
      {activeProcedure === 5 && (
        <div className="space-y-6">
          <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                Prosedur 5 — Pengelolaan &amp; Evaluasi Kinerja Mitra Angkutan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Memeriksa legalitas, kapasitas armada, tarif, dan tingkat ketepatan waktu (On-Time Delivery Rate).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 bg-[#070b28] border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-white text-sm">{partner.partnerName}</div>
                      <div className="text-xs text-slate-400">
                        PIC: {partner.contactPerson} ({partner.phone})
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {partner.activeStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px]">Ketepatan Waktu</span>
                      <div className="font-bold text-emerald-400">{partner.onTimeRate}%</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Muatan Selesai</span>
                      <div className="font-bold text-white">{partner.completedShipments} Trip</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Rating Layanan</span>
                      <div className="font-bold text-amber-400">⭐ {partner.rating} / 5.0</div>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-300">
                    <span className="text-slate-500">Jenis Armada:</span> {partner.fleetTypes.join(', ')}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-300">
                    <span className="text-slate-500">Cakupan Rute:</span> {partner.serviceRoutes.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
