import React from 'react';
import { PageType } from '../types';
import { BookOpen, Film, Globe, Heart, Play, Sparkles, Quote, Shield, Award } from 'lucide-react';
import directorImage from '../assets/images/regenerated_image_1786417890100.jpg';

interface AboutPageProps {
  onNavigate: (page: PageType, mediaId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#000000] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 sm:py-28 px-4 overflow-hidden border-b border-[#2A2A2A] bg-gradient-to-b from-[#12011D] via-[#0A0012] to-[#000000]">
        {/* Subtle Gold/Purple Gradient Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#4B0082]/30 via-[#D4AF37]/15 to-[#4B0082]/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-block text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full">
            ABOUT GOSPEL AMPLIFIERS TV
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Amplifying the Gospel Through Cinematic Excellence
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Using the power of story, screen, and drama to bring the transformative message of Jesus Christ to homes across the globe.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        
        {/* 2. VISION & MISSION SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Vision Card */}
          <div className="bg-[#0D0D0D] border-2 border-[#D4AF37]/40 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl gold-glow relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block">
                OUR VISION
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Global Kingdom Media Impact
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed pt-2">
                "To be a premier global Christian media platform that creates, produces, and broadcasts faith-based movies, series, and dramatic productions—inspiring hearts, renewing minds, and winning souls for the Kingdom of God."
              </p>
            </div>
            <div className="pt-6 border-t border-[#222] mt-8 flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Inspiring Hearts • Renewing Minds • Winning Souls</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-[#0D0D0D] border border-[#222] hover:border-[#D4AF37]/50 transition-colors rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block">
                OUR MISSION
              </span>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#4B0082]/60 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Edify & Elevate</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mt-0.5">
                      Produce high-caliber, biblically grounded drama productions that provide wholesome family entertainment.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#4B0082]/60 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Empower Creatives</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mt-0.5">
                      Provide a platform for Christian writers, actors, filmmakers, and storytellers to deploy their God-given talents.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#4B0082]/60 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Global Reach</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mt-0.5">
                      Leverage digital streaming technology to deliver life-changing gospel content to viewers in every corner of the world.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. FOUNDER & EXECUTIVE DIRECTOR SECTION */}
        <section className="bg-[#0A0A0A] border border-[#222] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Placeholder Container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl gold-glow bg-[#181818] group">
                <img
                  src={directorImage}
                  alt="Victor Ikemdinachi Nwachukwu - Founder & Executive Director"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-[16px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                    Victor Ikemdinachi Nwachukwu
                  </span>
                  <span className="text-[14px] text-gray-300 block">
                    Founder & Executive Director
                  </span>
                </div>
              </div>
            </div>

            {/* Content / Bio / Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block mb-1">
                  LEADERSHIP & VISION
                </span>
                <h2 className="font-cinzel text-[35px] font-bold text-white leading-tight">
                  Victor Ikemdinachi Nwachukwu
                </h2>
                <p className="text-sm font-semibold text-[#D4AF37] mt-1">
                  Founder & Executive Director, Gospel Amplifiers TV
                </p>
              </div>

              {/* Blockquote */}
              <blockquote className="relative bg-[#141414] border-l-4 border-[#D4AF37] p-5 rounded-r-2xl space-y-2">
                <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-3 right-3" />
                <p className="font-cormorant italic text-lg sm:text-xl text-amber-100 leading-relaxed relative z-10">
                  "Drama is a unique window into the human soul. When guided by the Holy Spirit, a single movie can convey a message of redemption faster than a thousand ordinary conversations."
                </p>
              </blockquote>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  Victor Ikemdinachi Nwachukwu is an anointed minister, visionary filmmaker, and drama evangelist committed to using the power of cinematic drama to win souls and liberate lives. Driven by a deep passion for evangelism through media, he has dedicated years to producing biblically grounded Christian movies and spiritual warfare series.
                </p>
                <p>
                  Under his leadership, Gospel Amplifiers TV has grown into a vibrant global media outlet, reclaiming screen entertainment for righteousness and empowering Christian actors, writers, and technical crews to deploy their gifts for God's glory.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. OUR CORE PILLARS SECTION */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block">
              WHAT GUIDES US
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Our Core Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0D0D0D] border border-[#222] hover:border-[#D4AF37]/60 rounded-3xl p-8 space-y-4 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#4B0082]/60 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Uncompromising Gospel
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every storyline is grounded in Scripture, pointing viewers toward salvation, healing, and spiritual maturity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0D0D0D] border border-[#222] hover:border-[#D4AF37]/60 rounded-3xl p-8 space-y-4 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#4B0082]/60 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Production Excellence
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We believe the Gospel deserves the absolute best quality in cinematography, sound design, lighting, and acting.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0D0D0D] border border-[#222] hover:border-[#D4AF37]/60 rounded-3xl p-8 space-y-4 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-[#4B0082]/60 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Global Community
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Beyond entertainment, we build a global family of believers who pray together, grow together, and support kingdom media.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION (CTA) BANNER */}
        <section className="bg-gradient-to-r from-[#4B0082]/80 via-[#220038] to-[#12001F] border border-[#D4AF37]/50 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white">
              Partner With Us in Spreading the Light
            </h2>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Whether by watching our productions, sharing them with your family, praying for our crew, or joining our partner circle—you are an essential part of this vision.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            {/* Primary Gold Button */}
            <button
              onClick={() => onNavigate('movies')}
              className="bg-[#D4AF37] hover:bg-[#E5C158] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current text-black" />
              <span>Watch Latest Releases</span>
            </button>

            {/* Secondary Outline Button */}
            <button
              onClick={() => onNavigate('donate')}
              className="border-2 border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#D4AF37] font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>Support the Ministry</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

