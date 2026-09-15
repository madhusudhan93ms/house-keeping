import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import BulkCalculator from './components/BulkCalculator';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import AdminPreviewModal from './components/AdminPreviewModal';
import { PRODUCTS } from './data/products';
import { CheckCircle2 } from 'lucide-react';

function App() {
  const [cart, setCart] = useState(() => {
    // Initial sample order so the user immediately sees how it works
    return [
      { ...PRODUCTS[0], qty: 6 },
      { ...PRODUCTS[1], qty: 10 }
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
    showToast(`Added ${qty} × ${product.name} to order`);
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
    showToast(`Added recommended restock bundle to your order!`);
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

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          background: 'var(--slate-900)',
          color: '#ffffff',
          padding: '0.75rem 1.4rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: '1px solid rgba(20, 184, 166, 0.4)',
          animation: 'fadeInScale 0.25s ease'
        }}>
          <CheckCircle2 size={18} color="#14b8a6" />
          <span>{toastMessage}</span>
        </div>
      )}

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
          onOpenCalculator={scrollToCalculator}
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

        {/* Why Choose Us */}
        <Features />

        {/* Testimonials & Industry Certifications */}
        <Testimonials />

        {/* Common Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminPreview={() => setIsAdminPreviewOpen(true)}
        onExploreCatalog={scrollToCatalog}
      />

      {/* Slide-out Order Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Quick View / Technical Specs Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Admin Operations Preview Modal */}
      <AdminPreviewModal
        isOpen={isAdminPreviewOpen}
        onClose={() => setIsAdminPreviewOpen(false)}
      />
    </div>
  );
}

export default App;
