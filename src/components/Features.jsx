import React from 'react';
import { Truck, Tag, PackageCheck, Layers, Award, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: Award,
    title: 'Best Quality Products',
    desc: 'Branded stationery (JK Copier, Kangaro) and tested high-grade cleaning chemicals.'
  },
  {
    icon: Tag,
    title: 'Only Wholesale Prices',
    desc: 'Direct wholesale rates without retail markups. Clear carton and case discounts.'
  },
  {
    icon: Truck,
    title: 'On-Time Delivery',
    desc: 'Prompt daily dispatch to companies, hospitals, and schools in Hosur & Krishnagiri.'
  },
  {
    icon: Layers,
    title: 'One-Stop Supply',
    desc: 'Consolidate all stationery and housekeeping materials on a single invoice.'
  },
  {
    icon: PackageCheck,
    title: '5 Target Sectors',
    desc: 'Supplying Companies, Offices, Hospitals, Colleges, and Schools.'
  },
  {
    icon: Headphones,
    title: 'Instant Support',
    desc: 'Quick quotations and order processing via WhatsApp and email.'
  }
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>Why Jasvi Enterprises</span>
          </div>
          <h2 className="section-title">Your Trusted Wholesale Partner</h2>
          <p className="section-subtitle">
            Reliable quality, competitive pricing, and on-time delivery across Hosur.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-icon-box">
                  <Icon size={22} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
