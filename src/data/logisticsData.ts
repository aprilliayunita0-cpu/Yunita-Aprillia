export interface TrackingCheckpoint {
  id: string;
  status: 'Pickup' | 'Transit' | 'Sampai Hub' | 'Out for Delivery' | 'Delivered';
  location: string;
  hubName: string;
  timestamp: string;
  note: string;
  completed: boolean;
  current?: boolean;
}

export interface ShipmentData {
  resi: string;
  sender: {
    name: string;
    city: string;
  };
  receiver: {
    name: string;
    city: string;
    address: string;
  };
  service: 'Cargo Darat Regular' | 'Cargo Laut LCL' | 'Air Freight Express' | 'Import Door to Door China';
  origin: string;
  destination: string;
  weight: number; // kg
  volumeWeight?: number;
  koli: number;
  itemDescription: string;
  status: 'Pickup' | 'Transit' | 'Sampai Hub' | 'Out for Delivery' | 'Delivered';
  estimatedArrival: string;
  timeline: TrackingCheckpoint[];
}

export const MOCK_SHIPMENTS: Record<string, ShipmentData> = {
  'NXT-8849201-JKT': {
    resi: 'NXT-8849201-JKT',
    sender: { name: 'PT Sinar Jaya Mandiri', city: 'Jakarta Barat' },
    receiver: { name: 'CV Makmur Abadi', city: 'Surabaya', address: 'Jl. Rungkut Industri No. 45, Rungkut, Surabaya' },
    service: 'Cargo Darat Regular',
    origin: 'Jakarta (Hub Cengkareng)',
    destination: 'Surabaya (Hub Rungkut)',
    weight: 240,
    volumeWeight: 210,
    koli: 8,
    itemDescription: 'Sparepart Mesin Industri & Kabel Rol',
    status: 'Out for Delivery',
    estimatedArrival: 'Hari ini, 16:00 WIB',
    timeline: [
      {
        id: '1',
        status: 'Pickup',
        location: 'Jakarta Barat',
        hubName: 'Pool Armada Daan Mogot',
        timestamp: '03 Okt 2026, 10:15 WIB',
        note: 'Paket telah dipickup oleh Driver Armada Nusantara Cargo',
        completed: true,
      },
      {
        id: '2',
        status: 'Sampai Hub',
        location: 'Jakarta Barat',
        hubName: 'Sortation Center Cengkareng Hub',
        timestamp: '03 Okt 2026, 14:30 WIB',
        note: 'Selesai timbang aktual (240kg) dan pengecekan packing pallet kayu',
        completed: true,
      },
      {
        id: '3',
        status: 'Transit',
        location: 'Semarang',
        hubName: 'Transit Hub Krapyak Semarang',
        timestamp: '04 Okt 2026, 04:20 WIB',
        note: 'Truk Fuso Wingbox tiba di hub transit pantura, persiapan transit Surabaya',
        completed: true,
      },
      {
        id: '4',
        status: 'Sampai Hub',
        location: 'Surabaya',
        hubName: 'Distribution Center Hub Rungkut',
        timestamp: '05 Okt 2026, 07:45 WIB',
        note: 'Kargo tiba di gudang tujuan, sortir rute kiriman akhir',
        completed: true,
      },
      {
        id: '5',
        status: 'Out for Delivery',
        location: 'Surabaya',
        hubName: 'Armada CDD Box No. 12 (Supir: Bpk. Joko Santoso)',
        timestamp: '05 Okt 2026, 09:30 WIB',
        note: 'Sedang dalam pengantaran menuju lokasi penerima',
        completed: true,
        current: true,
      },
      {
        id: '6',
        status: 'Delivered',
        location: 'Surabaya',
        hubName: 'Alamat Penerima',
        timestamp: 'Estimasi: 05 Okt 2026, 16:00 WIB',
        note: 'Menunggu konfirmasi tanda terima & foto POD penerima',
        completed: false,
      },
    ],
  },
  'NXT-552194-SBY': {
    resi: 'NXT-552194-SBY',
    sender: { name: 'PT Surya Prima Tekstil', city: 'Surabaya' },
    receiver: { name: 'Toko Busana Cantika', city: 'Makassar', address: 'Jl. Somba Opu No. 88, Makassar' },
    service: 'Cargo Laut LCL',
    origin: 'Surabaya (Tanjung Perak)',
    destination: 'Makassar (Soekarno Hatta Port)',
    weight: 580,
    volumeWeight: 620,
    koli: 14,
    itemDescription: 'Tekstil Kain Gulungan & Aksesoris Garmen',
    status: 'Transit',
    estimatedArrival: '08 Okt 2026',
    timeline: [
      {
        id: '1',
        status: 'Pickup',
        location: 'Surabaya',
        hubName: 'Hub Margomulyo',
        timestamp: '01 Okt 2026, 13:00 WIB',
        note: 'Barang dijemput armada truk',
        completed: true,
      },
      {
        id: '2',
        status: 'Sampai Hub',
        location: 'Surabaya',
        hubName: 'Depo Kontainer Pelabuhan Tj Perak',
        timestamp: '02 Okt 2026, 11:00 WIB',
        note: 'Stuffing ke kontainer LCL 40ft (No. TCLU-892109)',
        completed: true,
      },
      {
        id: '3',
        status: 'Transit',
        location: 'Laut Jawa / Selat Makassar',
        hubName: 'Kapal Kontainer KM Dharma Rucitra',
        timestamp: '03 Okt 2026, 22:00 WIB',
        note: 'Kapal berlayar menuju Pelabuhan Soekarno Hatta Makassar',
        completed: true,
        current: true,
      },
      {
        id: '4',
        status: 'Sampai Hub',
        location: 'Makassar',
        hubName: 'Depo Nusantara Cargo Makassar',
        timestamp: 'Estimasi: 07 Okt 2026',
        note: 'Bongkar muat kontainer & sortir pengantaran',
        completed: false,
      },
      {
        id: '5',
        status: 'Delivered',
        location: 'Makassar',
        hubName: 'Alamat Penerima',
        timestamp: 'Estimasi: 08 Okt 2026',
        note: 'Pengantaran door-to-door',
        completed: false,
      },
    ],
  },
  'IMP-CN24-9912': {
    resi: 'IMP-CN24-9912',
    sender: { name: 'Guangzhou Electron Technology Co., Ltd', city: 'Guangzhou, China' },
    receiver: { name: 'PT Digital Solusindo Pratama', city: 'Jakarta Pusat', address: 'Komp. Ruko Roxy Mas Blok D2/14, Jakarta' },
    service: 'Import Door to Door China',
    origin: 'Guangzhou Warehouse, China',
    destination: 'Jakarta Pusat, Indonesia',
    weight: 320,
    volumeWeight: 380,
    koli: 6,
    itemDescription: 'Mesin Laser Engraving & Komponen Elektronik',
    status: 'Sampai Hub',
    estimatedArrival: 'Besok, 06 Okt 2026',
    timeline: [
      {
        id: '1',
        status: 'Pickup',
        location: 'Guangzhou, China',
        hubName: 'Gudang Konsolidasi Nusantara China',
        timestamp: '25 Sep 2026, 14:00 CST',
        note: 'Penerimaan cargo dari supplier, cek packing pallet & dokumen invoice/packing list',
        completed: true,
      },
      {
        id: '2',
        status: 'Transit',
        location: 'Pelabuhan Nansha / Laut Cina Selatan',
        hubName: 'International Ocean Freight Line',
        timestamp: '28 Sep 2026, 09:00 CST',
        note: 'Kapal berlayar dari Pelabuhan Guangzhou menuju Tanjung Priok Jakarta',
        completed: true,
      },
      {
        id: '3',
        status: 'Sampai Hub',
        location: 'Jakarta Utara',
        hubName: 'Kawasan Pabean TPS Tanjung Priok',
        timestamp: '03 Okt 2026, 16:30 WIB',
        note: 'Kapal sandar, proses customs clearance & submit PIB oleh PPJK resmi (Jalur Hijau: SPPB terbit)',
        completed: true,
      },
      {
        id: '4',
        status: 'Sampai Hub',
        location: 'Jakarta Barat',
        hubName: 'Central Logistics Hub Cengkareng',
        timestamp: '05 Okt 2026, 11:15 WIB',
        note: 'Barang keluar dari pelabuhan (SPPB clear), masuk gudang sortir pengiriman lokal',
        completed: true,
        current: true,
      },
      {
        id: '5',
        status: 'Out for Delivery',
        location: 'Jakarta Pusat',
        hubName: 'Armada Pengantaran Khusus B2B',
        timestamp: 'Estimasi: 06 Okt 2026, 09:00 WIB',
        note: 'Jadwal pengiriman akhir ke alamat gudang penerima',
        completed: false,
      },
      {
        id: '6',
        status: 'Delivered',
        location: 'Jakarta Pusat',
        hubName: 'Alamat Penerima',
        timestamp: 'Estimasi: 06 Okt 2026, 14:00 WIB',
        note: 'Penyerahan barang & serah terima B/L serta invoice resmi',
        completed: false,
      },
    ],
  },
};

