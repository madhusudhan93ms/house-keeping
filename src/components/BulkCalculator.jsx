import React, { useState } from 'react';
import { Calculator, Building2, Hospital, Briefcase, Home, ShoppingCart, Check, Sparkles } from 'lucide-react';

const FACILITY_TYPES = [
  { id: 'hotel', label: 'Hotel & Resort', icon: Building2, unitName: 'Guest Rooms', defaultUnits: 60, min: 10, max: 400 },
  { id: 'medical', label: 'Hospital & Clinic', icon: Hospital, unitName: 'Beds / Exam Rooms', defaultUnits: 40, min: 10, max: 250 },
  { id: 'office', label: 'Corporate Office', icon: Briefcase, unitName: 'Floors / Zones', defaultUnits: 8, min: 1, max: 50 },
  { id: 'property', label: 'Vacation Rentals', icon: Home, unitName: 'Properties', defaultUnits: 25, min: 5, max: 150 },
];

export default function BulkCalculator({ onAddBundleToCart }) {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0]);
  const [unitCount, setUnitCount] = useState(FACILITY_TYPES[0].defaultUnits);
  const [bundleAdded, setBundleAdded] = useState(false);

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    setUnitCount(facility.defaultUnits);
  };

  // Compute recommended materials based on unit count and facility multiplier
  const multiplier = selectedFacility.id === 'medical' ? 1.6 : selectedFacility.id === 'office' ? 4.2 : 1.0;
  
  const disinfectantCases = Math.max(2, Math.round((unitCount * 0.12 * multiplier)));
  const microfiberPacks = Math.max(3, Math.round((unitCount * 0.15 * multiplier)));
  const linerBoxes = Math.max(2, Math.round((unitCount * 0.1 * multiplier)));
  const paperCases = Math.max(2, Math.round((unitCount * 0.14 * multiplier)));

  // Estimated cost
  const estimatedRetail = (disinfectantCases * 38.5) + (microfiberPacks * 26.0) + (linerBoxes * 42.0) + (paperCases * 38.0);
  const estimatedBulk = (disinfectantCases * 31.9) + (microfiberPacks * 20.5) + (linerBoxes * 34.5) + (paperCases * 31.0);
  const totalSavings = estimatedRetail - estimatedBulk;

  const handleAddBundle = () => {
    const bundleItems = [
      { id: 'prod-1', qty: disinfectantCases },
      { id: 'prod-2', qty: microfiberPacks },
      { id: 'prod-4', qty: linerBoxes },
      { id: 'prod-11', qty: paperCases }
    ];

    onAddBundleToCart(bundleItems);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section id="calculator" className="calculator-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Calculator size={14} />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="section-title">Calculate Your Monthly Housekeeping Supply Restock</h2>
          <p className="section-subtitle">
            Never run out of critical cleaning materials. Select your facility profile to generate an accurate monthly supply requisition plan with verified wholesale tier pricing.
          </p>
        </div>

        <div className="calculator-card">
          <div className="calculator-grid">
            {/* Left Controls */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Select Your Facility Type</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem' }}>
                Different operations have unique chemical consumption and sanitary turnover rates.
              </p>

              <div className="facility-type-buttons">
                {FACILITY_TYPES.map(fac => {
                  const Icon = fac.icon;
                  const isActive = selectedFacility.id === fac.id;
                  return (
                    <button
                      key={fac.id}
                      className={`facility-type-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleFacilityChange(fac)}
                    >
                      <Icon size={18} color={isActive ? 'var(--primary-700)' : 'var(--slate-600)'} />
                      <span>{fac.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Slider for Capacity */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Number of {selectedFacility.unitName}:</span>
                  <span className="slider-val-badge">{unitCount} {selectedFacility.unitName}</span>
                </div>
                <input
                  type="range"
                  min={selectedFacility.min}
                  max={selectedFacility.max}
                  value={unitCount}
                  onChange={(e) => setUnitCount(Number(e.target.value))}
                  className="range-slider"
                  aria-label={`Select number of ${selectedFacility.unitName}`}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                  <span>{selectedFacility.min} Min</span>
                  <span>{selectedFacility.max} Max Facility Capacity</span>
                </div>
              </div>

              {/* Highlights */}
              <div style={{ background: 'var(--slate-50)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Sparkles size={22} color="var(--primary-600)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.84rem', color: 'var(--slate-700)', lineHeight: 1.5, margin: 0 }}>
                  Estimates follow standardized <strong>AHLA (American Hotel & Lodging Association)</strong> and <strong>ISSA Clean Standards</strong> for sanitization cycles.
                </p>
              </div>
            </div>

            {/* Right Results Box */}
            <div className="calc-summary-box">
              <div>
                <div className="calc-summary-title">2. Recommended Monthly Restock Bundle</div>
                
                <div className="recommendations-list">
                  <div className="rec-item">
                    <span className="rec-item-name">Hospital-Grade Disinfectant (Case of 4x1 Gal)</span>
                    <span className="rec-item-qty">{disinfectantCases} Cases</span>
                  </div>

                  <div className="rec-item">
                    <span className="rec-item-name">Commercial Microfiber Cloths (50 Pk)</span>
                    <span className="rec-item-qty">{microfiberPacks} Packs</span>
                  </div>

                  <div className="rec-item">
                    <span className="rec-item-name">55-Gallon Heavy Duty Trash Can Liners</span>
                    <span className="rec-item-qty">{linerBoxes} Boxes</span>
                  </div>

                  <div className="rec-item">
                    <span className="rec-item-name">Commercial Multifold Hand Towels (Case of 4k)</span>
                    <span className="rec-item-qty">{paperCases} Cases</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="calc-price-row">
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Tiered Bulk Price
                    </div>
                    <div className="calc-price-val">${estimatedBulk.toFixed(2)}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#5eead4', fontWeight: 700 }}>
                      You Save ~${totalSavings.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                      Retail: ${estimatedRetail.toFixed(2)}
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.95rem', fontSize: '1rem' }}
                  onClick={handleAddBundle}
                >
                  {bundleAdded ? (
                    <>
                      <Check size={18} />
                      <span>Bundle Added to Order List!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>Add Recommended Bundle to Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
