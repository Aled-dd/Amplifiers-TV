import React, { useState } from 'react';
import { Testimony } from '../types';
import { TESTIMONIES } from '../data/mockData';
import { MessageSquare, Heart, ThumbsUp, CheckCircle, Send, Upload, Sparkles, ShieldCheck } from 'lucide-react';

export const TestimonyPage: React.FC = () => {
  const [testimoniesList, setTestimoniesList] = useState<Testimony[]>(TESTIMONIES);
  
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'Deliverance' | 'Healing' | 'Financial Breakthrough' | 'Family Restoration' | 'Salvation'>('Deliverance');
  const [encounter, setEncounter] = useState('YouTube Channel');
  const [testimonyText, setTestimonyText] = useState('');
  const [allowPublic, setAllowPublic] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonyText.trim()) return;

    const newTest: Testimony = {
      id: `test-${Date.now()}`,
      name: fullName.trim() || 'Brother/Sister in Christ',
      location: location.trim() || 'Nigeria',
      category,
      date: 'Just now',
      testimonyText,
      isVerified: true,
      likes: 1
    };

    setTestimoniesList([newTest, ...testimoniesList]);
    setSubmitted(true);
  };

  const handleLike = (id: string) => {
    setTestimoniesList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
    );
  };

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* HEADER */}
      <section className="bg-gradient-to-b from-[#4B0082] to-[#0D0D0D] py-20 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel">
            OVERCOMING BY THE WORD OF OUR TESTIMONY
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
            Your Story Could Change Someone's Life
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
            "And they overcame him by the blood of the Lamb, and by the word of their testimony." — Revelation 12:11
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* SUBMIT FORM SECTION */}
        <div className="bg-[#141414] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl gold-glow">
          <div className="flex items-center gap-3 mb-6 border-b border-[#2A2A2A] pb-4">
            <div className="p-3 bg-[#4B0082] rounded-xl text-[#D4AF37]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-white">
                Submit Your Praise Report
              </h2>
              <p className="text-xs text-[#D4AF37]">
                Has God delivered, healed, or blessed you through Gospel Amplifiers TV?
              </p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brother Kenneth"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Country / Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enugu, Nigeria or London, UK"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Testimony Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Deliverance">Deliverance & Freedom</option>
                    <option value="Healing">Healing & Health Restoration</option>
                    <option value="Financial Breakthrough">Financial Breakthrough</option>
                    <option value="Family Restoration">Family & Marriage Restoration</option>
                    <option value="Salvation">Salvation & Spiritual Growth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    How Did You Encounter Us?
                  </label>
                  <select
                    value={encounter}
                    onChange={(e) => setEncounter(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="YouTube Channel">YouTube Channel Stream</option>
                    <option value="WhatsApp Share">WhatsApp Group Video Share</option>
                    <option value="Friend/Family">Friend / Family Recommendation</option>
                    <option value="Church Screening">Church Service Movie Screening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                  Your Miracle / Testimony Details
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe how the power of God manifested in your situation..."
                  value={testimonyText}
                  onChange={(e) => setTestimonyText(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none placeholder-gray-500"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-300">
                <input
                  type="checkbox"
                  id="public-check"
                  checked={allowPublic}
                  onChange={(e) => setAllowPublic(e.target.checked)}
                  className="rounded bg-[#0D0D0D] text-[#D4AF37]"
                />
                <label htmlFor="public-check" className="cursor-pointer">
                  I grant permission to Gospel Amplifiers TV to share this testimony publicly to encourage believers.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-extrabold py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:from-[#E5C158]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Testimony Praise Report</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto animate-bounce" />
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Glory to God! Testimony Submitted.
              </h3>
              <p className="text-xs text-gray-300">
                Your praise report has been added to our verified testimony feed below!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#D4AF37] text-black font-bold text-xs px-6 py-2 rounded-lg"
              >
                Submit Another Testimony
              </button>
            </div>
          )}
        </div>

        {/* VERIFIED TESTIMONIES FEED */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block mb-1">
              COMMUNITY PRAISE FEED
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Recent Verified Testimonies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimoniesList.map((t) => (
              <div key={t.id} className="bg-[#141414] border border-[#222] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#4B0082] text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold px-2.5 py-0.5 rounded">
                      {t.category}
                    </span>
                    <span className="text-[10px] text-gray-500">{t.date}</span>
                  </div>

                  <p className="font-cormorant italic text-base sm:text-lg text-[#FAF8F3] leading-snug">
                    "{t.testimonyText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#222] flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block">{t.name}</strong>
                    <span className="text-[10px] text-[#D4AF37]">{t.location}</span>
                  </div>

                  <button
                    onClick={() => handleLike(t.id)}
                    className="bg-[#222] hover:bg-[#333] text-[#D4AF37] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Praise God ({t.likes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
