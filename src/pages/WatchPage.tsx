import React, { useState } from 'react';
import { PageType, MediaItem } from '../types';
import { FEATURED_SERIES_AND_MOVIES, LATEST_VIDEOS, SAMPLE_COMMENTS } from '../data/mockData';
import { 
  Play, 
  Flame, 
  Heart, 
  ThumbsUp, 
  MessageSquare, 
  ChevronRight, 
  Send, 
  Users
} from 'lucide-react';

interface WatchPageProps {
  mediaId?: string;
  onNavigate: (page: PageType, mediaId?: string) => void;
  onOpenPrayerModal: () => void;
}

export const WatchPage: React.FC<WatchPageProps> = ({ mediaId, onNavigate, onOpenPrayerModal }) => {
  // Find requested media item or fallback to Prophet Silas
  const allMedia = [...LATEST_VIDEOS, ...FEATURED_SERIES_AND_MOVIES];
  const activeMedia = allMedia.find((m) => m.id === mediaId) || FEATURED_SERIES_AND_MOVIES[0];
  
  const [activeEpisodeId, setActiveEpisodeId] = useState<string>(
    activeMedia.episodes?.[0]?.id || 'main'
  );
  
  // Interactive comments state
  const [commentsList, setCommentsList] = useState(SAMPLE_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentName, setNewCommentName] = useState('');

  const currentEpisode = activeMedia.episodes?.find((ep) => ep.id === activeEpisodeId);
  const activeYoutubeId = currentEpisode?.youtubeId || activeMedia.youtubeId;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const commentObj = {
      id: `comment-${Date.now()}`,
      userName: newCommentName.trim() || 'Brother/Sister in Faith',
      userLocation: 'Nigeria',
      text: newCommentText,
      timestamp: 'Just now',
      amenCount: 1,
      hallelujahCount: 1
    };

    setCommentsList([commentObj, ...commentsList]);
    setNewCommentText('');
    setNewCommentName('');
  };

  const handleAmenReaction = (commentId: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, amenCount: c.amenCount + 1 } : c))
    );
  };

  const handleHallelujahReaction = (commentId: string) => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, hallelujahCount: c.hallelujahCount + 1 } : c))
    );
  };

  const embedSrc = `https://www.youtube-nocookie.com/embed/${activeYoutubeId}?autoplay=1&modestbranding=1&rel=0`;

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* MAIN WATCH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: VIDEO PLAYER + DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Custom Dark Video Player (16:9 Ratio) */}
            <div className="relative aspect-video bg-[#000] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl gold-glow">
              <iframe
                src={embedSrc}
                title={activeMedia.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Title & Official Video Description */}
            <div className="space-y-4 bg-[#141414] p-6 rounded-2xl border border-[#222]">
              <h1 className="font-sans text-2xl sm:text-3xl font-black text-white leading-tight tracking-wide uppercase">
                {activeMedia.title}
              </h1>

              {/* Official YouTube Video Description */}
              <div className="p-4 bg-[#0D0D0D] rounded-xl border border-[#222] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Video Description • Amplifierstv</span>
                  <span className="text-[11px] text-gray-400">YouTube Official</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {activeMedia.description || activeMedia.synopsis}
                </p>
                <div className="pt-2 text-xs text-gray-400 border-t border-[#1C1C1C] flex flex-wrap gap-x-4 gap-y-1">
                  <span>Channel: <strong className="text-white">Amplifierstv</strong></span>
                  <span>Director: <strong className="text-white">{activeMedia.director || 'Prophet Silas / Amplifierstv'}</strong></span>
                  <span>Duration: <strong className="text-white">{activeMedia.durationOrSeasons}</strong></span>
                  <span>Views: <strong className="text-white">{activeMedia.viewCount}</strong></span>
                  {activeMedia.category && <span>Category: <strong className="text-white">{activeMedia.category}</strong></span>}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: EPISODES LIST & UP NEXT */}
          <div className="space-y-6">
            
            {/* If Series, Episode Selector List */}
            {activeMedia.episodes && activeMedia.episodes.length > 0 ? (
              <div className="bg-[#141414] p-5 rounded-2xl border border-[#2A2A2A]">
                <h3 className="font-cinzel text-base font-bold text-[#D4AF37] mb-3 uppercase tracking-wider flex items-center justify-between">
                  <span>{activeMedia.title}</span>
                  <span className="text-xs font-normal text-gray-400">{activeMedia.episodes.length} Episodes</span>
                </h3>

                <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {activeMedia.episodes.map((ep) => {
                    const isCurrent = ep.id === activeEpisodeId;
                    return (
                      <div
                        key={ep.id}
                        onClick={() => setActiveEpisodeId(ep.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                          isCurrent
                            ? 'bg-[#4B0082]/60 border-[#D4AF37] shadow-md'
                            : 'bg-[#1A1A1A] border-[#222] hover:border-gray-500'
                        }`}
                      >
                        <div className="relative w-20 aspect-video rounded overflow-hidden shrink-0">
                          <img
                            src={ep.thumbnailUrl}
                            alt={ep.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Play className="w-5 h-5 text-[#D4AF37] fill-current" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 overflow-hidden">
                          <div className="text-[10px] font-bold text-[#D4AF37]">
                            EPISODE {ep.episodeNumber} • {ep.duration}
                          </div>
                          <h4 className="text-xs font-semibold text-white truncate">
                            {ep.title}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-[#141414] p-5 rounded-2xl border border-[#2A2A2A]">
                <h3 className="font-cinzel text-base font-bold text-[#D4AF37] mb-3 uppercase tracking-wider flex items-center justify-between">
                  <span>More Latest Movies</span>
                  <span className="text-xs font-normal text-gray-400">Amplifiers TV</span>
                </h3>

                <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {LATEST_VIDEOS.filter((m) => m.id !== activeMedia.id).map((video) => (
                    <div
                      key={video.id}
                      onClick={() => onNavigate('watch', video.id)}
                      className="p-3 rounded-xl border border-[#222] hover:border-[#D4AF37] bg-[#1A1A1A] transition-all cursor-pointer flex gap-3 items-center group"
                    >
                      <div className="relative w-24 aspect-video rounded overflow-hidden shrink-0 bg-black">
                        <img
                          src={video.posterUrl}
                          alt={video.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Play className="w-5 h-5 text-[#D4AF37] fill-current" />
                        </div>
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <div className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1.5">
                          <span>{video.durationOrSeasons}</span>
                          <span>•</span>
                          <span>{video.viewCount}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#D4AF37] transition-colors">
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
