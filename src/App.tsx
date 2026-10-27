import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CekOngkirSection } from './components/CekOngkirSection';
import { SewaArmadaSection } from './components/SewaArmadaSection';
import { ImportSection } from './components/ImportSection';
import { TrackingSection } from './components/TrackingSection';
import { LayananSection } from './components/LayananSection';
import { KenapaToroSection } from './components/KenapaToroSection';
import { TentangToroSection } from './components/TentangToroSection';
import { TestimonialSection } from './components/TestimonialSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminTarifModal } from './components/AdminTarifModal';
import { PaulStandaloneApp } from './components/paul/PaulStandaloneApp';
import {
  RouteTariff,
  SystemSettings,
  INITIAL_TARIFF_DATABASE,
  DEFAULT_SETTINGS,
} from './data/toroLogisticsData';
import {
  getStoredTariffs,
  getStoredSettings,
  saveStoredTariffs,
  saveStoredSettings,
} from './utils/toroCalculators';
import { Bot, ShieldCheck, Sparkles, Globe, ArrowRight } from 'lucide-react';

export default function App() {
  // Determine Portal Mode: 'paul' (Dedicated Standalone System) vs 'web' (Public Customer Website)
  const [currentPortal, setCurrentPortal] = useState<'paul' | 'web'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('web')) return 'web';
      if (hash.includes('paul')) return 'paul';
      const stored = localStorage.getItem('toro_current_portal');
      if (stored === 'web' || stored === 'paul') return stored;
    }
    // Default to the dedicated PAUL system as requested by user
    return 'paul';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [tariffs, setTariffs] = useState<RouteTariff[]>(INITIAL_TARIFF_DATABASE);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [paulInitialTab, setPaulInitialTab] = useState('dashboard');

  // Sync hash routing and persistence
  useEffect(() => {
    localStorage.setItem('toro_current_portal', currentPortal);
    window.location.hash = currentPortal === 'paul' ? '#/paul' : '#/web';
  }, [currentPortal]);

  // Listen to hash changes from URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('web')) {
        setCurrentPortal('web');
      } else if (hash.includes('paul')) {
        setCurrentPortal('paul');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize data from LocalStorage
  useEffect(() => {
    const loadedTariffs = getStoredTariffs();
    setTariffs(loadedTariffs);
    const loadedSettings = getStoredSettings();
    setSystemSettings(loadedSettings);
  }, []);

  const handleSwitchPortal = (target: 'paul' | 'web', tab?: string) => {
    if (tab) setPaulInitialTab(tab);
    setCurrentPortal(target);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateTariffs = (newTariffs: RouteTariff[]) => {
    setTariffs(newTariffs);
    saveStoredTariffs(newTariffs);
  };

  const handleUpdateSettings = (newSettings: SystemSettings) => {
    setSystemSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  // 1. DEDICATED STANDALONE SYSTEM: PAUL OS (AI DIREKTUR UTAMA)
  // Completely separate from the public customer website
  if (currentPortal === 'paul') {
    return (
      <PaulStandaloneApp
        onSwitchToPublicWeb={() => handleSwitchPortal('web')}
        initialTab={paulInitialTab}
      />
    );
  }

  // 2. PUBLIC CUSTOMER WEBSITE: TORO TRANSPORTASI & LOGISTIC
  return (
    <div className="min-h-screen bg-[#050820] text-slate-100 flex flex-col font-sans selection:bg-[#FF6B1A] selection:text-white">
      {/* 1. Header Navigation Bar (Sticky with WhatsApp and Menu) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onOpenPaulCommandCenter={(tabId) => {
          handleSwitchPortal('paul', tabId);
        }}
        systemSettings={systemSettings}
      />

      <main className="flex-1">
        {/* 2. Visual Home Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          systemSettings={systemSettings}
        />

        {/* 3. Fitur Utama: Cek Ongkir Calculator Real-Time */}
        <CekOngkirSection
          tariffs={tariffs}
          systemSettings={systemSettings}
        />

        {/* 4. Fitur Utama: Sewa Armada Logistik (9 Pilihan Kendaraan) */}
        <SewaArmadaSection
          systemSettings={systemSettings}
        />

        {/* 5. Fitur Utama: Layanan Import TORO (Formulir Quotation ke WhatsApp) */}
        <ImportSection
          systemSettings={systemSettings}
        />

        {/* 6. Fitur Utama: Cek Resi / Tracking Real-Time Timeline */}
        <TrackingSection
          systemSettings={systemSettings}
        />

        {/* 7. Layanan Multimoda Ekspedisi TORO */}
        <LayananSection
          onNavigate={handleNavigate}
          systemSettings={systemSettings}
        />

        {/* 8. Keunggulan TORO (6 Standar Kualitas) */}
        <KenapaToroSection />

        {/* 9. Tentang TORO (PT TORO SENTOSA GROUP) */}
        <TentangToroSection />

        {/* 10. Big Call to Action Section */}
        <TestimonialSection
          onNavigate={handleNavigate}
          systemSettings={systemSettings}
        />
      </main>

      {/* 11. Footer Resmi */}
      <Footer
        onNavigate={handleNavigate}
        systemSettings={systemSettings}
      />

      {/* 12. Floating WhatsApp Button (Fixed Bottom-Right) */}
      <WhatsAppWidget systemSettings={systemSettings} />

      {/* 13. Floating Portal Switcher: Masuk ke Sistem PAUL OS (Fixed Bottom-Left) */}
      <aside aria-label="Portal Switcher" className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => handleSwitchPortal('paul', 'dashboard')}
          className="bg-gradient-to-r from-[#070b28] via-[#0d164a] to-[#070b28] border-2 border-blue-500/60 hover:border-[#FF6B1A] text-white pl-3.5 pr-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 group transition-all transform hover:-translate-y-1 cursor-pointer"
          title="Buka Sistem PAUL — AI Direktur Utama (Aplikasi Terpisah Mandiri)"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B1A] to-[#d64e05] flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs text-white tracking-tight">SISTEM PAUL</span>
              <span className="text-[10px] font-bold text-[#FF6B1A] bg-[#FF6B1A]/20 px-1.5 py-0.2 rounded">
                AI DIRUT
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-blue-300 font-medium flex items-center gap-1">
              <span>Masuk Sistem Terpisah</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </aside>

      {/* 14. Admin Panel Modal (Protected with Login) */}
      <AdminTarifModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        tariffs={tariffs}
        onUpdateTariffs={handleUpdateTariffs}
        systemSettings={systemSettings}
        onUpdateSettings={handleUpdateSettings}
        onOpenPaulCommandCenter={() => {
          handleSwitchPortal('paul', 'dashboard');
        }}
      />
    </div>
  );
}
