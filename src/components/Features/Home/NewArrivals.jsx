import React, { useEffect, useState } from "react";
import SectionHeader from "../../Common/SectionHeader";
import ProductCard from "../../Common/ProductCard";

const NewArrivals = ({ handleAddToCart }) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const latest = data
          .filter((p) => p.newArrival)
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
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full lg:py-20">
      <SectionHeader
        title="New Arrivals"
        description="Check out the latest additions to our collection"
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
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