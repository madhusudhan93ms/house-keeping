import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, MapPin, ArrowRight, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { LEAD_CONFIG, getWhatsAppUrl } from '../config/leadConfig';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background screen scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Save current scroll offset
    const currentScrollY = window.scrollY;

    // Save previous styles
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverscroll = document.body.style.overscrollBehavior;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    // Lock scrolling on both html and body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      const menu = mobileMenuRef.current;

      // If touch target is outside the mobile menu (e.g. backdrop, header, bottom page), block it completely
      if (!menu || !menu.contains(e.target)) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      // Inside menu: allow scrolling only if menu itself overflows, but block bounce/chaining to bg
      const isScrollable = menu.scrollHeight > menu.clientHeight;
      if (!isScrollable) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      if (e.touches && e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const isDraggingDown = currentY > touchStartY; // swiping downwards (scrolling up)
        const isDraggingUp = currentY < touchStartY;   // swiping upwards (scrolling down)

        // At top boundary: prevent pull-down bounce from scrolling the background
        if (isDraggingDown && menu.scrollTop <= 0) {
          if (e.cancelable) {
            e.preventDefault();
          }
        }
        // At bottom boundary: prevent pull-up bounce from scrolling the background
        else if (isDraggingUp && menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1) {
          if (e.cancelable) {
            e.preventDefault();
          }
        }
      }
    };

    const handleWheel = (e) => {
      const menu = mobileMenuRef.current;
      if (!menu || !menu.contains(e.target)) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      const isScrollable = menu.scrollHeight > menu.clientHeight;
      if (!isScrollable) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      if (e.deltaY < 0 && menu.scrollTop <= 0) {
        if (e.cancelable) {
          e.preventDefault();
        }
      } else if (e.deltaY > 0 && menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    // Use { passive: false } so e.preventDefault() reliably halts touch scrolling
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
      document.body.style.overscrollBehavior = prevBodyOverscroll;

      if (window.scrollY !== currentScrollY) {
        window.scrollTo(0, currentScrollY);
      }

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Sectors We Supply', shortLabel: 'Sectors', href: '#sectors' },
    { label: 'Key Materials', shortLabel: 'Materials', href: '#materials' },
    { label: 'Why Jasvi', shortLabel: 'Why Jasvi', href: '#why-us' },
    { label: 'Client Reviews', shortLabel: 'Reviews', href: '#reviews' },
    { label: 'Supply Network', shortLabel: 'Coverage', href: '#coverage' },
    { label: 'Hosur Hub & FAQ', shortLabel: 'Hub & FAQ', href: '#faq' }
  ];

  const handleNavLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const targetId = href.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 30);
        });
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleScrollToQuote = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById('lead-form');
    if (el) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 30);
      });
    }
  };

  const handleWhatsAppContact = () => {
    window.open(getWhatsAppUrl("Hello Jasvi Enterprises, I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur."), '_blank');
  };

  return (
    <>
      <header className={`top-0 left-0 right-0 w-full transition-all duration-300 ${
        isMobileMenuOpen ? 'fixed z-[60] shadow-md' : 'sticky z-50'
      }`}>
        {/* Top Announcement Bar */}
        <div className={`bg-slate-100/95 border-b border-slate-200 text-slate-700 transition-all duration-300 ${
          (isScrolled || isMobileMenuOpen) ? 'max-h-0 opacity-0 py-0 overflow-hidden pointer-events-none' : 'max-h-20 opacity-100 py-1.5'
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
          (isScrolled || isMobileMenuOpen)
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md shadow-slate-200/50'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80'
        }`}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 lg:gap-4 xl:gap-8 h-16 sm:h-20">
            
            {/* Brand Logo - Guaranteed dedicated width and separation */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group no-underline shrink-0 mr-1 xl:mr-3">
              <img
                src="/je-logo-sm.webp"
                alt="Jasvi Enterprises Logo"
                width="48"
                height="48"
                loading="eager"
                decoding="async"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
              />
              <div className="flex flex-col shrink-0">
                <span className="font-extrabold text-base sm:text-lg xl:text-xl text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors whitespace-nowrap">
                  JASVI <span className="text-teal-600">ENTERPRISES</span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-teal-700 tracking-wider uppercase mt-0.5 whitespace-nowrap">
                  Wholesale Supplier • Hosur
                </span>
              </div>
            </a>

            {/* Desktop Nav Links - Cleanly spaced with responsive short labels on laptop screens */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-[13px] 2xl:text-sm font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 transition-all whitespace-nowrap shrink-0"
                >
                  <span className="hidden xl:inline">{link.label}</span>
                  <span className="xl:hidden">{link.shortLabel}</span>
                </a>
              ))}
            </div>

            {/* Action CTA */}
            <div className="hidden sm:flex items-center shrink-0">
              <a
                href="#lead-form"
                onClick={handleScrollToQuote}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 shadow-md shadow-teal-700/25 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="whitespace-nowrap">Get Wholesale Quote</span>
                <ArrowRight size={15} className="shrink-0" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer relative z-50"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="relative z-50 lg:hidden bg-white/98 border-b border-slate-200 px-4 py-5 backdrop-blur-2xl animate-fade-in shadow-xl max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-teal-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5 mt-2">
                  <a
                    href="#lead-form"
                    onClick={handleScrollToQuote}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md transition-all cursor-pointer"
                  >
                    <span>Request Wholesale Quote</span>
                    <ArrowRight size={14} />
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleWhatsAppContact();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer"
                  >
                    <WhatsAppIcon size={16} className="text-emerald-700 shrink-0" />
                    <span>Instant WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Backdrop overlay portaled to document.body to cover the entire viewport and block background touches */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
          style={{ touchAction: 'none' }}
          aria-hidden="true"
        />,
        document.body
      )}

      {/* Flow placeholder to prevent layout jump while header is fixed */}
      {isMobileMenuOpen && (
        <div 
          className={`w-full pointer-events-none ${isScrolled ? 'h-16 sm:h-20' : 'h-24 sm:h-28'}`} 
          aria-hidden="true" 
        />
      )}
    </>
  );
}
