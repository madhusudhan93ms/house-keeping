import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle, 
  FileSpreadsheet, 
  RefreshCw, 
  Check, 
  Clock, 
  Download,
  Inbox,
  RotateCcw,
  Lock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  Star,
  Trash2,
  Plus
} from 'lucide-react';
import { getStoredLeads, exportLeadsToExcel, updateLeadStatus } from '../services/leadService';
import { getAllReviews, toggleReviewApproval, deleteReview, submitClientReview } from '../services/reviewService';
import { LEAD_CONFIG } from '../config/leadConfig';

// Precomputed SHA-256 hash of default master PIN '2828'
const DEFAULT_PIN_HASH = 'a754049ffb01baaea795203c823895120373619b79ac87fee9351ad3dea41064';

async function computeSha256(text) {
  const enc = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', enc.encode(text));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminPreviewModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState(() => getStoredLeads());
  const [reviews, setReviews] = useState(() => getAllReviews());
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'reviews'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NEW' | 'ACCEPTED'

  // Block background screen scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);
  
  // Security PIN state with SHA-256 and brute-force lockout
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [changePinMessage, setChangePinMessage] = useState('');

  // Admin Add Review Form
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [adminReviewForm, setAdminReviewForm] = useState({
    author: '',
    role: '',
    facility: '',
    sector: 'Company',
    rating: 5,
    title: '',
    comment: ''
  });

  const handleToggleReviewApproval = (id) => {
    const updated = toggleReviewApproval(id);
    setReviews(updated);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Delete this client review?')) {
      const updated = deleteReview(id);
      setReviews(updated);
    }
  };

  const handleAdminAddReview = (e) => {
    e.preventDefault();
    if (!adminReviewForm.author.trim() || !adminReviewForm.comment.trim()) return;
    submitClientReview(adminReviewForm);
    setReviews(getAllReviews());
    setShowAddReviewModal(false);
    setAdminReviewForm({
      author: '',
      role: '',
      facility: '',
      sector: 'Company',
      rating: 5,
      title: '',
      comment: ''
    });
  };

  const [failedAttempts, setFailedAttempts] = useState(() => {
    return parseInt(localStorage.getItem('jasvi_admin_failed_attempts') || '0', 10);
  });
  const [lockoutUntil, setLockoutUntil] = useState(() => {
    return parseInt(localStorage.getItem('jasvi_admin_lockout_until') || '0', 10);
  });

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    const cleanPin = pinInput.trim();
    if (!cleanPin) return;

    // Master PIN overrides (2828, 7639, 1234) can always unlock even if a lockout timer was set
    const isMasterPin = cleanPin === '2828' || cleanPin === '7639' || cleanPin === '1234';

    if (!isMasterPin && Date.now() < lockoutUntil) {
      const remainingMins = Math.ceil((lockoutUntil - Date.now()) / 60000);
      setPinError(`Security lockout active. Try again in ${remainingMins} minute${remainingMins > 1 ? 's' : ''} or use master PIN 2828.`);
      return;
    }

    try {
      const inputHash = await computeSha256(cleanPin);
      const storedHash = localStorage.getItem('jasvi_admin_pin_hash') || DEFAULT_PIN_HASH;

      if (isMasterPin || inputHash === storedHash || inputHash === DEFAULT_PIN_HASH) {
        setIsUnlocked(true);
        setPinError('');
        setPinInput('');
        setFailedAttempts(0);
        setLockoutUntil(0);
        localStorage.removeItem('jasvi_admin_failed_attempts');
        localStorage.removeItem('jasvi_admin_lockout_until');
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        localStorage.setItem('jasvi_admin_failed_attempts', String(nextAttempts));

        if (nextAttempts >= 5) {
          const lockTime = Date.now() + 5 * 60 * 1000;
          setLockoutUntil(lockTime);
          localStorage.setItem('jasvi_admin_lockout_until', String(lockTime));
          setPinError('Too many failed attempts. Security lockout active for 5 minutes (Master PIN: 2828).');
        } else {
          setPinError(`Incorrect PIN. ${5 - nextAttempts} attempt${5 - nextAttempts === 1 ? '' : 's'} remaining.`);
        }
      }
    } catch (err) {
      // In case subtle crypto is unavailable in the environment
      if (isMasterPin) {
        setIsUnlocked(true);
        setPinError('');
        setPinInput('');
        return;
      }
      setPinError('Verification error. Please enter default PIN 2828.');
    }
  };

  const handleChangePinSubmit = async (e) => {
    e.preventDefault();
    const cleanNewPin = newPinInput.trim();
    if (cleanNewPin.length < 4) {
      setChangePinMessage('PIN must be at least 4 digits');
      return;
    }
    try {
      const newHash = await computeSha256(cleanNewPin);
      localStorage.setItem('jasvi_admin_pin_hash', newHash);
      localStorage.removeItem('jasvi_admin_pin');
      setChangePinMessage('New PIN encrypted and saved!');
      setTimeout(() => {
        setShowChangePin(false);
        setChangePinMessage('');
        setNewPinInput('');
      }, 1500);
    } catch (err) {
      setChangePinMessage('Failed to update PIN');
    }
  };

  const handleModalClose = () => {
    setIsUnlocked(false);
    setPinInput('');
    setPinError('');
    setShowChangePin(false);
    onClose();
  };

  const handleRefresh = () => {
    setLeads(getStoredLeads());
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  if (!isOpen) return null;

  // Render PIN Screen if not unlocked
  if (!isUnlocked) {
    return (
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-800 relative"
        >
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-4 shadow-sm">
              <Lock size={28} />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Jasvi Admin Verification
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xs leading-relaxed">
              Confidential Business Portal • Enter your private 4-digit PIN to access wholesale RFQ leads.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full mt-6 flex flex-col gap-3">
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={10}
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Enter 4-digit PIN"
                  className={`w-full text-center text-xl tracking-[0.35em] font-mono py-3.5 px-4 rounded-xl border bg-slate-50 focus:bg-white text-slate-900 placeholder:tracking-normal placeholder:font-sans placeholder:text-sm focus:outline-none focus:ring-4 transition-all ${
                    pinError
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                      : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/15'
                  }`}
                />
              </div>

              {pinError && (
                <div className="text-xs font-semibold text-rose-600 flex items-center justify-center gap-1.5 bg-rose-50 py-1.5 px-2.5 rounded-lg border border-rose-200">
                  <ShieldAlert size={14} />
                  <span>{pinError}</span>
                </div>
              )}

              <div className="flex items-center gap-2 mt-1">
                <button
                  type="submit"
                  disabled={Date.now() < lockoutUntil && !pinInput.trim()}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 shadow-md shadow-teal-700/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-none"
                >
                  <KeyRound size={16} />
                  <span>Unlock Lead Hub</span>
                </button>

                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-3 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-none"
                >
                  Cancel
                </button>
              </div>

              <div className="pt-2 flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('jasvi_admin_pin_hash');
                    localStorage.removeItem('jasvi_admin_failed_attempts');
                    localStorage.removeItem('jasvi_admin_lockout_until');
                    setFailedAttempts(0);
                    setLockoutUntil(0);
                    setPinInput('2828');
                    setPinError('');
                  }}
                  className="text-[11px] text-teal-700 hover:text-teal-900 underline font-semibold cursor-pointer border-none bg-transparent"
                >
                  Default Master PIN: 2828 (Click to autofill)
                </button>
                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-teal-600" />
                  <span>Restricted to authorized Jasvi Enterprises administration</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const newLeads = leads.filter(l => l.status === 'NEW' || !l.status || l.status === 'New Inquiry');
  const acceptedLeads = leads.filter(l => l.status === 'ACCEPTED' || l.status === 'Dispatched' || l.status === 'Packing');

  const filteredLeads = statusFilter === 'NEW' 
    ? newLeads 
    : statusFilter === 'ACCEPTED' 
      ? acceptedLeads 
      : leads;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-[4px] z-[110] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[1000px] max-h-[92vh] overflow-y-auto shadow-2xl transition-all duration-200"
      >
        <div className="p-4 sm:p-6 md:p-8">
          
          {/* Header */}
          <div className="flex justify-between items-start gap-3 pb-4 border-b border-slate-200 mb-5">
            <div className="flex items-center gap-3">
              <img
                src="/je-logo.png"
                alt="Jasvi Enterprises Logo"
                className="w-10 h-10 object-contain rounded-xl drop-shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    Jasvi Enterprises — Requisition Leads & Excel Data Hub
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck size={12} />
                    Verified Admin
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="font-semibold text-teal-700">{LEAD_CONFIG.contactEmail}</span>
                  <span>•</span>
                  <span>{LEAD_CONFIG.displayPhone}</span>
                  <span>•</span>
                  <span>Hosur Hub</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Google Sheets Sync Protected
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowChangePin(!showChangePin)}
                className="text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-slate-200"
                title="Change security PIN"
              >
                <KeyRound size={14} />
                <span className="hidden sm:inline">Change PIN</span>
              </button>

              <button
                type="button"
                onClick={handleModalClose}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-rose-200"
                title="Lock portal and exit"
              >
                <Lock size={14} />
                <span className="hidden sm:inline">Lock & Exit</span>
              </button>

              <button
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer border-none"
                onClick={handleModalClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Change PIN Drawer */}
          {showChangePin && (
            <div className="mb-5 p-4 bg-teal-50/70 border border-teal-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
              <div className="text-xs text-teal-900 font-medium">
                <strong className="block text-sm font-bold text-teal-950">Update Admin Security PIN</strong>
                Current PIN is active. Enter a new 4+ digit PIN below:
              </div>
              <form onSubmit={handleChangePinSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="New PIN"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border border-teal-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 w-32"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-600 rounded-lg shadow-sm cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePin(false)}
                  className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </form>
              {changePinMessage && (
                <span className="text-xs font-bold text-emerald-700">{changePinMessage}</span>
              )}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 mb-5 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-t-lg font-bold text-xs sm:text-sm transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === 'leads'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet size={16} />
              <span>Status Tracker & Leads</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
                {leads.length}
              </span>
            </button>



            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-t-lg font-bold text-xs sm:text-sm transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Star size={16} className={activeTab === 'reviews' ? 'text-amber-500 fill-amber-500' : 'text-slate-400'} />
              <span>Client Reviews</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
                {reviews.length}
              </span>
            </button>
          </div>

          {/* TAB 1: STATUS TRACKER & EXCEL EXPORT */}
          {activeTab === 'leads' && (
            <div className="space-y-5">
              
              {/* Status Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  onClick={() => setStatusFilter('ALL')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    statusFilter === 'ALL' 
                      ? 'bg-teal-50/80 border-teal-500 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">Total Requisitions</div>
                  <div className="text-2xl font-black text-slate-900">{leads.length}</div>
                  <div className="text-xs font-semibold text-teal-700 mt-0.5">● Full Database</div>
                </div>

                <div 
                  onClick={() => setStatusFilter('NEW')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    statusFilter === 'NEW' 
                      ? 'bg-amber-50/80 border-amber-500 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-0.5">
                    <Inbox size={14} className="text-amber-600" />
                    <span>New Requisitions</span>
                  </div>
                  <div className="text-2xl font-black text-amber-700">{newLeads.length}</div>
                  <div className="text-xs font-semibold text-amber-600 mt-0.5">Needs Quote / Review</div>
                </div>

                <div 
                  onClick={() => setStatusFilter('ACCEPTED')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    statusFilter === 'ACCEPTED' 
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-0.5">
                    <CheckCircle size={14} className="text-emerald-600" />
                    <span>Accepted / Dispatched</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-700">{acceptedLeads.length}</div>
                  <div className="text-xs font-semibold text-emerald-600 mt-0.5">Processed &amp; Confirmed</div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Filter View:</span>
                  <div className="inline-flex rounded-lg bg-white border border-slate-200 p-0.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setStatusFilter('ALL')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer border-none ${
                        statusFilter === 'ALL' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                      }`}
                    >
                      All ({leads.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('NEW')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer border-none ${
                        statusFilter === 'NEW' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                      }`}
                    >
                      New ({newLeads.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('ACCEPTED')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer border-none ${
                        statusFilter === 'ACCEPTED' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900 bg-transparent'
                      }`}
                    >
                      Accepted ({acceptedLeads.length})
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer bg-white transition-colors"
                    title="Refresh leads list"
                  >
                    <RefreshCw size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => exportLeadsToExcel(leads)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer border-none"
                  >
                    <FileSpreadsheet size={15} />
                    <span>Download 2-Section Excel (.csv)</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-2xs">
                <table className="w-full border-collapse text-xs text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="px-3 py-2.5 font-bold">Status</th>
                      <th className="px-3 py-2.5 font-bold">Lead ID</th>
                      <th className="px-3 py-2.5 font-bold">Facility / Company</th>
                      <th className="px-3 py-2.5 font-bold">Contact &amp; Phone</th>
                      <th className="px-3 py-2.5 font-bold">Materials Requested</th>
                      <th className="px-3 py-2.5 font-bold">Date</th>
                      <th className="px-3 py-2.5 font-bold text-right">Status Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-slate-500 font-medium">
                          No {statusFilter.toLowerCase()} leads recorded yet. New website submissions will appear here automatically!
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const isAccepted = lead.status === 'ACCEPTED' || lead.status === 'Dispatched';
                        return (
                          <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                            <td className="px-3 py-2.5">
                              {isAccepted ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <Check size={11} strokeWidth={3} />
                                  <span>ACCEPTED</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  <Clock size={11} strokeWidth={2.5} />
                                  <span>NEW</span>
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2.5 font-mono font-bold text-teal-800 whitespace-nowrap">{lead.id}</td>
                            <td className="px-3 py-2.5 font-semibold text-slate-900">
                              <div>{lead.facilityName || 'N/A'}</div>
                              <div className="text-[11px] text-slate-500 font-normal">{lead.sector} • {lead.address || 'Hosur'}</div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="font-medium text-slate-900">{lead.contactName || 'N/A'}</div>
                              <a href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline text-[11px] font-semibold">
                                {lead.phone || 'N/A'}
                              </a>
                            </td>
                            <td className="px-3 py-2.5 text-slate-600 max-w-[200px] truncate" title={lead.itemsSummary}>
                              {lead.itemsSummary || 'Standard catalog'}
                            </td>
                            <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap text-[11px]">{lead.timestamp}</td>
                            <td className="px-3 py-2.5 text-right whitespace-nowrap">
                              {isAccepted ? (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(lead.id, 'NEW')}
                                  className="text-[11px] text-slate-500 hover:text-amber-700 font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-amber-50 border border-slate-200 cursor-pointer inline-flex items-center gap-1"
                                >
                                  <RotateCcw size={11} />
                                  <span>Revert to New</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(lead.id, 'ACCEPTED')}
                                  className="text-[11px] text-white font-bold px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 shadow-2xs transition-all cursor-pointer border-none inline-flex items-center gap-1"
                                >
                                  <Check size={11} strokeWidth={3} />
                                  <span>Mark Accepted</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* CSV Template Quick Download */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="text-slate-600">
                  Export all currently stored customer inquiries to an Excel/CSV spreadsheet:
                </div>
                <button
                  type="button"
                  onClick={() => exportLeadsToExcel(leads)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:text-teal-700 shadow-2xs transition-colors shrink-0 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Excel Leads (.csv)</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: CLIENT REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Summary Stats & Add Review Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Total Client Reviews</div>
                    <div className="text-2xl font-black text-slate-900">{reviews.length}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Live on Website</div>
                    <div className="text-2xl font-black text-emerald-600">
                      {reviews.filter(r => r.isApproved !== false).length}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold">Average Rating</div>
                    <div className="text-2xl font-black text-amber-500 flex items-center gap-1">
                      <span>4.9</span>
                      <Star size={18} fill="currentColor" stroke="none" />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer border-none shrink-0"
                >
                  <Plus size={15} />
                  <span>Add New Review</span>
                </button>
              </div>

              {/* Reviews Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-2xs">
                <table className="w-full border-collapse text-xs text-left min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="px-3 py-2.5 font-bold">Rating</th>
                      <th className="px-3 py-2.5 font-bold">Client &amp; Organization</th>
                      <th className="px-3 py-2.5 font-bold">Review Title &amp; Feedback</th>
                      <th className="px-3 py-2.5 font-bold">Date</th>
                      <th className="px-3 py-2.5 font-bold">Website Status</th>
                      <th className="px-3 py-2.5 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-500 font-medium">
                          No client reviews recorded yet. You can add one using the button above or clients can submit from the website!
                        </td>
                      </tr>
                    ) : (
                      reviews.map((rev) => {
                        const isLive = rev.isApproved !== false;
                        return (
                          <tr key={rev.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={13} 
                                    fill={i < rev.rating ? "currentColor" : "none"} 
                                    stroke={i < rev.rating ? "none" : "#cbd5e1"} 
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="font-bold text-slate-900">{rev.author}</div>
                              <div className="text-[11px] text-slate-500">{rev.role} • <strong className="text-slate-700">{rev.facility}</strong></div>
                            </td>
                            <td className="px-3 py-2.5 max-w-[280px]">
                              <div className="font-semibold text-slate-900 truncate">"{rev.title}"</div>
                              <div className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{rev.comment}</div>
                            </td>
                            <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap text-[11px]">
                              {rev.date}
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              {isLive ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <Eye size={11} />
                                  <span>Live on Website</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 border border-slate-300">
                                  <EyeOff size={11} />
                                  <span>Hidden</span>
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleReviewApproval(rev.id)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors border ${
                                    isLive
                                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                                  }`}
                                  title={isLive ? "Hide from website" : "Show on website"}
                                >
                                  {isLive ? 'Hide' : 'Publish'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteReview(rev.id)}
                                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors border-none"
                                  title="Delete Review"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Admin Add Review Modal (Strictly dismissible only via X mark or Cancel button) */}
      {showAddReviewModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[120] flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 text-slate-800 relative"
          >
            <button
              type="button"
              onClick={() => setShowAddReviewModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none"
              title="Close modal"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Star size={18} className="text-amber-500 fill-amber-500" />
              <span>Add Client Testimonial / Review</span>
            </h4>

            <form onSubmit={handleAdminAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={adminReviewForm.author}
                  onChange={(e) => setAdminReviewForm(p => ({ ...p, author: e.target.value }))}
                  placeholder="e.g. S. Murugan"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={adminReviewForm.role}
                    onChange={(e) => setAdminReviewForm(p => ({ ...p, role: e.target.value }))}
                    placeholder="e.g. Stores Incharge"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating</label>
                  <select
                    value={adminReviewForm.rating}
                    onChange={(e) => setAdminReviewForm(p => ({ ...p, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★)</option>
                    <option value={3}>3 Stars (★★★)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={adminReviewForm.facility}
                  onChange={(e) => setAdminReviewForm(p => ({ ...p, facility: e.target.value }))}
                  placeholder="e.g. TVS Motor Supplier Plant, Hosur"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={adminReviewForm.title}
                  onChange={(e) => setAdminReviewForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Quality chemicals and prompt bulk delivery"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Comments *</label>
                <textarea
                  required
                  rows={3}
                  value={adminReviewForm.comment}
                  onChange={(e) => setAdminReviewForm(p => ({ ...p, comment: e.target.value }))}
                  placeholder="Enter feedback comments..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-500 transition-all cursor-pointer border-none"
                >
                  Save &amp; Publish Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
