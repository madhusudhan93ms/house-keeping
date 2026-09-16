import React from 'react';
import { Star, Award, CheckCircle, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Testimonials() {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Client Feedback</span>
          </div>
          <h2 className="section-title">Trusted by Leading Companies & Institutions</h2>
          <p className="section-subtitle">
            See how facility directors, procurement heads, and school administrators across Hosur & Krishnagiri rely on Jasvi Enterprises.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="quote-text">"{item.quote}"</p>
              </div>

              <div className="client-profile">
                <div className="client-avatar">
                  {item.author.charAt(0)}
                </div>
                <div className="client-info">
                  <h4>{item.author}</h4>
                  <p>{item.role} • <strong>{item.facility}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Trust Badges */}
        <div className="certifications-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Award size={22} color="var(--primary-600)" />
            <span>Verified 100% Wholesale Pricing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <ShieldCheck size={22} color="var(--primary-600)" />
            <span>High-Grade Disinfectant Chemicals</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <CheckCircle size={22} color="var(--primary-600)" />
            <span>JK & Century Copier Paper Stock</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Truck size={22} color="var(--primary-600)" />
            <span>Direct Hosur & Regional Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
