import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star, Filter, X, Check } from 'lucide-react';

const FilterAccordion = ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0 py-5 first:pt-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <h4 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
          {title}
        </h4>
        <div className="text-gray-400 group-hover:text-orange-500 transition-colors">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShopFilters = ({ filters, updateFilter, clearFilters, products, mobileOpen, setMobileOpen }) => {
  // Extract unique values from products.json
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean).sort();
  const collections = [...new Set(products.map(p => p.collection))].filter(Boolean).sort();

  const hasActiveFilters = Object.values(filters).some(val => val !== null && val !== false && val !== '');

  const FilterContent = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-900">
          <Filter size={20} />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters} 
            className="text-sm text-orange-500 hover:text-orange-600 font-medium px-3 py-1 bg-orange-50 rounded-full transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <FilterAccordion title="Category" defaultOpen={true}>
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input 
                type="radio" 
                name="category" 
                checked={filters.category === cat} 
                onChange={() => updateFilter('category', cat)} 
                className="peer sr-only" 
              />
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-orange-500 peer-checked:bg-orange-500 transition-all flex items-center justify-center shadow-sm">
                <div className={`w-2 h-2 bg-white rounded-full transition-all ${filters.category === cat ? 'scale-100' : 'scale-0'}`} />
              </div>
            </div>
            <span className={`text-sm transition-colors ${filters.category === cat ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
              {cat}
            </span>
          </label>
        ))}
      </FilterAccordion>

      {/* Collection */}
      {collections.length > 0 && (
        <FilterAccordion title="Collection" defaultOpen={true}>
          {collections.map(collection => (
            <label key={collection} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="collection" 
                  checked={filters.collection === collection} 
                  onChange={() => updateFilter('collection', collection)} 
                  className="peer sr-only" 
                />
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-orange-500 peer-checked:bg-orange-500 transition-all flex items-center justify-center shadow-sm">
                  <div className={`w-2 h-2 bg-white rounded-full transition-all ${filters.collection === collection ? 'scale-100' : 'scale-0'}`} />
                </div>
              </div>
              <span className={`text-sm transition-colors ${filters.collection === collection ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {collection}
              </span>
            </label>
          ))}
        </FilterAccordion>
      )}

      {/* Price Range */}
      <FilterAccordion title="Price Range" defaultOpen={false}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input 
                type="number" 
                placeholder="Min" 
                value={filters.minPrice || ''} 
                onChange={e => updateFilter('minPrice', e.target.value)} 
                className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-300 font-medium" 
              />
            </div>
            <span className="text-gray-300">-</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={filters.maxPrice || ''} 
                onChange={e => updateFilter('maxPrice', e.target.value)} 
                className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-300 font-medium" 
              />
            </div>
          </div>
        </div>
      </FilterAccordion>

      {/* Rating */}
      <FilterAccordion title="Minimum Rating" defaultOpen={false}>
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1].map(r => (
            <button 
              key={r} 
              onClick={() => updateFilter('rating', filters.rating === r ? null : r)} 
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                filters.rating === r 
                  ? 'bg-orange-50 border border-orange-200' 
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < r ? 'fill-orange-400 text-orange-400' : 'fill-gray-200 text-gray-200'} 
                  />
                ))}
              </div>
              <span className={`text-sm font-medium ${filters.rating === r ? 'text-orange-600' : 'text-gray-500'}`}>
                & Up
              </span>
            </button>
          ))}
        </div>
      </FilterAccordion>

      {/* Availability */}
      <FilterAccordion title="Availability" defaultOpen={false}>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={filters.inStock || false} 
                onChange={() => updateFilter('inStock', !filters.inStock)} 
                className="peer sr-only" 
              />
              <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:border-orange-500 peer-checked:bg-orange-500 transition-all flex items-center justify-center shadow-sm">
                <Check size={14} className={`text-white transition-all ${filters.inStock ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} strokeWidth={3} />
              </div>
            </div>
            <span className={`text-sm transition-colors ${filters.inStock ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
              In Stock Only
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={filters.onSale || false} 
                onChange={() => updateFilter('onSale', !filters.onSale)} 
                className="peer sr-only" 
              />
              <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:border-orange-500 peer-checked:bg-orange-500 transition-all flex items-center justify-center shadow-sm">
                <Check size={14} className={`text-white transition-all ${filters.onSale ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} strokeWidth={3} />
              </div>
            </div>
            <span className={`text-sm transition-colors ${filters.onSale ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
              On Sale
            </span>
          </label>
        </div>
      </FilterAccordion>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
            />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-6 pb-4 flex justify-between items-center border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button 
                  onClick={() => setMobileOpen(false)} 
                  className="p-2 bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 pt-2 flex-1">
                <FilterContent />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <button 
                  onClick={() => setMobileOpen(false)} 
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-orange-500/20"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShopFilters;