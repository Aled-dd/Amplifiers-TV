import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Youtube, Facebook, Instagram, Flame, CheckCircle, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [activeFormTab, setActiveFormTab] = useState<'contact' | 'church' | 'prayer'>('contact');
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(true);
  };

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* HEADER */}
      <section className="bg-gradient-to-b from-[#4B0082] to-[#0D0D0D] py-20 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel">
            CONNECT WITH GOSPEL AMPLIFIERS TV
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
            Contact Us & Prayer Requests
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            We respond within 48 hours. Your prayer request goes straight to our 24/7 intercessory prayer altar.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT 1 COL: LOCATION & CONTACT INFO */}
          <div className="space-y-8">
            <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 space-y-6">
              <h3 className="font-cinzel text-lg font-bold text-[#D4AF37] uppercase">
                Ministry Headquarters
              </h3>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Abuja Studio:</strong>
                    <span>Gospel Amplifiers Media Complex, Abuja, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <strong className="text-white block">Official Email:</strong>
                    <span>amplifierstv29@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <strong className="text-white block">Helpline / WhatsApp:</strong>
                    <span>08188428888</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <strong className="text-white block">Response Time:</strong>
                    <span>Within 48 hours for general inquiries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent YouTube Box */}
            <div className="bg-gradient-to-r from-[#FF0000]/20 to-[#1A0033] border border-[#FF0000]/50 p-6 rounded-2xl text-center space-y-3">
              <Youtube className="w-10 h-10 text-[#FF0000] mx-auto" />
              <h4 className="font-cinzel text-lg font-bold text-white">Watch on YouTube</h4>
              <p className="text-xs text-gray-300">
                Subscribe to our YouTube channel for weekly live stream vigil broadcasts.
              </p>
              <a
                href="https://www.youtube.com/@amplifierstv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
              >
                Subscribe Now
              </a>
            </div>

          </div>

          {/* RIGHT 2 COLS: INTERACTIVE TABBED FORM */}
          <div className="lg:col-span-2 bg-[#141414] border border-[#222] rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Form Selector Tabs */}
            <div className="flex gap-2 border-b border-[#2A2A2A] pb-3 overflow-x-auto text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => { setActiveFormTab('contact'); setSubmittedMessage(false); }}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeFormTab === 'contact' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-400'
                }`}
              >
                General Inquiry
              </button>
              <button
                onClick={() => { setActiveFormTab('prayer'); setSubmittedMessage(false); }}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeFormTab === 'prayer' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-400'
                }`}
              >
                Prayer Request
              </button>
              <button
                onClick={() => { setActiveFormTab('church'); setSubmittedMessage(false); }}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeFormTab === 'church' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-400'
                }`}
              >
                Church Partnership
              </button>
            </div>

            {!submittedMessage ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brother David"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      activeFormTab === 'prayer'
                        ? 'e.g. Deliverance & Breakthrough'
                        : activeFormTab === 'church'
                        ? 'e.g. Church Movie Screening Request'
                        : 'e.g. General Inquiry / Feedback'
                    }
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">
                    Your Message / Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your message here..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none placeholder-gray-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#0D0D0D] font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Ministry</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto animate-bounce" />
                <h3 className="font-cinzel text-2xl font-bold text-[#D4AF37]">
                  Thank You for Contacting Us!
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Your message has been safely received. Our media and prayer team will review your message and get back to you within 48 hours.
                </p>
                <button
                  onClick={() => setSubmittedMessage(false)}
                  className="bg-[#D4AF37] text-black font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-[#E5C158]"
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
