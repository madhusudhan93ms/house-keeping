import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(product?.minBulkUnits || 1);

  if (!product) return null;

  const isBulk = qty >= product.minBulkUnits;
  const unitPrice = isBulk ? product.bulkPrice : product.price;
  const total = unitPrice * qty;

  const handleAdd = () => {
    onAddToCart(product, qty);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <div className="quickview-grid">
          {/* Image */}
          <div>
            <div className="quickview-img-wrap">
              <img 
                src={product.image} 
                alt={product.name} 
                className="quickview-img"
              />
            </div>
            
            <div className="quickview-trust-callout">
              <ShieldCheck size={20} color="var(--primary-700)" />
              <div style={{ fontSize: '0.82rem', color: 'var(--primary-900)' }}>
                <strong>Quality Guaranteed:</strong> Sourced directly for corporate, hospital, and educational standards.
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className={`badge badge-${product.badgeColor || 'teal'}`}>{product.badge}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>SKU: {product.sku}</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
              {product.name}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.85rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={15} 
                  fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} 
                  color="#f59e0b" 
                />
              ))}
              <span style={{ fontSize: '0.85rem', fontWeight: 700, marginLeft: 4 }}>{product.rating}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>({product.reviewsCount} verified reviews)</span>
            </div>

            <div style={{ background: 'var(--slate-50)', padding: '0.65rem 0.9rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--slate-200)', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <strong>Packaging Unit:</strong> {product.packageSize}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Specifications */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                Key Specifications
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {product.specs.map((spec, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--slate-700)' }}>
                    <CheckCircle size={14} color="var(--primary-600)" style={{ flexShrink: 0 }} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Box */}
            <div style={{ background: isBulk ? 'var(--primary-50)' : 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: isBulk ? '1.5px solid var(--primary-500)' : '1px solid var(--slate-200)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Wholesale Price Rate:</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: 2 }}>
                    <span style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                      ₹{unitPrice.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>/{product.unit || 'unit'}</span>
                    {isBulk && (
                      <span style={{ textDecoration: 'line-through', fontSize: '0.9rem', color: 'var(--slate-400)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Total (Qty {qty}):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                    ₹{total.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {!isBulk && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                  💡 Tip: Increase quantity to {product.minBulkUnits}+ units to unlock bulk pricing at ₹{product.bulkPrice.toLocaleString('en-IN')}/{product.unit || 'unit'}!
                </div>
              )}
            </div>

            {/* Stepper and Add Button */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div className="quantity-stepper" style={{ height: 44 }}>
                <button 
                  className="stepper-btn" 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="stepper-value" style={{ minWidth: 32, fontSize: '0.95rem' }}>{qty}</span>
                <button 
                  className="stepper-btn" 
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button 
                className="btn btn-primary btn-block btn-lg"
                onClick={handleAdd}
                style={{ height: 44 }}
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
