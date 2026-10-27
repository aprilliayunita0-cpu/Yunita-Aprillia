import {
  RouteTariff,
  INITIAL_TARIFF_DATABASE,
  SystemSettings,
  DEFAULT_SETTINGS,
  CustomerInquiry,
  TORO_COMPANY_INFO,
} from '../data/toroLogisticsData';

export interface ToroCalculationResult {
  route: RouteTariff;
  origin: string;
  destination: string;
  shipping_method: 'Darat' | 'Laut' | 'Udara' | 'Kereta';
  selling_price: number;
  minimum_weight: number;
  actual_weight: number;
  volumetric_weight: number;
  chargeable_weight: number;
  is_volumetric_applied: boolean;
  is_minimum_applied: boolean;
  kubikasi_m3: number;
  lead_time: string;
  total_cost: number;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// LocalStorage Persistence Keys
const STORAGE_TARIFF_KEY = 'toro_tariffs_v4_master';
const STORAGE_SETTINGS_KEY = 'toro_settings_v4';
const STORAGE_INQUIRIES_KEY = 'toro_inquiries_v4';
const STORAGE_ANALYTICS_KEY = 'toro_analytics_v4';

// 1. Tariffs Management
export function getStoredTariffs(): RouteTariff[] {
  try {
    const raw = localStorage.getItem(STORAGE_TARIFF_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load stored tariffs', e);
  }
  return INITIAL_TARIFF_DATABASE;
}

export function saveStoredTariffs(tariffs: RouteTariff[]): void {
  try {
    localStorage.setItem(STORAGE_TARIFF_KEY, JSON.stringify(tariffs));
  } catch (e) {
    console.error('Failed to save tariffs', e);
  }
}

// 2. System Settings Management (Volumetric factors, Margin, WhatsApp)
export function getStoredSettings(): SystemSettings {
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load stored settings', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveStoredSettings(settings: SystemSettings): void {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

// 3. Analytics & Inquiry Tracking
export interface AnalyticsData {
  totalSearches: number;
  totalArmadaInquiries: number;
  totalImportInquiries: number;
  totalTrackingSearches: number;
  popularRoutes: Record<string, number>;
  popularFleet: Record<string, number>;
}

export function getStoredAnalytics(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fallback
  }
  return {
    totalSearches: 1842,
    totalArmadaInquiries: 247,
    totalImportInquiries: 119,
    totalTrackingSearches: 932,
    popularRoutes: {
      'Surabaya': 428,
      'Medan': 275,
      'Makassar': 193,
      'Balikpapan': 142,
      'Bandung': 310,
    },
    popularFleet: {
      'PICK UP': 86,
      'BLIND VAN': 74,
      'CDD (6 Roda)': 112,
      'WINGBOX': 95,
      'CONTAINER (20ft & 40ft)': 48,
    },
  };
}

export function recordSearchAnalytics(destination: string, method?: string): void {
  try {
    const stats = getStoredAnalytics();
    stats.totalSearches += 1;
    if (destination) {
      stats.popularRoutes[destination] = (stats.popularRoutes[destination] || 0) + 1;
    }
    localStorage.setItem(STORAGE_ANALYTICS_KEY, JSON.stringify(stats));
  } catch (e) {
    // silent fail
  }
}

export function recordFleetInquiry(fleetName: string): void {
  try {
    const stats = getStoredAnalytics();
    stats.totalArmadaInquiries += 1;
    stats.popularFleet[fleetName] = (stats.popularFleet[fleetName] || 0) + 1;
    localStorage.setItem(STORAGE_ANALYTICS_KEY, JSON.stringify(stats));
  } catch (e) {
    // silent fail
  }
}

export function recordImportInquiry(): void {
  try {
    const stats = getStoredAnalytics();
    stats.totalImportInquiries += 1;
    localStorage.setItem(STORAGE_ANALYTICS_KEY, JSON.stringify(stats));
  } catch (e) {
    // silent fail
  }
}

export function recordTrackingSearch(): void {
  try {
    const stats = getStoredAnalytics();
    stats.totalTrackingSearches += 1;
    localStorage.setItem(STORAGE_ANALYTICS_KEY, JSON.stringify(stats));
  } catch (e) {
    // silent fail
  }
}

export function getStoredInquiries(): CustomerInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_INQUIRIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fallback
  }
  return [];
}

export function saveCustomerInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'createdAt'>): void {
  try {
    const existing = getStoredInquiries();
    const newEntry: CustomerInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    existing.unshift(newEntry);
    localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    // fallback
  }
}

// 4. Real-Time Volumetric & Kubikasi Calculations
export function calculateKubikasiM3(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  koli: number = 1
): number {
  if (!lengthCm || !widthCm || !heightCm) return 0;
  const cbm = (lengthCm * widthCm * heightCm * Math.max(1, koli)) / 1000000;
  return Number(cbm.toFixed(3));
}

export function calculateVolumetricWeight(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  koli: number = 1,
  method: 'Darat' | 'Laut' | 'Udara' | 'Kereta',
  customSettings?: SystemSettings
): number {
  if (!lengthCm || !widthCm || !heightCm) return 0;
  const settings = customSettings || getStoredSettings();

  let factor = settings.volumetricFactorDaratLaut;
  if (method === 'Udara') {
    factor = settings.volumetricFactorUdara;
  } else if (method === 'Kereta') {
    factor = settings.volumetricFactorKereta;
  }

  const volKg = (lengthCm * widthCm * heightCm * Math.max(1, koli)) / factor;
  return Math.ceil(volKg);
}

