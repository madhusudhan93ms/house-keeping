import React from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export default function Hero({ onExploreCatalog }) {
  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <header className="relative py-10 md:py-14 overflow-hidden bg-[radial-gradient(circle_at_85%_15%,rgba(204,251,241,0.5)_0%,rgba(240,253,250,0.2)_45%,transparent_70%)]">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-14 items-center">

          {/* Left Hero Content */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-4">
              <Sparkles size={14} />
              <span>Wholesale Supplier • Hosur</span>
            </div>

            <h1 className="text-[2.4rem] sm:text-[3rem] md:text-[3.35rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-slate-900 my-4">
              Stationery &{' '}
              <span className="hero-gradient-text">Housekeeping Materials</span>{' '}
              At Wholesale Prices
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-slate-600 mb-6 max-w-xl">
              Direct wholesale supply for <strong>Companies, Offices, Hospitals, Colleges & Schools</strong> in Hosur & Krishnagiri.
            </p>

            {/* Value Pillars */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              {[
                { color: 'green', label: 'Best Quality' },
                { color: 'amber', label: 'Competitive Price' },
                { color: 'blue', label: 'On-Time Delivery' },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm text-[0.88rem]">
                  <span className={`pillar-dot ${p.color}`} />
                  <strong className="text-slate-800">{p.label}</strong>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center gap-2 bg-gradient-to-br from-primary-600 to-primary-700 text-white font-semibold text-[0.95rem] px-6 py-3 rounded-[10px] shadow-[0_4px_14px_rgba(13,148,136,0.35)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)]"
                onClick={onExploreCatalog}
              >
                <span>View Products</span>
                <ArrowRight size={18} />
              </button>
              <button
                className="btn-whatsapp inline-flex items-center gap-2 font-semibold text-[0.95rem] px-6 py-3 rounded-[10px] transition-all duration-250"
                onClick={handleWhatsAppContact}
                title="Direct WhatsApp Order"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Quote</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="order-1 md:order-2 relative rounded-[24px] bg-gradient-to-br from-white to-primary-50 border border-primary-200 p-5 md:p-9 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1),0_8px_10px_-6px_rgba(15,23,42,0.04),var(--shadow-glow)]">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80"
              alt="Professional Housekeeping and Stationery Materials"
              className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover rounded-[16px] block"
            />
            {/* Status Footer */}
            <div className="mt-4 flex items-center justify-between text-[0.85rem] font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                <span>Hosur Hub: <strong>Ready for Dispatch</strong></span>
              </div>
              <span className="text-primary-700 font-bold">Zuzuwadi, Hosur</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
