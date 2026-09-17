import React from 'react';
import { PageType } from '../types';
import { Flame, Cross, Shield, BookOpen, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface MinistryPageProps {
  onNavigate: (page: PageType) => void;
  onOpenPrayerModal: () => void;
}

export const MinistryPage: React.FC<MinistryPageProps> = ({ onNavigate, onOpenPrayerModal }) => {
  const beliefs = [
    { title: 'The Holy Scriptures', desc: 'We believe the Holy Bible is the inspired, infallible, and authoritative Word of God.' },
    { title: 'The Triune God', desc: 'We believe in one God, eternally existent in three Persons: Father, Son, and Holy Spirit.' },
    { title: 'Salvation by Grace', desc: 'We believe salvation is received solely through repentance and faith in the precious Blood of Jesus Christ.' },
    { title: 'Deliverance & Divine Healing', desc: 'We believe Jesus Christ paid the complete price for our spiritual deliverance and physical healing on the cross.' },
    { title: 'Power of the Holy Ghost', desc: 'We believe in the baptism of the Holy Spirit with spiritual gifts and fire for effective soul-winning.' },
    { title: 'The Second Coming', desc: 'We believe in the personal, imminent return of our Lord Jesus Christ to receive His bride.' }
  ];

  const scripturePillars = [
    { verse: 'Mark 16:15', text: 'Go ye into all the world, and preach the gospel to every creature.' },
    { verse: 'Colossians 2:14-15', text: 'Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross.' },
    { verse: 'Ephesians 6:12', text: 'For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world.' },
    { verse: 'Revelation 12:11', text: 'And they overcame him by the blood of the Lamb, and by the word of their testimony.' }
  ];

  return (
    <div className="bg-[#0D0D0D] text-[#FAF8F3] min-h-screen pb-24">
      
      {/* HERO BANNER */}
      <section className="bg-gradient-to-b from-[#4B0082] to-[#0D0D0D] py-20 px-4 text-center border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-3.5 py-1 rounded-full uppercase">
            <Flame className="w-4 h-4 fill-current" />
            <span>MINISTRY & MISSION</span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white">
            Our Statement of Faith & Kingdom Mission
          </h1>

          <p className="font-cormorant italic text-xl text-amber-100 max-w-2xl mx-auto">
            Gospel Amplifiers TV is dedicated to building an unyielding altar of righteousness, truth, and spiritual warfare through drama evangelism.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* DOCTRINAL BELIEFS GRID */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block mb-1">
              WHAT WE BELIEVE
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Pillars of Our Christian Doctrine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beliefs.map((b, idx) => (
              <div key={idx} className="bg-[#141414] border border-[#222] rounded-2xl p-6 space-y-3 hover:border-[#D4AF37] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#4B0082] text-[#D4AF37] flex items-center justify-center font-bold">
                  ✝️
                </div>
                <h3 className="font-cinzel text-lg font-bold text-white">{b.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SCRIPTURE PILLARS (LARGE QUOTE FORMAT) */}
        <div className="bg-[#111111] p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/40 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block mb-1">
              SCRIPTURAL FOUNDATION
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Scripture Pillars Defining Our Mandate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scripturePillars.map((sp, idx) => (
              <div key={idx} className="bg-[#181818] p-6 rounded-2xl border-l-4 border-[#D4AF37] space-y-2 shadow-xl">
                <blockquote className="font-cormorant italic text-lg sm:text-xl text-[#FAF8F3]">
                  "{sp.text}"
                </blockquote>
                <div className="text-xs font-bold text-[#D4AF37] uppercase text-right">
                  — {sp.verse}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHURCH PARTNERSHIPS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-cinzel block">
              CHURCH & MINISTRY PARTNERSHIPS
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-white">
              Partner With Us to Screen Anointed Movies in Your Church
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              We offer free movie screening licenses for local churches, campus fellowships, and rural evangelism crusades. Show Gospel Amplifiers TV movies during Friday vigil or Sunday youth services.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#0D0D0D] font-bold text-xs uppercase px-6 py-3.5 rounded-xl cursor-pointer transition-all inline-flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Request Church Partnership License</span>
              </button>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-2xl p-8 text-center space-y-4">
            <Shield className="w-12 h-12 text-[#D4AF37] mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-white">Need Personal Intercession?</h3>
            <p className="text-xs text-gray-400">
              Our ministry intercessory prayer team is standing by 24/7 to pray for your family, deliverance, and health.
            </p>
            <button
              onClick={onOpenPrayerModal}
              className="bg-[#4B0082] text-[#D4AF37] border border-[#D4AF37] font-bold text-xs px-6 py-3 rounded-xl cursor-pointer hover:bg-[#5C0099] transition-colors"
            >
              Submit 24/7 Prayer Request
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
