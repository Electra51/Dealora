import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/Logo.png";
import logoMobile from "../assets/images/logo-mobile.png";
import heroShoe1 from "../assets/shoe.webp";
import heroShoe2 from "../assets/shoe.webp";
import clothing from "../assets/images/categories/clothing.png";
import accessesories from "../assets/images/categories/accessesories.png";
import footwaer from "../assets/images/categories/footwaer.png";
import grooming from "../assets/images/categories/grooming.png";
import { cn } from "../utils/cn";
import { useCartStore } from "../stores/cart.store";
import dbData from "../data/db.json";
import { ArrowRight, ChevronDown, X, Search, ShoppingBag,ArrowLeft,Bell,  } from "lucide-react";

const getCategoryCount = (subCategory) => {
  return dbData.products.filter((p) => p.subCategory === subCategory).length;
};

// Animation Variants - Optimized for GPU
const variants = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  mobileMenu: {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 200 },
    },
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
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
  },
  categoryCard: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
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

// Enhanced Static Data with more details
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
    image: clothing,
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
    image: footwaer,
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
    image: accessesories,
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

const SEARCH_SUGGESTIONS = [
  {
    id: 1,
    name: "Nike Air Max Pro",
    category: "Footwear",
    price: 129.99,
    image: heroShoe1,
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    category: "Footwear",
    price: 149.99,
    image: heroShoe2,
  },
  {
    id: 3,
    name: "Classic Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    image: clothing,
  },
  {
    id: 4,
    name: "Smart Watch Series 7",
    category: "Accessories",
    price: 299.0,
    image: accessesories,
  },
  {
    id: 5,
    name: "Premium Grooming Kit",
    category: "Grooming",
    price: 45.5,
    image: grooming,
  },
  {
    id: 6,
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    image: footwaer,
  },
];

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
                  rotate: isHovered ? [0, -10, 10, 0] : 0,
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
                  rotate: isHovered ? 2 : 0,
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
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check if current page is homepage
  const isHomePage = location.pathname === "/";
  
  // Get page title based on route
  const getPageTitle = () => {
    switch(location.pathname) {
      case "/shop": return "Shop";
      case "/cart": return "Cart";
      case "/deals": return "Deals";
      case "/about": return "About";
      default: return "Dealora";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when going back
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mega Menu Handlers
  const toggleMegaMenu = useCallback(() => {
    setIsMegaMenuOpen(prev => !prev);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setIsMegaMenuOpen(false);
  }, []);

  // Existing Desktop Header Component
  const DesktopHeader = () => (
    <div className="hidden md:block">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-1000 transition-all duration-500 bg-[#1a1a24]",
          // isScrolled
          //   ? "bg-[#1a1a24]/95 backdrop-blur-md shadow-lg"
          //   : "bg-[#1a1a24]"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="shrink-0">
              <motion.img 
                src={logo} 
                alt="Dealora" 
                className="h-10 md:h-12 w-auto"
                whileHover={{ scale: 1.05 }}
              />
            </Link>

            <div className="flex items-center justify-center flex-1 gap-10">
              {NAV_LINKS.map((link) =>
                link.hasMegaMenu ? (
                  <div key={link.path} className="relative">
                    <motion.button
                      onClick={toggleMegaMenu}
                      className={cn(
                        "flex items-center gap-2 text-[#f0f8ff] text-base font-medium py-2 transition-colors",
                        isMegaMenuOpen ? "text-orange-500" : "hover:text-orange-500",
                      )}
                      whileHover={{ y: -2 }}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          isMegaMenuOpen && "rotate-180",
                        )}
                      />
                    </motion.button>
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 origin-left",
                        isMegaMenuOpen ? "scale-x-100" : "scale-x-0",
                      )}
                      initial={false}
                      animate={{
                        scaleX: isMegaMenuOpen ? 1 : 0,
                      }}
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
                        "scale-x-0"
                      )}
                      whileHover={{ scaleX: 1 }}
                    />
                  </Link>
                ),
              )}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-[#f0f8ff] hover:text-orange-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-[#f0f8ff] hover:text-orange-500 transition-colors"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {totalCartItems > 0 && (
                    <motion.span
                      key={totalCartItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {totalCartItems > 99 ? "99+" : totalCartItems}
                    </motion.span>
                  )}
                </motion.button>
              </Link>
            </div>
          </div>
        </nav>

        <MegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />
      </header>
    </div>
  );

  // New Mobile Header (Instacart style)
  const MobileHeader = () => (
    <div className="md:hidden">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-1000 transition-all duration-500 pb-5 md:border-b rounded-b-[28px]",
          isScrolled
            ? "bg-[#1a1a24]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent md:bg-[#1a1a24]"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* LEFT SECTION - Logo or Back Button */}
            <div className="flex items-center gap-3 min-w-25">
              {isHomePage ? (
                // Homepage: Show Logo
                <Link to="/" className="shrink-0">
                  <motion.img 
                    src={logoMobile} 
                    alt="Dealora" 
                    className="h-8 md:h-10 w-auto"
                    whileHover={{ scale: 1.05 }}
                  />
                </Link>
              ) : (
                // Other Pages: Show Back Button
                <motion.button
                  onClick={handleBack}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 -ml-2 text-white hover:text-orange-500 transition-colors rounded-full hover:bg-white/10"
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
              )}
            </div>

            {/* CENTER SECTION - Page Title (Only on non-home pages) */}
            {!isHomePage && (
              <div className="flex-1 text-center">
                <h1 className="text-lg md:text-xl font-bold text-white">
                  {getPageTitle()}
                </h1>
              </div>
            )}

            {/* RIGHT SECTION - Search & Cart Icons */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {/* Search Icon - Always Visible */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 md:block hidden text-white hover:text-orange-500 transition-colors rounded-full hover:bg-white/10"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>

              {/* Cart Icon with Badge */}
              <Link to="/cart" className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-black hover:text-orange-500 transition-colors rounded-full hover:bg-white/10"
                >
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
                {totalCartItems > 0 && (
                  <motion.span
                    key={totalCartItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalCartItems > 9 ? "9+" : totalCartItems}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>

          {/* SEARCH BAR - Full Width Below Header (Like Instacart) */}
          <div className="pb-0 md:pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands..."
                onClick={() => setIsSearchOpen(true)}
                readOnly
                className="w-full border border-[#2d2d3a] md:bg-[#2d2d3a] text-white placeholder-gray-400 rounded-full py-2.5 md:py-3 pl-12 pr-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );

  return (
    <>
      {/* Desktop Header */}
      <DesktopHeader />
      
      {/* Mobile Header */}
      <MobileHeader />

      {/* Search Modal/Overlay */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

  
    </>
  );
};

// Mega Menu Component (Keep your existing one)
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
            className="fixed top-20 inset-x-0 bottom-0 bg-black/60 backdrop-blur-md z-900"
            onClick={onClose}
          />

          {/* Mega Menu Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.megaMenu}
            className="absolute top-full left-0 right-0 bg-[#1a1a24]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl z-950 max-h-[calc(100vh-5rem)] overflow-y-auto"
            style={{ willChange: "transform, opacity" }}
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
                    <h4 className="text-xl font-bold text-white mb-2">
                      New Arrivals 2026
                    </h4>
                    <p className="text-gray-400">
                      Check out our latest collection with up to 40% off
                    </p>
                  </div>
                  <Link
                    to="/shop?filter=new"
                    onClick={onClose}
                    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
                  >
                    Shop Now <ArrowRight className="w-4 h-4" />
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

// Search Bar Component (Keep your existing one)
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
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-1100"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[90%] md:max-w-2xl bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl z-1101 p-6"
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
              <Search className="w-6 h-6 text-orange-500" />
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
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default memo(Header);