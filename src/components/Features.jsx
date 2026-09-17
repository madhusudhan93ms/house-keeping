import React from 'react';
import { Truck, Tag, PackageCheck, Layers, Award, Headphones } from 'lucide-react';

const FEATURES = [
  { icon: Award,        title: 'Best Quality Products',  desc: 'Branded stationery (JK Copier, Kangaro) and tested high-grade cleaning chemicals.' },
  { icon: Tag,          title: 'Only Wholesale Prices',  desc: 'Direct wholesale rates without retail markups. Clear carton and case discounts.' },
  { icon: Truck,        title: 'On-Time Delivery',       desc: 'Prompt daily dispatch to companies, hospitals, and schools in Hosur & Krishnagiri.' },
  { icon: Layers,       title: 'One-Stop Supply',        desc: 'Consolidate all stationery and housekeeping materials on a single invoice.' },
  { icon: PackageCheck, title: '5 Target Sectors',       desc: 'Supplying Companies, Offices, Hospitals, Colleges, and Schools.' },
  { icon: Headphones,   title: 'Instant Support',        desc: 'Quick quotations and order processing via WhatsApp and email.' },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-20 bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-3">
            <span>Why Jasvi Enterprises</span>
          </div>
          <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Your Trusted Wholesale Partner
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Reliable quality, competitive pricing, and on-time delivery across Hosur.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-[16px] p-7 transition-all duration-250 hover:-translate-y-1 hover:bg-white hover:border-primary-300 hover:shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)]"
              >
                <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="text-[1.1rem] font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-[0.92rem] leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
