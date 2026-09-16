import React from 'react';
import { Building2, Briefcase, HeartPulse, GraduationCap, School, ArrowRight } from 'lucide-react';
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
          <h2 className="section-title">Supplying 5 Key Sectors</h2>
          <p className="section-subtitle">
            Tailored wholesale supplies for your everyday operations.
          </p>
        </div>

        {/* Sector Cards Grid */}
        <div className="sectors-grid">
          {TARGET_SECTORS.map((sector) => {
            const Icon = iconMap[sector.iconName] || Building2;
            return (
              <div 
                key={sector.id} 
                className="sector-card animated-card"
                onClick={onExploreCatalog}
                style={{ cursor: 'pointer' }}
              >
                <div className="sector-icon-box">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="sector-title animated-title">{sector.title}</h3>
                <p className="sector-desc" style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {sector.desc}
                </p>
                
                <div className="sector-action-btn" style={{ marginTop: 'auto' }}>
                  <span>View Supplies</span>
                  <ArrowRight size={14} strokeWidth={2.5} className="btn-arrow" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
