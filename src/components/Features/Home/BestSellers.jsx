import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import { FiShoppingBag, FiStar, FiTrendingUp } from "react-icons/fi";
import { Eye } from "lucide-react";

const BestSellers = ({ handleAddToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("data",data)
        // ✅ Fixed: Sort by bestSeller flag first, then by rating
        const sorted = data
          .filter((p) => p.bestSeller) // Only best sellers
          .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
          .slice(0, 4);
        setBestSellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, index) => (
          <FiStar
            key={index}
            className={`w-3.5 h-3.5 ${
              index < Math.floor(rating)
                ? "text-orange-500 fill-orange-500"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl h-96 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08)_0%,transparent_70%)]"></div>

      <SectionHeader
        title="Best Sellers"
        description="Most loved products chosen by thousands of customers worldwide"
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="group relative bg-linear-to-br from-white/3 to-white/8 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-white/20"
          >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {product.bestSeller && (
                <span className="px-3 py-1 bg-linear-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Best Seller
                </span>
              )}
              {product.newArrival && (
                <span className="px-3 py-1 bg-linear-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                  New
                </span>
              )}
              {product.trending && (
                <span className="px-3 py-1 bg-linear-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                  <FiTrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
            </div>

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 z-20">
                <span className="px-2.5 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg shadow-lg">
                  -{product.discount}%
                </span>
              </div>
            )}

            {/* Image Container */}
            <div className="relative w-full h-72 overflow-hidden bg-linear-to-br from-white/5 to-white/10">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <button
         
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold translate-y-5 group-hover:translate-y-0 transition-all duration-500 hover:bg-orange-500 hover:text-white shadow-xl"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>

              {/* Shine Effect */}
              <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-1000 ease-out pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Category & Brand */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-orange-400 uppercase tracking-widest font-semibold">
                  {product.category}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {product.brand}
                </p>
              </div>

              {/* Product Name */}
              <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors duration-300">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-400 font-medium">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-600">
                  ({product.reviewCount.toLocaleString()})
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      ${product.price}
                    </span>
                    {product.comparePrice > product.price && (
                      <span className="text-xs text-gray-600 line-through">
                        ${product.comparePrice}
                      </span>
                    )}
                  </div>
                  {product.stock < 15 && (
                    <span className="text-[10px] text-orange-400 font-semibold">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-11 h-11 rounded-full bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 group/btn"
                >
                  <FiShoppingBag className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;