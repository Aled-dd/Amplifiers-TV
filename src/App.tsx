import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { getCurrentRoute, buildHash } from './utils/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PrayerRequestModal } from './components/PrayerRequestModal';
import { YouTubeViewsProvider } from './context/YouTubeViewsContext';

import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { WatchPage } from './pages/WatchPage';
import { AboutPage } from './pages/AboutPage';
import { MinistryPage } from './pages/MinistryPage';
import { ContactPage } from './pages/ContactPage';
import { DonatePage } from './pages/DonatePage';
import { CommunityPage } from './pages/CommunityPage';

export default function App() {
  const initialRoute = getCurrentRoute();
  const [currentPage, setCurrentPage] = useState<PageType>(initialRoute.page);
  const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(initialRoute.mediaId);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  // Synchronize state with browser hash routing (Back, Forward, manual URL updates)
  useEffect(() => {
    // If no hash exists on first visit, set default hash to #home cleanly
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      window.history.replaceState(null, '', '#home');
    }

    const handleHashChange = () => {
      const { page, mediaId } = getCurrentRoute();
      setCurrentPage(page);
      setSelectedMediaId(mediaId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to top smoothly on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedMediaId]);

  const handleNavigate = (page: PageType, mediaId?: string) => {
    const targetHash = buildHash(page, mediaId);
    if (window.location.hash !== targetHash) {
      // Pushes a new entry to browser history
      window.location.hash = targetHash;
    } else {
      // Re-trigger state & scroll if navigating to current hash
      setCurrentPage(page);
      setSelectedMediaId(mediaId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPrayerModal = () => {
    setPrayerModalOpen(true);
  };

  return (
    <YouTubeViewsProvider>
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

          {currentPage === 'contact' && (
            <ContactPage />
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
    </YouTubeViewsProvider>
  );
}
