import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Truck, Layers, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero({ onExploreForm }) {
  const [heroRef, isHeroVisible] = useScrollReveal({ threshold: 0.1 });

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to get a wholesale quotation for Stationery & Housekeeping supplies in Hosur.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    if (onExploreForm) {
      onExploreForm();
    } else {
      const el = document.getElementById('lead-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-8 pb-16 lg:py-24"
    >
      {/* ── Background Video & Animated Overlay ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ambient Video Loop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
          poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
        >
          {/* High-performance CDN warehouse & logistics video loop */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-warehouse-with-shelves-and-boxes-42525-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Multi-layer Gradient Overlay for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.25),rgba(255,255,255,0))]" />

        {/* Animated Floating Gradient Mesh Orbs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-teal-600/15 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-sky-600/15 blur-3xl animate-float" />
      </div>

      {/* ── Hero Main Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Trust Pill / Location Badge */}
        <div className={`transition-all duration-700 delay-100 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 backdrop-blur-xl shadow-lg shadow-teal-950/50 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-teal-300">
              Hosur Wholesale Hub • Survey No. 193-1A1, OSS Roja Nagar
            </span>
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className={`transition-all duration-700 delay-200 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl leading-[1.1] mb-6">
            Wholesale Supplies for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Companies, Offices, Hospitals & Schools
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-700 delay-300 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal">
            Direct institutional distributor of <strong className="text-white font-semibold">Office Stationery</strong> and <strong className="text-white font-semibold">Commercial Housekeeping Chemicals</strong> in Hosur. Direct factory rates, scheduled monthly replenishment & official delivery challans.
          </p>
        </div>

        {/* Primary Call-to-Actions */}
        <div className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14 transition-all duration-700 delay-400 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a
            href="#lead-form"
            onClick={handleScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-400 hover:to-teal-600 shadow-xl shadow-teal-900/50 hover:shadow-teal-500/30 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span>Request Wholesale Price Quote</span>
            <ArrowRight size={18} />
          </a>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/30 shadow-xl shadow-emerald-950/40 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare size={18} className="text-emerald-200" />
            <span>Instant WhatsApp RFQ</span>
          </button>
        </div>

        {/* ── 4 Floating Animated Value Cards (100% Tailwind) ── */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl transition-all duration-700 delay-500 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            {
              icon: Layers,
              title: '500+ Product SKUs',
              desc: 'Paper, registers, cleaners, cans & bins',
              color: 'text-sky-400',
              border: 'border-sky-500/20'
            },
            {
              icon: ShieldCheck,
              title: 'Direct Wholesale Rates',
              desc: 'Zero retail markup for institutions',
              color: 'text-teal-400',
              border: 'border-teal-500/20'
            },
            {
              icon: Truck,
              title: 'Hosur Local Dispatch',
              desc: 'Direct delivery to SIPCOT & all zones',
              color: 'text-emerald-400',
              border: 'border-emerald-500/20'
            },
            {
              icon: CheckCircle2,
              title: 'Delivery Challan & GST',
              desc: 'Official PO billing & compliance',
              color: 'text-amber-400',
              border: 'border-amber-500/20'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border ${item.border} flex flex-col items-start text-left hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1`}
              >
                <div className={`p-2 rounded-xl bg-slate-800/80 mb-3 ${item.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
