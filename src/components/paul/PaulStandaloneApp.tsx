import React, { useState, useEffect } from 'react';
import {
  Bot,
  LayoutDashboard,
  Layers,
  Clock,
  ShieldCheck,
  ClipboardList,
  FileText,
  Target,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ExternalLink,
  Globe,
  Settings,
  Bell,
  LogOut,
  Building2,
  RefreshCw,
  Users2,
  Store,
} from 'lucide-react';
import {
  OwnerApprovalRequest,
  PaulLead,
  PaulShipment,
  PaulFinancialTransaction,
  PaulComplaint,
  PaulCarrierPartner,
  PaulAgent,
  PaulTask,
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
  getStoredPaulAgents,
  saveStoredPaulAgents,
  getStoredPaulTasks,
  saveStoredPaulTasks,
  PAUL_SCHEDULE_SLOTS,
} from '../../data/paulSopData';
import { PaulDashboardPanels } from './PaulDashboardPanels';
import { PaulActivationRoadmap } from './PaulActivationRoadmap';
import { PaulScheduleView } from './PaulScheduleView';
import { PaulAuthorityMatrix } from './PaulAuthorityMatrix';
import { PaulProceduresView } from './PaulProceduresView';
import { PaulReportsView } from './PaulReportsView';
import { PaulTargetsView } from './PaulTargetsView';
import { PaulSopDocumentView } from './PaulSopDocumentView';
import { PaulAiConsole } from './PaulAiConsole';
import { PaulKeagenanView } from './PaulKeagenanView';
import { PaulSixDivisionsView } from './PaulSixDivisionsView';

interface PaulStandaloneAppProps {
  onSwitchToPublicWeb: () => void;
  initialTab?: string;
}

