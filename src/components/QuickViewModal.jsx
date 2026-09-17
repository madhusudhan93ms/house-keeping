import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck, Plus, Minus, ShoppingBag, Info } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(product?.minBulkUnits || 1);

  if (!product) return null;

  const isBulk = qty >= product.minBulkUnits;
  const unitPrice = isBulk ? product.bulkPrice : product.price;
  const total = unitPrice * qty;

  const handleAdd = () => { onAddToCart(product, qty); onClose(); };

  const badgeColorMap = {
    blue:   'bg-blue-50 text-blue-800 border-blue-200',
    teal:   'bg-teal-50 text-teal-800 border-teal-200',
    amber:  'bg-amber-50 text-amber-800 border-amber-200',
    green:  'bg-green-50 text-green-800 border-green-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-[4px] z-[110] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[860px] max-h-[90vh] overflow-y-auto relative animate-fade-scale shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 z-10 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer p-2 rounded-[8px] flex items-center transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Column */}
          <div className="p-6">
            <div className="rounded-[12px] overflow-hidden bg-slate-50 border border-slate-100 mb-4">
              <img src={product.image} alt={product.name} className="w-full h-[260px] md:h-[300px] object-cover" />
            </div>
            <div className="flex items-start gap-3 bg-primary-50 border border-primary-200 rounded-[10px] p-3">
              <ShieldCheck size={20} className="text-primary-700 flex-shrink-0 mt-0.5" />
              <div className="text-[0.82rem] text-primary-900">
                <strong>Quality Guaranteed:</strong> Sourced directly for corporate, hospital, and educational standards.
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 border-t md:border-t-0 md:border-l border-slate-100">
            {/* Badge + SKU */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.75rem] font-semibold border ${badgeColorMap[product.badgeColor || 'teal'] || badgeColorMap.teal}`}>
                {product.badge}
              </span>
              <span className="text-[0.78rem] text-slate-500 font-semibold">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h3 className="text-[1.3rem] font-extrabold text-slate-900 leading-snug mb-2">{product.name}</h3>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
              ))}
              <span className="text-[0.85rem] font-bold ml-1">{product.rating}</span>
              <span className="text-[0.8rem] text-slate-400">({product.reviewsCount} verified reviews)</span>
            </div>

            {/* Package */}
            <div className="bg-slate-50 px-3 py-2 rounded-[8px] border border-slate-200 text-[0.85rem] text-slate-700 mb-3">
              <strong>Packaging Unit:</strong> {product.packageSize}
            </div>

            {/* Description */}
            <p className="text-[0.9rem] text-slate-600 leading-relaxed mb-4">{product.description}</p>

            {/* Specs */}
            <div className="mb-4">
              <div className="text-[0.78rem] font-bold uppercase tracking-widest text-slate-500 mb-2">Key Specifications</div>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[0.82rem] text-slate-700">
                    <CheckCircle size={14} className="text-primary-600 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Box */}
            <div className={`p-4 rounded-[10px] border mb-4 ${isBulk ? 'bg-primary-50 border-primary-400' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[0.78rem] text-slate-500 font-semibold mb-1">Wholesale Price Rate:</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[1.55rem] font-extrabold text-slate-900">₹{unitPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[0.85rem] text-slate-500">/{product.unit || 'unit'}</span>
                    {isBulk && (
                      <span className="line-through text-[0.9rem] text-slate-400">₹{product.price.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[0.78rem] text-slate-500 font-semibold mb-1">Total (Qty {qty}):</div>
                  <div className="text-[1.3rem] font-extrabold text-primary-700">₹{total.toLocaleString('en-IN')}</div>
                </div>
              </div>
              {!isBulk && (
                <div className="mt-2 text-[0.78rem] text-primary-800 font-semibold flex items-center gap-1.5">
                  <Info size={13} strokeWidth={2.5} />
                  <span>Increase quantity to {product.minBulkUnits}+ units to unlock bulk pricing at ₹{product.bulkPrice.toLocaleString('en-IN')}/{product.unit || 'unit'}!</span>
                </div>
              )}
            </div>

            {/* Stepper + Add Button */}
            <div className="flex gap-3 items-center">
              <div className="inline-flex items-center h-11 bg-white border-[1.5px] border-slate-300 rounded-[10px] flex-shrink-0 focus-within:border-primary-500 transition-colors">
                <button className="w-9 h-full flex items-center justify-center bg-slate-50 rounded-l-[8px] border-none text-slate-700 cursor-pointer hover:bg-primary-100 hover:text-primary-800 transition-colors" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={14} /></button>
                <span className="min-w-[32px] text-center font-bold text-[0.95rem] text-slate-900 px-1 select-none">{qty}</span>
                <button className="w-9 h-full flex items-center justify-center bg-slate-50 rounded-r-[8px] border-none text-slate-700 cursor-pointer hover:bg-primary-100 hover:text-primary-800 transition-colors" onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
              <button
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-[0.92rem] rounded-[10px] border-none cursor-pointer shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)] transition-all"
                onClick={handleAdd}
              >
                <ShoppingBag size={17} />
                <span>Add {qty} to Requisition Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