// 5. Main Logistics Calculator Engine
export function calculateToroRatesEngine(params: {
  originCity: string;
  destinationCity: string;
  actualWeight: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  koli?: number;
  selectedMethod?: 'all' | 'Darat' | 'Laut' | 'Udara' | 'Kereta';
  tariffs?: RouteTariff[];
  settings?: SystemSettings;
}): ToroCalculationResult[] {
  const currentTariffs = params.tariffs || getStoredTariffs();
  const currentSettings = params.settings || getStoredSettings();
  const searchDest = params.destinationCity.trim().toLowerCase();
  const searchOrigin = params.originCity.trim().toLowerCase();
  const safeActualWeight = Math.max(1, Number(params.actualWeight) || 1);
  const safeKoli = Math.max(1, Number(params.koli) || 1);

  // Filter routes by destination (active only)
  let matched = currentTariffs.filter((t) => t.status === 'active');

  // Match destination
  matched = matched.filter((t) => {
    const dest = t.destination_city.toLowerCase();
    return dest.includes(searchDest) || searchDest.includes(dest);
  });

  // Filter shipping method if chosen
  if (params.selectedMethod && params.selectedMethod !== 'all') {
    matched = matched.filter((t) => t.shipping_method === params.selectedMethod);
  }

  const kubikasi = calculateKubikasiM3(
    params.lengthCm || 0,
    params.widthCm || 0,
    params.heightCm || 0,
    safeKoli
  );

  return matched.map((route) => {
    // Volumetric weight for this specific shipping method
    const volWeight = calculateVolumetricWeight(
      params.lengthCm || 0,
      params.widthCm || 0,
      params.heightCm || 0,
      safeKoli,
      route.shipping_method,
      currentSettings
    );

    // Chargeable weight = max(actual, volumetric)
    const chargeableWeight = Math.max(safeActualWeight, volWeight);
    const isVolumetricApplied = volWeight > safeActualWeight;

    // Minimum weight comparison:
    // If chargeableWeight >= minimum_weight -> chargeableWeight * selling_price
    // If chargeableWeight < minimum_weight -> minimum_weight * selling_price
    const minWeight = route.minimum_weight || 1;
    const isMinimumApplied = chargeableWeight < minWeight;
    const effectiveWeightForPrice = Math.max(chargeableWeight, minWeight);

    const totalCost = Math.round(effectiveWeightForPrice * route.selling_price);

    return {
      route,
      origin: route.origin_city,
      destination: route.destination_city,
      shipping_method: route.shipping_method,
      selling_price: route.selling_price,
      minimum_weight: minWeight,
      actual_weight: safeActualWeight,
      volumetric_weight: volWeight,
      chargeable_weight: chargeableWeight,
      is_volumetric_applied: isVolumetricApplied,
      is_minimum_applied: isMinimumApplied,
      kubikasi_m3: kubikasi,
      lead_time: route.lead_time,
      total_cost: totalCost,
    };
  });
}

// 6. Dynamic WhatsApp Link Generators
export function generateDynamicWhatsAppUrl(
  type: 'general' | 'ongkir' | 'armada' | 'import' | 'tracking',
  payload: Record<string, any> = {},
  customSettings?: SystemSettings
): string {
  const settings = customSettings || getStoredSettings();
  const phone = settings.whatsappRaw || TORO_COMPANY_INFO.whatsappRaw;
  let message = '';

  switch (type) {
    case 'general':
      message = `Halo TORO Transportasi dan Logistic, saya ingin menanyakan layanan logistik.`;
      break;

    case 'ongkir':
      message = `Halo TORO Transportasi dan Logistic,

Saya ingin melakukan pengecekan/pemesanan pengiriman.

Asal: ${payload.origin || 'Jakarta'}
Tujuan: ${payload.destination || 'Surabaya'}
Jalur: ${payload.method || 'Darat'}
Berat: ${payload.weight || 100} kg
Volume: ${payload.volume || '0,50'} m³
Estimasi tarif: ${payload.totalCost ? formatRupiah(payload.totalCost) : '-'}

Mohon dibantu proses selanjutnya.

Nama: ${payload.senderName || ''}
No. HP: ${payload.senderPhone || ''}`;
      break;

    case 'armada':
      message = `Halo TORO Transportasi dan Logistic,

Saya ingin menanyakan harga sewa armada.

Jenis armada:
${payload.vehicleName || 'Pick Up'}

Lokasi:
${payload.pickupLocation || 'Jakarta'}

Tujuan:
${payload.destination || 'Surabaya'}

Tanggal penggunaan:
${payload.date || 'Segera'}

Durasi:
${payload.duration || '1 Trip'}

Mohon informasi harga dan ketersediaan armada.`;
      break;

    case 'import':
      message = `Halo TORO Transportasi dan Logistic,

Saya ingin meminta quotation layanan import TORO:

Nama: ${payload.name || '-'}
Perusahaan: ${payload.company || '-'}
Asal Negara: ${payload.country || 'China'}
Pelabuhan/Bandara: ${payload.port || '-'}
Jenis Barang: ${payload.goodsType || '-'}
Jumlah: ${payload.koli || '1'} koli
Berat: ${payload.weight || '-'} kg
Volume: ${payload.volume || '-'} m³
Tujuan Indonesia: ${payload.destination || 'Jakarta'}
Catatan: ${payload.notes || '-'}

Mohon estimasi penawaran harga dan prosedur import.`;
      break;

    case 'tracking':
      message = `Halo TORO Transportasi dan Logistic, saya ingin menanyakan status pengiriman dengan nomor resi: ${payload.resi || ''}. Mohon bantuan informasi status dan posisi kargo terkini.`;
      break;

    default:
      message = `Halo TORO Transportasi dan Logistic, saya ingin menanyakan layanan logistik.`;
      break;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
