// Data & Type Definitions for SOP FINAL PAUL — AI DIREKTUR UTAMA TORO LOGISTIC
// Kode Dokumen: TORO-DIR-001 | Versi: 2.0

export interface PaulScheduleSlot {
  timeRange: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  activity: string;
  category: 'operasional' | 'penjualan' | 'penawaran' | 'keuangan' | 'evaluasi';
  description: string;
}

export const PAUL_SCHEDULE_SLOTS: PaulScheduleSlot[] = [
  {
    timeRange: '08.00–08.30',
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 30,
    activity: 'Pemeriksaan Awal & Kendala',
    category: 'operasional',
    description: 'Memeriksa pesanan, pengiriman, kendala, dan pekerjaan tertunda dari hari sebelumnya.',
  },
  {
    timeRange: '08.30–10.30',
    startHour: 8,
    startMinute: 30,
    endHour: 10,
    endMinute: 30,
    activity: 'Prospek & Prioritas Penjualan',
    category: 'penjualan',
    description: 'Menyusun daftar prospek, follow up leads potensial, dan prioritas penjualan harian.',
  },
  {
    timeRange: '10.30–12.00',
    startHour: 10,
    startMinute: 30,
    endHour: 12,
    endMinute: 0,
    activity: 'Penyusunan Penawaran & Verifikasi Margin',
    category: 'penawaran',
    description: 'Menyiapkan penawaran kargo berdasarkan biaya mitra dan margin yang terverifikasi (min. margin Rp2.000/kg).',
  },
  {
    timeRange: '13.00–14.30',
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 30,
    activity: 'Pemantauan Pengiriman & Bukti PoD',
    category: 'operasional',
    description: 'Memantau status penjemputan, transit armada, bukti serah terima (PoD), dan keluhan pelanggan.',
  },
  {
    timeRange: '14.30–15.30',
    startHour: 14,
    startMinute: 30,
    endHour: 15,
    endMinute: 30,
    activity: 'Audit Keuangan & Piutang',
    category: 'keuangan',
    description: 'Memeriksa transaksi, tagihan jatuh tempo, piutang pelanggan, biaya mitra, dan verifikasi bukti kas.',
  },
  {
    timeRange: '15.30–16.00',
    startHour: 15,
    startMinute: 30,
    endHour: 16,
    endMinute: 0,
    activity: 'Evaluasi Harian & Laporan',
    category: 'evaluasi',
    description: 'Menyusun evaluasi harian, draf laporan untuk pemilik, dan rencana 3 prioritas hari kerja berikutnya.',
  },
];

export interface OwnerApprovalRequest {
  id: string;
  requestNumber: string;
  requestDate: string;
  decisionType:
    | 'Pengeluaran Baru'
    | 'Transfer / Pembayaran'
    | 'Pinjaman / Komitmen Besar'
    | 'Perubahan Harga / Diskon Bawah Margin'
    | 'Pemberian Tempo / Kredit'
    | 'Kontrak Besar / Strategis'
    | 'Pengadaan Armada / Pembukaan Cabang'
    | 'Klaim Besar / Ganti Rugi'
    | 'Kebijakan Perusahaan';
  monetaryValue?: number;
  reason: string;
  benefit: string;
  riskIfApproved: string;
  riskIfRejected: string;
  supportingDocuments: string[];
  status: 'menunggu' | 'disetujui' | 'ditolak' | 'perlu revisi';
  ownerDecisionNotes?: string;
  decisionDate?: string;
}

export interface PaulLead {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  businessType: 'Distributor' | 'Manufaktur' | 'Toko Retail' | 'E-Commerce' | 'Kontraktor' | 'Importir';
  cargoNeeds: string;
  routeInterest: string;
  estimatedVolume: string;
  status: 'belum merespons' | 'perlu tindak lanjut' | 'penawaran terkirim' | 'menang' | 'tidak jadi';
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  lastContact: string;
  nextFollowUpDate: string;
  notes: string;
  quoteOffered?: number;
}

export interface PaulShipment {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  destinationCity: string;
  cargoType: string;
  serviceMethod: 'Darat' | 'Laut' | 'Udara' | 'Kereta';
  fleetAssigned?: string;
  partnerName: string;
  weightKg: number;
  volumeM3?: number;
  koli: number;
  sellingPriceTotal: number;
  partnerCostTotal: number;
  grossMargin: number;
  marginPercentage: number;
  status: 'Penjemputan' | 'Di Gudang Hub' | 'Dalam Perjalanan' | 'Tiba di Kota Tujuan' | 'Selesai';
  hasProofOfDelivery: boolean;
  podDocumentUrl?: string;
  podVerifiedAt?: string;
  isDelayed: boolean;
  delayReason?: string;
  dispatchDate: string;
  estimatedArrival: string;
}

export interface PaulFinancialTransaction {
  id: string;
  txNumber: string;
  date: string;
  type: 'Pendapatan' | 'Biaya Mitra' | 'Biaya Operasional' | 'Kas Masuk' | 'Kas Keluar';
  orderReference?: string;
  counterparty: string;
  amount: number;
  hasDocumentProof: boolean;
  proofDocumentNote: string;
  paymentStatus: 'Lunas' | 'Belum Dibayar (Piutang)' | 'Utang Mitra' | 'Menunggu Verifikasi';
  isReconciled: boolean;
  notes: string;
}

export interface PaulComplaint {
  id: string;
  ticketNumber: string;
  timestamp: string;
  customerName: string;
  orderNumber: string;
  issueType: 'Keterlambatan' | 'Kerusakan Barang' | 'Barang Kurang / Hilang' | 'Ketidaksesuaian Tarif' | 'Layanan Kurir';
  urgency: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
  description: string;
  proposedResolution: string;
  isEscalatedToOwner: boolean;
  status: 'Terbuka' | 'Dalam Penanganan' | 'Menunggu Otorisasi Pemilik' | 'Selesai';
  resolutionDate?: string;
  resolutionNotes?: string;
}

