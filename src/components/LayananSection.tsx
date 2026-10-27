import React from 'react';
import {
  Truck,
  Ship,
  Plane,
  Train,
  Boxes,
  Globe2,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { SystemSettings } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl } from '../utils/toroCalculators';

interface LayananSectionProps {
  onNavigate: (sectionId: string) => void;
  systemSettings: SystemSettings;
}

export const LayananSection: React.FC<LayananSectionProps> = ({
  onNavigate,
  systemSettings,
}) => {
  const services = [
    {
      id: 'darat',
      title: 'Cargo Darat',
      subtitle: 'Pengiriman cargo melalui jalur darat ke berbagai kota Indonesia.',
      icon: Truck,
      highlight: 'Jalur Tol Trans Jawa & Lintas Sumatera',
      target: 'cek-ongkir',
      features: ['Layanan Door to Door & Port to Door', 'Truk CDD, Fuso & Wingbox berjadwal', 'Penjemputan kargo (Free Pickup)'],
    },
    {
      id: 'laut',
      title: 'Cargo Laut',
      subtitle: 'Pengiriman antarpulau menggunakan jalur laut.',
      icon: Ship,
      highlight: 'Kontainer FCL, LCL & Kapal Cepat Roro',
      target: 'cek-ongkir',
      features: ['Jangkau Kalimantan, Sulawesi, Maluku & Papua', 'Tarif kubikasi & tonase kompetitif', 'Stuffing aman di pelabuhan utama'],
    },
    {
      id: 'udara',
      title: 'Cargo Udara',
      subtitle: 'Pengiriman cepat untuk kebutuhan prioritas.',
      icon: Plane,
      highlight: 'SLA Kilat 1–2 Hari ke 38 Provinsi',
      target: 'cek-ongkir',
      features: ['Direct flight dari Bandara Soekarno-Hatta', 'Penanganan dokumen & barang urgent', 'Minimal hemat mulai 10 Kg'],
    },
    {
      id: 'kereta',
      title: 'Cargo Kereta',
      subtitle: 'Alternatif pengiriman melalui jaringan kereta.',
      icon: Train,
      highlight: 'Kereta Logistik Cepat Pulau Jawa',
      target: 'cek-ongkir',
      features: ['Bebas macet jalan raya antarkota', 'Kapasitas angkut stabil & tepat waktu', 'Stasiun Jakarta ke Surabaya, Jogja, Solo'],
    },
    {
      id: 'trucking',
      title: 'Trucking',
      subtitle: 'Penyewaan armada untuk kebutuhan distribusi.',
      icon: Boxes,
      highlight: 'Dedicated Charter & FTL / LTL',
      target: 'sewa-armada',
      features: ['Charter satu truk penuh khusus barang Anda', 'Rute kustom sesuai permintaan pabrik', 'Laporan tracking perjalanan armada'],
    },
    {
      id: 'armada',
      title: 'Sewa Armada',
      subtitle: 'Armada untuk corporate, retail, proyek, dan kebutuhan khusus.',
      icon: PackageCheck,
      highlight: '9 Varian: Pickup s/d Wingbox & Tronton',
      target: 'sewa-armada',
      features: ['Pilihan harian, mingguan & kontrak bulanan', 'Driver berpengalaman & armada terawat', 'Kapasitas 1 ton hingga 30 ton'],
    },
    {
      id: 'import',
      title: 'Import',
      subtitle: 'Solusi import dan distribusi barang ke Indonesia.',
      icon: Globe2,
      highlight: 'Door to Door & Customs Clearance All-In',
      target: 'import',
      features: ['Pengiriman dari China, Singapore, dll.', 'Pengurusan dokumen PIB, PEB, undername', 'Distribusi lanjutan ke seluruh Indonesia'],
    },
  ];

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-[#050820] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Layanan Terpadu Satu Pintu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Layanan Ekspedisi &amp; Transportasi TORO
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-base">
            Didukung multimoda transportasi darat, laut, udara, kereta api, charter trucking, dan forwarding import terpercaya.
          </p>
        </div>

        {/* 7 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-[#0a0f2c] border border-slate-800 hover:border-[#FF6B1A] rounded-3xl p-6 flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1 duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6B1A]/10 text-[#FF6B1A] flex items-center justify-center border border-[#FF6B1A]/20 group-hover:bg-[#FF6B1A] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-[#050820] px-2.5 py-1 rounded-lg border border-slate-800">
                      {srv.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-[#FF6B1A] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {srv.subtitle}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B1A] shrink-0" />
                        <span className="text-[11px]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => onNavigate(srv.target)}
                    className="w-full py-3 bg-[#050820] hover:bg-[#FF6B1A] text-slate-200 hover:text-white font-black text-xs uppercase tracking-wider rounded-xl border border-slate-800 hover:border-[#FF6B1A] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Cek Layanan Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
