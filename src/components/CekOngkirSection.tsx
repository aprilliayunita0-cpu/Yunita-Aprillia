import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Truck,
  Ship,
  Plane,
  Train,
  Scale,
  Box,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Info,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  RouteTariff,
  SystemSettings,
  INDONESIAN_LOCATIONS,
} from '../data/toroLogisticsData';
import {
  calculateKubikasiM3,
  calculateVolumetricWeight,
  calculateToroRatesEngine,
  formatRupiah,
  generateDynamicWhatsAppUrl,
  recordSearchAnalytics,
  saveCustomerInquiry,
  ToroCalculationResult,
} from '../utils/toroCalculators';

interface CekOngkirSectionProps {
  tariffs: RouteTariff[];
  systemSettings: SystemSettings;
  onOpenOrderModal?: (calculation: ToroCalculationResult) => void;
}

export const CekOngkirSection: React.FC<CekOngkirSectionProps> = ({
  tariffs,
  systemSettings,
  onOpenOrderModal,
}) => {
  // Cascading Origin
  const [originProvince, setOriginProvince] = useState<string>('DKI Jakarta');
  const [originCity, setOriginCity] = useState<string>('Jakarta (Semua Wilayah)');
  const [originDistrict, setOriginDistrict] = useState<string>('Cengkareng');

  // Cascading Destination
  const [destProvince, setDestProvince] = useState<string>('Jawa Timur');
  const [destCity, setDestCity] = useState<string>('Surabaya');
  const [destDistrict, setDestDistrict] = useState<string>('Rungkut');

  // Cargo Inputs
  const [actualWeight, setActualWeight] = useState<number | string>(100);
  const [lengthCm, setLengthCm] = useState<number | string>(100);
  const [widthCm, setWidthCm] = useState<number | string>(80);
  const [heightCm, setHeightCm] = useState<number | string>(80);
  const [koli, setKoli] = useState<number | string>(1);

  // Shipping Method Filter
  const [selectedMethod, setSelectedMethod] = useState<'all' | 'Darat' | 'Laut' | 'Udara' | 'Kereta'>('all');

  // Active calculated results
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Origin cities list based on province
  const availableOriginCities = useMemo(() => {
    const prov = INDONESIAN_LOCATIONS.find((p) => p.province === originProvince);
    return prov ? prov.cities : [];
  }, [originProvince]);

  // Origin districts list based on city
  const availableOriginDistricts = useMemo(() => {
    const c = availableOriginCities.find((item) => item.city === originCity);
    return c ? c.districts : [];
  }, [availableOriginCities, originCity]);

  // Destination cities list based on province
  const availableDestCities = useMemo(() => {
    const prov = INDONESIAN_LOCATIONS.find((p) => p.province === destProvince);
    return prov ? prov.cities : [];
  }, [destProvince]);

  // Destination districts list based on city
  const availableDestDistricts = useMemo(() => {
    const c = availableDestCities.find((item) => item.city === destCity);
    return c ? c.districts : [];
  }, [availableDestCities, destCity]);

  // Handle Province change
  const handleOriginProvinceChange = (prov: string) => {
    setOriginProvince(prov);
    const p = INDONESIAN_LOCATIONS.find((l) => l.province === prov);
    if (p && p.cities.length > 0) {
      setOriginCity(p.cities[0].city);
      setOriginDistrict(p.cities[0].districts[0] || '');
    }
  };

  const handleDestProvinceChange = (prov: string) => {
    setDestProvince(prov);
    const p = INDONESIAN_LOCATIONS.find((l) => l.province === prov);
    if (p && p.cities.length > 0) {
      setDestCity(p.cities[0].city);
      setDestDistrict(p.cities[0].districts[0] || '');
    }
  };

  // Real-time volumetric calculations
  const parsedLength = Number(lengthCm) || 0;
  const parsedWidth = Number(widthCm) || 0;
  const parsedHeight = Number(heightCm) || 0;
  const parsedKoli = Math.max(1, Number(koli) || 1);
  const parsedActualWeight = Math.max(1, Number(actualWeight) || 1);

  const realTimeKubikasiM3 = calculateKubikasiM3(parsedLength, parsedWidth, parsedHeight, parsedKoli);
  const realTimeVolDarat = calculateVolumetricWeight(parsedLength, parsedWidth, parsedHeight, parsedKoli, 'Darat', systemSettings);
  const realTimeVolUdara = calculateVolumetricWeight(parsedLength, parsedWidth, parsedHeight, parsedKoli, 'Udara', systemSettings);

  // Results calculation
  const results = useMemo(() => {
    if (!hasCalculated) return [];
    return calculateToroRatesEngine({
      originCity,
      destinationCity: destCity,
      actualWeight: parsedActualWeight,
      lengthCm: parsedLength,
      widthCm: parsedWidth,
      heightCm: parsedHeight,
      koli: parsedKoli,
      selectedMethod,
      tariffs,
      settings: systemSettings,
    });
  }, [
    originCity,
    destCity,
    parsedActualWeight,
    parsedLength,
    parsedWidth,
    parsedHeight,
    parsedKoli,
    selectedMethod,
    tariffs,
    systemSettings,
    hasCalculated,
  ]);

  const handleCekTarif = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    recordSearchAnalytics(destCity, selectedMethod);
  };

  const handlePesanWhatsApp = (res: ToroCalculationResult) => {
    saveCustomerInquiry({
      type: 'ongkir',
      details: {
        origin: originCity,
        destination: destCity,
        method: res.shipping_method,
        chargeableWeight: res.chargeable_weight,
        kubikasi: res.kubikasi_m3,
        totalCost: res.total_cost,
      },
    });

    const url = generateDynamicWhatsAppUrl(
      'ongkir',
      {
        origin: `${originCity} (${originDistrict})`,
        destination: `${destCity} (${destDistrict})`,
        method: res.shipping_method,
        weight: res.chargeable_weight,
        volume: res.kubikasi_m3.toLocaleString('id-ID', { minimumFractionDigits: 2 }),
        totalCost: res.total_cost,
      },
      systemSettings
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cek-ongkir" className="py-16 sm:py-24 bg-[#050820] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#FF6B1A] uppercase mb-2">
            <Calculator className="w-4 h-4" />
            <span>Kalkulator Cek Ongkir Terintegrasi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Cek Tarif Ekspedisi ke Seluruh Indonesia
          </h2>
          <p className="mt-2.5 text-slate-300 text-xs sm:text-base">
            Hitung biaya kargo darat, laut, udara, dan kereta secara transparan dengan perbandingan berat aktual vs volumetrik.
          </p>
        </div>

        {/* Form Calculator Container */}
        <div className="bg-[#0a0f2c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleCekTarif} className="space-y-6">
            {/* ROW 1: ASAL & TUJUAN CASCADING DROPDOWNS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
              {/* ASAL PENGIRIMAN */}
              <div className="space-y-3 bg-[#050820] p-4 sm:p-5 rounded-2xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-[#FF6B1A] tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B1A]" />
                    ASAL PENGIRIMAN
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">Hub Jakarta &amp; Sekitarnya</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Provinsi</label>
                    <select
                      value={originProvince}
                      onChange={(e) => handleOriginProvinceChange(e.target.value)}
                      className="w-full bg-[#0a0f2c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-[#FF6B1A]"
                    >
                      {INDONESIAN_LOCATIONS.map((p) => (
                        <option key={`orig-prov-${p.province}`} value={p.province}>
                          {p.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Kota / Kabupaten</label>
                    <select
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      className="w-full bg-[#0a0f2c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-[#FF6B1A]"
                    >
                      {availableOriginCities.map((c) => (
                        <option key={`orig-city-${c.city}`} value={c.city}>
                          {c.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Kecamatan</label>
                    <select
                      value={originDistrict}
                      onChange={(e) => setOriginDistrict(e.target.value)}
                      className="w-full bg-[#0a0f2c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-[#FF6B1A]"
                    >
                      {availableOriginDistricts.map((d) => (
                        <option key={`orig-dist-${d}`} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* TUJUAN PENGIRIMAN */}
              <div className="space-y-3 bg-[#050820] p-4 sm:p-5 rounded-2xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-[#FF6B1A] tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B1A]" />
                    TUJUAN PENGIRIMAN
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">Seluruh Kota Indonesia</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Provinsi</label>
                    <select
                      value={destProvince}
                      onChange={(e) => handleDestProvinceChange(e.target.value)}
                      className="w-full bg-[#0a0f2c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-[#FF6B1A]"
                    >
                      {INDONESIAN_LOCATIONS.map((p) => (
                        <option key={`dest-prov-${p.province}`} value={p.province}>
                          {p.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Kota / Kabupaten</label>
                    <select
                      value={destCity}
                      onChange={(e) => setDestCity(e.target.value)}
                      className="w-full bg-[#0a0f2c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-[#FF6B1A]"
                    >
                      {availableDestCities.map((c) => (
                        <option key={`dest-city-${c.city}`} value={c.city}>
                          {c.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Kecamatan</label>
                    <select
                      value={destDistrict}
                      onChange={(e) => setDestDistrict(e.target.value)}
                      className="w-full bg-[#0a0f2c] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-[#FF6B1A]"
                    >
                      {availableDestDistricts.map((d) => (
                        <option key={`dest-dist-${d}`} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: DATA BARANG & KALKULATOR VOLUMETRIK REAL-TIME */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Kolom Kiri: Input Dimensi & Berat */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#FF6B1A]" />
                    DATA BARANG &amp; SPESIFIKASI KARGO
                  </span>
                  <span className="text-[11px] text-[#FF6B1A] font-bold">Kalkulasi Otomatis</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Berat Aktual (kg)</label>
                    <input
                      type="number"
                      min="1"
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      placeholder="100"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Panjang (cm)</label>
                    <input
                      type="number"
                      min="0"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(e.target.value)}
                      placeholder="100"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Lebar (cm)</label>
                    <input
                      type="number"
                      min="0"
                      value={widthCm}
                      onChange={(e) => setWidthCm(e.target.value)}
                      placeholder="80"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Tinggi (cm)</label>
                    <input
                      type="number"
                      min="0"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="80"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Jumlah Koli</label>
                    <input
                      type="number"
                      min="1"
                      value={koli}
                      onChange={(e) => setKoli(e.target.value)}
                      placeholder="1"
                      className="w-full bg-[#050820] border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold tabular-nums focus:outline-none focus:border-[#FF6B1A]"
                    />
                  </div>
                </div>

                {/* Filter Jenis Pengiriman */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-2">
                    Pilihan Jalur Pengiriman:
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { id: 'all', label: 'Semua Jalur', icon: Layers },
                      { id: 'Darat', label: 'Darat', icon: Truck },
                      { id: 'Laut', label: 'Laut', icon: Ship },
                      { id: 'Udara', label: 'Udara', icon: Plane },
                      { id: 'Kereta', label: 'Kereta', icon: Train },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = selectedMethod === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedMethod(item.id as any)}
                          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                            active
                              ? 'bg-[#FF6B1A] text-white shadow-md'
                              : 'bg-[#050820] text-slate-300 hover:text-white border border-slate-800'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[11px]">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Real-Time Volumetric Display Box */}
              <div className="lg:col-span-5 bg-[#050820] rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-[#FF6B1A]" />
                    Analisa Berat &amp; Kubikasi Real-Time
                  </span>
                  <span className="text-[10px] bg-[#FF6B1A]/20 text-[#FF6B1A] px-2 py-0.5 rounded font-black">
                    Live Formula
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#0a0f2c] rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Total Kubikasi (m³)</span>
                    <strong className="text-base text-white tabular-nums">
                      {realTimeKubikasiM3} m³
                    </strong>
                    <span className="text-[9px] text-slate-500 block mt-0.5">(P×L×T×Koli / 1.000.000)</span>
                  </div>

                  <div className="p-3 bg-[#0a0f2c] rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Berat Aktual</span>
                    <strong className="text-base text-white tabular-nums">
                      {parsedActualWeight} Kg
                    </strong>
                    <span className="text-[9px] text-slate-500 block mt-0.5">Timbangan fisik</span>
                  </div>

                  <div className="p-3 bg-[#0a0f2c] rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Volumetrik Darat / Laut</span>
                    <strong className="text-base text-[#FF6B1A] tabular-nums">
                      {realTimeVolDarat} Kg
                    </strong>
                    <span className="text-[9px] text-slate-500 block mt-0.5">
                      (Bagi faktor: {systemSettings.volumetricFactorDaratLaut})
                    </span>
                  </div>

                  <div className="p-3 bg-[#0a0f2c] rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Volumetrik Udara</span>
                    <strong className="text-base text-[#FF6B1A] tabular-nums">
                      {realTimeVolUdara} Kg
                    </strong>
                    <span className="text-[9px] text-slate-500 block mt-0.5">
                      (Bagi faktor: {systemSettings.volumetricFactorUdara})
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed bg-[#0a0f2c]/50 p-2.5 rounded-lg border border-slate-800/50">
                  <strong className="text-white">Prinsip Berat Chargeable:</strong> Sistem secara otomatis membandingkan berat aktual dengan berat volumetrik, dan menggunakan angka yang lebih besar untuk menghitung total estimasi biaya.
                </p>
              </div>
            </div>

            {/* BUTTON SUBMIT CEK TARIF */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black rounded-2xl text-sm sm:text-base uppercase tracking-wider transition-all shadow-xl hover:shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>CEK TARIF SEKARANG</span>
              </button>
            </div>
          </form>
        </div>

        {/* ======================================================== */}
        {/* HASIL CEK ONGKIR CARDS SESUAI SECTION 10 SPESIFIKASI    */}
        {/* ======================================================== */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold text-[#FF6B1A] uppercase tracking-wider block">
                Hasil Perhitungan Ongkir
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Rute: {originCity} → {destCity}
              </h3>
            </div>
            <div className="text-xs text-slate-400 bg-[#0a0f2c] px-3.5 py-1.5 rounded-xl border border-slate-800">
              Koli: <strong className="text-white">{parsedKoli}</strong> | Kubikasi:{' '}
              <strong className="text-[#FF6B1A]">{realTimeKubikasiM3} m³</strong>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="p-10 text-center bg-[#0a0f2c] rounded-3xl border border-slate-800 space-y-4">
              <AlertCircle className="w-10 h-10 text-[#FF6B1A] mx-auto" />
              <h4 className="text-lg font-bold text-white">Rute Khusus Belum Terdaftar di Tabel Cepat</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Rute pengiriman dari {originCity} ke {destCity} memerlukan pengecekan jadwal armada perintis atau charter khusus. Silakan hubungi langsung tim operasional TORO.
              </p>
              <a
                href={generateDynamicWhatsAppUrl('general', {}, systemSettings)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Tanyakan Tarif via WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((res) => {
                const Icon =
                  res.shipping_method === 'Darat'
                    ? Truck
                    : res.shipping_method === 'Laut'
                    ? Ship
                    : res.shipping_method === 'Udara'
                    ? Plane
                    : Train;

                return (
                  <div
                    key={res.route.id}
                    className="bg-[#0a0f2c] border-2 border-slate-800 hover:border-[#FF6B1A] rounded-3xl p-6 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Watermark Tag */}
                    <div className="space-y-4">
                      {/* CARD HEADER SESUAI SPESIFIKASI */}
                      <div className="flex items-start justify-between border-b border-slate-800/80 pb-3.5">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                            TORO TRANSPORTASI DAN LOGISTIC
                          </span>
                          <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#FF6B1A] transition-colors flex items-center gap-2">
                            <Icon className="w-5 h-5 text-[#FF6B1A]" />
                            <span>Jalur {res.shipping_method}</span>
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          {res.lead_time}
                        </span>
                      </div>

                      {/* DATA RINCIAN SESUAI SPESIFIKASI SECTION 10 */}
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                          <span className="text-slate-400">Asal:</span>
                          <strong className="text-white font-bold">{res.origin}</strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                          <span className="text-slate-400">Tujuan:</span>
                          <strong className="text-white font-bold">{res.destination}</strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                          <span className="text-slate-400">Tarif / Kg:</span>
                          <strong className="text-[#FF6B1A] font-black text-sm tabular-nums">
                            {formatRupiah(res.selling_price)}/kg
                          </strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                          <span className="text-slate-400">Minimum Berat:</span>
                          <span className="text-slate-300 font-bold tabular-nums">
                            {res.minimum_weight} Kg
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                          <span className="text-slate-400">Berat Dihitung:</span>
                          <span className="text-white font-bold tabular-nums">
                            {res.chargeable_weight} Kg{' '}
                            {res.is_volumetric_applied ? (
                              <span className="text-[10px] text-amber-400">(Volumetrik)</span>
                            ) : (
                              <span className="text-[10px] text-slate-400">(Aktual)</span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                          <span className="text-slate-400">Estimasi Tiba:</span>
                          <span className="text-slate-200 font-semibold">{res.lead_time}</span>
                        </div>
                      </div>

                      {/* TOTAL ESTIMASI BOX */}
                      <div className="p-4 rounded-2xl bg-[#050820] border border-slate-800 space-y-1">
                        <span className="text-[11px] text-slate-400 block font-semibold">
                          Total Estimasi:
                        </span>
                        <div className="text-2xl font-black text-white tabular-nums tracking-tight">
                          {formatRupiah(res.total_cost)}
                        </div>
                        {res.is_minimum_applied && (
                          <span className="text-[10px] text-amber-400 block mt-0.5">
                            *Dikenakan batas tarif minimum {res.minimum_weight} Kg
                          </span>
                        )}
                      </div>
                    </div>

                    {/* DUA TOMBOL SESUAI SECTION 10 */}
                    <div className="grid grid-cols-2 gap-2 mt-5">
                      <button
                        type="button"
                        onClick={() => handlePesanWhatsApp(res)}
                        className="py-3 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PESAN PENGIRIMAN</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePesanWhatsApp(res)}
                        className="py-3 bg-[#050820] hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                        <span>TANYA VIA WHATSAPP</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Transparent Note */}
          <p className="text-[11px] text-slate-500 mt-6 text-center">
            * Tarif di atas merupakan tarif resmi TORO Transportasi dan Logistic untuk kargo umum dari Jakarta ke {destCity}. Sudah termasuk PPN sesuai ketentuan berlaku.
          </p>
        </div>
      </div>
    </section>
  );
};
