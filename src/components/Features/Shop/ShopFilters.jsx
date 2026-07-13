import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShopFilters = ({ filters, updateFilter, clearFilters, products, mobileOpen, setMobileOpen }) => {
  // Extract unique values from products.json
  const categories = [...new Set(products.map(p => p.category))].sort();
  const subCategories = [...new Set(products.map(p => p.subCategory))].sort();
  const brands = [...new Set(products.map(p => p.brand))].sort();
  const collections = [...new Set(products.map(p => p.collection))].sort();

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        <button 
          onClick={clearFilters} 
          className="text-sm text-orange-500 hover:underline font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="category" 
                checked={filters.category === cat} 
                onChange={() => updateFilter('category', cat)} 
                className="accent-orange-500" 
              />
              <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sub Category */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Sub Category</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {subCategories.map(subCat => (
            <label key={subCat} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="subCategory" 
                checked={filters.subCategory === subCat} 
                onChange={() => updateFilter('subCategory', subCat)} 
                className="accent-orange-500" 
              />
              <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                {subCat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.brand === brand} 
                onChange={() => updateFilter('brand', filters.brand === brand ? '' : brand)} 
                className="accent-orange-500 rounded" 
              />
              <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Collection */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Collection</h4>
        <div className="space-y-2">
          {collections.map(collection => (
            <label key={collection} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="collection" 
                checked={filters.collection === collection} 
                onChange={() => updateFilter('collection', collection)} 
                className="accent-orange-500" 
              />
              <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                {collection}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            value={filters.minPrice || ''} 
            onChange={e => updateFilter('minPrice', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" 
          />
          <span className="text-gray-400">-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={filters.maxPrice || ''} 
            onChange={e => updateFilter('maxPrice', e.target.value)} 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" 
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[4, 3, 2, 1].map(r => (
            <button 
              key={r} 
              onClick={() => updateFilter('rating', filters.rating === r ? null : r)} 
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                filters.rating === r 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-500 hover:text-orange-500'
              }`}
            >
              {r}★ & up
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.inStock || false} 
              onChange={() => updateFilter('inStock', !filters.inStock)} 
              className="accent-orange-500 rounded" 
            />
            <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
              In Stock Only
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.onSale || false} 
              onChange={() => updateFilter('onSale', !filters.onSale)} 
              className="accent-orange-500 rounded" 
            />
            <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
              On Sale
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-100 sticky top-24">
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMobileOpen(false)} 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25 }} 
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={() => setMobileOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShopFilters;