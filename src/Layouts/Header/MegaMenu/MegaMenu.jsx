import React, { memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import dbData from "../../../data/db.json";
const getCategoryCount = (subCategory) => {
  return dbData.products.filter((p) => p.subCategory === subCategory).length;
};

const MEGA_MENU_CATEGORIES = [
  {
    title: "Clothing",
    icon: "👕",
    items: [
      { name: "T-Shirts", count: getCategoryCount("T-Shirts"), trending: true },
      { name: "Shirts", count: getCategoryCount("Shirts") },
      { name: "Hoodies", count: getCategoryCount("Hoodies"), trending: true },
   { name: "Jackets", count: getCategoryCount("Jackets") },
      { name: "Jeans", count: getCategoryCount("Jeans") },
    ],
    color: "from-blue-500 to-cyan-500",
    accentColor: "blue",
    image: "/assets/images/categories/clothing.webp",
    badge: "Bestseller",
  },
  {
    title: "Footwear",
    icon: "👟",
    items: [
      { name: "Sneakers", count: getCategoryCount("Sneakers"), trending: true },
      { name: "Running Shoes", count: getCategoryCount("Running Shoes") },
      { name: "Boots", count: getCategoryCount("Boots") },
      { name: "Sandals", count: getCategoryCount("Sandals") },
      { name: "Formal Shoes", count: getCategoryCount("Formal Shoes") },
    ],
    color: "from-pink-500 to-rose-500",
    accentColor: "pink",
    image: "/assets/images/categories/footwaer.webp",
    badge: "New Arrivals",
  },
  {
    title: "Accessories",
    icon: "⌚",
    items: [
    { name: "Bags", count: getCategoryCount("Bags") },
      { name: "Watches", count: getCategoryCount("Watches"), trending: true },
      { name: "Caps", count: getCategoryCount("Caps") },
      { name: "Wallets", count: getCategoryCount("Wallets") },
      { name: "Belts", count: getCategoryCount("Belts") },
    ],
    color: "from-yellow-500 to-amber-500",
    accentColor: "yellow",
    image: "/assets/images/categories/accessesories.webp",
    badge: "Trending",
  },
  {
    title: "Grooming",
    icon: "🌿",
    items: [
         { name: "Perfumes", count: getCategoryCount("Perfumes"), trending: true },
      { name: "Body Sprays", count: getCategoryCount("Body Sprays") },
      { name: "Face Wash", count: getCategoryCount("Face Wash") },
      { name: "Hair Care", count: getCategoryCount("Hair Care") },
      { name: "Shaving Kits", count: getCategoryCount("Shaving Kits") },
    ],
    color: "from-purple-500 to-violet-500",
    accentColor: "purple",
    image: "/assets/images/categories/grooming.webp",
    badge: "Premium",
  },
];

const MegaMenu = memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-20 inset-x-0 bottom-0 bg-black/60 backdrop-blur-md z-900 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Mega Menu Panel */}
      <div className="absolute top-15 left-0 right-0 bg-[#1a1a24]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl z-950 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 px-2 py-4">
            {MEGA_MENU_CATEGORIES.map((category, index) => (
              <div
                key={category.title}
                className="opacity-0 animate-slideUp"
                style={{ animationDelay: `${index * 50 + 100}ms`, animationFillMode: "forwards" }}
              >
                <CategoryCard category={category} onClose={onClose} />
              </div>
            ))}
          </div>

          {/* Promotional Banners */}
          <div
            className="mt-12 pt-8 border-t border-white/10 opacity-0 animate-slideUp"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <div className="bg-linear-to-r from-orange-500/10 to-purple-500/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  New Arrivals 2026
                </h4>
                <p className="text-gray-600">
                  Check out our latest collection with up to 40% off
                </p>
              </div>
              <Link
                aria-label="Shop Now"
                to="/shop?filter=new"
                onClick={onClose}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default MegaMenu;