import React from 'react';
import ProductCard from '../../Common/ProductCard';
import SkeletonCard from '../../Common/SkeletonCard';

const DealsSection = ({ title, subtitle, products, loading, variant = 'primary' }) => {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className={`text-3xl font-black ${variant === 'primary' ? 'text-gray-900' : 'text-purple-900'}`}>{title}</h2>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>
        <button aria-label="view deals" className="text-orange-500 font-semibold hover:underline flex items-center gap-1">
          View All Deals 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default DealsSection;