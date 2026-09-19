import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TargetSectors from './components/TargetSectors';
import ProductShowcase from './components/ProductShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import LeadCaptureSection from './components/LeadCaptureSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminPreviewModal from './components/AdminPreviewModal';
import { MessageSquare } from 'lucide-react';

function App() {
  const [isAdminPreviewOpen, setIsAdminPreviewOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises! I would like to inquire about wholesale Stationery & Housekeeping supplies for my organization in Hosur.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
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

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white relative">
      
      {/* Floating WhatsApp Action Button (Pure Tailwind CSS) */}
      <button 
        type="button"
        onClick={handleFloatingWhatsApp}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-400/40 cursor-pointer group"
        title="Direct WhatsApp Inquiry"
        aria-label="Direct WhatsApp Inquiry"
      >
        <MessageSquare size={24} className="text-white" />
        <span className="hidden group-hover:block absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 shadow-xl whitespace-nowrap">
          Chat with Jasvi Enterprises
        </span>
      </button>

      {/* Top Sticky Navbar */}
      <Navbar
        onOpenAdminPreview={() => setIsAdminPreviewOpen(true)}
      />

      <main>
        {/* Hero Section with Video Animation */}
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
        onClose={() => setIsAdminPreviewOpen(false)}
      />

    </div>
  );
}

export default App;
