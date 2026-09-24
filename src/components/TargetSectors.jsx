import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Briefcase, 
  HeartPulse, 
  GraduationCap, 
  School, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Box, 
  Layers, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getWhatsAppUrl } from '../config/leadConfig';

const SECTORS = [
  {
    id: 'Company',
    shortName: '⚡ Companies & Factories',
    title: '⚡ Companies & Factories: 5L/20L Floor Cleaners & Industrial Mops',
    headline: '5L/20L Floor Cleaners & Industrial Mops',
    tagline: 'Heavy-Duty Industrial Sanitation & Floor Maintenance',
    subtitle: 'SIPCOT Phase I & II, Automobile Units, Ancillaries & Tech Hubs',
    icon: Building2,
    themeColor: 'teal',
    bgGradient: 'from-teal-900/90 via-slate-900 to-teal-950',
    accentBadge: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    activeTabClass: 'border-teal-500 text-teal-700 bg-teal-50',
    accentBorder: 'border-teal-500/40',
    accentGlow: 'rgba(20, 184, 166, 0.25)',
    dispatchTime: 'Same-day Hosur dispatch for SIPCOT units',
    minOrder: 'Standard carton / case wholesale lots',
    supplies: [
      { name: 'Industrial Floor Cleaning Concentrates', spec: '5L & 20L heavy cans' },
      { name: 'Commercial Industrial Mops & Squeegees', spec: 'Durable heavy-duty handles' },
      { name: 'Heavy Industrial Waste Bags & Liners', spec: 'Extra thick black/green bags' },
      { name: 'JK Copier Paper & Dispatch Registers', spec: '75/80 GSM ream cartons' },
      { name: 'Multipurpose Degreasers & Sanitizers', spec: 'Floor & machine surface grade' }
    ]
  },
  {
    id: 'Office',
    shortName: '📄 Corporate Offices',
    title: '📄 Corporate Offices: JK Copier Paper 75/80 GSM Reams',
    headline: 'JK Copier Paper 75/80 GSM Reams',
    tagline: 'Premium Executive Copier Paper & Clean Workspaces',
    subtitle: 'Tech Parks, Commercial Facilities, BPOs & Corporate HQs',
    icon: Briefcase,
    themeColor: 'blue',
    bgGradient: 'from-blue-900/90 via-slate-900 to-indigo-950',
    accentBadge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    activeTabClass: 'border-blue-500 text-blue-700 bg-blue-50',
    accentBorder: 'border-blue-500/40',
    accentGlow: 'rgba(59, 130, 246, 0.25)',
    dispatchTime: 'Scheduled monthly restock or 24hr emergency replenishment',
    minOrder: 'Tiered volume pricing with official delivery challans',
    supplies: [
      { name: 'JK Copier Paper 75 & 80 GSM', spec: '500-sheet reams in 10-pack cartons' },
      { name: 'Lever Arch Box Files & Binders', spec: 'Heavy cardboard & PVC finish' },
      { name: 'Executive Gel Pens, Highlighters & Sticky Notes', spec: 'Branded box assortments' },
      { name: 'Moisturizing Liquid Hand Wash & Refills', spec: '5L cans + foaming dispensers' },
      { name: 'Paper Towels, Facial Tissues & Dustbins', spec: 'Restroom & pantry bulk cases' }
    ]
  },
  {
    id: 'Hospital',
    shortName: '🏥 Hospitals & Healthcare',
    title: '🏥 Hospitals & Healthcare: Medical Disinfectants & Biohazard Bags',
    headline: 'Medical Disinfectants & Biohazard Bags',
    tagline: 'Certified Hygiene, Germicidal Protection & Patient Documentation',
    subtitle: 'Multispecialty Hospitals, Nursing Homes, Pathology Labs & Clinics',
    icon: HeartPulse,
    themeColor: 'rose',
    bgGradient: 'from-rose-950/90 via-slate-900 to-slate-950',
    accentBadge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    activeTabClass: 'border-rose-500 text-rose-700 bg-rose-50',
    accentBorder: 'border-rose-500/40',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
    dispatchTime: 'Priority hospital restock within 12-24 hours',
    minOrder: 'Hygienically sealed case packs with batch numbers',
    supplies: [
      { name: 'Hospital-Grade Disinfectant Concentrates', spec: 'Surface & floor sterilization (5L)' },
      { name: 'Color-Coded Biohazard Waste Bags', spec: 'Red, Yellow, Blue & Black bags' },
      { name: 'Germicidal Toilet & Washroom Cleaners', spec: 'High-potency antibacterial formula' },
      { name: 'Patient Record Files & Prescription Pads', spec: 'Custom institutional print formats' },
      { name: 'Alcohol Sanitizer Cans & Pedal Dispensers', spec: '70% IPA surgical grade' }
    ]
  },
  {
    id: 'College',
    shortName: '🎓 Colleges & Universities',
    title: '🎓 Colleges & Universities: Hardbound Registers & Whiteboard Markers',
    headline: 'Hardbound Registers & Whiteboard Markers',
    tagline: 'High-Volume Academic Examination & Campus Maintenance',
    subtitle: 'Engineering, Medical, Arts & Science Campuses across Krishnagiri',
    icon: GraduationCap,
    themeColor: 'indigo',
    bgGradient: 'from-indigo-950/90 via-slate-900 to-slate-950',
    accentBadge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    activeTabClass: 'border-indigo-500 text-indigo-700 bg-indigo-50',
    accentBorder: 'border-indigo-500/40',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
    dispatchTime: 'Pre-semester & examination seasonal buffer deliveries',
    minOrder: 'Institutional bulk rates for departments & libraries',
    supplies: [
      { name: 'Hardbound Attendance & Lab Registers', spec: '100, 200 & 400 pages ledger bound' },
      { name: 'Whiteboard Markers & Bulk Ink Refills', spec: 'Dry erase assorted 4-color boxes' },
      { name: 'Official Examination Answer Booklets', spec: 'Ruling, serial numbered & stamped' },
      { name: 'Large Campus Floor Wash Concentrates', spec: '20L drums & high-capacity mop sets' },
      { name: 'Classroom & Corridor Pedal Dustbins', spec: 'Heavy-duty 40L & 60L capacity' }
    ]
  },
  {
    id: 'School',
    shortName: '🏫 Schools & Institutes',
    title: '🏫 Schools & Institutes: Student Record Folders & Hand Wash',
    headline: 'Student Record Folders & Hand Wash',
    tagline: 'Child-Safe Materials & Term-Wise Academic Supplies',
    subtitle: 'Matriculation, CBSE, International Schools & Pre-Schools',
    icon: School,
    themeColor: 'amber',
    bgGradient: 'from-amber-950/90 via-slate-900 to-slate-950',
    accentBadge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    activeTabClass: 'border-amber-500 text-amber-700 bg-amber-50',
    accentBorder: 'border-amber-500/40',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    dispatchTime: 'Term opening scheduled bulk shipments',
    minOrder: 'Special school welfare package pricing',
    supplies: [
      { name: 'Student Record Folders & Report Binders', spec: 'Reinforced paper & plastic pockets' },
      { name: 'Gentle Antibacterial Hand Wash (Child-Safe)', spec: 'Dermatologically safe fragrance 5L' },
      { name: 'Art, Craft & Colored Chart Paper Packs', spec: 'Vibrant heavy GSM craft packs' },
      { name: 'Classroom Dusters & Non-Toxic Chalk Boxes', spec: 'Dustless school white & colored' },
      { name: 'Campus Waste Bins, Brooms & Floor Disinfectant', spec: 'Safe daily cleaning package' }
    ]
  },
  {
    id: 'Custom',
    shortName: '📦 Custom Institutional POs',
    title: '📦 Custom Institutional POs: Tailored Wholesale Consignments',
    headline: 'Tailored Wholesale Consignments',
    tagline: 'Bespoke Brand Specifications, Custom Lot Sizes & Challans',
    subtitle: 'Government Agencies, Industrial Estates, Large Campuses & Tenders',
    icon: Box,
    themeColor: 'purple',
    bgGradient: 'from-purple-950/90 via-slate-900 to-slate-950',
    accentBadge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    activeTabClass: 'border-purple-500 text-purple-700 bg-purple-50',
    accentBorder: 'border-purple-500/40',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
    dispatchTime: 'Custom dispatch schedule aligned with monthly PO terms',
    minOrder: 'Fully customized orders matching tender requirements',
    supplies: [
      { name: 'Custom Paper Brands & GSM Specifications', spec: 'Bespoke watermarking & sizes' },
      { name: 'Tailored Chemical Formulations & Concentrations', spec: 'Industrial & facility tailored (20L+)' },
      { name: 'Custom Printed Letterheads, Registers & Envelopes', spec: 'Institutional branding & logo print' },
      { name: 'Comprehensive Monthly Facilities Kit', spec: 'Consolidated single-challan delivery' },
      { name: 'Direct B2B Procurement Tender Fulfillment', spec: 'Complete Hosur warehouse support' }
    ]
  }
];

