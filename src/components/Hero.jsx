import heroBgImage from '../assets/hero_supplies_light_bg.jpg';
import { 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Layers, 
  CheckCircle2, 
  FileText, 
  FolderArchive, 
  Droplets, 
  Sparkles 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getWhatsAppUrl } from '../config/leadConfig';

export default function Hero({ onExploreForm }) {
  const [heroRef, isHeroVisible] = useScrollReveal({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgParallax = Math.min(100, scrollY * 0.2);
  const leftBadgeParallax = Math.min(60, scrollY * -0.08);
  const rightBadgeParallax = Math.min(60, scrollY * -0.06);

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppUrl("Hello Jasvi Enterprises, I would like to get a wholesale quotation for Stationery & Housekeeping supplies in Hosur."), '_blank');
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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 pt-8 pb-16 lg:py-24"
    >
      {/* ── Background: Housekeeping & Stationery Materials Light Visual Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Crisp daylight commercial showroom with Stationery (left) and Housekeeping (right) */}
        <img
          src={heroBgImage}
          alt="Wholesale Housekeeping and Office Stationery Materials in Hosur"
          style={{
            transform: `translateY(${bgParallax}px) scale(1.05)`,
            transition: 'transform 0.1s ease-out',
          }}
          className="w-full h-full object-cover object-center opacity-95 contrast-[1.02] brightness-100 will-change-transform"
          loading="eager"
        />

        {/* Soft light radial gradient leaving the left stationery & right housekeeping flanks vivid and crisp */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_42%,rgba(255,255,255,0.90)_0%,rgba(255,255,255,0.45)_55%,rgba(241,245,249,0.85)_100%)]" />

        {/* Ambient light glow accents: Sky Blue for Stationery (Left) & Emerald for Housekeeping (Right) */}
        <div className="absolute top-1/4 -left-10 w-96 h-96 rounded-full bg-sky-300/20 blur-[100px]" />
        <div className="absolute top-1/3 -right-10 w-96 h-96 rounded-full bg-emerald-300/20 blur-[100px]" />

        {/* Bottom smooth fade to blend naturally with the common light background */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent" />
      </div>

      {/* ── Left Floating Material Badges (Stationery Highlight - Light Theme) ── */}
      <div 
        style={{
          transform: `translateY(calc(-50% + ${leftBadgeParallax}px))`,
          transition: 'transform 0.1s ease-out',
        }}
        className="hidden lg:flex flex-col gap-3.5 absolute left-4 xl:left-8 top-1/2 z-20 pointer-events-auto max-w-[220px] will-change-transform"
      >
        <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-sky-200/90 shadow-xl shadow-slate-300/50 hover:border-sky-400 hover:shadow-2xl transition-all duration-300 animate-float">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-sky-100 text-sky-700 border border-sky-200">
              <FileText size={18} />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 block">Stationery Material</span>
              <span className="text-xs font-extrabold text-slate-900 block">Copier Paper Reams</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-medium leading-snug">
            A4 80GSM & Legal cartons ready for institutional bulk dispatch.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-indigo-200/90 shadow-xl shadow-slate-300/50 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 animate-float [animation-delay:2s]">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200">
              <FolderArchive size={18} />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 block">Office Records</span>
              <span className="text-xs font-extrabold text-slate-900 block">Files & Ledgers</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-medium leading-snug">
            Hardbound ruled registers, box files & executive document binders.
          </p>
        </div>
      </div>

      {/* ── Right Floating Material Badges (Housekeeping Highlight - Light Theme) ── */}
      <div 
        style={{
          transform: `translateY(calc(-50% + ${rightBadgeParallax}px))`,
          transition: 'transform 0.1s ease-out',
        }}
        className="hidden lg:flex flex-col gap-3.5 absolute right-4 xl:right-8 top-1/2 z-20 pointer-events-auto max-w-[220px] will-change-transform"
      >
        <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-teal-200/90 shadow-xl shadow-slate-300/50 hover:border-teal-400 hover:shadow-2xl transition-all duration-300 animate-float [animation-delay:1s]">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-teal-100 text-teal-700 border border-teal-200">
              <Droplets size={18} />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 block">Housekeeping Material</span>
              <span className="text-xs font-extrabold text-slate-900 block">5L Chemical Cans</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-medium leading-snug">
            Hospital-grade floor cleaners, toilet liquids & surface disinfectants.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-200/90 shadow-xl shadow-slate-300/50 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 animate-float [animation-delay:3s]">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Sparkles size={18} />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">Janitorial Gear</span>
              <span className="text-xs font-extrabold text-slate-900 block">Mops & Bin Liners</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 font-medium leading-snug">
            Microfiber dusters, heavy wringer mop trolleys & industrial garbage bags.
          </p>
        </div>
      </div>

      {/* ── Hero Main Content (No Popup Card, Clean & Reduced Content) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Trust Pill / Location Badge */}
        <div className={`transition-all duration-700 delay-100 transform mb-4 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-teal-600/30 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-teal-900">
              Hosur Wholesale Hub • Survey No. 193-1A1, OSS Roja Nagar
            </span>
          </div>
        </div>

        {/* Hero Main Headline (Punchy & Clean) */}
        <div className={`transition-all duration-700 delay-200 transform mb-4 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-3xl leading-[1.15]">
            Wholesale Supplies for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Companies, Offices & Schools
            </span>
          </h1>
        </div>

        {/* Reduced Subtitle (Crisp & Direct) */}
        <div className={`transition-all duration-700 delay-300 transform mb-7 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed font-medium">
            Direct institutional distributor of <strong className="text-slate-900 font-bold">Office Stationery</strong> & <strong className="text-slate-900 font-bold">Housekeeping Chemicals</strong> in Hosur.
          </p>
        </div>

        {/* Primary Call-to-Actions */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12 transition-all duration-700 delay-400 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a
            href="#lead-form"
            onClick={handleScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-teal-600 via-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 shadow-lg shadow-teal-700/25 hover:shadow-teal-600/35 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span>Request Wholesale Quote</span>
            <ArrowRight size={18} />
          </a>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 shadow-lg shadow-emerald-700/25 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare size={18} className="text-emerald-100" />
            <span>WhatsApp RFQ</span>
          </button>
        </div>

        {/* ── 4 Floating Value Cards (Clean Light Theme) ── */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl transition-all duration-700 delay-500 transform ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            {
              icon: Layers,
              title: '500+ Product SKUs',
              desc: 'Paper, registers, cleaners, cans & bins',
              color: 'text-sky-600',
              bgColor: 'bg-sky-50 border-sky-200/80',
              border: 'border-slate-200/90'
            },
            {
              icon: ShieldCheck,
              title: 'Direct Wholesale Rates',
              desc: 'Zero retail markup for institutions',
              color: 'text-teal-600',
              bgColor: 'bg-teal-50 border-teal-200/80',
              border: 'border-slate-200/90'
            },
            {
              icon: Truck,
              title: 'Hosur Local Dispatch',
              desc: 'Direct delivery to SIPCOT & all zones',
              color: 'text-emerald-600',
              bgColor: 'bg-emerald-50 border-emerald-200/80',
              border: 'border-slate-200/90'
            },
            {
              icon: CheckCircle2,
              title: 'Delivery Challan & GST',
              desc: 'Official PO billing & compliance',
              color: 'text-amber-600',
              bgColor: 'bg-amber-50 border-amber-200/80',
              border: 'border-slate-200/90'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border ${item.border} shadow-lg shadow-slate-300/30 flex flex-col items-start text-left hover:border-teal-500 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
              >
                <div className={`p-2 rounded-xl ${item.bgColor} border mb-3 ${item.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium line-clamp-2">
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
