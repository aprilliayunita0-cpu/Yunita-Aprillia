export interface RouteTariff {
  id: string;
  origin_province: string;
  origin_city: string;
  origin_district?: string;
  destination_province: string;
  destination_city: string;
  destination_district?: string;
  shipping_method: 'Darat' | 'Laut' | 'Udara' | 'Kereta';
  base_price: number;
  margin: number;
  selling_price: number;
  minimum_weight: number;
  lead_time: string;
  status: 'active' | 'inactive';
}

export interface FleetVehicle {
  id: string;
  name: string;
  category: string;
  capacityTon: string;
  volumeCbm: string;
  dimensionsM: string;
  areaUse: string;
  description: string;
  imagePlaceholder: string;
}

export interface TrackingStep {
  stepName: string;
  location?: string;
  timestamp?: string;
  desc: string;
  completed: boolean;
  active?: boolean;
}

export interface ToroTrackingOrder {
  resi: string;
  customerName?: string;
  origin: string;
  destination: string;
  service: string;
  weight: number;
  volumeM3?: number;
  koli?: number;
  status: string;
  etd: string;
  timeline: TrackingStep[];
}

export interface SystemSettings {
  volumetricFactorDaratLaut: number;
  volumetricFactorUdara: number;
  volumetricFactorKereta: number;
  defaultMargin: number;
  whatsappNumber: string;
  whatsappRaw: string;
}

export interface CustomerInquiry {
  id: string;
  type: 'ongkir' | 'armada' | 'import';
  createdAt: string;
  name?: string;
  company?: string;
  phone?: string;
  details: Record<string, any>;
}

// 9 Pilihan Armada Resmi TORO Transportasi dan Logistic
export const FLEET_LIST: FleetVehicle[] = [
  {
    id: 'pickup',
    name: 'PICK UP',
    category: 'City Courier & Retail',
    capacityTon: '± 1 Ton',
    volumeCbm: '± 3.5 CBM',
    dimensionsM: '2.4 x 1.6 x 1.3 m',
    areaUse: 'Dalam Kota & Antar Kota Terdekat',
    description: 'Untuk barang ringan dan distribusi dalam kota, sembako, perabot rumah, dan retail cepat yang fleksibel menjangkau jalan sempit.',
    imagePlaceholder: 'Truk Pick Up Bak & Box',
  },
  {
    id: 'blind-van',
    name: 'BLIND VAN',
    category: 'Express Van Tertutup',
    capacityTon: '± 0.8 Ton',
    volumeCbm: '± 3.5 CBM',
    dimensionsM: '2.1 x 1.3 x 1.2 m',
    areaUse: 'Dalam Kota (Bebas Cuaca)',
    description: 'Untuk pengiriman barang yang membutuhkan kendaraan tertutup aman dari hujan, panas, dan debu. Cocok untuk farmasi, garmen, dan dokumen.',
    imagePlaceholder: 'Blind Van Tertutup',
  },
  {
    id: 'engkel',
    name: 'ENGKEL (CDE)',
    category: 'Truk 4 Roda Ringan',
    capacityTon: '± 2.5 Ton',
    volumeCbm: '± 9 CBM',
    dimensionsM: '3.1 x 1.7 x 1.7 m',
    areaUse: 'Dalam Kota & Antar Kota',
    description: 'Untuk distribusi cargo menengah seperti suplai toko cabang, karton FMCG, bahan baku, dan pindahan kantor atau rumah.',
    imagePlaceholder: 'Truk Engkel 4 Roda',
  },
  {
    id: 'cdd',
    name: 'CDD (6 Roda)',
    category: 'Colt Diesel Double',
    capacityTon: '± 4.5 Ton',
    volumeCbm: '± 15 CBM',
    dimensionsM: '4.2 x 1.9 x 1.9 m',
    areaUse: 'Antar Kota & Antar Provinsi',
    description: 'Untuk kebutuhan cargo kapasitas lebih besar, armada standar distribusi industri antarkota via tol Trans Jawa & lintas Sumatera.',
    imagePlaceholder: 'Truk CDD 6 Roda Box & Bak',
  },
  {
    id: 'cdd-long',
    name: 'CDD LONG',
    category: 'Sasis Panjang Volume Besar',
    capacityTon: '± 5.5 Ton',
    volumeCbm: '± 23 CBM',
    dimensionsM: '5.5 x 2.0 x 2.1 m',
    areaUse: 'Antar Kota & Antar Provinsi',
    description: 'Untuk barang berukuran panjang dan volume besar seperti pipa PVC, kasur, matras busa, display pameran, dan peralatan event.',
    imagePlaceholder: 'Truk CDD Long Chassis',
  },
  {
    id: 'fuso',
    name: 'FUSO',
    category: 'Medium Heavy Truck',
    capacityTon: '± 8 Ton',
    volumeCbm: '± 30 CBM',
    dimensionsM: '6.2 x 2.3 x 2.2 m',
    areaUse: 'Antar Kota & Lintas Pulau',
    description: 'Untuk kebutuhan cargo berat dan volume besar industri manufaktur, semen, pupuk, mesin pabrik, dan pengiriman antarpulau via kapal Roro.',
    imagePlaceholder: 'Truk Fuso Heavy Cargo',
  },
  {
    id: 'tronton',
    name: 'TRONTON',
    category: 'Heavy Project Cargo',
    capacityTon: '± 30 Ton',
    volumeCbm: '± 65 CBM',
    dimensionsM: '12.0 x 2.5 x 2.5 m',
    areaUse: 'Project Cargo & Pelabuhan',
    description: 'Untuk pengiriman barang berat dan project cargo, alat berat, tiang pancang, besi beton konstruksi, dan angkutan logistik infrastruktur.',
    imagePlaceholder: 'Truk Tronton 10 Roda',
  },
  {
    id: 'wingbox',
    name: 'WINGBOX',
    category: 'Hydraulic Wing Container',
    capacityTon: '± 18 Ton',
    volumeCbm: '± 48 CBM',
    dimensionsM: '9.4 x 2.4 x 2.4 m',
    areaUse: 'Jalur Tol & Logistik Pabrik',
    description: 'Untuk distribusi cargo dengan kapasitas besar, dilengkapi pintu sayap hidrolik samping untuk bongkar muat cepat ber-pallet dengan forklift.',
    imagePlaceholder: 'Truk Wingbox Hidrolik',
  },
  {
    id: 'container',
    name: 'CONTAINER (20ft & 40ft)',
    category: 'ISO Intermodal Container',
    capacityTon: '± 20 - 28 Ton',
    volumeCbm: '33 - 67 CBM',
    dimensionsM: '6.0 x 2.4 x 2.6 m / 12.0 x 2.4 x 2.6 m',
    areaUse: 'Port to Door & Antarpulau',
    description: 'Pengiriman kontainer standar ISO tertutup penuh FCL (Full Container Load) untuk cargo industri ekspor-impor dan pelayaran antarpulau.',
    imagePlaceholder: 'Kontainer Kargo Pelabuhan',
  },
];

