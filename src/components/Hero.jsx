import React from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export default function Hero({ onExploreCatalog }) {
  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <header className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Wholesale Supplier • Hosur</span>
            </div>

            <h1 className="hero-main-title">
              Stationery & <br />
              <span className="hero-gradient-text">Housekeeping Materials</span> <br />
              At Wholesale Prices
            </h1>

            <p className="hero-lead">
              Direct wholesale supply for <strong>Companies, Offices, Hospitals, Colleges & Schools</strong> in Hosur & Krishnagiri.
            </p>

            {/* Quick 3 Value Points */}
            <div className="hero-pillars-row">
              <div className="pillar-badge">
                <span className="pillar-dot green"></span>
                <strong>Best Quality</strong>
              </div>
              <div className="pillar-badge">
                <span className="pillar-dot amber"></span>
                <strong>Competitive Price</strong>
              </div>
              <div className="pillar-badge">
                <span className="pillar-dot blue"></span>
                <strong>On-Time Delivery</strong>
              </div>
            </div>

            {/* Focused Action Buttons */}
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-lg"
                onClick={onExploreCatalog}
              >
                <span>View Products</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-whatsapp btn-lg"
                onClick={handleWhatsAppContact}
                title="Direct WhatsApp Order"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Quote</span>
              </button>
            </div>
          </div>

          {/* Right Visual Showcase Card */}
          <div className="hero-visual-card">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80" 
              alt="Professional Housekeeping and Stationery Materials" 
              className="hero-featured-image"
            />

            {/* Status Footer Tag */}
            <div className="hero-card-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-indicator-dot"></span>
                <span>Hosur Hub: <strong>Ready for Dispatch</strong></span>
              </div>
              <span style={{ color: 'var(--primary-700)', fontWeight: 700 }}>
                Zuzuwadi, Hosur
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
