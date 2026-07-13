import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { productService } from '../services/product.service';
import { useShopFilters } from '../hooks/useShopFilters';
import ShopHero from '../components/Features/Shop/ShopHero';
import ShopToolbar from '../components/Features/Shop/ShopToolbar';
import ShopFilters from '../components/Features/Shop/ShopFilters';
import SkeletonCard from '../components/Common/SkeletonCard';
import ProductCard from '../components/Common/ProductCard';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const { filters, updateFilter, clearFilters, filteredProducts } = useShopFilters(products);

  useEffect(() => {
    productService.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Shop Premium Men's Lifestyle | Dealora</title>
        <meta name="description" content="Browse our premium collection of clothing, footwear, accessories, and grooming products." />
      </Helmet>
      
      <ShopHero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ShopToolbar 
          filters={filters} 
          updateFilter={updateFilter} 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          count={filteredProducts.length}
          onMobileFilterOpen={() => setMobileFilterOpen(true)}
        />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <aside className="lg:w-64 shrink-0">
            <ShopFilters 
              filters={filters} 
              updateFilter={updateFilter} 
              clearFilters={clearFilters}
              products={products}
              mobileOpen={mobileFilterOpen}
              setMobileOpen={setMobileFilterOpen}
            />
          </aside>
          
          <div className="flex-1">
            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={clearFilters} 
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ShopPage;