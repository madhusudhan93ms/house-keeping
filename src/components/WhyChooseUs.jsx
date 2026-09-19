import React from 'react';
import { MapPin, TrendingDown, FileText, PackageCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const REASONS = [
  {
    icon: MapPin,
    title: 'Local Hosur Warehouse',
    subtitle: 'Survey No. 193-1A1, OSS Roja Nagar, Zuzuwadi',
    description: 'Direct proximity to SIPCOT Phase I & II and Hosur town. No multi-day freight transit or out-of-town courier delays. Urgent restocks dispatched immediately.',
    badge: 'Immediate Dispatch'
  },
  {
    icon: TrendingDown,
    title: 'Factory-Direct Wholesale Pricing',
    subtitle: 'Zero Retail Markup',
    description: 'We procure materials in bulk containers and distributor cartons, passing institutional discounts directly to your purchasing department.',
    badge: 'Best Value'
  },
  {
    icon: FileText,
    title: 'GST Vouchers & Delivery Challans',
    subtitle: 'Compliant Commercial Procurement',
    description: 'All deliveries are accompanied by stamped company delivery challans, GST-compliant documentation, and structured purchase order verification.',
    badge: '100% Compliant'
  },
  {
    icon: PackageCheck,
    title: 'Single-Source Procurement',
    subtitle: 'Both Stationery & Housekeeping',
    description: 'Consolidate two separate vendor accounts into one reliable partner. Receive one consolidated delivery and one streamlined invoice every month.',
    badge: 'Time-Saving'
  }
];

export default function WhyChooseUs() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="why-us"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-900/60 border-t border-b border-slate-800/80 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            Why Partner With Jasvi
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built Specifically for Hosur’s Institutional Buyers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Reliable supply schedules, dedicated institutional accounts, and local accountability in Krishnagiri district.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/30 transition-all duration-300 group hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-teal-950/30 flex flex-col justify-between ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/25 transition-all">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-teal-400/90 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
