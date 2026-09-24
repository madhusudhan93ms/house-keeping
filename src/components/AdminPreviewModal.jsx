import React, { useState } from 'react';
import { X, LayoutDashboard, CheckCircle, FileSpreadsheet, RefreshCw, ExternalLink, HelpCircle, Save, Phone, Mail, MapPin } from 'lucide-react';
import { getStoredLeads, exportLeadsToExcel } from '../services/leadService';
import { LEAD_CONFIG } from '../config/leadConfig';

export default function AdminPreviewModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState(() => getStoredLeads());
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'sheets'
  
  // Stored or config Google Sheet iframe URL
  const [sheetInput, setSheetInput] = useState(() => {
    return localStorage.getItem('jasvi_google_sheet_iframe_url') || LEAD_CONFIG.googleSheetIframeUrl || '';
  });
  const [savedSheetUrl, setSavedSheetUrl] = useState(() => {
    return localStorage.getItem('jasvi_google_sheet_iframe_url') || LEAD_CONFIG.googleSheetIframeUrl || '';
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleRefresh = () => {
    setLeads(getStoredLeads());
  };

  const handleSaveSheetUrl = (e) => {
    e.preventDefault();
    let url = sheetInput.trim();
    // If user pasted full <iframe src="..." />, extract the src
    const iframeMatch = url.match(/src=["'](.*?)["']/);
    if (iframeMatch && iframeMatch[1]) {
      url = iframeMatch[1];
    }
    setSavedSheetUrl(url);
    localStorage.setItem('jasvi_google_sheet_iframe_url', url);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isOpen) return null;

  const defaultSampleOrders = [
    { ref: 'JE-REQ-849120', org: 'Automotive Component Mfg, SIPCOT Ph II', items: 'JK Paper (8 Cartons), Floor Cleaner (12 Cans)', units: '20 Units', status: 'Dispatched', statusCls: 'bg-green-100 text-green-700' },
    { ref: 'JE-REQ-712394', org: 'St. Mary Matriculation Hr. Sec. School',   items: 'Long Registers, Whiteboard Markers, Hand Wash', units: '14 Packs', status: 'Packing',    statusCls: 'bg-amber-100 text-amber-700' },
    { ref: 'JE-REQ-650119', org: 'Krishnagiri Multispecialty Clinic',         items: 'Disinfectant Concentrate, Biohazard Bags, Towels', units: '18 Cans', status: 'In Review', statusCls: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-[4px] z-[110] flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-[18px] sm:rounded-[20px] w-full max-w-[960px] max-h-[92vh] overflow-y-auto shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8">
          
          {/* Header */}
          <div className="flex justify-between items-start gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                <LayoutDashboard size={22} />
              </div>
              <div>
                <h3 className="text-[1.1rem] sm:text-[1.2rem] font-extrabold text-slate-900 leading-tight">
                  Jasvi Enterprises — Hosur Ops & Lead Data Hub
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 text-teal-700 font-semibold">
                    <Phone size={12} />
                    <a href={`tel:${LEAD_CONFIG.phoneTel}`} className="hover:underline">{LEAD_CONFIG.displayPhone}</a>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Mail size={12} />
                    <span>{LEAD_CONFIG.contactEmail}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <MapPin size={12} />
                    <span>{LEAD_CONFIG.fulfillmentHub}</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              className="bg-transparent border-none text-slate-500 cursor-pointer p-1.5 rounded-[8px] hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center flex-shrink-0"
              onClick={onClose}
              aria-label="Close admin modal"
            >
              <X size={20} />
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
              <span>Recorded Leads & Excel (.csv)</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
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
              <span>Live Google Sheets (Iframe Database)</span>
              {savedSheetUrl && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" title="Connected" />
              )}
            </button>
          </div>

          {/* TAB 1: LOCAL LEADS & EXCEL EXPORT */}
          {activeTab === 'leads' && (
            <>
              {/* Live Sync Banner */}
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-[10px] p-3.5 sm:p-4 mb-5">
                <CheckCircle size={22} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-green-800 text-[0.88rem] sm:text-[0.92rem]">Institutional Lead Sync Active</div>
                  <div className="text-[0.8rem] sm:text-[0.84rem] text-green-700 mt-0.5 leading-relaxed">
                    All website quote submissions are captured live. You can export them instantly to an Excel-compatible spreadsheet file (.csv) or connect a Google Sheets iframe. Contact: <strong className="text-green-900">{LEAD_CONFIG.displayPhone}</strong>.
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
                {[
                  { label: 'Recorded Leads',            val: `${leads.length} Stored Leads`, sub: '● Ready for Excel Export', subColor: 'text-emerald-600' },
                  { label: 'Warehouse Stock SKUs',      val: '520+ Products',               sub: 'Stationery & Housekeeping', subColor: 'text-teal-700' },
                  { label: 'Active Requisition Queue',  val: '18 PO Quotes',                sub: 'Corporate & School Inquiries', subColor: 'text-amber-600' },
                ].map(({ label, val, sub, subColor }) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-[10px] p-3.5 sm:p-4">
                    <div className="text-[0.76rem] sm:text-[0.78rem] text-slate-500 font-semibold mb-1">{label}</div>
                    <div className="text-[1.25rem] sm:text-[1.35rem] font-extrabold text-slate-900 mb-0.5">{val}</div>
                    <div className={`text-[0.72rem] sm:text-[0.75rem] font-semibold ${subColor}`}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Export Action Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-3.5 sm:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-[0.9rem]">Lead Data Export (Excel / CSV)</div>
                  <div className="text-[0.8rem] text-slate-500">Download captured customer leads, contact numbers, and requested item lists directly to your computer.</div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="p-2 border border-slate-300 rounded-[8px] text-slate-600 hover:bg-slate-100 cursor-pointer bg-white transition-colors"
                    title="Refresh leads list"
                    aria-label="Refresh leads"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => exportLeadsToExcel()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[0.88rem] px-4 py-2.5 rounded-[8px] shadow-sm transition-all cursor-pointer border-none"
                  >
                    <FileSpreadsheet size={17} />
                    <span>Export All Leads to Excel (.csv)</span>
                  </button>
                </div>
              </div>

              {/* Stored Live Leads Table (If Any) */}
              {leads.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <h4 className="text-[0.95rem] font-bold text-slate-800">Live Captured Requisition Leads ({leads.length})</h4>
                    <span className="text-[0.75rem] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">Live Database</span>
                  </div>
                  <div className="border border-slate-200 rounded-[10px] overflow-hidden overflow-x-auto mb-6">
                    <table className="w-full border-collapse text-[0.82rem] text-left min-w-[620px]">
                      <thead>
                        <tr className="bg-emerald-50 text-emerald-900 border-b border-emerald-100">
                          {['Lead ID', 'Facility / Organization', 'Contact & Phone', 'Units', 'Products Requested', 'Date'].map(th => (
                            <th key={th} className="px-3 py-2.5 font-semibold whitespace-nowrap">{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                            <td className="px-3 py-2.5 font-semibold text-teal-700 whitespace-nowrap">{lead.id}</td>
                            <td className="px-3 py-2.5 font-medium text-slate-900">
                              <div>{lead.facilityName || 'N/A'}</div>
                              <div className="text-[0.72rem] text-slate-500">{lead.sector || 'Institutional'}</div>
                            </td>
                            <td className="px-3 py-2.5 text-slate-700 whitespace-nowrap">
                              <div>{lead.contactName || 'N/A'}</div>
                              <div className="text-[0.75rem] text-slate-500">{lead.phone || 'N/A'}</div>
                            </td>
                            <td className="px-3 py-2.5 font-bold whitespace-nowrap text-emerald-700">{lead.itemsCount} units</td>
                            <td className="px-3 py-2.5 text-slate-600 max-w-[240px] truncate" title={lead.itemsSummary}>
                              {lead.itemsSummary || 'Standard catalog inquiry'}
                            </td>
                            <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap text-[0.76rem]">{lead.timestamp || 'Recent'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sample Active Queue */}
              <div className="mb-6">
                <h4 className="text-[0.95rem] font-bold text-slate-800 mb-3">Recent Warehouse Orders (Hosur Hub)</h4>
                <div className="border border-slate-200 rounded-[10px] overflow-hidden overflow-x-auto">
                  <table className="w-full border-collapse text-[0.82rem] text-left min-w-[560px]">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        {['Requisition #', 'Institution', 'Items', 'Allocation', 'Status'].map(th => (
                          <th key={th} className="px-3 py-2.5 font-semibold whitespace-nowrap">{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {defaultSampleOrders.map(({ ref, org, items, units, status, statusCls }) => (
                        <tr key={ref} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2.5 font-semibold text-teal-700 whitespace-nowrap">{ref}</td>
                          <td className="px-3 py-2.5">{org}</td>
                          <td className="px-3 py-2.5 text-slate-600">{items}</td>
                          <td className="px-3 py-2.5 font-bold whitespace-nowrap">{units}</td>
                          <td className="px-3 py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[0.75rem] font-semibold ${statusCls}`}>{status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: LIVE GOOGLE SHEETS IFRAME DATABASE */}
          {activeTab === 'sheets' && (
            <div className="space-y-5">
              
              {/* Embed URL Configuration Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-4">
                <form onSubmit={handleSaveSheetUrl} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileSpreadsheet size={15} className="text-teal-600" />
                      <span>Google Sheets Embed Link or &lt;iframe&gt; Code:</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowGuide(!showGuide)}
                      className="text-xs text-teal-700 hover:text-teal-800 font-semibold inline-flex items-center gap-1 bg-transparent border-none cursor-pointer self-start sm:self-auto"
                    >
                      <HelpCircle size={13} />
                      <span>{showGuide ? 'Hide Setup Steps' : 'How to get this link? (Step-by-Step)'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={sheetInput}
                      onChange={(e) => setSheetInput(e.target.value)}
                      placeholder='Paste iframe link or src (e.g., https://docs.google.com/spreadsheets/d/e/.../pubhtml)'
                      className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all cursor-pointer border-none"
                    >
                      <Save size={15} />
                      <span>Save & Display</span>
                    </button>
                  </div>

                  {saveSuccess && (
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      <span>Google Sheets link saved successfully!</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Step-by-Step Guide Accordion */}
              {showGuide && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-900 space-y-2.5 animate-fade-in">
                  <div className="font-bold text-sm text-sky-950 flex items-center gap-1.5">
                    <CheckCircle size={16} className="text-sky-600" />
                    <span>How to set up Google Forms & link to Google Sheets (Manual Checklist):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed pl-1">
                    <li>
                      <strong>Create your Google Form:</strong> Go to <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="text-teal-700 underline font-semibold">forms.google.com</a> and add fields (Institution Name, Contact Person, Phone, Email, Sector, Address, Materials, Notes).
                    </li>
                    <li>
                      <strong>Link Form to Google Sheets:</strong> Inside your Google Form, click the <strong>&quot;Responses&quot;</strong> tab at the top and click the green <strong>&quot;Link to Sheets&quot;</strong> button. This creates a live Google Sheet that receives every response instantly!
                    </li>
                    <li>
                      <strong>Get the Iframe Embed Link:</strong> In that Google Sheet, click <strong>File</strong> &rarr; <strong>Share</strong> &rarr; <strong>Publish to web</strong>.
                    </li>
                    <li>
                      Select <strong>&quot;Embed&quot;</strong> tab &rarr; click <strong>Publish</strong> &rarr; copy the link inside <code className="bg-sky-100 text-sky-900 px-1 py-0.5 rounded font-mono">src=&quot;...&quot;</code> (or copy the whole <code className="bg-sky-100 text-sky-900 px-1 py-0.5 rounded font-mono">&lt;iframe&gt;</code> code).
                    </li>
                    <li>
                      <strong>Paste above:</strong> Paste that link in the box above and click <strong>&quot;Save &amp; Display&quot;</strong> (or send it to me and I will lock it directly into your code!).
                    </li>
                  </ol>
                </div>
              )}

              {/* Live Iframe Display or Placeholder */}
              {savedSheetUrl ? (
                <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-inner bg-slate-50">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Embedded Google Sheet
                    </span>
                    <a
                      href={savedSheetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-700 hover:text-teal-800 font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Open Sheet in New Tab</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <iframe
                    src={savedSheetUrl}
                    title="Jasvi Enterprises Lead Sheet"
                    className="w-full h-[520px] border-none bg-white"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center bg-slate-50/50">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-3">
                    <FileSpreadsheet size={28} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">No Google Sheet Linked Yet</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4 leading-relaxed">
                    Paste your Google Sheets iframe link in the box above to see your live spreadsheet updating in real-time, or download the existing records anytime via the &quot;Export All Leads to Excel&quot; button.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowGuide(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 border border-teal-300 px-3.5 py-1.5 rounded-lg cursor-pointer transition-all"
                  >
                    <HelpCircle size={14} />
                    <span>View Step-by-Step Instructions</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-5 border-t border-slate-200 mt-6">
            <div className="text-[0.76rem] text-slate-500">
              Direct Config File: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">src/config/leadConfig.js</code>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                className="bg-white border border-slate-300 text-slate-700 font-semibold text-[0.88rem] px-4 py-2 rounded-[8px] hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer"
                onClick={onClose}
              >
                Close Portal
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
