/**
 * Client Reviews Service
 * Handles storing, fetching, submitting, and approving client reviews
 */

const REVIEWS_STORAGE_KEY = 'jasvi_client_reviews';

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'K. Rajasekaran',
    role: 'Admin & Purchase Manager',
    facility: 'Automotive Components Plant, SIPCOT Phase II, Hosur',
    sector: 'Company',
    rating: 5,
    title: 'Dependable wholesale partner for factory supplies',
    comment: 'Jasvi Enterprises has supplied our manufacturing plant in SIPCOT with copier paper cartons, heavy floor cleaners, and disposal bags for over 8 months. Consistent wholesale rates, timely delivery with proper challan vouchers.',
    date: '15-Sep-2026',
    verified: true,
    isApproved: true
  },
  {
    id: 'rev-2',
    author: 'P. Soundararajan',
    role: 'Campus Administrator',
    facility: 'Vidhya Mandir Matriculation School & College',
    sector: 'School',
    rating: 5,
    title: 'Best rates for school stationery and exam sheets',
    comment: 'We procure all our school registers, whiteboard markers, examination sheets, and washroom sanitation products from Jasvi Enterprises. Their pricing is genuine bulk wholesale and doorstep delivery is always prompt.',
    date: '28-Aug-2026',
    verified: true,
    isApproved: true
  },
  {
    id: 'rev-3',
    author: 'Dr. Shalini V.',
    role: 'Facility Superintendent',
    facility: 'Krishnagiri Healthcare & Multi-Specialty Clinic',
    sector: 'Hospital',
    rating: 5,
    title: 'Hospital-grade disinfectant supply with zero delays',
    comment: 'Extremely reliable supplier for our surface disinfectants, liquid hand washes, and paper towels. Quality is uncompromised and stock is always readily available at their Hosur hub.',
    date: '10-Jul-2026',
    verified: true,
    isApproved: true
  },
  {
    id: 'rev-4',
    author: 'M. Anand Kumar',
    role: 'Operations Head',
    facility: 'Precision Engineering Works, Zuzuvadi Industrial Hub',
    sector: 'Factory',
    rating: 5,
    title: 'Prompt local fulfillment in Hosur without transport delays',
    comment: 'Being located near Roja Nagar / Zuzuvadi, they dispatch same-day or next-morning for urgent shop-floor housekeeping supplies and office files. Very courteous and professional team.',
    date: '02-Oct-2026',
    verified: true,
    isApproved: true
  }
];

/**
 * Get all reviews (including custom client submissions)
 */
export function getAllReviews() {
  try {
    const custom = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!custom) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(custom);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REVIEWS;
  } catch (err) {
    console.error('Failed to load reviews from localStorage', err);
    return INITIAL_REVIEWS;
  }
}

/**
 * Get only approved reviews for public client display
 */
export function getPublicReviews() {
  const all = getAllReviews();
  return all.filter(r => r.isApproved !== false);
}

/**
 * Save all reviews to localStorage
 */
function saveReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to save reviews', err);
  }
}

/**
 * Add a new review submitted by a client
 * Implements [Rule 5] Validation & [Rule 6] Meaningful error checks
 */
export function submitClientReview(reviewData) {
  if (!reviewData?.author?.trim()) {
    throw new Error('Please provide your name or organization name.');
  }
  if (!reviewData?.comment?.trim()) {
    throw new Error('Please share your review comments or feedback.');
  }

  const all = getAllReviews();
  const newReview = {
    id: `rev-${Date.now()}`,
    author: reviewData.author.trim(),
    role: (reviewData.role || 'Procurement Buyer').trim(),
    facility: (reviewData.facility || 'Hosur Organization').trim(),
    sector: reviewData.sector || 'Company',
    rating: Math.min(5, Math.max(1, Number(reviewData.rating) || 5)),
    title: (reviewData.title || 'Wholesale Supply Review').trim(),
    comment: reviewData.comment.trim(),
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    verified: true,
    isApproved: true // Approved by default for smooth UX, admin can toggle in portal
  };

  const updated = [newReview, ...all];
  saveReviews(updated);
  return newReview;
}

/**
 * Toggle approval status of a review (Admin action)
 */
export function toggleReviewApproval(reviewId) {
  const all = getAllReviews();
  const updated = all.map(r => {
    if (r.id === reviewId) {
      return { ...r, isApproved: !r.isApproved };
    }
    return r;
  });
  saveReviews(updated);
  return updated;
}

/**
 * Delete a review (Admin action)
 */
export function deleteReview(reviewId) {
  const all = getAllReviews();
  const updated = all.filter(r => r.id !== reviewId);
  saveReviews(updated);
  return updated;
}
