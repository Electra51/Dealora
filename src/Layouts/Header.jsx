import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/Logo.png";
import heroShoe1 from "../assets/shoe.png";
import heroShoe2 from "../assets/shoe.png";
import clothing from "../assets/images/categories/clothing.png";
import accessesories from "../assets/images/categories/accessesories.png";
import footwaer from "../assets/images/categories/footwaer.png";
import grooming from "../assets/images/categories/grooming.png";
import { cn } from "../utils/cn";
import { 
  FiShoppingBag, FiMenu, FiX, FiSearch, FiChevronDown, 
  FiArrowRight, FiTrendingUp, FiStar, FiZap, FiGift 
} from "react-icons/fi";
import { useCartStore } from "../stores/cart.store";

// Enhanced Static Data with more details
const MEGA_MENU_CATEGORIES = [
  {
    title: "Clothing",
    icon: "👕",
    items: [
      { name: "T-Shirts", count: 124, trending: true },
      { name: "Shirts", count: 89 },
      { name: "Hoodies", count: 67, trending: true },
      { name: "Jackets", count: 45 },
      { name: "Jeans", count: 156 },
    ],
    color: "from-blue-500 to-cyan-500",
    accentColor: "blue",
    image: clothing,
    badge: "Bestseller",
  },
  {
    title: "Footwear",
    icon: "👟",
    items: [
      { name: "Sneakers", count: 234, trending: true },
      { name: "Running Shoes", count: 178 },
      { name: "Boots", count: 89 },
      { name: "Sandals", count: 56 },
      { name: "Formal Shoes", count: 112 },
    ],
    color: "from-pink-500 to-rose-500",
    accentColor: "pink",
    image: footwaer,
    badge: "New Arrivals",
  },
  {
    title: "Accessories",
    icon: "⌚",
    items: [
      { name: "Bags", count: 78 },
      { name: "Watches", count: 145, trending: true },
      { name: "Caps", count: 92 },
      { name: "Wallets", count: 67 },
      { name: "Belts", count: 54 },
    ],
    color: "from-yellow-500 to-amber-500",
    accentColor: "yellow",
    image: accessesories,
    badge: "Trending",
  },
  {
    title: "Grooming",
    icon: "🌿",
    items: [
      { name: "Perfumes", count: 189, trending: true },
      { name: "Body Sprays", count: 134 },
      { name: "Face Wash", count: 78 },
      { name: "Hair Care", count: 92 },
      { name: "Shaving Kits", count: 45 },
    ],
    color: "from-purple-500 to-violet-500",
    accentColor: "purple",
    image: grooming,
    badge: "Premium",
  },
];

const NAV_LINKS = [
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories", hasMegaMenu: true },
  { name: "Deals", path: "/deals" },
  { name: "About", path: "/about" },
];