export interface RouteRateOption {
  serviceName: string;
  category: 'Darat' | 'Laut' | 'Udara' | 'Trucking FTL';
  sla: string;
  minWeight: number; // kg
  ratePerKg: number;
  description: string;
  features: string[];
}

export const CITIES_DATA = [
  { province: 'DKI Jakarta', city: 'Jakarta Barat', tier: 1 },
  { province: 'DKI Jakarta', city: 'Jakarta Pusat', tier: 1 },
  { province: 'DKI Jakarta', city: 'Jakarta Selatan', tier: 1 },
  { province: 'DKI Jakarta', city: 'Jakarta Timur', tier: 1 },
  { province: 'DKI Jakarta', city: 'Jakarta Utara', tier: 1 },
  { province: 'Jawa Barat', city: 'Kota Bandung', tier: 1 },
  { province: 'Jawa Barat', city: 'Kota Bekasi', tier: 1 },
  { province: 'Jawa Barat', city: 'Kabupaten Bogor', tier: 1 },
  { province: 'Jawa Barat', city: 'Kota Tangerang', tier: 1 },
  { province: 'Jawa Tengah', city: 'Kota Semarang', tier: 1 },
  { province: 'Jawa Tengah', city: 'Kota Surakarta (Solo)', tier: 1 },
  { province: 'DI Yogyakarta', city: 'Kota Yogyakarta', tier: 1 },
  { province: 'Jawa Timur', city: 'Kota Surabaya', tier: 1 },
  { province: 'Jawa Timur', city: 'Kota Malang', tier: 1 },
  { province: 'Bali', city: 'Kota Denpasar', tier: 2 },
  { province: 'Sumatera Utara', city: 'Kota Medan', tier: 2 },
  { province: 'Sumatera Selatan', city: 'Kota Palembang', tier: 2 },
  { province: 'Riau', city: 'Kota Pekanbaru', tier: 2 },
  { province: 'Kepulauan Riau', city: 'Kota Batam', tier: 2 },
  { province: 'Lampung', city: 'Kota Bandar Lampung', tier: 2 },
  { province: 'Kalimantan Timur', city: 'Kota Balikpapan', tier: 3 },
  { province: 'Kalimantan Timur', city: 'Kota Samarinda', tier: 3 },
  { province: 'Kalimantan Selatan', city: 'Kota Banjarmasin', tier: 3 },
  { province: 'Kalimantan Barat', city: 'Kota Pontianak', tier: 3 },
  { province: 'Sulawesi Selatan', city: 'Kota Makassar', tier: 3 },
  { province: 'Sulawesi Utara', city: 'Kota Manado', tier: 3 },
  { province: 'Nusa Tenggara Barat', city: 'Kota Mataram', tier: 3 },
  { province: 'Maluku', city: 'Kota Ambon', tier: 4 },
  { province: 'Papua', city: 'Kota Jayapura', tier: 4 },
  { province: 'Papua Barat', city: 'Kota Sorong', tier: 4 },
];

