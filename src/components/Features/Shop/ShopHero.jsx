import React from 'react';
import { motion } from 'framer-motion';

const ShopHero = () => {
  return (
    <section className="hidden md:block relative bg-linear-to-br from-[#1a1a24] via-[#2d1b3d] to-[#1a1a24]  text-white py-16 md:pt-30 md:pb-15 overflow-hidden">
      
       <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 20% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)" }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <motion.nav 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-gray-300 mb-6"
        >
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <span className="text-white font-medium">Shop</span>
        </motion.nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Explore Our <span className="bg-linear-to-tr from-[#FF7203] to-[#FF9A03] bg-clip-text text-transparent">Premium</span> 
            <br/>Collection
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Discover the finest sneakers, apparel, and accessories curated for those who demand the best.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopHero;