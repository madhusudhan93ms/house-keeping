import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I have a question regarding bulk wholesale supplies.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <section id="faqs" className="faq-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>FAQs</span>
          </div>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">
            Quick answers about wholesale orders, delivery, and payment.
          </p>
        </div>

        <div className="faq-container">
          {FAQS.slice(0, 3).map((faq, index) => {
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
        <div className="faq-support-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="support-icon-box">
              <Mail size={20} color="var(--primary-700)" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Have questions or need a custom quote?
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', margin: 0 }}>
                Reach us directly at <strong>jasvienterprises28@gmail.com</strong> or WhatsApp.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-whatsapp btn-sm"
              onClick={handleWhatsAppContact}
            >
              <MessageSquare size={15} />
              <span>WhatsApp Inquiry</span>
            </button>

            <a 
              href="mailto:jasvienterprises28@gmail.com"
              className="btn btn-primary btn-sm"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
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
