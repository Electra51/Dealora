import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";

const NewArrivals = ({ handleAddToCart }) => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        // Get latest 8 products (assuming higher ID = newer)
        const latest = data
          .sort((a, b) => b.id - a.id)
          .slice(0, 4);
        setNewArrivals(latest);
      });
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-24 w-full lg:py-20">
   

        <SectionHeader
        title="New Arrivals"
        description="Check out the latest additions to our collection"
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
        {newArrivals.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 shadow-md hover:-translate-y-2 hover:shadow-xl relative"
          >
            {/* New Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-lg bg-[linear-gradient(135deg,#667eea,#764ba2)] text-white">
                New
              </span>
            </div>

            {/* Image */}
            <div className="relative w-full h-70 overflow-hidden bg-gray-100">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold translate-y-5 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-500 hover:text-white"
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
                  className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
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
                      d="M12 4v16m8-8H4"
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

export default NewArrivals;