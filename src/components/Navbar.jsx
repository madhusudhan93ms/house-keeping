import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Lock, Menu, X, Mail, MapPin, MessageSquare, Zap } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdminPreview, searchQuery, setSearchQuery }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#catalog' },
    { label: 'Sectors', href: '#sectors' },
    { label: 'Estimator', href: '#calculator' },
    { label: 'FAQs', href: '#faqs' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Announcement & Contact Bar */}
      <aside aria-label="Announcement" className="announcement-bar">
        <div className="container announcement-inner">
          <span className="announcement-pill">
            <Zap size={11} strokeWidth={3} className="pill-stroke-icon" />
            <span>ONLY WHOLESALE PRICE</span>
          </span>
          <span className="announcement-text">
            Best Quality • Competitive Price • On Time Delivery
          </span>
          <span className="announcement-divider">•</span>
          <a href="mailto:jasvienterprises28@gmail.com" className="announcement-link">
            <Mail size={13} />
            <span>jasvienterprises28@gmail.com</span>
          </a>
          <span className="announcement-divider">•</span>
          <span className="announcement-location">
            <MapPin size={13} />
            <span>At Hosur, Krishnagiri (Tamil Nadu)</span>
          </span>
        </div>
      </aside>

      {/* Main Navbar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="container nav-container">
          {/* Left: Brand Logo with Stylized JE Monogram */}
          <div className="nav-left">
            <a href="#" className="logo-brand">
              <div className="je-logo-badge">
                <div className="je-logo-swoosh"></div>
                <div className="je-logo-inner">
                  <span className="je-letter-j">J</span>
                  <span className="je-letter-e">E</span>
                </div>
              </div>
              <div className="logo-text-group">
                <div className="logo-text">
                  JASVI <span>ENTERPRISES</span>
                </div>
                <div className="logo-subtitle">
                  <span className="tagline-highlight">Your Needs Our Priority</span> • Wholesale Supplier
                </div>
              </div>
            </a>
          </div>

          {/* Center: Nav Links */}
          <div className="nav-center">
            <ul className="nav-links">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="nav-right">
            {/* Quick Search */}
            <div className="nav-search-wrapper">
              <Search className="nav-search-icon" size={16} />
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search paper, chemicals, mops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search stationery and housekeeping supplies"
              />
            </div>

            {/* Quick WhatsApp Link */}
            <button 
              className="nav-btn nav-btn-whatsapp"
              onClick={handleWhatsAppContact}
              title="Quick Inquiry on WhatsApp"
              aria-label="Quick WhatsApp Inquiry"
            >
              <MessageSquare size={16} />
              <span className="btn-label">WhatsApp</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              className="nav-btn nav-btn-cart" 
              onClick={onOpenCart}
              aria-label={`View Cart with ${cartCount} items`}
            >
              <ShoppingBag size={17} />
              <span className="btn-label">Wholesale Requisition</span>
              {cartCount > 0 && (
                <span className="cart-badge-pill">{cartCount}</span>
              )}
            </button>

            {/* Admin Portal Gateway */}
            <button 
              className="nav-btn nav-btn-admin"
              onClick={onOpenAdminPreview}
              title="Admin & Warehouse Portal"
              aria-label="Admin Portal"
            >
              <Lock size={15} />
              <span className="btn-label">Warehouse</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-dropdown">
            <div className="container">
              {/* Mobile Search */}
              <div className="mobile-search-wrapper">
                <Search className="nav-search-icon" size={16} />
                <input
                  type="text"
                  className="nav-search-input mobile-input"
                  placeholder="Search stationery & housekeeping..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search supplies"
                />
              </div>

              <ul className="mobile-nav-links">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href} 
                      className="mobile-nav-link"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mobile-actions-row">
                <button 
                  className="nav-btn nav-btn-cart mobile-action-btn"
                  onClick={() => { setIsMobileMenuOpen(false); onOpenCart(); }}
                >
                  <ShoppingBag size={17} />
                  <span>Requisition Cart ({cartCount})</span>
                </button>

                <button 
                  className="nav-btn nav-btn-whatsapp mobile-action-btn"
                  onClick={handleWhatsAppContact}
                >
                  <MessageSquare size={17} />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>

              <div className="mobile-contact-card">
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--slate-800)', marginBottom: '0.3rem' }}>
                  Jasvi Enterprises • Hosur Hub
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                  Survey No. 193-1A1, Zuzuwadi, Hosur 1st Cross, Krishnagiri, TN.
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', marginTop: '0.3rem', fontWeight: 600 }}>
                  jasvienterprises28@gmail.com
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
