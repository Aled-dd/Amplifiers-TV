import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PrayerRequestModal } from './components/PrayerRequestModal';

import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { WatchPage } from './pages/WatchPage';
import { AboutPage } from './pages/AboutPage';
import { MinistryPage } from './pages/MinistryPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { TestimonyPage } from './pages/TestimonyPage';
import { DonatePage } from './pages/DonatePage';
import { CommunityPage } from './pages/CommunityPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(undefined);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedMediaId]);

  const handleNavigate = (page: PageType, mediaId?: string) => {
    setCurrentPage(page);
    if (mediaId) {
      setSelectedMediaId(mediaId);
    }
  };

  const handleOpenPrayerModal = () => {
    setPrayerModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FAF8F3] font-sans flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0D0D0D]">
      
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPrayerModal={handleOpenPrayerModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenPrayerModal={handleOpenPrayerModal} />
        )}

        {currentPage === 'movies' && (
          <MoviesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'watch' && (
          <WatchPage mediaId={selectedMediaId} onNavigate={handleNavigate} onOpenPrayerModal={handleOpenPrayerModal} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'ministry' && (
          <MinistryPage onNavigate={handleNavigate} onOpenPrayerModal={handleOpenPrayerModal} />
        )}

        {currentPage === 'blog' && (
          <BlogPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'testimony' && (
          <TestimonyPage />
        )}

        {currentPage === 'donate' && (
          <DonatePage />
        )}

        {currentPage === 'community' && (
          <CommunityPage />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Prayer Request Modal */}
      <PrayerRequestModal
        isOpen={prayerModalOpen}
        onClose={() => setPrayerModalOpen(false)}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenPrayerModal={handleOpenPrayerModal} />

    </div>
  );
}