// Animation Variants - Optimized for GPU
const variants = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  mobileMenu: {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
  },
  megaMenu: {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1
      } 
    },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } }
  },
  categoryCard: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
  },
  searchInput: {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "100%", opacity: 1, transition: { duration: 0.3 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
  navItem: {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
};

// Search Bar Component
const SearchBar = memo(({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1100"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl z-1101"
          >
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex items-center gap-4">
                <FiSearch className="w-6 h-6 text-orange-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, brands..."
                  className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Running Shoes", "Basketball", "New Arrivals", "Sale"].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-white/5 hover:bg-orange-500/20 text-gray-300 hover:text-orange-500 rounded-full text-sm transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

// Enhanced Category Card Component
const CategoryCard = memo(({ category, index, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants.categoryCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link
        to={`/shop?category=${category.title.toLowerCase()}`}
        onClick={onClose}
        className="block"
      >
        {/* Card Container */}
        <div className="relative overflow-hidden  backdrop-blur-sm transition-all duration-500 hover:border-white/20">
          {/* Gradient Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 pointer-events-none`}
          />

        

          {/* Header Section */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                className="text-4xl"
              >
                {category.icon}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                  {category.description}
                </p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <ul className="relative z-10 space-y-2 mb-6">
            {category.items.slice(0, 5).map((item, idx) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-start group/item"
              >
                <Link
                  to={`/shop?category=${category.title.toLowerCase()}&item=${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-all duration-300 flex-1"
                >
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-orange-500 to-pink-500 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                    <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                       <span className="text-xs text-gray-600 group-hover/item:text-gray-500 transition-colors">
                  ({item.count})
                </span>
                  </motion.div>
                
                </Link>
             
              </motion.li>
            ))}
          </ul>

          {/* Image Preview */}
          {category.image && (
            <div className="relative h-40 rounded-xl overflow-hidden bg-linear-to-br from-white/5 to-white/10">
              <motion.img
                src={category.image}
                alt={`${category.title} preview`}
                className="w-full h-full object-contain p-4"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 2 : 0
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-linear-to-br ${category.color} mix-blend-overlay`}
              />
              
             
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
});



// Enhanced Mega Menu Component
const MegaMenu = memo(({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-900"
            onClick={onClose}
          />

          {/* Mega Menu Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.megaMenu}
            className="absolute top-full left-0 right-0 bg-[#1a1a24]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl z-950 max-h-[calc(100vh-5rem)] overflow-y-auto"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            

              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              
                  {MEGA_MENU_CATEGORIES.map((category, index) => (
                    <CategoryCard
                      key={category.title}
                      category={category}
                      index={index}
                      onClose={onClose}
                    />
                  ))}
               

               
              </div>

              {/* Promotional Banners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="bg-linear-to-r from-orange-500/10 to-purple-500/10 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">New Arrivals 2026</h4>
                    <p className="text-gray-400">Check out our latest collection with up to 40% off</p>
                  </div>
                  <Link
                    to="/shop?filter=new"
                    onClick={onClose}
                    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
                  >
                    Shop Now <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

// Main Header Component (Same as before, just using the new MegaMenu)
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Header component er vitore add korun
const cartItems = useCartStore(s => s.items);
const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isMegaMenuOpen || isSearchOpen) ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isMegaMenuOpen, isSearchOpen]);

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  const toggleMegaMenu = useCallback(() => {
    setIsMegaMenuOpen((prev) => !prev);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setIsMegaMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-1000 transition-all duration-500",
          isScrolled
            ? "bg-[#1a1a24]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-[#1a1a24]"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="shrink-0 z-1001">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={logo} alt="Dealora" className="h-10 md:h-12 w-auto" />
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
              {NAV_LINKS.map((link) =>
                link.hasMegaMenu ? (
                  <div key={link.path} className="relative">
                    <motion.button
                      onClick={toggleMegaMenu}
                      className={cn(
                        "flex items-center gap-2 text-[#f0f8ff] text-base font-medium py-2 transition-colors",
                        isActive(link.path) || isMegaMenuOpen ? "text-orange-500" : "hover:text-orange-500"
                      )}
                      whileHover={{ y: -2 }}
                    >
                      {link.name}
                      <FiChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          isMegaMenuOpen && "rotate-180"
                        )}
                      />
                    </motion.button>
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 origin-left",
                        isActive(link.path) || isMegaMenuOpen ? "scale-x-100" : "scale-x-0"
                      )}
                      initial={false}
                      animate={{ scaleX: isActive(link.path) || isMegaMenuOpen ? 1 : 0 }}
                    />
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative text-[#f0f8ff] text-base font-medium py-2 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 origin-left",
                        isActive(link.path) ? "scale-x-100" : "scale-x-0"
                      )}
                      whileHover={{ scaleX: 1 }}
                    />
                  </Link>
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-[#f0f8ff] hover:text-orange-500 transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </motion.button>

          <Link to={"/cart"}>
          <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate('/cart')} // Cart page-e navigate
  className="relative p-2 text-[#f0f8ff] hover:text-orange-500 transition-colors"
>
  <FiShoppingBag className="w-6 h-6" />
  {totalCartItems > 0 && (
    <motion.span
      key={totalCartItems} // Animation trigger
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500 }}
      className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
    >
      {totalCartItems > 99 ? '99+' : totalCartItems}
    </motion.span>
  )}
</motion.button></Link>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center z-1001 text-[#f0f8ff]"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-current rounded-full"
                  animate={isMenuOpen ? { top: "50%", rotate: 45 } : { top: 0, rotate: 0 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current rounded-full"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-current rounded-full"
                  animate={isMenuOpen ? { top: "50%", rotate: -45 } : { top: "100%", rotate: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </nav>

        <MegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-999"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants.mobileMenu}
                className="lg:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#1a1a24] z-1000 shadow-2xl"
              >
                <div className="flex flex-col h-full pt-24 pb-8 px-6">
                  <div className="flex-1 flex flex-col gap-2">
                    {NAV_LINKS.map((link, index) => (
                      <motion.div
                        key={link.path}
                        variants={variants.navItem}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "text-[#f0f8ff] text-xl font-medium py-4 px-4 rounded-xl transition-all block",
                            isActive(link.path) && "bg-orange-500/10 text-orange-500"
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-6 mt-6">
                   <Link 
  to="/cart"
  onClick={() => setIsMenuOpen(false)}
  className="w-full flex items-center justify-between p-4 bg-orange-500 rounded-xl text-white font-semibold"
>
  <span className="flex items-center gap-2">
    <FiShoppingBag className="w-5 h-5" />
    View Cart
  </span>
  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
    {totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}
  </span>
</Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <div className="h-20" />
    </>
  );
};

export default memo(Header);