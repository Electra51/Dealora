import React, { memo, useState } from "react";
import { Link } from "react-router-dom";

const CategoryCard = memo(({ category, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link
        aria-label="category"
        to={`/shop?category=${category.title.toLowerCase()}`}
        onClick={onClose}
        className="block"
      >
        {/* Card Container */}
        <div className="relative overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/20">
          {/* Gradient Overlay on Hover */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-10" : "opacity-0"
            }`}
          />

          {/* Header Section */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`text-4xl transition-transform duration-400 ${
                  isHovered ? "scale-125" : "scale-100"
                }`}
                style={{
                  transform: isHovered ? "rotate(-10deg) scale(1.2)" : "rotate(0) scale(1)",
                }}
              >
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                  {category.description}
                </p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <ul className="relative z-10 space-y-2 mb-6">
            {category.items.slice(0, 5).map((item, idx) => (
              <li
                key={item.name}
                className="flex items-center justify-start group/item opacity-0 animate-fadeIn"
                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "forwards" }}
              >
                <Link
                  aria-label="category"
                  to={`/shop?category=${category.title.toLowerCase()}&item=${item.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-all duration-300 flex-1"
                >
                  <div
                    className={`flex items-center gap-2 transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : "translate-x-0"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-600 group-hover/item:text-gray-500 transition-colors">
                      ({item.count})
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Image Preview */}
          {category.image && (
            <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
              <img
                src={category.image}
                alt={`${category.title} preview`}
                className={`w-full h-full object-contain p-4 transition-transform duration-500 ease-out ${
                  isHovered ? "scale-110 rotate-2" : "scale-100 rotate-0"
                }`}
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-overlay transition-opacity duration-300 ${
                  isHovered ? "opacity-30" : "opacity-0"
                }`}
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
});

export default CategoryCard;