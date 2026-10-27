import React, { useState } from 'react';
import {
  Globe2,
  Ship,
  Plane,
  FileCheck2,
  CheckCircle2,
  MessageCircle,
  Truck,
  Warehouse,
  Boxes,
  FileText,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { SystemSettings, TORO_COMPANY_INFO } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl, recordImportInquiry, saveCustomerInquiry } from '../utils/toroCalculators';

interface ImportSectionProps {
  systemSettings: SystemSettings;
}

export const ImportSection: React.FC<ImportSectionProps> = ({ systemSettings }) => {
  // Form fields according to Section 16
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('China (Guangzhou / Yiwu / Shenzhen)');
  const [port, setPort] = useState('Guangzhou Port / Baiyun Airport');
  const [goodsType, setGoodsType] = useState('Mesin & Sparepart Industri');
  const [koli, setKoli] = useState('5');
  const [weight, setWeight] = useState('250');
  const [volume, setVolume] = useState('1.2');
  const [destination, setDestination] = useState('Jakarta (Gudang Penerima)');
  const [notes, setNotes] = useState('Perlu bantuan customs clearance & pengurusan izin undername');

  const importServices = [
    { title: 'Import Barang', desc: 'Pengiriman komoditas bisnis, consumer goods, dan bahan baku.' },
    { title: 'Import Cargo', desc: 'Penanganan kargo skala besar kontainer FCL & LCL.' },
    { title: 'Door to Door', desc: 'Layanan all-in terima beres dari gudang supplier luar negeri ke pintu Anda.' },
    { title: 'Port to Door', desc: 'Penerimaan kargo dari pelabuhan/bandara luar negeri hingga alamat tujuan.' },
    { title: 'Door to Port', desc: 'Pengangkutan dari pabrik supplier sampai ke pelabuhan/bandara Indonesia.' },
    { title: 'Pengurusan Dokumen', desc: 'Bantuan legalitas customs clearance, PIB, PEB, dan fasilitas undername.' },
    { title: 'Pengiriman Domestik', desc: 'Forwarding lanjutan ke seluruh kota di Indonesia setelah barang tiba.' },
    { title: 'Trucking & Distribusi', desc: 'Armada truk langsung angkut dari terminal kargo ke lokasi Anda.' },
    { title: 'Warehouse & Fulfillment', desc: 'Fasilitas penyimpanan sementara dan sortir sebelum distribusi.' },
  ];

  const handleSubmitQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    recordImportInquiry();
    saveCustomerInquiry({
      type: 'import',
      name,
      company,
      phone,
      details: {
        country,
        port,
        goodsType,
        koli,
        weight,
        volume,
        destination,
        notes,
      },
    });

    const url = generateDynamicWhatsAppUrl(
      'import',
      {
        name,
        company,
        country,
        port,
        goodsType,
        koli,
        weight,
        volume,
        destination,
        notes,
      },
      systemSettings
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="import" className="py-16 sm:py-24 bg-[#050820] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Sesuai Spesifikasi */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase mb-2">
            <Globe2 className="w-4 h-4" />
            <span>Forwarding &amp; Jasa Import Resmi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Layanan Import TORO
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-base">
            Solusi pengiriman dan penanganan barang import untuk kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: 9 Layanan Import */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0a0f2c] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A]" />
                <span>Cakupan Layanan Import TORO</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5 max-h-[520px] overflow-y-auto pr-1">
                {importServices.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#050820] rounded-2xl border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B1A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">{srv.title}</strong>
                      <span className="text-[11px] text-slate-400 leading-snug">{srv.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Legalitas Resmi PT TORO SENTOSA GROUP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Minta Quotation Lengkap Sesuai Section 16 */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0f2c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#FF6B1A]" />
                    <span>Formulir Permintaan Quotation Import</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Isi detail barang untuk mendapatkan penawaran resmi dari tim TORO
                  </p>
                </div>
                <span className="text-[10px] bg-[#FF6B1A]/20 text-[#FF6B1A] font-bold px-2 py-1 rounded">
                  Fast Response
                </span>
              </div>

              <form onSubmit={handleSubmitQuotation} className="space-y-4 text-xs">
                {/* Nama & Perusahaan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Bpk. Hendra"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Nama Perusahaan / Usaha</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Contoh: PT. Sumber Makmur"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                </div>

                {/* WhatsApp & Asal Negara */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Nomor WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Asal Negara</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Contoh: China / Singapore / Malaysia"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                </div>

                {/* Pelabuhan & Jenis Barang */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Pelabuhan / Bandara Asal</label>
                    <input
                      type="text"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      placeholder="Contoh: Guangzhou / Ningbo / Changi"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Jenis Barang</label>
                    <input
                      type="text"
                      required
                      value={goodsType}
                      onChange={(e) => setGoodsType(e.target.value)}
                      placeholder="Contoh: Mesin, Tekstil, Sparepart"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                </div>

                {/* Jumlah Koli, Berat, Volume */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Jumlah Koli</label>
                    <input
                      type="number"
                      min="1"
                      value={koli}
                      onChange={(e) => setKoli(e.target.value)}
                      placeholder="1"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Perkiraan Berat (kg)</label>
                    <input
                      type="number"
                      min="1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="100"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Volume (m³ / CBM)</label>
                    <input
                      type="text"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="1.0"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                </div>

                {/* Tujuan Indonesia */}
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tujuan Pengiriman di Indonesia</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Contoh: Jakarta / Surabaya / Bandung"
                    className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                  />
                </div>

                {/* Catatan */}
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Catatan Tambahan (Izin / Undername / Urgensi)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tuliskan jika membutuhkan sewa undername atau perlakuan kargo khusus..."
                    className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B1A]"
                  />
                </div>

                {/* Submit Button MINTA QUOTATION Sesuai Section 16 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl hover:shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>MINTA QUOTATION</span>
                  </button>
                  <span className="text-[11px] text-slate-400 block text-center mt-2">
                    *Formulir otomatis terhubung ke WhatsApp resmi TORO ({systemSettings.whatsappNumber})
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
