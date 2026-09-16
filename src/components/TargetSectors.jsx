import React from 'react';
import { Building2, Briefcase, HeartPulse, GraduationCap, School, ArrowRight, CheckCircle2, Award, BadgePercent, Clock } from 'lucide-react';
import { TARGET_SECTORS } from '../data/products';

const iconMap = {
  Building2,
  Briefcase,
  Cross: HeartPulse,
  GraduationCap,
  School
};

export default function TargetSectors({ onExploreCatalog }) {
  return (
    <section id="sectors" className="sectors-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Our Supply For</span>
          </div>
          <h2 className="section-title">Supplying All Key Sectors</h2>
          <p className="section-subtitle">
            Reliable wholesale supply of Stationery & Housekeeping Materials tailored to your daily needs.
          </p>
        </div>

        {/* Sector Cards Grid */}
        <div className="sectors-grid">
          {TARGET_SECTORS.map((sector) => {
            const Icon = iconMap[sector.iconName] || Building2;
            return (
              <div key={sector.id} className="sector-card animated-card">
                <div className="sector-icon-box">
                  <Icon size={26} strokeWidth={2} />
                </div>
                <h3 className="sector-title animated-title">{sector.title}</h3>
                <p className="sector-desc">{sector.desc}</p>
                
                <div className="sector-popular">
                  <div className="popular-label">Common Supplies:</div>
                  <div className="popular-tags">
                    {sector.popularItems.map((item, idx) => (
                      <span key={idx} className="popular-tag">
                        <CheckCircle2 size={12} strokeWidth={2.5} className="tag-check" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className="sector-action-btn"
                  onClick={onExploreCatalog}
                >
                  <span>View Supplies</span>
                  <ArrowRight size={14} strokeWidth={2.5} className="btn-arrow" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Wholesale Promise Strip with Stroke Vector Icons */}
        <div className="wholesale-guarantee-strip">
          <div className="guarantee-item">
            <div className="guarantee-stroke-icon">
              <Award size={24} strokeWidth={2} color="var(--primary-600)" />
            </div>
            <div>
              <strong>Best Quality</strong>
              <p>Branded stationery & certified cleaners</p>
            </div>
          </div>
          <div className="guarantee-divider" />
          <div className="guarantee-item">
            <div className="guarantee-stroke-icon">
              <BadgePercent size={24} strokeWidth={2} color="#059669" />
            </div>
            <div>
              <strong>Competitive Price</strong>
              <p>Direct wholesale rates with carton savings</p>
            </div>
          </div>
          <div className="guarantee-divider" />
          <div className="guarantee-item">
            <div className="guarantee-stroke-icon">
              <Clock size={24} strokeWidth={2} color="#2563eb" />
            </div>
            <div>
              <strong>On-Time Delivery</strong>
              <p>Fast scheduled delivery across Hosur hub</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
