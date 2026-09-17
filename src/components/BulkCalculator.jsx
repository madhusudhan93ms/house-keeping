import React, { useState } from 'react';
import { Calculator, Building2, Briefcase, HeartPulse, GraduationCap, School, ShoppingCart, Check, BookOpen, Sparkles, FileText, PenTool, Folder, ShieldCheck, Droplets, Trash2, Truck } from 'lucide-react';

const FACILITY_TYPES = [
  { id: 'companies', label: 'Company / Factory', icon: Building2,     unitName: 'Staff Members', defaultUnits: 100, min: 20,  max: 1000 },
  { id: 'offices',   label: 'Office',            icon: Briefcase,     unitName: 'Desks',         defaultUnits: 50,  min: 10,  max: 500  },
  { id: 'hospitals', label: 'Hospital',          icon: HeartPulse,    unitName: 'Beds',          defaultUnits: 40,  min: 10,  max: 300  },
  { id: 'colleges',  label: 'College',           icon: GraduationCap, unitName: 'Students',      defaultUnits: 500, min: 100, max: 5000 },
  { id: 'schools',   label: 'School',            icon: School,        unitName: 'Students',      defaultUnits: 300, min: 50,  max: 2500 },
];

export default function BulkCalculator({ onAddBundleToCart }) {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0]);
  const [unitCount, setUnitCount] = useState(FACILITY_TYPES[0].defaultUnits);
  const [bundleAdded, setBundleAdded] = useState(false);

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    setUnitCount(facility.defaultUnits);
  };

  let paperCartons = 2, registerBundles = 1, penJars = 2, filePacks = 1;
  let floorCleanerCans = 2, disinfectantCans = 1, handwashCans = 2, garbageBagPacks = 2;

  if (selectedFacility.id === 'companies') {
    paperCartons = Math.max(2, Math.round(unitCount * 0.02)); registerBundles = Math.max(1, Math.round(unitCount * 0.015));
    penJars = Math.max(2, Math.round(unitCount * 0.025)); filePacks = Math.max(1, Math.round(unitCount * 0.015));
    floorCleanerCans = Math.max(3, Math.round(unitCount * 0.035)); disinfectantCans = Math.max(2, Math.round(unitCount * 0.02));
    handwashCans = Math.max(3, Math.round(unitCount * 0.03)); garbageBagPacks = Math.max(3, Math.round(unitCount * 0.035));
  } else if (selectedFacility.id === 'offices') {
    paperCartons = Math.max(3, Math.round(unitCount * 0.05)); registerBundles = Math.max(1, Math.round(unitCount * 0.01));
    penJars = Math.max(2, Math.round(unitCount * 0.04)); filePacks = Math.max(2, Math.round(unitCount * 0.03));
    floorCleanerCans = Math.max(2, Math.round(unitCount * 0.025)); disinfectantCans = Math.max(1, Math.round(unitCount * 0.015));
    handwashCans = Math.max(2, Math.round(unitCount * 0.03)); garbageBagPacks = Math.max(2, Math.round(unitCount * 0.025));
  } else if (selectedFacility.id === 'hospitals') {
    paperCartons = Math.max(3, Math.round(unitCount * 0.05)); registerBundles = Math.max(2, Math.round(unitCount * 0.03));
    penJars = Math.max(2, Math.round(unitCount * 0.04)); filePacks = Math.max(2, Math.round(unitCount * 0.03));
    floorCleanerCans = Math.max(4, Math.round(unitCount * 0.07)); disinfectantCans = Math.max(5, Math.round(unitCount * 0.08));
    handwashCans = Math.max(5, Math.round(unitCount * 0.08)); garbageBagPacks = Math.max(5, Math.round(unitCount * 0.08));
  } else {
    paperCartons = Math.max(3, Math.round(unitCount * 0.015)); registerBundles = Math.max(2, Math.round(unitCount * 0.01));
    penJars = Math.max(3, Math.round(unitCount * 0.012)); filePacks = Math.max(2, Math.round(unitCount * 0.008));
    floorCleanerCans = Math.max(3, Math.round(unitCount * 0.012)); disinfectantCans = Math.max(2, Math.round(unitCount * 0.008));
    handwashCans = Math.max(4, Math.round(unitCount * 0.012)); garbageBagPacks = Math.max(3, Math.round(unitCount * 0.01));
  }

  const retailCost = (paperCartons*3200)+(registerBundles*1440)+(penJars*350)+(filePacks*1650)+(floorCleanerCans*650)+(disinfectantCans*950)+(handwashCans*650)+(garbageBagPacks*850);
  const bulkCost   = (paperCartons*2850)+(registerBundles*1200)+(penJars*280)+(filePacks*1380)+(floorCleanerCans*520)+(disinfectantCans*780)+(handwashCans*510)+(garbageBagPacks*690);
  const totalSavings = retailCost - bulkCost;

  const handleAddBundle = () => {
    onAddBundleToCart([
      { id: 'stat-1', qty: paperCartons }, { id: 'stat-3', qty: registerBundles },
      { id: 'stat-5', qty: penJars },      { id: 'stat-7', qty: filePacks },
      { id: 'hk-1',   qty: disinfectantCans }, { id: 'hk-2', qty: floorCleanerCans },
      { id: 'hk-6',   qty: handwashCans },     { id: 'hk-8', qty: garbageBagPacks },
    ]);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section id="calculator" className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-primary-50/30">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-3">
            <Calculator size={14} />
            <span>Restock Calculator</span>
          </div>
          <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Estimate Monthly Supply Needs
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Select your institution type and size to view recommended monthly stationery and housekeeping packs.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-[24px] border border-primary-200 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1)] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

            {/* Left: Controls */}
            <div>
              <h3 className="text-[1.1rem] font-bold text-slate-900 mb-4">1. Select Institution</h3>

              {/* Facility Type Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-7">
                {FACILITY_TYPES.map(fac => {
                  const Icon = fac.icon;
                  const isActive = selectedFacility.id === fac.id;
                  return (
                    <button
                      key={fac.id}
                      className={`flex items-center gap-2.5 px-3 py-3 border rounded-[10px] font-semibold text-[0.88rem] cursor-pointer transition-all duration-150 text-left ${
                        isActive
                          ? 'border-primary-600 bg-primary-50 text-primary-800 shadow-[0_0_0_2px_#99f6e4]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-primary-400 hover:bg-white'
                      }`}
                      onClick={() => handleFacilityChange(fac)}
                    >
                      <Icon size={17} className={isActive ? 'text-primary-700' : 'text-slate-600'} />
                      <span>{fac.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Slider */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-2.5 font-semibold text-slate-800">
                  <span>Capacity:</span>
                  <span className="text-[1.1rem] font-extrabold text-primary-700 bg-primary-100 px-3 py-0.5 rounded-full">
                    {unitCount} {selectedFacility.unitName}
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedFacility.min}
                  max={selectedFacility.max}
                  value={unitCount}
                  onChange={(e) => setUnitCount(Number(e.target.value))}
                  className="range-slider w-full h-2 rounded-full bg-slate-200 outline-none cursor-pointer"
                  aria-label={`Select capacity in ${selectedFacility.unitName}`}
                />
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stationery */}
                <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
                  <div className="flex items-center gap-2 text-[0.85rem] font-bold text-blue-800 mb-3">
                    <BookOpen size={16} className="text-primary-700" />
                    <span>Stationery Pack</span>
                  </div>
                  <ul className="flex flex-col gap-2 text-[0.82rem] text-slate-700 list-none m-0 p-0">
                    <li className="flex items-center gap-1.5"><FileText size={13} className="text-blue-500 flex-shrink-0" /><strong>{paperCartons} Cartons</strong>&nbsp;A4 Copier Paper</li>
                    <li className="flex items-center gap-1.5"><BookOpen size={13} className="text-blue-500 flex-shrink-0" /><strong>{registerBundles} Packs</strong>&nbsp;Hardbound Registers</li>
                    <li className="flex items-center gap-1.5"><PenTool size={13} className="text-blue-500 flex-shrink-0" /><strong>{penJars} Jars</strong>&nbsp;Ballpoint Pens (50/jar)</li>
                    <li className="flex items-center gap-1.5"><Folder size={13} className="text-blue-500 flex-shrink-0" /><strong>{filePacks} Packs</strong>&nbsp;Box Files (10/pack)</li>
                  </ul>
                </div>
                {/* Housekeeping */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-4">
                  <div className="flex items-center gap-2 text-[0.85rem] font-bold text-emerald-800 mb-3">
                    <Sparkles size={16} className="text-emerald-600" />
                    <span>Housekeeping Pack</span>
                  </div>
                  <ul className="flex flex-col gap-2 text-[0.82rem] text-slate-700 list-none m-0 p-0">
                    <li className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-500 flex-shrink-0" /><strong>{disinfectantCans} × 5L</strong>&nbsp;Disinfectant Cleaner</li>
                    <li className="flex items-center gap-1.5"><Droplets size={13} className="text-emerald-500 flex-shrink-0" /><strong>{floorCleanerCans} × 5L</strong>&nbsp;Floor Cleaner</li>
                    <li className="flex items-center gap-1.5"><Sparkles size={13} className="text-emerald-500 flex-shrink-0" /><strong>{handwashCans} × 5L</strong>&nbsp;Liquid Hand Soap</li>
                    <li className="flex items-center gap-1.5"><Trash2 size={13} className="text-emerald-500 flex-shrink-0" /><strong>{garbageBagPacks} Packs</strong>&nbsp;Heavy Garbage Bags</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Summary Panel */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[20px] p-6 md:p-8 flex flex-col text-white">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 bg-primary-600/30 border border-primary-400/40 text-primary-300 text-[0.72rem] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase mb-3">
                  Wholesale Summary
                </span>
                <h4 className="text-xl font-bold text-white mb-1">Monthly Estimate</h4>
                <p className="text-slate-400 text-[0.88rem]">{selectedFacility.label} • {unitCount} {selectedFacility.unitName}</p>
              </div>

              {/* Cost Breakdown */}
              <div className="flex-1 mb-6">
                <div className="flex justify-between items-center py-2.5 border-b border-white/10 text-[0.9rem]">
                  <span className="text-slate-400">Standard Retail:</span>
                  <span className="line-through text-slate-500">₹{retailCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/10 text-[0.9rem]">
                  <span className="text-slate-300">Wholesale Rate:</span>
                  <span className="text-2xl font-extrabold text-primary-300">₹{bulkCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-4 bg-primary-700/30 border border-primary-500/40 rounded-[12px] p-4">
                  <div className="text-[0.78rem] font-bold text-primary-300 uppercase tracking-wider mb-1">Wholesale Savings:</div>
                  <div className="text-[1.5rem] font-extrabold text-emerald-400">
                    ₹{totalSavings.toLocaleString('en-IN')}{' '}
                    <span className="text-[1rem] text-emerald-300/80">
                      (~{Math.round((totalSavings / retailCost) * 100)}% off)
                    </span>
                  </div>
                </div>
              </div>

              {/* Add Bundle CTA */}
              <button
                className={`w-full flex items-center justify-center gap-2.5 font-bold text-[1rem] px-4 py-3.5 rounded-[12px] border-none cursor-pointer transition-all duration-200 mb-4 ${
                  bundleAdded
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white'
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)]'
                }`}
                onClick={handleAddBundle}
              >
                {bundleAdded ? (
                  <><Check size={18} /><span>Bundle Added to Cart!</span></>
                ) : (
                  <><ShoppingCart size={18} /><span>Add Monthly Bundle to Cart</span></>
                )}
              </button>

              {/* Delivery Note */}
              <div className="flex items-start gap-2.5 text-[0.82rem] text-slate-400">
                <Truck size={16} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-slate-300">Hosur Delivery:</strong> Delivered directly to your office, hospital, school or factory with delivery challan.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
