import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle, 
  FileSpreadsheet, 
  MessageSquare, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ClipboardList, 
  Sparkles, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  Truck, 
  FileText,
  PackageCheck
} from 'lucide-react';
import { submitLead, exportLeadsToExcel, generateWhatsAppQuoteText } from '../services/leadService';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { LEAD_CONFIG, getWhatsAppUrl } from '../config/leadConfig';

const POPULAR_SUPPLIES_TAGS = [
  { id: 'a4-paper', label: 'A4 Copier Paper (JK / Reams)', icon: '📄' },
  { id: 'files', label: 'Office Files & Registers', icon: '📁' },
  { id: 'floor-cleaner', label: 'Floor Cleaner 5L Cans', icon: '🧪' },
  { id: 'disinfectant', label: 'Disinfectant Concentrate 5L', icon: '🛡️' },
  { id: 'hand-soap', label: 'Liquid Hand Soap & Sanitizers', icon: '🧼' },
  { id: 'garbage-bags', label: 'Heavy Duty Garbage Bags', icon: '🗑️' },
  { id: 'mops-brooms', label: 'Industrial Mops & Brooms', icon: '🧹' },
  { id: 'restock', label: 'Complete Monthly Restock', icon: '⚡' }
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

  const toggleTag = (tagLabel) => {
    setFormData(prev => {
      const exists = prev.selectedTags.includes(tagLabel);
      const updatedTags = exists 
        ? prev.selectedTags.filter(t => t !== tagLabel)
        : [...prev.selectedTags, tagLabel];
      return { ...prev, selectedTags: updatedTags };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
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
    window.open(getWhatsAppUrl(text), '_blank');
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

  const inputClass = "w-full pl-10 pr-3.5 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-3 focus:ring-teal-500/15 transition-all duration-200 shadow-2xs hover:border-slate-300";
  const labelClass = "block text-xs sm:text-sm font-bold text-slate-800 mb-1.5";

  return (
    <section 
      id="lead-form" 
      ref={sectionRef}
      className="py-12 sm:py-20 bg-slate-50/80 border-t border-slate-200 relative overflow-hidden scroll-mt-20"
    >
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-400/10 to-emerald-400/10 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-sky-400/10 to-teal-400/10 blur-[100px] pointer-events-none animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
            <Sparkles size={14} className="text-teal-600 animate-spin-slow" />
            <span>Instant Wholesale Lead RFQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Request Your Wholesale Price Quotation
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Direct institutional pricing for companies, offices, hospitals, colleges & factories in Hosur.
          </p>
        </div>

        {/* Enhanced Form Container (Balanced & Attractive) */}
        <div className={`rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-300/40 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-950/10 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
        }`}>

          {/* Top Multi-Stop Animated Gradient Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-500" />

          {submittedLead ? (
            /* ── SUCCESS STATE ── */
            <div className="text-center p-8 sm:p-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-600 mb-4 shadow-lg shadow-emerald-950/20 animate-bounce">
                <CheckCircle size={36} />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                Quotation Request Transmitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
                Thank you, <strong className="text-slate-900">{submittedLead.facilityName || 'Valued Partner'}</strong>. Your requisition is registered under Reference ID:
              </p>

              {/* Reference ID Pill */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-base font-mono font-bold mb-6 shadow-2xs">
                <span>{submittedLead.id}</span>
              </div>

              {/* Summary Card */}
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-4.5 mb-6 text-left text-xs sm:text-sm text-slate-700 space-y-2 shadow-2xs">
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Contact Person:</span>
                  <strong className="text-slate-900">{submittedLead.contactName} ({submittedLead.phone})</strong>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Institution Sector:</span>
                  <strong className="text-teal-700">{submittedLead.sector}</strong>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Delivery Hub:</span>
                  <strong className="text-slate-900">{LEAD_CONFIG.fullAddress}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Materials Requested:</span>
                  <span className="text-slate-700 leading-relaxed font-medium">{submittedLead.itemsSummary}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppConfirm}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] cursor-pointer border-none"
                >
                  <MessageSquare size={16} />
                  <span>Confirm on WhatsApp (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadExcel}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 transition-all hover:scale-[1.02] cursor-pointer border-none"
                >
                  <FileSpreadsheet size={16} />
                  <span>Download Requisition (.csv)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors cursor-pointer bg-transparent border-none"
              >
                <RefreshCw size={13} />
                <span>Submit Another Requisition</span>
              </button>
            </div>
          ) : (
            /* ── LEAD INPUT FORM ── */
            <form onSubmit={handleSubmit} className="p-6 sm:p-9 lg:p-10 space-y-6">
              
              {/* Form Sub-Header with Status Chip */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                  <span>Hosur B2B Institutional Requisition Form</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold">
                  <PackageCheck size={13} className={formData.selectedTags.length > 0 ? "text-teal-600" : "text-slate-400"} />
                  <span>{formData.selectedTags.length} supplies tagged</span>
                </div>
              </div>

              {/* Row 1: Facility & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className={labelClass}>
                    <span>Company / Institution / Factory Name *</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                      <Building2 size={16} />
                    </div>
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
                </div>

                <div>
                  <label className={labelClass}>
                    <span>Contact Person Name *</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                      <User size={16} />
                    </div>
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
              </div>

              {/* Row 2: Phone, Email/GSTIN & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className={labelClass}>
                    <span>Phone / WhatsApp No. *</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                      <Phone size={16} />
                    </div>
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
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="whitespace-nowrap">Email / GSTIN (Optional)</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                      <Mail size={16} />
                    </div>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="purchase@org.com or GSTIN"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <span>Buyer / Organization Type *</span>
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-3 focus:ring-teal-500/15 transition-all duration-200 shadow-2xs hover:border-slate-300"
                  >
                    <option value="Company">Company / Manufacturing Plant</option>
                    <option value="Office">Corporate Office / IT Park</option>
                    <option value="Hospital">Hospital / Healthcare Facility</option>
                    <option value="College">College / Educational University</option>
                    <option value="School">School / Educational Institute</option>
                    <option value="Factory">Industrial Factory / Warehouse</option>
                  </select>
                </div>
              </div>

              {/* Quick Material Needs Interactive Tags */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <ClipboardList size={16} className="text-teal-600" />
                    <span>Select Key Materials Required (Click to toggle):</span>
                  </label>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">Multiple tags supported</span>
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {POPULAR_SUPPLIES_TAGS.map(tag => {
                    const isSelected = formData.selectedTags.includes(tag.label);
                    return (
                      <button
                        type="button"
                        key={tag.id}
                        onClick={() => toggleTag(tag.label)}
                        className={`group text-xs font-semibold px-3 py-2 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-600 shadow-sm shadow-teal-700/25 scale-[1.02]'
                            : 'bg-slate-50/90 text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-900 hover:shadow-2xs active:scale-[0.98]'
                        }`}
                      >
                        <span className="text-sm shrink-0">{tag.icon}</span>
                        <span>{tag.label}</span>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ml-1 transition-all ${
                          isSelected ? 'bg-white text-teal-700' : 'bg-slate-200 text-slate-600 group-hover:bg-teal-200 group-hover:text-teal-800'
                        }`}>
                          {isSelected ? <Check size={10} strokeWidth={3} /> : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Delivery Location & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className={labelClass}>
                    <span>Delivery Location & Factory Address in Hosur *</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                      <MapPin size={16} />
                    </div>
                    <textarea
                      name="address"
                      rows={3}
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Plot / Street, SIPCOT Phase I or II / Zuzuwadi / Landmark, Hosur"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-3 focus:ring-teal-500/15 transition-all duration-200 shadow-2xs hover:border-slate-300 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <span>Estimated Monthly or Bulk Order Volume</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                      <FileText size={16} />
                    </div>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Need 25 cartons A4 JK Paper & 10 cans 5L Floor cleaner monthly"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-3 focus:ring-teal-500/15 transition-all duration-200 shadow-2xs hover:border-slate-300 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA with Radiant Gradient & Hover Light Sweep Animation */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base sm:text-lg font-extrabold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-lg shadow-teal-700/25 hover:shadow-teal-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 relative overflow-hidden group cursor-pointer disabled:opacity-60 border-none"
                >
                  {/* Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{isSubmitting ? 'Registering Your Wholesale Requisition...' : 'Submit Wholesale Quote Request'}</span>
                </button>

                {/* Assurance & Trust Badges */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-500 font-medium text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-600">
                    <Truck size={13} className="text-teal-600 shrink-0" />
                    <span>Same-Day Hosur Dispatch</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-slate-600">
                    <ShieldCheck size={13} className="text-teal-600 shrink-0" />
                    <span>Official GST Invoicing</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-slate-600">
                    <CheckCircle size={13} className="text-teal-600 shrink-0" />
                    <span>Direct Mill/Wholesale Rates</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-slate-600">
                    <FileSpreadsheet size={13} className="text-teal-600 shrink-0" />
                    <span>Excel Requisition Export</span>
                  </div>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
