import React from 'react';
import { Building2, Briefcase, HeartPulse, GraduationCap, School, ArrowRight } from 'lucide-react';
import { TARGET_SECTORS } from '../data/products';

const iconMap = { Building2, Briefcase, Cross: HeartPulse, GraduationCap, School };

export default function TargetSectors({ onExploreCatalog }) {
  return (
    <section id="sectors" className="py-12 md:py-16 bg-slate-50">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-3">
            <span>Our Supply For</span>
          </div>
          <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Supplying 5 Key Sectors
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Tailored wholesale supplies for your everyday operations.
          </p>
        </div>

        {/* Sector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TARGET_SECTORS.map((sector) => {
            const Icon = iconMap[sector.iconName] || Building2;
            return (
              <div
                key={sector.id}
                className="bg-white border border-slate-200 rounded-[16px] p-5 flex flex-col cursor-pointer group transition-all duration-250 hover:-translate-y-1.5 hover:border-primary-300 hover:shadow-[0_14px_30px_-4px_rgba(15,23,42,0.1)]"
                onClick={onExploreCatalog}
              >
                <div className="w-11 h-11 rounded-[10px] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 mb-4 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-250">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-slate-900 text-[1rem] mb-1.5 leading-snug">
                  {sector.title}
                </h3>
                <p className="text-[0.85rem] text-slate-600 mb-4 leading-relaxed flex-1">
                  {sector.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-primary-700 group-hover:text-primary-800 transition-colors duration-150">
                  <span>View Supplies</span>
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
