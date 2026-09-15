import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Search, Lock, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdminPreview, searchQuery, setSearchQuery }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Materials Catalog', href: '#catalog' },
    { label: 'Supply Calculator', href: '#calculator' },
    { label: 'Why PurePro', href: '#features' },
    { label: 'Verified Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Announcement Bar */}
      <aside aria-label="Announcement" className="announcement-bar">
        <div className="container announcement-inner">
          <span>⚡ <strong>Wholesale Restock:</strong> Free Freight on orders over $350</span>
          <span className="announcement-divider">•</span>
          <span>📞 24/7 Facility Support: <strong>1-800-555-PURE</strong></span>
          <span className="announcement-divider">•</span>
          <span>🛡️ EPA & OSHA Certified Housekeeping Materials</span>
        </div>
      </aside>

      {/* Main Navbar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="container nav-container">
          {/* Left: Brand Logo */}
          <div className="nav-left">
            <a href="#" className="logo-brand">
              <div className="logo-icon-box">
                <Sparkles size={20} />
              </div>
              <div className="logo-text-group">
                <div className="logo-text">Pure<span>Pro</span></div>
                <div className="logo-subtitle">
                  Housekeeping Supplies
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
                placeholder="Search supplies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search housekeeping supplies"
              />
            </div>

            {/* Cart Drawer Trigger */}
            <button 
              className="nav-btn nav-btn-cart" 
              onClick={onOpenCart}
              aria-label={`View Cart with ${cartCount} items`}
            >
              <ShoppingBag size={17} />
              <span className="btn-label">Order List</span>
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
              <Lock size={15} color="var(--primary-700)" />
              <span className="btn-label">Admin</span>
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
                  placeholder="Search housekeeping supplies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search housekeeping supplies"
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
                  <span>View Order List ({cartCount})</span>
                </button>

                <button 
                  className="nav-btn nav-btn-admin mobile-action-btn"
                  onClick={() => { setIsMobileMenuOpen(false); onOpenAdminPreview(); }}
                >
                  <Lock size={15} color="var(--primary-700)" />
                  <span>Admin Operations</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
