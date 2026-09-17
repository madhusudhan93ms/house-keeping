import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? -1 : index);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I have a question regarding bulk wholesale supplies.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <section id="faqs" className="py-12 md:py-16 bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-3">
            <HelpCircle size={14} />
            <span>FAQs</span>
          </div>
          <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Common Questions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Quick answers about wholesale orders, delivery, and payment.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-[800px] mx-auto flex flex-col gap-3 mb-8">
          {FAQS.slice(0, 3).map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-[10px] overflow-hidden transition-colors duration-150 ${
                  isOpen ? 'border-primary-400' : 'border-slate-200'
                }`}
              >
                <div
                  className={`flex justify-between items-center px-5 py-4 cursor-pointer font-semibold text-[1rem] transition-colors duration-150 ${
                    isOpen
                      ? 'bg-primary-50 text-primary-800'
                      : 'bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFAQ(index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform duration-250"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: isOpen ? '#0f766e' : '#94a3b8',
                    }}
                  />
                </div>
                {isOpen && (
                  <div className="px-5 py-4 bg-white text-slate-600 leading-relaxed text-[0.95rem] border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-[16px] p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-primary-700" />
            </div>
            <div>
              <h4 className="text-[0.98rem] font-bold text-slate-900">Have questions or need a custom quote?</h4>
              <p className="text-[0.82rem] text-slate-600 mt-0.5">
                Reach us directly at <strong>jasvienterprises28@gmail.com</strong> or WhatsApp.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <button
              className="btn-whatsapp inline-flex items-center gap-1.5 font-semibold text-[0.85rem] px-3 py-2 rounded-[8px] transition-all duration-250"
              onClick={handleWhatsAppContact}
            >
              <MessageSquare size={15} />
              <span>WhatsApp Inquiry</span>
            </button>
            <a
              href="mailto:jasvienterprises28@gmail.com"
              className="inline-flex items-center gap-1.5 bg-gradient-to-br from-primary-600 to-primary-700 text-white font-semibold text-[0.85rem] px-3 py-2 rounded-[8px] no-underline shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:-translate-y-0.5 transition-all duration-250"
            >
              <Mail size={15} />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
