import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageType } from '../types';
import { FEATURED_SERIES_AND_MOVIES, LATEST_VIDEOS } from '../data/mockData';
import { useYouTubeViews } from '../context/YouTubeViewsContext';
import { Play, ChevronLeft, ChevronRight, Cross, Award, ExternalLink, Clock, Eye, Sparkles } from 'lucide-react';
import prophetSilasImg from '../assets/images/regenerated_image_1786250452138.png';
import blackBibleImg from '../assets/images/regenerated_image_1786287994708.png';
import kingdomMarriagesImg from '../assets/images/regenerated_image_1786287988839.png';
import darkSchoolGirlImg from '../assets/images/regenerated_image_1786335139501.jpg';
import aboutStudioImg from '../assets/images/regenerated_image_1786332654587.png';

interface HomePageProps {
  onNavigate: (page: PageType, mediaId?: string) => void;
  onOpenPrayerModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { getExactLiveView } = useYouTubeViews();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroItem = FEATURED_SERIES_AND_MOVIES[0]; // Prophet Silas Series
  const popularSeriesOrder = [
    'black-bible',
    'sojourner-workshop',
    'god-dances',
    'blood-of-covenant',
    'chosen-street-boys',
    'dark-powers'
  ];
  const popularSeries = popularSeriesOrder
    .map((id) => FEATURED_SERIES_AND_MOVIES.find((m) => m.id === id))
    .filter((m): m is typeof FEATURED_SERIES_AND_MOVIES[0] => m !== undefined);

  const slides = [
    {
      title: 'PROPHET SILAS SERIES',
      subtitle: '28 YouTube Videos',
      category: 'Prophetic and Evangelical Series',
      mediaId: heroItem?.id || 'prophet-silas-1',
      bgImage: 'https://img.youtube.com/vi/T0nL4TSnO4c/hqdefault.jpg',
      playlistUrl: 'https://www.youtube.com/watch?v=T0nL4TSnO4c&list=PLbH0SxLXn_vo8ElWLjVszMvofEdvfmRXe',
      description: 'Prophet Silas Evangelical Encounters'
    },
    {
      title: 'THE BLACK BIBLE',
      subtitle: '3 Videos',
      category: 'NIGERIAN CINEMATIC GOSPEL FILM',
      mediaId: 'black-bible',
      bgImage: blackBibleImg,
      playlistUrl: 'https://youtu.be/IrJ4yfKjfEA?si=_i8yzoqSxtuY9GXK',
      description: 'Inspiring movie that teach the power of Spiritual Warefare and altars.'
    },
    {
      title: 'THE DARK SCHOOL GIRL',
      subtitle: 'An eye opener for parents and students',
      category: 'POWER OF PRAYER & SPIRITUAL FERVENCY',
      mediaId: 'blood-of-covenant',
      bgImage: darkSchoolGirlImg,
      playlistUrl: 'https://youtu.be/W84AldrribQ?si=fLcFIwMxoQKlJyo2',
      description: 'A mysterious school girl possesses dark powers, using them to intimidate teachers and manipulate classmates into a coven..'
    },
    ];

  // Auto-switch slide every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[activeSlide];

  return (
    <div className="bg-[#000000] text-[#FAF8F3] min-h-screen">
      
      {/* EXCITING HERO CAROUSEL WITH 5-SECOND AUTO SLIDE & INDIVIDUAL BACKGROUNDS */}
      <section className="relative w-full min-h-[520px] sm:min-h-[620px] lg:min-h-[680px] bg-[#0A0908] flex items-center overflow-hidden border-b border-[#1C1C1C]">
        
        {/* Background Images for each slide with cross-fade transition */}
        {slides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/W84AldrribQ/hqdefault.jpg';
              }}
              className="w-full h-full object-cover object-right sm:object-center"
            />
            {/* Cinematic Gradients for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-black/40" />
          </div>
        ))}

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-16">
          <div className="max-w-xl space-y-6">
            
            {/* Amplifiers tv Box Logo */}
            <div className="bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-sm inline-block shadow-2xl">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Amplifiers
                </span>
                <span className="font-sans text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                  tv
                </span>
              </div>
            </div>