// Pengaturan Default Sistem
export const DEFAULT_SETTINGS: SystemSettings = {
  volumetricFactorDaratLaut: 4000,
  volumetricFactorUdara: 6000,
  volumetricFactorKereta: 4000,
  defaultMargin: 2000,
  whatsappNumber: '0896-5256-5123',
  whatsappRaw: '6289652565123',
};

// Database Master Lokasi Indonesia (Hierarkis Provinsi -> Kota -> Kecamatan)
export interface ProvinceLocation {
  province: string;
  cities: {
    city: string;
    districts: string[];
  }[];
}

export const INDONESIAN_LOCATIONS: ProvinceLocation[] = [
  {
    province: 'DKI Jakarta',
    cities: [
      {
        city: 'Jakarta (Semua Wilayah)',
        districts: ['Cengkareng', 'Gambir', 'Kebayoran Baru', 'Menteng', 'Tanjung Priok', 'Kelapa Gading', 'Pancoran', 'Matraman'],
      },
      {
        city: 'Jakarta Barat',
        districts: ['Cengkareng', 'Grogol Petamburan', 'Kalideres', 'Kebon Jeruk', 'Kembangan', 'Palmerah', 'Taman Sari', 'Tambora'],
      },
      {
        city: 'Jakarta Pusat',
        districts: ['Gambir', 'Tanah Abang', 'Menteng', 'Senen', 'Cempaka Putih', 'Johar Baru', 'Kemayoran', 'Sawah Besar'],
      },
      {
        city: 'Jakarta Selatan',
        districts: ['Kebayoran Baru', 'Kebayoran Lama', 'Pesanggrahan', 'Cilandak', 'Pasar Minggu', 'Jagakarsa', 'Mampang Prapatan', 'Pancoran', 'Tebet', 'Setiabudi'],
      },
      {
        city: 'Jakarta Timur',
        districts: ['Matraman', 'Pulo Gadung', 'Jatinegara', 'Duren Sawit', 'Kramat Jati', 'Makasar', 'Pasar Rebo', 'Ciracas', 'Cipayung', 'Cakung'],
      },
      {
        city: 'Jakarta Utara',
        districts: ['Koja', 'Kelapa Gading', 'Tanjung Priok', 'Pademangan', 'Penjaringan', 'Cilincing'],
      },
    ],
  },
  {
    province: 'Jawa Timur',
    cities: [
      {
        city: 'Surabaya',
        districts: ['Rungkut', 'Gubeng', 'Tegalsari', 'Wonokromo', 'Kenjeran', 'Sukolilo', 'Genteng', 'Sawahan', 'Tandes', 'Wiyung'],
      },
      {
        city: 'Malang',
        districts: ['Klojen', 'Blimbing', 'Lowokwaru', 'Sukun', 'Kedungkandang'],
      },
      {
        city: 'Sidoarjo',
        districts: ['Sidoarjo Kota', 'Waru', 'Candi', 'Gedangan', 'Sedati', 'Krian', 'Taman'],
      },
      {
        city: 'Gresik',
        districts: ['Gresik Kota', 'Kebomas', 'Manyar', 'Driyorejo', 'Menganti'],
      },
      {
        city: 'Kediri',
        districts: ['Kota', 'Mojoroto', 'Pesantren'],
      },
      {
        city: 'Jember',
        districts: ['Kaliwates', 'Patrang', 'Sumbersari'],
      },
      {
        city: 'Madiun',
        districts: ['Kartoharjo', 'Manguharjo', 'Taman'],
      },
      {
        city: 'Pasuruan',
        districts: ['Gadingrejo', 'Purworejo', 'Bugul Kidul', 'Panggungrejo'],
      },
    ],
  },
  {
    province: 'Jawa Barat',
    cities: [
      {
        city: 'Bandung',
        districts: ['Coblong', 'Lengkong', 'Sukajadi', 'Andir', 'Cicendo', 'Buahbatu', 'Kiaracondong', 'Regol'],
      },
      {
        city: 'Bekasi',
        districts: ['Bekasi Barat', 'Bekasi Timur', 'Bekasi Selatan', 'Bekasi Utara', 'Pondok Gede', 'Medan Satria'],
      },
      {
        city: 'Bogor',
        districts: ['Bogor Tengah', 'Bogor Timur', 'Bogor Barat', 'Bogor Selatan', 'Bogor Utara', 'Tanah Sareal'],
      },
      {
        city: 'Depok',
        districts: ['Pancoran Mas', 'Sukmajaya', 'Beji', 'Cimanggis', 'Cinere', 'Sawangan'],
      },
      {
        city: 'Cirebon',
        districts: ['Kejaksan', 'Kesambi', 'Lemahwungkuk', 'Harjamukti', 'Pekalipan'],
      },
      {
        city: 'Karawang',
        districts: ['Karawang Barat', 'Karawang Timur', 'Telukjambe Timur', 'Klari'],
      },
      {
        city: 'Cimahi',
        districts: ['Cimahi Selatan', 'Cimahi Tengah', 'Cimahi Utara'],
      },
    ],
  },
  {
    province: 'Jawa Tengah',
    cities: [
      {
        city: 'Semarang',
        districts: ['Semarang Tengah', 'Semarang Barat', 'Semarang Timur', 'Semarang Selatan', 'Banyumanik', 'Pedurungan', 'Gajahmungkur'],
      },
      {
        city: 'Solo (Surakarta)',
        districts: ['Banjarsari', 'Jebres', 'Laweyan', 'Pasar Kliwon', 'Serengan'],
      },
      {
        city: 'Magelang',
        districts: ['Magelang Selatan', 'Magelang Tengah', 'Magelang Utara'],
      },
      {
        city: 'Tegal',
        districts: ['Tegal Barat', 'Tegal Timur', 'Tegal Selatan', 'Margadana'],
      },
      {
        city: 'Pekalongan',
        districts: ['Pekalongan Barat', 'Pekalongan Timur', 'Pekalongan Utara', 'Pekalongan Selatan'],
      },
      {
        city: 'Purwokerto (Banyumas)',
        districts: ['Purwokerto Barat', 'Purwokerto Timur', 'Purwokerto Selatan', 'Purwokerto Utara'],
      },
      {
        city: 'Kudus',
        districts: ['Kota Kudus', 'Jati', 'Bae', 'Gebog'],
      },
      {
        city: 'Cilacap',
        districts: ['Cilacap Selatan', 'Cilacap Tengah', 'Cilacap Utara'],
      },
    ],
  },
  {
    province: 'DI Yogyakarta',
    cities: [
      {
        city: 'Yogyakarta',
        districts: ['Danurejan', 'Gedongtengen', 'Gondokusuman', 'Kotagede', 'Kraton', 'Mergangsan', 'Mantrijeron', 'Umbulharjo'],
      },
      {
        city: 'Sleman',
        districts: ['Depok', 'Mlati', 'Ngaglik', 'Gamping', 'Kalasan'],
      },
      {
        city: 'Bantul',
        districts: ['Bantul Kota', 'Sewon', 'Kasihan', 'Banguntapan'],
      },
    ],
  },
  {
    province: 'Banten',
    cities: [
      {
        city: 'Tangerang',
        districts: ['Tangerang Kota', 'Cipondoh', 'Ciledug', 'Karawaci', 'Batuceper', 'Benda'],
      },
      {
        city: 'Tangerang Selatan',
        districts: ['Serpong', 'Serpong Utara', 'Pondok Aren', 'Ciputat', 'Pamulang'],
      },
      {
        city: 'Serang',
        districts: ['Serang Kota', 'Cipocok Jaya', 'Curug', 'Kasemen', 'Taktakan'],
      },
      {
        city: 'Cilegon',
        districts: ['Cilegon Kota', 'Ciwandan', 'Gerogol', 'Jombang', 'Pulomerak'],
      },
    ],
  },
  {
    province: 'Sumatera Utara',
    cities: [
      {
        city: 'Medan',
        districts: ['Medan Kota', 'Medan Barat', 'Medan Timur', 'Medan Petisah', 'Medan Helvetia', 'Medan Sunggal', 'Medan Amplas', 'Medan Belawan'],
      },
      {
        city: 'Binjai',
        districts: ['Binjai Kota', 'Binjai Barat', 'Binjai Timur', 'Binjai Utara'],
      },
      {
        city: 'Pematangsiantar',
        districts: ['Siantar Barat', 'Siantar Timur', 'Siantar Selatan', 'Siantar Utara'],
      },
      {
        city: 'Deli Serdang',
        districts: ['Lubuk Pakam', 'Tanjung Morawa', 'Sunggal', 'Percut Sei Tuan'],
      },
    ],
  },
  {
    province: 'Sumatera Barat',
    cities: [
      {
        city: 'Padang',
        districts: ['Padang Barat', 'Padang Timur', 'Padang Selatan', 'Padang Utara', 'Koto Tangah', 'Kuranji'],
      },
      {
        city: 'Bukittinggi',
        districts: ['Guguk Panjang', 'Mandiangin Koto Selayan', 'Aur Birugo Tigo Baleh'],
      },
    ],
  },
  {
    province: 'Riau',
    cities: [
      {
        city: 'Pekanbaru',
        districts: ['Pekanbaru Kota', 'Marpoyan Damai', 'Rumbai', 'Tampan', 'Bukit Raya', 'Sukajadi'],
      },
      {
        city: 'Dumai',
        districts: ['Dumai Barat', 'Dumai Timur', 'Dumai Kota'],
      },
    ],
  },
  {
    province: 'Kepulauan Riau',
    cities: [
      {
        city: 'Batam',
        districts: ['Batam Kota', 'Lubuk Baja', 'Sekupang', 'Nongsa', 'Batu Ampar', 'Batu Aji', 'Sagulung'],
      },
      {
        city: 'Tanjungpinang',
        districts: ['Tanjungpinang Kota', 'Tanjungpinang Barat', 'Tanjungpinang Timur', 'Bukit Bestari'],
      },
    ],
  },
  {
    province: 'Sumatera Selatan',
    cities: [
      {
        city: 'Palembang',
        districts: ['Ilir Barat I', 'Ilir Timur I', 'Sukarami', 'Seberang Ulu I', 'Kemuning', 'Sako'],
      },
    ],
  },
  {
    province: 'Lampung',
    cities: [
      {
        city: 'Bandar Lampung',
        districts: ['Tanjung Karang Pusat', 'Teluk Betung Selatan', 'Kedaton', 'Kemiling', 'Sukarame', 'Way Halim'],
      },
    ],
  },
  {
    province: 'Aceh',
    cities: [
      {
        city: 'Banda Aceh',
        districts: ['Baiturrahman', 'Kuta Alam', 'Syiah Kuala', 'Meuraxa', 'Lueng Bata', 'Ulee Kareng'],
      },
    ],
  },
  {
    province: 'Bali',
    cities: [
      {
        city: 'Denpasar',
        districts: ['Denpasar Barat', 'Denpasar Timur', 'Denpasar Selatan', 'Denpasar Utara'],
      },
      {
        city: 'Badung (Kuta)',
        districts: ['Kuta', 'Kuta Utara', 'Kuta Selatan', 'Mengwi'],
      },
    ],
  },
  {
    province: 'Nusa Tenggara Barat',
    cities: [
      {
        city: 'Mataram (Lombok)',
        districts: ['Mataram', 'Ampenan', 'Cakranegara', 'Sekarbela', 'Selaparang', 'Sandubaya'],
      },
    ],
  },
  {
    province: 'Nusa Tenggara Timur',
    cities: [
      {
        city: 'Kupang',
        districts: ['Kelapa Lima', 'Kota Lama', 'Kota Raja', 'Maulafa', 'Oebobo'],
      },
    ],
  },
  {
    province: 'Kalimantan Barat',
    cities: [
      {
        city: 'Pontianak',
        districts: ['Pontianak Kota', 'Pontianak Barat', 'Pontianak Selatan', 'Pontianak Timur', 'Pontianak Utara'],
      },
      {
        city: 'Ketapang',
        districts: ['Delta Pawan', 'Benua Kayong', 'Matan Hilir Selatan'],
      },
    ],
  },
  {
    province: 'Kalimantan Selatan',
    cities: [
      {
        city: 'Banjarmasin',
        districts: ['Banjarmasin Tengah', 'Banjarmasin Barat', 'Banjarmasin Selatan', 'Banjarmasin Timur', 'Banjarmasin Utara'],
      },
    ],
  },
  {
    province: 'Kalimantan Timur',
    cities: [
      {
        city: 'Balikpapan',
        districts: ['Balikpapan Kota', 'Balikpapan Selatan', 'Balikpapan Tengah', 'Balikpapan Utara', 'Balikpapan Barat'],
      },
      {
        city: 'Samarinda',
        districts: ['Samarinda Kota', 'Samarinda Ulu', 'Samarinda Ilir', 'Sungai Kunjang'],
      },
    ],
  },
  {
    province: 'Sulawesi Selatan',
    cities: [
      {
        city: 'Makassar',
        districts: ['Ujung Pandang', 'Panakkukang', 'Rappocini', 'Tamalanrea', 'Biringkanaya', 'Mariso', 'Mamajang'],
      },
    ],
  },
  {
    province: 'Sulawesi Tengah',
    cities: [
      {
        city: 'Palu',
        districts: ['Palu Barat', 'Palu Timur', 'Palu Selatan', 'Palu Utara', 'Tatanga', 'Mantikulore'],
      },
    ],
  },
  {
    province: 'Sulawesi Utara',
    cities: [
      {
        city: 'Manado',
        districts: ['Wenang', 'Sario', 'Malalayang', 'Tikala', 'Mapanget', 'Tuminting'],
      },
    ],
  },
  {
    province: 'Maluku',
    cities: [
      {
        city: 'Ambon',
        districts: ['Sirimau', 'Nusaniwe', 'Teluk Ambon', 'Baguala'],
      },
    ],
  },
  {
    province: 'Papua',
    cities: [
      {
        city: 'Jayapura (Papua)',
        districts: ['Jayapura Utara', 'Jayapura Selatan', 'Abepura', 'Heram', 'Muara Tami'],
      },
    ],
  },
  {
    province: 'Papua Barat',
    cities: [
      {
        city: 'Sorong',
        districts: ['Sorong Kota', 'Sorong Barat', 'Sorong Timur', 'Sorong Utara'],
      },
    ],
  },
];

