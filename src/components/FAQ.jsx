import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQS } from '../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs" className="faq-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">Frequently Asked Commercial Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about wholesale minimum order quantities, delivery freight, custom restock contracts, and SDS safety documentation.
          </p>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFAQ(index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.25s ease',
                      color: isOpen ? 'var(--primary-700)' : 'var(--slate-400)'
                    }} 
                  />
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Banner */}
        <div style={{ maxWidth: 800, margin: '2.5rem auto 0 auto', background: 'var(--primary-50)', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <PhoneCall size={24} color="var(--primary-700)" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.95rem' }}>Need a custom volume quote for multi-property chains?</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--primary-700)' }}>Our commercial housekeeping specialists reply within 15 minutes.</div>
            </div>
          </div>
          <a href="tel:18005557873" className="btn btn-primary btn-sm">
            Call 1-800-555-PURE
          </a>
        </div>
      </div>
    </section>
  );
}
