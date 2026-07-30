import React, { memo } from "react";
import { Link } from "react-router-dom";

import clothing from "/assets/images/categories/clothing.webp";
import accessesories from "/assets/images/categories/accessesories.webp";
import footwaer from "/assets/images/categories/footwaer.webp";
import grooming from "/assets/images/categories/grooming.webp";

const MOBILE_CATEGORIES = [
  {
    title: "Clothing",
    icon: "👕",
    image: clothing,
    link: "/shop?category=clothing",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Footwear",
    icon: "👟",
    image: footwaer,
    link: "/shop?category=footwear",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Accessories",
    icon: "⌚",
    image: accessesories,
    link: "/shop?category=accessories",
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Grooming",
    icon: "🌿",
    image: grooming,
    link: "/shop?category=grooming",
    color: "from-purple-500 to-violet-500",
  },
];

const MobileCategories = memo(() => {
  return (
    <div className="md:hidden mt-7 px-4 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Changed from grid to flex for proper horizontal scrolling */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1">
          {MOBILE_CATEGORIES.map((category) => (
            <Link
              key={category.title}
              aria-label={`Go to ${category.title}`}
              to={category.link}
              className="group flex flex-col items-center shrink-0 w-20"
            >
              {/* Category Card / Image Container */}
              <div className="relative w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:bg-gray-100 group-hover:border-orange-200">
                <img
                  src={category.image}
                  alt={category.title}
                  width="80"
                  height="80"
                  loading="lazy"
                  className="w-12 h-12 object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-xs font-semibold text-gray-800 text-center transition-colors duration-300 group-hover:text-orange-600">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MobileCategories;