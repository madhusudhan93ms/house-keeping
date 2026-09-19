import React, { useState } from 'react';
import { Package, ArrowRight, Sparkles, BookOpen, Droplets, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SHOWCASE_TABS = [
  { id: 'all', label: 'All Supplies', icon: Sparkles },
  { id: 'stationery', label: 'Office Stationery', icon: BookOpen },
  { id: 'housekeeping', label: 'Housekeeping Chemicals', icon: Droplets },
  { id: 'tools', label: 'Cleaning Tools & Bags', icon: Trash2 },
];

export default function ProductShowcase({ onSelectItemForQuote }) {
  const [activeTab, setActiveTab] = useState('all');
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  // Curate high-impact representative items for each category
  const filteredProducts = PRODUCTS.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'stationery') return product.dept === 'stationery';
    if (activeTab === 'housekeeping') {
      return product.dept === 'housekeeping' && ['chemicals', 'floor', 'toilet', 'handwash', 'dishwash', 'glass'].includes(product.category);
    }
    if (activeTab === 'tools') {
      return product.dept === 'housekeeping' && ['bags', 'mops', 'dustbins', 'tissues'].includes(product.category);
    }
    return true;
  }).slice(0, 8); // Streamlined to top 8 items per tab for maximum speed and elegance

  const handleInquireItem = (product) => {
    if (onSelectItemForQuote) {
      onSelectItemForQuote(product);
    }
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="materials" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-950 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            Wholesale Catalog Preview
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Key Institutional Supplies in Hosur
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            A preview of our commercial stationery and housekeeping inventory ready for scheduled bulk dispatch.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {SHOWCASE_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-400 shadow-lg shadow-teal-950/60 scale-[1.02]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-teal-500/40 hover:bg-slate-900 transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-teal-950/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-500/30">
                      {product.dept === 'stationery' ? 'Stationery' : 'Housekeeping'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5">
                  <h4 className="font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug mb-2 group-hover:text-teal-300 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/50">
                    <Package size={13} className="text-teal-400 flex-shrink-0" />
                    <span className="truncate">{product.packageSize}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleInquireItem(product)}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-teal-600 border border-slate-700/60 hover:border-teal-500 transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                >
                  <span>Inquire Wholesale Rate</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner prompting custom requirements */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border border-teal-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              Looking for a specific stationery item or housekeeping chemical?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              We supply over 500+ SKUs across Hosur. Specify your procurement list in our quotation form.
            </p>
          </div>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-950/50 whitespace-nowrap transition-all"
          >
            <span>Request Custom RFQ</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