export interface PaulCarrierPartner {
  id: string;
  partnerName: string;
  legalEntity: 'PT' | 'CV' | 'Perorangan';
  contactPerson: string;
  phone: string;
  fleetTypes: string[];
  serviceRoutes: string[];
  verifiedLegalDoc: boolean;
  onTimeRate: number; // percentage, e.g. 96%
  completedShipments: number;
  complaintCount: number;
  activeStatus: 'Aktif Terverifikasi' | 'Evaluasi' | 'Ditangguhkan';
  rating: number; // 1-5
}

// 21 Kolom Tab KEAGENAN (Sesuai Struktur Google Sheets TORO Logistic)
export interface PaulAgent {
  id: string; // ID Agen (e.g. AGN-0001)
  tanggalMasuk: string;
  namaAgen: string;
  namaUsaha: string;
  wilayah: string;
  kontakBisnis: string;
  ruteLayanan: string;
  kapasitas: string;
  statusPendekatan: 'Pemetaan' | 'Pendekatan' | 'Verifikasi' | 'Menunggu Otorisasi' | 'Disetujui' | 'Aktif' | 'Tidak Aktif' | 'Ditolak';
  statusVerifikasi: 'Belum Terverifikasi' | 'Sedang Diverifikasi' | 'Lolos Dokumen' | 'Terverifikasi Sah';
  dokumen: string[]; // KTP, NIB, NPWP, Foto Ruko/Gudang
  usulanKomisi: string; // e.g. "15% per transaksi" atau "Rp500/kg"
  statusPersetujuan: 'Menunggu Persetujuan Pemilik' | 'Disetujui Pemilik' | 'Ditolak' | 'Revisi';
  tanggalAktivasi: string;
  jumlahPengiriman: number;
  biaya: number;
  komisiTerutang: number;
  keluhan: string;
  pic: 'SASA' | 'PAUL' | 'IQBAL' | 'FIQA' | 'ENIS' | 'AVAN';
  tindakLanjut: string;
  tanggalEvaluasi: string;
  catatan: string;
  relatedOrderIds?: string[];
}

// Format Tugas Antar-Divisi (Alur Kerja Terpadu 6 AI)
export interface PaulTask {
  id: string; // TSK-001
  title: string;
  pic: 'PAUL' | 'ENIS' | 'IQBAL' | 'FIQA' | 'AVAN' | 'SASA';
  deadline: string;
  status: 'Menunggu' | 'Dalam Proses' | 'Selesai' | 'Dibatalkan';
  result: string;
  notes?: string;
  relatedEntityId?: string; // ID Agen, ID Order, dll.
}

// 6 Kepala Divisi AI TORO Logistic
export interface AiDivisionHead {
  id: 'PAUL' | 'ENIS' | 'IQBAL' | 'FIQA' | 'AVAN' | 'SASA';
  name: string;
  role: string;
  title: string;
  avatarColor: string;
  mission: string;
  keyDuties: string[];
  reportFormat: string[];
}

// 90-Day Evaluation Target Definitions (SOP Bagian H)
export interface PaulTarget90Days {
  prospectDatabaseTarget: number; // 100-150
  contactActivitiesTarget: number; // 200-300
  quotesSentTarget: number; // 30-50
  transactingCustomersTarget: number; // 3-5
  repeatCustomersTarget: number; // 2-3
  verifiedPartnersTarget: number; // min 3
}

export const INITIAL_90_DAY_TARGETS: PaulTarget90Days = {
  prospectDatabaseTarget: 125,
  contactActivitiesTarget: 250,
  quotesSentTarget: 40,
  transactingCustomersTarget: 4,
  repeatCustomersTarget: 3,
  verifiedPartnersTarget: 4,
};

// INITIAL SEED DATA ACCORDING TO TORO-DIR-001 SOP

export const INITIAL_OWNER_APPROVALS: OwnerApprovalRequest[] = [
  {
    id: 'appr-001',
    requestNumber: 'REQ-TORO-2026-001',
    requestDate: '26 Okt 2026',
    decisionType: 'Perubahan Harga / Diskon Bawah Margin',
    monetaryValue: 25000000,
    reason: 'Permintaan diskon khusus dari PT Mega Distribusi Makmur untuk kontrak kargo 5 ton/minggu rute Jakarta–Surabaya. Diskon mengurangi margin dari Rp2.000/kg menjadi Rp1.400/kg.',
    benefit: 'Mengamankan volume rutin 20 ton/bulan dengan estimasi proyeksi omset Rp110.000.000/bulan.',
    riskIfApproved: 'Margin per kg turun 30%, namun tertutup oleh kepastian volume muatan reguler balik.',
    riskIfRejected: 'Prospek berpotensi beralih ke vendor kompetitor yang menawarkan tarif lebih rendah.',
    supportingDocuments: ['Draf Surat Penawaran PT Mega Distribusi', 'Kalkulasi Simulasi Margin & Biaya Mitra'],
    status: 'menunggu',
  },
  {
    id: 'appr-002',
    requestNumber: 'REQ-TORO-2026-002',
    requestDate: '25 Okt 2026',
    decisionType: 'Pemberian Tempo / Kredit',
    monetaryValue: 18500000,
    reason: 'Pengajuan TOP (Term of Payment) 30 hari kalender setelah invoice diterima oleh CV Mandiri Sentosa Logam.',
    benefit: 'Pelanggan merupakan produsen suku cadang otomotif terpercaya dengan proyeksi kirim reguler.',
    riskIfApproved: 'Membutuhkan cadangan likuiditas kas operasional untuk menalangi biaya mitra terlebih dahulu.',
    riskIfRejected: 'Pelanggan keberatan bayar di muka (cash before delivery) untuk shipment volume industri.',
    supportingDocuments: ['Legalitas NIB & NPWP CV Mandiri Sentosa', 'Laporan Riwayat 2x Transaksi Cash Sukses'],
    status: 'menunggu',
  },
  {
    id: 'appr-003',
    requestNumber: 'REQ-TORO-2026-003',
    requestDate: '24 Okt 2026',
    decisionType: 'Transfer / Pembayaran',
    monetaryValue: 8400000,
    reason: 'Pembayaran DP 50% pelunasan sewa armada CDD Long rute Jakarta–Medan kepada Trans Sumatera Express.',
    benefit: 'Armada dapat berangkat sesuai jadwal penjemputan muatan pabrik garmen besok pagi.',
    riskIfApproved: 'Tidak ada, telah diverifikasi surat jalan & surat tugas driver.',
    riskIfRejected: 'Keberangkatan tertunda dan reputasi SLA TORO terganggu.',
    supportingDocuments: ['Invoice Mitra #TSE-8819', 'Bukti Surat Jalan Muat Pabrik'],
    status: 'disetujui',
    ownerDecisionNotes: 'Disetujui. Pastikan resi dan update transit dimonitor real-time oleh PAUL.',
    decisionDate: '24 Okt 2026 16:30 WIB',
  },
];

