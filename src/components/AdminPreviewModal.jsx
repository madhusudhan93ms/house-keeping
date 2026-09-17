import React from 'react';
import { X, LayoutDashboard, CheckCircle } from 'lucide-react';

export default function AdminPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-[4px] z-[110] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-[840px] max-h-[90vh] overflow-y-auto animate-fade-scale shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 pb-5 border-b border-slate-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#0b1528] to-[#1e3a8a] flex items-center justify-center text-sky-400 flex-shrink-0">
                <LayoutDashboard size={22} />
              </div>
              <div>
                <h3 className="text-[1.2rem] font-extrabold text-slate-900">Jasvi Enterprises — Hosur Warehouse & Ops Portal</h3>
                <p className="text-[0.82rem] text-slate-500 mt-0.5">Inventory Dispatch & Institutional Requisition Management</p>
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
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-[10px] p-4 mb-6">
            <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-green-800 text-[0.92rem]">Live Requisition Sync Active</div>
              <div className="text-[0.84rem] text-green-700 mt-0.5">
                Customer orders placed on the frontend flow directly into this warehouse queue. Dispatch challans are generated with reference to Survey No. 193-1A1, Zuzuwadi, Hosur.
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Active PO Queue',          val: '14 Requisitions', sub: '● 5 Out for Hosur Dispatch',    subColor: 'text-emerald-600' },
              { label: 'Warehouse Stock SKUs',      val: '520+ Products',  sub: 'Stationery & Housekeeping',     subColor: 'text-primary-700' },
              { label: 'Pending Requisitions',      val: '₹1,84,500',      sub: 'Corporate & School POs',        subColor: 'text-amber-600'   },
            ].map(({ label, val, sub, subColor }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-[10px] p-4">
                <div className="text-[0.78rem] text-slate-500 font-semibold mb-1">{label}</div>
                <div className="text-[1.4rem] font-extrabold text-slate-900 mb-0.5">{val}</div>
                <div className={`text-[0.75rem] font-semibold ${subColor}`}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="mb-6">
            <h4 className="text-[0.95rem] font-bold text-slate-800 mb-3">Recent Institutional Orders (Hosur Hub)</h4>
            <div className="border border-slate-200 rounded-[10px] overflow-hidden overflow-x-auto">
              <table className="w-full border-collapse text-[0.82rem] text-left min-w-[560px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    {['Requisition #', 'Institution', 'Items', 'Value (₹)', 'Status'].map(th => (
                      <th key={th} className="px-3 py-2.5 font-semibold whitespace-nowrap">{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ref: 'JE-REQ-849120', org: 'Automotive Component Mfg, SIPCOT Ph II', items: 'JK Paper (8 Cartons), Floor Cleaner (12 Cans)', val: '₹29,040', status: 'Dispatched', statusCls: 'bg-green-100 text-green-700' },
                    { ref: 'JE-REQ-712394', org: 'St. Mary Matriculation Hr. Sec. School',   items: 'Long Registers, Whiteboard Markers, Hand Wash', val: '₹16,450', status: 'Packing',    statusCls: 'bg-amber-100 text-amber-700' },
                    { ref: 'JE-REQ-650119', org: 'Krishnagiri Multispecialty Clinic',         items: 'Disinfectant Concentrate, Biohazard Bags, Towels', val: '₹22,800', status: 'In Review', statusCls: 'bg-indigo-100 text-indigo-700' },
                  ].map(({ ref, org, items, val, status, statusCls }) => (
                    <tr key={ref} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2.5 font-semibold text-primary-700 whitespace-nowrap">{ref}</td>
                      <td className="px-3 py-2.5">{org}</td>
                      <td className="px-3 py-2.5 text-slate-600">{items}</td>
                      <td className="px-3 py-2.5 font-bold whitespace-nowrap">{val}</td>
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
          <div className="flex justify-end">
            <button
              className="bg-white border border-slate-300 text-slate-700 font-semibold text-[0.88rem] px-4 py-2 rounded-[8px] hover:bg-slate-50 hover:border-slate-400 transition-all"
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
