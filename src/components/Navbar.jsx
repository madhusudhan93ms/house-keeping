import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, MessageSquare, ArrowRight, Phone } from 'lucide-react';

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
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className={`bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 border-b border-teal-500/20 text-slate-300 transition-all duration-300 ${
        isScrolled ? 'max-h-0 opacity-0 py-0 overflow-hidden pointer-events-none' : 'max-h-20 opacity-100 py-1.5'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Wholesale B2B Distribution
            </span>
            <span className="hidden sm:inline text-slate-400">
              Direct Supply for Companies, Offices, Hospitals & Schools
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin size={12} className="text-teal-400" />
              OSS Roja Nagar, Zuzuwadi, Hosur (TN)
            </span>
            <a href="tel:+919487000000" className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 transition-colors">
              <Phone size={12} />
              <span>+91 94870 00000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl shadow-black/40'
          : 'bg-slate-900/70 backdrop-blur-md border-b border-slate-800/50'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group no-underline">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-slate-800 via-teal-950 to-slate-900 p-[1px] shadow-lg shadow-teal-900/20 group-hover:shadow-teal-500/30 transition-all duration-300">
              <div className="w-full h-full rounded-[11px] bg-slate-900/90 flex items-center justify-center border border-teal-500/30">
                <span className="font-extrabold text-lg sm:text-xl tracking-tighter bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  JE
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl text-white tracking-tight leading-none group-hover:text-teal-300 transition-colors">
                JASVI <span className="text-teal-400">ENTERPRISES</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-teal-300/80 tracking-wider uppercase mt-0.5">
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
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/40 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageSquare size={14} className="text-emerald-200" />
              <span>WhatsApp RFQ</span>
            </button>
            <a
              href="#lead-form"
              onClick={handleScrollToQuote}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 shadow-lg shadow-teal-900/50 hover:shadow-teal-500/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Get Wholesale Quote</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/98 border-b border-slate-800 px-4 py-5 backdrop-blur-2xl animate-fade-in shadow-2xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-teal-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5 mt-2">
                <a
                  href="#lead-form"
                  onClick={handleScrollToQuote}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 shadow-lg shadow-teal-900/40"
                >
                  <span>Request Wholesale Quote</span>
                  <ArrowRight size={15} />
                </a>
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40"
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
