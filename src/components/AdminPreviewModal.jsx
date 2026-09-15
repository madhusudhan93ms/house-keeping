import React from 'react';
import { X, LayoutDashboard, Package, TrendingUp, Users, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function AdminPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: 820 }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid var(--slate-200)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--slate-900), var(--slate-800))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5eead4' }}>
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                PurePro Admin & Warehouse Operations Portal
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)' }}>
                Phase 2 Architecture Preview (Coming Next)
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close admin modal">
            <X size={20} />
          </button>
        </div>

        {/* Informational Banner */}
        <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-200)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <CheckCircle size={24} color="var(--primary-700)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--primary-900)', fontSize: '0.92rem' }}>
              Landing Page Successfully Established!
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--primary-800)', marginTop: 2 }}>
              Your customer-facing landing page and order flow are live. As requested, the dedicated Admin Management Portal will be built in the next step to manage inventory, incoming POs, and product pricing.
            </div>
          </div>
        </div>

        {/* Dashboard Preview Cards */}
        <div className="admin-stats-grid">
          <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Active PO Queue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>18 Orders</div>
            <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.2rem', fontWeight: 600 }}>● 6 Ready for Dispatch</div>
          </div>

          <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Warehouse Stock SKUs</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>2,410 Units</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)', marginTop: '0.2rem', fontWeight: 600 }}>98.4% In-Stock Rate</div>
          </div>

          <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>Pending Requisitions</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>$42,850</div>
            <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '0.2rem', fontWeight: 600 }}>Net-30 Approval Flow</div>
          </div>
        </div>

        {/* Roadmap Feature Checklist */}
        <div style={{ background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
            Planned Admin Portal Modules for Phase 2:
          </h4>
          <div className="admin-modules-grid">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={16} color="var(--primary-600)" />
              <span>Inventory & Low-Stock Alerts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} color="var(--primary-600)" />
              <span>Bulk Pricing & Tier Editor</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={16} color="var(--primary-600)" />
              <span>Hotel & Facility Account Profiles</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} color="var(--primary-600)" />
              <span>SDS Safety Sheet Uploader</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Preview
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            <span>Return to Landing Page</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
