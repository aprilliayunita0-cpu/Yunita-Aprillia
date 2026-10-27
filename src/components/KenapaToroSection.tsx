import React from 'react';
import {
  Globe2,
  Layers,
  Calculator,
  Truck,
  MessageCircle,
  Building2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const KenapaToroSection: React.FC = () => {
  const advantages = [
    {
      icon: Globe2,
      title: 'Jangkauan Nasional',
      desc: 'Melayani kebutuhan pengiriman ke berbagai wilayah Indonesia dari Sabang sampai Merauke secara terjadwal.',
    },
    {
      icon: Layers,
      title: 'Pilihan Moda Lengkap',
      desc: 'Darat, laut, udara, kereta dan trucking dalam satu pintu manajemen logistik terpadu.',
    },
    {
      icon: Calculator,
      title: 'Harga Transparan',
      desc: 'Customer dapat menghitung estimasi ongkir secara online tanpa biaya tersembunyi dengan formula efisien.',
    },
    {
      icon: Truck,
      title: 'Armada Beragam',
      desc: 'Mulai dari pickup, blind van, engkel, CDD, CDD long, fuso hingga tronton, wingbox dan kontainer.',
    },
    {
      icon: MessageCircle,
      title: 'Customer Support',
      desc: 'Konsultasi langsung melalui WhatsApp 0896-5256-5123 yang responsif, ramah, dan cepat tanggap.',
    },
    {
      icon: Building2,
      title: 'Corporate & Project',
      desc: 'Melayani kebutuhan bisnis, kontrak distribusi pabrik, retail modern, dan pengiriman material proyek skala besar.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#070b28] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Standar Kualitas &amp; Kredibilitas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Keunggulan TORO Transportasi dan Logistic
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-base">
            Mengapa ribuan mitra UMKM, distributor, dan korporasi mempercayakan distribusi kargo mereka kepada TORO.
          </p>
        </div>

        {/* 6 Grid Icons Sesuai Section 20 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0a0f2c] border border-slate-800 hover:border-[#FF6B1A] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all group shadow-lg hover:-translate-y-1 duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B1A]/10 text-[#FF6B1A] flex items-center justify-center border border-[#FF6B1A]/20 group-hover:bg-[#FF6B1A] group-hover:text-white transition-all mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-[#FF6B1A] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
