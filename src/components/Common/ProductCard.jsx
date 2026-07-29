// import React, { memo, useState } from 'react';
// import { motion } from 'framer-motion';
// import { formatPrice } from '../../utils/helpers';
// import { useCartStore } from '../../stores/cart.store';
// import { useWishlistStore } from '../../stores/wishlist.store';
// import { Eye, Plus, ShoppingBag } from 'lucide-react';

// const ProductCard = memo(({ 
//   product, 
//   viewMode = 'grid',
//   variant = 'default', // 'default' | 'trending' | 'newArrival' | 'bestSeller'
//   onQuickView,
//   handleAddToCart: customAddToCart
// }) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const addItem = useCartStore(s => s.addItem);
//   const toggleWishlist = useWishlistStore(s => s.toggleItem);
//   const wishlistItems = useWishlistStore(s => s.items);
  
//   if (!product) return null;
  
//   const isInWishlist = wishlistItems?.some(item => item.id === product.id) || false;

//   // Safety values
//   const rating = product.rating || 0;
//   const reviewCount = product.reviewCount || 0;
//   const stock = product.inventory?.stock || 0;
//   const price = product.price || 0;
//   const comparePrice = product.comparePrice || 0;
//   const discount = (comparePrice > price && comparePrice > 0) ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
//   const shipping = product.shipping || 0;

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     setIsAdding(true);
    
//     if (customAddToCart) {
//       customAddToCart(product);
//     } else {
//       addItem(product);
//     }
    
//     setTimeout(() => setIsAdding(false), 600);
//   };

//   const handleWishlistToggle = (e) => {
//     e.stopPropagation();
//     toggleWishlist(product);
//   };

//   const handleQuickView = (e) => {
//     e.stopPropagation();
//     if (onQuickView) {
//       onQuickView(product);
//     }
//   };

//   // Variant-based styles
//   const getVariantStyles = () => {
//     switch (variant) {
//       case 'trending':
//         return {
//           card: 'bg-white border border-gray-100 hover:border-orange-200/50',
//           badge: 'bg-gradient-to-r from-orange-500 to-amber-500',
//           button: 'bg-linear-to-tr from-[#FF7203] to-[#FF9A03] text-gray-900 hover:bg-[#FF7203] hover:text-black hover:bg-orange-600 text-white',
//           textPrimary: 'text-gray-900',
//           textSecondary: 'text-gray-600',
//           accent: 'text-orange-600'
//         };
//       case 'newArrival':
//         return {
//           card: 'bg-white border border-gray-100 hover:border-blue-200/50',
//           badge: 'bg-gradient-to-r from-blue-500 to-cyan-500',
//           button: 'bg-blue-500 hover:bg-blue-600 text-white',
//           textPrimary: 'text-gray-900',
//           textSecondary: 'text-gray-600',
//           accent: 'text-blue-500'
//         };
//       case 'bestSeller':
//         return {
//           card: 'bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20',
//           badge: 'bg-gradient-to-r from-orange-500 to-amber-500',
//           button: 'bg-gradient-to-br from-orange-500 to-amber-500 text-white',
//           textPrimary: 'text-black hover:text-white',
//           textSecondary: 'text-gray-600',
//           accent: 'text-orange-600'
//         };
//       default:
//         return {
//           card: 'bg-white border border-gray-100 hover:border-orange-200/50',
//           badge: 'bg-gradient-to-r from-red-500 to-red-600',
//           button: 'bg-gray-900 hover:bg-orange-500 text-white',
//           textPrimary: 'text-gray-900',
//           textSecondary: 'text-gray-600',
//           accent: 'text-orange-600'
//         };
//     }
//   };

//   const styles = getVariantStyles();

//   // Render badges based on variant
//   const renderBadges = () => {
//     const badges = [];

//     if (variant === 'trending') {
//       if (product.reviewCount > 3000) {
//         badges.push({ text: 'Most Reviewed', className: 'bg-gradient-to-r from-blue-400 to-cyan-400' });
//       } else if (rating === 5) {
//         badges.push({ text: 'Top Rated', className: 'bg-gradient-to-r from-yellow-400 to-orange-400' });
//       } else if (discount >= 20) {
//         badges.push({ text: 'Hot Deal', className: 'bg-gradient-to-r from-red-500 to-pink-500' });
//       } else {
//         badges.push({ text: 'Trending', className: 'bg-gradient-to-r from-teal-300 to-pink-200 text-gray-800' });
//       }
//     } else if (variant === 'newArrival') {
//       badges.push({ text: 'NEW', className: styles.badge });
//     } else if (variant === 'bestSeller') {
//       if (product.flags?.bestSeller) badges.push({ text: 'Best Seller', className: styles.badge });
//       if (product.flags?.newArrival) badges.push({ text: 'New', className: 'bg-gradient-to-r from-cyan-500 to-blue-500' });
//       if (product.flags?.trending) badges.push({ text: 'Trending', className: 'bg-gradient-to-r from-pink-500 to-rose-500' });
//     } else {
//       // Default variant
//       if (product.flags?.newArrival) badges.push({ text: 'NEW', className: 'bg-gradient-to-r from-blue-500 to-cyan-500' });
//       if (product.flags?.trending) badges.push({ text: 'HOT', className: 'bg-gradient-to-r from-orange-500 to-amber-500' });
//       if (product.flags?.bestSeller) badges.push({ text: 'BEST', className: 'bg-gradient-to-r from-purple-500 to-pink-500' });
//     }

//     return badges;
//   };

//   const badges = renderBadges();

//   return (
//     <motion.div 
//       layout
//       initial={{ opacity: 0, y: 20 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       whileHover={{ y: -4 }}
//       className={`group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:shadow-none hover:shadow-xl ${styles.card} ${
//         viewMode === 'list' ? 'flex' : 'flex flex-col h-full'
//       }`}
//     >
//       {/* Image Container */}
//       <div className={`relative bg-linear-to-br from-gray-50 to-gray-100 ${
//         viewMode === 'list' ? 'w-32 md:w-48 shrink-0' : 'aspect-square'
//       } overflow-hidden`}>
//         <img 
//           src={product.thumbnail || '/placeholder.jpg'} 
//           alt={product.name || 'Product'} 
//           loading="lazy"
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
//           loading="lazy" 
//         />
        
//         {/* Badges */}
//         <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1.5 md:gap-2 z-10">
//           {discount > 0 && (
//             <span className={`${styles.badge} text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm`}>
//               -{discount}%
//             </span>
//           )}
//           {badges.map((badge, idx) => (
//             <span 
//               key={idx} 
//               className={`${badge.className} text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm`}
//             >
//               {badge.text}
//             </span>
//           ))}
//         </div>

//         {/* Wishlist Button */}
//         <button 
//         aria-label="wishlist add"
//           onClick={handleWishlistToggle}
//           className={`absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-sm md:shadow-md transition-all duration-300 z-10 ${
//             isInWishlist 
//               ? 'bg-red-500 text-white scale-110' 
//               : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
//           }`}
//           aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//         >
//           <svg 
//             className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform" 
//             fill={isInWishlist ? "currentColor" : "none"} 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//           </svg>
//         </button>

