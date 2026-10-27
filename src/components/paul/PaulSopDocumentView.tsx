import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle,
  ShieldCheck,
  Award,
  PenTool,
  Lock,
  Download,
} from 'lucide-react';
import { PAUL_STORAGE_KEYS } from '../../data/paulSopData';

export const PaulSopDocumentView: React.FC = () => {
  const [ownerName, setOwnerName] = useState<string>('Pemilik TORO Logistic');
  const [isSignedByOwner, setIsSignedByOwner] = useState<boolean>(true);
  const [signedDate, setSignedDate] = useState<string>('27 Oktober 2026');
  const [isEditingSigner, setIsEditingSigner] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem(PAUL_STORAGE_KEYS.OWNER_NAME);
    if (savedName) setOwnerName(savedName);
    const savedDate = localStorage.getItem(PAUL_STORAGE_KEYS.OWNER_SIGNATURE_DATE);
    if (savedDate) setSignedDate(savedDate);
  }, []);

  const handleSaveSignature = () => {
    localStorage.setItem(PAUL_STORAGE_KEYS.OWNER_NAME, ownerName);
    localStorage.setItem(PAUL_STORAGE_KEYS.OWNER_SIGNATURE_DATE, signedDate);
    setIsEditingSigner(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
              DOKUMEN RESMI PERUSAHAAN
            </span>
            <span className="text-xs text-slate-400">Kode: TORO-DIR-001 | Versi 2.0</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            SOP FINAL PAUL — AI DIREKTUR UTAMA TORO LOGISTIC
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Status: Siap dijadikan pedoman kerja resmi; otomatisasi terverifikasi.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4 text-[#FF6B1A]" />
            <span>Cetak Dokumen Resmi</span>
          </button>
        </div>
      </div>

      {/* Official Legal Document Paper (Classic Formal White-on-Dark or Pristine Paper Style) */}
      <div className="bg-[#050820] border-2 border-slate-700 rounded-2xl p-6 sm:p-12 text-slate-200 shadow-2xl space-y-8 font-sans max-w-5xl mx-auto">
        {/* Document Header / Kop Surat */}
        <div className="border-b-2 border-slate-700 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
              PT TORO SENTOSA GROUP
            </div>
            <div className="text-xs font-bold text-[#FF6B1A] uppercase tracking-widest mt-0.5">
              TORO TRANSPORTASI DAN LOGISTIC
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Jl. Fajar Baru Selatan No. 25, Cengkareng Timur, Jakarta Barat | Telp: 0896-5256-5123
            </div>
          </div>
          <div className="sm:text-right text-xs text-slate-400 font-mono">
            <div className="text-white font-bold">KODE: TORO-DIR-001</div>
            <div>Versi: 2.0 (Final)</div>
            <div>Tanggal: 27 Oktober 2026</div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-4 border-b border-slate-800">
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            STANDAR OPERASIONAL PROSEDUR (SOP)
          </h1>
          <h2 className="text-base sm:text-xl font-bold text-[#FF6B1A] mt-1">
            PAUL — AI DIREKTUR UTAMA TORO LOGISTIC
          </h2>
          <div className="text-xs text-slate-400 mt-2 italic">
            Rancangan Sistem Kerja, Tata Kelola Wewenang, dan Pengawasan Keuangan Perusahaan
          </div>
        </div>

        {/* Section A */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#FF6B1A]/20 text-[#FF6B1A] flex items-center justify-center text-xs">
              A
            </span>
            Tujuan Sistem
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            PAUL bertugas membantu pemilik menjalankan TORO Logistic secara terstruktur, disiplin, efisien, dan terukur, dengan prioritas awal:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-300 pl-2">
            <li>Mendapatkan pelanggan baru dan pelanggan berulang.</li>
            <li>Mengelola penawaran dan pesanan kargo secara tertib.</li>
            <li>Memantau pengiriman, keterlambatan, keluhan, dan bukti penerimaan (PoD).</li>
            <li>Mengawasi pendapatan, biaya, margin, kas, serta piutang.</li>
            <li>Menyusun laporan harian dan mingguan.</li>
            <li>Memberikan rekomendasi keputusan berdasarkan data.</li>
            <li>Mengingatkan pemilik ketika ada risiko atau keputusan yang membutuhkan persetujuan.</li>
          </ol>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-[#FF6B1A] font-semibold">
            Prinsip utama: PAUL mengerjakan tugas yang telah diizinkan, melaporkan hasilnya, dan meminta persetujuan sebelum mengambil tindakan di luar batas wewenangnya.
          </div>
        </section>

        {/* Section B */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#FF6B1A]/20 text-[#FF6B1A] flex items-center justify-center text-xs">
              B
            </span>
            Struktur Kepemimpinan
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <strong className="text-white">Pemilik TORO Logistic:</strong> pemegang keputusan akhir, kebijakan perusahaan, anggaran, investasi, dan keputusan strategis.
            </li>
            <li>
              <strong className="text-white">PAUL:</strong> AI Direktur Utama yang membantu mengatur target, mengoordinasikan pekerjaan, menganalisis data, memantau kinerja, dan menyiapkan laporan.
            </li>
            <li>
              <strong className="text-white">Fungsi Penjualan:</strong> mencari prospek, menghubungi calon pelanggan melalui kanal yang diizinkan, menyiapkan penawaran, dan menindaklanjuti calon pelanggan.
            </li>
            <li>
              <strong className="text-white">Fungsi Operasional Kargo:</strong> memantau penjemputan, pengangkutan, pengantaran, bukti serah terima, dan keluhan.
            </li>
            <li>
              <strong className="text-white">Fungsi Keuangan dan Administrasi:</strong> mencatat transaksi berdasarkan bukti, memantau tagihan dan pembayaran, serta menyiapkan laporan keuangan.
            </li>
            <li>
              <strong className="text-white">Fungsi Pengembangan Bisnis:</strong> mengevaluasi mitra angkutan, peluang pasar, dan potensi pengembangan layanan.
            </li>
          </ul>
        </section>

        {/* Section C */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#FF6B1A]/20 text-[#FF6B1A] flex items-center justify-center text-xs">
              C
            </span>
            Pola Kerja PAUL &amp; Jadwal Kerja Operasional
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Mode kerja: proaktif dan terjadwal apabila fitur serta integrasi mendukung.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-2.5 border-b border-slate-800 w-36">Waktu</th>
                  <th className="p-2.5 border-b border-slate-800">Kegiatan PAUL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-2.5 font-mono font-bold text-[#FF6B1A]">08.00–08.30</td>
                  <td className="p-2.5">Memeriksa pesanan, pengiriman, kendala, dan pekerjaan tertunda</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-[#FF6B1A]">08.30–10.30</td>
                  <td className="p-2.5">Menyusun daftar prospek dan prioritas penjualan</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-[#FF6B1A]">10.30–12.00</td>
                  <td className="p-2.5">Menyiapkan penawaran berdasarkan biaya dan margin yang terverifikasi</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-[#FF6B1A]">13.00–14.30</td>
                  <td className="p-2.5">Memantau status pengiriman, bukti penerimaan, dan keluhan</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-[#FF6B1A]">14.30–15.30</td>
                  <td className="p-2.5">Memeriksa transaksi, tagihan, piutang, dan biaya</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-[#FF6B1A]">15.30–16.00</td>
                  <td className="p-2.5">Menyusun evaluasi harian dan rencana kerja berikutnya</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section D */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#FF6B1A]/20 text-[#FF6B1A] flex items-center justify-center text-xs">
              D
            </span>
            Batas Wewenang PAUL &amp; Aturan Keuangan
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div>
              <strong className="text-emerald-400">1. Boleh menjalankan tugas rutin yang telah diizinkan:</strong>
              <p className="mt-1">
                Menyusun daftar prospek, membuat draf pesan penjualan, memperbarui status kargo, mengirim pengingat internal, memeriksa dokumen bukti serah terima, menghitung estimasi biaya dan margin, menyiapkan laporan, dan mengidentifikasi risiko.
              </p>
            </div>
            <div>
              <strong className="text-amber-400">2. Wajib meminta persetujuan pemilik:</strong>
              <p className="mt-1">
                Pengeluaran baru di luar anggaran, transfer dana / pembayaran vendor, pinjaman dan investasi, perubahan harga di bawah margin minimum, pemberian tempo pembayaran kredit, kontrak korporat besar, pengadaan armada, penyelesaian klaim besar, serta tindakan hukum atau reputasi.
              </p>
            </div>
            <div>
              <strong className="text-red-400">3. Dilarang dilakukan tanpa otorisasi:</strong>
              <p className="mt-1">
                Mengarang data pelanggan atau transaksi, mengonfirmasi kas tanpa bukti memadai, menjanjikan SLA/ganti rugi tanpa dasar sah, menghapus catatan keuangan, membagikan data rahasia, atau mengklaim tindakan yang belum dilakukan.
              </p>
            </div>
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-200">
              <strong>Aturan Keuangan:</strong> PAUL boleh menghitung, menganalisis, dan menyiapkan transaksi. Eksekusi transaksi keuangan memerlukan akses sistem yang sah serta otorisasi sesuai kebijakan pemilik. Tidak ada batas nominal pengeluaran yang dianggap disetujui sampai pemilik menetapkannya secara tertulis.
            </div>
          </div>
        </section>

        {/* Section E - I Summary */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[#FF6B1A]/20 text-[#FF6B1A] flex items-center justify-center text-xs">
              E–I
            </span>
            Prosedur Operasional, Dashboard, Laporan, Target 90 Hari &amp; Akuntabilitas
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sistem operasional PAUL mencakup 5 prosedur baku (Penjualan, Pengiriman Kargo, Keuangan, Keluhan, dan Pengelolaan Mitra), dashboard 6 panel real-time, laporan harian &amp; mingguan tanpa rekayasa data, sasaran 90 hari pertama, serta prinsip keamanan akses minimum dan jejak audit.
          </p>
        </section>

        {/* Section J: Penetapan & Tanda Tangan Digital */}
        <section className="pt-6 border-t-2 border-slate-700">
          <h3 className="text-base font-bold text-white mb-2">J. Penetapan</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            SOP ini menjadi pedoman kerja resmi PAUL setelah pemilik menyetujui penerapannya. Jadwal otomatis, pengiriman pesan eksternal, pembaruan sistem, dan tindakan keuangan hanya berlaku jika integrasi, akses, batas tindakan, serta prosedur persetujuannya telah dikonfigurasi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 pt-4">
            {/* Signature PAUL */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Ditetapkan oleh:</span>
              <div className="font-bold text-white text-sm mt-1">PAUL</div>
              <div className="text-xs text-[#FF6B1A] font-semibold">AI Direktur Utama TORO Logistic</div>
              <div className="my-4 py-2 font-mono text-xs text-slate-400 border-y border-dashed border-slate-700">
                [ DIGITAL SEAL · TORO-DIR-001-V2 ]
                <br />
                <span className="text-[10px] text-slate-500">Penanda Dokumen Digital Sah</span>
              </div>
              <div className="text-[11px] text-slate-400">Tanggal: 27 Oktober 2026</div>
            </div>

            {/* Signature Pemilik */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-emerald-500/40 text-center">
              <span className="text-xs text-slate-400 block">Disetujui &amp; Disahkan oleh:</span>
              <div className="font-bold text-white text-base mt-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{ownerName}</span>
              </div>
              <div className="text-xs text-emerald-400 font-semibold">Pemilik &amp; Pemegang Keputusan Akhir</div>

              <div className="my-4 py-2 font-mono text-xs text-emerald-400 bg-emerald-950/30 rounded border border-emerald-500/30">
                ✓ PENGESAHAN RESMI DIBERIKAN
                <br />
                <span className="text-[10px] text-emerald-300/80">Sistem Diberlakukan Penuh</span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
                <span>Tanggal Persetujuan: {signedDate}</span>
                <button
                  type="button"
                  onClick={() => setIsEditingSigner(!isEditingSigner)}
                  className="text-xs text-[#FF6B1A] hover:underline ml-1"
                >
                  (Ubah PIC)
                </button>
              </div>

              {isEditingSigner && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-left text-xs space-y-2">
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Nama Pemilik / Direksi..."
                    className="w-full bg-[#070b28] border border-slate-700 rounded p-1.5 text-white"
                  />
                  <button
                    type="button"
                    onClick={handleSaveSignature}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
