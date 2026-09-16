import React from 'react';
import { ArrowRight, Calculator, ShieldCheck, CheckCircle2, Sparkles, Box, MessageSquare } from 'lucide-react';

export default function Hero({ onExploreCatalog, onOpenCalculator }) {
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
              <span>Wholesale Supplier • Hosur, Tamil Nadu</span>
            </div>

            <h1 className="hero-main-title">
              Stationery & <br />
              <span className="hero-gradient-text">Housekeeping Materials</span> <br />
              At Wholesale Prices.
            </h1>

            <p className="hero-lead">
              Direct wholesale supplier for <strong>Companies, Offices, Hospitals, Colleges & Schools</strong>. Best quality supplies, competitive prices, and fast on-time delivery across Hosur & Krishnagiri.
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
                <strong>On Time Delivery</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-lg"
                onClick={onExploreCatalog}
              >
                <span>View Products</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={onOpenCalculator}
              >
                <Calculator size={18} color="var(--primary-700)" />
                <span>Estimate Restock</span>
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

            {/* Simple Trust Points */}
            <div className="hero-trust-indicators">
              <span>
                <CheckCircle2 size={16} color="var(--primary-600)" /> Daily Hosur Delivery
              </span>
              <span>
                <CheckCircle2 size={16} color="var(--primary-600)" /> Only Wholesale Rates
              </span>
              <span>
                <CheckCircle2 size={16} color="var(--primary-600)" /> Single-Source Supplier
              </span>
            </div>

            {/* Key Numbers */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <h3>100%</h3>
                <p>Wholesale Rates</p>
              </div>
              <div className="stat-item">
                <h3>5</h3>
                <p>Sectors Served</p>
              </div>
              <div className="stat-item">
                <h3>500+</h3>
                <p>Products in Stock</p>
              </div>
              <div className="stat-item">
                <h3>Hosur</h3>
                <p>Local Hub</p>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Card */}
          <div className="hero-visual-card">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80" 
              alt="Professional Housekeeping and Stationery Materials" 
              className="hero-featured-image"
            />

            {/* Floating Badges */}
            <div className="floating-pill top-right animate-float">
              <div className="icon-bubble">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-900)' }}>Guaranteed Quality</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>Branded Paper & Chemicals</div>
              </div>
            </div>

            <div className="floating-pill bottom-left animate-float-delay">
              <div className="icon-bubble" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Box size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-900)' }}>Bulk Discounts</div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Save on Carton Orders</div>
              </div>
            </div>

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