// INITIAL TARIFF DATABASE
// Data Resmi Jalur Udara dari Dokumen/Poster User (press list udara.jpeg):
// Min: 10 KG.
// Margin default: Rp2.000/kg.
export const INITIAL_TARIFF_DATABASE: RouteTariff[] = [
  // ==========================================
  // JALUR UDARA (DATA RESMI DARI USER POSTER)
  // ==========================================
  {
    id: 'air-jkt-sub',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Surabaya',
    shipping_method: 'Udara',
    base_price: 28000,
    margin: 2000,
    selling_price: 30000,
    minimum_weight: 10,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-med',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Utara',
    destination_city: 'Medan',
    shipping_method: 'Udara',
    base_price: 38000,
    margin: 2000,
    selling_price: 40000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-btj',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Aceh',
    destination_city: 'Banda Aceh',
    shipping_method: 'Udara',
    base_price: 49000,
    margin: 2000,
    selling_price: 51000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-djj',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Papua',
    destination_city: 'Jayapura (Papua)',
    shipping_method: 'Udara',
    base_price: 95000,
    margin: 2000,
    selling_price: 97000,
    minimum_weight: 10,
    lead_time: '1–3 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-plw',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sulawesi Tengah',
    destination_city: 'Palu',
    shipping_method: 'Udara',
    base_price: 67000,
    margin: 2000,
    selling_price: 69000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-ktg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Barat',
    destination_city: 'Ketapang',
    shipping_method: 'Udara',
    base_price: 64000,
    margin: 2000,
    selling_price: 66000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-pku',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Riau',
    destination_city: 'Pekanbaru',
    shipping_method: 'Udara',
    base_price: 34500,
    margin: 2000,
    selling_price: 36500,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-yog',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'DI Yogyakarta',
    destination_city: 'Yogyakarta',
    shipping_method: 'Udara',
    base_price: 28000,
    margin: 2000,
    selling_price: 30000,
    minimum_weight: 10,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-pdg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Barat',
    destination_city: 'Padang',
    shipping_method: 'Udara',
    base_price: 34000,
    margin: 2000,
    selling_price: 36000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-bth',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kepulauan Riau',
    destination_city: 'Batam',
    shipping_method: 'Udara',
    base_price: 40000,
    margin: 2000,
    selling_price: 42000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-bdo',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Barat',
    destination_city: 'Bandung',
    shipping_method: 'Udara',
    base_price: 27000,
    margin: 2000,
    selling_price: 29000,
    minimum_weight: 10,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-lop',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Nusa Tenggara Barat',
    destination_city: 'Mataram (Lombok)',
    shipping_method: 'Udara',
    base_price: 39000,
    margin: 2000,
    selling_price: 41000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-upg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sulawesi Selatan',
    destination_city: 'Makassar',
    shipping_method: 'Udara',
    base_price: 42550,
    margin: 2000,
    selling_price: 44550,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-mdc',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sulawesi Utara',
    destination_city: 'Manado',
    shipping_method: 'Udara',
    base_price: 64000,
    margin: 2000,
    selling_price: 66000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-plm',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Selatan',
    destination_city: 'Palembang',
    shipping_method: 'Udara',
    base_price: 32500,
    margin: 2000,
    selling_price: 34500,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-koe',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Nusa Tenggara Timur',
    destination_city: 'Kupang',
    shipping_method: 'Udara',
    base_price: 69000,
    margin: 2000,
    selling_price: 71000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-pnk',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Barat',
    destination_city: 'Pontianak',
    shipping_method: 'Udara',
    base_price: 40000,
    margin: 2000,
    selling_price: 42000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-bdj',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Selatan',
    destination_city: 'Banjarmasin',
    shipping_method: 'Udara',
    base_price: 40000,
    margin: 2000,
    selling_price: 42000,
    minimum_weight: 10,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'air-jkt-amq',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Maluku',
    destination_city: 'Ambon',
    shipping_method: 'Udara',
    base_price: 72000,
    margin: 2000,
    selling_price: 74000,
    minimum_weight: 10,
    lead_time: '1–3 Hari',
    status: 'active',
  },

  // ==========================================
  // JALUR DARAT
  // ==========================================
  {
    id: 'land-jkt-sub',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Surabaya',
    shipping_method: 'Darat',
    base_price: 3500,
    margin: 2000,
    selling_price: 5500,
    minimum_weight: 50,
    lead_time: '2–3 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-mlg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Malang',
    shipping_method: 'Darat',
    base_price: 3500,
    margin: 2000,
    selling_price: 5500,
    minimum_weight: 50,
    lead_time: '2–3 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-sda',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Sidoarjo',
    shipping_method: 'Darat',
    base_price: 3500,
    margin: 2000,
    selling_price: 5500,
    minimum_weight: 50,
    lead_time: '2–3 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-bdo',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Barat',
    destination_city: 'Bandung',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 30,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-bks',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Barat',
    destination_city: 'Bekasi',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 30,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-bgr',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Barat',
    destination_city: 'Bogor',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 30,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-crb',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Barat',
    destination_city: 'Cirebon',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 30,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-smg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Tengah',
    destination_city: 'Semarang',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 50,
    lead_time: '2 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-slo',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Tengah',
    destination_city: 'Solo (Surakarta)',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 50,
    lead_time: '2 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-yog',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'DI Yogyakarta',
    destination_city: 'Yogyakarta',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 50,
    lead_time: '2–3 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-tng',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Banten',
    destination_city: 'Tangerang',
    shipping_method: 'Darat',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 30,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-srg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Banten',
    destination_city: 'Serang',
    shipping_method: 'Darat',
    base_price: 3000,
    margin: 2000,
    selling_price: 5000,
    minimum_weight: 30,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-med',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Utara',
    destination_city: 'Medan',
    shipping_method: 'Darat',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '5–7 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-pdg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Barat',
    destination_city: 'Padang',
    shipping_method: 'Darat',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '4–6 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-plm',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Selatan',
    destination_city: 'Palembang',
    shipping_method: 'Darat',
    base_price: 3500,
    margin: 2000,
    selling_price: 5500,
    minimum_weight: 50,
    lead_time: '2–3 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-lpg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Lampung',
    destination_city: 'Bandar Lampung',
    shipping_method: 'Darat',
    base_price: 3500,
    margin: 2000,
    selling_price: 5500,
    minimum_weight: 50,
    lead_time: '2–3 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-dps',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Bali',
    destination_city: 'Denpasar',
    shipping_method: 'Darat',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '3–4 Hari',
    status: 'active',
  },
  {
    id: 'land-jkt-lop',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Nusa Tenggara Barat',
    destination_city: 'Mataram (Lombok)',
    shipping_method: 'Darat',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '4–5 Hari',
    status: 'active',
  },

  // ==========================================
  // JALUR KERETA (CARGO KERETA API)
  // ==========================================
  {
    id: 'train-jkt-sub',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Surabaya',
    shipping_method: 'Kereta',
    base_price: 2500,
    margin: 2000,
    selling_price: 4500,
    minimum_weight: 30,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'train-jkt-smg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Tengah',
    destination_city: 'Semarang',
    shipping_method: 'Kereta',
    base_price: 2000,
    margin: 2000,
    selling_price: 4000,
    minimum_weight: 30,
    lead_time: '1 Hari',
    status: 'active',
  },
  {
    id: 'train-jkt-yog',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'DI Yogyakarta',
    destination_city: 'Yogyakarta',
    shipping_method: 'Kereta',
    base_price: 2200,
    margin: 2000,
    selling_price: 4200,
    minimum_weight: 30,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'train-jkt-slo',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Tengah',
    destination_city: 'Solo (Surakarta)',
    shipping_method: 'Kereta',
    base_price: 2200,
    margin: 2000,
    selling_price: 4200,
    minimum_weight: 30,
    lead_time: '1–2 Hari',
    status: 'active',
  },
  {
    id: 'train-jkt-mlg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Malang',
    shipping_method: 'Kereta',
    base_price: 3000,
    margin: 2000,
    selling_price: 5000,
    minimum_weight: 30,
    lead_time: '1–2 Hari',
    status: 'active',
  },

  // ==========================================
  // JALUR LAUT (CARGO KONTAINER & RORO)
  // ==========================================
  {
    id: 'sea-jkt-sub',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Jawa Timur',
    destination_city: 'Surabaya',
    shipping_method: 'Laut',
    base_price: 2000,
    margin: 2000,
    selling_price: 4000,
    minimum_weight: 50,
    lead_time: '4–6 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-med',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sumatera Utara',
    destination_city: 'Medan',
    shipping_method: 'Laut',
    base_price: 2800,
    margin: 2000,
    selling_price: 4800,
    minimum_weight: 100,
    lead_time: '6–9 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-bth',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kepulauan Riau',
    destination_city: 'Batam',
    shipping_method: 'Laut',
    base_price: 3000,
    margin: 2000,
    selling_price: 5000,
    minimum_weight: 50,
    lead_time: '4–6 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-pnk',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Barat',
    destination_city: 'Pontianak',
    shipping_method: 'Laut',
    base_price: 3500,
    margin: 2000,
    selling_price: 5500,
    minimum_weight: 50,
    lead_time: '5–7 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-bdj',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Selatan',
    destination_city: 'Banjarmasin',
    shipping_method: 'Laut',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '4–6 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-bpn',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Timur',
    destination_city: 'Balikpapan',
    shipping_method: 'Laut',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '5–7 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-smd',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Kalimantan Timur',
    destination_city: 'Samarinda',
    shipping_method: 'Laut',
    base_price: 4500,
    margin: 2000,
    selling_price: 6500,
    minimum_weight: 50,
    lead_time: '6–8 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-upg',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sulawesi Selatan',
    destination_city: 'Makassar',
    shipping_method: 'Laut',
    base_price: 3000,
    margin: 2000,
    selling_price: 5000,
    minimum_weight: 50,
    lead_time: '5–7 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-mdc',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Sulawesi Utara',
    destination_city: 'Manado',
    shipping_method: 'Laut',
    base_price: 5500,
    margin: 2000,
    selling_price: 7500,
    minimum_weight: 100,
    lead_time: '8–12 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-amq',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Maluku',
    destination_city: 'Ambon',
    shipping_method: 'Laut',
    base_price: 7500,
    margin: 2000,
    selling_price: 9500,
    minimum_weight: 100,
    lead_time: '10–14 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-djj',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Papua',
    destination_city: 'Jayapura (Papua)',
    shipping_method: 'Laut',
    base_price: 9000,
    margin: 2000,
    selling_price: 11000,
    minimum_weight: 100,
    lead_time: '14–20 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-soq',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Papua Barat',
    destination_city: 'Sorong',
    shipping_method: 'Laut',
    base_price: 8500,
    margin: 2000,
    selling_price: 10500,
    minimum_weight: 100,
    lead_time: '12–16 Hari',
    status: 'active',
  },
  {
    id: 'sea-jkt-koe',
    origin_province: 'DKI Jakarta',
    origin_city: 'Jakarta',
    destination_province: 'Nusa Tenggara Timur',
    destination_city: 'Kupang',
    shipping_method: 'Laut',
    base_price: 6000,
    margin: 2000,
    selling_price: 8000,
    minimum_weight: 100,
    lead_time: '9–14 Hari',
    status: 'active',
  },
];

