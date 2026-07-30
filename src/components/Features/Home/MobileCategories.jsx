// MobileCategories.jsx
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Import your category images from header
import clothing from "/assets/images/categories/clothing.webp";
import accessesories from "/assets/images/categories/accessesories.webp";
import footwaer from "/assets/images/categories/footwaer.webp";
import grooming from "/assets/images/categories/grooming.webp";

// Same data structure from header.jsx
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
    <div className="md:hidden mt-7 px-5 pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-bleck">Categories</h2>
       
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
      
        
        {/* Scrollable Categories */}
        <div className="grid grid-cols-4 gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {MOBILE_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="shrink-0"
            >
              <Link aria-label={category.image} to={category.link} className="block group">
                {/* Category Card */}
             
                  <div className="relative h-20 bg-linear-to-br from-white/5 to-white/10 flex items-center justify-center">
                    <motion.img
                      src={category.image}
                      alt={category.title}
                      width="80"
                      height="80"
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                 
                  </div>

                  {/* Category Name */}
                  <div className="px-3 pb-2.5 text-center">
                    <h3 className="text-sm font-semibold text-black group-hover:text-orange-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>

                  
              </Link>
            </motion.div>
          ))}
        </div>

        
      </div>
    </div>
  );
});

export default MobileCategories;