/**
 * Service for live synchronization of YouTube video view counts.
 * Synchronizes real-time YouTube statistics directly from YouTube.
 */

const CACHE_STORAGE_KEY = 'gospel_amplifiers_yt_live_views_v1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes fresh cache

interface CachedViewEntry {
  views: string; // e.g. "32,850 views"
  timestamp: number;
}

// In-memory runtime cache
const memoryCache: Record<string, CachedViewEntry> = {};

// Initialize from localStorage safely
function initCacheFromStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, CachedViewEntry>;
    const now = Date.now();
    for (const [id, entry] of Object.entries(parsed)) {
      if (entry && entry.views && (now - entry.timestamp < CACHE_TTL_MS * 3)) {
        memoryCache[id] = entry;
      }
    }
  } catch {
    // Ignore storage parse errors
  }
}

function saveCacheToStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(memoryCache));
  } catch {
    // Ignore storage quota errors
  }
}

initCacheFromStorage();

export function parseViewCountNumber(str: string): number {
  if (!str) return 0;
  const cleaned = str.replace(/views/i, '').replace(/,/g, '').trim();
  if (!isNaN(Number(cleaned)) && cleaned.length > 0) {
    return Number(cleaned);
  }
  const match = str.match(/([\d.]+)\s*([KMBkmb]?)/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  if (unit === 'K') return Math.round(num * 1000);
  if (unit === 'M') return Math.round(num * 1000000);
  if (unit === 'B') return Math.round(num * 1000000000);
  return Math.round(num);
}

export function formatCompactViews(numOrStr: number | string): string {
  const num = typeof numOrStr === 'number' ? numOrStr : parseViewCountNumber(numOrStr);
  if (num <= 0) return typeof numOrStr === 'string' ? numOrStr : '0 views';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M views';
  }
  if (num >= 100000) {
    return Math.round(num / 1000) + 'K views';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K views';
  }
  return `${num.toLocaleString()} views`;
}

export function formatExactViews(numOrStr: number | string): string {
  if (typeof numOrStr === 'string' && numOrStr.includes(',') && numOrStr.toLowerCase().includes('view')) {
    return numOrStr;
  }
  const num = typeof numOrStr === 'number' ? numOrStr : parseViewCountNumber(numOrStr);
  if (num > 0) {
    return `${num.toLocaleString()} views`;
  }
  return typeof numOrStr === 'string' ? numOrStr : '0 views';
}

/**
 * Extract view count from YouTube watch page HTML
 */
function extractViewsFromHtml(html: string): string | null {
  const match = html.match(/videoViewCountRenderer\":\{\"viewCount\":\{\"simpleText\":\"([^\"]+)\"/);
  if (match && match[1]) {
    return match[1];
  }
  const match2 = html.match(/\"factoidRenderer\":\{\"value\":\{\"simpleText\":\"([^\"]+)\"/);
  if (match2 && match2[1]) {
    return match2[1].includes('view') ? match2[1] : `${match2[1]} views`;
  }
  return null;
}

/**
 * Fetch live view count for a specific YouTube video ID
 */
export async function fetchLiveYouTubeViews(youtubeId: string, forceFresh = false): Promise<string | null> {
  if (!youtubeId || youtubeId.length < 5) return null;

  const now = Date.now();
  if (!forceFresh && memoryCache[youtubeId] && (now - memoryCache[youtubeId].timestamp < CACHE_TTL_MS)) {
    return memoryCache[youtubeId].views;
  }

  // 1. Try local dev/server API endpoint first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`/api/youtube-views?id=${encodeURIComponent(youtubeId)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.views && data.views[youtubeId]) {
        const viewStr = data.views[youtubeId];
        memoryCache[youtubeId] = { views: viewStr, timestamp: now };
        saveCacheToStorage();
        return viewStr;
      }
    }
  } catch {
    // Development endpoint not reached, fall through to client-side methods
  }

  // 2. Check for optional YouTube Data API key in environment
  const apiKey = (import.meta as unknown as { env?: { VITE_YOUTUBE_API_KEY?: string } }).env?.VITE_YOUTUBE_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${youtubeId}&key=${apiKey}`);
      if (res.ok) {
        const data = await res.json();
        const count = data?.items?.[0]?.statistics?.viewCount;
        if (count) {
          const formatted = `${Number(count).toLocaleString()} views`;
          memoryCache[youtubeId] = { views: formatted, timestamp: now };
          saveCacheToStorage();
          return formatted;
        }
      }
    } catch {
      // Fall through to public proxy
    }
  }

  // 3. Fallback client-side CORS proxy (for static deployments like GitHub Pages)
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${youtubeId}`)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const text = await res.text();
      const extracted = extractViewsFromHtml(text);
      if (extracted) {
        memoryCache[youtubeId] = { views: extracted, timestamp: now };
        saveCacheToStorage();
        return extracted;
      }
    }
  } catch {
    // Network fallback failed
  }

  // Return cached entry if available even if older
  if (memoryCache[youtubeId]) {
    return memoryCache[youtubeId].views;
  }

  return null;
}

/**
 * Batch fetch multiple YouTube video views
 */
export async function fetchBatchYouTubeViews(youtubeIds: string[]): Promise<Record<string, string>> {
  const validIds = Array.from(new Set(youtubeIds.filter(id => id && id.length > 5)));
  if (validIds.length === 0) return {};

  const now = Date.now();
  const neededIds: string[] = [];
  const results: Record<string, string> = {};

  for (const id of validIds) {
    if (memoryCache[id] && (now - memoryCache[id].timestamp < CACHE_TTL_MS)) {
      results[id] = memoryCache[id].views;
    } else {
      neededIds.push(id);
    }
  }

  if (neededIds.length === 0) {
    return results;
  }

  // Try batch endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`/api/youtube-views?ids=${encodeURIComponent(neededIds.join(','))}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.views) {
        for (const [id, val] of Object.entries(data.views)) {
          if (typeof val === 'string') {
            memoryCache[id] = { views: val, timestamp: now };
            results[id] = val;
          }
        }
        saveCacheToStorage();
      }
    }
  } catch {
    // Ignore and return whatever we have cached
  }

  return results;
}

export function getCachedView(youtubeId: string): string | null {
  return memoryCache[youtubeId]?.views || null;
}
