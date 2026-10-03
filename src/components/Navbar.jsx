import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { LEAD_CONFIG, getWhatsAppUrl } from '../config/leadConfig';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sectors We Supply', href: '#sectors' },
    { label: 'Key Materials', href: '#materials' },
    { label: 'Why Jasvi', href: '#why-us' },
    { label: 'Supply Network', href: '#coverage' },
    { label: 'Hosur Hub & FAQ', href: '#faq' }
  ];

  const handleScrollToQuote = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppContact = () => {
    window.open(getWhatsAppUrl("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur."), '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className={`bg-slate-100/95 border-b border-slate-200 text-slate-700 transition-all duration-300 ${
        isScrolled ? 'max-h-0 opacity-0 py-0 overflow-hidden pointer-events-none' : 'max-h-20 opacity-100 py-1.5'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              Wholesale B2B Distribution
            </span>
            <span className="hidden sm:inline text-slate-600">
              Direct Supply for Companies, Offices, Hospitals & Schools
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-700">
              <MapPin size={12} className="text-teal-600" />
              {LEAD_CONFIG.fulfillmentHub}
            </span>
            <a href={`tel:${LEAD_CONFIG.phoneTel}`} className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold transition-colors">
              <Phone size={12} />
              <span>{LEAD_CONFIG.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md shadow-slate-200/50'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group no-underline">
            <img
              src="/je-logo.png"
              alt="Jasvi Enterprises Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                JASVI <span className="text-teal-600">ENTERPRISES</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-teal-700 tracking-wider uppercase mt-0.5">
                Wholesale Supplier • Hosur
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageSquare size={14} className="text-emerald-100" />
              <span>WhatsApp RFQ</span>
            </button>
            <a
              href="#lead-form"
              onClick={handleScrollToQuote}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 shadow-md shadow-teal-700/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Get Wholesale Quote</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/98 border-b border-slate-200 px-4 py-5 backdrop-blur-2xl animate-fade-in shadow-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-teal-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5 mt-2">
                <a
                  href="#lead-form"
                  onClick={handleScrollToQuote}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md transition-all"
                >
                  <span>Request Wholesale Quote</span>
                  <ArrowRight size={14} />
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleWhatsAppContact();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all"
                >
                  <MessageSquare size={14} />
                  <span>Instant WhatsApp RFQ</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
