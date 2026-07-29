import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!product) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-5 animate-fadeIn"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="close"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 hover:rotate-90 transition-all duration-300 z-10"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
          <div className="rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.thumbnail || '/placeholder.jpg'}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm text-gray-500 uppercase tracking-widest">
              {product.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h2>
            <p className="text-base text-gray-600">by {product.brand}</p>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-base ${index < (product.rating || 0) ? 'text-orange-600' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating || 0} ({(product.reviewCount || 0).toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 py-5 border-y border-gray-100">
              <span className="text-4xl font-black text-gray-900">${product.price}</span>
              {product.comparePrice > product.price && (
                <span className="text-xl text-gray-500 line-through">${product.comparePrice}</span>
              )}
              {product.comparePrice > product.price && (
                <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold">
                  -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                </span>
              )}
            </div>

            <button
              aria-label="add cart"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
                onClose();
              }}
              disabled={product.inventory?.stock === 0}
              className="w-full py-4 bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-full text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease forwards; }
      `}</style>
    </div>,
    document.body
  );
};

export default QuickViewModal;
