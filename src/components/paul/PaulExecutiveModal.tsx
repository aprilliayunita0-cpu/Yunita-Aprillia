import React, { useState, useEffect } from 'react';
import {
  X,
  Bot,
  LayoutDashboard,
  Clock,
  ShieldCheck,
  ClipboardList,
  FileText,
  Target,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
  Layers,
} from 'lucide-react';
import {
  OwnerApprovalRequest,
  PaulLead,
  PaulShipment,
  PaulFinancialTransaction,
  PaulComplaint,
  PaulCarrierPartner,
  getStoredPaulApprovals,
  saveStoredPaulApprovals,
  getStoredPaulLeads,
  saveStoredPaulLeads,
  getStoredPaulShipments,
  saveStoredPaulShipments,
  getStoredPaulTransactions,
  saveStoredPaulTransactions,
  getStoredPaulComplaints,
  saveStoredPaulComplaints,
  getStoredPaulPartners,
  saveStoredPaulPartners,
  PAUL_SCHEDULE_SLOTS,
} from '../../data/paulSopData';
import { PaulDashboardPanels } from './PaulDashboardPanels';
import { PaulScheduleView } from './PaulScheduleView';
import { PaulAuthorityMatrix } from './PaulAuthorityMatrix';
import { PaulProceduresView } from './PaulProceduresView';
import { PaulReportsView } from './PaulReportsView';
import { PaulTargetsView } from './PaulTargetsView';
import { PaulSopDocumentView } from './PaulSopDocumentView';
import { PaulAiConsole } from './PaulAiConsole';
import { PaulActivationRoadmap } from './PaulActivationRoadmap';

