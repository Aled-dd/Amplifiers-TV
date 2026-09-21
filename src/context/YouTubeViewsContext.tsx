import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  fetchLiveYouTubeViews, 
  fetchBatchYouTubeViews, 
  formatCompactViews, 
  formatExactViews,
  getCachedView 
} from '../services/youtubeService';
import { BASELINE_YOUTUBE_VIEWS } from '../data/liveViewsBaseline';

interface YouTubeViewsContextType {
  viewsMap: Record<string, string>;
  getLiveView: (youtubeId: string, fallback?: string) => string;
  getExactLiveView: (youtubeId: string, fallback?: string) => string;
  getCompactLiveView: (youtubeId: string, fallback?: string) => string;
  refreshView: (youtubeId: string) => Promise<string | null>;
  refreshAll: () => Promise<void>;
  isSyncing: boolean;
  lastSynced: Date | null;
}

const YouTubeViewsContext = createContext<YouTubeViewsContextType | undefined>(undefined);

export const YouTubeViewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewsMap, setViewsMap] = useState<Record<string, string>>(() => {
    // Merge baseline views with any existing cached views in localStorage
    const initial: Record<string, string> = { ...BASELINE_YOUTUBE_VIEWS };
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('gospel_amplifiers_yt_live_views_v1');
        if (cached) {
          const parsed = JSON.parse(cached);
          for (const [id, entry] of Object.entries(parsed)) {
            if (entry && typeof entry === 'object' && 'views' in entry && typeof (entry as { views: string }).views === 'string') {
              initial[id] = (entry as { views: string }).views;
            }
          }
        }
      }
    } catch {
      // Ignore parse errors
    }
    return initial;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(() => new Date());

  // Get raw or formatted live view
  const getExactLiveView = useCallback((youtubeId: string, fallback?: string): string => {
    if (!youtubeId) return fallback || '0 views';
    const current = viewsMap[youtubeId] || getCachedView(youtubeId) || BASELINE_YOUTUBE_VIEWS[youtubeId] || fallback;
    return formatExactViews(current || '0 views');
  }, [viewsMap]);

  const getCompactLiveView = useCallback((youtubeId: string, fallback?: string): string => {
    if (!youtubeId) return fallback || '0 views';
    const current = viewsMap[youtubeId] || getCachedView(youtubeId) || BASELINE_YOUTUBE_VIEWS[youtubeId] || fallback;
    return formatCompactViews(current || '0 views');
  }, [viewsMap]);

  const getLiveView = useCallback((youtubeId: string, fallback?: string): string => {
    // Default to clean formatted exact count e.g. "32,850 views"
    return getExactLiveView(youtubeId, fallback);
  }, [getExactLiveView]);

  // Refresh single video live view on demand
  const refreshView = useCallback(async (youtubeId: string): Promise<string | null> => {
    if (!youtubeId) return null;
    setIsSyncing(true);
    try {
      const fresh = await fetchLiveYouTubeViews(youtubeId, true);
      if (fresh) {
        setViewsMap(prev => ({ ...prev, [youtubeId]: fresh }));
        setLastSynced(new Date());
        return fresh;
      }
    } finally {
      setIsSyncing(false);
    }
    return viewsMap[youtubeId] || null;
  }, [viewsMap]);

  // Refresh batch of top videos
  const refreshAll = useCallback(async () => {
    setIsSyncing(true);
    try {
      const ids = Object.keys(BASELINE_YOUTUBE_VIEWS);
      const batchResult = await fetchBatchYouTubeViews(ids);
      if (Object.keys(batchResult).length > 0) {
        setViewsMap(prev => ({ ...prev, ...batchResult }));
        setLastSynced(new Date());
      }
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Background refresh top featured videos on mount
  useEffect(() => {
    let isMounted = true;
    const initialSync = async () => {
      // Pick top trending videos to refresh
      const priorityIds = [
        'WNzilonVRWc', // THE ANGEL WHO KNEW HIS FATHER
        'pugXOLDCeiE', // THE BOX OF AUTHORITY
        'ugpO0BBgJFQ', // IN LOVE WITH AN OLDER WOMAN
        'hc_nASN4Scw', // DESTINY
        'v-w73uq99Nk', // THE DARK SCHOOL GIRL 3
        'T0nL4TSnO4c', // PROPHET SILAS 1
        'W84AldrribQ', // The Dark School Girl 1
      ];

      try {
        const results = await fetchBatchYouTubeViews(priorityIds);
        if (isMounted && Object.keys(results).length > 0) {
          setViewsMap(prev => ({ ...prev, ...results }));
          setLastSynced(new Date());
        }
      } catch {
        // Soft fail
      }
    };

    initialSync();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <YouTubeViewsContext.Provider
      value={{
        viewsMap,
        getLiveView,
        getExactLiveView,
        getCompactLiveView,
        refreshView,
        refreshAll,
        isSyncing,
        lastSynced,
      }}
    >
      {children}
    </YouTubeViewsContext.Provider>
  );
};

export function useYouTubeViews(): YouTubeViewsContextType {
  const context = useContext(YouTubeViewsContext);
  if (!context) {
    throw new Error('useYouTubeViews must be used within a YouTubeViewsProvider');
  }
  return context;
}