export const ITEM_CATEGORIES = [
  'General Cargo / Barang Umum',
  'Mesin Pabrik & Alat Berat',
  'Sparepart Otomotif & Mesin',
  'Tekstil, Konveksi & Garmen',
  'Elektronik & Perangkat Komputer',
  'Furniture & Perlengkapan Rumah',
  'Material Konstruksi & Besi Baja',
  'Bahan Kimia Non-Dangerous',
  'Makanan Olahan / Kering Kemasan',
  'Barang Pindahan Rumah / Kantor',
];

export const POPULAR_ROUTES = [
  {
    from: 'Jakarta',
    to: 'Surabaya',
    daratRate: 2500,
    daratSla: '2-3 Hari',
    lautRate: 1800,
    lautSla: '4-6 Hari',
    udaraRate: 14500,
    udaraSla: '1 Hari',
    minWeight: 50,
    highlight: 'Rute Terpadat Jalur Tol Trans Jawa',
  },
  {
    from: 'Jakarta',
    to: 'Denpasar (Bali)',
    daratRate: 3500,
    daratSla: '3-4 Hari',
    lautRate: 2600,
    lautSla: '5-7 Hari',
    udaraRate: 18000,
    udaraSla: '1 Hari',
    minWeight: 50,
    highlight: 'Armada Truk Box Terjadwal Setiap Hari',
  },
  {
    from: 'Jakarta',
    to: 'Medan',
    daratRate: 4800,
    daratSla: '4-6 Hari',
    lautRate: 2800,
    lautSla: '6-9 Hari',
    udaraRate: 22000,
    udaraSla: '1-2 Hari',
    minWeight: 50,
    highlight: 'Koneksi Kapal Cepat Roro & Kontainer',
  },
  {
    from: 'Jakarta',
    to: 'Makassar',
    daratRate: 0, // Tidak ada darat murni
    daratSla: '-',
    lautRate: 3200,
    lautSla: '5-8 Hari',
    udaraRate: 24000,
    udaraSla: '1-2 Hari',
    minWeight: 50,
    highlight: 'Pintu Gerbang Distribusi Indonesia Timur',
  },
  {
    from: 'Jakarta',
    to: 'Balikpapan',
    daratRate: 0,
    daratSla: '-',
    lautRate: 3500,
    lautSla: '6-9 Hari',
    udaraRate: 23500,
    udaraSla: '1-2 Hari',
    minWeight: 50,
    highlight: 'Dukungan Proyek IKN & Industri Migas',
  },
  {
    from: 'Surabaya',
    to: 'Banjarmasin',
    daratRate: 0,
    daratSla: '-',
    lautRate: 2600,
    lautSla: '3-5 Hari',
    udaraRate: 17500,
    udaraSla: '1 Hari',
    minWeight: 50,
    highlight: 'Kapal Ferry Roro Cepat Rutin 3x Seminggu',
  },
];

