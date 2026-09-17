import React, { useState, useMemo } from 'react';
import { Plus, Minus, Check, Eye, AlertCircle, Sparkles, Filter, BookOpen, Layers, Package, BadgePercent, Search } from 'lucide-react';
import { CATEGORIES, DEPARTMENTS } from '../data/products';

export default function ProductCatalog({ products, onAddToCart, onOpenQuickView, searchQuery, setSearchQuery }) {
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [quantities, setQuantities] = useState({});
  const [addedAnimationId, setAddedAnimationId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const availableCategories = useMemo(() => {
    if (selectedDept === 'all') return CATEGORIES;
    return CATEGORIES.filter(cat => cat.id === 'all' || cat.dept === selectedDept);
  }, [selectedDept]);

  const handleDeptChange = (deptId) => { setSelectedDept(deptId); setSelectedCategory('all'); };

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      return { ...prev, [productId]: Math.max(1, current + delta) };
    });
  };

  const handleAddToCartWithAnim = (product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

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
        return 0;
      });
  }, [products, selectedDept, selectedCategory, searchQuery, sortBy]);

  const displayedProducts = useMemo(() => {
    if (!showAll && !searchQuery && selectedDept === 'all' && selectedCategory === 'all') {
      return filteredProducts.slice(0, 8);
    }
    return filteredProducts;
  }, [filteredProducts, showAll, searchQuery, selectedDept, selectedCategory]);

  return (
    <section id="catalog" className="py-12 md:py-16 bg-white">
      <div className="w-full max-w-[1320px] mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.8rem] font-bold tracking-widest uppercase text-primary-700 bg-primary-100 border border-primary-200 rounded-full mb-3">
            <Sparkles size={14} />
            <span>Wholesale Catalog</span>
          </div>
          <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-slate-900 tracking-tight mb-3">
            Stationery & Housekeeping Supplies
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Source office papers, registers, files, and cleaning chemicals directly at wholesale rates.
          </p>
        </div>

        {/* Department Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-5 justify-center">
          {DEPARTMENTS.map(dept => {
            const isActive = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] font-semibold text-[0.9rem] border transition-all duration-150 ${
                  isActive
                    ? 'bg-primary-700 text-white border-primary-700 shadow-[0_2px_8px_rgba(13,148,136,0.3)]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                }`}
                onClick={() => handleDeptChange(dept.id)}
              >
                {dept.id === 'stationery' && <BookOpen size={18} />}
                {dept.id === 'housekeeping' && <Sparkles size={18} />}
                {dept.id === 'all' && <Layers size={18} />}
                <span>{dept.label}</span>
                <span className={`text-[0.75rem] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {dept.id === 'all' ? products.length : products.filter(p => p.dept === dept.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2" role="tablist">
            {availableCategories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`px-3 py-1.5 rounded-full text-[0.85rem] font-semibold border transition-all duration-150 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-700 text-white border-primary-700 shadow-[0_2px_8px_rgba(13,148,136,0.3)]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-[0.85rem] text-slate-500 font-semibold">
              <Filter size={15} />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-[10px] border border-slate-300 text-[0.88rem] text-slate-700 bg-white outline-none cursor-pointer"
              aria-label="Sort products by"
            >
              <option value="featured">Featured Best-Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-7">
          <div className="text-[0.88rem] text-slate-600">
            Showing <strong>{filteredProducts.length}</strong> wholesale items available for Hosur & regional dispatch
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-[0.8rem] text-emerald-800">
            <BadgePercent size={14} strokeWidth={2.5} className="text-emerald-700" />
            <span><strong>Wholesale Tier:</strong> Buy carton/bulk quantities to unlock automatic wholesale price savings.</span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={44} className="text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
            <p className="text-slate-500 text-[0.92rem] mb-5">No stationery or housekeeping supplies matched your filter. Try clearing the search or category.</p>
            <button
              className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold text-[0.88rem] px-4 py-2 rounded-[8px] shadow-sm hover:bg-slate-50 transition-all"
              onClick={() => { setSelectedDept('all'); setSelectedCategory('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map(product => {
                const currentQty = quantities[product.id] || 1;
                const isBulkTier = currentQty >= product.minBulkUnits;
                const effectivePrice = isBulkTier ? product.bulkPrice : product.price;
                const savingsPerUnit = product.price - product.bulkPrice;

                return (
                  <div
                    key={product.id}
                    className="bg-white border border-slate-200 rounded-[16px] flex flex-col overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-all duration-250 hover:-translate-y-1 hover:border-primary-300 hover:shadow-[0_14px_30px_-4px_rgba(15,23,42,0.1)] group"
                  >
                    {/* Image */}
                    <div className="relative h-[200px] bg-slate-50 overflow-hidden border-b border-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      />
                      {/* Dept Badge */}
                      <span className="absolute top-2.5 left-2.5 z-10 bg-[rgba(11,21,40,0.85)] backdrop-blur-sm text-white px-2 py-0.5 rounded text-[0.68rem] font-bold tracking-wide uppercase">
                        {product.dept === 'stationery' ? 'Stationery' : 'Housekeeping'}
                      </span>
                      {/* Badge */}
                      {product.badge && (
                        <span className={`absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wide uppercase shadow-sm
                          ${product.badgeColor === 'blue'   ? 'bg-blue-50 text-blue-800 border border-blue-200'   : ''}
                          ${product.badgeColor === 'teal'   ? 'bg-teal-50 text-teal-800 border border-teal-200'   : ''}
                          ${product.badgeColor === 'amber'  ? 'bg-amber-50 text-amber-800 border border-amber-200' : ''}
                          ${product.badgeColor === 'green'  ? 'bg-green-50 text-green-800 border border-green-200' : ''}
                          ${product.badgeColor === 'purple' ? 'bg-purple-50 text-purple-800 border border-purple-200' : ''}
                        `}>
                          {product.badge}
                        </span>
                      )}
                      {/* Quick View */}
                      <button
                        className="absolute bottom-2.5 right-2.5 z-10 bg-white/94 backdrop-blur-sm border border-slate-200 text-slate-700 px-3 py-1.5 text-[0.75rem] font-semibold rounded-md cursor-pointer opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 inline-flex items-center gap-1.5 shadow-sm hover:text-primary-700 hover:border-primary-300"
                        onClick={() => onOpenQuickView(product)}
                        title="Quick Specs & Details"
                        aria-label={`Quick view ${product.name}`}
                      >
                        <Eye size={16} />
                        <span>Details</span>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-[0.72rem] font-bold uppercase tracking-widest text-primary-700 mb-1 block">
                        {product.categoryLabel}
                      </span>
                      <h3
                        className="text-[1rem] font-bold text-slate-900 mb-2 leading-snug overflow-hidden"
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', minHeight: '2.7em' }}
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      {/* Package Size */}
                      <span className="inline-flex items-center gap-1.5 text-[0.76rem] font-semibold text-primary-800 bg-primary-50 border border-primary-200 px-2 py-1 rounded-md mb-3 w-fit max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <Package size={13} strokeWidth={2} className="flex-shrink-0 text-primary-600" />
                        <span className="truncate">{product.packageSize}</span>
                      </span>

                      {/* Pricing Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-[10px] px-3 py-2.5 mb-4 flex flex-col gap-1 min-h-[64px] justify-center">
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-[1.1rem] font-extrabold text-slate-900">₹</span>
                            <span className="text-[1.45rem] font-extrabold text-slate-900 tracking-tight">
                              {effectivePrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[0.8rem] text-slate-500 font-medium ml-0.5">/{product.unit || 'unit'}</span>
                          </div>
                          {isBulkTier ? (
                            <span className="text-[0.72rem] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded whitespace-nowrap">
                              Wholesale Tier Active!
                            </span>
                          ) : (
                            <span className="text-[0.72rem] font-semibold text-primary-700 bg-primary-50 border border-primary-200 px-2 py-0.5 rounded whitespace-nowrap">
                              Buy {product.minBulkUnits}+ for ₹{product.bulkPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        {isBulkTier && (
                          <div className="text-[0.74rem] text-emerald-600 font-bold mt-0.5">
                            Saved ₹{(savingsPerUnit * currentQty).toLocaleString('en-IN')} with wholesale rate!
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex items-center gap-2.5">
                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center h-10 bg-white border-[1.5px] border-slate-300 rounded-[10px] flex-shrink-0 shadow-sm focus-within:border-primary-500 transition-colors">
                          <button
                            className="w-8 h-full flex items-center justify-center bg-slate-50 rounded-l-[8px] text-slate-700 border-none cursor-pointer transition-colors hover:bg-primary-100 hover:text-primary-800 disabled:opacity-35 disabled:cursor-not-allowed"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            disabled={currentQty <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-[30px] text-center font-bold text-[0.92rem] text-slate-900 px-1 select-none">
                            {currentQty}
                          </span>
                          <button
                            className="w-8 h-full flex items-center justify-center bg-slate-50 rounded-r-[8px] text-slate-700 border-none cursor-pointer transition-colors hover:bg-primary-100 hover:text-primary-800"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Add to Cart */}
                        <button
                          className={`flex-1 h-10 inline-flex items-center justify-center gap-2 text-white border-none rounded-[10px] text-[0.88rem] font-bold cursor-pointer transition-all duration-200 whitespace-nowrap px-3 ${
                            addedAnimationId === product.id
                              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-[0_2px_6px_rgba(5,150,105,0.3)]'
                              : 'bg-gradient-to-r from-primary-600 to-primary-700 shadow-[0_2px_5px_rgba(13,148,136,0.25)] hover:from-primary-700 hover:to-primary-800 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,148,136,0.35)]'
                          }`}
                          onClick={() => handleAddToCartWithAnim(product)}
                          aria-label={`Add ${currentQty} of ${product.name} to order`}
                        >
                          {addedAnimationId === product.id ? (
                            <><Check size={16} /><span>Added!</span></>
                          ) : (
                            <span>Add to Order</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show All Toggle */}
            {filteredProducts.length > 8 && !searchQuery && selectedDept === 'all' && selectedCategory === 'all' && (
              <div className="text-center mt-10">
                <button
                  className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold text-[1rem] px-8 py-3 rounded-[10px] shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200 min-w-[240px]"
                  onClick={() => setShowAll(!showAll)}
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
