import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, MessageSquare, Mail, Printer, Package, Truck } from 'lucide-react';

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
    sector: 'Company',
    paymentTerms: 'net-30',
    notes: ''
  });

  if (!isOpen) return null;

  // Calculate pricing & bulk savings in INR
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

  const freeShippingThreshold = 4000;
  const isFreeShipping = subtotal >= freeShippingThreshold || cart.length === 0;
  const shippingCost = isFreeShipping ? 0 : 250;
  const total = subtotal + shippingCost;
  const progressToFree = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateOrderSummaryText = () => {
    let text = `*JASVI ENTERPRISES - WHOLESALE REQUISITION*\n`;
    text += `*Institution:* ${formData.facilityName || 'Valued Client'}\n`;
    text += `*Contact:* ${formData.contactName} (${formData.phone || 'N/A'})\n`;
    text += `*Delivery Address:* ${formData.address || 'Hosur / TN'}\n\n`;
    text += `*Order Items:*\n`;
    cart.forEach((item, index) => {
      const isBulk = item.qty >= item.minBulkUnits;
      const price = isBulk ? item.bulkPrice : item.price;
      text += `${index + 1}. ${item.name} - Qty: ${item.qty} × ₹${price} = ₹${item.qty * price}\n`;
    });
    text += `\n*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}`;
    text += `\n*Wholesale Savings:* ₹${totalSavings.toLocaleString('en-IN')}`;
    text += `\n*Estimated Total:* ₹${total.toLocaleString('en-IN')}`;
    if (formData.notes) text += `\n*Notes:* ${formData.notes}`;
    return text;
  };

  const handleWhatsAppOrder = () => {
    const orderText = generateOrderSummaryText();
    const encoded = encodeURIComponent(orderText);
    window.open(`https://wa.me/919487000000?text=${encoded}`, '_blank');
  };

  const handleEmailRFQ = () => {
    const subject = encodeURIComponent(`Wholesale Supply RFQ: ${formData.facilityName || 'Requisition Order'}`);
    const body = encodeURIComponent(generateOrderSummaryText());
    window.open(`mailto:jasvienterprises28@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderNumber = `JE-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccess({
      orderNumber,
      itemsCount: cart.reduce((acc, curr) => acc + curr.qty, 0),
      totalAmount: total,
      facility: formData.facilityName || 'Institutional Partner',
      items: [...cart]
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
            <h3>Wholesale Requisition Order</h3>
          </div>
          <button className="close-btn" onClick={handleCloseAll} aria-label="Close requisition drawer">
            <X size={20} />
          </button>
        </div>

        {/* Success Confirmation View */}
        {orderSuccess ? (
          <div className="order-success-view">
            <div className="success-icon-circle">
              <CheckCircle size={40} />
            </div>
            <h3 className="success-title">
              Requisition Transmitted!
            </h3>
            <p className="success-subtitle">
              Thank you, <strong>{orderSuccess.facility}</strong>. Your stationery & housekeeping supply requisition has been registered with Jasvi Enterprises:
            </p>

            <div className="order-ref-badge">
              {orderSuccess.orderNumber}
            </div>

            <div className="order-success-card">
              <div className="success-stat-row">
                <span>Total Items Ordered:</span>
                <strong>{orderSuccess.itemsCount} units</strong>
              </div>
              <div className="success-stat-row">
                <span>Estimated Invoice Total:</span>
                <strong style={{ color: 'var(--primary-700)', fontSize: '1.1rem' }}>
                  ₹{orderSuccess.totalAmount.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="success-stat-row">
                <span>Fulfillment Hub:</span>
                <span>Zuzuwadi, Hosur (TN)</span>
              </div>
            </div>

            <div className="success-actions-row">
              <button 
                className="btn btn-whatsapp btn-block"
                onClick={handleWhatsAppOrder}
              >
                <MessageSquare size={17} />
                <span>Confirm on WhatsApp (Instant Reply)</span>
              </button>

              <button 
                className="btn btn-secondary btn-block"
                onClick={() => window.print()}
              >
                <Printer size={16} />
                <span>Print Requisition Slip</span>
              </button>

              <button 
                className="btn btn-outline btn-block"
                onClick={handleCloseAll}
              >
                Return to Product Catalog
              </button>
            </div>
          </div>
        ) : isCheckingOut ? (
          /* Checkout / RFQ Form View */
          <div className="checkout-form-container">
            <div className="checkout-header-bar">
              <button 
                className="back-to-cart-btn" 
                onClick={() => setIsCheckingOut(false)}
              >
                ← Edit Order Items
              </button>
              <span style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                Wholesale Requisition
              </span>
            </div>

            <form onSubmit={handleSubmitOrder} className="rfq-form">
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.2rem' }}>
                Institution & Delivery Information
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '1.25rem' }}>
                We will prepare your dispatch challan and send confirmation to your email/phone.
              </p>

              <div className="form-group">
                <label>Company / Institution / School Name *</label>
                <input 
                  type="text" 
                  name="facilityName" 
                  required 
                  placeholder="e.g. Apex Precision Motors / St. Xavier School"
                  value={formData.facilityName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Contact Person *</label>
                  <input 
                    type="text" 
                    name="contactName" 
                    required 
                    placeholder="Procurement / Admin Manager"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Official Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="admin@institution.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Institution Sector</label>
                  <select 
                    name="sector" 
                    value={formData.sector} 
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Company">Company / Manufacturing</option>
                    <option value="Office">Corporate Office / IT</option>
                    <option value="Hospital">Hospital / Clinic</option>
                    <option value="College">College / University</option>
                    <option value="School">School / Institute</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Address in Hosur / Krishnagiri / Bangalore *</label>
                <textarea 
                  name="address" 
                  rows={2} 
                  required 
                  placeholder="Street address, SIPCOT Phase / Landmark, Pincode"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Special Instructions / GST / Delivery Notes</label>
                <textarea 
                  name="notes" 
                  rows={2} 
                  placeholder="Any specific delivery hours, packaging preferences, or carton requirements"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              {/* Order Mini Summary */}
              <div className="rfq-mini-summary">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Requisition Items:</span>
                  <strong>{cart.reduce((a, b) => a + b.qty, 0)} units</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Wholesale Discount Savings:</span>
                  <strong style={{ color: '#059669' }}>-₹{totalSavings.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)', borderTop: '1px solid var(--slate-200)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                  <span>Estimated Total:</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit Official Wholesale Requisition
                </button>

                <button 
                  type="button" 
                  className="btn btn-whatsapp btn-block"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageSquare size={17} />
                  <span>Send Order via WhatsApp Directly</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-secondary btn-block"
                  onClick={handleEmailRFQ}
                >
                  <Mail size={16} />
                  <span>Email to jasvienterprises28@gmail.com</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Cart List View */
          <>
            {/* Free Delivery Bar */}
            <div className="shipping-progress-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  {isFreeShipping ? (
                    <>
                      <Truck size={14} strokeWidth={2.2} color="#059669" />
                      <span>Free Regional Delivery Qualified (Hosur & Border)!</span>
                    </>
                  ) : (
                    <span>Add ₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more for FREE Delivery</span>
                  )}
                </span>
                <span>₹{subtotal.toLocaleString('en-IN')} / ₹{freeShippingThreshold.toLocaleString('en-IN')}</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progressToFree}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="empty-cart-view">
                <ShoppingBag size={48} color="var(--slate-300)" />
                <h4>Your Requisition List is Empty</h4>
                <p>Browse our stationery and housekeeping supplies catalog to add bulk items.</p>
                <button className="btn btn-primary btn-sm" onClick={onClose}>
                  Explore Wholesale Catalog
                </button>
              </div>
            ) : (
              <div className="cart-items-scroll">
                {cart.map(item => {
                  const isBulk = item.qty >= item.minBulkUnits;
                  const unitPrice = isBulk ? item.bulkPrice : item.price;
                  const itemTotal = unitPrice * item.qty;

                  return (
                    <div key={item.id} className="cart-item-row">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="cart-item-thumbnail" 
                      />

                      <div className="cart-item-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 className="cart-item-title">{item.name}</h4>
                          <button 
                            className="item-remove-btn" 
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="cart-item-package" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Package size={12} strokeWidth={2} />
                          <span>{item.packageSize}</span>
                        </div>

                        <div className="cart-item-bottom">
                          <div className="cart-qty-stepper">
                            <button 
                              onClick={() => onUpdateQty(item.id, item.qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span>{item.qty}</span>
                            <button 
                              onClick={() => onUpdateQty(item.id, item.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <div className="cart-item-pricing">
                            <div className="cart-unit-price">
                              ₹{unitPrice.toLocaleString('en-IN')} / {item.unit || 'unit'}
                            </div>
                            <div className="cart-total-price">
                              ₹{itemTotal.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        {isBulk && (
                          <div className="cart-bulk-badge">
                            ✓ Wholesale Rate Applied (Saved ₹{((item.price - item.bulkPrice) * item.qty).toLocaleString('en-IN')})
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Requisition Subtotal:</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="summary-row savings">
                      <span>Wholesale Tier Savings:</span>
                      <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Hosur Regional Freight:</span>
                    <span>{isFreeShipping ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${shippingCost}`}</span>
                  </div>

                  <div className="summary-row grand-total">
                    <span>Estimated Total:</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="drawer-action-buttons">
                  <button 
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => setIsCheckingOut(true)}
                  >
                    <span>Proceed to Requisition RFQ</span>
                    <ArrowRight size={17} />
                  </button>

                  <button 
                    className="btn btn-whatsapp btn-block"
                    onClick={handleWhatsAppOrder}
                    title="Send entire cart to WhatsApp"
                  >
                    <MessageSquare size={17} />
                    <span>Quick Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
