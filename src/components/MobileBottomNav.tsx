import React from 'react';
import { PageType } from '../types';
import { Tv, Play, BookOpen, Heart, MessageSquare } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home' as PageType, label: 'Home', icon: <Tv className="w-5 h-5" /> },
    { id: 'movies' as PageType, label: 'Movies', icon: <Play className="w-5 h-5" /> },
    { id: 'blog' as PageType, label: 'Devotion', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'testimony' as PageType, label: 'Testimony', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'donate' as PageType, label: 'Donate', icon: <Heart className="w-5 h-5 text-[#D4AF37]" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-lg border-t border-[#2A2A2A] px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isActive ? 'text-[#D4AF37] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
