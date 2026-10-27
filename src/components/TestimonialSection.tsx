import React from 'react';
import { Calculator, Truck, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SystemSettings, TORO_COMPANY_INFO } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl } from '../utils/toroCalculators';

interface TestimonialSectionProps {
  onNavigate: (sectionId: string) => void;
  systemSettings: SystemSettings;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  onNavigate,
  systemSettings,
}) => {
  const waUrl = generateDynamicWhatsAppUrl('general', {}, systemSettings);

  return (
    <section className="py-16 sm:py-24 bg-[#050820] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BIG CTA SESUAI SECTION 21 SPESIFIKASI */}
        <div className="bg-gradient-to-br from-[#0b1035] via-[#0a0f2c] to-[#050820] border-2 border-[#FF6B1A]/40 rounded-3xl p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF6B1A]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF6B1A]/20 text-[#FF6B1A] text-xs font-black uppercase tracking-wider border border-[#FF6B1A]/30">
              Solusi Logistik &amp; Transportasi Terpercaya
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Butuh Kirim Barang atau Armada?
            </h2>

            <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
              Konsultasikan kebutuhan logistik Anda bersama TORO Transportasi dan Logistic.
            </p>

            {/* 3 Buttons Sesuai Section 21 */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('cek-ongkir')}
                className="px-7 py-4 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:shadow-orange-500/30 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4" />
                <span>CEK ONGKIR</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('sewa-armada')}
                className="px-7 py-4 bg-[#0a0f2c] hover:bg-[#12194d] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-slate-700 hover:border-[#FF6B1A] transition-all shadow-md flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Truck className="w-4 h-4 text-[#FF6B1A]" />
                <span>SEWA ARMADA</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WHATSAPP TORO</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
