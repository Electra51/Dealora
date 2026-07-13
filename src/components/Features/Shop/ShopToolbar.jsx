import React from 'react';

const ShopToolbar = ({ filters, updateFilter, viewMode, setViewMode, count, onMobileFilterOpen }) => {
  const handleSearch = (e) => {
    updateFilter('search', e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm sticky top-20 z-30">
      {/* Search & Mobile Filter */}
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={onMobileFilterOpen} 
          className="lg:hidden p-2.5 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search products..." 
            defaultValue={filters.search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Sort, View & Count */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 hidden sm:block">
          <span className="font-semibold text-gray-900">{count}</span> Products
        </span>
        
        <select 
          value={filters.sort} 
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest First</option>
          <option value="discount">Biggest Discount</option>
        </select>

        <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Grid view"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="List view"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopToolbar;