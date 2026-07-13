import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/helpers';
import { useCartStore } from '../../stores/cart.store';
import { useWishlistStore } from '../../stores/wishlist.store';

const ProductCard = memo(({ product, viewMode = 'grid' }) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const toggleWishlist = useWishlistStore(s => s.toggleItem);
  const wishlistItems = useWishlistStore(s => s.items);
  
  // ✅ Safety checks for undefined values
  if (!product) return null;
  
  const isInWishlist = wishlistItems?.some(item => item.id === product.id) || false;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // ✅ Safe values with defaults
  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;
  const stock = product.stock || 0;
  const discount = product.discount || 0;
  const price = product.price || 0;
  const comparePrice = product.comparePrice || 0;
  const shipping = product.shipping || 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      whileHover={{ y: -4 }}
      className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200/50 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}
    >
      {/* Image Container */}
      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 ${viewMode === 'list' ? 'w-48 shrink-0' : 'aspect-square'} overflow-hidden`}>
        <img 
          src={product.thumbnail || '/placeholder.jpg'} 
          alt={product.name || 'Product'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
          {product.newArrival && (
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              NEW
            </span>
          )}
          {product.trending && (
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              HOT
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              BEST
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10 ${
            isInWishlist 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            className="w-4 h-4 transition-transform" 
            fill={isInWishlist ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Stock Indicator */}
        {stock < 10 && stock > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-white text-[10px] font-semibold">
                  Only {stock} left!
                </span>
              </div>
            </div>
          </div>
        )}

        {stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white text-gray-900 font-bold px-4 py-2 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-orange-500 uppercase tracking-wider font-semibold">
            {product.brand || 'Unknown Brand'}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            {product.subCategory || product.category || ''}
          </p>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
          {product.name || 'Unnamed Product'}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({reviewCount.toLocaleString()})
          </span>
        </div>
        
        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(price)}
              </span>
              {comparePrice > price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
            {shipping <= 5 && (
              <span className="text-[10px] text-green-600 font-semibold">
                Free Shipping
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
              stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : isAdding
                ? 'bg-green-500 text-white scale-95'
                : 'bg-gray-900 text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105'
            }`}
          >
            {stock === 0 ? 'Sold Out' : isAdding ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;