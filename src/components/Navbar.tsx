import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  ShieldCheck,
  Settings,
  Truck,
  MessageCircle,
  Bot,
  Sparkles,
} from 'lucide-react';
import { TORO_COMPANY_INFO, SystemSettings } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl } from '../utils/toroCalculators';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdminModal: () => void;
  onOpenPaulCommandCenter?: (tabId?: string) => void;
  systemSettings: SystemSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAdminModal,
  onOpenPaulCommandCenter,
  systemSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'cek-ongkir', label: 'CEK ONGKIR' },
    { id: 'sewa-armada', label: 'SEWA ARMADA' },
    { id: 'import', label: 'IMPORT' },
    { id: 'cek-resi', label: 'CEK RESI' },
    { id: 'layanan', label: 'LAYANAN' },
    { id: 'tentang-toro', label: 'TENTANG TORO' },
    { id: 'kontak', label: 'KONTAK' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const waUrl = generateDynamicWhatsAppUrl('general', {}, systemSettings);

  return (
    <header className="sticky top-0 z-50 bg-[#050820]/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Corporate Bar */}
      <div className="bg-[#020514] border-b border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-400 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-200 tracking-wide uppercase">
              {TORO_COMPANY_INFO.legalEntity}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">
              {TORO_COMPANY_INFO.brandName}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[#FF6B1A] font-semibold">
              Ekspedisi &amp; Logistik Seluruh Indonesia
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* PAUL AI Direktur Utama Pill */}
            <button
              type="button"
              onClick={() => onOpenPaulCommandCenter?.('dashboard')}
              className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/50 hover:border-[#FF6B1A] text-blue-200 hover:text-white transition-all cursor-pointer text-[10px] font-bold group shadow-sm"
              title="Buka Command Center PAUL — AI Direktur Utama TORO Logistic"
            >
              <Bot className="w-3 h-3 text-[#FF6B1A] group-hover:scale-110 transition-transform" />
              <span>PAUL (AI Dirut)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <a
              href={`tel:${systemSettings.whatsappRaw}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FF6B1A]" />
              <span>WhatsApp: {systemSettings.whatsappNumber}</span>
            </a>
            <button
              type="button"
              onClick={onOpenAdminModal}
              className="flex items-center gap-1 text-slate-400 hover:text-[#FF6B1A] transition-colors cursor-pointer text-[11px] font-semibold"
            >
              <Settings className="w-3 h-3 text-[#FF6B1A]" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo Brand: TORO Transportasi dan Logistic */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#FF6B1A] to-[#e0590e] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <div className="font-black text-xl sm:text-2xl tracking-tight text-white block leading-none">
                TORO<span className="text-[#FF6B1A]">.</span>
              </div>
              <div className="text-[10px] sm:text-[11px] tracking-wider font-semibold text-slate-300 uppercase block mt-0.5">
                Transportasi dan Logistic
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[12px] font-bold tracking-wider text-slate-300">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`py-2 hover:text-[#FF6B1A] transition-colors cursor-pointer relative ${
                  activeSection === item.id ? 'text-[#FF6B1A]' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B1A] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Header: PAUL Command Center Button, WhatsApp & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PAUL AI Direktur Utama Quick Button */}
            <button
              type="button"
              onClick={() => onOpenPaulCommandCenter?.('dashboard')}
              className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gradient-to-r from-[#0b1342] to-[#121c54] border border-blue-500/50 hover:border-[#FF6B1A] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              title="Buka Pusat Kendali Eksekutif PAUL (TORO-DIR-001)"
            >
              <div className="w-5 h-5 rounded-lg bg-[#FF6B1A] flex items-center justify-center text-white text-[11px] font-black">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none hidden sm:block">
                <span className="block font-black text-white text-[11px]">PAUL (AI Dirut)</span>
                <span className="block text-[9px] text-[#FF6B1A] font-semibold mt-0.5">TORO-DIR-001</span>
              </div>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#FF6B1A] hover:bg-[#e0590e] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Admin Icon */}
            <button
              type="button"
              onClick={onOpenAdminModal}
              className="xl:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#070b28] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Direct PAUL Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPaulCommandCenter?.('dashboard');
            }}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-500/50 text-white font-bold text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B1A] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">PAUL — AI Direktur Utama</div>
                <div className="text-[10px] text-blue-300">SOP TORO-DIR-001 (Pusat Kendali Eksekutif)</div>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Buka
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`p-3 text-left rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#FF6B1A] text-white'
                    : 'bg-[#0a0f2c] text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>PT TORO SENTOSA GROUP</span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="text-[#FF6B1A] font-bold hover:underline flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Panel Tarif</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
