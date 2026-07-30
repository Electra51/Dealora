import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import ProductCard from "../../Common/ProductCard";
import { productService } from "../../../services/product.service";

const NewArrivals = ({ handleAddToCart }) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getNewArrivalProducts()
      .then((data) => {
        const latest = data
          .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
          .slice(0, 4);
        setNewArrivals(latest);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading new arrivals:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl md:rounded-2xl h-65 md:h-96 animate-pulse shadow-sm md:shadow-md" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-16 w-full lg:py-20">
      <div className="px-4 md:px-0 mb-4 md:mb-0">
        <SectionHeader
          title="New Arrivals"
          description="Check out the latest additions to our collection"
          showAction
          actionText="View All Products"
          actionLink="/shop"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-8 px-4 md:px-0">
        {newArrivals.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="newArrival"
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;