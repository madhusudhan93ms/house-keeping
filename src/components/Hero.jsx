import React from 'react';
import { ArrowRight, Calculator, ShieldCheck, CheckCircle2, Sparkles, Box } from 'lucide-react';

export default function Hero({ onExploreCatalog, onOpenCalculator }) {
  return (
    <header className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Commercial & Hospitality Housekeeping Supplies</span>
            </div>

            <h1>
              Industrial Housekeeping Materials, <br />
              <span className="hero-gradient-text">Delivered Fast & Reliable.</span>
            </h1>

            <p className="hero-lead">
              Empower your housekeeping crews with hospital-grade disinfectants, high-durability janitorial carts, split-fiber mops, and luxury guest amenities. Save up to 28% with tiered wholesale pricing and guaranteed next-day dispatch.
            </p>

            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-lg"
                onClick={onExploreCatalog}
              >
                <span>Order Housekeeping Materials</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg"
                onClick={onOpenCalculator}
              >
                <Calculator size={18} color="var(--primary-700)" />
                <span>Estimate Facility Needs</span>
              </button>
            </div>

            {/* Live Trust Badges */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-600)', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="var(--primary-600)" /> EPA & OSHA Registered
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-600)', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="var(--primary-600)" /> Net-30 Invoicing for Facilities
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-600)', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="var(--primary-600)" /> 100% Eco-Safe Formulations
              </span>
            </div>

            {/* Metrics */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <h3>99.8%</h3>
                <p>On-Time Dispatch</p>
              </div>
              <div className="stat-item">
                <h3>500+</h3>
                <p>Hotels & Facilities</p>
              </div>
              <div className="stat-item">
                <h3>2,400+</h3>
                <p>Active Cleaning SKUs</p>
              </div>
              <div className="stat-item">
                <h3>24-48h</h3>
                <p>Average Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Card */}
          <div className="hero-visual-card">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80" 
              alt="Professional Janitorial Housekeeping Cart and Materials" 
              className="hero-featured-image"
            />

            {/* Floating Live Badge Top Right */}
            <div className="floating-pill top-right animate-float">
              <div className="icon-bubble">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-900)' }}>Hospital-Grade Clean</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>99.99% Virucidal Efficacy</div>
              </div>
            </div>

            {/* Floating Live Badge Bottom Left */}
            <div className="floating-pill bottom-left animate-float-delay">
              <div className="icon-bubble" style={{ background: '#ecfdf5', color: '#059669' }}>
                <Box size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-900)' }}>Bulk Tier Discounts</div>
                <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Save 15% - 28% Instantly</div>
              </div>
            </div>

            {/* Status Footer Tag */}
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--slate-600)', background: '#ffffff', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                <span>Central Distribution Hub: <strong>Active</strong></span>
              </div>
              <span style={{ color: 'var(--primary-700)', fontWeight: 600 }}>Ships in 24h</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
