import React, { useState } from 'react';
import { PageType } from '../types';
import { 
  Play, 
  Search, 
  Heart, 
  Menu, 
  X, 
  Tv, 
  Volume2, 
  Flame, 
  Cross, 
  BookOpen, 
  MessageSquare, 
  Users, 
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, mediaId?: string) => void;
  onOpenPrayerModal: () => void;
  onSearchQuery?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPrayerModal,
  onSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const primaryNavItems: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'about', label: 'About us' },
    { id: 'donate', label: 'Donations' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      const youtubeSearchUrl = `https://www.youtube.com/@amplifierstv/search?query=${encodeURIComponent(query)}`;
      window.open(youtubeSearchUrl, '_blank', 'noopener,noreferrer');
      if (onSearchQuery) {
        onSearchQuery(query);
      }
    } else {
      window.open('https://www.youtube.com/@amplifierstv/videos', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#280303] border-b border-[#370a0a] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Desktop Primary Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {primaryNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-2 text-sm sm:text-base font-semibold transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Icon / Brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <span 
              onClick={() => onNavigate('home')} 
              className="font-cinzel text-lg font-bold text-white cursor-pointer"
            >
              GOSPEL AMPLIFIERS
            </span>
          </div>

          {/* Right Search Bar */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative w-44 sm:w-64 md:w-80">
              <button
                type="submit"
                title="Search on YouTube Channel"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Search YouTube channel videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0D0D0D] text-white text-xs sm:text-sm pl-9 pr-8 py-2 rounded-md border border-[#333333] focus:border-[#D4AF37] focus:outline-none placeholder-gray-500 transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-[#222222] px-4 pt-3 pb-6 space-y-2">
          {primaryNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-[#4B0082] text-[#D4AF37] font-semibold'
                  : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#222222] flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('ministry');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white"
            >
              Ministry & Mission
            </button>
            <button
              onClick={() => {
                onOpenPrayerModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs text-[#D4AF37] font-semibold"
            >
              Submit Prayer Request 🙏
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
