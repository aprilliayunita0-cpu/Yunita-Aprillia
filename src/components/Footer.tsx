import React from 'react';
import { Phone, MapPin, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import { TORO_COMPANY_INFO, SystemSettings } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl } from '../utils/toroCalculators';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  systemSettings: SystemSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, systemSettings }) => {
  const waUrl = generateDynamicWhatsAppUrl('general', {}, systemSettings);

  const services = [
    { label: 'Cek Ongkir', id: 'cek-ongkir' },
    { label: 'Cargo Darat', id: 'layanan' },
    { label: 'Cargo Laut', id: 'layanan' },
    { label: 'Cargo Udara', id: 'layanan' },
    { label: 'Cargo Kereta', id: 'layanan' },
    { label: 'Sewa Armada', id: 'sewa-armada' },
    { label: 'Import', id: 'import' },
    { label: 'Tracking', id: 'cek-resi' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="bg-[#020514] text-white border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Kolom 1: Profil Perusahaan Sesuai Section 22 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B1A] flex items-center justify-center font-black text-white text-xl shadow-md">
                T
              </div>
              <div>
                <span className="font-black text-xl text-white block leading-none">
                  TORO<span className="text-[#FF6B1A]">.</span>
                </span>
                <span className="text-[10px] tracking-wider font-bold text-slate-300 uppercase block mt-0.5">
                  Transportasi dan Logistic
                </span>
              </div>
            </div>

            <div className="text-sm font-bold text-[#FF6B1A] uppercase tracking-wide">
              {TORO_COMPANY_INFO.legalEntity}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Perusahaan ekspedisi dan logistik melayani pengiriman cargo darat, laut, udara, kereta api, sewa armada truk, dan jasa import resmi ke seluruh Indonesia.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B1A] shrink-0 mt-0.5" />
                <span>{TORO_COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF6B1A] shrink-0" />
                <span>{TORO_COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Layanan Sesuai Section 22 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-widest border-b border-slate-800 pb-2">
              Layanan
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="text-slate-400 hover:text-[#FF6B1A] transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak & WhatsApp Sesuai Section 22 */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest border-b border-slate-800 pb-2">
              Kontak
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-[#FF6B1A]" />
                <span className="font-bold">WhatsApp: {systemSettings.whatsappNumber}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Customer service kami aktif melayani konsultasi tarif, cek resi kargo, sewa armada, dan quotation import setiap hari kerja.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-orange-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Sesuai Section 22 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 PT TORO SENTOSA GROUP. All Rights Reserved.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4 text-[#FF6B1A]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
