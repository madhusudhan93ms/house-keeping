import React, { useState } from 'react';
import { X, LayoutDashboard, CheckCircle, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { getStoredLeads, exportLeadsToExcel } from '../services/leadService';

export default function AdminPreviewModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState(() => getStoredLeads());

  const handleRefresh = () => {
    setLeads(getStoredLeads());
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
        className="bg-white rounded-[18px] sm:rounded-[20px] w-full max-w-[880px] max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200 mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                <LayoutDashboard size={22} />
              </div>
              <div>
                <h3 className="text-[1.1rem] sm:text-[1.2rem] font-extrabold text-slate-900 leading-tight">Jasvi Enterprises — Hosur Warehouse & Ops Portal</h3>
                <p className="text-[0.78rem] sm:text-[0.82rem] text-slate-500 mt-0.5">Lead Capture & Institutional Requisition Management</p>
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

          {/* Live Sync Banner */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-[10px] p-3.5 sm:p-4 mb-5 sm:mb-6">
            <CheckCircle size={22} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-green-800 text-[0.88rem] sm:text-[0.92rem]">Institutional Lead Sync Active</div>
              <div className="text-[0.8rem] sm:text-[0.84rem] text-green-700 mt-0.5 leading-relaxed">
                All wholesale requisitions and customer inquiries are recorded and ready for instant Excel (.csv) export or Google Forms / Google Sheets webhook synchronization. Fulfillment Hub: OSS Roja Nagar, Zuzuwadi, Hosur.
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {[
              { label: 'Recorded Leads',            val: `${leads.length} Stored Leads`, sub: '● Stored for Excel Export',    subColor: 'text-emerald-600' },
              { label: 'Warehouse Stock SKUs',      val: '520+ Products',               sub: 'Stationery & Housekeeping',     subColor: 'text-primary-700' },
              { label: 'Active Requisition Queue',  val: '18 PO Quotes',                sub: 'Corporate & School Inquiries',  subColor: 'text-amber-600'   },
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
              <div className="text-[0.8rem] text-slate-500">Download captured customer leads, contact numbers, and requested item lists.</div>
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
                <span className="text-[0.75rem] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">Live Local Storage</span>
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
                        <td className="px-3 py-2.5 font-semibold text-primary-700 whitespace-nowrap">{lead.id}</td>
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
                      <td className="px-3 py-2.5 font-semibold text-primary-700 whitespace-nowrap">{ref}</td>
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

          {/* Actions */}
          <div className="flex justify-between items-center gap-3">
            <div className="text-[0.76rem] text-slate-400">
              Google Form & Sheet Webhook Config: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">src/config/leadConfig.js</code>
            </div>
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
  );
}
