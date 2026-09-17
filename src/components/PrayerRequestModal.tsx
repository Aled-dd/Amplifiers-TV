import React, { useState } from 'react';
import { Flame, X, CheckCircle, Send, ShieldCheck } from 'lucide-react';

interface PrayerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerRequestModal: React.FC<PrayerRequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [category, setCategory] = useState('Deliverance & Warfare');
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#141414] border-2 border-[#D4AF37] rounded-2xl max-w-lg w-full p-6 text-[#FAF8F3] relative shadow-2xl gold-glow">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-[#4B0082] rounded-xl border border-[#D4AF37]">
                <Flame className="w-6 h-6 text-[#D4AF37] animate-pulse" />
              </div>
              <div>
                <h2 className="font-cinzel text-xl font-bold text-white">
                  24/7 Intercessory Prayer Request
                </h2>
                <p className="text-xs text-[#D4AF37] font-cormorant italic">
                  "For where two or three are gathered in my name, there am I in the midst" — Matt 18:20
                </p>
              </div>
            </div>

            {/* Live Intercession Banner */}
            <div className="my-4 bg-[#4B0082]/40 border border-[#D4AF37]/30 rounded-xl p-3 flex items-center gap-3 text-xs text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>
                <strong className="text-white">1,482 Prayer Requests</strong> interceded for this week by our Lagos & Intercontinental prayer warriors.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sister Grace or Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Country / Location
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Nigeria">🇳🇬 Nigeria</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="United States">🇺🇸 United States</option>
                    <option value="Ghana">🇬🇭 Ghana</option>
                    <option value="South Africa">🇿🇦 South Africa</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="Other">🌍 Other Nation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Prayer Need Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Deliverance & Warfare">Deliverance & Warfare</option>
                    <option value="Healing & Health">Healing & Health</option>
                    <option value="Financial Breakthrough">Financial Breakthrough</option>
                    <option value="Family & Marriage">Family & Marriage</option>
                    <option value="Fruit of the Womb">Fruit of the Womb</option>
                    <option value="Salvation & Restoration">Salvation & Restoration</option>
                    <option value="Career & Business">Career & Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                  Describe Your Prayer Request
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your burden with confidence. Our prayer team will lay hands and intercede..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none placeholder-gray-500"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <input
                  type="checkbox"
                  id="private-check"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded bg-[#0D0D0D] border-[#333] text-[#D4AF37] focus:ring-0"
                />
                <label htmlFor="private-check" className="cursor-pointer flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  Keep my prayer request strictly private for the ministry intercessory team only.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0D0D0D] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Prayer Request to Intercessors</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#4B0082] border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37] animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-[#D4AF37]">
              Prayer Request Received!
            </h3>

            <p className="text-sm text-gray-200 leading-relaxed max-w-md mx-auto">
              Grace and peace be unto you! Your prayer request has been routed to the Gospel Amplifiers 24/7 Prayer Altar.
            </p>

            <div className="bg-[#0D0D0D] p-4 rounded-xl border border-[#333] text-xs font-cormorant italic text-[#FAF8F3] max-w-md mx-auto">
              "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted." — Isaiah 53:4
            </div>

            <button
              onClick={handleReset}
              className="bg-[#D4AF37] text-[#0D0D0D] font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-[#E5C158] transition-colors cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
