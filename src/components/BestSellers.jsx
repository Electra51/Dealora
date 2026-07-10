import React, { useEffect, useState } from "react";

const BestSellers = ({ handleAddToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => b.ratings - a.ratings || b.ratingsCount - a.ratingsCount)
          .slice(0, 8);
        setBestSellers(sorted);
      });
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-base ${
              index < rating ? "text-orange-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="relative max-w-[1400px] mx-auto px-4 py-24 w-full lg:py-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="text-start relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Best
            </span>{" "}
            Sellers
          </h2>
          <p className="mt-2 max-w-xl text-lg text-gray-600 leading-relaxed">
            Most sold products loved by thousands of customers
          </p>
        </div>

        <div className="relative z-10">
          <a
            href="/best-sellers"
            className="inline-flex items-center gap-3 px-6 py-3 text-orange-600 font-semibold hover:gap-4 transition-all duration-300"
          >
            View All
            <svg
              className="w-5 h-5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 shadow-md hover:-translate-y-2 hover:shadow-xl relative"
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-lg bg-[linear-gradient(135deg,#ffd700,#ffa500)] text-white">
                Best Seller
              </span>
            </div>

            {/* Image */}
            <div className="relative w-full h-[280px] overflow-hidden bg-gray-100">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold translate-y-5 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">by {product.seller}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                {renderStars(product.ratings)}
                <span className="text-xs text-gray-500">
                  ({product.ratingsCount.toLocaleString()})
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-gray-900">
                    ${product.price}
                  </span>
                  {product.shipping === 1 && (
                    <span className="text-[11px] text-green-600 font-semibold">
                      Free Shipping
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
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