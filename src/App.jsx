import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TargetSectors from './components/TargetSectors';
import ProductCatalog from './components/ProductCatalog';
import BulkCalculator from './components/BulkCalculator';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import AdminPreviewModal from './components/AdminPreviewModal';
import { PRODUCTS } from './data/products';
import { CheckCircle2, MessageSquare } from 'lucide-react';

function App() {
  const [cart, setCart] = useState(() => {
    // Initial sample wholesale items from Stationery and Housekeeping
    return [
      { ...PRODUCTS[0], qty: 3 }, // JK Copier A4 Paper (3 Cartons - wholesale tier)
      { ...PRODUCTS[13], qty: 4 }  // Hospital Disinfectant Liquid 5L (4 Cans - wholesale tier)
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminPreviewOpen, setIsAdminPreviewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add single item or multiple units
  const handleAddToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`Added ${qty} × ${product.name} to wholesale requisition`);
  };

  // Add bundle items from Bulk Calculator
  const handleAddBundleToCart = (bundleItems) => {
    setCart(prev => {
      let updated = [...prev];
      bundleItems.forEach(bundleItem => {
        const prod = PRODUCTS.find(p => p.id === bundleItem.id);
        if (!prod) return;
        const existingIdx = updated.findIndex(item => item.id === bundleItem.id);
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            qty: updated[existingIdx].qty + bundleItem.qty
          };
        } else {
          updated.push({ ...prod, qty: bundleItem.qty });
        }
      });
      return updated;
    });
    showToast(`Added complete monthly restock bundle to your order!`);
  };

  // Update item quantity in cart
  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, qty: newQty } : item
    ));
  };

  // Remove single item
  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises! I would like to inquire about wholesale Stationery & Housekeeping supplies.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          background: '#0b1528',
          color: '#ffffff',
          padding: '0.8rem 1.5rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: '1px solid rgba(56, 189, 248, 0.4)',
          animation: 'fadeInScale 0.25s ease'
        }}>
          <CheckCircle2 size={19} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <button 
        className="floating-whatsapp-btn"
        onClick={handleFloatingWhatsApp}
        title="Direct WhatsApp Inquiry"
        aria-label="Direct WhatsApp Inquiry"
      >
        <MessageSquare size={24} />
        <span className="floating-tooltip">Chat with Jasvi Enterprises</span>
      </button>

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdminPreview={() => setIsAdminPreviewOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onExploreCatalog={scrollToCatalog}
        />

        {/* Our Supply For: Target Sectors (Companies, Offices, Hospitals, College, Schools) */}
        <TargetSectors 
          onExploreCatalog={scrollToCatalog}
        />

        {/* Product Catalog */}
        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Interactive Bulk Supply Usage Calculator */}
        <BulkCalculator
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* FAQs */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminPreview={() => setIsAdminPreviewOpen(true)}
        onExploreCatalog={scrollToCatalog}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Admin Preview Modal */}
      <AdminPreviewModal
        isOpen={isAdminPreviewOpen}
        onClose={() => setIsAdminPreviewOpen(false)}
      />
    </div>
  );
}

export default App;
