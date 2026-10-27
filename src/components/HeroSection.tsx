import React, { useState, useEffect } from 'react';
import {
  Truck,
  Ship,
  Plane,
  Train,
  Calculator,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  Warehouse,
  Boxes,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { SystemSettings } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl } from '../utils/toroCalculators';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  systemSettings: SystemSettings;
}

// 6 Visual Slides: Truk, Pesawat, Kapal, Kereta, Gudang, Paket Cargo
const HERO_SLIDES = [
  {
    id: 'trucking',
    title: 'Armada Truk & Wingbox Logistik',
    badge: 'Transportasi Darat & Trucking',
    subtitle: 'Lintas Tol Trans Jawa, Trans Sumatera, hingga Bali & Nusa Tenggara',
    image: '/src/assets/images/trucking_fleet_hub_1791268444027.jpg',
    tag: '🚚 8 Pilihan Truk',
  },
  {
    id: 'air',
    title: 'Pesawat Cargo Cepat (Air Freight)',
    badge: 'Jalur Udara Kilat 1 Hari',
    subtitle: 'Jadwal kargo udara langsung ke 38 provinsi di seluruh Nusantara',
    image: '/src/assets/images/air_cargo_plane_1791268427055.jpg',
    tag: '✈️ Air Cargo Direct',
  },
  {
    id: 'sea',
    title: 'Kapal Kontainer & Ekspedisi Laut',
    badge: 'Pelayaran Antarpulau & Import',
    subtitle: 'Layanan FCL, LCL, dan Kapal Cepat Roro menjangkau pulau-pulau Indonesia',
    image: '/src/assets/images/import_freight_ship_1791268410481.jpg',
    tag: '🚢 Kontainer ISO & Roro',
  },
  {
    id: 'port',
    title: 'Terminal Hub Pelabuhan & Multimoda',
    badge: 'Jalur Kereta & Pergudangan Terpadu',
    subtitle: 'Distribusi door-to-door dengan jaringan intermodal terlengkap',
    image: '/src/assets/images/hero_cargo_logistics_1791268393236.jpg',
    tag: '🚆 Kereta & Terminal Kargo',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  systemSettings,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance visual carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const waHeroUrl = generateDynamicWhatsAppUrl('general', {}, systemSettings);

  return (
    <section id="hero" className="relative bg-[#050820] text-white overflow-hidden">
      {/* Background Cinematic Visual with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-35' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
            />
            {/* Dark navy overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050820] via-[#050820]/80 to-[#050820]/95" />
          </div>
        ))}

        {/* Ambient radial lighting glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF6B1A]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Main Brand Title & Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B1A]/15 border border-[#FF6B1A]/30 text-[#FF6B1A] text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm">
            <span>PT TORO SENTOSA GROUP</span>
            <span className="text-slate-500">•</span>
            <span>TORO Transportasi dan Logistic</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Solusi Transportasi &amp; Logistik<br />
            <span className="text-[#FF6B1A]">ke Seluruh Indonesia</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Pengiriman darat, laut, udara, kereta, sewa armada, hingga layanan import dalam satu solusi logistik.
          </p>

          {/* Tiga Tombol Utama Sesuai Spesifikasi */}
          <div className="pt-4 pb-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate('cek-ongkir')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:shadow-orange-500/30 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5" />
              <span>CEK ONGKIR</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('sewa-armada')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0a0f2c] hover:bg-[#101740] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-slate-700 hover:border-[#FF6B1A] transition-all shadow-lg flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Truck className="w-5 h-5 text-[#FF6B1A]" />
              <span>SEWA ARMADA</span>
            </button>

            <a
              href={waHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>TANYA VIA WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Visual Carousel Highlights & Interactive Thumbnail Indicators */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-[#070b28]/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-white tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A] animate-ping" />
                <span>Moda Transportasi &amp; Armada TORO</span>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-bold text-slate-400 tabular-nums px-1.5">
                  {currentSlide + 1} / {HERO_SLIDES.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Slide Details Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                  {HERO_SLIDES[currentSlide].badge}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {HERO_SLIDES[currentSlide].title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
              </div>

              <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('cek-ongkir')}
                  className="w-full md:w-auto px-4 py-2.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Hitung Ongkir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick 4 Tabs Selector */}
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    currentSlide === idx
                      ? 'bg-[#FF6B1A]/20 border border-[#FF6B1A] text-white shadow-md'
                      : 'bg-[#050820] border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{slide.tag}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{slide.badge}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Clean Pillars */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2.5 bg-[#0a0f2c]/80 border border-slate-800 p-3 rounded-xl backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-[#FF6B1A] shrink-0" />
            <span>Kirim Lebih Mudah</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#0a0f2c]/80 border border-slate-800 p-3 rounded-xl backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-[#FF6B1A] shrink-0" />
            <span>Angkut Lebih Aman</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#0a0f2c]/80 border border-slate-800 p-3 rounded-xl backdrop-blur-xs">
            <Truck className="w-4 h-4 text-[#FF6B1A] shrink-0" />
            <span>9 Pilihan Armada</span>
          </div>
          <div className="flex items-center gap-2.5 bg-[#0a0f2c]/80 border border-slate-800 p-3 rounded-xl backdrop-blur-xs">
            <Package className="w-4 h-4 text-[#FF6B1A] shrink-0" />
            <span>Jasa Import Resmi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
