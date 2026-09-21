import React, { useState, useEffect } from 'react';
import { PageType, ContentCategory, GenreType, MediaItem } from '../types';
import { FEATURED_SERIES_AND_MOVIES, LATEST_VIDEOS } from '../data/mockData';
import { useYouTubeViews } from '../context/YouTubeViewsContext';
import { Play, Search, Filter, SlidersHorizontal, Star, Flame, Sparkles, Clock, Eye, Film, Youtube } from 'lucide-react';

interface MoviesPageProps {
  onNavigate: (page: PageType, mediaId?: string) => void;
}

export const MoviesPage: React.FC<MoviesPageProps> = ({ onNavigate }) => {
  const { getExactLiveView } = useYouTubeViews();
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'ALL'>('ALL');
  const [selectedGenre, setSelectedGenre] = useState<GenreType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const categories: (ContentCategory | 'ALL')[] = [
    'ALL',
    'MOVIES',
    'SERIES',
    'SHORT FILMS',
    'DELIVERANCE'
  ];

  const genres: (GenreType | 'ALL')[] = [
    'ALL',
    'Spiritual Warfare',
    'Deliverance',
    'Faith',
    'Marriage',
    'Youth',
    'Prayer',
    'Evangelism'
  ];

  // Featured banner items (rotate every 5 seconds)
  const featuredBannerItems = FEATURED_SERIES_AND_MOVIES.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredBannerItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredBannerItems.length]);

  const currentFeatured = featuredBannerItems[featuredIndex];

  // Filter logic
  const filteredContent = FEATURED_SERIES_AND_MOVIES.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesGenre = selectedGenre === 'ALL' || item.genre.includes(selectedGenre as GenreType);
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesGenre && matchesSearch;
  });

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* 21:9 FEATURED CONTENT CAROUSEL BANNER */}
      <section className="relative w-full aspect-[21/9] min-h-[360px] sm:min-h-[480px] max-h-[600px] overflow-hidden border-b border-[#2A2A2A]">
        <img
          src={currentFeatured.bannerUrl}
          alt={currentFeatured.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded shadow">
                <Flame className="w-3.5 h-3.5" />
                <span>FEATURED SPOTLIGHT • {currentFeatured.rating}</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-xl">
                {currentFeatured.title}
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {currentFeatured.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#D4AF37] pt-1">
                <span>{currentFeatured.durationOrSeasons}</span>
                <span>•</span>
                <span>{currentFeatured.releaseYear}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {getExactLiveView(currentFeatured.youtubeId, currentFeatured.viewCount)}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('watch', currentFeatured.id)}
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0D0D0D] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Now</span>
                </button>

                <div className="flex items-center gap-1">
                  {featuredBannerItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === featuredIndex ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* LATEST MOVIES SECTION */}
        <section id="latest-movies-section" className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#222] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#4B0082]/60 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-bold px-3 py-0.5 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FRESH RELEASES</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                Latest Movies & Releases
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Recently uploaded Christian movies, anointed films, and spiritual warfare teachings.
              </p>
            </div>
            
            <a
              id="youtube-channel-link"
              href="https://youtube.com/@AmplifiersTv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#FF0000] font-bold hover:underline self-start sm:self-auto bg-[#FF0000]/10 border border-[#FF0000]/30 px-3.5 py-2 rounded-xl transition-colors hover:bg-[#FF0000]/20"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Watch on YouTube</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LATEST_VIDEOS.map((video) => (
              <div
                key={video.id}
                id={`latest-movie-card-${video.id}`}
                onClick={() => onNavigate('watch', video.id)}
                className="group bg-[#111111] border border-[#222] hover:border-[#D4AF37] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:gold-glow cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-black">
                    <img
                      src={video.posterUrl}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    
                    <span className="absolute top-2.5 left-2.5 bg-[#8B0000] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      LATEST
                    </span>

                    <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {video.durationOrSeasons}
                    </span>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs text-gray-400 border-t border-[#1C1C1C] mt-2">
                  <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
                    <Eye className="w-3.5 h-3.5" /> {getExactLiveView(video.youtubeId, video.viewCount)}
                  </span>
                  <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors font-medium flex items-center gap-1">
                    Watch Now <Play className="w-3 h-3 fill-current text-[#D4AF37]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-[#222] my-12" />

        {/* PAGE HEADER & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="font-cinzel text-3xl font-extrabold text-white tracking-wide">
              Our Movies & Series Library
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Browse anointed Christian films, spiritual warfare series, and faith documentaries.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search library by title, cast..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-[#333] focus:border-[#D4AF37] text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none mb-6 border-b border-[#222]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#0D0D0D] shadow-lg'
                  : 'bg-[#141414] text-gray-300 hover:bg-[#222] border border-[#2A2A2A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GENRE SIDEBAR / SUB-FILTER CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <span className="text-xs text-gray-400 flex items-center gap-1 font-semibold pr-2 border-r border-[#333]">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Genre:</span>
          </span>

          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                selectedGenre === g
                  ? 'bg-[#4B0082] text-[#D4AF37] border border-[#D4AF37] font-semibold'
                  : 'bg-[#181818] text-gray-400 hover:text-white border border-[#2A2A2A]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* CONTENT GRID */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('watch', item.id)}
                className="group bg-[#141414] border border-[#222] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:gold-glow cursor-pointer"
              >
                <div>
                  {/* Poster Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />

                    <span className="absolute top-2.5 left-2.5 bg-[#4B0082]/90 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      {item.category}
                    </span>

                    <span className="absolute top-2.5 right-2.5 bg-black/70 text-gray-300 text-[10px] font-medium px-2 py-0.5 rounded">
                      {item.durationOrSeasons}
                    </span>

                    {/* Hover Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {item.genre.slice(0, 2).map((g) => (
                        <span key={g} className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                          {g}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-[11px] text-gray-400 border-t border-[#1C1C1C] mt-2">
                  <span>{item.releaseYear}</span>
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {getExactLiveView(item.youtubeId, item.viewCount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#141414] rounded-2xl border border-[#222] my-8">
            <Film className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-50" />
            <h3 className="font-cinzel text-xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
              We couldn't find any content matching your search query or filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedGenre('ALL');
                setSearchQuery('');
              }}
              className="bg-[#D4AF37] text-black font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-[#E5C158] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
