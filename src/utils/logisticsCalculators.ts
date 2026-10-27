export interface DomesticCalculationResult {
  chargeableWeight: number;
  actualWeight: number;
  volumetricWeightDarat: number;
  volumetricWeightUdara: number;
  isVolumetricDarat: boolean;
  isVolumetricUdara: boolean;
  darat: {
    available: boolean;
    ratePerKg: number;
    basePrice: number;
    insuranceCost: number;
    woodPackingCost: number;
    totalPrice: number;
    sla: string;
    fleetRecommendation: string;
  };
  laut: {
    available: boolean;
    ratePerKg: number;
    basePrice: number;
    insuranceCost: number;
    woodPackingCost: number;
    totalPrice: number;
    sla: string;
    fleetRecommendation: string;
  };
  udara: {
    available: boolean;
    ratePerKg: number;
    basePrice: number;
    insuranceCost: number;
    woodPackingCost: number;
    totalPrice: number;
    sla: string;
    fleetRecommendation: string;
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDomesticRates(
  originCity: string,
  destCity: string,
  actualWeight: number,
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  koliCount: number = 1,
  declaredItemValue: number = 0,
  hasInsurance: boolean = false,
  hasPackingWood: boolean = false
): DomesticCalculationResult {
  // Volume formula
  // Darat & Laut: (P x L x T) / 4000
  // Udara: (P x L x T) / 6000
  const singleVolDarat = (lengthCm * widthCm * heightCm) / 4000;
  const singleVolUdara = (lengthCm * widthCm * heightCm) / 6000;

  const totalVolDarat = Math.ceil(singleVolDarat * koliCount);
  const totalVolUdara = Math.ceil(singleVolUdara * koliCount);

  const chargeableWeightDarat = Math.max(actualWeight, totalVolDarat);
  const chargeableWeightUdara = Math.max(actualWeight, totalVolUdara);

  // Determine base rates based on destination distance heuristic
  let daratPerKg = 2500;
  let lautPerKg = 1800;
  let udaraPerKg = 15000;
  let daratSla = '2–3 Hari';
  let lautSla = '5–8 Hari';
  let udaraSla = '1–2 Hari';
  let daratAvail = true;

  const destLower = destCity.toLowerCase();
  if (destLower.includes('surabaya') || destLower.includes('semarang') || destLower.includes('bandung') || destLower.includes('solo') || destLower.includes('malang')) {
    daratPerKg = 2400;
    lautPerKg = 1800;
    udaraPerKg = 14500;
    daratSla = '2–3 Hari Kerja';
    lautSla = '4–6 Hari';
    udaraSla = '1 Hari (Next Day)';
  } else if (destLower.includes('bali') || destLower.includes('denpasar')) {
    daratPerKg = 3500;
    lautPerKg = 2600;
    udaraPerKg = 18000;
    daratSla = '3–4 Hari';
    lautSla = '5–7 Hari';
    udaraSla = '1 Hari';
  } else if (destLower.includes('medan') || destLower.includes('palembang') || destLower.includes('pekanbaru') || destLower.includes('lampung')) {
    daratPerKg = 4500;
    lautPerKg = 2800;
    udaraPerKg = 22000;
    daratSla = '4–6 Hari';
    lautSla = '6–9 Hari';
    udaraSla = '1–2 Hari';
  } else if (destLower.includes('makassar') || destLower.includes('manado') || destLower.includes('kendari')) {
    daratAvail = false; // Luar pulau utama tanpa jembatan darat
    lautPerKg = 3200;
    udaraPerKg = 24000;
    lautSla = '5–8 Hari Kerja';
    udaraSla = '1–2 Hari';
  } else if (destLower.includes('balikpapan') || destLower.includes('samarinda') || destLower.includes('banjarmasin') || destLower.includes('pontianak')) {
    daratAvail = false;
    lautPerKg = 3400;
    udaraPerKg = 23000;
    lautSla = '6–9 Hari Kerja';
    udaraSla = '1–2 Hari';
  } else if (destLower.includes('jayapura') || destLower.includes('sorong') || destLower.includes('ambon')) {
    daratAvail = false;
    lautPerKg = 6500;
    udaraPerKg = 42000;
    lautSla = '14–21 Hari';
    udaraSla = '2–3 Hari';
  }

  // Minimum weights standard for cargo:
  // Darat: min 30kg, Laut: min 50kg, Udara: min 10kg
  const billableWeightDarat = Math.max(chargeableWeightDarat, 30);
  const billableWeightLaut = Math.max(chargeableWeightDarat, 50);
  const billableWeightUdara = Math.max(chargeableWeightUdara, 10);

  const basePriceDarat = billableWeightDarat * daratPerKg;
  const basePriceLaut = billableWeightLaut * lautPerKg;
  const basePriceUdara = billableWeightUdara * udaraPerKg;

  // Additional options
  const insuranceCost = hasInsurance && declaredItemValue > 0 ? Math.round(declaredItemValue * 0.002) : 0; // 0.2% premi cargo
  const woodPackingCost = hasPackingWood ? (lengthCm + widthCm + heightCm) * 350 * koliCount : 0;

  return {
    chargeableWeight: chargeableWeightDarat,
    actualWeight,
    volumetricWeightDarat: totalVolDarat,
    volumetricWeightUdara: totalVolUdara,
    isVolumetricDarat: totalVolDarat > actualWeight,
    isVolumetricUdara: totalVolUdara > actualWeight,
    darat: {
      available: daratAvail,
      ratePerKg: daratPerKg,
      basePrice: basePriceDarat,
      insuranceCost,
      woodPackingCost,
      totalPrice: basePriceDarat + insuranceCost + woodPackingCost,
      sla: daratSla,
      fleetRecommendation: chargeableWeightDarat > 2000 ? 'Truk Fuso / Wingbox' : 'Truk CDD Box / Blind Van',
    },
    laut: {
      available: true,
      ratePerKg: lautPerKg,
      basePrice: basePriceLaut,
      insuranceCost,
      woodPackingCost,
      totalPrice: basePriceLaut + insuranceCost + woodPackingCost,
      sla: lautSla,
      fleetRecommendation: 'Kapal Kontainer LCL / Roro Cepat',
    },
    udara: {
      available: true,
      ratePerKg: udaraPerKg,
      basePrice: basePriceUdara,
      insuranceCost,
      woodPackingCost,
      totalPrice: basePriceUdara + insuranceCost + woodPackingCost,
      sla: udaraSla,
      fleetRecommendation: 'Pesawat Freighter Kargo Udara Komersial',
    },
  };
}

export function generateWhatsAppLink(
  type: 'rate' | 'import' | 'tracking' | 'b2b' | 'general',
  data: Record<string, any> = {}
): string {
  const phone = '6281289008899'; // Official Nusantara Cargo hotline
  let message = '';

  switch (type) {
    case 'rate':
      message = `Halo Nusantara Cargo, saya ingin konfirmasi tarif dan pesan pengiriman:
- Asal: ${data.origin || 'Jakarta'}
- Tujuan: ${data.destination || 'Surabaya'}
- Berat/Vol: ${data.weight || 0} kg (${data.koli || 1} koli)
- Jenis Barang: ${data.itemType || 'General Cargo'}
- Layanan yang diminati: ${data.service || 'Cargo Darat / Laut'}
Mohon info ketersediaan jadwal pickup armada.`;
      break;

    case 'import':
      message = `Halo Nusantara Cargo, saya ingin konsultasi jasa import ke Indonesia:
- Negara Asal: ${data.country || 'China'}
- Jenis Barang: ${data.goodsType || 'Mesin & Elektronik'}
- Estimasi Muatan: ${data.volume || '-'} CBM / ${data.weight || '-'} kg
- Skema yang diminati: ${data.scheme || 'Import Door to Door / Undername IOR'}
Mohon bantuan perhitungan biaya & regulasi kepabeanan.`;
      break;

    case 'tracking':
      message = `Halo CS Nusantara Cargo, saya ingin mengecek status resi pengiriman:
- No. Resi: ${data.resi || ''}
Mohon informasi posisi terkini dan estimasi tiba. Terima kasih.`;
      break;

    case 'b2b':
      message = `Halo Tim Sales Korporat Nusantara Cargo, kami dari perusahaan:
- Nama Perusahaan: ${data.company || ''}
- Kebutuhan: Pengiriman Rutin / Kontrak B2B / Sewa Truk FTL / Import Kontainer
- Kontak: ${data.name || ''} (${data.phone || ''})
Mohon dijadwalkan meeting atau pengiriman proposal penawaran harga.`;
      break;

    default:
      message = `Halo Customer Care Nusantara Cargo, saya ingin menanyakan informasi layanan ekspedisi domestik & jasa import.`;
      break;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