export const IMPORT_ORIGIN_COUNTRIES = [
  { code: 'CN', name: 'China (Guangzhou, Yiwu, Shenzhen, Ningbo, Shanghai)', seaSla: '18-25 Hari', airSla: '4-7 Hari', currency: 'RMB / USD' },
  { code: 'SG', name: 'Singapore (Changi Airport, Jurong Port)', seaSla: '5-8 Hari', airSla: '2-3 Hari', currency: 'SGD / USD' },
  { code: 'MY', name: 'Malaysia (Kuala Lumpur, Port Klang)', seaSla: '7-10 Hari', airSla: '2-4 Hari', currency: 'MYR / USD' },
  { code: 'TH', name: 'Thailand (Bangkok, Laem Chabang)', seaSla: '10-14 Hari', airSla: '3-5 Hari', currency: 'THB / USD' },
  { code: 'TW', name: 'Taiwan (Taipei, Kaohsiung)', seaSla: '14-18 Hari', airSla: '3-5 Hari', currency: 'TWD / USD' },
  { code: 'KR', name: 'Korea Selatan (Seoul, Busan)', seaSla: '16-22 Hari', airSla: '4-6 Hari', currency: 'KRW / USD' },
  { code: 'JP', name: 'Jepang (Tokyo, Yokohama, Osaka)', seaSla: '18-24 Hari', airSla: '4-6 Hari', currency: 'JPY / USD' },
  { code: 'US', name: 'Amerika Serikat (Los Angeles, New York)', seaSla: '30-40 Hari', airSla: '5-8 Hari', currency: 'USD' },
  { code: 'EU', name: 'Eropa (Jerman, Belanda, Italia)', seaSla: '32-42 Hari', airSla: '5-8 Hari', currency: 'EUR' },
];