            {/* Slide Title & Description */}
            <div className="space-y-2 pt-1 transition-all duration-500 key={activeSlide}">
              <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight drop-shadow-md">
                {currentSlide.title}
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm max-w-lg leading-relaxed pt-1">
                {currentSlide.description}
              </p>
            </div>

            {/* Watch Playlist Button */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => onNavigate('watch', currentSlide.mediaId)}
                className="bg-white hover:bg-gray-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-md flex items-center gap-2.5 transition-all cursor-pointer shadow-xl hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current text-black" />
                <span>WATCH PLAYLIST</span>
              </button>

              {currentSlide.playlistUrl && (
                <a
                  href={currentSlide.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600/90 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-md flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105 border border-red-500/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>OPEN ON YOUTUBE</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer border border-white/20 z-20 transition-all"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer border border-white/20 z-20 transition-all"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators with 10-second animated progress bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((s, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={s.title}
                onClick={() => setActiveSlide(idx)}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all cursor-pointer ${
                  isActive ? 'w-12 bg-white/30' : 'w-8 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to ${s.title}`}
              >
                {isActive && (
                  <div
                    key={activeSlide}
                    className="h-full bg-[#D4AF37] animate-[sliderProgress_10s_linear]"
                  />
                )}
              </button>
            );
          })}
        </div>

      </section>

      {/* FANCY SCROLL TRANSITION DIVIDER 1: Hero to Popular Series */}
      <div className="relative z-10 -mt-6 flex justify-center items-center px-4 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37]"
        />
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'backOut' }}
          className="absolute bg-[#111111] border border-[#D4AF37]/60 p-2 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
          <Cross className="w-4 h-4 text-[#D4AF37]" />
        </motion.div>
      </div>

