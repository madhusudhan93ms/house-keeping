import React, { useState } from 'react';
import { Send, CheckCircle, FileSpreadsheet, MessageSquare, Building2, User, Phone, Mail, MapPin, ClipboardList, Sparkles, RefreshCw } from 'lucide-react';
import { submitLead, exportLeadsToExcel, generateWhatsAppQuoteText } from '../services/leadService';
import { useScrollReveal } from '../hooks/useScrollReveal';

const POPULAR_SUPPLIES_TAGS = [
  'A4 Copier Paper (JK / Reams)',
  'Office Files & Registers',
  'Floor Cleaner 5L Cans',
  'Disinfectant Concentrate 5L',
  'Liquid Hand Soap & Sanitizers',
  'Heavy Duty Garbage Bags',
  'Industrial Mops & Brooms',
  'Complete Monthly Restock'
];

export default function LeadCaptureSection({ selectedSector, selectedProduct }) {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const [formData, setFormData] = useState({
    facilityName: '',
    contactName: '',
    phone: '',
    email: '',
    sector: 'Company',
    address: '',
    notes: '',
    selectedTags: []
  });

  const [prevSector, setPrevSector] = useState(selectedSector);
  const [prevProduct, setPrevProduct] = useState(selectedProduct);

  if (selectedSector && selectedSector !== prevSector) {
    setPrevSector(selectedSector);
    setFormData(prev => ({ ...prev, sector: selectedSector }));
  }

  if (selectedProduct && selectedProduct !== prevProduct) {
    setPrevProduct(selectedProduct);
    const itemText = `${selectedProduct.name} (${selectedProduct.packageSize})`;
    setFormData(prev => ({
      ...prev,
      notes: prev.notes ? `${prev.notes}\nInquiry item: ${itemText}` : `Inquiry item: ${itemText}`
    }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag) => {
    setFormData(prev => {
      const exists = prev.selectedTags.includes(tag);
      const updatedTags = exists 
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      return { ...prev, selectedTags: updatedTags };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Build cart items array from selected tags and notes
      const itemsList = formData.selectedTags.map(tag => ({
        id: `tag-${tag}`,
        name: tag,
        qty: 1,
        unit: 'Wholesale lot',
        packageSize: 'Standard pack'
      }));

      if (selectedProduct && !itemsList.some(i => i.name === selectedProduct.name)) {
        itemsList.push({
          id: selectedProduct.id,
          name: selectedProduct.name,
          qty: 1,
          unit: selectedProduct.unit || 'unit',
          packageSize: selectedProduct.packageSize || 'standard'
        });
      }

      const leadRecord = await submitLead(formData, itemsList);
      setSubmittedLead(leadRecord);
    } catch (err) {
      console.error('Failed to submit quote lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppConfirm = () => {
    if (!submittedLead) return;
    const text = generateWhatsAppQuoteText(submittedLead);
    window.open(`https://wa.me/919487000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadExcel = () => {
    if (submittedLead) {
      exportLeadsToExcel([submittedLead]);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setFormData({
      facilityName: '',
      contactName: '',
      phone: '',
      email: '',
      sector: 'Company',
      address: '',
      notes: '',
      selectedTags: []
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all";
  const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";

  return (
    <section 
      id="lead-form"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden scroll-mt-20"
    >
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-teal-400" />
            <span>Instant Wholesale Lead RFQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Request Your Wholesale Price Quotation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Fill out your institutional requirements below. Our Hosur distribution team will prepare your customized B2B quote with volume discounts and dispatch timelines.
          </p>
        </div>

        {/* Form Container */}
        <div className={`rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-teal-500/30 p-6 sm:p-10 shadow-2xl shadow-teal-950/40 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`}>

          {submittedLead ? (
            /* ── SUCCESS STATE ── */
            <div className="text-center py-6 sm:py-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mb-5 shadow-lg shadow-emerald-950/40 animate-bounce">
                <CheckCircle size={36} />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Quotation Request Transmitted!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                Thank you, <strong className="text-white">{submittedLead.facilityName || 'Valued Partner'}</strong>. Your supply requisition is recorded under Reference ID:
              </p>

              {/* Reference ID Pill */}
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500/20 border border-teal-400/50 text-teal-300 text-lg font-mono font-extrabold mb-8 shadow-inner">
                <span>{submittedLead.id}</span>
              </div>

              {/* Summary Card */}
              <div className="w-full max-w-md bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-8 text-left text-xs sm:text-sm text-slate-300 space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-500">Contact Person:</span>
                  <strong className="text-white">{submittedLead.contactName} ({submittedLead.phone})</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-500">Institution Sector:</span>
                  <strong className="text-teal-300">{submittedLead.sector}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-500">Delivery Hub:</span>
                  <strong className="text-white">OSS Roja Nagar, Zuzuwadi, Hosur</strong>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Materials Requested:</span>
                  <span className="text-slate-300 leading-relaxed">{submittedLead.itemsSummary}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppConfirm}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer border-none"
                >
                  <MessageSquare size={17} />
                  <span>Confirm on WhatsApp (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-950/50 transition-all cursor-pointer border-none"
                >
                  <FileSpreadsheet size={17} />
                  <span>Download Requisition Excel (.csv)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-300 transition-colors cursor-pointer bg-transparent border-none"
              >
                <RefreshCw size={13} />
                <span>Submit Another Requisition</span>
              </button>
            </div>
          ) : (
            /* ── LEAD INPUT FORM ── */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Facility & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-1">
                      <Building2 size={13} className="text-teal-400" />
                      <span>Company / Institution / School Name *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="facilityName"
                    required
                    value={formData.facilityName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apex Precision Motors / St. Xavier School"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-1">
                      <User size={13} className="text-teal-400" />
                      <span>Contact Person Name *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="e.g. Purchase Officer / Admin Manager"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 2: Phone, Email & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-1">
                      <Phone size={13} className="text-teal-400" />
                      <span>Phone / WhatsApp *</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-1">
                      <Mail size={13} className="text-teal-400" />
                      <span>Official Email (Optional)</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="purchase@organization.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span>Sector Type *</span>
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="Company">Company / Manufacturing</option>
                    <option value="Office">Corporate Office / IT</option>
                    <option value="Hospital">Hospital / Healthcare</option>
                    <option value="College">College / University</option>
                    <option value="School">School / Educational Institute</option>
                  </select>
                </div>
              </div>

              {/* Quick Material Needs Tags */}
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-1">
                    <ClipboardList size={13} className="text-teal-400" />
                    <span>Select Key Materials Required (Click to toggle):</span>
                  </span>
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {POPULAR_SUPPLIES_TAGS.map(tag => {
                    const isSelected = formData.selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-950/50'
                            : 'bg-slate-900/80 text-slate-400 border-slate-700/80 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Delivery Location & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} className="text-teal-400" />
                      <span>Delivery Location / Address in Hosur *</span>
                    </span>
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Plot / Street, SIPCOT Phase I or II / Landmark, Hosur"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span>Specific Monthly Volumes / Requirements</span>
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Need 20 cartons JK Paper & 10 cans Floor cleaner monthly with delivery challan"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-400 hover:to-teal-600 shadow-xl shadow-teal-950/60 hover:shadow-teal-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 border-none"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Registering Your Wholesale Requisition...' : 'Submit Wholesale Quote Request'}</span>
                </button>
                <div className="text-center text-xs text-slate-500 mt-3">
                  🔒 Data saved locally & ready for Excel export • Direct B2B Wholesale Pricing Guaranteed
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
