import React, { useState } from 'react';
import { Sparkles, Mail, Phone, MapPin, Check, Lock, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenAdminPreview, onExploreCatalog }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <div className="logo-brand" style={{ color: '#ffffff' }}>
              <div className="logo-icon-box">
                <Sparkles size={22} />
              </div>
              <div>
                <div className="logo-text" style={{ color: '#ffffff' }}>Pure<span style={{ color: '#5eead4' }}>Pro</span></div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Commercial Housekeeping Supplies
                </div>
              </div>
            </div>

            <p>
              Direct wholesale distributor of hospital-grade cleaning chemicals, ergonomic housekeeping carts, microfibers, and luxury room amenities. Serving commercial hospitality nationwide.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="#5eead4" />
                <span>1-800-555-PURE (24/7 Support)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="#5eead4" />
                <span>orders@pureprohousekeeping.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} color="#5eead4" />
                <span>Logistics Hubs: Atlanta • Chicago • Dallas • Reno</span>
              </div>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="footer-col">
            <h4>Housekeeping Materials</h4>
            <ul>
              <li><a href="#catalog" onClick={onExploreCatalog}>Cleaning Chemicals & Disinfectants</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Commercial Microfiber & Mops</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Trash Can Liners & Paper Towels</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Janitorial Carts & Caddies</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Hotel Room Amenities</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Safety Signs & Nitrile Gloves</a></li>
            </ul>
          </div>

          {/* Facility Support */}
          <div className="footer-col">
            <h4>Commercial Resources</h4>
            <ul>
              <li><a href="#calculator">Supply Usage Calculator</a></li>
              <li><a href="#faqs">Safety Data Sheets (SDS)</a></li>
              <li><a href="#faqs">Net-30 Commercial Credit Terms</a></li>
              <li><a href="#faqs">Scheduled Restock Delivery</a></li>
              <li><a href="#reviews">Verified Facility Case Studies</a></li>
              <li>
                <button 
                  onClick={onOpenAdminPreview}
                  style={{ background: 'transparent', border: 'none', color: '#5eead4', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
                >
                  <Lock size={12} />
                  <span>Admin & Operations Portal</span>
                  <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Volume Deals */}
          <div className="footer-col footer-newsletter">
            <h4>Wholesale Inventory Alerts</h4>
            <p>
              Subscribe for flash bulk pallet discounts, quarterly chemical price indices, and seasonal hospitality restock alerts.
            </p>

            <form onSubmit={handleNewsletter} className="newsletter-form">
              <input 
                type="email" 
                required 
                placeholder="procurement@hotel.com" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Your work email"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                {subscribed ? <Check size={16} /> : 'Join'}
              </button>
            </form>
            {subscribed && (
              <div style={{ color: '#5eead4', fontSize: '0.78rem', marginTop: '0.5rem', fontWeight: 600 }}>
                ✓ Subscribed! You will receive wholesale discount alerts.
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} PurePro Supply Co. All Rights Reserved. OSHA & EPA Compliant Supply Partner.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--slate-500)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--slate-500)', textDecoration: 'none' }}>Commercial Terms of Sale</a>
            <a href="#" style={{ color: 'var(--slate-500)', textDecoration: 'none' }}>SDS Repository</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
