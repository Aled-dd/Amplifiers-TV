export type PageType = 
  | 'home' 
  | 'movies' 
  | 'watch' 
  | 'about' 
  | 'ministry' 
  | 'contact' 
  | 'donate' 
  | 'community';

export type ContentCategory = 'MOVIES' | 'SERIES' | 'SHORT FILMS' | 'DELIVERANCE';

export type GenreType = 'Faith' | 'Deliverance' | 'Marriage' | 'Youth' | 'Prayer' | 'Spiritual Warfare' | 'Evangelism';

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber?: number;
  title: string;
  duration: string;
  synopsis: string;
  youtubeId: string;
  thumbnailUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: ContentCategory;
  genre: GenreType[];
  releaseYear: number;
  durationOrSeasons: string;
  rating: string; // e.g. "PG", "16+ Deliverance", "General"
  description: string;
  synopsis: string;
  posterUrl: string;
  bannerUrl: string;
  youtubeId: string;
  playlistId?: string;
  playlistUrl?: string;
  isFeatured?: boolean;
  isNewRelease?: boolean;
  isTrending?: boolean;
  viewCount: string;
  director: string;
  cast: string[];
  episodes?: Episode[];
  scriptureReference?: string;
}

export interface Devotional {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  category: 'Devotionals' | 'Prayer' | 'Deliverance' | 'Prophecy' | 'Testimonies' | 'Faith Teaching' | 'Marriage' | 'Youth';
  readTime: string;
  scriptureVerse: string;
  scriptureReference: string;
  content: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface Testimony {
  id: string;
  name: string;
  location: string;
  category: 'Deliverance' | 'Healing' | 'Financial Breakthrough' | 'Family Restoration' | 'Salvation';
  date: string;
  testimonyText: string;
  movieInspired?: string;
  isVerified?: boolean;
  likes: number;
  avatarUrl?: string;
}

export interface PrayerRequest {
  id: string;
  name?: string;
  country: string;
  category: string;
  message: string;
  timestamp: string;
  isPrivate: boolean;
  status: 'Pending' | 'In Prayer' | 'Answered';
}

export interface Comment {
  id: string;
  userName: string;
  userLocation: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
  amenCount: number;
  hallelujahCount: number;
}

export interface ScriptureVerse {
  id: string;
  verseText: string;
  reference: string;
  theme: string;
}

export interface CommunityArt {
  id: string;
  title: string;
  creatorName: string;
  location: string;
  imageUrl: string;
  description: string;
  likes: number;
}