export const IMPORT_FAQS = [
  {
    question: 'Apa itu HS Code dan mengapa sangat penting saat import?',
    answer: 'HS Code (Harmonized System Code) adalah sistem klasifikasi standar internasional untuk mengidentifikasi jenis barang impor. HS Code menentukan besaran tarif Bea Masuk (0%–30%), PPN (11%), PPh Pasal 22, serta apakah barang tersebut terkena aturan Lartas (Larangan dan Pembatasan) yang mewajibkan izin khusus seperti SNI, BPOM, atau Persetujuan Impor (PI). Tim kami siap membantu Anda melakukan penelusuran HS Code resmi melalui portal INSW.',
  },
  {
    question: 'Berapa perkiraan total biaya import barang ke Indonesia?',
    answer: 'Secara umum komponen biaya import meliputi: (1) Biaya pembelian barang ke supplier (Incoterm EXW/FOB/CIF), (2) Ongkos angkut internasional (Freight darat/laut/udara), (3) Bea Masuk sesuai HS Code, (4) Pajak Impor (PPN 11% & PPh Pasal 22 2.5%–7.5% untuk pemilik API-U), (5) Biaya dokumen kepabeanan & handling pelabuhan (THC, Storage, EDI), serta (6) Transportasi delivery domestik ke gudang Anda. Jika menggunakan sistem Door to Door All-In, seluruh biaya tersebut sudah dirangkum dalam satu tarif flat per CBM atau per KG.',
  },
  {
    question: 'Apakah bisa import barang jika belum punya perusahaan (PT) atau izin API-U?',
    answer: 'Tentu bisa! Kami menyediakan layanan Undername / IOR (Importer of Record). Dalam skema ini, barang Anda diimpor menggunakan legalitas dan izin izin impor lengkap milik Nusantara Cargo secara legal, sehingga Anda sebagai perorangan atau UMKM tetap bisa mengimpor barang dari luar negeri tanpa harus mendirikan PT atau mengurus izin NIB/API sendiri.',
  },
  {
    question: 'Berapa lama estimasi proses pengiriman import?',
    answer: 'Durasi pengiriman bervariasi tergantung moda transportasi: (1) Air Freight Express: 3–7 hari kerja sejak barang tiba di warehouse origin kami, (2) Sea Freight LCL/FCL dari China/Asia Tenggara: 18–25 hari, (3) Sea Freight dari Amerika/Eropa: 30–45 hari. Durasi tersebut sudah mencakup pelayaran, proses customs clearance pelabuhan (rata-rata 2–3 hari untuk Jalur Hijau), hingga pengiriman ke alamat tujuan.',
  },
  {
    question: 'Apa saja dokumen utama yang harus disiapkan untuk import?',
    answer: 'Dokumen pokok impor meliputi: Commercial Invoice, Packing List (PL), Bill of Lading (B/L) untuk laut atau Air Waybill (AWB) untuk udara, Certificate of Origin (COO / Form E/AK/D jika ingin bea masuk 0% fasilitas FTA), serta polis asuransi pengiriman (Marine Cargo Insurance). Kami akan memandu Anda dan supplier Anda agar format dokumen sesuai dengan ketentuan Bea Cukai Indonesia.',
  },
  {
    question: 'Apa perbedaan Import Door to Door dengan Port to Port?',
    answer: 'Port to Port hanya mengangkut barang dari pelabuhan asal ke pelabuhan tujuan Indonesia; Anda harus mengurus sendiri dokumen bea cukai, bayar pajak, dan menyewa truk lokal. Sedangkan Door to Door adalah solusi terima beres (end-to-end): kami jemput di supplier/gudang luar negeri, urus shipping, customs clearance, bea cukai & pajak, lalu kirim langsung ke depan pintu gudang Anda.',
  },
  {
    question: 'Apakah semua jenis barang bisa diimpor ke Indonesia?',
    answer: 'Hampir semua barang komersial legal dapat diimpor, kecuali barang terlarang (narkotika, senjata api, bahan peledak, barang bekas tertentu yang dilarang Kemendag). Beberapa barang memiliki status Lartas (seperti kosmetik, suplemen, tekstil, mesin bekas, elektronik tertentu) yang membutuhkan izin kementerian teknis (BPOM, Kemenperin, Kemendag). Hubungi tim kami untuk konsultasi kelayakan barang sebelum supplier Anda mengirim.',
  },
  {
    question: 'Apa itu jalur merah, jalur kuning, dan jalur hijau di Bea Cukai?',
    answer: 'Ini adalah profil risiko sistem otomatis Bea Cukai: (1) Jalur Hijau: Dokumen langsung disetujui (SPPB keluar) tanpa pemeriksaan fisik, (2) Jalur Kuning: Dilakukan pengecekan dokumen tambahan, (3) Jalur Merah: Dilakukan pemeriksaan fisik barang di dermaga (Behandle) sebelum SPPB diterbitkan. Dengan kepatuhan deklarasi yang teliti dari tim PPJK kami, mayoritas shipment pelanggan kami mendapatkan jalur hijau yang cepat.',
  },
];

