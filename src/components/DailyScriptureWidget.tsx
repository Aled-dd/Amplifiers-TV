import React, { useState } from 'react';
import { DAILY_SCRIPTURES } from '../data/mockData';
import { BookOpen, Share2, X, ChevronRight, Check } from 'lucide-react';

export const DailyScriptureWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentScripture = DAILY_SCRIPTURES[currentIndex];

  const handleNextScripture = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_SCRIPTURES.length);
  };

  const handleShareWhatsApp = () => {
    const text = `*Daily Scripture from Gospel Amplifiers TV* ✝️\n\n"${currentScripture.verseText}"\n— *${currentScripture.reference}*\n\nWatch Nigerian Christian Movies & Faith Stories online at Gospel Amplifiers TV!`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#4B0082] to-[#2D0052] border border-[#D4AF37] text-[#FAF8F3] p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 transition-all duration-300 gold-glow group cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Daily Scripture
          </span>
        </button>
      ) : (
        <div className="bg-[#141414] border-2 border-[#D4AF37] rounded-2xl shadow-2xl p-5 max-w-sm w-80 text-[#FAF8F3] relative animate-in fade-in slide-in-from-bottom-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-cinzel">
              Today's Word of Faith
            </span>
          </div>

          <p className="font-cormorant italic text-base sm:text-lg text-[#FAF8F3] mb-2 leading-snug">
            "{currentScripture.verseText}"
          </p>

          <div className="text-xs font-semibold text-[#D4AF37] mb-4 text-right">
            — {currentScripture.reference}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A] text-xs">
            <button
              onClick={handleNextScripture}
              className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Next Verse</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
