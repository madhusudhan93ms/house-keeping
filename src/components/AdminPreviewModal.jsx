import React from 'react';
import { X, LayoutDashboard, CheckCircle } from 'lucide-react';

export default function AdminPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: 840 }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid var(--slate-200)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #0b1528, #1e3a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Jasvi Enterprises — Hosur Warehouse & Ops Portal
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)' }}>
                Inventory Dispatch & Institutional Requisition Management
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close admin modal">
            <X size={20} />
          </button>
        </div>

        {/* Informational Banner */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <CheckCircle size={24} color="#16a34a" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.92rem' }}>
              Live Requisition Sync Active
            </div>
            <div style={{ fontSize: '0.84rem', color: '#15803d', marginTop: 2 }}>
              Customer orders placed on the frontend flow directly into this warehouse queue. Dispatch challans are generated with reference to Survey No. 193-1A1, Zuzuwadi, Hosur.
            </div>
          </div>
        </div>

        {/* Dashboard Preview Cards */}
        <div className="admin-stats-grid">
          <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Active PO Queue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>14 Requisitions</div>
            <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.2rem', fontWeight: 600 }}>● 5 Out for Hosur Dispatch</div>
          </div>

          <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Warehouse Stock SKUs</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>520+ Products</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)', marginTop: '0.2rem', fontWeight: 600 }}>Stationery & Housekeeping</div>
          </div>

          <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Pending Requisitions</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>₹1,84,500</div>
            <div style={{ fontSize: '0.75rem', color: '#d97706', marginTop: '0.2rem', fontWeight: 600 }}>Corporate & School POs</div>
          </div>
        </div>

        {/* Recent Inquiries / Dispatch List */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '0.75rem' }}>
            Recent Institutional Orders (Hosur Hub)
          </h4>

          <div style={{ border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', borderBottom: '1px solid var(--slate-200)' }}>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Requisition #</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Institution</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Items</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Value (₹)</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--slate-100)' }}>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: 'var(--primary-700)' }}>JE-REQ-849120</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>Automotive Component Mfg, SIPCOT Ph II</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>JK Paper (8 Cartons), Floor Cleaner (12 Cans)</td>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>₹29,040</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}><span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>Dispatched</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--slate-100)' }}>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: 'var(--primary-700)' }}>JE-REQ-712394</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>St. Mary Matriculation Hr. Sec. School</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>Long Registers, Whiteboard Markers, Hand Wash</td>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>₹16,450</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}><span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>Packing</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: 'var(--primary-700)' }}>JE-REQ-650119</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>Krishnagiri Multispecialty Clinic</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>Disinfectant Concentrate, Biohazard Bags, Towels</td>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>₹22,800</td>
                  <td style={{ padding: '0.65rem 0.85rem' }}><span style={{ background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>In Review</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
}