export const INITIAL_LEADS: PaulLead[] = [
  {
    id: 'lead-001',
    companyName: 'PT. Surya Mandiri Kimia',
    contactPerson: 'Bpk. Hendra Gunawan',
    phone: '0812-8877-6655',
    businessType: 'Distributor',
    cargoNeeds: 'Distribusi bahan kimia non-B3 drum dan karton',
    routeInterest: 'Jakarta ke Surabaya & Semarang',
    estimatedVolume: '2–3 Ton / Minggu',
    status: 'penawaran terkirim',
    priority: 'Tinggi',
    lastContact: '26 Okt 2026',
    nextFollowUpDate: '27 Okt 2026',
    notes: 'Penawaran kargo darat CDD telah dikirim via WhatsApp & email resmi. Menunggu feedback tim procurement.',
    quoteOffered: 16500000,
  },
  {
    id: 'lead-002',
    companyName: 'CV. Agro Lestari Makmur',
    contactPerson: 'Ibu Ratna Dewi',
    phone: '0813-9900-1122',
    businessType: 'Manufaktur',
    cargoNeeds: 'Pengiriman pupuk organik kemasan zak 25kg',
    routeInterest: 'Jakarta ke Lampung & Palembang',
    estimatedVolume: '5–8 Ton / Pengiriman',
    status: 'perlu tindak lanjut',
    priority: 'Tinggi',
    lastContact: '25 Okt 2026',
    nextFollowUpDate: '27 Okt 2026',
    notes: 'Tertarik opsi sewa armada Fuso atau kontainer laut. Butuh komparasi lead time & biaya.',
    quoteOffered: 24000000,
  },
  {
    id: 'lead-003',
    companyName: 'Toko Elektronik Megah Jaya',
    contactPerson: 'Bpk. Kevin Wijaya',
    phone: '0811-2233-4455',
    businessType: 'Toko Retail',
    cargoNeeds: 'Cargo sparepart elektronik dan sound system',
    routeInterest: 'Jakarta ke Makassar & Banjarmasin',
    estimatedVolume: '300–500 KG / Bulan',
    status: 'menang',
    priority: 'Sedang',
    lastContact: '24 Okt 2026',
    nextFollowUpDate: '01 Nov 2026',
    notes: 'Sudah mulai bertransaksi via Cargo Udara & Laut. Repeat order dijadwalkan awal bulan.',
    quoteOffered: 9800000,
  },
  {
    id: 'lead-004',
    companyName: 'PT. Sinar Tekstil Nusantara',
    contactPerson: 'Bpk. Ridwan Hakim',
    phone: '0857-7711-2233',
    businessType: 'Manufaktur',
    cargoNeeds: 'Pengiriman gulungan kain garmen ber-rol',
    routeInterest: 'Bandung ke Solo & Surabaya',
    estimatedVolume: '1–2 Ton / Trip',
    status: 'belum merespons',
    priority: 'Sedang',
    lastContact: '23 Okt 2026',
    nextFollowUpDate: '27 Okt 2026',
    notes: 'Kontak pertama via WhatsApp marketing, belum dibuka. Jadwal kirim draf sapaan kedua.',
  },
  {
    id: 'lead-005',
    companyName: 'PT. Prima Import Globalindo',
    contactPerson: 'Ibu Michelle Tan',
    phone: '0818-4455-6677',
    businessType: 'Importir',
    cargoNeeds: 'Jasa Customs Clearance & Forwarding Door-to-Door China–Indonesia',
    routeInterest: 'Guangzhou ke Gudang Jakarta',
    estimatedVolume: 'Kontainer 20ft FCL',
    status: 'perlu tindak lanjut',
    priority: 'Tinggi',
    lastContact: '26 Okt 2026',
    nextFollowUpDate: '28 Okt 2026',
    notes: 'Konsultasi izin impor dan jalur borongan/resmi. Sedang siapkan breakdown estimasi bea masuk.',
    quoteOffered: 42000000,
  },
];

