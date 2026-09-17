import React, { useState } from 'react';
import { Devotional } from '../types';
import { DEVOTIONALS } from '../data/mockData';
import { BookOpen, Calendar, Clock, Share2, X, ChevronRight, MessageSquare, Send } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeDevotional, setActiveDevotional] = useState<Devotional | null>(null);

  const categories = ['ALL', 'Prayer', 'Deliverance', 'Faith Teaching', 'Prophecy', 'Marriage', 'Youth'];

  const featuredPost = DEVOTIONALS.find((d) => d.featured) || DEVOTIONALS[0];

  const filteredPosts = DEVOTIONALS.filter((d) => {
    return selectedCategory === 'ALL' || d.category === selectedCategory;
  });

  const handleShareWhatsApp = (dev: Devotional) => {
    const text = `*${dev.title}* by ${dev.author}\n\n"${dev.scriptureVerse}" (${dev.scriptureReference})\n\nRead full devotional on Gospel Amplifiers TV!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#161616] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* HEADER */}
      <section className="bg-[#111] py-16 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel">
            DAILY BREAD & SPIRITUAL TEACHING
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
            Devotionals & Faith Articles
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Deepen your walk with God through anointed biblically grounded teachings from Evangelist Silas and ministry ministers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* FEATURED TOP BANNER CARD */}
        {featuredPost && (
          <div
            onClick={() => setActiveDevotional(featuredPost)}
            className="bg-[#1D1D1D] border-2 border-[#D4AF37]/50 rounded-2xl overflow-hidden mb-12 hover:border-[#D4AF37] transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-2 shadow-2xl group"
          >
            <div className="aspect-video lg:aspect-auto relative overflow-hidden">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded shadow">
                FEATURED DEVOTIONAL
              </span>
            </div>

            <div className="p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#D4AF37] font-semibold mb-2">
                  <span>{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight mb-3">
                  {featuredPost.title}
                </h2>

                <div className="bg-[#121212] p-4 rounded-xl border border-[#333] font-cormorant italic text-sm text-amber-100/90 mb-4">
                  "{featuredPost.scriptureVerse}" — <strong className="text-[#D4AF37]">{featuredPost.scriptureReference}</strong>
                </div>

                <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed">
                  {featuredPost.content[0]}
                </p>
              </div>

              <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                <span>Read Full Devotional</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY FILTER TABS */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#2A2A2A]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-black shadow-lg'
                  : 'bg-[#222] text-gray-300 hover:bg-[#333]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveDevotional(post)}
              className="bg-[#1D1D1D] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#4B0082] text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-[11px] text-gray-400 mb-2 flex items-center justify-between">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed">
                    "{post.scriptureVerse}"
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                <span>Read Teaching</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* READING VIEW MODAL */}
      {activeDevotional && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="bg-[#181818] border-2 border-[#D4AF37] rounded-2xl max-w-3xl w-full p-6 sm:p-10 text-[#FAF8F3] relative shadow-2xl my-8">
            <button
              onClick={() => setActiveDevotional(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              <span className="bg-[#4B0082] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {activeDevotional.category}
              </span>

              <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {activeDevotional.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#D4AF37] pb-4 border-b border-[#333]">
                <div>
                  <strong>{activeDevotional.author}</strong> ({activeDevotional.authorRole})
                </div>
                <div>{activeDevotional.date} • {activeDevotional.readTime}</div>
              </div>

              {/* Scripture Callout Box */}
              <div className="bg-[#121212] p-5 rounded-xl border-l-4 border-[#D4AF37] font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
                "{activeDevotional.scriptureVerse}" — <strong className="text-white">{activeDevotional.scriptureReference}</strong>
              </div>

              {/* Devotional Body Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-gray-200 leading-relaxed">
                {activeDevotional.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-[#333] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleShareWhatsApp(activeDevotional)}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share via WhatsApp</span>
                </button>

                <button
                  onClick={() => setActiveDevotional(null)}
                  className="bg-[#D4AF37] text-black font-bold text-xs px-5 py-2.5 rounded-lg cursor-pointer hover:bg-[#E5C158]"
                >
                  Close Article
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