export const BLOG_ARTICLES = [
  {
    id: 'cara-hitung-ongkir-cargo-kubikasi',
    title: 'Cara Menghitung Berat Volumetrik (Kubikasi) vs Berat Aktual Cargo',
    category: 'Ekspedisi Domestik',
    readTime: '4 menit baca',
    date: '02 Oktober 2026',
    excerpt: 'Sering bingung mengapa tagihan cargo lebih besar dari timbangan aktual? Pahami rumus perhitungan P x L x T / 4000 untuk darat dan / 6000 untuk udara.',
    content: `
Dalam dunia logistik dan pengiriman kargo, biaya pengiriman dihitung berdasarkan mana yang lebih besar antara berat aktual (timbangan fisik) atau berat volumetrik (ruang yang ditempati barang di dalam armada).

### 1. Rumus Volumetrik Kargo Darat & Laut
Untuk pengiriman cargo darat dan laut di Indonesia, rumus standar industri adalah:
**(Panjang x Lebar x Tinggi dalam cm) / 4.000 = Berat Volumetrik (Kg)**

*Contoh Kasus:*
Anda mengirimkan box sparepart atau furniture dengan dimensi:
- Panjang: 100 cm
- Lebar: 80 cm
- Tinggi: 50 cm
- Berat fisik saat ditimbang: 45 kg

Perhitungan Volumetrik:
(100 x 80 x 50) / 4.000 = 400.000 / 4.000 = **100 kg volumetrik**.
Karena 100 kg lebih besar daripada berat aktual 45 kg, maka tarif yang digunakan adalah **100 kg** (Berat Tertagih / Chargeable Weight).

### 2. Rumus Volumetrik Kargo Udara (Air Freight)
Untuk pesawat udara dengan kapasitas ruang terbatas, pembaginya adalah 6.000:
**(Panjang x Lebar x Tinggi dalam cm) / 6.000 = Berat Volumetrik (Kg)**

*Tips Menghemat Biaya:*
1. Gunakan kardus atau packing yang pas dengan ukuran barang agar tidak ada ruang kosong berlebih.
2. Manfaatkan bundling atau strapping jika mengirim beberapa koli kecil.
3. Konsultasikan dengan tim Nusantara Cargo untuk rekomendasi moda transportasi terbaik.
    `,
  },
  {
    id: 'panduan-import-china-1688-alibaba',
    title: 'Panduan Lengkap Import Barang dari China untuk Pebisnis & UMKM',
    category: 'Jasa Import',
    readTime: '6 menit baca',
    date: '28 September 2026',
    excerpt: 'Langkah praktis belanja grosir di 1688, Taobao, atau Alibaba hingga barang sampai di gudang Anda dengan aman melalui jasa forwarder terpercaya.',
    content: `
Mengimpor barang dari China menjadi salah satu strategi utama pebisnis di Indonesia untuk mendapatkan harga modal langsung dari pabrik. Berikut tahapan penting yang wajib Anda pahami:

### 1. Memilih Platform Supplier
- **Alibaba**: Cocok untuk pembeli internasional, menerima bahasa Inggris, mendukung pembayaran kartu kredit internasional atau TT Bank, minimum order (MOQ) cenderung menengah hingga tinggi.
- **1688.com**: Platform domestik pabrik China dengan harga paling murah (harga tangan pertama). Memerlukan agen pembayaran yuan (RMB) dan warehouse di China daratan.

### 2. Menentukan Skema Pengiriman
- **Import Door to Door (All-in)**: Cocok untuk pemula dan UMKM. Seluruh biaya pengangkutan, pajak impor, bea masuk, dan pengiriman lokal dihitung dalam satu tarif per CBM (meter kubik) atau per KG. Anda tidak perlu pusing memikirkan dokumen PIB atau izin impor.
- **Import Resmi (Undername / IOR atau Legalitas Sendiri)**: Cocok untuk korporasi yang membutuhkan faktur pajak resmi, bukti bayar PIB untuk laporan pembukuan fiskal.

### 3. Alur Pengiriman Bersama Nusantara Cargo
1. Supplier mengirim barang ke gudang konsolidasi kami di Guangzhou atau Yiwu.
2. Tim kami di China melakukan penimbangan, pengukuran CBM, dan inspeksi visual packaging.
3. Barang dimuat ke kontainer laut (LCL) atau pesawat kargo (Air Freight).
4. Pengurusan proses customs clearance di Pelabuhan Tanjung Priok / Soekarno Hatta.
5. Barang didistribusikan ke alamat gudang Anda di seluruh Indonesia.
    `,
  },
  {
    id: 'perbedaan-ftl-ltl-trucking',
    title: 'Perbedaan FTL (Full Truckload) vs LTL (Less Than Truckload) untuk Bisnis',
    category: 'Trucking & B2B',
    readTime: '5 menit baca',
    date: '20 September 2026',
    excerpt: 'Kapan perusahaan Anda harus menyewa truk penuh (charter) dan kapan sebaiknya memilih sistem eceran cargo konsolidasi?',
    content: `
Memilih antara FTL dan LTL dapat berdampak signifikan pada efisiensi biaya logistik rantai pasok perusahaan Anda.

### 1. FTL (Full Truckload / Charter Truk)
FTL adalah layanan di mana Anda menyewa satu armada truk secara penuh (misalnya Truk CDD, Fuso, Tronton, atau Wingbox) hanya untuk muatan perusahaan Anda.
- **Keunggulan:** Pengiriman langsung tanpa singgah (non-stop point-to-point), waktu tempuh jauh lebih cepat, keamanan barang terjamin karena pintu kontainer dapat disegel langsung dari pabrik pengirim.
- **Kapan Digunakan:** Muatan di atas 5–15 ton, barang sensitif/berharga tinggi, atau pengiriman mendesak dengan target waktu ketat.

### 2. LTL (Less than Truckload / Kargo Konsolidasi)
Muatan Anda digabungkan bersama muatan pengirim lain dalam satu armada truk yang sama.
- **Keunggulan:** Biaya jauh lebih ekonomis untuk muatan di bawah kapasitas penuh satu truk (misal 50kg – 2.000kg).
- **Kapan Digunakan:** Pengiriman rutin ritel, stok toko cabang mingguan, atau pengiriman bahan baku skala kecil.
    `,
  },
  {
    id: 'memahami-lartas-dan-ppjk-resmi',
    title: 'Mengenal Barang Lartas & Peran PPJK Resmi dalam Kelancaran Impor',
    category: 'Customs & Regulasi',
    readTime: '5 menit baca',
    date: '15 September 2026',
    excerpt: 'Hindari tertahannya barang di pelabuhan dengan memahami regulasi lartas dan pentingnya bermitra dengan Perusahaan Pengurusan Jasa Kepabeanan.',
    content: `
Banyak importir pemula mengalami kendala kontainer tertahan di pelabuhan karena barang yang dikirim ternyata termasuk dalam kategori Lartas (Larangan dan Pembatasan).

### Apa itu Lartas?
Lartas adalah regulasi pemerintah yang membatasi impor barang tertentu demi perlindungan industri dalam negeri, kesehatan, atau keamanan nasional. Contoh barang lartas:
- Tekstil dan produk tekstil (wajib Persetujuan Impor & Laporan Surveyor)
- Besi atau baja dan produk turunannya
- Obat-obatan, suplemen, dan kosmetik (wajib izin edar BPOM)
- Perangkat telekomunikasi dan nirkabel (wajib sertifikasi Postel/SDPPI)

### Peran PPJK Nusantara Cargo
Nusantara Cargo memiliki lisensi PPJK resmi yang terhubung dengan modul EDI Bea Cukai Republik Indonesia. Kami melakukan pra-audit terhadap dokumen impor Anda sebelum kapal berlayar sehingga status lartas dapat dipersiapkan terlebih dahulu, meminimalkan risiko denda demurrage atau re-ekspor.
    `,
  },
];