//         {/* Stock Indicator */}
//         {stock < 10 && stock > 0 && (
//           <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
//             <div className="bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-1.5 flex items-center justify-center">
//               <div className="flex items-center gap-1.5">
//                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
//                 <span className="text-white text-[9px] md:text-[10px] font-semibold whitespace-nowrap">
//                   Only {stock} left
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {stock === 0 && (
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
//             <span className="bg-white text-gray-900 font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm">
//               Sold Out
//             </span>
//           </div>
//         )}

//         {/* Quick View Button (Desktop only) */}
//         {variant === 'trending' && onQuickView && (
//           <div className="hidden md:flex absolute inset-0 bg-linear-to-t from-black/70 to-transparent items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button
//             aria-label="quick view"
//               onClick={handleQuickView}
//               className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold translate-y-5 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white"
//             >
//               <Eye className="w-5 h-5" />
//               Quick View
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Content */}
//       <div className="p-3 md:p-4 flex-1 flex flex-col bg-white">
//         {/* Brand & Category */}
//         <div className="flex items-center justify-between mb-1">
//           <p className={`text-[10px] md:text-xs ${styles.accent} uppercase tracking-wider font-semibold truncate pr-2`}>
//             {product.brand || 'Unknown'}
//           </p>
//           <p className={`text-[9px] md:text-[10px] ${styles.textSecondary} uppercase tracking-wide truncate max-w-[40%]`}>
//             {product.subCategory || product.category || ''}
//           </p>
//         </div>

//         {/* Product Name */}
//         <h3 
//           className={`font-medium md:font-semibold text-xs md:text-sm ${styles.textPrimary} line-clamp-2 mb-1.5 md:mb-2 min-h-8 md:min-h-10 group-hover:${styles.accent} transition-colors leading-snug`}
//           onClick={handleQuickView}
//         >
//           {product.name || 'Unnamed Product'}
//         </h3>
        
//         {/* Rating */}
//         <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <span 
//                 key={i} 
//                 className={`text-[10px] md:text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//           <span className={`text-[10px] md:text-xs ${styles.textSecondary} font-medium`}>
//             {rating.toFixed(1)}
//           </span>
//           <span className={`text-[9px] md:text-xs ${styles.textSecondary} hidden sm:inline`}>
//             ({reviewCount})
//           </span>
//         </div>
        
//         {/* Price & Add to Cart */}
//         <div className="mt-auto flex items-end justify-between pt-2 md:pt-3 border-t border-gray-50 md:border-gray-100/10">
//           <div className="flex flex-col">
//             <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
//               <span className={`text-sm md:text-lg font-bold ${styles.textPrimary} leading-none`}>
//                 {formatPrice(price)}
//               </span>
//               {comparePrice > price && (
//                 <span className={`text-[10px] md:text-xs ${styles.textSecondary} line-through leading-none`}>
//                   {formatPrice(comparePrice)}
//                 </span>
//               )}
//             </div>
//             {shipping <= 5 && (
//               <span className="text-[9px] md:text-[10px] text-green-600 font-semibold mt-0.5">
//                 Free Delivery
//               </span>
//             )}
//           </div>
          
//           <button 
//           aria-label="add cart"
//             onClick={handleAddToCart}
//             disabled={stock === 0}
//             className={`shrink-0 flex items-center justify-center transition-all duration-300 ${
//               stock === 0
//                 ? 'w-7 h-7 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
//                 : isAdding
//                 ? 'w-7 h-7 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-lg bg-green-500 text-white scale-95'
//                 : `w-7 h-7 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-lg ${styles.button} hover:shadow-lg active:scale-90 md:hover:scale-105`
//             }`}
//             aria-label="Add to cart"
//           >
//             {stock === 0 ? (
//               <span className="text-[10px] md:text-xs font-semibold hidden md:block">Sold Out</span>
//             ) : isAdding ? (
//               <>
//                 <svg className="w-3.5 h-3.5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 <span className="hidden md:block text-xs font-semibold">✓ Added</span>
//               </>
//             ) : (
//               <>
//                 <Plus className="w-4 h-4 md:hidden" strokeWidth={2.5} />
//                 <span className="hidden md:block text-xs font-semibold">Add</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// ProductCard.displayName = 'ProductCard';
// export default ProductCard;



import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/helpers';
import { useCartStore } from '../../stores/cart.store';
import { useWishlistStore } from '../../stores/wishlist.store';
import { Eye, Plus, ShoppingBag } from 'lucide-react';

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
  const stock = product.inventory?.stock || 0;
  const price = product.price || 0;
  const comparePrice = product.comparePrice || 0;
  const discount = (comparePrice > price && comparePrice > 0) ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
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
          button: 'bg-gradient-to-tr from-[#FF7203] to-[#FF9A03] hover:bg-[#FF7203] text-white',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'text-orange-700'
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
          textPrimary: 'text-black hover:text-white',
          textSecondary: 'text-gray-600',
          accent: 'text-orange-600'
        };
      default:
        return {
          card: 'bg-white border border-gray-100 hover:border-orange-200/50',
          badge: 'bg-gradient-to-r from-red-500 to-red-600',
          button: 'bg-orange-500 hover:bg-orange-600 text-white',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          accent: 'text-orange-600'
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
      if (product.flags?.bestSeller) badges.push({ text: 'Best Seller', className: styles.badge });
      if (product.flags?.newArrival) badges.push({ text: 'New', className: 'bg-gradient-to-r from-cyan-500 to-blue-500' });
      if (product.flags?.trending) badges.push({ text: 'Trending', className: 'bg-gradient-to-r from-pink-500 to-rose-500' });
    } else {
      // Default variant
      if (product.flags?.newArrival) badges.push({ text: 'NEW', className: 'bg-gradient-to-r from-blue-500 to-cyan-500' });
      if (product.flags?.trending) badges.push({ text: 'HOT', className: 'bg-gradient-to-r from-orange-500 to-amber-500' });
      if (product.flags?.bestSeller) badges.push({ text: 'BEST', className: 'bg-gradient-to-r from-purple-500 to-pink-500' });
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
      className={`group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:shadow-none hover:shadow-xl ${styles.card} ${
        viewMode === 'list' ? 'flex' : 'flex flex-col h-full'
      }`}
    >
      {/* Image Container */}
      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 ${
        viewMode === 'list' ? 'w-32 md:w-48 shrink-0' : 'aspect-square'
      } overflow-hidden`}>
        <img 
          src={product.thumbnail || '/placeholder.jpg'} 
          alt={product.name || 'Product'} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Badges - Top Left */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1.5 md:gap-2 z-10">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-white text-[10px] md:text-[11px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm">
              {discount}% Off
            </span>
          )}
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className={`${badge.className} text-white text-[10px] md:text-[11px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm`}
            >
              {badge.text}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button 
          aria-label="wishlist add"
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-sm md:shadow-md transition-all duration-300 z-10 ${
            isInWishlist 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
          }`}
        >
          <svg 
            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform" 
            fill={isInWishlist ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Stock Indicator */}
        {stock < 10 && stock > 0 && (
          <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-1.5 flex items-center justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs md:text-xs font-semibold whitespace-nowrap">
                  Only {stock} left
                </span>
              </div>
            </div>
          </div>
        )}

        {stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white text-gray-900 font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick View Button (Desktop only) */}
        {variant === 'trending' && onQuickView && (
          <div className="hidden md:flex absolute inset-0 bg-linear-to-t from-black/70 to-transparent items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              aria-label="quick view"
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
      <div className="p-3 md:p-4 flex-1 flex flex-col bg-white">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-1">
          <p className={`text-xs md:text-xs ${styles.accent} uppercase tracking-wider font-bold truncate pr-2`}>
            {product.brand || 'Unknown'}
          </p>
          <p className={`text-xs md:text-[10px] ${styles.textSecondary} uppercase tracking-wide truncate max-w-[40%]`}>
            {product.subCategory || product.category || ''}
          </p>
        </div>

        {/* Product Name */}
        <h3 
          className={`font-semibold text-xs md:text-sm ${styles.textPrimary} line-clamp-2 mb-1.5 md:mb-2 min-h-8 md:min-h-10 group-hover:${styles.accent} transition-colors leading-snug`}
          onClick={handleQuickView}
        >
          {product.name || 'Unnamed Product'}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xs md:text-xs ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className={`text-xs md:text-xs ${styles.textSecondary} font-medium`}>
            {rating.toFixed(1)}
          </span>
          <span className={`text-xs md:text-xs ${styles.textSecondary} hidden sm:inline`}>
            ({reviewCount})
          </span>
        </div>
        
        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-end justify-between pt-2 md:pt-3 border-t border-gray-50 md:border-gray-100/10">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
              <span className={`text-base md:text-lg font-bold ${styles.textPrimary} leading-none`}>
                {formatPrice(price)}
              </span>
              {comparePrice > price && (
                <span className={`text-xs md:text-xs ${styles.textSecondary} line-through leading-none`}>
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>
            {shipping <= 5 && (
              <span className="text-xs md:text-xs text-green-700 font-semibold mt-0.5">
                Free Delivery
              </span>
            )}
          </div>
          
          <button 
            aria-label="add cart"
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`shrink-0 flex items-center justify-center transition-all duration-300 ${
              stock === 0
                ? 'w-8 h-8 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                : isAdding
                ? 'w-8 h-8 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-lg bg-green-500 text-white scale-95'
                : `w-8 h-8 md:w-auto md:px-4 md:py-2 rounded-full md:rounded-lg ${styles.button} hover:shadow-lg active:scale-90 md:hover:scale-105`
            }`}
          >
            {stock === 0 ? (
              <span className="text-[10px] md:text-xs font-semibold hidden md:block">Sold Out</span>
            ) : isAdding ? (
              <>
                <svg className="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                <span className="hidden md:block text-xs font-semibold">✓ Added</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 md:hidden" strokeWidth={2.5} />
                <span className="hidden md:block text-xs font-semibold">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;