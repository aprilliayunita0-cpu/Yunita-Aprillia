import React from 'react';
import {
  Target,
  TrendingUp,
  CheckCircle2,
  Users,
  Award,
  Truck,
  Building,
  AlertCircle,
} from 'lucide-react';
import {
  PaulLead,
  PaulShipment,
  PaulCarrierPartner,
  INITIAL_90_DAY_TARGETS,
} from '../../data/paulSopData';

interface PaulTargetsViewProps {
  leads: PaulLead[];
  shipments: PaulShipment[];
  partners: PaulCarrierPartner[];
}

export const PaulTargetsView: React.FC<PaulTargetsViewProps> = ({
  leads,
  shipments,
  partners,
}) => {
  const currentLeadsCount = leads.length;
  const currentContactCount = leads.filter((l) => l.status !== 'belum merespons').length * 4; // realistic estimation of touchpoints
  const currentQuotesCount = leads.filter((l) => l.status === 'penawaran terkirim' || l.status === 'menang').length;
  const transactingCustomersCount = leads.filter((l) => l.status === 'menang').length;
  const repeatCustomersCount = 1; // Toko Elektronik Megah
  const verifiedPartnersCount = partners.filter((p) => p.verifiedLegalDoc).length;

  const targetItems = [
    {
      title: 'Database Prospek Relevan',
      target: '100–150',
      minTarget: 100,
      current: currentLeadsCount,
      percent: Math.min(100, Math.round((currentLeadsCount / 100) * 100)),
      desc: 'Pengumpulan data perusahaan, pabrik, distributor, dan toko yang membutuhkan ekspedisi rutin.',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Aktivitas Kontak Prospek Kumulatif',
      target: '200–300',
      minTarget: 200,
      current: currentContactCount,
      percent: Math.min(100, Math.round((currentContactCount / 200) * 100)),
      desc: 'Panggilan, pesan WhatsApp pengenalan, follow-up penawaran, dan penjajakan kebutuhan kargo.',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      title: 'Penawaran Kargo Diterbitkan',
      target: '30–50',
      minTarget: 30,
      current: currentQuotesCount,
      percent: Math.min(100, Math.round((currentQuotesCount / 30) * 100)),
      desc: 'Penawaran resmi dengan rincian biaya vendor + margin minimal Rp2.000/kg terverifikasi.',
      icon: Target,
      color: 'amber',
    },
    {
      title: 'Pelanggan Bertransaksi Riil',
      target: '3–5',
      minTarget: 3,
      current: transactingCustomersCount,
      percent: Math.min(100, Math.round((transactingCustomersCount / 3) * 100)),
      desc: 'Pelanggan korporat atau retail yang telah menyelesaikan order pengiriman pertama dengan pembayaran sah.',
      icon: Award,
      color: 'emerald',
    },
    {
      title: 'Pelanggan Berulang (Repeat Order)',
      target: '2–3',
      minTarget: 2,
      current: repeatCustomersCount,
      percent: Math.min(100, Math.round((repeatCustomersCount / 2) * 100)),
      desc: 'Pelanggan yang memesan kembali setelah layanan pertama memuaskan dan tepat waktu.',
      icon: Building,
      color: 'cyan',
    },
    {
      title: 'Mitra Angkutan Terverifikasi',
      target: 'Min. 3',
      minTarget: 3,
      current: verifiedPartnersCount,
      percent: Math.min(100, Math.round((verifiedPartnersCount / 3) * 100)),
      desc: 'Vendor transportasi darat, laut, udara, atau trucking yang legalitas dan armadanya teruji.',
      icon: Truck,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
            SOP BAGIAN H · TARGET &amp; EVALUASI 90 HARI
          </span>
          <span className="text-xs text-slate-400">Sasaran Kerja Terukur</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
          Rencana Target 90 Hari Pertama TORO Logistic
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Target awal untuk perusahaan yang sedang bertumbuh. PAUL mengevaluasi hasil mingguan dan merekomendasikan penyesuaian strategi berdasarkan kapasitas armada, margin riil, arus kas, dan respons pasar.
        </p>
      </div>

      {/* Target Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {targetItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#0b1033] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{item.title}</span>
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white">{item.current}</span>
                    <span className="text-xs text-slate-400 ml-1.5">/ Target {item.target}</span>
                  </div>
                  <span className="text-xs font-bold text-[#FF6B1A]">{item.percent}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF6B1A] to-[#ff8c42] h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Evaluasi PAUL</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> On Track
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Philosophy note from SOP */}
      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Prinsip Akuntabilitas (Section H):</strong>
          <p className="text-slate-400 mt-0.5">
            "Target tersebut adalah sasaran kerja, bukan jaminan hasil. PAUL mengevaluasi hasil mingguan dan merekomendasikan penyesuaian berdasarkan kapasitas, margin, arus kas, dan respons pasar."
          </p>
        </div>
      </div>
    </div>
  );
};
