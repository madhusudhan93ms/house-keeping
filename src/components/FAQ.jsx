import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, MapPin } from 'lucide-react';
import { FAQS } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? -1 : index);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I have a question regarding wholesale supplies and delivery in Hosur.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800/80 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle size={13} className="text-teal-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Wholesale Procurement FAQs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Essential information regarding delivery areas, billing vouchers, and lead times in Hosur.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5 mb-10">
          {FAQS.slice(0, 4).map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-teal-500/40 bg-slate-950/90 shadow-lg shadow-teal-950/20' 
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-bold text-sm sm:text-base text-white gap-3 cursor-pointer bg-transparent border-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-teal-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fade-in">
                    <p className="m-0">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Box */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-950 to-slate-950 border border-teal-500/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white">Visit Our Hosur Hub</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Survey No. 193-1A1, Zuzuwadi, Hosur 1st Cross, OSS Roja Nagar, Krishnagiri, TN.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquare size={15} />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
}
