import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, MessageSquare, Mail, Printer, Package, Truck } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onClearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [formData, setFormData] = useState({
    facilityName: '', contactName: '', email: '', phone: '',
    address: '', sector: 'Company', paymentTerms: 'net-30', notes: ''
  });

  if (!isOpen) return null;

  let subtotal = 0, totalSavings = 0;
  cart.forEach(item => {
    const isBulk = item.qty >= item.minBulkUnits;
    const unitPrice = isBulk ? item.bulkPrice : item.price;
    subtotal += unitPrice * item.qty;
    if (isBulk) totalSavings += (item.price - item.bulkPrice) * item.qty;
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
    text += `*Delivery Address:* ${formData.address || 'Hosur / TN'}\n\n*Order Items:*\n`;
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
    window.open(`https://wa.me/919487000000?text=${encodeURIComponent(generateOrderSummaryText())}`, '_blank');
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
      orderNumber, itemsCount: cart.reduce((acc, curr) => acc + curr.qty, 0),
      totalAmount: total, facility: formData.facilityName || 'Institutional Partner', items: [...cart]
    });
    setIsCheckingOut(false);
    onClearCart();
  };
  const handleCloseAll = () => { setOrderSuccess(null); setIsCheckingOut(false); onClose(); };

  const inputCls = "w-full px-3 py-2.5 border border-slate-300 rounded-[8px] text-[0.88rem] text-slate-800 bg-white outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/15 transition-all font-[inherit]";
  const labelCls = "block text-[0.8rem] font-semibold text-slate-700 mb-1";

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-[4px] z-[100] flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[460px] h-full bg-white flex flex-col animate-slide-in shadow-[-10px_0_30px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-primary-700" />
            <h3 className="text-[1.15rem] font-bold text-slate-900">Wholesale Requisition Order</h3>
          </div>
          <button
            className="bg-transparent border-none text-slate-500 cursor-pointer p-1.5 rounded-md hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center"
            onClick={handleCloseAll}
            aria-label="Close requisition drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* === SUCCESS VIEW === */}
        {orderSuccess ? (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 mt-4">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-[1.35rem] font-extrabold text-slate-900 mb-2">Requisition Transmitted!</h3>
            <p className="text-slate-600 text-[0.9rem] mb-5">
              Thank you, <strong>{orderSuccess.facility}</strong>. Your supply requisition has been registered:
            </p>
            <div className="bg-primary-50 border border-primary-200 text-primary-800 font-bold text-[1.1rem] px-5 py-2.5 rounded-full mb-5">
              {orderSuccess.orderNumber}
            </div>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-4 mb-6 text-left">
              {[
                { label: 'Total Items Ordered:', val: `${orderSuccess.itemsCount} units` },
                { label: 'Estimated Invoice Total:', val: `₹${orderSuccess.totalAmount.toLocaleString('en-IN')}`, highlight: true },
                { label: 'Fulfillment Hub:', val: 'Zuzuwadi, Hosur (TN)' },
              ].map(({ label, val, highlight }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 text-[0.88rem]">
                  <span className="text-slate-600">{label}</span>
                  <strong className={highlight ? 'text-primary-700 text-[1rem]' : 'text-slate-900'}>{val}</strong>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <button className="btn-whatsapp w-full flex items-center justify-center gap-2 font-semibold text-[0.95rem] py-3 rounded-[10px] transition-all" onClick={handleWhatsAppOrder}>
                <MessageSquare size={17} /><span>Confirm on WhatsApp (Instant Reply)</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold text-[0.95rem] py-3 rounded-[10px] hover:bg-slate-50 transition-all" onClick={() => window.print()}>
                <Printer size={16} /><span>Print Requisition Slip</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-slate-200 text-slate-600 font-semibold text-[0.9rem] py-2.5 rounded-[10px] hover:bg-slate-50 transition-all" onClick={handleCloseAll}>
                Return to Product Catalog
              </button>
            </div>
          </div>

        /* === CHECKOUT FORM === */
        ) : isCheckingOut ? (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Back bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200 flex-shrink-0">
              <button className="bg-transparent border-none text-primary-700 font-semibold text-[0.88rem] cursor-pointer hover:text-primary-800 transition-colors" onClick={() => setIsCheckingOut(false)}>
                ← Edit Order Items
              </button>
              <span className="text-[0.82rem] text-slate-500 font-semibold">Wholesale Requisition</span>
            </div>
            <form onSubmit={handleSubmitOrder} className="p-5 flex flex-col gap-4">
              <div>
                <h4 className="text-[1rem] font-bold text-slate-900">Institution & Delivery Information</h4>
                <p className="text-[0.8rem] text-slate-500 mt-0.5">We will prepare your dispatch challan and send confirmation.</p>
              </div>
              <div>
                <label className={labelCls}>Company / Institution / School Name *</label>
                <input type="text" name="facilityName" required placeholder="e.g. Apex Precision Motors / St. Xavier School" value={formData.facilityName} onChange={handleInputChange} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Contact Person *</label>
                  <input type="text" name="contactName" required placeholder="Procurement Manager" value={formData.contactName} onChange={handleInputChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone / WhatsApp *</label>
                  <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Official Email</label>
                  <input type="email" name="email" placeholder="admin@institution.com" value={formData.email} onChange={handleInputChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Institution Sector</label>
                  <select name="sector" value={formData.sector} onChange={handleInputChange} className={inputCls}>
                    <option value="Company">Company / Manufacturing</option>
                    <option value="Office">Corporate Office / IT</option>
                    <option value="Hospital">Hospital / Clinic</option>
                    <option value="College">College / University</option>
                    <option value="School">School / Institute</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Delivery Address *</label>
                <textarea name="address" rows={2} required placeholder="Street address, SIPCOT Phase / Landmark, Pincode" value={formData.address} onChange={handleInputChange} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Special Instructions / GST / Delivery Notes</label>
                <textarea name="notes" rows={2} placeholder="Any specific delivery hours or packaging preferences" value={formData.notes} onChange={handleInputChange} className={inputCls} />
              </div>
              {/* Mini Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-[10px] p-3.5 text-[0.85rem]">
                <div className="flex justify-between mb-1.5"><span className="text-slate-600">Requisition Items:</span><strong>{cart.reduce((a,b) => a+b.qty, 0)} units</strong></div>
                <div className="flex justify-between mb-1.5"><span className="text-slate-600">Wholesale Discount Savings:</span><strong className="text-emerald-600">-₹{totalSavings.toLocaleString('en-IN')}</strong></div>
                <div className="flex justify-between text-[0.95rem] font-extrabold text-slate-900 border-t border-slate-200 pt-2 mt-1">
                  <span>Estimated Total:</span><span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-[0.95rem] py-3 rounded-[10px] shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:-translate-y-0.5 transition-all">
                  Submit Official Wholesale Requisition
                </button>
                <button type="button" className="btn-whatsapp w-full flex items-center justify-center gap-2 font-semibold text-[0.9rem] py-2.5 rounded-[10px] transition-all" onClick={handleWhatsAppOrder}>
                  <MessageSquare size={17} /><span>Send Order via WhatsApp Directly</span>
                </button>
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold text-[0.9rem] py-2.5 rounded-[10px] hover:bg-slate-50 transition-all" onClick={handleEmailRFQ}>
                  <Mail size={16} /><span>Email to jasvienterprises28@gmail.com</span>
                </button>
              </div>
            </form>
          </div>

        /* === CART LIST === */
        ) : (
          <>
            {/* Free Shipping Bar */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex-shrink-0">
              <div className="flex justify-between text-[0.8rem] font-semibold mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  {isFreeShipping ? (
                    <><Truck size={14} className="text-emerald-600" /><span className="text-emerald-700">Free Regional Delivery Qualified!</span></>
                  ) : (
                    <span className="text-slate-600">Add ₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more for FREE Delivery</span>
                  )}
                </span>
                <span className="text-slate-500">₹{subtotal.toLocaleString('en-IN')} / ₹{freeShippingThreshold.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="progress-bar-fill h-full" style={{ width: `${progressToFree}%` }} />
              </div>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <ShoppingBag size={48} className="text-slate-300 mb-4" />
                <h4 className="text-lg font-bold text-slate-700 mb-2">Your Requisition List is Empty</h4>
                <p className="text-slate-500 text-[0.88rem] mb-5">Browse our stationery and housekeeping supplies catalog to add bulk items.</p>
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold text-[0.88rem] px-4 py-2 rounded-[8px] shadow-sm hover:-translate-y-0.5 transition-all" onClick={onClose}>
                  Explore Wholesale Catalog
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {cart.map(item => {
                  const isBulk = item.qty >= item.minBulkUnits;
                  const unitPrice = isBulk ? item.bulkPrice : item.price;
                  const itemTotal = unitPrice * item.qty;
                  return (
                    <div key={item.id} className="flex gap-3 p-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-[8px] object-cover flex-shrink-0 border border-slate-100" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-semibold text-[0.88rem] text-slate-900 leading-snug line-clamp-2">{item.name}</h4>
                          <button className="flex-shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors" onClick={() => onRemoveItem(item.id)} aria-label={`Remove ${item.name}`}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-[0.76rem] text-slate-500 mt-0.5 mb-2">
                          <Package size={12} strokeWidth={2} /><span>{item.packageSize}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          {/* Stepper */}
                          <div className="inline-flex items-center h-8 bg-white border border-slate-300 rounded-[8px] shadow-sm">
                            <button className="w-7 h-full flex items-center justify-center bg-slate-50 rounded-l-[7px] text-slate-700 border-none cursor-pointer hover:bg-primary-100 hover:text-primary-800 transition-colors" onClick={() => onUpdateQty(item.id, item.qty - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                            <span className="min-w-[28px] text-center font-bold text-[0.85rem] text-slate-900 select-none">{item.qty}</span>
                            <button className="w-7 h-full flex items-center justify-center bg-slate-50 rounded-r-[7px] text-slate-700 border-none cursor-pointer hover:bg-primary-100 hover:text-primary-800 transition-colors" onClick={() => onUpdateQty(item.id, item.qty + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                          </div>
                          {/* Pricing */}
                          <div className="text-right">
                            <div className="text-[0.75rem] text-slate-500">₹{unitPrice.toLocaleString('en-IN')} / {item.unit || 'unit'}</div>
                            <div className="font-bold text-[0.95rem] text-slate-900">₹{itemTotal.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                        {isBulk && (
                          <div className="mt-1.5 text-[0.72rem] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block">
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
              <div className="flex-shrink-0 border-t border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-2 mb-4 text-[0.88rem]">
                  <div className="flex justify-between text-slate-600"><span>Requisition Subtotal:</span><span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span></div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold"><span>Wholesale Tier Savings:</span><span>-₹{totalSavings.toLocaleString('en-IN')}</span></div>
                  )}
                  <div className="flex justify-between text-slate-600"><span>Hosur Regional Freight:</span><span>{isFreeShipping ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingCost}`}</span></div>
                  <div className="flex justify-between font-extrabold text-[1rem] text-slate-900 border-t border-slate-200 pt-2 mt-1"><span>Estimated Total:</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-[0.95rem] py-3 rounded-[10px] shadow-[0_4px_14px_rgba(13,148,136,0.35)] hover:-translate-y-0.5 transition-all" onClick={() => setIsCheckingOut(true)}>
                    <span>Proceed to Requisition RFQ</span><ArrowRight size={17} />
                  </button>
                  <button className="btn-whatsapp w-full flex items-center justify-center gap-2 font-semibold text-[0.9rem] py-2.5 rounded-[10px] transition-all" onClick={handleWhatsAppOrder}>
                    <MessageSquare size={17} /><span>Quick Order on WhatsApp</span>
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
