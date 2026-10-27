import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SystemSettings } from '../data/toroLogisticsData';
import { generateDynamicWhatsAppUrl } from '../utils/toroCalculators';

interface WhatsAppWidgetProps {
  systemSettings: SystemSettings;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ systemSettings }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const waUrl = generateDynamicWhatsAppUrl('general', {}, systemSettings);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip: Chat TORO */}
      <div
        className={`bg-[#0a0f2c] border border-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl transition-all duration-200 whitespace-nowrap ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none sm:opacity-100 sm:translate-x-0'
        }`}
      >
        <span>Chat TORO ({systemSettings.whatsappNumber})</span>
      </div>

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer relative group"
        aria-label="Chat WhatsApp TORO"
        title="Chat TORO"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF6B1A] rounded-full border-2 border-[#050820] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF6B1A] rounded-full border-2 border-[#050820]" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
