import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TargetSectors from './components/TargetSectors';
import ProductShowcase from './components/ProductShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import ClientReviewsSection from './components/ClientReviewsSection';
import SeoCoverageSection from './components/SeoCoverageSection';
import LeadCaptureSection from './components/LeadCaptureSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminPreviewModal from './components/AdminPreviewModal';
import { ArrowUp } from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';
import { useScrollProgress } from './hooks/useScrollReveal';
import { getWhatsAppUrl } from './config/leadConfig';

function App() {
  const [isAdminPreviewOpen, setIsAdminPreviewOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Global scroll progress indicator (0 - 100%)
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret admin route listener (#admin, #jasvi-admin) and Ctrl+Shift+A shortcut
  useEffect(() => {
    const checkAdminHash = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash === '#admin' || hash === '#jasvi-admin') {
        setIsAdminPreviewOpen(true);
      }
    };

    window.addEventListener('hashchange', checkAdminHash);
    checkAdminHash();

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminPreviewOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdminModal = () => {
    setIsAdminPreviewOpen(false);
    const hash = (window.location.hash || '').toLowerCase();
    if (hash === '#admin' || hash === '#jasvi-admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleFloatingWhatsApp = () => {
    window.open(getWhatsAppUrl("Hello Jasvi Enterprises! I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur."), '_blank');
  };

  const handleSelectSector = (sector) => {
    setSelectedSector(sector);
    const formEl = document.getElementById('lead-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    const formEl = document.getElementById('lead-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLeadForm = () => {
    const formEl = document.getElementById('lead-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white relative">
      
      {/* ── Top Reading Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-slate-200/40">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 shadow-sm shadow-teal-500/50 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating WhatsApp Action Button (Pure Tailwind CSS) */}
      <button 
        type="button"
        onClick={handleFloatingWhatsApp}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-700/30 hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-400/40 cursor-pointer group"
        title="Direct WhatsApp Inquiry"
        aria-label="Direct WhatsApp Inquiry"
      >
        <WhatsAppIcon size={26} className="text-white" />
        <span className="hidden group-hover:block absolute right-16 bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-xl whitespace-nowrap">
          Chat with Jasvi Enterprises
        </span>
      </button>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-white/95 text-slate-700 hover:text-teal-700 flex items-center justify-center shadow-lg shadow-slate-300/50 border border-slate-200 hover:border-teal-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Top Sticky Navbar */}
      <Navbar
        onOpenAdminPreview={() => setIsAdminPreviewOpen(true)}
      />

      <main>
        {/* Hero Section with Parallax and Floating Material Badges */}
        <Hero
          onExploreForm={scrollToLeadForm}
        />

        {/* Target Institutional Sectors */}
        <TargetSectors
          onSelectSector={handleSelectSector}
        />

        {/* Curated Material Showcase (No Prices / No Carts) */}
        <ProductShowcase
          onSelectItemForQuote={handleSelectProduct}
        />

        {/* Why Choose Jasvi (Trust & Hosur Advantages) */}
        <WhyChooseUs />

        {/* Client Reviews & Verified B2B Testimonials */}
        <ClientReviewsSection />

        {/* Wholesale Housekeeping & Stationery Supply Coverage (Hosur, TN, KA & India) */}
        <SeoCoverageSection />

        {/* Primary High-Converting Wholesale Lead Generation Section */}
        <LeadCaptureSection
          selectedSector={selectedSector}
          selectedProduct={selectedProduct}
        />

        {/* Hosur Hub Location & FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminPreview={() => setIsAdminPreviewOpen(true)}
      />

      {/* Admin Leads Preview & Excel Export Modal */}
      <AdminPreviewModal
        isOpen={isAdminPreviewOpen}
        onClose={handleCloseAdminModal}
      />

    </div>
  );
}

export default App;
