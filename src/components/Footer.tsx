import React from 'react';
import { PageType } from '../types';
import { Cross, Youtube, Facebook, Instagram, Heart, Mail, Phone, MapPin, Send, Flame } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenPrayerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrayerModal }) => {
  return (
    <footer className="bg-[#000000] text-[#FAF8F3] border-t-2 border-[#D4AF37] relative pt-16 pb-12 overflow-hidden">
      {/* Background Cross Watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
        <Cross className="w-96 h-96 text-[#D4AF37]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#222]">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4B0082] to-[#1A0033] border border-[#D4AF37] flex items-center justify-center">
                <Cross className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-bold text-white">
                  GOSPEL AMPLIFIERS <span className="text-[#D4AF37]">TV</span>
                </span>
                <span className="text-[10px] font-cormorant italic text-[#D4AF37] tracking-wider uppercase">
                  Where Faith Comes Alive
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              Gospel Amplifiers TV is a global Nigerian Christian movie and media ministry producing anointed drama series, spiritual warfare films, and soul-transforming gospel content for families worldwide.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] block mb-2">
                Follow & Subscribe
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@amplifierstv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#FF0000] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#333]"
                  title="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/amplifierstv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#1877F2] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#333]"
                  title="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/amplifierstv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#E4405F] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#333]"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@amplifierstvofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#000000] text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-[#333]"
                  title="TikTok"
                >
                  <span className="text-xs font-bold font-sans">🎵</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-cinzel text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 border-b border-[#333] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors">
                  Home Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('movies')} className="hover:text-[#D4AF37] transition-colors">
                  Movies & Series Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors">
                  About Our Ministry & Team
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect & Support */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 border-b border-[#333] pb-2 inline-block">
              Connect & Support
            </h3>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Abuja, Nigeria | Global Digital Outreach</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>amplifierstv29@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>08188428888</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenPrayerModal}
                className="w-full bg-[#4B0082] hover:bg-[#5C0099] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Submit 24/7 Prayer Request</span>
              </button>

              <button
                onClick={() => onNavigate('donate')}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#0D0D0D] font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Partner / Donate to Ministry</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Gospel Amplifiers TV. All Rights Reserved.</span>
          </div>

          <div className="font-cormorant italic text-sm text-[#D4AF37] flex items-center gap-1 font-semibold">
            <span>Powered by Faith & The Holy Spirit</span>
            <span>✝️</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-gray-300 transition-colors">
              Contact Us
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-gray-300 transition-colors">
              Privacy & Beliefs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
