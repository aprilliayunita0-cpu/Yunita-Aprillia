import React from 'react';
import { Award, ShieldCheck, MapPin, Building, Calendar, Users, Phone, CheckCircle2 } from 'lucide-react';
import { TORO_COMPANY_INFO } from '../data/toroLogisticsData';

export const TentangToroSection: React.FC = () => {
  return (
    <section id="tentang-toro" className="py-16 sm:py-24 bg-[#050820] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase">
              <Building className="w-4 h-4" />
              <span>Profil Perusahaan</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Tentang TORO Transportasi dan Logistic
            </h2>

            <p className="text-base font-bold text-[#FF6B1A] uppercase tracking-wide">
              {TORO_COMPANY_INFO.legalEntity}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>PT TORO SENTOSA GROUP</strong> adalah perusahaan logistik dan transportasi nasional yang menaungi <strong>TORO Transportasi dan Logistic</strong>. Kami menyediakan solusi menyeluruh untuk jasa ekspedisi kargo darat, laut, udara, kereta api, sewa armada truk charter, hingga penanganan import door to door.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Dengan komitmen profesionalitas, transparansi harga, serta kehandalan armada, TORO menghubungkan sentra industri dan perdagangan dari Jakarta ke seluruh penjuru 38 provinsi di Indonesia untuk melayani kebutuhan retail, UMKM, korporasi, hingga project cargo skala besar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6B1A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Kantor Pusat &amp; Pool Armada:</strong>
                  <span className="text-slate-400">{TORO_COMPANY_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FF6B1A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Jaminan Keamanan Kargo:</strong>
                  <span className="text-slate-400">Armada standar industri, SOP timbang digital, perlindungan kargo menyeluruh.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0f2c] border-2 border-[#FF6B1A]/40 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B1A]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-block p-4 bg-[#FF6B1A]/10 rounded-2xl border border-[#FF6B1A]/20">
                <Award className="w-10 h-10 text-[#FF6B1A]" />
              </div>

              <div>
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter block tabular-nums">
                  100<span className="text-[#FF6B1A]">%</span>
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Komitmen Pelayanan
                </h3>
                <span className="text-xs font-mono font-bold text-[#FF6B1A] tracking-widest uppercase block mt-1">
                  Aman • Cepat • Terpercaya
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-4">
                Melayani pengiriman barang general cargo, bahan baku, mesin berat, produk retail, dan komoditas bisnis ke seluruh pelosok Indonesia.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold">
                <div className="p-3 bg-[#050820] rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Cakupan:</span>
                  <span className="text-white">38 Provinsi</span>
                </div>
                <div className="p-3 bg-[#050820] rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Pilihan Armada:</span>
                  <span className="text-white">9 Varian Truk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