export const INITIAL_SHIPMENTS: PaulShipment[] = [
  {
    id: 'shp-001',
    orderNumber: 'TR-882109-SBY',
    customerName: 'CV. Indo Berkah Mandiri',
    customerPhone: '0812-3456-7890',
    senderAddress: 'Kawasan Pergudangan Cengkareng Blok B3, Jakarta Barat',
    receiverName: 'Bpk. Agus Raharjo',
    receiverAddress: 'Jl. Rungkut Industri III No. 12, Surabaya',
    destinationCity: 'Surabaya',
    cargoType: 'Karton Sparepart & Hardware',
    serviceMethod: 'Darat',
    fleetAssigned: 'CDD Box (B 9182 TZG)',
    partnerName: 'PT. Jaya Express Logistik',
    weightKg: 250,
    volumeM3: 0.85,
    koli: 4,
    sellingPriceTotal: 1375000, // 250kg * 5500
    partnerCostTotal: 875000,   // 250kg * 3500
    grossMargin: 500000,        // Rp2.000/kg
    marginPercentage: 36.36,
    status: 'Dalam Perjalanan',
    hasProofOfDelivery: false,
    isDelayed: false,
    dispatchDate: '25 Okt 2026, 20:00 WIB',
    estimatedArrival: '27 Okt 2026, 14:00 WIB',
  },
  {
    id: 'shp-002',
    orderNumber: 'TR-773401-MDN',
    customerName: 'PT. Sumatra Multi Niaga',
    customerPhone: '0813-8899-0011',
    senderAddress: 'Tanjung Priok Pool C4, Jakarta Utara',
    receiverName: 'Ibu Linda Susanti',
    receiverAddress: 'Jl. Krakatau No. 88, Medan Timur',
    destinationCity: 'Medan',
    cargoType: 'Perabot Kantor & Furniture Knockdown',
    serviceMethod: 'Laut',
    fleetAssigned: 'Kontainer LCL 20ft',
    partnerName: 'Pelayaran Samudera Jaya',
    weightKg: 480,
    volumeM3: 2.1,
    koli: 8,
    sellingPriceTotal: 2304000, // 480kg * 4800
    partnerCostTotal: 1344000,  // 480kg * 2800
    grossMargin: 960000,        // Rp2.000/kg
    marginPercentage: 41.67,
    status: 'Dalam Perjalanan',
    hasProofOfDelivery: false,
    isDelayed: false,
    dispatchDate: '23 Okt 2026, 10:00 WIB',
    estimatedArrival: '29 Okt 2026, 17:00 WIB',
  },
  {
    id: 'shp-003',
    orderNumber: 'TR-990212-MKS',
    customerName: 'Toko Elektronik Megah',
    customerPhone: '0811-2233-4455',
    senderAddress: 'Pusat Elektronik Harco Mangga Dua, Jakarta',
    receiverName: 'Bpk. Benny Makasau',
    receiverAddress: 'Jl. Pengayoman No. 45, Panakkukang, Makassar',
    destinationCity: 'Makassar',
    cargoType: 'Power Inverter & Aksesoris Audio',
    serviceMethod: 'Udara',
    fleetAssigned: 'Air Cargo Flight GA-612',
    partnerName: 'Garuda Indonesia Cargo Agent',
    weightKg: 45,
    volumeM3: 0.18,
    koli: 2,
    sellingPriceTotal: 2004750, // 45kg * 44550
    partnerCostTotal: 1914750,  // 45kg * 42550
    grossMargin: 90000,         // Rp2.000/kg
    marginPercentage: 4.49,
    status: 'Tiba di Kota Tujuan',
    hasProofOfDelivery: false, // PAUL strict rule: Belum diverifikasi tidak boleh dibilang selesai!
    isDelayed: false,
    dispatchDate: '26 Okt 2026, 06:00 WIB',
    estimatedArrival: '26 Okt 2026, 16:30 WITA',
  },
  {
    id: 'shp-004',
    orderNumber: 'TR-665123-BDO',
    customerName: 'CV. Sandang Prima Bandung',
    customerPhone: '0822-1144-7788',
    senderAddress: 'Cakung Industrial Park, Jakarta Timur',
    receiverName: 'Bpk. Dedi Supardi',
    receiverAddress: 'Jl. Soekarno Hatta No. 412, Bandung',
    destinationCity: 'Bandung',
    cargoType: 'Bahan Baku Benang Spun Polyester',
    serviceMethod: 'Darat',
    fleetAssigned: 'Engkel CDE (D 8491 AB)',
    partnerName: 'Trans Priangan Express',
    weightKg: 650,
    volumeM3: 1.9,
    koli: 12,
    sellingPriceTotal: 2925000,
    partnerCostTotal: 1625000,
    grossMargin: 1300000,
    marginPercentage: 44.44,
    status: 'Selesai',
    hasProofOfDelivery: true,
    podDocumentUrl: 'POD-BDO-665123.jpg',
    podVerifiedAt: '25 Okt 2026, 17:15 WIB',
    isDelayed: false,
    dispatchDate: '24 Okt 2026, 09:00 WIB',
    estimatedArrival: '25 Okt 2026, 16:00 WIB',
  },
  {
    id: 'shp-005',
    orderNumber: 'TR-551092-BPN',
    customerName: 'PT. Mahakam Mining Supplies',
    customerPhone: '0812-7788-9900',
    senderAddress: 'Marunda Logistic Hub, Jakarta Utara',
    receiverName: 'Bpk. Anton Simanjuntak',
    receiverAddress: 'Jl. Mulawarman Batakan, Balikpapan',
    destinationCity: 'Balikpapan',
    cargoType: 'Hydraulic Hose & Valve Fitting',
    serviceMethod: 'Laut',
    fleetAssigned: 'Kapal Roro Swasembada',
    partnerName: 'Lintas Laut Nusantara',
    weightKg: 320,
    volumeM3: 1.1,
    koli: 5,
    sellingPriceTotal: 2080000,
    partnerCostTotal: 1440000,
    grossMargin: 640000,
    marginPercentage: 30.77,
    status: 'Dalam Perjalanan',
    hasProofOfDelivery: false,
    isDelayed: true,
    delayReason: 'Cuaca buruk ombak tinggi di Laut Jawa, keberangkatan kapal ditunda 18 jam.',
    dispatchDate: '22 Okt 2026, 14:00 WIB',
    estimatedArrival: '29 Okt 2026 (Revisi)',
  },
];

