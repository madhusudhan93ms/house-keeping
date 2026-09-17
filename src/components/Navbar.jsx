import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Lock, Menu, X, Mail, MapPin, MessageSquare, Zap } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdminPreview, searchQuery, setSearchQuery }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-[100] w-full transition-all duration-300">
      {/* Announcement Bar */}
      <aside
        aria-label="Announcement"
        className={`bg-gradient-to-r from-[#090e1a] to-[#0b2528] border-b border-white/8 overflow-hidden transition-all duration-300 ${
          isScrolled ? 'max-h-0 opacity-0 py-0 pointer-events-none invisible' : 'max-h-[50px] opacity-100 py-1.5'
        }`}
      >
        <div className="w-full max-w-[1320px] mx-auto px-5">
          <div className="flex justify-center items-center gap-4 flex-wrap font-medium text-white">
            <span className="announcement-pill">
              <Zap size={11} strokeWidth={3} />
              <span>ONLY WHOLESALE PRICE</span>
            </span>
            <span className="announcement-text">Best Quality • Competitive Price • On Time Delivery</span>
            <span className="text-white/30">•</span>
            <a href="mailto:jasvienterprises28@gmail.com" className="announcement-link">
              <Mail size={13} />
              <span>jasvienterprises28@gmail.com</span>
            </a>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="announcement-location hidden sm:inline-flex">
              <MapPin size={13} />
              <span>At Hosur, Krishnagiri (Tamil Nadu)</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Main Navbar */}
      <nav
        className={`bg-white/96 backdrop-blur-md border-b border-slate-200 transition-shadow duration-250 ${
          isScrolled ? 'shadow-[0_4px_20px_-2px_rgba(15,23,42,0.08)]' : 'shadow-[0_2px_10px_rgba(15,23,42,0.04)]'
        }`}
        aria-label="Main Navigation"
      >
        <div className="w-full max-w-[1320px] mx-auto px-5 flex items-center justify-between h-[72px] gap-3">
          {/* Logo */}
          <div className="flex-none">
            <a href="#" className="flex items-center gap-2.5 no-underline">
              <div className="je-logo-badge">
                <div className="je-logo-swoosh" />
                <div className="je-logo-inner">
                  <span className="je-letter-j">J</span>
                  <span className="je-letter-e">E</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-[var(--font-heading)] text-[1.28rem] font-extrabold text-slate-900 tracking-tight leading-tight">
                  JASVI <span className="text-primary-600">ENTERPRISES</span>
                </div>
                <div className="text-[0.62rem] text-slate-500 font-bold tracking-widest uppercase">
                  <span className="tagline-highlight">Your Needs Our Priority</span> • Wholesale Supplier
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-1 list-none m-0 p-0">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="inline-flex items-center text-slate-600 font-semibold text-[0.85rem] no-underline px-2.5 py-1.5 rounded-[10px] whitespace-nowrap transition-all duration-150 hover:text-primary-800 hover:bg-primary-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-none">
            {/* Search — hidden on mobile */}
            <div className="relative hidden lg:flex items-center">
              <Search className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
              <input
                type="text"
                className="h-[38px] w-[145px] pl-8 pr-3 rounded-[10px] border border-slate-300 bg-white text-[0.84rem] text-slate-800 outline-none transition-all duration-150 focus:w-[180px] focus:border-primary-600 focus:ring-2 focus:ring-primary-500/15"
                placeholder="Search paper, chemicals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search stationery and housekeeping supplies"
              />
            </div>

            {/* WhatsApp — hidden on small mobile */}
            <button
              className="nav-btn-whatsapp hidden sm:inline-flex h-[38px] items-center justify-center gap-1.5 px-3 rounded-[10px] font-semibold text-[0.84rem] cursor-pointer whitespace-nowrap transition-all duration-150"
              onClick={handleWhatsAppContact}
              title="Quick Inquiry on WhatsApp"
              aria-label="Quick WhatsApp Inquiry"
            >
              <MessageSquare size={16} />
              <span className="hidden xl:inline">WhatsApp</span>
            </button>

            {/* Cart */}
            <button
              className="h-[38px] inline-flex items-center justify-center gap-1.5 px-3 rounded-[10px] font-semibold text-[0.84rem] cursor-pointer whitespace-nowrap transition-all duration-150 bg-slate-50 border border-slate-300 text-slate-800 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-800"
              onClick={onOpenCart}
              aria-label={`View Cart with ${cartCount} items`}
            >
              <ShoppingBag size={17} />
              <span className="hidden xl:inline">Wholesale Requisition</span>
              {cartCount > 0 && (
                <span className="bg-primary-600 text-white text-[0.72rem] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-tight">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin */}
            <button
              className="h-[38px] hidden md:inline-flex items-center justify-center gap-1.5 px-3 rounded-[10px] font-semibold text-[0.84rem] cursor-pointer whitespace-nowrap transition-all duration-150 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900"
              onClick={onOpenAdminPreview}
              title="Admin & Warehouse Portal"
              aria-label="Admin Portal"
            >
              <Lock size={15} />
              <span className="hidden xl:inline">Warehouse</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-[38px] h-[38px] inline-flex items-center justify-center rounded-[10px] border border-slate-300 bg-white text-slate-800 cursor-pointer transition-all duration-150 hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg animate-fade-scale">
            <div className="w-full max-w-[1320px] mx-auto px-5 pt-4 pb-6">
              {/* Mobile Search */}
              <div className="relative flex items-center mb-4">
                <Search className="absolute left-3 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="text"
                  className="w-full h-[40px] pl-9 pr-3 rounded-[10px] border border-slate-300 bg-white text-[0.88rem] text-slate-800 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/15"
                  placeholder="Search stationery & housekeeping..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search supplies"
                />
              </div>

              {/* Mobile Links */}
              <ul className="list-none m-0 p-0 flex flex-col gap-1 mb-4">
                {navLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="block px-3 py-2.5 rounded-[10px] text-slate-800 font-semibold text-[0.95rem] no-underline transition-all duration-150 hover:bg-primary-50 hover:text-primary-700"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Actions */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <button
                  className="w-full h-[42px] flex items-center justify-center gap-2 rounded-[10px] bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-[0.88rem] cursor-pointer hover:bg-primary-50 hover:border-primary-300"
                  onClick={() => { setIsMobileMenuOpen(false); onOpenCart(); }}
                >
                  <ShoppingBag size={17} />
                  <span>Cart ({cartCount})</span>
                </button>
                <button
                  className="nav-btn-whatsapp w-full h-[42px] flex items-center justify-center gap-2 rounded-[10px] font-semibold text-[0.88rem] cursor-pointer"
                  onClick={handleWhatsAppContact}
                >
                  <MessageSquare size={17} />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Mobile Contact Card */}
              <div className="mt-4 p-3 bg-slate-50 rounded-[10px] border border-slate-100">
                <div className="font-bold text-[0.88rem] text-slate-800 mb-1">Jasvi Enterprises • Hosur Hub</div>
                <div className="text-[0.8rem] text-slate-600">Survey No. 193-1A1, Zuzuwadi, Hosur 1st Cross, Krishnagiri, TN.</div>
                <div className="text-[0.8rem] text-primary-700 mt-1 font-semibold">jasvienterprises28@gmail.com</div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
