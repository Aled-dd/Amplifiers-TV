import { PageType } from '../types';

export const VALID_PAGES: readonly PageType[] = [
  'home',
  'movies',
  'watch',
  'about',
  'ministry',
  'contact',
  'donate',
  'community'
] as const;

export interface RouteState {
  page: PageType;
  mediaId?: string;
}

/**
 * Parses a browser hash string (e.g. '#home', '#/movies', '#watch?id=123', '#/watch/dark-school-girl-3')
 * into a structured RouteState.
 */
export function parseHash(rawHash: string): RouteState {
  if (!rawHash) {
    return { page: 'home' };
  }

  // Remove leading '#' and any leading '!' or '/'
  let clean = rawHash.replace(/^[#!]+/, '').replace(/^\/+/, '');
  if (!clean) {
    return { page: 'home' };
  }

  // Separate path part and query parameters
  const [pathPart, queryPart] = clean.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  const rawPage = segments[0]?.toLowerCase() as PageType | undefined;

  let page: PageType = 'home';
  if (rawPage && (VALID_PAGES as readonly string[]).includes(rawPage)) {
    page = rawPage;
  } else {
    return { page: 'home' };
  }

  let mediaId: string | undefined;

  // Check if mediaId is passed in path (e.g. #watch/dark-school-girl-3)
  if (page === 'watch' && segments.length > 1) {
    mediaId = decodeURIComponent(segments[1]);
  }

  // Check if mediaId or id is passed in query string (e.g. #watch?id=123 or #watch?mediaId=123)
  if (queryPart) {
    try {
      const params = new URLSearchParams(queryPart);
      const queryId = params.get('id') || params.get('mediaId');
      if (queryId) {
        mediaId = decodeURIComponent(queryId);
      }
    } catch {
      // Ignore URLSearchParams error on malformed strings
    }
  }

  return { page, mediaId };
}

/**
 * Constructs the canonical hash string for a given page and optional mediaId.
 */
export function buildHash(page: PageType, mediaId?: string): string {
  if (page === 'watch' && mediaId) {
    return `#watch?id=${encodeURIComponent(mediaId)}`;
  }
  return `#${page}`;
}

/**
 * Reads the current route from window.location.hash.
 */
export function getCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }
  return parseHash(window.location.hash);
}
