import React from 'react';
import { Truck, ShieldCheck, DollarSign, Leaf, Repeat, Headphones, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'Guaranteed 24-48h Dispatch',
    desc: 'With 6 regional fulfillment centers, 98% of hospitality and facility orders arrive within two business days. Emergency same-day couriers available.'
  },
  {
    icon: ShieldCheck,
    title: 'EPA & OSHA Compliant',
    desc: 'Full regulatory compliance with automatic digital SDS sheet delivery, bilingual hazard labeling, and certified disinfectant kill claim documentation.'
  },
  {
    icon: DollarSign,
    title: 'Tiered Wholesale Pricing',
    desc: 'Bypass distributor markups with direct manufacturer pricing. Enjoy automatic discounts scaling from 10% to 28% off on case and pallet volumes.'
  },
  {
    icon: Leaf,
    title: 'Eco-Certified Formulations',
    desc: 'Environmentally responsible cleaning materials bearing Green Seal and EPA Safer Choice certifications that are non-toxic to housekeeping staff.'
  },
  {
    icon: Repeat,
    title: 'Smart Recurring Restock',
    desc: 'Set custom delivery cadences based on occupancy rates. Pause, edit, or adjust volumes anytime with automated inventory reservation.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Account Manager',
    desc: 'Get assigned a commercial housekeeping procurement specialist ready to assist with POs, customized packaging, and chemical audit consulting.'
  }
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Operational Advantage</span>
          </div>
          <h2 className="section-title">Built Exclusively for Housekeeping & Facility Operations</h2>
          <p className="section-subtitle">
            Say goodbye to fragmented cleaning vendors. We provide high-potency, reliable materials engineered for intense daily sanitization demands.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-icon-box">
                  <Icon size={24} />
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
