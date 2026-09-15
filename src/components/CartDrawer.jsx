import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, Truck, FileText } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart 
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [formData, setFormData] = useState({
    facilityName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    poNumber: '',
    paymentTerms: 'net-30',
    cadence: 'one-time',
    notes: ''
  });

  if (!isOpen) return null;

  // Calculate pricing & bulk savings
  let subtotal = 0;
  let totalSavings = 0;

  cart.forEach(item => {
    const isBulk = item.qty >= item.minBulkUnits;
    const unitPrice = isBulk ? item.bulkPrice : item.price;
    subtotal += unitPrice * item.qty;
    if (isBulk) {
      totalSavings += (item.price - item.bulkPrice) * item.qty;
    }
  });

  const freeShippingThreshold = 350;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 24.95;
  const total = subtotal + shippingCost;
  const progressToFree = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderNumber = `PO-HK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess({
      orderNumber,
      itemsCount: cart.reduce((acc, curr) => acc + curr.qty, 0),
      totalAmount: total,
      facility: formData.facilityName || 'Commercial Partner'
    });
    setIsCheckingOut(false);
    onClearCart();
  };

  const handleCloseAll = () => {
    setOrderSuccess(null);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--primary-700)" />
            <h3>Housekeeping Requisition</h3>
          </div>
          <button className="close-btn" onClick={handleCloseAll} aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>

        {/* Success Confirmation View */}
        {orderSuccess ? (
          <div style={{ padding: '2.5rem 1.75rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '1.25rem' }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
              Order Request Transmitted!
            </h3>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Thank you, <strong>{orderSuccess.facility}</strong>. Your housekeeping supply requisition has been assigned reference:
            </p>

            <div style={{ background: 'var(--slate-100)', padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--slate-300)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary-700)', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
              {orderSuccess.orderNumber}
            </div>

            <div style={{ background: 'var(--primary-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', fontSize: '0.84rem', color: 'var(--primary-900)', textAlign: 'left', width: '100%', marginBottom: '2rem' }}>
              <div>📦 Total Material Units: <strong>{orderSuccess.itemsCount}</strong></div>
              <div style={{ marginTop: '0.35rem' }}>💰 Authorized Estimate: <strong>${orderSuccess.totalAmount.toFixed(2)}</strong></div>
              <div style={{ marginTop: '0.35rem' }}>⏱️ Dispatch Window: <strong>Next Business Morning</strong></div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCloseAll}>
              Continue Shopping
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout / PO Submission Form */
          <form onSubmit={handleSubmitOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="drawer-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.9rem' }}>
                <FileText size={18} />
                <span>Commercial Account Requisition Details</span>
              </div>

              <div className="form-group">
                <label className="form-label">Facility / Company Name *</label>
                <input 
                  type="text" 
                  name="facilityName" 
                  required 
                  placeholder="e.g. Grand Horizon Hotel & Spa" 
                  className="form-input"
                  value={formData.facilityName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person Name *</label>
                <input 
                  type="text" 
                  name="contactName" 
                  required 
                  placeholder="e.g. Jane Miller (Director of Housekeeping)" 
                  className="form-input"
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Email for SDS & Invoicing *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="housekeeping@hotelgroup.com" 
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Loading Dock / Street Address *</label>
                <input 
                  type="text" 
                  name="address" 
                  required 
                  placeholder="Loading Dock B, 1400 Boulevard Way, NY" 
                  className="form-input"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Internal PO / Requisition Reference (Optional)</label>
                <input 
                  type="text" 
                  name="poNumber" 
                  placeholder="e.g. PO-2026-094" 
                  className="form-input"
                  value={formData.poNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Billing Terms</label>
                <select 
                  name="paymentTerms" 
                  className="form-input"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                >
                  <option value="net-30">Commercial Net-30 Invoicing</option>
                  <option value="credit-card">Credit Card on File</option>
                  <option value="ach-wire">ACH / Wire Transfer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Restock Schedule</label>
                <select 
                  name="cadence" 
                  className="form-input"
                  value={formData.cadence}
                  onChange={handleInputChange}
                >
                  <option value="one-time">One-Time Restock Delivery</option>
                  <option value="bi-weekly">Recurring: Every 2 Weeks (-5% off)</option>
                  <option value="monthly">Recurring: Monthly Restock (-5% off)</option>
                </select>
              </div>
            </div>

            <div className="drawer-footer">
              <div className="summary-total" style={{ marginTop: 0, paddingTop: 0, border: 'none', marginBottom: '1rem' }}>
                <span>Order Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => setIsCheckingOut(false)}
                >
                  Back to List
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 2 }}
                >
                  Confirm & Transmit PO
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Standard Cart Items View */
          <>
            {/* Free Freight Tracker */}
            <div style={{ padding: '0.85rem 1.5rem', background: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--slate-700)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Truck size={14} color="var(--primary-600)" />
                  {isFreeShipping ? '🎉 Free Commercial Freight Unlocked!' : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} for Free Freight`}
                </span>
                <span>{progressToFree.toFixed(0)}%</span>
              </div>
              <div style={{ width: '100%', height: 6, background: 'var(--slate-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${progressToFree}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-600), var(--accent-cyan))', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* Cart Items Scroll Area */}
            <div className="drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--slate-500)' }}>
                  <ShoppingBag size={48} color="var(--slate-300)" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Your order list is empty</h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Select cleaning chemicals, mops, carts, and paper liners from the catalog to build your facility order.
                  </p>
                </div>
              ) : (
                cart.map(item => {
                  const isBulk = item.qty >= item.minBulkUnits;
                  const unitPrice = isBulk ? item.bulkPrice : item.price;
                  const lineTotal = unitPrice * item.qty;

                  return (
                    <div key={item.id} className="cart-item-row">
                      <img src={item.image} alt={item.name} className="cart-item-thumb" />
                      
                      <div className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: 2 }}>
                          {item.packageSize}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: 4 }}>
                          <span style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9rem' }}>
                            ${unitPrice.toFixed(2)} ea
                          </span>
                          {isBulk && (
                            <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                              Bulk Tier
                            </span>
                          )}
                        </div>

                        {/* Stepper Inside Cart */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.65rem' }}>
                          <div className="qty-control" style={{ transform: 'scale(0.88)', transformOrigin: 'left' }}>
                            <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                              <Minus size={12} />
                            </button>
                            <input type="text" readOnly value={item.qty} className="qty-input" />
                            <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                              <Plus size={12} />
                            </button>
                          </div>

                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                            ${lineTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button 
                        className="cart-item-remove"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="summary-line">
                  <span>Materials Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="summary-line" style={{ color: '#059669', fontWeight: 600 }}>
                    <span>Wholesale Bulk Savings:</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Freight Delivery:</span>
                  <span>{isFreeShipping ? <strong style={{ color: '#059669' }}>FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="summary-total">
                  <span>Estimated Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1.25rem', padding: '0.9rem' }}
                  onClick={() => setIsCheckingOut(true)}
                >
                  <span>Proceed to Commercial Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
