import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/helpers';
import { useCartStore } from '../../stores/cart.store';
import { useWishlistStore } from '../../stores/wishlist.store';
import { Eye } from 'lucide-react';

const ProductCard = memo(({ 
  product, 
  viewMode = 'grid',
  variant = 'default', // 'default' | 'trending' | 'newArrival' | 'bestSeller'
  onQuickView,
  handleAddToCart: customAddToCart
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const toggleWishlist = useWishlistStore(s => s.toggleItem);
  const wishlistItems = useWishlistStore(s => s.items);
  
  if (!product) return null;
  
  const isInWishlist = wishlistItems?.some(item => item.id === product.id) || false;

  // Safety values
  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;
  const stock = product.stock || 0;
  const discount = product.discount || 0;
  const price = product.price || 0;
  const comparePrice = product.comparePrice || 0;
  const shipping = product.shipping || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    
    if (customAddToCart) {
      customAddToCart(product);
    } else {
      addItem(product);
    }
    
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  // Variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'trending':
        return {
          card: 'bg-white border border-gray-100 hover:border-orange-200/50',
          badge: 'bg-gradient-to-r from-orange-500 to-amber-500',
          button: 'bg-orange-500 hover:bg-orange-600 text-white',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'text-orange-500'
        };
      case 'newArrival':
        return {
          card: 'bg-white border border-gray-100 hover:border-blue-200/50',
          badge: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'text-blue-500'
        };
      case 'bestSeller':
        return {
          card: 'bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20',
          badge: 'bg-gradient-to-r from-orange-500 to-amber-500',
          button: 'bg-gradient-to-br from-orange-500 to-amber-500 text-white',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-400',
          accent: 'text-orange-400'
        };
      default:
        return {
          card: 'bg-white border border-gray-100 hover:border-orange-200/50',
          badge: 'bg-gradient-to-r from-red-500 to-red-600',
          button: 'bg-gray-900 hover:bg-orange-500 text-white',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'text-orange-500'
        };
    }
  };

  const styles = getVariantStyles();

  // Render badges based on variant
  const renderBadges = () => {
    const badges = [];

    if (variant === 'trending') {
      if (product.reviewCount > 3000) {
        badges.push({ text: 'Most Reviewed', className: 'bg-gradient-to-r from-blue-400 to-cyan-400' });
      } else if (rating === 5) {
        badges.push({ text: 'Top Rated', className: 'bg-gradient-to-r from-yellow-400 to-orange-400' });
      } else if (discount >= 20) {
        badges.push({ text: 'Hot Deal', className: 'bg-gradient-to-r from-red-500 to-pink-500' });
      } else {
        badges.push({ text: 'Trending', className: 'bg-gradient-to-r from-teal-300 to-pink-200 text-gray-800' });
      }
    } else if (variant === 'newArrival') {
      badges.push({ text: 'NEW', className: styles.badge });
    } else if (variant === 'bestSeller') {
      if (product.bestSeller) badges.push({ text: 'Best Seller', className: styles.badge });
      if (product.newArrival) badges.push({ text: 'New', className: 'bg-gradient-to-r from-cyan-500 to-blue-500' });
      if (product.trending) badges.push({ text: 'Trending', className: 'bg-gradient-to-r from-pink-500 to-rose-500' });
    } else {
      // Default variant
      if (product.newArrival) badges.push({ text: 'NEW', className: 'bg-gradient-to-r from-blue-500 to-cyan-500' });
      if (product.trending) badges.push({ text: 'HOT', className: 'bg-gradient-to-r from-orange-500 to-amber-500' });
      if (product.bestSeller) badges.push({ text: 'BEST', className: 'bg-gradient-to-r from-purple-500 to-pink-500' });
    }

    return badges;
  };

  const badges = renderBadges();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      whileHover={{ y: -4 }}
      className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${styles.card} ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative bg-linear-to-br from-gray-50 to-gray-100 ${
        viewMode === 'list' ? 'w-48 shrink-0' : 'aspect-square'
      } overflow-hidden`}>
        <img 
          src={product.thumbnail || '/placeholder.jpg'} 
          alt={product.name || 'Product'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className={`${styles.badge} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm`}>
              -{discount}%
            </span>
          )}
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className={`${badge.className} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm`}
            >
              {badge.text}
            </span>
          ))}
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

        {/* Quick View Button (for trending variant) */}
        {variant === 'trending' && onQuickView && (
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickView}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold translate-y-5 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white"
            >
              <Eye className="w-5 h-5" />
              Quick View
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-1">
          <p className={`text-xs ${styles.accent} uppercase tracking-wider font-semibold`}>
            {product.brand || 'Unknown Brand'}
          </p>
          <p className={`text-[10px] ${styles.textSecondary} uppercase tracking-wide`}>
            {product.subCategory || product.category || ''}
          </p>
        </div>

        {/* Product Name */}
        <h3 className={`font-semibold ${styles.textPrimary} line-clamp-2 mb-2 min-h-10 group-hover:${styles.accent} transition-colors`}>
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
          <span className={`text-xs ${styles.textSecondary} font-medium`}>
            {rating.toFixed(1)}
          </span>
          <span className={`text-xs ${styles.textSecondary}`}>
            ({reviewCount.toLocaleString()})
          </span>
        </div>
        
        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100/10">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-bold ${styles.textPrimary}`}>
                {formatPrice(price)}
              </span>
              {comparePrice > price && (
                <span className={`text-xs ${styles.textSecondary} line-through`}>
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
                : `${styles.button} hover:shadow-lg hover:scale-105`
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