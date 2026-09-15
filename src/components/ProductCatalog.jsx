import React, { useState, useMemo } from 'react';
import { Star, Plus, Minus, Check, Eye, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function ProductCatalog({ 
  products, 
  onAddToCart, 
  onOpenQuickView, 
  searchQuery, 
  setSearchQuery 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [quantities, setQuantities] = useState({});
  const [addedAnimationId, setAddedAnimationId] = useState(null);

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
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = !searchQuery || 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Commercial Catalog</span>
          </div>
          <h2 className="section-title">Essential Housekeeping Supplies</h2>
          <p className="section-subtitle">
            Source certified cleaning materials, microfiber equipment, and restock supplies in bulk. Tiered discounts automatically applied to commercial carton orders.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="filter-bar">
          {/* Category Tabs */}
          <div className="category-tabs" role="tablist">
            {CATEGORIES.map(cat => (
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

        {/* Active Filter Notice if searched */}
        {searchQuery && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--primary-50)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary-900)' }}>
              Filtering for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button 
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary-700)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => {
              const currentQty = quantities[product.id] || 1;
              const isBulkQualified = currentQty >= product.minBulkUnits;
              const effectivePrice = isBulkQualified ? product.bulkPrice : product.price;
              const isJustAdded = addedAnimationId === product.id;

              return (
                <article key={product.id} className="product-card">
                  {/* Image Container */}
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image"
                      loading="lazy"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="product-badge-overlay">
                      <span className={`badge badge-${product.badgeColor || 'teal'}`}>
                        {product.badge}
                      </span>
                      {isBulkQualified && (
                        <span className="badge badge-green">
                          Bulk Tier Active (-{Math.round(((product.price - product.bulkPrice)/product.price)*100)}%)
                        </span>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button 
                      className="quick-view-btn"
                      onClick={() => onOpenQuickView(product)}
                      title="Quick Specs & SDS details"
                    >
                      <Eye size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Specs
                    </button>
                  </div>

                  {/* Details */}
                  <div className="product-info">
                    <div className="product-category-row">
                      <span className="product-category-name">{product.categoryLabel}</span>
                      <div className="product-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                        <span style={{ color: 'var(--slate-400)', fontWeight: 400 }}>({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-spec">
                      <span>Package: <strong>{product.packageSize}</strong></span> • 
                      <span style={{ marginLeft: 4 }}>SKU: {product.sku}</span>
                    </div>

                    {/* Price Tier */}
                    <div className="product-price-tier">
                      <div>
                        <div className="unit-price">
                          ${effectivePrice.toFixed(2)}
                          <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 500, marginLeft: 2 }}>/unit</span>
                        </div>
                        {isBulkQualified ? (
                          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Wholesale Tier Active!</span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Regular Single Unit</span>
                        )}
                      </div>

                      <div className="bulk-price-tag">
                        <div>Bulk: <strong>${product.bulkPrice.toFixed(2)}</strong></div>
                        <div style={{ color: 'var(--slate-500)' }}>for {product.minBulkUnits}+ units</div>
                      </div>
                    </div>

                    {/* Actions: Stepper + Add Button */}
                    <div className="card-action-row">
                      <div className="qty-control">
                        <button 
                          className="qty-btn"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <input 
                          type="text" 
                          readOnly 
                          value={currentQty} 
                          className="qty-input"
                          aria-label="Quantity"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button 
                        className={`btn add-cart-btn ${isJustAdded ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => handleAddToCartWithAnim(product)}
                        style={isJustAdded ? { borderColor: '#10b981', color: '#059669' } : {}}
                      >
                        {isJustAdded ? (
                          <>
                            <Check size={16} color="#059669" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--slate-300)' }}>
            <AlertCircle size={44} color="var(--slate-400)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No housekeeping supplies match your filter</h3>
            <p style={{ color: 'var(--slate-600)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Try searching with different terms or reset your active filters.
            </p>
            <button 
              className="btn btn-secondary"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
