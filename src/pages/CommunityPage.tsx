import React, { useState } from 'react';
import { COMMUNITY_GALLERY } from '../data/mockData';
import { Users, ThumbsUp, Sparkles, Image, Heart } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [artList, setArtList] = useState(COMMUNITY_GALLERY);

  const handleLikeArt = (id: string) => {
    setArtList((prev) =>
      prev.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
    );
  };

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* HEADER */}
      <section className="bg-gradient-to-b from-[#4B0082] to-[#0D0D0D] py-20 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel">
            GOSPEL CREATIVES & FAN GALLERY
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
            Community Fan Art & Creative Showcase
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            Artwork, movie poster concepts, and digital paintings created by our viewers inspired by Gospel Amplifiers TV series.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artList.map((item) => (
            <div key={item.id} className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all group flex flex-col justify-between shadow-xl">
              <div>
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6">
                  <h3 className="font-cinzel text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#D4AF37] font-semibold mb-3">
                    Created by {item.creatorName} ({item.location})
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#222] mt-2">
                <span className="text-[10px] text-gray-400">Community Submission</span>
                <button
                  onClick={() => handleLikeArt(item.id)}
                  className="bg-[#222] hover:bg-[#333] text-[#D4AF37] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{item.likes} Likes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
