import React, { useState } from 'react';
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  Calendar,
  Building,
} from 'lucide-react';
import {
  SAMPLE_TRACKING_ORDERS,
  ToroTrackingOrder,
  SystemSettings,
  TORO_COMPANY_INFO,
} from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl, recordTrackingSearch } from '../utils/toroCalculators';

interface TrackingSectionProps {
  systemSettings: SystemSettings;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ systemSettings }) => {
  const [resiInput, setResiInput] = useState('TR-882109-SBY');
  const [searchedResi, setSearchedResi] = useState('TR-882109-SBY');
  const [currentOrder, setCurrentOrder] = useState<ToroTrackingOrder | null>(
    SAMPLE_TRACKING_ORDERS['TR-882109-SBY']
  );
  const [hasSearched, setHasSearched] = useState(true);
  const [copied, setCopied] = useState(false);

  const sampleResiList = [
    { code: 'TR-882109-SBY', label: 'Surabaya (Darat)' },
    { code: 'TR-773401-MDN', label: 'Medan (Laut LCL)' },
    { code: 'TR-990212-MKS', label: 'Makassar (Udara Kilat)' },
  ];

  const handleSearch = (e?: React.FormEvent, directCode?: string) => {
    if (e) e.preventDefault();
    const query = (directCode || resiInput).trim().toUpperCase();
    if (!query) return;

    recordTrackingSearch();
    setSearchedResi(query);
    setHasSearched(true);

    if (SAMPLE_TRACKING_ORDERS[query]) {
      setCurrentOrder(SAMPLE_TRACKING_ORDERS[query]);
    } else {
      // Not found
      setCurrentOrder(null);
    }
  };

  const handleCopyResi = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waNotFoundUrl = generateDynamicWhatsAppUrl(
    'tracking',
    { resi: searchedResi },
    systemSettings
  );

  return (
    <section id="cek-resi" className="py-16 sm:py-24 bg-[#070b28] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase mb-2">
            <Package className="w-4 h-4" />
            <span>Real-Time Shipment Tracking</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Lacak Kiriman Kargo Anda
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-base">
            Pantau posisi terkini kiriman kargo darat, laut, udara, dan kereta api TORO secara real-time.
          </p>
        </div>

        {/* Input Bar Cek Resi Sesuai Spesifikasi */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-[#0a0f2c] border-2 border-slate-700 hover:border-[#FF6B1A] focus-within:border-[#FF6B1A] rounded-3xl p-3 shadow-2xl transition-all">
            <form onSubmit={(e) => handleSearch(e)} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={resiInput}
                  onChange={(e) => setResiInput(e.target.value)}
                  placeholder="Masukkan nomor resi (contoh: TR-882109-SBY)"
                  className="w-full bg-transparent pl-12 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 font-bold tracking-wider focus:outline-none uppercase"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>LACAK PENGIRIMAN</span>
              </button>
            </form>
          </div>

          {/* Sample Resi Quick Buttons */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Coba Sample Resi:</span>
            {sampleResiList.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setResiInput(item.code);
                  handleSearch(undefined, item.code);
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  resiInput === item.code
                    ? 'bg-[#FF6B1A] text-white'
                    : 'bg-[#0a0f2c] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {item.code} ({item.label})
              </button>
            ))}
          </div>
        </div>

        {/* HASIL PELACAKAN ATAU NOT FOUND */}
        <div className="max-w-3xl mx-auto">
          {hasSearched && currentOrder ? (
            <div className="bg-[#0a0f2c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-200">
              {/* Order Header Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Nomor Resi:
                    </span>
                    <strong className="text-base sm:text-lg font-mono font-black text-[#FF6B1A]">
                      {currentOrder.resi}
                    </strong>
                    <button
                      type="button"
                      onClick={() => handleCopyResi(currentOrder.resi)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                      title="Salin Resi"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1">
                    {currentOrder.status}
                  </h3>
                </div>

                <div className="text-left sm:text-right space-y-0.5">
                  <span className="text-[11px] text-slate-400 block">Layanan &amp; Estimasi:</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">
                    {currentOrder.service} • {currentOrder.etd}
                  </span>
                </div>
              </div>

              {/* Origin, Destination, Weight Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#050820] p-4 rounded-2xl border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400 block">Kota Asal</span>
                  <strong className="text-white block mt-0.5">{currentOrder.origin}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Kota Tujuan</span>
                  <strong className="text-white block mt-0.5">{currentOrder.destination}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Berat &amp; Koli</span>
                  <strong className="text-white block mt-0.5 tabular-nums">
                    {currentOrder.weight} Kg ({currentOrder.koli || 1} koli)
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Kubikasi</span>
                  <strong className="text-white block mt-0.5 tabular-nums">
                    {currentOrder.volumeM3 || 0.5} m³
                  </strong>
                </div>
              </div>

              {/* 5 MILESTONES TIMELINE SESUAI SECTION 17 */}
              {/* Pickup -> Gudang -> Transit -> Dalam Pengiriman -> Sampai Tujuan */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider mb-5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6B1A]" />
                  <span>Timeline Status Perjalanan Kargo</span>
                </h4>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
                  {currentOrder.timeline.map((step, idx) => {
                    const isCompleted = step.completed;
                    const isActive = step.active;

                    return (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                              : isActive
                              ? 'bg-[#FF6B1A] text-white animate-pulse'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        {/* Step Details */}
                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            isActive
                              ? 'bg-[#050820] border-[#FF6B1A]/60 shadow-lg'
                              : isCompleted
                              ? 'bg-[#050820]/60 border-slate-800'
                              : 'bg-[#050820]/30 border-slate-900 opacity-60'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <span className="text-sm font-black text-white flex items-center gap-2">
                              <span>{step.stepName}</span>
                              {isActive && (
                                <span className="text-[10px] bg-[#FF6B1A] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                  Posisi Terkini
                                </span>
                              )}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {step.timestamp || 'Menunggu jadwal'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 mt-1">{step.desc}</p>
                          {step.location && (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                              <MapPin className="w-3.5 h-3.5 text-[#FF6B1A]" />
                              <span>Lokasi: {step.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : hasSearched && !currentOrder ? (
            /* NOT FOUND STATE SESUAI SECTION 17 */
            <div className="bg-[#0a0f2c] border border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl animate-in fade-in duration-200">
              <AlertCircle className="w-12 h-12 text-[#FF6B1A] mx-auto" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Nomor Resi: <span className="font-mono text-[#FF6B1A]">{searchedResi}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Nomor resi belum ditemukan. Silakan periksa kembali atau hubungi Customer Service TORO.
              </p>
              <div className="pt-2">
                <a
                  href={waNotFoundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>HUBUNGI CUSTOMER SERVICE VIA WHATSAPP</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
