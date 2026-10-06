import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const REGIONAL_COVERAGE = [
  {
    id: 'hosur',
    tabName: 'Hosur Industrial Hub',
    badge: 'Core Primary Base • Same-Day Dispatch',
    title: 'Hosur & Krishnagiri Industrial Corridor',
    summary: 'Our primary warehouse and logistics hub in Hosur provides direct factory wholesale supply with dedicated same-day delivery across industrial zones.',
    areas: [
      { name: 'SIPCOT Industrial Complex Phase I & II', desc: 'Heavy manufacturing plants, auto ancillaries & fabrication facilities' },
      { name: 'Zuzuvadi & OSS Roja Nagar', desc: 'Direct warehouse gate dispatch & institutional trade collection' },
      { name: 'Mathigiri & Bagalur Industrial Belts', desc: 'Warehousing hubs, electronics assembly & logistics depots' },
      { name: 'Kelamangalam & Denkanikottai Road', desc: 'Processing units, commercial establishments & local campuses' },
      { name: 'Shoolagiri & Krishnagiri District', desc: 'Commercial estates, educational complexes & district facilities' }
    ],
    highlights: ['Zero retail markup', 'Official delivery challans', 'Same-day urgent dispatch', 'Full GST invoicing']
  },
  {
    id: 'tamil-nadu',
    tabName: 'Tamil Nadu Statewide',
    badge: 'Statewide Distribution Network',
    title: 'Tamil Nadu Institutional Procurement',
    summary: 'Serving high-volume manufacturing hubs, corporate offices, and institutions across Tamil Nadu with consolidated B2B consignments.',
    areas: [
      { name: 'Chennai & Sriperumbudur Corridor', desc: 'Corporate tech facilities, corporate HQs & automotive clusters' },
      { name: 'Coimbatore Industrial Belt', desc: 'Textile mills, engineering units, colleges & multispecialty hospitals' },
      { name: 'Salem & Dharmapuri Hubs', desc: 'Steel plants, logistics hubs & educational campuses' },
      { name: 'Erode & Tiruppur Export Hubs', desc: 'Garment manufacturing facilities & commercial office complexes' }
    ],
    highlights: ['Scheduled monthly restock', 'Palletized carton freight', 'Transparent bulk quotes', 'Consistent product grades']
  },
  {
    id: 'karnataka',
    tabName: 'Karnataka Corridor',
    badge: 'Interstate Fast-Transit Belt',
    title: 'Bengaluru & Border Industrial Zones',
    summary: 'Leveraging Hosur’s strategic location on the Karnataka border for daily wholesale logistics to tech parks and industrial parks.',
    areas: [
      { name: 'Electronic City & Bommasandra', desc: 'IT/BPO campuses, software tech parks & electronic manufacturing units' },
      { name: 'Attibele & Anekal Industrial Corridor', desc: 'Direct interstate border dispatch, manufacturing units & warehouses' },
      { name: 'Jigani & Bannerghatta Road', desc: 'Industrial estates, corporate facilities & commercial campuses' },
      { name: 'Hosakote, Tumakuru & Mysuru', desc: 'Tiered wholesale consignments for institutions & enterprise clusters' }
    ],
    highlights: ['Daily border transit', 'Tech park bulk supply', 'Custom billing workflows', 'Emergency stock replenishment']
  },
  {
    id: 'pan-india',
    tabName: 'Pan-India Wholesale',
    badge: 'Nationwide Institutional Dispatch',
    title: 'All-India Bulk Wholesale Supply',
    summary: 'Accepting large-scale institutional enquiries, government tenders, multi-location corporate contracts, and nationwide consignments.',
    areas: [
      { name: 'Multi-Location Corporate Accounts', desc: 'Centralized procurement pricing with multi-city institutional delivery' },
      { name: 'Hospital & Healthcare Chains', desc: 'Certified medical-grade disinfectants & hygiene supplies nationwide' },
      { name: 'Educational Board Networks', desc: 'Annual stationery, copier paper & examination material tenders' },
      { name: 'Government & Public Sector Enterprises', desc: 'GeM-compliant documentation & institutional consignment logistics' }
    ],
    highlights: ['Direct mill/factory rates', 'Full tender compliance', 'Container & full-truckload lots', 'Dedicated account manager']
  }
];

export default function SeoCoverageSection() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState('hosur');

  const currentCoverage = REGIONAL_COVERAGE.find(c => c.id === activeTab) || REGIONAL_COVERAGE[0];

  const handleScrollToQuote = (e) => {
    e.preventDefault();
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="coverage"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Primary SEO H2 */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <Sparkles size={14} className="text-teal-600" />
            <span>Strategic Supply Network • Hosur, TN, KA &amp; All India</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Wholesale Housekeeping &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Stationery Supplier in Hosur
            </span>
          </h2>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Local Hosur Warehouse</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Immediate dispatch to SIPCOT Phase I &amp; II, Zuzuvadi, and Krishnagiri industrial belts.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <PackageCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Consolidated B2B Orders</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Combine 5L cleaning chemicals, hygiene tools, copier paper &amp; stationery in one delivery.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">GST &amp; Challan Verified</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Direct wholesale pricing with official stamped delivery challans and GST invoices.
              </p>
            </div>
          </div>
        </div>

        {/* Coverage Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {REGIONAL_COVERAGE.map((region) => {
            const isActive = activeTab === region.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveTab(region.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-700/20 scale-[1.02]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <MapPin size={15} className={isActive ? 'text-white' : 'text-teal-600'} />
                <span>{region.tabName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Coverage Details Box */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-lg p-6 sm:p-9 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
                {currentCoverage.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {currentCoverage.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              {currentCoverage.summary}
            </p>
          </div>

          {/* Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentCoverage.areas.map((area, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3 hover:bg-teal-50/50 hover:border-teal-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                    {area.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights & Quick RFQ Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
              {currentCoverage.highlights.map((h, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  <span>{h}</span>
                </span>
              ))}
            </div>

            <a
              href="#lead-form"
              onClick={handleScrollToQuote}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Get Wholesale Quotation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
