import React from 'react';
import { Building2, Briefcase, HeartPulse, GraduationCap, School, ArrowRight, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SECTORS = [
  {
    id: 'Company',
    title: 'Companies & Factories',
    subtitle: 'SIPCOT Phase I & II, Automobile & Industrial Units',
    icon: Building2,
    gradient: 'from-blue-500/20 to-teal-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    supplies: [
      'Heavy-duty floor cleaning concentrates (5L & 20L)',
      'Large industrial garbage bags & durable dustbins',
      'Industrial mops, brooms & wiping towels',
      'A4 Copier paper cartons & dispatch registers'
    ]
  },
  {
    id: 'Office',
    title: 'Corporate Offices & IT',
    subtitle: 'Tech Parks, Commercial Facilities & Workspaces',
    icon: Briefcase,
    gradient: 'from-teal-500/20 to-emerald-500/10',
    borderColor: 'border-teal-500/30',
    iconColor: 'text-teal-400',
    supplies: [
      'JK Copier Paper 75/80 GSM ream cartons',
      'Lever arch box files, folders & binders',
      'Executive pens, highlighters & sticky pads',
      'Gentle moisturizing liquid hand wash & tissue towels'
    ]
  },
  {
    id: 'Hospital',
    title: 'Hospitals & Healthcare',
    subtitle: 'Multispecialty Clinics, Nursing Homes & Labs',
    icon: HeartPulse,
    gradient: 'from-rose-500/20 to-purple-500/10',
    borderColor: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    supplies: [
      'Medical-grade disinfectant cleaners & sanitizers',
      'Germicidal toilet & bathroom cleaners',
      'Colour-coded biohazard waste disposal bags',
      'Patient register books & prescription pads'
    ]
  },
  {
    id: 'College',
    title: 'Colleges & Universities',
    subtitle: 'Engineering, Arts & Science Campuses',
    icon: GraduationCap,
    gradient: 'from-indigo-500/20 to-blue-500/10',
    borderColor: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    supplies: [
      'Whiteboard markers & refill ink bottles',
      'Official examination papers & answer sheets',
      'Long hardbound attendance & lab registers',
      'Large campus floor cleaning & sanitizer cans'
    ]
  },
  {
    id: 'School',
    title: 'Schools & Institutes',
    subtitle: 'Matriculation, CBSE & International Schools',
    icon: School,
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    supplies: [
      'Student record files & teacher notebook sets',
      'Art, craft & colored chart paper packs',
      'Child-safe antibacterial hand wash refills',
      'Classroom dustbins, pedal bins & dusters'
    ]
  }
];

export default function TargetSectors({ onSelectSector }) {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const handleInquireSector = (sectorId) => {
    if (onSelectSector) {
      onSelectSector(sectorId);
    }
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="sectors" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-900 border-t border-b border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            Institutional Coverage
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Specialized Wholesale Supply for Every Sector
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            We understand the distinct monthly replenishment needs of corporate offices, manufacturing plants, healthcare centers, and educational campuses across Hosur.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.id}
                className={`relative rounded-3xl bg-slate-950/70 border ${sector.borderColor} p-6 sm:p-7 flex flex-col justify-between hover:bg-slate-950 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-teal-950/40 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center border border-white/10 ${sector.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                      Wholesale B2B
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {sector.subtitle}
                  </p>

                  {/* Materials List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                      Popular Supplies:
                    </div>
                    {sector.supplies.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                        <Check size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  type="button"
                  onClick={() => handleInquireSector(sector.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800/80 hover:bg-teal-600 border border-slate-700/60 hover:border-teal-500 transition-all group-hover:shadow-lg cursor-pointer"
                >
                  <span>Inquire for {sector.title.split(' ')[0]}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}

          {/* Quick Highlight Card */}
          <div className={`rounded-3xl bg-gradient-to-br from-teal-950/80 via-slate-950 to-slate-950 border border-teal-500/30 p-6 sm:p-7 flex flex-col justify-between shadow-xl ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 mb-5">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Custom Institutional POs
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Need a specific brand of paper or custom chemical concentration for your organization? We procure and supply customized wholesale packages tailored to your procurement checklist.
              </p>
            </div>
            <button
              onClick={() => handleInquireSector('Company')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-950/60 transition-all cursor-pointer"
            >
              <span>Submit Custom Requirement</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
