import React from 'react';
import { Mail, MapPin, Lock, ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAdminPreview, onExploreCatalog }) {

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to request wholesale product pricing.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <div className="logo-brand" style={{ color: '#ffffff' }}>
              <div className="je-logo-badge small">
                <div className="je-logo-inner">
                  <span className="je-letter-j">J</span>
                  <span className="je-letter-e">E</span>
                </div>
              </div>
              <div>
                <div className="logo-text" style={{ color: '#ffffff' }}>
                  JASVI <span style={{ color: '#38bdf8' }}>ENTERPRISES</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>
                  YOUR NEEDS OUR PRIORITY
                </div>
              </div>
            </div>

            <p>
              Wholesale supplier of Stationery & Housekeeping Materials for Companies, Offices, Hospitals, Colleges & Schools in Hosur.
            </p>

            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <Mail size={15} color="#38bdf8" />
                <a href="mailto:jasvienterprises28@gmail.com" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                  jasvienterprises28@gmail.com
                </a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={15} color="#38bdf8" />
                <span>Survey No. 193-1A1, Zuzuwadi, Hosur 1st Cross, Krishnagiri, Tamil Nadu</span>
              </div>
              <div className="footer-contact-item">
                <ShieldCheck size={15} color="#10b981" />
                <span>GST NUMBER: NIL</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button 
                className="btn btn-whatsapp btn-sm"
                onClick={handleWhatsAppContact}
              >
                <MessageSquare size={15} />
                <span>WhatsApp Inquiry</span>
              </button>
            </div>
          </div>

          {/* Stationery Products Column */}
          <div className="footer-col">
            <h4>Stationery Items</h4>
            <ul>
              <li><a href="#catalog" onClick={onExploreCatalog}>Paper (A4, A5, Legal)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Notebooks & Registers</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Pens, Pencils & Markers</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Files & Folders</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Staplers & Punches</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Sticky Notes & Tags</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Envelopes & Labels</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Art & Craft Materials</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Office Accessories</a></li>
            </ul>
          </div>

          {/* Housekeeping Products Column */}
          <div className="footer-col">
            <h4>Housekeeping Materials</h4>
            <ul>
              <li><a href="#catalog" onClick={onExploreCatalog}>Cleaning Chemicals</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Floor Cleaner (5L)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Glass Cleaner (5L)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Toilet Cleaner (5L)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Dish Wash Liquid (5L)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Hand Wash (5L)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Paper Napkins & Tissue</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Garbage Bags (XL)</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Mops, Brooms & Tools</a></li>
              <li><a href="#catalog" onClick={onExploreCatalog}>Dustbins & Storage</a></li>
            </ul>
          </div>

          {/* Target Sectors & Admin */}
          <div className="footer-col">
            <h4>Our Supply For</h4>
            <ul>
              <li><a href="#sectors">Companies & Factories</a></li>
              <li><a href="#sectors">Corporate Offices</a></li>
              <li><a href="#sectors">Hospitals & Clinics</a></li>
              <li><a href="#sectors">Colleges & Universities</a></li>
              <li><a href="#sectors">Schools & Academies</a></li>
              <li><a href="#calculator">Restock Calculator</a></li>
              <li>
                <button 
                  onClick={onOpenAdminPreview}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem', padding: 0, marginTop: '0.5rem' }}
                >
                  <Lock size={12} />
                  <span>Hosur Hub Portal</span>
                  <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong>Jasvi Enterprises</strong>. Hosur, Tamil Nadu. GST NUMBER: NIL.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="mailto:jasvienterprises28@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>jasvienterprises28@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
