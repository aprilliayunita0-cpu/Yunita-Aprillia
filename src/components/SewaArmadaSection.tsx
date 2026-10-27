import React, { useState } from 'react';
import { Truck, MessageCircle, Info, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { FLEET_LIST, FleetVehicle, SystemSettings, TORO_COMPANY_INFO } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl, recordFleetInquiry } from '../utils/toroCalculators';

interface SewaArmadaSectionProps {
  systemSettings: SystemSettings;
  onOpenFleetModal?: (vehicle: FleetVehicle) => void;
}

export const SewaArmadaSection: React.FC<SewaArmadaSectionProps> = ({
  systemSettings,
  onOpenFleetModal,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Form inside modal
  const [pickupLoc, setPickupLoc] = useState('Jakarta');
  const [destinationLoc, setDestinationLoc] = useState('Surabaya');
  const [usageDate, setUsageDate] = useState('Segera');
  const [duration, setDuration] = useState('1 Trip');

  const handleOpenModal = (vehicle: FleetVehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
    recordFleetInquiry(vehicle.name);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    const url = generateDynamicWhatsAppUrl(
      'armada',
      {
        vehicleName: selectedVehicle.name,
        pickupLocation: pickupLoc,
        destination: destinationLoc,
        date: usageDate,
        duration: duration,
      },
      systemSettings
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    setModalOpen(false);
  };

  const handleQuickWhatsApp = (vehicle: FleetVehicle) => {
    recordFleetInquiry(vehicle.name);
    const url = generateDynamicWhatsAppUrl(
      'armada',
      {
        vehicleName: vehicle.name,
        pickupLocation: 'Jakarta',
        destination: 'Sesuai Kebutuhan',
        date: 'Segera',
        duration: '1 Trip / Sewa Harian',
      },
      systemSettings
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="sewa-armada" className="py-16 sm:py-24 bg-[#070b28] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Subtitle Sesui Spesifikasi */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase mb-2">
            <Truck className="w-4 h-4" />
            <span>Charter &amp; Sewa Truk Indonesia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Sewa Armada Logistik TORO
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-base">
            Pilihan armada untuk kebutuhan distribusi, proyek, pindahan, retail, corporate, dan pengiriman antar kota.
          </p>
        </div>

        {/* 9 Fleet Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET_LIST.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#0a0f2c] border border-slate-800 hover:border-[#FF6B1A] rounded-3xl p-6 flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1 duration-200"
            >
              <div className="space-y-4">
                {/* Vehicle Badge & Name */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-[#FF6B1A] bg-[#FF6B1A]/10 px-2.5 py-1 rounded-lg border border-[#FF6B1A]/20">
                    {vehicle.category}
                  </span>
                  <span className="text-xs font-black text-white tabular-nums bg-slate-800 px-2.5 py-1 rounded-lg">
                    {vehicle.capacityTon}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-[#FF6B1A] transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed min-h-[36px]">
                    {vehicle.description}
                  </p>
                </div>

                {/* Specs Specifications Box */}
                <div className="bg-[#050820] rounded-2xl p-3.5 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kapasitas Muatan:</span>
                    <strong className="text-white">{vehicle.capacityTon}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume Maksimal:</span>
                    <strong className="text-white">{vehicle.volumeCbm}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dimensi P x L x T:</span>
                    <strong className="text-slate-200 font-mono">{vehicle.dimensionsM}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Area Layanan:</span>
                    <strong className="text-slate-200">{vehicle.areaUse}</strong>
                  </div>
                </div>

                {/* Price Notice Sesuai Spesifikasi Section 15 */}
                <div className="p-3 bg-[#050820]/70 rounded-xl border border-slate-800/60 text-center">
                  <span className="text-[11px] text-slate-300 font-medium block">
                    Hubungi kami untuk mendapatkan penawaran harga.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenModal(vehicle)}
                  className="py-3 bg-[#0a0f2c] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-colors cursor-pointer text-center"
                >
                  TANYA HARGA
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickWhatsApp(vehicle)}
                  className="py-3 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>VIA WHATSAPP</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Fleet Callout */}
        <div className="mt-12 bg-[#0a0f2c] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-lg sm:text-xl font-black text-white">
              Butuh Kontrak Sewa Armada Perusahaan atau Charter Bulanan?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              TORO melayani kontrak korporasi B2B, armada dedikasi logistik pabrik, retail chain, serta project cargo dengan sopir profesional berlisensi.
            </p>
          </div>
          <a
            href={generateDynamicWhatsAppUrl('armada', { vehicleName: 'Kontrak Bulanan / Project Cargo' }, systemSettings)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>KONSULTASI ARMADA B2B</span>
          </a>
        </div>
      </div>

      {/* MODAL TANYA HARGA SEWA ARMADA DENGAN FORM SESUAI SPESIFIKASI SECTION 15 */}
      {modalOpen && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#0a0f2c] border border-slate-700 text-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#FF6B1A]" />
                  <span>Sewa {selectedVehicle.name}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {TORO_COMPANY_INFO.brandName} ({systemSettings.whatsappNumber})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs">
              <div className="p-3 bg-[#050820] rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Armada Terpilih:</span>
                <strong className="text-white block text-sm">{selectedVehicle.name} ({selectedVehicle.capacityTon})</strong>
                <span className="text-[11px] text-slate-400">{selectedVehicle.description}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Lokasi Muat / Pickup</label>
                  <input
                    type="text"
                    required
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    placeholder="Contoh: Jakarta Barat"
                    className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tujuan Pengiriman</label>
                  <input
                    type="text"
                    required
                    value={destinationLoc}
                    onChange={(e) => setDestinationLoc(e.target.value)}
                    placeholder="Contoh: Surabaya"
                    className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tanggal Penggunaan</label>
                  <input
                    type="text"
                    required
                    value={usageDate}
                    onChange={(e) => setUsageDate(e.target.value)}
                    placeholder="Contoh: Besok / 10 Oktober 2026"
                    className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Durasi Sewa</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Contoh: 1 Trip / 3 Hari / Bulanan"
                    className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>TANYA HARGA VIA WHATSAPP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
