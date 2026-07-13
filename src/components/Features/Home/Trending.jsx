import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import ProductCard from "../../Common/ProductCard";

const Trending = ({ handleAddToCart }) => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingProducts = async () => {
      try {
        const res = await fetch("/products.json");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const trending = data
          .filter((product) => product.trending)
          .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
          .slice(0, 4);

        setTrendingProducts(trending);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load trending products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getTrendingProducts();
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProduct) {
        closeQuickView();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);

  if (loading) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-md" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full lg:pb-20">
      <SectionHeader
        title="Trending Products"
        description="Discover our most loved products chosen by thousands of satisfied customers"
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
        {trendingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="trending"
            onQuickView={openQuickView}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-5 animate-fadeIn"
          onClick={closeQuickView}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 hover:rotate-90 transition-all duration-300 z-10"
              onClick={closeQuickView}
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
              <div className="rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm text-gray-500 uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-base text-gray-600">by {selectedProduct.brand}</p>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={`text-base ${index < selectedProduct.rating ? "text-orange-500" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedProduct.rating} ({selectedProduct.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 py-5 border-y border-gray-100">
                  <span className="text-4xl font-black text-gray-900">${selectedProduct.price}</span>
                  {selectedProduct.comparePrice > selectedProduct.price && (
                    <span className="text-xl text-gray-500 line-through">${selectedProduct.comparePrice}</span>
                  )}
                  {selectedProduct.discount > 0 && (
                    <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold">
                      -{selectedProduct.discount}%
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    closeQuickView();
                  }}
                  disabled={selectedProduct.stock === 0}
                  className="w-full py-4 bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-full text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </section>
  );
};

export default Trending;