interface PaulExecutiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const PaulExecutiveModal: React.FC<PaulExecutiveModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'dashboard',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // State data for PAUL
  const [approvals, setApprovals] = useState<OwnerApprovalRequest[]>([]);
  const [leads, setLeads] = useState<PaulLead[]>([]);
  const [shipments, setShipments] = useState<PaulShipment[]>([]);
  const [transactions, setTransactions] = useState<PaulFinancialTransaction[]>([]);
  const [complaints, setComplaints] = useState<PaulComplaint[]>([]);
  const [partners, setPartners] = useState<PaulCarrierPartner[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    setApprovals(getStoredPaulApprovals());
    setLeads(getStoredPaulLeads());
    setShipments(getStoredPaulShipments());
    setTransactions(getStoredPaulTransactions());
    setComplaints(getStoredPaulComplaints());
    setPartners(getStoredPaulPartners());
  }, [isOpen]);

  // Sync tab if initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Realtime Active Shift Calculation
  const now = new Date();
  const currentMinutesVal = now.getHours() * 60 + now.getMinutes();
  const currentSlot = PAUL_SCHEDULE_SLOTS.find((slot) => {
    const slotStart = slot.startHour * 60 + slot.startMinute;
    const slotEnd = slot.endHour * 60 + slot.endMinute;
    return currentMinutesVal >= slotStart && currentMinutesVal < slotEnd;
  });

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'menunggu').length;

  if (!isOpen) return null;

  // Handlers with persistence
  const handleUpdateApprovals = (data: OwnerApprovalRequest[]) => {
    setApprovals(data);
    saveStoredPaulApprovals(data);
  };

  const handleUpdateLeads = (data: PaulLead[]) => {
    setLeads(data);
    saveStoredPaulLeads(data);
  };

  const handleUpdateShipments = (data: PaulShipment[]) => {
    setShipments(data);
    saveStoredPaulShipments(data);
  };

  const handleUpdateTransactions = (data: PaulFinancialTransaction[]) => {
    setTransactions(data);
    saveStoredPaulTransactions(data);
  };

  const handleUpdateComplaints = (data: PaulComplaint[]) => {
    setComplaints(data);
    saveStoredPaulComplaints(data);
  };

  const handleUpdatePartners = (data: PaulCarrierPartner[]) => {
    setPartners(data);
    saveStoredPaulPartners(data);
  };

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard 6 Panel', icon: LayoutDashboard, badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined },
    { id: 'schedule', label: 'Pola Kerja & Jadwal (C)', icon: Clock },
    { id: 'authority', label: 'Batas Wewenang (D)', icon: ShieldCheck },
    { id: 'procedures', label: '5 Prosedur Operasional (E)', icon: ClipboardList },
    { id: 'reports', label: 'Laporan PAUL (G)', icon: FileText },
    { id: 'targets', label: 'Target 90 Hari (H)', icon: Target },
    { id: 'roadmap', label: 'Roadmap & Integrasi (6 Langkah)', icon: Layers },
    { id: 'document', label: 'Naskah SOP Resmi (A-J)', icon: FileText },
    { id: 'ai-console', label: 'Konsol AI PAUL', icon: Bot },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020514]/95 backdrop-blur-md flex flex-col">
      {/* Top Bar Header */}
      <div className="sticky top-0 z-40 bg-[#070b28] border-b border-slate-800 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B1A] to-[#d64e05] flex items-center justify-center font-black text-white text-lg shadow-lg shadow-orange-500/30">
            <Bot className="w-6 h-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                <span>PAUL</span>
                <span className="text-[#FF6B1A] text-xs uppercase px-2 py-0.5 rounded bg-[#FF6B1A]/20 border border-[#FF6B1A]/30">
                  AI Direktur Utama
                </span>
              </h1>
              <span className="text-xs text-slate-500 hidden sm:inline">·</span>
              <span className="text-xs font-mono font-semibold text-slate-400">
                SOP TORO-DIR-001 (Versi 2.0 Final)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Sistem Siap Beroperasi</span>
              </span>
              <span>·</span>
              <span>
                {currentSlot ? (
                  <span className="text-[#FF6B1A] font-medium">
                    Shift Aktif: {currentSlot.timeRange} WIB ({currentSlot.activity})
                  </span>
                ) : (
                  <span>Di Luar Jam Kerja Rutin · Mode Siaga &amp; Monitoring</span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          {pendingApprovalsCount > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 border border-red-500/50 text-red-300 rounded-lg text-xs font-bold animate-pulse hover:bg-red-900/60 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>{pendingApprovalsCount} Otorisasi Tertunda</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="Tutup Command Center"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Web Publik</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-header / Tabs */}
      <div className="bg-[#050820] border-b border-slate-800 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B1A] text-white shadow-md shadow-orange-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <PaulDashboardPanels
            approvals={approvals}
            onUpdateApprovals={handleUpdateApprovals}
            leads={leads}
            onUpdateLeads={handleUpdateLeads}
            shipments={shipments}
            onUpdateShipments={handleUpdateShipments}
            transactions={transactions}
            onUpdateTransactions={handleUpdateTransactions}
            complaints={complaints}
            onUpdateComplaints={handleUpdateComplaints}
            partners={partners}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'schedule' && <PaulScheduleView />}

        {activeTab === 'authority' && <PaulAuthorityMatrix />}

        {activeTab === 'procedures' && (
          <PaulProceduresView
            leads={leads}
            onUpdateLeads={handleUpdateLeads}
            shipments={shipments}
            onUpdateShipments={handleUpdateShipments}
            transactions={transactions}
            onUpdateTransactions={handleUpdateTransactions}
            complaints={complaints}
            onUpdateComplaints={handleUpdateComplaints}
            partners={partners}
            onUpdatePartners={handleUpdatePartners}
          />
        )}

        {activeTab === 'reports' && (
          <PaulReportsView
            approvals={approvals}
            leads={leads}
            shipments={shipments}
            transactions={transactions}
            complaints={complaints}
            partners={partners}
          />
        )}

        {activeTab === 'targets' && (
          <PaulTargetsView
            leads={leads}
            shipments={shipments}
            partners={partners}
          />
        )}

        {activeTab === 'roadmap' && (
          <PaulActivationRoadmap
            onSwitchToAiChat={(initialPrompt) => {
              setActiveTab('ai-console');
            }}
          />
        )}

        {activeTab === 'document' && <PaulSopDocumentView />}

        {activeTab === 'ai-console' && (
          <PaulAiConsole
            approvals={approvals}
            leads={leads}
            shipments={shipments}
            transactions={transactions}
          />
        )}
      </div>

      {/* Footer Status */}
      <footer className="bg-[#020514] border-t border-slate-800/80 px-6 py-3 text-center text-xs text-slate-500">
        <div>
          PT TORO SENTOSA GROUP · PAUL AI DIREKTUR UTAMA (TORO-DIR-001)
        </div>
        <div className="text-[10px] text-slate-600 mt-0.5">
          Prinsip Utama: Menjalankan tugas yang telah diizinkan, melaporkan hasil secara transparan, dan meminta persetujuan pemilik sebelum mengambil tindakan di luar batas wewenang.
        </div>
      </footer>
    </div>
  );
};
