import React, { useState } from 'react';
import { BANK_DETAILS } from '../data/mockData';
import { Heart, Copy, Check, Mail, Phone } from 'lucide-react';

export const DonatePage: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyAccount = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* HERO BANNER */}
      <section className="bg-gradient-to-b from-[#4B0082] via-[#2A004A] to-[#0D0D0D] py-20 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-3.5 py-1 rounded-full uppercase">
            <Heart className="w-4 h-4 fill-current" />
            <span>MINISTRY PARTNERSHIP</span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
            Support Gospel Amplifiers TV
          </h1>

          <p className="font-cormorant italic text-xl text-amber-100 max-w-2xl mx-auto">
            "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." — 2 Corinthians 9:7
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* WHAT YOUR DONATION FUNDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 text-center space-y-3 hover:border-[#D4AF37] transition-all">
            <div className="w-12 h-12 bg-[#4B0082] text-[#D4AF37] rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
              🎬
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">Movie & Series Production</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Funds high-grade 4K cinema camera equipment, sound engineering, costumes, and location rentals across Nigeria.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 text-center space-y-3 hover:border-[#D4AF37] transition-all">
            <div className="w-12 h-12 bg-[#4B0082] text-[#D4AF37] rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
              📡
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">Free Global Broadcast</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Keeps all movie streaming 100% free for viewers worldwide without paywalls or subscription fees.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 text-center space-y-3 hover:border-[#D4AF37] transition-all">
            <div className="w-12 h-12 bg-[#4B0082] text-[#D4AF37] rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
              🚌
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white">Rural Film Crusades</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Sponsors mobile projector equipment and drama crusades in rural villages to bring souls to Christ.
            </p>
          </div>
        </div>

        {/* DONATION WIDGET */}
        <div className="bg-[#141414] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl gold-glow text-center space-y-8">
          <div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tracking-wider uppercase mb-2">
              YOU CAN SUPPORT THE WORK OF GOD
            </h2>
          </div>

          <div className="bg-[#0D0D0D] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-inner">
            <div className="space-y-1.5 border-b border-[#222] pb-5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                ACCOUNT NUMBER:
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-wider">
                  0104344304
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyAccount('0104344304')}
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs px-3.5 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedBank ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-1 border-b border-[#222] pb-5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                BANK:
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide block">
                ACCESS BANK
              </span>
            </div>

            <div className="space-y-1 border-b border-[#222] pb-5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                ACCOUNT NAME:
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide block">
                KINGDOM AMPLIFIERS
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                CONTACT US
              </span>
              <div className="space-y-2 text-sm sm:text-base text-gray-200">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <a href="mailto:amplifierstv29@gmail.com" className="hover:text-[#D4AF37] transition-colors font-semibold">
                    amplifierstv29@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <a href="tel:08188428888" className="hover:text-[#D4AF37] transition-colors font-semibold">
                    08188428888
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
