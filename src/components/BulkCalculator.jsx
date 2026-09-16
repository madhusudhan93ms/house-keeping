import React, { useState } from 'react';
import { Calculator, Building2, Briefcase, HeartPulse, GraduationCap, School, ShoppingCart, Check, BookOpen, Sparkles, FileText, PenTool, Folder, ShieldCheck, Droplets, Trash2, Truck } from 'lucide-react';

const FACILITY_TYPES = [
  { id: 'companies', label: 'Company / Factory', icon: Building2, unitName: 'Staff Members', defaultUnits: 100, min: 20, max: 1000 },
  { id: 'offices', label: 'Office', icon: Briefcase, unitName: 'Desks', defaultUnits: 50, min: 10, max: 500 },
  { id: 'hospitals', label: 'Hospital', icon: HeartPulse, unitName: 'Beds', defaultUnits: 40, min: 10, max: 300 },
  { id: 'colleges', label: 'College', icon: GraduationCap, unitName: 'Students', defaultUnits: 500, min: 100, max: 5000 },
  { id: 'schools', label: 'School', icon: School, unitName: 'Students', defaultUnits: 300, min: 50, max: 2500 },
];

export default function BulkCalculator({ onAddBundleToCart }) {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0]);
  const [unitCount, setUnitCount] = useState(FACILITY_TYPES[0].defaultUnits);
  const [bundleAdded, setBundleAdded] = useState(false);

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    setUnitCount(facility.defaultUnits);
  };

  // Calculate Stationery & Housekeeping quantities based on size
  let paperCartons = 2;
  let registerBundles = 1;
  let penJars = 2;
  let filePacks = 1;

  let floorCleanerCans = 2;
  let disinfectantCans = 1;
  let handwashCans = 2;
  let garbageBagPacks = 2;

  if (selectedFacility.id === 'companies') {
    paperCartons = Math.max(2, Math.round(unitCount * 0.02));
    registerBundles = Math.max(1, Math.round(unitCount * 0.015));
    penJars = Math.max(2, Math.round(unitCount * 0.025));
    filePacks = Math.max(1, Math.round(unitCount * 0.015));

    floorCleanerCans = Math.max(3, Math.round(unitCount * 0.035));
    disinfectantCans = Math.max(2, Math.round(unitCount * 0.02));
    handwashCans = Math.max(3, Math.round(unitCount * 0.03));
    garbageBagPacks = Math.max(3, Math.round(unitCount * 0.035));
  } else if (selectedFacility.id === 'offices') {
    paperCartons = Math.max(3, Math.round(unitCount * 0.05));
    registerBundles = Math.max(1, Math.round(unitCount * 0.01));
    penJars = Math.max(2, Math.round(unitCount * 0.04));
    filePacks = Math.max(2, Math.round(unitCount * 0.03));

    floorCleanerCans = Math.max(2, Math.round(unitCount * 0.025));
    disinfectantCans = Math.max(1, Math.round(unitCount * 0.015));
    handwashCans = Math.max(2, Math.round(unitCount * 0.03));
    garbageBagPacks = Math.max(2, Math.round(unitCount * 0.025));
  } else if (selectedFacility.id === 'hospitals') {
    paperCartons = Math.max(3, Math.round(unitCount * 0.05));
    registerBundles = Math.max(2, Math.round(unitCount * 0.03));
    penJars = Math.max(2, Math.round(unitCount * 0.04));
    filePacks = Math.max(2, Math.round(unitCount * 0.03));

    floorCleanerCans = Math.max(4, Math.round(unitCount * 0.07));
    disinfectantCans = Math.max(5, Math.round(unitCount * 0.08));
    handwashCans = Math.max(5, Math.round(unitCount * 0.08));
    garbageBagPacks = Math.max(5, Math.round(unitCount * 0.08));
  } else {
    // colleges & schools
    paperCartons = Math.max(3, Math.round(unitCount * 0.015));
    registerBundles = Math.max(2, Math.round(unitCount * 0.01));
    penJars = Math.max(3, Math.round(unitCount * 0.012));
    filePacks = Math.max(2, Math.round(unitCount * 0.008));

    floorCleanerCans = Math.max(3, Math.round(unitCount * 0.012));
    disinfectantCans = Math.max(2, Math.round(unitCount * 0.008));
    handwashCans = Math.max(4, Math.round(unitCount * 0.012));
    garbageBagPacks = Math.max(3, Math.round(unitCount * 0.01));
  }

  const retailCost = 
    (paperCartons * 3200) + (registerBundles * 1440) + (penJars * 350) + (filePacks * 1650) +
    (floorCleanerCans * 650) + (disinfectantCans * 950) + (handwashCans * 650) + (garbageBagPacks * 850);

  const bulkCost = 
    (paperCartons * 2850) + (registerBundles * 1200) + (penJars * 280) + (filePacks * 1380) +
    (floorCleanerCans * 520) + (disinfectantCans * 780) + (handwashCans * 510) + (garbageBagPacks * 690);

  const totalSavings = retailCost - bulkCost;

  const handleAddBundle = () => {
    const bundleItems = [
      { id: 'stat-1', qty: paperCartons },
      { id: 'stat-3', qty: registerBundles },
      { id: 'stat-5', qty: penJars },
      { id: 'stat-7', qty: filePacks },
      { id: 'hk-1', qty: disinfectantCans },
      { id: 'hk-2', qty: floorCleanerCans },
      { id: 'hk-6', qty: handwashCans },
      { id: 'hk-8', qty: garbageBagPacks }
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
            <span>Restock Calculator</span>
          </div>
          <h2 className="section-title">Estimate Monthly Supply Needs</h2>
          <p className="section-subtitle">
            Select your institution type and size to view recommended monthly stationery and housekeeping packs.
          </p>
        </div>

        <div className="calculator-card">
          <div className="calculator-grid">
            {/* Left Controls */}
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                1. Select Institution
              </h3>

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
                      <Icon size={17} color={isActive ? 'var(--primary-700)' : 'var(--slate-600)'} />
                      <span>{fac.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Slider */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Capacity:</span>
                  <span className="slider-val-badge">{unitCount} {selectedFacility.unitName}</span>
                </div>
                <input
                  type="range"
                  min={selectedFacility.min}
                  max={selectedFacility.max}
                  value={unitCount}
                  onChange={(e) => setUnitCount(Number(e.target.value))}
                  className="range-slider"
                  aria-label={`Select capacity in ${selectedFacility.unitName}`}
                />
              </div>

              {/* Recommended Packs */}
              <div className="restock-dual-breakdown">
                <div className="breakdown-col">
                  <div className="breakdown-header">
                    <BookOpen size={16} color="var(--primary-700)" />
                    <span>Stationery Pack</span>
                  </div>
                  <ul className="breakdown-list">
                    <li><FileText size={14} strokeWidth={2} className="stroke-bullet-icon blue" /> <strong>{paperCartons} Cartons</strong> A4 Copier Paper</li>
                    <li><BookOpen size={14} strokeWidth={2} className="stroke-bullet-icon blue" /> <strong>{registerBundles} Packs</strong> Hardbound Registers</li>
                    <li><PenTool size={14} strokeWidth={2} className="stroke-bullet-icon blue" /> <strong>{penJars} Jars</strong> Ballpoint Pens (50/jar)</li>
                    <li><Folder size={14} strokeWidth={2} className="stroke-bullet-icon blue" /> <strong>{filePacks} Packs</strong> Box Files (10/pack)</li>
                  </ul>
                </div>

                <div className="breakdown-col">
                  <div className="breakdown-header">
                    <Sparkles size={16} color="#059669" />
                    <span>Housekeeping Pack</span>
                  </div>
                  <ul className="breakdown-list">
                    <li><ShieldCheck size={14} strokeWidth={2} className="stroke-bullet-icon green" /> <strong>{disinfectantCans} × 5L</strong> Disinfectant Cleaner</li>
                    <li><Droplets size={14} strokeWidth={2} className="stroke-bullet-icon green" /> <strong>{floorCleanerCans} × 5L</strong> Floor Cleaner</li>
                    <li><Sparkles size={14} strokeWidth={2} className="stroke-bullet-icon green" /> <strong>{handwashCans} × 5L</strong> Liquid Hand Soap</li>
                    <li><Trash2 size={14} strokeWidth={2} className="stroke-bullet-icon green" /> <strong>{garbageBagPacks} Packs</strong> Heavy Garbage Bags</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="calc-summary-panel">
              <div className="calc-summary-header">
                <span className="calc-live-pill">Wholesale Summary</span>
                <h4>Monthly Estimate</h4>
                <p>{selectedFacility.label} • {unitCount} {selectedFacility.unitName}</p>
              </div>

              <div className="calc-cost-breakdown">
                <div className="calc-cost-row">
                  <span>Standard Retail:</span>
                  <span className="strikethrough">₹{retailCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="calc-cost-row highlight">
                  <span>Wholesale Rate:</span>
                  <span className="bulk-cost-figure">₹{bulkCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="calc-savings-box">
                  <div className="savings-label">Wholesale Savings:</div>
                  <div className="savings-amount">
                    ₹{totalSavings.toLocaleString('en-IN')} (~{Math.round((totalSavings / retailCost) * 100)}% off)
                  </div>
                </div>
              </div>

              <button 
                className={`btn btn-primary btn-block calc-add-btn ${bundleAdded ? 'added' : ''}`}
                onClick={handleAddBundle}
              >
                {bundleAdded ? (
                  <>
                    <Check size={18} />
                    <span>Bundle Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    <span>Add Monthly Bundle to Cart</span>
                  </>
                )}
              </button>

              <div className="calc-delivery-guarantee">
                <Truck size={16} strokeWidth={2} color="var(--primary-700)" className="delivery-stroke-icon" />
                <span><strong>Hosur Delivery:</strong> Delivered directly to your office, hospital, school or factory with delivery challan.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
