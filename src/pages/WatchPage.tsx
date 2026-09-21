import React, { useState, useEffect } from 'react';
import { PageType, MediaItem } from '../types';
import { FEATURED_SERIES_AND_MOVIES, LATEST_VIDEOS, SAMPLE_COMMENTS } from '../data/mockData';
import { useYouTubeViews } from '../context/YouTubeViewsContext';
import { 
  Play, 
  Flame, 
  Heart, 
  ThumbsUp, 
  MessageSquare, 
  ChevronRight, 
  Send, 
  Users,
  RefreshCw,
  Eye,
  Film
} from 'lucide-react';

interface WatchPageProps {
  mediaId?: string;
  onNavigate: (page: PageType, mediaId?: string) => void;
  onOpenPrayerModal: () => void;
}

export const WatchPage: React.FC<WatchPageProps> = ({ mediaId, onNavigate, onOpenPrayerModal }) => {
  const { getExactLiveView, getCompactLiveView, refreshView, isSyncing } = useYouTubeViews();

  // Find requested media item (supports ID, YouTube ID, or Episode ID) or fallback to featured
  const allMedia = [...LATEST_VIDEOS, ...FEATURED_SERIES_AND_MOVIES];
  const activeMedia = allMedia.find((m) => 
    m.id === mediaId || 
    m.youtubeId === mediaId || 
    m.episodes?.some((ep) => ep.id === mediaId || ep.youtubeId === mediaId)
  ) || FEATURED_SERIES_AND_MOVIES[0];
  
  const initialEp = activeMedia.episodes?.find((ep) => ep.id === mediaId || ep.youtubeId === mediaId);
  const [activeEpisodeId, setActiveEpisodeId] = useState<string>(
    initialEp?.id || activeMedia.episodes?.[0]?.id || 'main'
  );

  useEffect(() => {
    const matchingEp = activeMedia.episodes?.find((ep) => ep.id === mediaId || ep.youtubeId === mediaId);
    setActiveEpisodeId(matchingEp?.id || activeMedia.episodes?.[0]?.id || 'main');
  }, [activeMedia.id, mediaId]);
  
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
                <div className="pt-2 text-xs text-gray-400 border-t border-[#1C1C1C] flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span>Channel: <strong className="text-white">Amplifierstv</strong></span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs">
                    <span className="text-gray-300 font-medium">Director:</span>
                    <strong className="text-[#D4AF37] font-semibold tracking-wide">
                      {activeMedia.director || 'Victor Ikemdinachi Nwachukwu'}
                    </strong>
                  </span>
                  <span>Duration: <strong className="text-white">{activeMedia.durationOrSeasons}</strong></span>
                  <div className="flex items-center gap-2">
                    <span>Views:</span>
                    <strong className="text-white flex items-center gap-1.5 font-bold">
                      <span className="relative flex h-2 w-2" title="Live synchronized from YouTube">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      {getExactLiveView(activeYoutubeId, activeMedia.viewCount)}
                    </strong>
                    <button 
                      onClick={() => refreshView(activeYoutubeId)} 
                      title="Click to synchronize live views from YouTube"
                      disabled={isSyncing}
                      className="text-gray-400 hover:text-[#D4AF37] p-0.5 rounded transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-[#D4AF37]' : ''}`} />
                    </button>
                  </div>
                  {activeMedia.category && <span>Category: <strong className="text-white">{activeMedia.category}</strong></span>}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: EPISODES LIST & UP NEXT */}
          <div className="space-y-6">
            
            {/* If Series, Episode Selector List */}
            {activeMedia.episodes && activeMedia.episodes.length > 0 ? (
              <div className="bg-[#141414] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/35 shadow-2xl shadow-black/70 relative overflow-hidden">
                {/* Top Gold Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-90" />

                <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#222]">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#D4AF37] uppercase tracking-wider truncate">
                      {activeMedia.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                    {activeMedia.episodes.length} Episodes
                  </span>
                </div>

                <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {activeMedia.episodes.map((ep) => {
                    const isCurrent = ep.id === activeEpisodeId;
                    return (
                      <div
                        key={ep.id}
                        onClick={() => setActiveEpisodeId(ep.id)}
                        className={`group p-3 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3.5 items-center relative overflow-hidden ${
                          isCurrent
                            ? 'bg-gradient-to-r from-[#4B0082]/60 to-[#1e0033]/70 border-[#D4AF37] shadow-lg shadow-[#4B0082]/30 ring-1 ring-[#D4AF37]/50'
                            : 'bg-[#1A1A1A] border-[#262626] hover:border-[#D4AF37]/60 hover:bg-[#202020]'
                        }`}
                      >
                        {isCurrent && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]" />
                        )}
                        <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                          <img
                            src={ep.thumbnailUrl}
                            alt={ep.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                            isCurrent ? 'bg-black/50' : 'bg-black/30 group-hover:bg-black/50'
                          }`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              isCurrent ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-black/70 text-white group-hover:text-[#D4AF37]'
                            }`}>
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                              isCurrent ? 'bg-[#D4AF37] text-black' : 'bg-[#2A2A2A] text-[#D4AF37]'
                            }`}>
                              EPISODE {ep.episodeNumber}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">{ep.duration}</span>
                          </div>
                          <h4 className={`text-xs font-semibold truncate transition-colors ${
                            isCurrent ? 'text-white font-bold' : 'text-gray-200 group-hover:text-white'
                          }`}>
                            {ep.title}
                          </h4>
                          {ep.synopsis && (
                            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                              {ep.synopsis}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-[#141414] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/35 shadow-2xl shadow-black/70 relative overflow-hidden">
                {/* Top Gold Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-90" />

                <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#222]">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#D4AF37] uppercase tracking-wider">
                      More Latest Movies
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                    Amplifiers TV
                  </span>
                </div>

                <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {LATEST_VIDEOS.filter((m) => m.id !== activeMedia.id).map((video) => (
                    <div
                      key={video.id}
                      onClick={() => onNavigate('watch', video.id)}
                      className="p-3 rounded-xl border border-[#262626] hover:border-[#D4AF37]/70 bg-[#1A1A1A] hover:bg-[#202020] transition-all cursor-pointer flex gap-3.5 items-center group"
                    >
                      <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                        <img
                          src={video.posterUrl}
                          alt={video.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <div className="w-7 h-7 rounded-full bg-black/70 group-hover:text-[#D4AF37] text-white flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1.5 mb-1">
                          <span>{video.durationOrSeasons}</span>
                          <span>•</span>
                          <span>{getCompactLiveView(video.youtubeId, video.viewCount)}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-gray-200 group-hover:text-[#D4AF37] transition-colors truncate">
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
