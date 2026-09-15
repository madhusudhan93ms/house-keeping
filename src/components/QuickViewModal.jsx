import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const isBulk = qty >= product.minBulkUnits;
  const unitPrice = isBulk ? product.bulkPrice : product.price;

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
            <div style={{ width: '100%', height: 260, background: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', border: '1px solid var(--slate-200)', marginBottom: '1rem' }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            
            <div style={{ background: 'var(--primary-50)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={20} color="var(--primary-700)" />
              <div style={{ fontSize: '0.82rem', color: 'var(--primary-900)' }}>
                <strong>Quality Guaranteed:</strong> Verified for industrial cleaning safety & compliance.
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
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)' }}>
                {product.rating} ({product.reviewsCount} facility reviews)
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Specifications Box */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--slate-700)', marginBottom: '0.5rem' }}>
                Technical Specifications & Standards:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {product.specs?.map((spec, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--slate-600)' }}>
                    <CheckCircle size={14} color="var(--primary-600)" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Details */}
            <div style={{ background: 'var(--slate-50)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    ${unitPrice.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginLeft: 4 }}>
                    / {product.packageSize}
                  </span>
                </div>
                {isBulk && (
                  <span className="badge badge-green">
                    Wholesale Applied (-${(product.price - product.bulkPrice).toFixed(2)})
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: 4 }}>
                Bulk pricing: <strong>${product.bulkPrice.toFixed(2)}</strong> for orders of {product.minBulkUnits}+ units.
              </div>
            </div>

            {/* Quantity and Add */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <input type="text" readOnly value={qty} className="qty-input" />
                <button className="qty-btn" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>

              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd}>
                <ShoppingBag size={18} />
                <span>Add {qty} to Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