export const INITIAL_TRANSACTIONS: PaulFinancialTransaction[] = [
  {
    id: 'tx-001',
    txNumber: 'INV-TORO-2026-041',
    date: '26 Okt 2026',
    type: 'Pendapatan',
    orderReference: 'TR-882109-SBY',
    counterparty: 'CV. Indo Berkah Mandiri',
    amount: 1375000,
    hasDocumentProof: true,
    proofDocumentNote: 'Invoice Penagihan Resmi #041/TORO/X/2026 terbit',
    paymentStatus: 'Belum Dibayar (Piutang)',
    isReconciled: true,
    notes: 'Jatuh tempo 02 Nov 2026. PAUL membedakan invoice dari kas diterima!',
  },
  {
    id: 'tx-002',
    txNumber: 'KAS-IN-2026-088',
    date: '25 Okt 2026',
    type: 'Kas Masuk',
    orderReference: 'TR-665123-BDO',
    counterparty: 'CV. Sandang Prima Bandung',
    amount: 2925000,
    hasDocumentProof: true,
    proofDocumentNote: 'Bukti transfer BCA No. Ref 9028114 diterima & terverifikasi rekening',
    paymentStatus: 'Lunas',
    isReconciled: true,
    notes: 'Pelunasan cargo Bandung selesai dengan PoD sah.',
  },
  {
    id: 'tx-003',
    txNumber: 'BIAYA-MTR-2026-039',
    date: '24 Okt 2026',
    type: 'Biaya Mitra',
    orderReference: 'TR-665123-BDO',
    counterparty: 'Trans Priangan Express',
    amount: 1625000,
    hasDocumentProof: true,
    proofDocumentNote: 'Kuitansi & Surat Jalan Mitra No. TPE-4412',
    paymentStatus: 'Lunas',
    isReconciled: true,
    notes: 'Telah dilunasi setelah verifikasi penyerahan barang di Bandung.',
  },
  {
    id: 'tx-004',
    txNumber: 'BIAYA-OPS-2026-015',
    date: '24 Okt 2026',
    type: 'Biaya Operasional',
    counterparty: 'Gudang Packaging Cengkareng',
    amount: 450000,
    hasDocumentProof: true,
    proofDocumentNote: 'Nota pembelian plastik bubble wrap, karung kargo, dan lakban fragile',
    paymentStatus: 'Lunas',
    isReconciled: true,
    notes: 'Biaya bahan perlengkapan pengaman kargo.',
  },
  {
    id: 'tx-005',
    txNumber: 'UTANG-MTR-2026-012',
    date: '23 Okt 2026',
    type: 'Biaya Mitra',
    orderReference: 'TR-773401-MDN',
    counterparty: 'Pelayaran Samudera Jaya',
    amount: 1344000,
    hasDocumentProof: true,
    proofDocumentNote: 'Bill of Lading & Surat Muat Kontainer',
    paymentStatus: 'Utang Mitra',
    isReconciled: false,
    notes: 'Jatuh tempo pelunasan saat kapal sandar di Pelabuhan Belawan.',
  },
];

export const INITIAL_COMPLAINTS: PaulComplaint[] = [
  {
    id: 'cmp-001',
    ticketNumber: 'CMP-TORO-001',
    timestamp: '25 Okt 2026, 11:30 WIB',
    customerName: 'PT. Mahakam Mining Supplies',
    orderNumber: 'TR-551092-BPN',
    issueType: 'Keterlambatan',
    urgency: 'Tinggi',
    description: 'Pelanggan menanyakan kepastian ETA karena kapal roro sandar tertunda di pelabuhan Balikpapan akibat cuaca buruk.',
    proposedResolution: 'Memberikan update kronologis dari pihak pelayaran, estimasi jadwal labuh baru, dan penawaran potongan biaya handling pengantaran door-to-door.',
    isEscalatedToOwner: false,
    status: 'Dalam Penanganan',
  },
  {
    id: 'cmp-002',
    ticketNumber: 'CMP-TORO-002',
    timestamp: '22 Okt 2026, 09:15 WIB',
    customerName: 'Toko Surya Cahaya',
    orderNumber: 'TR-440912-SMG',
    issueType: 'Kerusakan Barang',
    urgency: 'Kritis',
    description: '1 karton dari 6 karton lampu hias mengalami retak fisik pada kemasan luar saat dibongkar.',
    proposedResolution: 'Klaim asuransi kargo telah diajukan bersama mitra angkutan. Nilai ganti rugi Rp1.250.000 menunggu persetujuan tertulis Pemilik.',
    isEscalatedToOwner: true,
    status: 'Menunggu Otorisasi Pemilik',
  },
];

export const INITIAL_PARTNERS: PaulCarrierPartner[] = [
  {
    id: 'prt-001',
    partnerName: 'PT. Jaya Express Logistik',
    legalEntity: 'PT',
    contactPerson: 'Bpk. Bambang Suwarno',
    phone: '0812-9876-5432',
    fleetTypes: ['Blind Van', 'CDD (6 Roda)', 'Wingbox'],
    serviceRoutes: ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'],
    verifiedLegalDoc: true,
    onTimeRate: 97.4,
    completedShipments: 142,
    complaintCount: 1,
    activeStatus: 'Aktif Terverifikasi',
    rating: 4.9,
  },
  {
    id: 'prt-002',
    partnerName: 'Pelayaran Samudera Jaya',
    legalEntity: 'PT',
    contactPerson: 'Ibu Veronica S.',
    phone: '0813-2211-9988',
    fleetTypes: ['Container 20ft & 40ft', 'Kapal Roro'],
    serviceRoutes: ['Sumatera', 'Kalimantan', 'Sulawesi', 'Papua'],
    verifiedLegalDoc: true,
    onTimeRate: 93.8,
    completedShipments: 89,
    complaintCount: 2,
    activeStatus: 'Aktif Terverifikasi',
    rating: 4.7,
  },
  {
    id: 'prt-003',
    partnerName: 'Trans Priangan Express',
    legalEntity: 'CV',
    contactPerson: 'Bpk. Asep Saepudin',
    phone: '0856-7890-1234',
    fleetTypes: ['Pick Up', 'Engkel (CDE)', 'CDD Long'],
    serviceRoutes: ['Jabodetabek', 'Banten', 'Bandung Raya'],
    verifiedLegalDoc: true,
    onTimeRate: 98.1,
    completedShipments: 76,
    complaintCount: 0,
    activeStatus: 'Aktif Terverifikasi',
    rating: 4.9,
  },
  {
    id: 'prt-004',
    partnerName: 'Garuda Indonesia Cargo Agent',
    legalEntity: 'PT',
    contactPerson: 'Divisi Cargo Bandara Soetta',
    phone: '021-5500-123',
    fleetTypes: ['Air Freight Cargo Plane'],
    serviceRoutes: ['Seluruh Bandara Utama Indonesia'],
    verifiedLegalDoc: true,
    onTimeRate: 96.5,
    completedShipments: 110,
    complaintCount: 1,
    activeStatus: 'Aktif Terverifikasi',
    rating: 4.8,
  },
];

// LocalStorage Keys for PAUL
export const PAUL_STORAGE_KEYS = {
  APPROVALS: 'toro_paul_approvals_v2',
  LEADS: 'toro_paul_leads_v2',
  SHIPMENTS: 'toro_paul_shipments_v2',
  TRANSACTIONS: 'toro_paul_transactions_v2',
  COMPLAINTS: 'toro_paul_complaints_v2',
  PARTNERS: 'toro_paul_partners_v2',
  TARGETS: 'toro_paul_targets_v2',
  OWNER_NAME: 'toro_paul_owner_name_v2',
  OWNER_SIGNATURE_DATE: 'toro_paul_owner_sig_date_v2',
};

