import React, { memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";

const MEGA_MENU_CATEGORIES = [
  {
    title: "Clothing",
    icon: "👕",
    items: [
      { name: "T-Shirts", count: 0, trending: true },
      { name: "Shirts", count: 0 },
      { name: "Hoodies", count: 0, trending: true },
      { name: "Jackets", count: 0 },
      { name: "Jeans", count: 0 },
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
      { name: "Sneakers", count: 0, trending: true },
      { name: "Running Shoes", count: 0 },
      { name: "Boots", count: 0 },
      { name: "Sandals", count: 0 },
      { name: "Formal Shoes", count: 0 },
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
      { name: "Bags", count: 0 },
      { name: "Watches", count: 0, trending: true },
      { name: "Caps", count: 0 },
      { name: "Wallets", count: 0 },
      { name: "Belts", count: 0 },
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
      { name: "Perfumes", count: 0, trending: true },
      { name: "Body Sprays", count: 0 },
      { name: "Face Wash", count: 0 },
      { name: "Hair Care", count: 0 },
      { name: "Shaving Kits", count: 0 },
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
      <div className="absolute top-full left-0 right-0 bg-[#1a1a24]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl z-950 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
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
            <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl p-6 flex items-center justify-between">
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