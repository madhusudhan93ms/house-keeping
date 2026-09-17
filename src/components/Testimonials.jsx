import React from 'react';
import { Star, Award, CheckCircle, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 md:py-20 bg-slate-50">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-3">
            <Sparkles size={14} />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Trusted by Leading Companies & Institutions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            See how facility directors, procurement heads, and school administrators across Hosur & Krishnagiri rely on Jasvi Enterprises.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] p-7 border border-slate-200 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.08)] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="text-slate-700 text-[1rem] leading-relaxed italic mb-5">"{item.quote}"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-base flex-shrink-0">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[0.95rem] font-bold text-slate-900">{item.author}</h4>
                  <p className="text-[0.82rem] text-slate-500">{item.role} • <strong>{item.facility}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-6 border-t border-slate-200">
          {[
            { Icon: Award,       label: 'Verified 100% Wholesale Pricing' },
            { Icon: ShieldCheck, label: 'High-Grade Disinfectant Chemicals' },
            { Icon: CheckCircle, label: 'JK & Century Copier Paper Stock' },
            { Icon: Truck,       label: 'Direct Hosur & Regional Dispatch' },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-slate-700 font-semibold text-[0.9rem]">
              <Icon size={22} className="text-primary-600 flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
