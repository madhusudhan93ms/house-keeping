import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building2, 
  MessageSquarePlus, 
  X, 
  Send,
  ThumbsUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { getPublicReviews, submitClientReview } from '../services/reviewService';

export default function ClientReviewsSection() {
  const [reviews, setReviews] = useState(() => getPublicReviews());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New Review Form State
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    facility: '',
    sector: 'Company',
    rating: 5,
    title: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingSelect = (starVal) => {
    setFormData(prev => ({ ...prev, rating: starVal }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitSuccess(false);
    setFormData({
      author: '',
      role: '',
      facility: '',
      sector: 'Company',
      rating: 5,
      title: '',
      comment: ''
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.comment.trim()) return;

    const newRev = submitClientReview(formData);
    setReviews(prev => [newRev, ...prev]);
    setSubmitSuccess(true);

    setTimeout(() => {
      handleCloseModal();
    }, 2500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-teal-600" />
              <span>Verified Client Testimonials</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trusted by Leading Companies, Schools &amp; Hospitals in Hosur
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Read real feedback from procurement managers, factory stores heads, and administrative superintendents who rely on Jasvi Enterprises for monthly wholesale restocks.
            </p>
          </div>

          {/* Action CTA & Aggregate Rating */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" stroke="none" />
                  ))}
                  <span className="font-extrabold text-slate-900 text-sm ml-1.5">4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Over 45+ B2B Deliveries in Hosur
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquarePlus size={16} />
              <span>Write a Client Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {reviews.slice(0, 4).map((rev) => (
            <div 
              key={rev.id}
              className="relative p-6 sm:p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-teal-300 hover:shadow-md hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 text-slate-200 group-hover:text-teal-200 transition-colors pointer-events-none" size={38} />

              <div>
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < rev.rating ? "currentColor" : "none"} 
                        stroke={i < rev.rating ? "none" : "#cbd5e1"} 
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100/70 border border-teal-200 px-2 py-0.5 rounded-md">
                    <CheckCircle2 size={12} className="text-teal-600" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Review Title & Comment */}
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug">
                  "{rev.title}"
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Organization */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {rev.author}
                  </h4>
                  <div className="text-slate-500 font-medium">
                    {rev.role} • <strong className="text-slate-700">{rev.facility}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 shrink-0">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-slate-600 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-teal-600 shrink-0" />
            <span>Official wholesale vouchers &amp; delivery challans provided with every order.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>• SIPCOT Phase I &amp; II</span>
            <span>• Roja Nagar / Zuzuvadi</span>
            <span>• Bagalur Road &amp; Hosur Hub</span>
          </div>
        </div>

      </div>

      {/* Write a Review Modal (Strictly dismissible only via X mark or Cancel button) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-800 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Top-Right X Mark Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none"
              aria-label="Close modal"
              title="Close modal"
            >
              <X size={20} />
            </button>

            {submitSuccess ? (
              <div className="py-8 flex flex-col items-center text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mb-6">
                  Your wholesale review has been successfully submitted and recorded.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-500 transition-all cursor-pointer shadow-md shadow-teal-700/20"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center">
                    <MessageSquarePlus size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      Submit Your Wholesale Experience
                    </h3>
                    <p className="text-xs text-slate-500">
                      Share your experience working with Jasvi Enterprises in Hosur
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitReview} className="mt-5 space-y-4 text-xs sm:text-sm">
                  
                  {/* Star Rating Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleRatingSelect(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star 
                            size={24} 
                            fill={star <= formData.rating ? "currentColor" : "none"} 
                            stroke={star <= formData.rating ? "none" : "#cbd5e1"} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {formData.rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="author"
                        required
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Role / Designation
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g. Purchase Manager"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / School / Hospital Name *
                      </label>
                      <input
                        type="text"
                        name="facility"
                        required
                        value={formData.facility}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Auto Plant, SIPCOT"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Sector Type
                      </label>
                      <select
                        name="sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                      >
                        <option value="Company">Manufacturing / Company</option>
                        <option value="Office">Corporate Office</option>
                        <option value="Hospital">Hospital / Healthcare</option>
                        <option value="School">School / College</option>
                        <option value="Factory">Factory / Warehouse</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Review Headline / Summary
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Excellent wholesale pricing and prompt delivery"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Comments &amp; Experience *
                    </label>
                    <textarea
                      name="comment"
                      required
                      rows={3}
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Tell us about the product quality, supply consistency, and delivery punctuality..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-1/3 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send size={15} />
                      <span>Submit Review</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