// Marquee ticker items for continuous auto-scroll display
const MARQUEE_ITEMS = [
  '⚡ Companies & Factories: 5L/20L Floor Cleaners & Industrial Mops',
  '📄 Corporate Offices: JK Copier Paper 75/80 GSM Reams (Carton Lots)',
  '🏥 Hospitals & Healthcare: Medical Disinfectants & Biohazard Bags',
  '🎓 Colleges & Universities: Hardbound Registers & Whiteboard Markers',
  '🏫 Schools & Institutes: Student Record Folders & Child-Safe Hand Soap',
  '🚚 Hosur Logistics: Daily Zuzuvadi & SIPCOT Phase I & II Express Logistics',
  '📦 Wholesale Lot Discounts: Direct B2B Pricing With Official Delivery Challans'
];

export default function TargetSectors({ onSelectSector }) {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  // Default to 'flip' as requested
  const [displayMode, setDisplayMode] = useState('flip'); // 'flip' | 'swipe'
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [flippedCards, setFlippedCards] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [progress, setProgress] = useState(0);

  const autoPlayTimerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const AUTO_PLAY_INTERVAL = 5500; // 5.5 seconds per slide

  const activeSector = SECTORS[activeIndex];

  // Auto-play progress bar and slide advancement
  useEffect(() => {
    if (displayMode !== 'swipe' || !isPlaying) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    setProgress(0);
    const stepTime = 50;
    const increment = (stepTime / AUTO_PLAY_INTERVAL) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, stepTime);

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SECTORS.length);
      setProgress(0);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      clearInterval(progressTimerRef.current);
      clearInterval(autoPlayTimerRef.current);
    };
  }, [activeIndex, isPlaying, displayMode]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SECTORS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SECTORS.length) % SECTORS.length);
    setProgress(0);
  };

  const handleSelectTab = (idx) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInquireSector = (sectorId) => {
    if (onSelectSector) {
      onSelectSector(sectorId);
    }
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppQuickInquiry = (sectorTitle) => {
    const text = `Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies for ${sectorTitle} in Hosur.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const IconComponent = activeSector.icon;

  return (
    <section 
      id="sectors" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-b border-slate-200 relative overflow-hidden scroll-mt-16"
    >
      {/* Background Decorative Mesh Orbs */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 -z-0 opacity-40"
        style={{ background: activeSector.accentGlow }}
      />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-teal-600" />
            <span>Institutional Wholesale Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Specialized Wholesale Supply by Sector
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Tailored procurement packages for manufacturing plants in SIPCOT, corporate tech facilities, hospitals, and educational campuses across Hosur.
          </p>

          {/* Interactive Mode Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl border border-slate-300 mt-6 shadow-inner">
            <button
              type="button"
              onClick={() => setDisplayMode('flip')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                displayMode === 'flip'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 bg-white/70'
              }`}
            >
              <RefreshCw size={15} />
              <span>🔄 3D Flip Display</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('swipe')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                displayMode === 'swipe'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-700/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 bg-white/70'
              }`}
            >
              <Layers size={15} />
              <span>⚡ Auto-Swipe Showcase</span>
            </button>
          </div>
        </div>

        {/* ── CONTINUOUS AUTO-SCROLL MARQUEE TICKER ── */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm py-3 px-2 relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee-scroll flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-teal-50 hover:text-teal-800 transition-colors px-3 py-1 rounded-full border border-slate-200/80 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── MODE 1: 3D INTERACTIVE FLIP DISPLAY (PRIMARY DEFAULT) ── */}
        {displayMode === 'flip' && (
          <div className="space-y-6">
            <div className="text-center text-xs font-semibold text-slate-500 mb-2">
              💡 <em>Hover over any sector card (or tap on mobile) to flip 360° and view the complete materials checklist & dispatch details!</em>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SECTORS.map((sector) => {
                const Icon = sector.icon;
                const isFlipped = !!flippedCards[sector.id];

                return (
                  <div
                    key={sector.id}
                    className="perspective-1000 h-[410px] sm:h-[430px] cursor-pointer group"
                    onClick={() => toggleFlip(sector.id)}
                  >
                    <div 
                      className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
                        isFlipped ? 'rotate-y-180' : ''
                      } group-hover:rotate-y-180`}
                    >
                      
                      {/* ── FRONT FACE ── */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all">
                        <div>
                          {/* Top Bar with Icon & Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-sm">
                              <Icon size={26} />
                            </div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              Wholesale B2B
                            </span>
                          </div>

                          {/* Sector Title */}
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1 leading-snug">
                            {sector.shortName}
                          </h3>

                          {/* Flagship Headline Badge */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-bold shadow-xs my-2 max-w-full">
                            <span className="truncate">{sector.headline}</span>
                          </div>

                          <div className="text-xs text-slate-600 font-medium mb-1">
                            {sector.tagline}
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-4">
                            {sector.subtitle}
                          </p>

                          {/* Quick Preview Chips */}
                          <div className="flex flex-wrap gap-1.5">
                            {sector.supplies.slice(0, 3).map((item, i) => (
                              <span 
                                key={i}
                                className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                              >
                                {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
                              </span>
                            ))}
                            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                              +{sector.supplies.length - 3} More
                            </span>
                          </div>
                        </div>

                        {/* Flip Hint Footer */}
                        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-bold">
                          <span className="inline-flex items-center gap-1.5">
                            <RefreshCw size={13} className="text-teal-600 animate-spin" />
                            <span>Hover / Tap to Flip for Full Checklist</span>
                          </span>
                          <span className="text-slate-400 font-mono">&rarr;</span>
                        </div>
                      </div>

                      {/* ── BACK FACE (180 deg) ── */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-7 flex flex-col justify-between shadow-2xl text-white">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                            <h4 className="text-sm sm:text-base font-bold text-teal-400">
                              {sector.shortName} Checklist
                            </h4>
                            <span className="text-[10px] bg-slate-800 text-teal-300 font-bold px-2 py-0.5 rounded border border-slate-700">
                              Hosur Stock
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            {sector.supplies.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                                <Check size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">
                                  <strong>{item.name}</strong> <span className="text-slate-400">({item.spec})</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Back Face Actions */}
                        <div className="space-y-2 pt-3 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInquireSector(sector.id);
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition-all cursor-pointer border-none shadow-md shadow-teal-950/50"
                          >
                            <span>Request Wholesale Quote</span>
                            <ArrowRight size={13} />
                          </button>
                          <div className="text-[10px] text-center text-slate-400">
                            {sector.dispatchTime}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MODE 2: AUTO-SWIPE STAGE SHOWCASE ── */}
        {displayMode === 'swipe' && (
          <div 
            className="space-y-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sector Tabs Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
              {SECTORS.map((sector, idx) => {
                const TabIcon = sector.icon;
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => handleSelectTab(idx)}
                    className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? `${sector.activeTabClass} shadow-md scale-[1.02]`
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <TabIcon size={16} />
                    <span>{sector.shortName}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Stage */}
            <div className="relative rounded-3xl bg-slate-900 text-white shadow-2xl overflow-hidden border border-slate-800 transition-all duration-500">
              
              {/* Top Auto-Progress Bar */}
              <div className="w-full bg-slate-800 h-1 relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Stage Body (2-Column Grid) */}
              <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Sector Details & Procurement Scope */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-950/40">
                      <IconComponent size={32} />
                    </div>
                    <div>
                      <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                        Sector {activeIndex + 1} of {SECTORS.length} • Hosur Wholesale
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mt-1">
                        {activeSector.shortName}
                      </h3>
                      <div className="text-sm font-bold text-teal-400 mt-1">
                        {activeSector.headline}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeSector.subtitle}
                  </p>

                  {/* Highlights Pill Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
                      <Truck size={17} className="text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Logistics Guarantee:</strong>
                        <span className="text-slate-300">{activeSector.dispatchTime}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
                      <ShieldCheck size={17} className="text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Wholesale Pricing:</strong>
                        <span className="text-slate-300">{activeSector.minOrder}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => handleInquireSector(activeSector.id)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 shadow-lg shadow-teal-950/60 transition-all hover:scale-[1.02] cursor-pointer border-none"
                    >
                      <span>Request {activeSector.shortName.replace(/^[^\s]+\s/, '')} Quote</span>
                      <ArrowRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppQuickInquiry(activeSector.shortName)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all cursor-pointer"
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp RFQ</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Key Material Requisitions Card */}
                <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-4">
                    <div className="flex items-center gap-2">
                      <Box size={18} className="text-teal-400" />
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        Standard Requisition Checklist
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-700">
                      Bulk Stocked
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeSector.supplies.map((item, i) => (
                      <div 
                        key={i}
                        className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/50 hover:border-teal-500/40 transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                            ✓
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-100">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-teal-300 font-medium">
                              {item.spec}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleInquireSector(activeSector.id)}
                          className="text-[10px] uppercase font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-teal-600 px-2.5 py-1 rounded-md transition-all cursor-pointer border border-slate-700 whitespace-nowrap"
                        >
                          + Add RFQ
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Summary Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Includes delivery challan & GST vouchers</span>
                    <strong className="text-teal-400 font-mono">Wholesale Lots</strong>
                  </div>
                </div>

              </div>

              {/* Bottom Carousel Controls Bar */}
              <div className="bg-slate-950/90 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
                    title={isPlaying ? 'Pause Auto-Swipe' : 'Resume Auto-Swipe'}
                    aria-label="Toggle auto swipe"
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  </button>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {isPlaying ? 'Auto-swiping every 5s' : 'Auto-swipe paused'}
                  </span>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {SECTORS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectTab(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-none ${
                        activeIndex === idx 
                          ? 'w-7 bg-teal-400' 
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to sector ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
                    aria-label="Previous sector"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
                    aria-label="Next sector"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
