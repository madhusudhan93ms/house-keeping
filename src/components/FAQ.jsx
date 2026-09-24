import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, MapPin } from 'lucide-react';
import { FAQS } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { LEAD_CONFIG, getWhatsAppUrl } from '../config/leadConfig';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? -1 : index);

  const handleWhatsAppContact = () => {
    window.open(getWhatsAppUrl("Hello Jasvi Enterprises, I have a question regarding wholesale supplies and delivery in Hosur."), '_blank');
  };

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle size={13} className="text-teal-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Wholesale Procurement FAQs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
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
                style={{ transitionDelay: `${index * 90}ms` }}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${
                  isOpen 
                    ? 'border-teal-500 bg-white shadow-md shadow-slate-200/50' 
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-bold text-sm sm:text-base text-slate-900 gap-3 cursor-pointer bg-transparent border-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-teal-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                    <p className="m-0">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Box */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-50 via-white to-slate-100 border border-teal-300 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-700 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-slate-900">Visit Our Hosur Hub</div>
              <div className="text-xs text-slate-600 mt-0.5">
                {LEAD_CONFIG.fullAddress}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 shadow-md shadow-emerald-700/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquare size={15} />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
}
