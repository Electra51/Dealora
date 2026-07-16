import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import ProductCard from "../../Common/ProductCard";
import { productService } from "../../../services/product.service";
const BestSellers = ({ handleAddToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

    productService.getBestSellerProducts()
      .then((data) => {
        const sorted = data
          .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
          .slice(0, 4);
        setBestSellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });

  if (loading) {
    return (
      <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl h-96 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-10 md:py-20">
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08)_0%,transparent_70%)]"></div>

      <SectionHeader
        title="Best Sellers"
        description="Most loved products chosen by thousands of customers worldwide"
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {bestSellers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="bestSeller"
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;