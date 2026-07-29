import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import ProductCard from "../../Common/ProductCard";
import { productService } from "../../../services/product.service";
const Trending = ({ handleAddToCart }) => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingProducts = async () => {
      try {
        const data = await productService.getTrendingProducts();

        const trending = data
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



  if (loading) {
    return (
      <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-md" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-16 w-full lg:pb-20">
      <SectionHeader
        title="Trending Products"
        description="Discover our most loved products chosen by thousands of satisfied customers"
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
        {trendingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="trending"
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

    </section>
  );
};

export default Trending;