// Persistence Helpers
export function getStoredPaulApprovals(): OwnerApprovalRequest[] {
  try {
    const raw = localStorage.getItem(PAUL_STORAGE_KEYS.APPROVALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored approvals', e);
  }
  return INITIAL_OWNER_APPROVALS;
}

export function saveStoredPaulApprovals(data: OwnerApprovalRequest[]): void {
  try {
    localStorage.setItem(PAUL_STORAGE_KEYS.APPROVALS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save approvals', e);
  }
}

export function getStoredPaulLeads(): PaulLead[] {
  try {
    const raw = localStorage.getItem(PAUL_STORAGE_KEYS.LEADS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored leads', e);
  }
  return INITIAL_LEADS;
}

export function saveStoredPaulLeads(data: PaulLead[]): void {
  try {
    localStorage.setItem(PAUL_STORAGE_KEYS.LEADS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save leads', e);
  }
}

export function getStoredPaulShipments(): PaulShipment[] {
  try {
    const raw = localStorage.getItem(PAUL_STORAGE_KEYS.SHIPMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored shipments', e);
  }
  return INITIAL_SHIPMENTS;
}

export function saveStoredPaulShipments(data: PaulShipment[]): void {
  try {
    localStorage.setItem(PAUL_STORAGE_KEYS.SHIPMENTS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save shipments', e);
  }
}

export function getStoredPaulTransactions(): PaulFinancialTransaction[] {
  try {
    const raw = localStorage.getItem(PAUL_STORAGE_KEYS.TRANSACTIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored transactions', e);
  }
  return INITIAL_TRANSACTIONS;
}

export function saveStoredPaulTransactions(data: PaulFinancialTransaction[]): void {
  try {
    localStorage.setItem(PAUL_STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save transactions', e);
  }
}

export function getStoredPaulComplaints(): PaulComplaint[] {
  try {
    const raw = localStorage.getItem(PAUL_STORAGE_KEYS.COMPLAINTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored complaints', e);
  }
  return INITIAL_COMPLAINTS;
}

export function saveStoredPaulComplaints(data: PaulComplaint[]): void {
  try {
    localStorage.setItem(PAUL_STORAGE_KEYS.COMPLAINTS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save complaints', e);
  }
}

export function getStoredPaulPartners(): PaulCarrierPartner[] {
  try {
    const raw = localStorage.getItem(PAUL_STORAGE_KEYS.PARTNERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored partners', e);
  }
  return INITIAL_PARTNERS;
}

export function saveStoredPaulPartners(data: PaulCarrierPartner[]): void {
  try {
    localStorage.setItem(PAUL_STORAGE_KEYS.PARTNERS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save partners', e);
  }
}

// 6 KEPALA DIVISI AI TORO LOGISTIC
export const AI_SIX_DIVISIONS: AiDivisionHead[] = [
  {
    id: 'PAUL',
    name: 'PAUL',
    role: 'AI Direktur Utama',
    title: 'Koordinator Utama Seluruh Divisi',
    avatarColor: 'from-[#FF6B1A] to-[#d64e05]',
    mission: 'Membantu pemilik membangun ekspedisi yang menguntungkan, terpercaya, disiplin, dan berkembang secara berkelanjutan.',
    keyDuties: [
      'Menentukan prioritas kerja harian, mingguan, dan bulanan.',
      'Menetapkan target dan memberi tugas kepada Enis, Iqbal, Fiqa, Avan, dan Sasa.',
      'Menggabungkan laporan dari seluruh divisi menjadi satu laporan perusahaan.',
      'Mendeteksi masalah, keterlambatan, pemborosan, dan peluang pertumbuhan.',
      'Menyiapkan rekomendasi keputusan yang memerlukan persetujuan pemilik.',
    ],
    reportFormat: [
      '1. Ringkasan kondisi perusahaan',
      '2. Hasil penjualan (ENIS)',
      '3. Status operasional kargo (IQBAL)',
      '4. Kondisi keuangan (FIQA)',
      '5. Peluang bisnis (AVAN)',
      '6. Jaringan keagenan (SASA)',
      '7. Masalah dan risiko',
      '8. Keputusan menunggu persetujuan pemilik',
      '9. Tiga prioritas berikutnya',
    ],
  },
  {
    id: 'ENIS',
    name: 'ENIS',
    role: 'Kepala Penjualan',
    title: 'Lead Acquisition & Client Retention',
    avatarColor: 'from-blue-600 to-indigo-600',
    mission: 'Membantu perusahaan memperoleh pelanggan baru, meningkatkan transaksi, dan membangun pelanggan berulang.',
    keyDuties: [
      'Mencari calon pelanggan potensial (distributor, grosir, manufaktur, retail).',
      'Menyusun database prospek dan menyiapkan materi penawaran harga.',
      'Meminta biaya terverifikasi dari FIQA & IQBAL sebelum mengirim penawaran final.',
      'Menindaklanjuti calon pelanggan secara sopan, terjadwal, dan tertib.',
      'Berkoordinasi dengan SASA untuk menghindari perebutan prospek agen vs pusat.',
    ],
    reportFormat: [
      'Tanggal; prospek baru; prospek dihubungi; respons; penawaran terkirim; pesanan baru; estimasi nilai pesanan; alasan gagal; tindak lanjut; bantuan yang dibutuhkan dari PAUL.',
    ],
  },
  {
    id: 'IQBAL',
    name: 'IQBAL',
    role: 'Kepala Operasional Kargo',
    title: 'Dispatch, Transit & PoD Verification',
    avatarColor: 'from-amber-600 to-orange-600',
    mission: 'Memastikan setiap pengiriman diproses tertib, dipantau real-time, dan didukung bukti penerimaan sah (PoD).',
    keyDuties: [
      'Memeriksa kelengkapan pesanan, alamat, rute, kapasitas, dan syarat muatan.',
      'Menyusun jadwal penjemputan armada dan keberangkatan kargo.',
      'Memantau status: penjemputan, transit, tiba tujuan, dan selesai setelah PoD sah.',
      'Memeriksa kesiapan operasional rute cabang/agen bersama SASA.',
      'Mengevaluasi kinerja ketepatan waktu mitra vendor transportasi.',
    ],
    reportFormat: [
      'Nomor pengiriman; pelanggan; asal dan tujuan; mitra angkutan; status terakhir; waktu pembaruan; estimasi jadwal; kendala; biaya terkait; bukti penerimaan; tindakan lanjutan; bantuan dari PAUL.',
    ],
  },
  {
    id: 'FIQA',
    name: 'FIQA',
    role: 'Kepala Keuangan & Administrasi',
    title: 'Cashflow, Margin Audit & Reconciliation',
    avatarColor: 'from-emerald-600 to-teal-600',
    mission: 'Menjaga ketepatan pencatatan, arus kas riil, pengendalian biaya, margin minimal Rp2.000/kg, dan penagihan piutang.',
    keyDuties: [
      'Mencatat transaksi berdasarkan invoice, mutasi rekening, dan bukti sah.',
      'Memisahkan nilai penjualan (invoice), kas masuk riil, dan piutang pelanggan.',
      'Menghitung margin kotor per pengiriman dan menilai skema komisi agen SASA.',
      'Menyusun daftar tagihan jatuh tempo dan kewajiban pembayaran mitra vendor.',
      'Mencegah pengeluaran tanpa otorisasi tertulis dari pemilik.',
    ],
    reportFormat: [
      'Periode; saldo kas riil; kas masuk; kas keluar; pendapatan tercatat; biaya angkutan; biaya operasional; margin kotor; piutang; utang; komisi agen terutang; tagihan jatuh tempo; transaksi belum cocok; risiko; keputusan butuh izin pemilik.',
    ],
  },
  {
    id: 'AVAN',
    name: 'AVAN',
    role: 'Kepala Pengembangan Bisnis',
    title: 'Market Mapping & Strategic Expansion',
    avatarColor: 'from-purple-600 to-violet-600',
    mission: 'Mencari peluang pertumbuhan realistis, memperluas jaringan mitra, menilai pasar, dan membangun keunggulan bersaing.',
    keyDuties: [
      'Menganalisis segmen pasar dan wilayah potensial pengiriman kargo berulang.',
      'Bekerja sama dengan SASA memetakan pembukaan titik jaringan agen baru.',
      'Mengidentifikasi calon vendor armada darat, kapal roro, kontainer, dan udara.',
      'Mengusulkan strategi pertumbuhan bertahap yang hemat biaya dan teruji.',
      'Menilai kelayakan ekspansi dengan analisis modal kerja bersama FIQA.',
    ],
    reportFormat: [
      'Peluang; segmen pasar; kebutuhan pelanggan; potensi transaksi; calon mitra/agen; sumber informasi; estimasi biaya; manfaat; risiko; kebutuhan modal; langkah uji coba; indikator keberhasilan; rekomendasi kepada PAUL.',
    ],
  },
  {
    id: 'SASA',
    name: 'SASA',
    role: 'Kepala Divisi Keagenan',
    title: 'Agency Network Recruitment & Management',
    avatarColor: 'from-pink-600 to-rose-600',
    mission: 'Membangun, mengelola, mengembangkan, dan mengevaluasi jaringan agen TORO Logistic agar jangkauan layanan semakin luas dan volume pengiriman meningkat.',
    keyDuties: [
      'Mencari calon agen di berbagai wilayah (toko, grosir, pelaku usaha lokal).',
      'Mengelola pusat data tab KEAGENAN (21 kolom Google Sheets terpadu).',
      'Mengumpulkan dokumen calon agen untuk verifikasi operasional (IQBAL) dan komisi (FIQA).',
      'Menyiapkan usulan kerja sama agen untuk otorisasi pemilik melalui PAUL.',
      'Memantau kepatuhan standar layanan agen, jumlah kargo, komisi terutang, dan evaluasi berkala.',
    ],
    reportFormat: [
      'Tanggal laporan; wilayah sasaran; calon agen baru; calon agen dihubungi; respons; status verifikasi; calon agen menunggu dokumen; agen disetujui; agen aktif; jumlah pengiriman per agen; estimasi dan realisasi komisi; keluhan; risiko; kebutuhan dukungan tim; keputusan butuh izin pemilik; prioritas berikutnya.',
    ],
  },
];

// INITIAL SEED DATA FOR TAB KEAGENAN (21 KOLOM GOOGLE SHEETS)
export const INITIAL_AGENTS: PaulAgent[] = [
  {
    id: 'AGN-0001',
    tanggalMasuk: '24 Okt 2026',
    namaAgen: 'Bpk. Ridwan Santoso',
    namaUsaha: 'Toko Sembako & Mitra Ekspedisi Subang Makmur',
    wilayah: 'Subang Kota & Kalijati, Jawa Barat',
    kontakBisnis: '0813-8822-1100',
    ruteLayanan: 'Subang ke Seluruh Indonesia via Hub Jakarta',
    kapasitas: 'Ruko 2 lantai, pool parkir pickup, timbangan kargo 300kg',
    statusPendekatan: 'Aktif',
    statusVerifikasi: 'Terverifikasi Sah',
    dokumen: ['KTP', 'NIB Berusaha', 'NPWP', 'Foto Tempat Usaha'],
    usulanKomisi: '15% dari total ongkos kirim kargo',
    statusPersetujuan: 'Disetujui Pemilik',
    tanggalAktivasi: '25 Okt 2026',
    jumlahPengiriman: 14,
    biaya: 4200000,
    komisiTerutang: 630000,
    keluhan: 'Nihil',
    pic: 'SASA',
    tindakLanjut: 'Bantuan promosi spanduk resmi TORO dan pamflet tarif dari ENIS',
    tanggalEvaluasi: '25 Nov 2026',
    catatan: 'Agen pilot Jawa Barat pertama dengan traffic pelanggan retail & sembako yang tinggi.',
    relatedOrderIds: ['TR-882109-SBY', 'TR-665123-BDO'],
  },
  {
    id: 'AGN-0002',
    tanggalMasuk: '25 Okt 2026',
    namaAgen: 'Ibu Dewi Maharani',
    namaUsaha: 'CV. Sentosa Cilegon Express Point',
    wilayah: 'Cilegon & Merak, Banten',
    kontakBisnis: '0857-4433-2211',
    ruteLayanan: 'Kawasan Industri Cilegon ke Jawa & Sumatera',
    kapasitas: 'Gudang transit 80m2, armada pickup L300 sendiri',
    statusPendekatan: 'Menunggu Otorisasi',
    statusVerifikasi: 'Lolos Dokumen',
    dokumen: ['KTP', 'NIB', 'Foto Gudang'],
    usulanKomisi: '12% komisi kargo + insentif Rp250/kg volume industri',
    statusPersetujuan: 'Menunggu Persetujuan Pemilik',
    tanggalAktivasi: 'Menunggu Persetujuan',
    jumlahPengiriman: 0,
    biaya: 0,
    komisiTerutang: 0,
    keluhan: 'Nihil',
    pic: 'SASA',
    tindakLanjut: 'IQBAL memverifikasi rute pickup Merak; FIQA telah menilai usulan komisi aman. Menunggu persetujuan Pemilik di Panel 5.',
    tanggalEvaluasi: '28 Okt 2026',
    catatan: 'Potensi besar kargo pipa dan suku cadang pabrik industri Cilegon.',
  },
  {
    id: 'AGN-0003',
    tanggalMasuk: '26 Okt 2026',
    namaAgen: 'Bpk. Ahmad Fauzi',
    namaUsaha: 'Fotocopy & Cargo Point Karawang Barat',
    wilayah: 'Karawang Barat (Dekat Gerbang Tol KIIC), Jawa Barat',
    kontakBisnis: '0812-9988-7766',
    ruteLayanan: 'Karawang ke Surabaya, Medan, Makassar',
    kapasitas: 'Toko pinggir jalan protokol, timbangan digital 150kg',
    statusPendekatan: 'Verifikasi',
    statusVerifikasi: 'Sedang Diverifikasi',
    dokumen: ['KTP', 'NPWP'],
    usulanKomisi: '15% kargo retail',
    statusPersetujuan: 'Menunggu Persetujuan Pemilik',
    tanggalAktivasi: 'Belum Aktif',
    jumlahPengiriman: 0,
    biaya: 0,
    komisiTerutang: 0,
    keluhan: 'Nihil',
    pic: 'SASA',
    tindakLanjut: 'Meminta NIB & foto lokasi tampak depan untuk verifikasi dokumen lengkap.',
    tanggalEvaluasi: '30 Okt 2026',
    catatan: 'Calon agen strategis di koridor industri Karawang.',
  },
];

// INITIAL SEED TASKS FOR SIX DIVISIONS
export const INITIAL_TASKS: PaulTask[] = [
  {
    id: 'TSK-001',
    title: 'Verifikasi Dokumen NIB & Survey Lokasi Calon Agen Karawang (AGN-0003)',
    pic: 'SASA',
    deadline: '28 Okt 2026',
    status: 'Dalam Proses',
    result: 'Menunggu calon agen mengirim foto NIB & tampak depan ruko.',
    relatedEntityId: 'AGN-0003',
  },
  {
    id: 'TSK-002',
    title: 'Uji Kelayakan Rute Penjemputan Armada Pickup Agen Subang (AGN-0001)',
    pic: 'IQBAL',
    deadline: '27 Okt 2026',
    status: 'Selesai',
    result: 'Rute pickup via tol Cipali aman dan terhubung ke jadwal sore Hub Cengkareng.',
    relatedEntityId: 'AGN-0001',
  },
  {
    id: 'TSK-003',
    title: 'Audit Skema Komisi 12% Agen Cilegon (AGN-0002) & Simulasi Margin',
    pic: 'FIQA',
    deadline: '27 Okt 2026',
    status: 'Selesai',
    result: 'Margin kotor TORO terjaga minimal Rp1.750/kg setelah potongan komisi agen.',
    relatedEntityId: 'AGN-0002',
  },
  {
    id: 'TSK-004',
    title: 'Kirim Draf Penawaran Kargo 5 Ton/Minggu ke PT Mega Distribusi',
    pic: 'ENIS',
    deadline: '27 Okt 2026',
    status: 'Dalam Proses',
    result: 'Draf proposal siap dikirim via WhatsApp setelah otorisasi diskon disetujui.',
  },
  {
    id: 'TSK-005',
    title: 'Pemetaan Peluang Jaringan Agen Baru Koridor Cirebon–Tegal',
    pic: 'AVAN',
    deadline: '30 Okt 2026',
    status: 'Dalam Proses',
    result: 'Mengidentifikasi 4 calon toko mitra di Jalur Pantura.',
  },
  {
    id: 'TSK-006',
    title: 'Susun Rekomendasi Otorisasi Pemilik untuk Agen Cilegon di Panel 5',
    pic: 'PAUL',
    deadline: '27 Okt 2026',
    status: 'Selesai',
    result: 'Pengajuan REQ-TORO-2026-004 diterbitkan untuk persetujuan pemilik.',
    relatedEntityId: 'AGN-0002',
  },
];

// Extra LocalStorage Keys
export const PAUL_EXTRA_STORAGE_KEYS = {
  AGENTS: 'toro_paul_agents_v2',
  TASKS: 'toro_paul_tasks_v2',
};

export function getStoredPaulAgents(): PaulAgent[] {
  try {
    const raw = localStorage.getItem(PAUL_EXTRA_STORAGE_KEYS.AGENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored agents', e);
  }
  return INITIAL_AGENTS;
}

export function saveStoredPaulAgents(data: PaulAgent[]): void {
  try {
    localStorage.setItem(PAUL_EXTRA_STORAGE_KEYS.AGENTS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save agents', e);
  }
}

export function getStoredPaulTasks(): PaulTask[] {
  try {
    const raw = localStorage.getItem(PAUL_EXTRA_STORAGE_KEYS.TASKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load stored tasks', e);
  }
  return INITIAL_TASKS;
}

export function saveStoredPaulTasks(data: PaulTask[]): void {
  try {
    localStorage.setItem(PAUL_EXTRA_STORAGE_KEYS.TASKS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
}