      {/* POPULAR ANOINTED DRAMA SERIES SECTION */}
      <section className="bg-[#000000] py-16 border-y border-[#222] relative overflow-hidden">
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2 font-cinzel">
              EPISODIC DRAMA MINISTRY
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
              Popular Anointed Drama Series
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '5rem' }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularSeries.map((series, idx) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 45, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                className="bg-[#181818] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={series.posterUrl || `https://img.youtube.com/vi/${series.youtubeId}/hqdefault.jpg`}
                      alt={series.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (series.youtubeId) {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${series.youtubeId}/hqdefault.jpg`;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#8B0000] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                      {series.rating}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold mb-2">
                      <span>{series.durationOrSeasons}</span>
                      <span>{getExactLiveView(series.youtubeId, series.viewCount)}</span>
                    </div>

                    <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {series.title}
                    </h3>

                    <p className="text-gray-300 text-xs leading-relaxed mb-4 line-clamp-3">
                      {series.synopsis}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => onNavigate('watch', series.id)}
                    className="w-full bg-[#820000] hover:bg-[#9E0000] text-white border border-[#A00000] font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group-hover:shadow-[0_0_15px_rgba(130,0,0,0.5)]"
                  >
                    <Play className="w-4 h-4 fill-current text-white" />
                    <span className="text-white">Watch Series Episodes</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST MOVIES SECTION */}
      <section id="latest-movies-section" className="bg-[#0A0A0A] py-16 border-b border-[#222] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-[#222] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#8B0000]/40 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-bold px-3 py-0.5 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FRESH RELEASES</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                Latest Movies & Releases
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Recently released anointed Christian movies, moral dramas, and spiritual warfare films.
              </p>
            </div>
            
            <button
              id="view-all-movies-home-btn"
              onClick={() => onNavigate('movies')}
              className="inline-flex items-center gap-2 text-xs text-[#D4AF37] font-bold hover:underline self-start sm:self-auto bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2.5 rounded-xl transition-colors hover:bg-[#D4AF37]/20 cursor-pointer"
            >
              <span>View All Movies in Library</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LATEST_VIDEOS.slice(0, 6).map((movie, idx) => (
              <motion.div
                key={movie.id}
                id={`home-latest-movie-${movie.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => onNavigate('watch', movie.id)}
                className="group bg-[#121212] border border-[#222] hover:border-[#D4AF37] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-black">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${movie.youtubeId}/hqdefault.jpg`;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    
                    <span className="absolute top-2.5 left-2.5 bg-[#8B0000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                      LATEST
                    </span>

                    <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {movie.durationOrSeasons}
                    </span>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                      <span>{movie.category}</span>
                      <span>{movie.durationOrSeasons}</span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                      {movie.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs text-gray-400 border-t border-[#1C1C1C] mt-2">
                  <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
                    <Eye className="w-3.5 h-3.5" /> {getExactLiveView(movie.youtubeId, movie.viewCount)}
                  </span>
                  <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors font-medium flex items-center gap-1">
                    Watch Movie <Play className="w-3 h-3 fill-current text-[#D4AF37]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCRIPTURE BANNER WITH SCROLL REVEAL */}
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-r from-[#1A052B] via-[#0B0214] to-[#1A052B] py-16 px-4 text-center relative overflow-hidden border-y border-[#D4AF37]/40 shadow-2xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
        >
          <Cross className="w-80 h-80 text-[#D4AF37]" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase font-cinzel">
            OUR DIVINE MANDATE
          </span>

          <blockquote className="font-cormorant italic text-2xl sm:text-4xl text-[#FAF8F3] font-medium leading-relaxed drop-shadow-md">
            "Go into all the world and preach the gospel to every creature."
          </blockquote>

          <div className="text-sm font-bold text-[#D4AF37] tracking-wider uppercase">
            — Mark 16:15
          </div>
        </div>
      </motion.section>

      {/* FANCY SCROLL TRANSITION DIVIDER 2: Scripture Banner to Vision & Ministry */}
      <div className="relative z-10 flex justify-center items-center py-6 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute w-3 h-3 bg-[#D4AF37] rotate-45 shadow-[0_0_12px_#D4AF37]"
        />
      </div>

      {/* BRIEF ABOUT SECTION: "THE VISION & MINISTRY" */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Cinematic Image with Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl group"
          >
            <img
              src={aboutStudioImg}
              alt="Gospel Amplifiers Studio"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 right-4 bg-[#141414]/90 backdrop-blur-md p-4 rounded-xl border border-[#D4AF37]/30">
              <span className="text-[20px] leading-[16px] font-bold text-[#D4AF37] block mb-1">Victor Ikemdinachi Nwachukwu</span>
              <span className="text-xs text-gray-300">Director & Founder (Gospel Amplifiers Studio)</span>
            </div>
          </motion.div>

          {/* Right Side Text with Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel">
              <Award className="w-4 h-4" />
              <span>THE VISION & MINISTRY</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white leading-tight">
              Amplifying the Light of Christ Through Cinematic Excellence
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">
              Gospel Amplifiers TV was founded with a burning mandate to use cinematic storytelling, anointed drama series, and spiritual warfare movies to preach the uncompromised Word of God across Nigeria and the global African diaspora.
            </p>

            {/* 3 Icon Stat Blocks with Animated Scale Stagger */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2A2A2A]">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#141414] p-4 rounded-xl border border-[#222] text-center hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] font-cinzel mb-1">
                  500+
                </div>
                <div className="text-[11px] text-gray-400 font-semibold">
                  🎬 Movies & Episodes
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#141414] p-4 rounded-xl border border-[#222] text-center hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] font-cinzel mb-1">
                  50+
                </div>
                <div className="text-[11px] text-gray-400 font-semibold">
                  🌍 Global Countries
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#141414] p-4 rounded-xl border border-[#222] text-center hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#D4AF37] font-cinzel mb-1">
                  100M+
                </div>
                <div className="text-[11px] text-gray-400 font-semibold">
                  ✝️ Souls Reached
                </div>
              </motion.div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('about')}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0D0D0D] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <span>Learn More About Our Ministry</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
};
