import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  ArrowRight,
  Shield,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { PAUL_SCHEDULE_SLOTS, PaulScheduleSlot } from '../../data/paulSopData';

export const PaulScheduleView: React.FC = () => {
  const [currentWibTime, setCurrentWibTime] = useState<Date>(new Date());
  const [completedSlots, setCompletedSlots] = useState<Record<string, boolean>>({
    '08.00–08.30': true,
    '08.30–10.30': true,
  });

  // Keep live time updated
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWibTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format current WIB time string
  const wibHours = currentWibTime.getHours();
  const wibMinutes = currentWibTime.getMinutes();
  const currentMinutesVal = wibHours * 60 + wibMinutes;

  // Check active slot
  const isSlotActive = (slot: PaulScheduleSlot) => {
    const slotStart = slot.startHour * 60 + slot.startMinute;
    const slotEnd = slot.endHour * 60 + slot.endMinute;
    return currentMinutesVal >= slotStart && currentMinutesVal < slotEnd;
  };

  const isSlotPast = (slot: PaulScheduleSlot) => {
    const slotEnd = slot.endHour * 60 + slot.endMinute;
    return currentMinutesVal >= slotEnd;
  };

  const toggleSlotDone = (timeRange: string) => {
    setCompletedSlots((prev) => ({
      ...prev,
      [timeRange]: !prev[timeRange],
    }));
  };

  const cycleSteps = [
    {
      num: '1',
      title: 'Mengumpulkan Data',
      desc: 'Mengumpulkan data dari sumber yang telah diizinkan (pesanan, status armada, invoice, chat prospek).',
    },
    {
      num: '2',
      title: 'Pemeriksaan & Kewajaran',
      desc: 'Memeriksa kelengkapan dan kewajaran data, mengidentifikasi anomali atau data yang belum lengkap.',
    },
    {
      num: '3',
      title: 'Penentuan Prioritas',
      desc: 'Menentukan tugas berdasarkan skala prioritas dan tenggat waktu hari kerja.',
    },
    {
      num: '4',
      title: 'Eksekusi Tugas Rutin Berizin',
      desc: 'Menjalankan tugas rutin yang sudah mendapat delegasi wewenang resmi.',
    },
    {
      num: '5',
      title: 'Permintaan Persetujuan',
      desc: 'Meminta persetujuan tertulis Pemilik untuk tindakan yang memerlukan otorisasi (keuangan, diskon, komitmen).',
    },
    {
      num: '6',
      title: 'Pencatatan & Tindak Lanjut',
      desc: 'Mencatat hasil, kendala di lapangan, dan menetapkan langkah mitigasi lanjutan.',
    },
    {
      num: '7',
      title: 'Penyampaian Laporan',
      desc: 'Menyampaikan laporan harian (15.30–16.00) dan laporan mingguan komprehensif.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                SOP BAGIAN C · POLA KERJA &amp; JADWAL
              </span>
              <span className="text-xs text-slate-400">TORO-DIR-001 Versi 2.0</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Jadwal Operasional Harian PAUL (AI Direktur Utama)
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Mode kerja: proaktif dan terjadwal. PAUL menjalankan ritme harian terstruktur dari jam 08.00 hingga 16.00 WIB untuk memastikan kontrol disiplin atas penjualan, kargo, keuangan, dan pelaporan.
            </p>
          </div>

          <div className="bg-[#070b28] border border-slate-700/80 rounded-xl p-3.5 flex items-center gap-3 shrink-0">
            <Clock className="w-6 h-6 text-[#FF6B1A] animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Waktu Sistem Lokal
              </div>
              <div className="text-lg font-black text-white font-mono">
                {currentWibTime.toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}{' '}
                <span className="text-xs text-[#FF6B1A]">WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Step Cycle Cards */}
        <div className="mt-6">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-400" />
            7 Siklus Kerja Mandat PAUL
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
            {cycleSteps.map((step) => (
              <div
                key={step.num}
                className="bg-[#070b28] border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-black text-xs flex items-center justify-center mb-2">
                    {step.num}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug">{step.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-3">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Shift Timeline Schedule */}
      <div className="bg-[#0b1033] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Tabel Jadwal Kerja Operasional Harian
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Jadwal acuan pelaksanaan tugas operasional PAUL. Klik checkbox untuk menandai tugas shift yang telah tuntas.
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {PAUL_SCHEDULE_SLOTS.map((slot, index) => {
            const active = isSlotActive(slot);
            const past = isSlotPast(slot);
            const isDone = completedSlots[slot.timeRange] || false;

            return (
              <div
                key={slot.timeRange}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  active
                    ? 'bg-[#10194e] border-[#FF6B1A] shadow-lg shadow-orange-950/20'
                    : isDone
                    ? 'bg-slate-900/40 border-slate-800 opacity-90'
                    : 'bg-[#070b28] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleSlotDone(slot.timeRange)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-0.5 transition-colors cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'border-slate-600 bg-slate-800 text-transparent hover:border-[#FF6B1A]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#FF6B1A] bg-[#FF6B1A]/10 px-2 py-0.5 rounded border border-[#FF6B1A]/20">
                          {slot.timeRange} WIB
                        </span>
                        {active && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse flex items-center gap-1">
                            <PlayCircle className="w-3 h-3" />
                            Shift Berjalan Saat Ini
                          </span>
                        )}
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {slot.category}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mt-1.5">{slot.activity}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{slot.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        isDone
                          ? 'text-emerald-400 bg-emerald-950/30'
                          : active
                          ? 'text-[#FF6B1A] bg-orange-950/30'
                          : 'text-slate-400 bg-slate-800'
                      }`}
                    >
                      {isDone ? 'Tuntas Terlaksana' : active ? 'Sedang Diproses' : 'Terjadwal'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note from SOP */}
        <div className="mt-5 p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Ketentuan SOP TORO-DIR-001 Bagian C:</strong>
            <p className="text-slate-400 mt-0.5">
              "Jadwal di atas adalah jadwal acuan operasional. Pelaksanaan otomatis sesuai jam didukung oleh sistem penjadwalan real-time TORO Logistic dan akses data yang relevan."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
