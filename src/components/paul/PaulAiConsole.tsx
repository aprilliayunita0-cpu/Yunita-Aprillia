import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  Truck,
  RotateCcw,
} from 'lucide-react';
import {
  OwnerApprovalRequest,
  PaulLead,
  PaulShipment,
  PaulFinancialTransaction,
} from '../../data/paulSopData';
import { formatRupiah } from '../../utils/toroCalculators';

interface PaulAiConsoleProps {
  approvals: OwnerApprovalRequest[];
  leads: PaulLead[];
  shipments: PaulShipment[];
  transactions: PaulFinancialTransaction[];
}

interface Message {
  id: string;
  sender: 'user' | 'paul';
  text: string;
  timestamp: string;
  badge?: string;
}

export const PaulAiConsole: React.FC<PaulAiConsoleProps> = ({
  approvals,
  leads,
  shipments,
  transactions,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'paul',
      text: `Selamat datang, Pemilik TORO Logistic. Saya PAUL, AI Direktur Utama TORO Logistic yang bertugas berdasarkan SOP TORO-DIR-001 Versi 2.0.

Saya siap membantu Anda memantau ritme operasional, mengevaluasi profitabilitas penawaran kargo, memeriksa bukti Proof of Delivery (PoD), mengaudit arus kas, atau memberikan analisis keputusan strategis.

Ada 1 permintaan persetujuan penting (REQ-001: Diskon volume PT Mega Distribusi) yang membutuhkan keputusan tertulis Anda hari ini. Apa arahan Anda selanjutnya?`,
      timestamp: 'Hari ini, 08:30 WIB',
      badge: 'SOP TORO-DIR-001 Aktif',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Struktur 6 Kepala Divisi AI TORO Logistic',
    'Alur kerja Tab KEAGENAN (SASA) 21 Kolom',
    'Bisa dilakukan dalam percakapan vs memerlukan integrasi?',
    'Urutan 6 langkah implementasi aktivasi PAUL',
    'Apakah REQ-001 (Diskon PT Mega Distribusi) layak disetujui?',
    'Audit margin dan arus kas masuk vs piutang saat ini',
    'Arti tanda “—” pada rancangan dashboard',
    'Buat draf WhatsApp tindak lanjut untuk prospek prioritas',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('6 divisi') || lower.includes('struktur organisasi') || lower.includes('enis') || lower.includes('iqbal') || lower.includes('fiqa') || lower.includes('avan') || lower.includes('enam divisi')) {
        reply = `*TORO LOGISTIC — INTEGRATED SIX-DIVISION AI MANAGEMENT*
Sistem manajemen AI terkoordinasi di bawah otoritas mutlak Pemilik Perusahaan:

1. *PAUL — AI Direktur Utama & Koordinator Utama:*
   Mengatur target, mengoordinasikan Enis, Iqbal, Fiqa, Avan, Sasa, dan menyusun laporan terpadu kepada Pemilik.

2. *ENIS — Kepala Penjualan:*
   Mencari prospek, follow-up klien industri, menyiapkan materi penawaran, dan menyelaraskan basis pelanggan dengan SASA.

3. *IQBAL — Kepala Operasional Kargo:*
   Memantau armada darat/laut/udara, uji kelayakan rute pickup agen, dan verifikasi mutlak bukti serah terima (PoD sah).

4. *FIQA — Kepala Keuangan & Administrasi:*
   Pencatatan kas riil, pengujian batas margin minimal Rp2.000/kg, audit usulan komisi agen, dan rekonsiliasi piutang.

5. *AVAN — Kepala Pengembangan Bisnis:*
   Pemetaan peluang koridor pasar kargo, evaluasi mitra vendor transportasi, dan riset pembukaan jaringan rute baru.

6. *SASA — Kepala Divisi Keagenan:*
   Perekrutan dan pengelolaan jaringan agen di Google Sheets Tab KEAGENAN (21 kolom), evaluasi kinerja, dan komisi.

*Pemilik TORO Logistic:* Pemegang keputusan akhir mutlak atas komitmen finansial besar, kontrak, komisi, dan kebijakan strategis.`;
      } else if (lower.includes('keagenan') || lower.includes('sasa') || lower.includes('21 kolom') || lower.includes('agen')) {
        reply = `*Pusat Data Bersama: Tab KEAGENAN (21 Kolom Google Sheets)*
Dikelola oleh SASA bersama IQBAL & FIQA:

*Daftar 21 Kolom Standar:*
1. ID Agen (e.g. AGN-0001)
2. Tanggal Masuk
3. Nama Agen
4. Nama Usaha
5. Wilayah
6. Kontak Bisnis
7. Rute Layanan
8. Kapasitas
9. Status Pendekatan (Pemetaan, Pendekatan, Verifikasi, Otorisasi, Aktif)
10. Status Verifikasi (Sedang Diverifikasi, Lolos Dokumen, Terverifikasi Sah)
11. Dokumen (KTP, NIB, NPWP, Foto Ruko)
12. Usulan Komisi (e.g. 15% omset atau Rp500/kg)
13. Status Persetujuan Pemilik (Wajib paraf sebelum aktif)
14. Tanggal Aktivasi
15. Jumlah Pengiriman (Tersambung ID Pengiriman)
16. Biaya (Rp)
17. Komisi Terutang (Tersambung ID Transaksi)
18. Keluhan
19. PIC (SASA / IQBAL / FIQA / AVAN / PAUL)
20. Tindak Lanjut
21. Tanggal Evaluasi + Catatan

*Aturan Integritas Keagenan:*
• Calon agen tidak boleh dianggap aktif sebelum izin resmi pemilik disahkan.
• Komisi hanya dihitung dari transaksi riil yang memiliki bukti dan PoD sah.`;
      } else if (lower.includes('bisa dilakukan') || lower.includes('percakapan vs') || lower.includes('memerlukan integrasi')) {
        reply = `*Klasifikasi Kapabilitas & Batasan Eksekusi PAUL:*

1. *Bisa Dilakukan dalam Percakapan (Langsung di Chat AI):*
• Menyusun strategi penjualan kargo & rute prioritas.
• Membuat draf penawaran resmi (Quotation) untuk prospek.
• Menghitung margin dari data yang diberikan (misal standar Rp2.000/KG).
• Menganalisis risiko pengiriman rute, armada, dan vendor.
• Membuat format dashboard & skema basis data spreadsheet.
• Menyiapkan laporan harian & mingguan berdasarkan data yang tersedia.

2. *Memerlukan Integrasi (API, Webhook & Fitur Terjadwal):*
• Mengambil data transaksi otomatis dari bank/pembukuan.
• Membaca status pengiriman live dari sistem ekspedisi / GPS armada.
• Memperbarui spreadsheet atau database CRM secara otomatis.
• Mengirim pesan WhatsApp kepada pelanggan secara terprogram.
• Mengirimkan laporan harian otomatis pada pukul 16.00 WIB.
_Semua bergantung pada aplikasi, izin, dan fitur yang tersedia._

3. *Memerlukan Persetujuan Pemilik (Otorisasi Tertulis):*
• Keputusan keuangan besar, investasi, pinjaman, pembelian armada.
• Pembayaran vendor yang memerlukan otorisasi transfer bank.
• Kontrak penting korporat & kerja sama strategis jangka panjang.
• Pemberian kredit atau tempo (Term of Payment) pelanggan.
• Perubahan kebijakan harga & diskon di bawah margin batas.
_Prinsip: PAUL menyiapkan analisis serta rekomendasi, tetapi tidak memutuskan sendiri!_`;
      } else if (lower.includes('langkah') || lower.includes('roadmap') || lower.includes('urutan implementasi') || lower.includes('aktivasi')) {
        reply = `*Urutan 6 Langkah Implementasi untuk Mengaktifkan PAUL Secara Penuh:*

*Langkah 1 — Basis Data Terpadu:*
Buat satu sumber data tunggal (Single Source of Truth) untuk pelanggan, penawaran, pesanan, pengiriman, biaya, dan pembayaran agar tidak ada selisih angka.

*Langkah 2 — Dashboard Spreadsheet Awal:*
Mulai dengan spreadsheet (Google Sheets / Excel) agar Pemilik bisa melihat angka seketika tanpa harus menunggu aplikasi besar selesai.

*Langkah 3 — Laporan Terjadwal:*
Tentukan jam laporan harian (rekomendasi: 15.30–16.00 WIB) dan mingguan, lalu aktifkan melalui fitur penjadwalan teratur.

*Langkah 4 — Integrasi Operasional:*
Sambungkan kanal komunikasi (WhatsApp API / Webhook resmi) dan sumber status pengiriman yang benar-benar digunakan TORO Logistic.

*Langkah 5 — Otorisasi & Hak Akses:*
Tetapkan siapa yang berhak membaca, mengubah, mengirim, dan menyetujui setiap jenis tindakan. Pemilik memegang persetujuan mutlak untuk keuangan & kredit.

*Langkah 6 — Uji Coba (Sandbox Mode):*
Jalankan dahulu dalam mode uji, periksa hasil perhitungan margin dan laporan, lalu aktifkan tindakan otomatis secara bertahap.

_Anda dapat memeriksa panduan lengkap dan mengunduh template CSV pada tab 'Roadmap & Integrasi (6 Langkah)'._`;
      } else if (lower.includes('tanda “—”') || lower.includes('tanda -') || lower.includes('arti tanda') || lower.includes('rancangan')) {
        reply = `*Penjelasan Prinsip Integritas Data Dashboard PAUL:*

Pada rancangan dashboard sederhana (PAUL Control Center · Status Menunggu Integrasi):
• Prospek hari ini: *—* (Menunggu data CRM)
• Pengiriman aktif: *—* (Menunggu data operasional)
• Margin kotor: *—* (Belum dihitung dari transaksi)
• Persetujuan pemilik: *—* (Belum terhubung ke alur persetujuan)

*Prinsip Mutlak PAUL:*
*Tanda “—” berarti belum ada data yang terhubung, BUKAN berarti nilainya nol.*
Sebagai AI Direktur Utama yang berintegritas, PAUL dilarang mengarang data atau mengisi angka dengan perkiraan seolah-olah fakta riil. Angka baru akan tampil setelah sumber data terverifikasi sah.`;
      } else if (lower.includes('req-001') || lower.includes('diskon') || lower.includes('mega distribusi')) {
        reply = `*Analisis Keputusan Eksekutif PAUL mengenai REQ-001:*

1. *Fakta Data:*
• Permintaan: Diskon tarif kargo rute Jakarta–Surabaya dari tarif normal Rp5.500/kg menjadi Rp4.900/kg (Margin turun dari Rp2.000/kg menjadi Rp1.400/kg).
• Komitmen Volume: 5 ton/minggu atau 20 ton/bulan (Proyeksi omset ~Rp98.000.000–Rp110.000.000/bulan).
• Biaya Vendor (PT Jaya Express): Rp3.500/kg (Darat CDD).

2. *Evaluasi Profitabilitas:*
• Pada margin Rp1.400/kg dengan volume 20.000 kg, TORO tetap membukukan Laba Kotor Rp28.000.000/bulan dari 1 klien ini.
• Risiko: Margin per kg tergerus 30%.
• Manfaat: Mengamankan muatan reguler dan utilisasi rute kembali Trans Jawa.

3. *Rekomendasi PAUL:*
*LAYAK DISETUJUI BERSYARAT*.
Syarat yang wajib dimasukkan ke klausul kontrak:
a. Minimal kontrak terikat 3 bulan.
b. Jika volume bulanan di bawah 15 ton, tarif otomatis kembali ke normal (Rp5.500/kg).
c. Syarat pembayaran DP 50% atau maksimal TOP 14 hari kalender.

Silakan klik 'Beri Otorisasi' pada Panel 5 jika Anda menyetujui rekomendasi ini.`;
      } else if (lower.includes('pod') || lower.includes('pengiriman') || lower.includes('resi') || lower.includes('status')) {
        const withPod = shipments.filter((s) => s.hasProofOfDelivery).length;
        const noPod = shipments.filter((s) => !s.hasProofOfDelivery).length;
        const delayed = shipments.filter((s) => s.isDelayed).length;

        reply = `*Laporan Pengiriman & Disiplin Bukti Penerimaan (PoD):*

• Total Pengiriman Terdata: ${shipments.length} pengiriman
• Pengiriman Selesai dengan PoD Sah: ${withPod} resi (Contoh: TR-665123-BDO tujuan Bandung)
• Menunggu Upload/Verifikasi PoD: ${noPod} resi
• Keterlambatan: ${delayed} resi (TR-551092-BPN tujuan Balikpapan karena ombak tinggi Laut Jawa)

*Peringatan SOP PAUL Prosedur 2:*
Saya menolak menyatakan resi TR-990212-MKS (Makassar) sebagai 'Selesai' sampai fisik foto tanda tangan dan stempel toko penerima diunggah dan diverifikasi. Ini melindungi hak penagihan invoice TORO dari klaim sepihak.`;
      } else if (lower.includes('kas') || lower.includes('keuangan') || lower.includes('margin') || lower.includes('piutang')) {
        const totalRev = transactions.filter((t) => t.type === 'Pendapatan').reduce((sum, t) => sum + t.amount, 0);
        const cashIn = transactions.filter((t) => t.type === 'Kas Masuk' && t.hasDocumentProof).reduce((sum, t) => sum + t.amount, 0);
        const piutang = transactions.filter((t) => t.paymentStatus === 'Belum Dibayar (Piutang)').reduce((sum, t) => sum + t.amount, 0);
        const margin = shipments.reduce((sum, s) => sum + s.grossMargin, 0);

        reply = `*Audit Keuangan Berdasarkan Bukti Sah (Prinsip Section D & E SOP):*

1. *Pendapatan Invoiced:* ${formatRupiah(totalRev)} (Tagihan keluar)
2. *Kas Masuk Riil (Bukti Bank Sah):* ${formatRupiah(cashIn)} (Mutasi BCA terverifikasi)
3. *Piutang Pelanggan:* ${formatRupiah(piutang)} (Jatuh tempo dlm 7 hari)
4. *Total Margin Kotor Terkunci:* ${formatRupiah(margin)}

*Catatan Integritas PAUL:*
Nilai invoice ${formatRupiah(totalRev)} TIDAK dianggap sebagai uang masuk sampai rekening TORO menerima transfer sah. Saya telah menjadwalkan pengingat pembayaran sopan untuk CV Indo Berkah Mandiri pada H-2 jatuh tempo.`;
      } else if (lower.includes('whatsapp') || lower.includes('prospek') || lower.includes('draf')) {
        reply = `*Draf Pesan WhatsApp Tindak Lanjut untuk CV. Agro Lestari Makmur (Prioritas Tinggi):*

"Selamat siang Ibu Ratna Dewi (CV Agro Lestari Makmur), salam dari PAUL — AI Direktur Utama TORO Transportasi & Logistic.

Menindaklanjuti rencana distribusi pupuk organik 5–8 Ton rute Jakarta ke Lampung dan Palembang, tim operasional kami telah memvalidasi ketersediaan armada Truk Fuso Bak Terpal dan Kontainer LCL.

Kami memberikan penawaran efisiensi rute penyeberangan Merak-Bakauheni dengan estimasi tiba 2–3 hari kerja dan jaminan bukti serah terima (PoD) fisik dan digital.

Apakah berkenan kami kirimkan surat penawaran harga resmi (Quotation) lengkap dengan rincian biaya penjemputannya hari ini?"

_Draf ini mematuhi standar komunikasi profesional TORO Logistic tanpa menjanjikan hal di luar kapasitas._`;
      } else {
        reply = `*Instruksi Diterima oleh PAUL:*
"${text}"

Saya telah mencatat arahan Anda dalam log evaluasi eksekutif hari ini. Sebagai AI Direktur Utama yang berpegang pada SOP TORO-DIR-001:
• Saya akan mengoordinasikan eksekusi operasional sesuai batas wewenang rutin.
• Jika arahan ini melibatkan komitmen biaya baru, transfer rekening, perubahan syarat kredit, atau kebijakan diskon, saya akan menyiapkan lembar telaah risiko untuk otorisasi tertulis Anda di Panel 5.

Ada detail tambahan yang ingin Anda instruksikan terkait ritme hari kerja ini?`;
      }

      const paulMsg: Message = {
        id: `paul-${Date.now()}`,
        sender: 'paul',
        text: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        badge: 'Respon Resmi AI Direktur Utama',
      };

      setMessages((prev) => [...prev, paulMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'm-1',
        sender: 'paul',
        text: `Selamat datang kembali, Pemilik TORO Logistic. Sesi percakapan telah disegarkan. Saya siap menerima arahan strategis Anda berdasarkan SOP TORO-DIR-001.`,
        timestamp: 'Hari ini',
        badge: 'SOP TORO-DIR-001 Aktif',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                KONSOL INTERAKTIF DIREKTUR UTAMA
              </span>
              <span className="text-xs text-slate-400">Komunikasi Langsung Pemilik &amp; PAUL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Konsol Asisten Eksekutif PAUL
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Berikan arahan, konsultasikan risiko penawaran kargo, minta simulasi profitabilitas rute, atau buat draf korespondensi pelanggan sesuai tata kelola SOP TORO-DIR-001.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Segarkan Sesi</span>
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 bg-[#070b28] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#FF6B1A]" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-[#070b28] border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#FF6B1A] text-white shadow-md shadow-orange-500/20'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${m.sender === 'user' ? 'justify-end' : ''}`}>
                  <span className="font-bold text-slate-300">
                    {m.sender === 'user' ? 'Pemilik TORO Logistic' : 'PAUL — AI Direktur Utama'}
                  </span>
                  <span>· {m.timestamp}</span>
                  {m.badge && (
                    <span className="px-1.5 py-0.2 bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30 rounded text-[9px] font-semibold">
                      {m.badge}
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-[#0d143f] border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Bot className="w-4 h-4 text-[#FF6B1A] animate-spin" />
              <span>PAUL sedang menganalisis data operasional dan menyusun telaah...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ketik instruksi, pertanyaan operasional, atau arahan strategis untuk PAUL..."
            className="flex-1 bg-[#0b1033] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B1A]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="px-5 py-3 bg-[#FF6B1A] hover:bg-[#e0590e] disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-orange-950/40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Kirim Arahan</span>
          </button>
        </form>
      </div>
    </div>
  );
};