// Tracking Steps Flow:
// Pickup -> Gudang -> Transit -> Dalam Pengiriman -> Sampai Tujuan
export const SAMPLE_TRACKING_ORDERS: Record<string, ToroTrackingOrder> = {
  'TR-882109-SBY': {
    resi: 'TR-882109-SBY',
    customerName: 'CV. Indo Berkah Mandiri',
    origin: 'Jakarta Central Hub',
    destination: 'Surabaya, Jawa Timur',
    service: 'Cargo Darat (CDD Box)',
    weight: 250,
    volumeM3: 0.85,
    koli: 4,
    status: 'Transit (Dalam Perjalanan Menuju Hub Surabaya)',
    etd: '2 Hari',
    timeline: [
      { stepName: 'Pickup', location: 'Gudang Pengirim Cengkareng', timestamp: '04 Okt 2026, 14:15 WIB', desc: 'Barang dijemput armada Blind Van TORO', completed: true },
      { stepName: 'Gudang', location: 'Hub Pusat Cengkareng', timestamp: '04 Okt 2026, 19:40 WIB', desc: 'Pengecekan timbangan, volume & strapping pengaman', completed: true },
      { stepName: 'Transit', location: 'Tol Trans Jawa (KM 370 Batang)', timestamp: '05 Okt 2026, 06:10 WIB', desc: 'Truk kargo CDD bergerak menuju Surabaya', completed: true, active: true },
      { stepName: 'Dalam Pengiriman', location: 'Hub Rungkut Surabaya', timestamp: 'Estimasi Besok Siang', desc: 'Kurir mengantar paket ke alamat penerima', completed: false },
      { stepName: 'Sampai Tujuan', location: 'Penerima', timestamp: 'Estimasi Besok Sore', desc: 'Serah terima barang & digital Proof of Delivery', completed: false },
    ],
  },
  'TR-773401-MDN': {
    resi: 'TR-773401-MDN',
    customerName: 'PT. Sumatra Multi Niaga',
    origin: 'Jakarta Central Hub',
    destination: 'Medan, Sumatera Utara',
    service: 'Cargo Laut (Kontainer LCL)',
    weight: 480,
    volumeM3: 2.1,
    koli: 8,
    status: 'Transit (Kapal Kontainer Sedang Berlayar ke Belawan)',
    etd: '4 Hari',
    timeline: [
      { stepName: 'Pickup', location: 'Jakarta Pusat', timestamp: '02 Okt 2026, 15:30 WIB', desc: 'Pickup dengan truk Engkel', completed: true },
      { stepName: 'Gudang', location: 'Pool Tanjung Priok', timestamp: '03 Okt 2026, 08:20 WIB', desc: 'Stuffing barang ke dalam kontainer ISO 20ft', completed: true },
      { stepName: 'Transit', location: 'Selat Bangka / Laut Jawa', timestamp: '04 Okt 2026, 02:00 WIB', desc: 'Kapal kontainer berlayar menuju Pelabuhan Belawan', completed: true, active: true },
      { stepName: 'Dalam Pengiriman', location: 'Pelabuhan Belawan Medan', timestamp: 'Estimasi 08 Okt', desc: 'Proses delivery door to door ke alamat tujuan', completed: false },
      { stepName: 'Sampai Tujuan', location: 'Gudang Penerima', timestamp: 'Estimasi 09 Okt Sore', desc: 'Serah terima kargo selesai', completed: false },
    ],
  },
  'TR-990212-MKS': {
    resi: 'TR-990212-MKS',
    customerName: 'Toko Elektronik Megah',
    origin: 'Jakarta Central Hub',
    destination: 'Makassar, Sulawesi Selatan',
    service: 'Cargo Udara (Air Freight)',
    weight: 45,
    volumeM3: 0.18,
    koli: 2,
    status: 'Dalam Pengiriman (Kurir Menuju Alamat Penerima)',
    etd: 'Hari Ini',
    timeline: [
      { stepName: 'Pickup', location: 'Mangga Dua Jakarta', timestamp: '05 Okt 2026, 10:30 WIB', desc: 'Kurir jemput paket kargo udara', completed: true },
      { stepName: 'Gudang', location: 'Cargo Terminal Bandara Soekarno-Hatta', timestamp: '05 Okt 2026, 15:00 WIB', desc: 'X-Ray & timbang bandara lolos', completed: true },
      { stepName: 'Transit', location: 'Penerbangan CGK-UPG', timestamp: '05 Okt 2026, 21:00 WIB', desc: 'Penerbangan pesawat cargo', completed: true },
      { stepName: 'Dalam Pengiriman', location: 'Panakkukang Makassar', timestamp: '06 Okt 2026, 09:30 WITA', desc: 'Kurir dalam perjalanan mengantar ke alamat penerima', completed: true, active: true },
      { stepName: 'Sampai Tujuan', location: 'Alamat Penerima', timestamp: 'Estimasi Siang Ini', desc: 'Serah terima kargo selesai', completed: false },
    ],
  },
};

export const TORO_COMPANY_INFO = {
  brandName: 'TORO Transportasi dan Logistic',
  legalEntity: 'PT TORO SENTOSA GROUP',
  tagline: 'Solusi Transportasi & Logistik ke Seluruh Indonesia',
  subheadline: 'Pengiriman darat, laut, udara, kereta, sewa armada, hingga layanan import dalam satu solusi logistik.',
  whatsapp: '0896-5256-5123',
  whatsappRaw: '6289652565123',
  secondaryWhatsapp: '0898-7168-941',
  email: 'marketing.torologistic@gmail.com',
  address: 'Jl. Fajar Baru Selatan No. 25, Cengkareng Timur, Jakarta Barat',
  coverageText: 'Melayani Pengiriman ke Seluruh Indonesia (38 Provinsi & 514 Kota/Kabupaten)',
};
