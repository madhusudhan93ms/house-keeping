import React from 'react';
import { Star, Award, CheckCircle, Sparkles, Building } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Testimonials() {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Customer Trust</span>
          </div>
          <h2 className="section-title">Trusted by 500+ Luxury Hotels & Medical Centers</h2>
          <p className="section-subtitle">
            See how facility directors and head housekeepers optimize operational cleanliness and reduce supply costs with PurePro.
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

        {/* Certifications Bar */}
        <div className="certifications-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Award size={22} color="var(--primary-600)" />
            <span>EPA Safer Choice Certified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <CheckCircle size={22} color="var(--primary-600)" />
            <span>Green Seal GS-37 Compliant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Building size={22} color="var(--primary-600)" />
            <span>ISSA Worldwide Member</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--slate-700)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Award size={22} color="var(--primary-600)" />
            <span>ISO 9001:2015 Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