export const PaulStandaloneApp: React.FC<PaulStandaloneAppProps> = ({
  onSwitchToPublicWeb,
  initialTab = 'dashboard',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Core Data States with localStorage persistence
  const [approvals, setApprovals] = useState<OwnerApprovalRequest[]>([]);
  const [leads, setLeads] = useState<PaulLead[]>([]);
  const [shipments, setShipments] = useState<PaulShipment[]>([]);
  const [transactions, setTransactions] = useState<PaulFinancialTransaction[]>([]);
  const [complaints, setComplaints] = useState<PaulComplaint[]>([]);
  const [partners, setPartners] = useState<PaulCarrierPartner[]>([]);
  const [agents, setAgents] = useState<PaulAgent[]>([]);
  const [tasks, setTasks] = useState<PaulTask[]>([]);

  // Clock state
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setApprovals(getStoredPaulApprovals());
    setLeads(getStoredPaulLeads());
    setShipments(getStoredPaulShipments());
    setTransactions(getStoredPaulTransactions());
    setComplaints(getStoredPaulComplaints());
    setPartners(getStoredPaulPartners());
    setAgents(getStoredPaulAgents());
    setTasks(getStoredPaulTasks());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update handlers
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
  const handleUpdateAgents = (data: PaulAgent[]) => {
    setAgents(data);
    saveStoredPaulAgents(data);
  };
  const handleUpdateTasks = (data: PaulTask[]) => {
    setTasks(data);
    saveStoredPaulTasks(data);
  };
  const handleAddTask = (newTask: PaulTask) => {
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveStoredPaulTasks(updated);
  };
  const handleRequestApproval = (newApproval: OwnerApprovalRequest) => {
    const updated = [newApproval, ...approvals];
    setApprovals(updated);
    saveStoredPaulApprovals(updated);
  };

  // Real-time active shift
  const currentMinutesVal = currentTime.getHours() * 60 + currentTime.getMinutes();
  const currentSlot = PAUL_SCHEDULE_SLOTS.find((slot) => {
    const slotStart = slot.startHour * 60 + slot.startMinute;
    const slotEnd = slot.endHour * 60 + slot.endMinute;
    return currentMinutesVal >= slotStart && currentMinutesVal < slotEnd;
  });

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'menunggu').length;

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Eksekutif',
      subtitle: 'Ringkasan 6 Panel Utama',
      icon: LayoutDashboard,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined,
    },
    {
      id: 'six-divisions',
      label: 'Ruang Koordinasi 6 AI',
      subtitle: 'PAUL · ENIS · IQBAL · FIQA · AVAN · SASA',
      icon: Users2,
      badge: `${tasks.filter((t) => t.status !== 'Selesai').length}`,
    },
    {
      id: 'keagenan',
      label: 'Divisi Keagenan (SASA)',
      subtitle: 'Tab KEAGENAN (21 Kolom Sheets)',
      icon: Store,
      badge: `${agents.length}`,
    },
    {
      id: 'roadmap',
      label: 'Roadmap & Integrasi',
      subtitle: '6 Langkah Implementasi',
      icon: Layers,
    },
    {
      id: 'schedule',
      label: 'Pola Kerja & Jadwal',
      subtitle: 'SOP Bagian C (08.00–16.00)',
      icon: Clock,
    },
    {
      id: 'authority',
      label: 'Batas Wewenang',
      subtitle: 'SOP Bagian D & Keuangan',
      icon: ShieldCheck,
    },
    {
      id: 'procedures',
      label: '5 Prosedur Operasional',
      subtitle: 'SOP Bagian E (CRM, Kargo, dll)',
      icon: ClipboardList,
    },
    {
      id: 'reports',
      label: 'Laporan Eksekutif',
      subtitle: 'Laporan Harian & Mingguan (6 Divisi)',
      icon: FileText,
    },
    {
      id: 'targets',
      label: 'Target 90 Hari',
      subtitle: 'SOP Bagian H (Evaluasi)',
      icon: Target,
    },
    {
      id: 'document',
      label: 'Naskah SOP Resmi',
      subtitle: 'TORO-DIR-001 (A-J)',
      icon: FileText,
    },
    {
      id: 'ai-console',
      label: 'Konsol AI PAUL',
      subtitle: 'Asisten Direktur Utama',
      icon: Bot,
    },
  ];

  const currentNav = navigationItems.find((n) => n.id === activeTab) || navigationItems[0];

  return (
    <div className="min-h-screen bg-[#030617] text-slate-100 flex flex-col font-sans selection:bg-[#FF6B1A] selection:text-white">
      {/* Standalone System Top Header */}
      <header className="sticky top-0 z-40 bg-[#070b28]/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left Brand Area */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B1A] to-[#d64e05] flex items-center justify-center font-black text-white text-base shadow-lg shadow-orange-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm sm:text-base tracking-tight">
                    PAUL <span className="text-[#FF6B1A]">OS</span>
                  </span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-extrabold uppercase bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/30">
                    AI DIREKTUR UTAMA
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                    TORO-DIR-001 v2.0
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 leading-none mt-0.5 hidden sm:block">
                  Sistem Manajemen Mandiri · PT TORO SENTOSA GROUP
                </div>
              </div>
            </div>
          </div>

          {/* Center Shift Status Tracker (Desktop) */}
          <div className="hidden xl:flex items-center gap-3 px-3 py-1 bg-[#0b1033] border border-slate-800 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Status Operasional:</span>
            {currentSlot ? (
              <span className="font-semibold text-white">
                Shift {currentSlot.timeRange} WIB · <span className="text-[#FF6B1A]">{currentSlot.activity}</span>
              </span>
            ) : (
              <span className="text-slate-300 font-medium">Mode Siaga &amp; Pemantauan Mandiri</span>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {pendingApprovalsCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900/60 border border-red-500/50 text-red-300 rounded-xl text-xs font-bold animate-pulse transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">{pendingApprovalsCount} Otorisasi Pending</span>
                <span className="sm:hidden">{pendingApprovalsCount}</span>
              </button>
            )}

            {/* Switch Back to Customer Website Button */}
            <button
              type="button"
              onClick={onSwitchToPublicWeb}
              className="px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Beralih ke Portal Website Publik Pelanggan TORO Logistic"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF6B1A]" />
              <span className="hidden sm:inline">Ke Web Publik Pelanggan</span>
              <span className="sm:hidden">Web Publik</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Standalone Application Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop) */}
        <aside
          className={`hidden lg:flex flex-col bg-[#070b28] border-r border-slate-800 transition-all duration-300 shrink-0 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Sidebar Navigation Menu */}
          <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#FF6B1A] text-white shadow-lg shadow-orange-950/40 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={item.label}
                >
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Collapse Toggle & Info */}
          <div className="p-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2 text-slate-400 hover:text-white text-xs flex items-center justify-center gap-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              {!sidebarCollapsed && <span>Perkecil Sidebar</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
            <div className="w-72 bg-[#070b28] border-r border-slate-800 h-full flex flex-col p-4 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B1A] flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-sm text-white">PAUL OS</div>
                    <div className="text-[10px] text-slate-400">SOP TORO-DIR-001</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-4 space-y-1 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 ${
                        isActive
                          ? 'bg-[#FF6B1A] text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[10px] opacity-75">{item.subtitle}</div>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchToPublicWeb();
                  }}
                  className="w-full py-2.5 bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4 text-[#FF6B1A]" />
                  <span>Kembali ke Web Publik</span>
                </button>
              </div>
            </div>

            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Content Viewer Main Workspace */}
        <main className="flex-1 overflow-y-auto bg-[#040822] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* View Breadcrumb / Tab Identification Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>PAUL Executive OS</span>
                  <span>/</span>
                  <span className="text-[#FF6B1A] font-semibold">{currentNav.label}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {currentNav.label}
                </h1>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#FF6B1A]" />
                <span className="font-mono">
                  {currentTime.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}{' '}
                  WIB
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400 font-semibold">Mode Mandiri Aktif</span>
              </div>
            </div>

            {/* Active View Component Rendering */}
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

            {activeTab === 'six-divisions' && (
              <PaulSixDivisionsView
                tasks={tasks}
                onUpdateTasks={handleUpdateTasks}
                agents={agents}
                onNavigateToTab={(tabId) => setActiveTab(tabId)}
              />
            )}

            {activeTab === 'keagenan' && (
              <PaulKeagenanView
                agents={agents}
                onUpdateAgents={handleUpdateAgents}
                onAddTask={handleAddTask}
                onRequestApproval={handleRequestApproval}
                onNavigateToTab={(tabId) => setActiveTab(tabId)}
              />
            )}

            {activeTab === 'roadmap' && (
              <PaulActivationRoadmap
                onSwitchToAiChat={(initialPrompt) => {
                  setActiveTab('ai-console');
                }}
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
                agents={agents}
                tasks={tasks}
              />
            )}

            {activeTab === 'targets' && (
              <PaulTargetsView
                leads={leads}
                shipments={shipments}
                partners={partners}
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
        </main>
      </div>

      {/* Standalone System Status Footer */}
      <footer className="bg-[#020514] border-t border-slate-800/80 px-6 py-2.5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-slate-300">PAUL OS (TORO-DIR-001)</span>
          <span className="hidden sm:inline">· Sistem Operasional Eksekutif Terpisah Mandiri</span>
        </div>
        <div className="text-[11px] text-slate-400">
          PT TORO SENTOSA GROUP · Hak Cipta Sistem Kerja Direktur Utama
        </div>
      </footer>
    </div>
  );
};
