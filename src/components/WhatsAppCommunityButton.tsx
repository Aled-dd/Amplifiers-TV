import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppCommunityButton: React.FC = () => {
  const handleOpenWhatsAppGroup = () => {
    // Official WhatsApp Community Link simulation
    window.open('https://chat.whatsapp.com', '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40">
      <button
        onClick={handleOpenWhatsAppGroup}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        title="Join Gospel Amplifiers WhatsApp Community"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
          WhatsApp Group 🇳🇬
        </span>
      </button>
    </div>
  );
};
