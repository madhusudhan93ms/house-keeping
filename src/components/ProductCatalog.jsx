import React, { useState, useMemo } from 'react';
import { Plus, Minus, Check, Eye, AlertCircle, Sparkles, Filter, BookOpen, Layers, Package, BadgePercent } from 'lucide-react';
import { CATEGORIES, DEPARTMENTS } from '../data/products';

export default function ProductCatalog({ 
  products, 
  onAddToCart, 
  onOpenQuickView, 
  searchQuery, 
  setSearchQuery 
}) {
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [quantities, setQuantities] = useState({});
  const [addedAnimationId, setAddedAnimationId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Filter categories based on selected department
  const availableCategories = useMemo(() => {
    if (selectedDept === 'all') return CATEGORIES;
    return CATEGORIES.filter(cat => cat.id === 'all' || cat.dept === selectedDept);
  }, [selectedDept]);

  // Handle department change
  const handleDeptChange = (deptId) => {
    setSelectedDept(deptId);
    setSelectedCategory('all');
  };

  // Handle quantity stepper
  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCartWithAnim = (product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(item => {
        const matchesDept = selectedDept === 'all' || item.dept === selectedDept;
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = !searchQuery || 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDept && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedDept, selectedCategory, searchQuery, sortBy]);

  // Show 8 items initially if viewing All without search
  const displayedProducts = useMemo(() => {
    if (!showAll && !searchQuery && selectedDept === 'all' && selectedCategory === 'all') {
      return filteredProducts.slice(0, 8);
    }
    return filteredProducts;
  }, [filteredProducts, showAll, searchQuery, selectedDept, selectedCategory]);

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Wholesale Catalog</span>
          </div>
          <h2 className="section-title">Stationery & Housekeeping Supplies</h2>
          <p className="section-subtitle">
            Source office papers, registers, files, and cleaning chemicals directly at wholesale rates.
          </p>
        </div>

        {/* High-Level Department Tabs */}
        <div className="department-tabs-bar">
          {DEPARTMENTS.map(dept => {
            const isActive = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                className={`dept-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleDeptChange(dept.id)}
              >
                {dept.id === 'stationery' && <BookOpen size={18} />}
                {dept.id === 'housekeeping' && <Sparkles size={18} />}
                {dept.id === 'all' && <Layers size={18} />}
                <span>{dept.label}</span>
                <span className="dept-count-badge">
                  {dept.id === 'all' 
                    ? products.length 
                    : products.filter(p => p.dept === dept.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Subcategory Bar */}
        <div className="filter-bar">
          {/* Subcategory Pills */}
          <div className="category-tabs" role="tablist">
            {availableCategories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="search-sort-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: 600 }}>
              <Filter size={15} />
              <span>Sort:</span>
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
              aria-label="Sort products by"
            >
              <option value="featured">Featured Best-Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Result Count and Wholesale Notice */}
        <div className="catalog-meta-row">
          <div style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
            Showing <strong>{filteredProducts.length}</strong> wholesale items available for Hosur & regional dispatch
          </div>
          <div className="wholesale-tier-tip">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <BadgePercent size={14} strokeWidth={2.5} color="#166534" />
              <span><strong>Wholesale Tier:</strong> Buy carton/bulk quantities to unlock automatic wholesale price savings.</span>
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-catalog-state">
            <AlertCircle size={44} color="var(--slate-400)" />
            <h3>No products found</h3>
            <p>No stationery or housekeeping supplies matched your filter. Try clearing the search or category.</p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setSelectedDept('all'); setSelectedCategory('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {displayedProducts.map(product => {
                const currentQty = quantities[product.id] || 1;
                const isBulkTier = currentQty >= product.minBulkUnits;
                const effectivePrice = isBulkTier ? product.bulkPrice : product.price;
                const savingsPerUnit = product.price - product.bulkPrice;

                return (
                  <div key={product.id} className="product-card">
                    {/* Card Header Media */}
                    <div className="card-image-wrap">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        loading="lazy"
                        className="product-img"
                      />

                      {/* Department / Category Pill */}
                      <span className="card-dept-tag">
                        {product.dept === 'stationery' ? 'Stationery' : 'Housekeeping'}
                      </span>

                      {/* Badges */}
                      {product.badge && (
                        <span className={`badge badge-${product.badgeColor || 'teal'} card-badge`}>
                          {product.badge}
                        </span>
                      )}

                      {/* Quick View Button */}
                      <button 
                        className="quick-view-btn"
                        onClick={() => onOpenQuickView(product)}
                        title="Quick Specs & Details"
                        aria-label={`Quick view ${product.name}`}
                      >
                        <Eye size={16} />
                        <span>Details</span>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="card-body">
                      <div className="card-meta">
                        <span className="category-label">{product.categoryLabel}</span>
                      </div>

                      <h3 className="product-title" title={product.name}>
                        {product.name}
                      </h3>

                      <p className="package-size-tag">
                        <Package size={13} strokeWidth={2} className="package-stroke-icon" />
                        <span>{product.packageSize}</span>
                      </p>

                      {/* Pricing Display */}
                      <div className="pricing-box">
                        <div className="price-row">
                          <div className="price-current">
                            <span className="currency-symbol">₹</span>
                            <span className="price-number">{effectivePrice.toLocaleString('en-IN')}</span>
                            <span className="price-unit">/{product.unit || 'unit'}</span>
                          </div>

                          {/* Bulk Tier Badge */}
                          {isBulkTier ? (
                            <span className="bulk-active-tag">
                              Wholesale Tier Active!
                            </span>
                          ) : (
                            <span className="bulk-hint-tag">
                              Buy {product.minBulkUnits}+ for ₹{product.bulkPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Savings notice */}
                        {isBulkTier && (
                          <div className="savings-callout">
                            Saved ₹{(savingsPerUnit * currentQty).toLocaleString('en-IN')} with wholesale rate!
                          </div>
                        )}
                      </div>

                      {/* Action Controls */}
                      <div className="card-actions">
                        <div className="quantity-stepper" aria-label="Adjust quantity">
                          <button 
                            className="stepper-btn"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            disabled={currentQty <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="stepper-value">{currentQty}</span>
                          <button 
                            className="stepper-btn"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          className={`add-to-cart-btn ${addedAnimationId === product.id ? 'added' : ''}`}
                          onClick={() => handleAddToCartWithAnim(product)}
                          aria-label={`Add ${currentQty} of ${product.name} to order`}
                        >
                          {addedAnimationId === product.id ? (
                            <>
                              <Check size={16} />
                              <span>Added to Order!</span>
                            </>
                          ) : (
                            <>
                              <span>Add to Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Toggle Show All / Show Less Button */}
            {filteredProducts.length > 8 && !searchQuery && selectedDept === 'all' && selectedCategory === 'all' && (
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button 
                  className="btn btn-secondary btn-lg"
                  onClick={() => setShowAll(!showAll)}
                  style={{ minWidth: '240px' }}
                >
                  {showAll ? 'Show Fewer Products' : `View All Supplies (${filteredProducts.length} Items)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