export const CLIENT_TESTIMONIALS = [
  {
    company: 'PT Indosteel Perkasa Mandiri',
    location: 'Cikarang & Surabaya',
    industry: 'Pabrikasi Baja & Konstruksi',
    author: 'Ir. Hendra Gunawan',
    role: 'Head of Supply Chain & Logistics',
    logoText: 'INDOSTEEL',
    quote: 'Nusantara Cargo menjadi mitra utama kami untuk distribusi material mesin dan sparepart berat dari Jabodetabek ke proyek-proyek di Kalimantan dan Sulawesi. Penjadwalan truk FTL dan kapal Roro selalu tepat waktu dengan pelacakan AWB yang transparan.',
  },
  {
    company: 'CV Sinar Busana Mandiri',
    location: 'Bandung',
    industry: 'Garmen & Retail Fashion',
    author: 'Melisa Wijaya',
    role: 'Director of Procurement',
    logoText: 'SINAR BUSANA',
    quote: 'Kami mengimpor bahan kain dan aksesoris garmen secara rutin dari Guangzhou setiap bulan. Dengan layanan import all-in door to door Nusantara Cargo, tim kami tidak perlu repot mengurus bea cukai sendiri. Pajak dan biaya pengiriman terprediksi tanpa biaya tersembunyi.',
  },
  {
    company: 'PT Digital Solusindo Pratama',
    location: 'Jakarta',
    industry: 'Distributor Elektronik & IT',
    author: 'Kevin Setiawan',
    role: 'Operations Lead',
    logoText: 'DIGISOLUSI',
    quote: 'Layanan customer service sangat responsif dan responsif via WhatsApp. Ketika kami butuh pengiriman cepat udara ke cabang di Medan dan Balikpapan, kargo tiba tepat waktu dalam 24 jam dengan penanganan packing kayu yang sangat rapi.',
  },
];
