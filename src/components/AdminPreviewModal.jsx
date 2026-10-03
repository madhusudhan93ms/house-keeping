import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  CheckCircle, 
  FileSpreadsheet, 
  RefreshCw, 
  ExternalLink, 
  HelpCircle, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  Copy, 
  Clock, 
  Layers, 
  ArrowRight,
  Download
} from 'lucide-react';
import { getStoredLeads, exportLeadsToExcel, updateLeadStatus } from '../services/leadService';
import { LEAD_CONFIG } from '../config/leadConfig';

export default function AdminPreviewModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState(() => getStoredLeads());
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'sheets' | 'script'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NEW' | 'ACCEPTED'
  
  // Stored Google Sheet webhook & iframe URL
  const [webhookUrlInput, setWebhookUrlInput] = useState(() => {
    return localStorage.getItem('jasvi_google_sheet_webhook_url') || LEAD_CONFIG.sheetWebhookUrl || '';
  });
  const [webhookSaveSuccess, setWebhookSaveSuccess] = useState(false);

  const [sheetInput, setSheetInput] = useState(() => {
    return localStorage.getItem('jasvi_google_sheet_iframe_url') || LEAD_CONFIG.googleSheetIframeUrl || '';
  });
  const [savedSheetUrl, setSavedSheetUrl] = useState(() => {
    return localStorage.getItem('jasvi_google_sheet_iframe_url') || LEAD_CONFIG.googleSheetIframeUrl || '';
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRefresh = () => {
    setLeads(getStoredLeads());
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  const handleSaveWebhookUrl = (e) => {
    e.preventDefault();
    const url = webhookUrlInput.trim();
    localStorage.setItem('jasvi_google_sheet_webhook_url', url);
    setWebhookSaveSuccess(true);
    setTimeout(() => setWebhookSaveSuccess(false), 3000);
  };

  const handleSaveSheetUrl = (e) => {
    e.preventDefault();
    let url = sheetInput.trim();
    const iframeMatch = url.match(/src=["'](.*?)["']/);
    if (iframeMatch && iframeMatch[1]) {
      url = iframeMatch[1];
    }
    setSavedSheetUrl(url);
    localStorage.setItem('jasvi_google_sheet_iframe_url', url);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const appsScriptCode = `/**
 * JASVI ENTERPRISES - AUTOMATED GOOGLE SHEETS B2B LEAD CAPTURE SCRIPT
 * Account: jasvienterprises28@gmail.com | Hub: Hosur, Tamil Nadu
 */
const NOTIFICATION_EMAIL = "jasvienterprises28@gmail.com";
const SHEET_NEW = "📥 New Requisitions";
const SHEET_ACCEPTED = "✅ Accepted Orders";

function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetNew = ss.getSheetByName(SHEET_NEW) || ss.insertSheet(SHEET_NEW, 0);
  const headersNew = ["Timestamp", "Lead Ref ID", "Status", "Company / Factory Name", "Contact Person", "Phone / WhatsApp", "Email / GSTIN", "Buyer Type", "Delivery Address", "Materials Requested", "Monthly Volume / Notes"];
  sheetNew.getRange(1, 1, 1, headersNew.length).setValues([headersNew]).setBackground("#0f766e").setFontColor("#ffffff").setFontWeight("bold");
  sheetNew.setFrozenRows(1);

  let sheetAccepted = ss.getSheetByName(SHEET_ACCEPTED) || ss.insertSheet(SHEET_ACCEPTED, 1);
  const headersAccepted = ["Accepted Date", "Lead Ref ID", "Status", "Company / Factory Name", "Contact Person", "Phone / WhatsApp", "Email / GSTIN", "Buyer Type", "Delivery Address", "Materials Requested", "Monthly Volume / Notes", "Challan / Invoice #", "Dispatch Remarks"];
  sheetAccepted.getRange(1, 1, 1, headersAccepted.length).setValues([headersAccepted]).setBackground("#059669").setFontColor("#ffffff").setFontWeight("bold");
  sheetAccepted.setFrozenRows(1);
}

function doPost(e) {
  try {
    const lead = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetNew = ss.getSheetByName(SHEET_NEW) || (setupSpreadsheet(), ss.getSheetByName(SHEET_NEW));
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");

    sheetNew.appendRow([
      lead.timestamp || formattedDate,
      lead.id || ("JE-LEAD-" + Math.floor(100000 + Math.random() * 900000)),
      "NEW",
      lead.facilityName || "",
      lead.contactName || "",
      lead.phone || "",
      lead.email || "",
      lead.sector || "Company",
      lead.address || "",
      lead.itemsSummary || "",
      lead.notes || ""
    ]);

    try {
      MailApp.sendEmail(NOTIFICATION_EMAIL, "🔔 New RFQ: " + (lead.facilityName || "Lead") + " (" + (lead.id || "") + ")", "New RFQ Received!\\n\\nCompany: " + lead.facilityName + "\\nContact: " + lead.contactName + " (" + lead.phone + ")\\nMaterials: " + lead.itemsSummary);
    } catch(m) {}

    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() === SHEET_NEW && range.getColumn() === 3 && String(range.getValue()).trim().toUpperCase() === "ACCEPTED") {
    const row = range.getRow();
    if (row === 1) return;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetAccepted = ss.getSheetByName(SHEET_ACCEPTED) || (setupSpreadsheet(), ss.getSheetByName(SHEET_ACCEPTED));
    const vals = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nowStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");
    sheetAccepted.appendRow([nowStr, vals[1], "ACCEPTED", vals[3], vals[4], vals[5], vals[6], vals[7], vals[8], vals[9], vals[10], "", ""]);
    sheet.deleteRow(row);
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  if (!isOpen) return null;

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
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[1000px] max-h-[92vh] overflow-y-auto shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
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
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Jasvi Enterprises — Requisition Leads & Excel Data Hub
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="font-semibold text-teal-700">jasvienterprises28@gmail.com</span>
                  <span>•</span>
                  <span>+91 76390 93837</span>
                  <span>•</span>
                  <span>Hosur Hub</span>
                </div>
              </div>
            </div>
            <button
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer border-none"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

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
              onClick={() => setActiveTab('sheets')}
              className={`px-4 py-2 rounded-t-lg font-bold text-xs sm:text-sm transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === 'sheets'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ExternalLink size={16} />
              <span>Google Sheets Integration (jasvienterprises28@gmail.com)</span>
              {webhookUrlInput && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" title="Connected" />
              )}
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
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">📥 New Requisitions</div>
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
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">✅ Accepted / Dispatched</div>
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
                    onClick={() => exportLeadsToExcel()}
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
                                  className="text-[11px] text-slate-500 hover:text-amber-700 font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-amber-50 border border-slate-200 cursor-pointer"
                                >
                                  Revert to New ↩️
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(lead.id, 'ACCEPTED')}
                                  className="text-[11px] text-white font-bold px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 shadow-2xs transition-all cursor-pointer border-none"
                                >
                                  Mark Accepted ✅
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
                  Looking for the pre-formatted 2-column Excel template to import into Google Sheets?
                </div>
                <a
                  href="/Jasvi_Enterprises_Leads_Template.csv"
                  download="Jasvi_Enterprises_Leads_Template.csv"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:text-teal-700 shadow-2xs transition-colors shrink-0"
                >
                  <Download size={14} />
                  <span>Download Sample Template (.csv)</span>
                </a>
              </div>

            </div>
          )}

          {/* TAB 2: GOOGLE SHEETS WEBHOOK (jasvienterprises28@gmail.com) */}
          {activeTab === 'sheets' && (
            <div className="space-y-5">
              
              {/* Webhook Configuration Card */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4.5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                      GS
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        Google Sheets Live Webhook Sync
                      </h4>
                      <p className="text-xs text-teal-800">
                        Target Google Account: <strong>jasvienterprises28@gmail.com</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-teal-300 text-xs font-bold text-teal-800 hover:bg-teal-50 shadow-2xs transition-all cursor-pointer"
                  >
                    {copiedCode ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Code Copied!' : 'Copy Google Apps Script Code'}</span>
                  </button>
                </div>

                <form onSubmit={handleSaveWebhookUrl} className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    Paste your Google Apps Script Web App URL below:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={webhookUrlInput}
                      onChange={(e) => setWebhookUrlInput(e.target.value)}
                      placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                      className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-teal-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all cursor-pointer border-none shrink-0"
                    >
                      <Save size={15} />
                      <span>Save &amp; Connect Webhook</span>
                    </button>
                  </div>

                  {webhookSaveSuccess && (
                    <div className="text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1.5 mt-2">
                      <CheckCircle size={14} />
                      <span>Webhook URL saved! Every website submission will now be pushed to jasvienterprises28@gmail.com Google Sheet in real time.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* 3-Minute Setup Instructions */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5 text-slate-700">
                <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-teal-600" />
                  <span>How to connect your Google Sheet in 3 minutes (jasvienterprises28@gmail.com):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed pl-1">
                  <li>
                    Log in to <strong>jasvienterprises28@gmail.com</strong> and open <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-bold underline">sheets.google.com</a>. Create a new Sheet named <em>&quot;Jasvi Enterprises - Leads&quot;</em>.
                  </li>
                  <li>
                    In the top menu, click <strong>Extensions</strong> &rarr; <strong>Apps Script</strong>.
                  </li>
                  <li>
                    Delete any existing code, click the <strong>&quot;Copy Google Apps Script Code&quot;</strong> button above, and paste it into the editor. Press <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">Ctrl+S</code> to save.
                  </li>
                  <li>
                    Select function <strong>setupSpreadsheet</strong> from the toolbar dropdown and click <strong>Run</strong> once. This automatically builds the two sheets: <strong>📥 New Requisitions</strong> and <strong>✅ Accepted Orders</strong>!
                  </li>
                  <li>
                    Click <strong>Deploy</strong> (top right) &rarr; <strong>New deployment</strong> &rarr; Select gear icon &rarr; <strong>Web app</strong>. Set <em>Execute as: Me</em> and <em>Who has access: Anyone</em> &rarr; Click <strong>Deploy</strong>.
                  </li>
                  <li>
                    Copy the generated <strong>Web App URL</strong> and paste it in the box above!
                  </li>
                </ol>
              </div>

              {/* Live Embedded Sheet View (Optional) */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <form onSubmit={handleSaveSheetUrl} className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">
                      Optional: Display Live Google Sheet inside this Dashboard (Iframe link)
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={sheetInput}
                      onChange={(e) => setSheetInput(e.target.value)}
                      placeholder="Paste Publish to Web link (e.g., https://docs.google.com/spreadsheets/d/e/.../pubhtml)"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg cursor-pointer border-none shrink-0"
                    >
                      Save Viewer
                    </button>
                  </div>
                </form>

                {savedSheetUrl && (
                  <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-inner">
                    <iframe
                      src={savedSheetUrl}
                      title="Google Sheet Live Database"
                      className="w-full h-80 border-none"
                    />
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
