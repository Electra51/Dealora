import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, ArrowLeft } from "lucide-react";

import logoMobile from "/assets/images/logo-mobile.webp";

import { useCartStore } from "../../stores/cart.store";
import { cn } from "../../utils/cn";

const MobileHeader = ({ onSearchOpen, isScrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.length;

  const isHomePage = location.pathname === "/";

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/shop":
        return "Shop";
      case "/cart":
        return "Cart";
      case "/deals":
        return "Deals";
      case "/about":
        return "About";
      default:
        return "Dealora";
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="md:hidden">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-59 transition-all duration-500 md:border-b",
          isScrolled
            ? "bg-white backdrop-blur-md shadow-lg"
            : "bg-transparent md:bg-[#1a1a24]"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* LEFT SECTION - Logo or Back Button */}
            <div className="flex items-center gap-3">
              {isHomePage ? (
                <Link aria-label="Dealora Home" to="/" className="shrink-0">
                  <img
                    src={logoMobile}
                    alt="Dealora"
                    width="100"
                    height="40"
                    className="h-8 md:h-10 w-auto transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              ) : (
                <button
                  aria-label="back-button"
                  onClick={handleBack}
                  className="p-2 -ml-2 text-black hover:text-orange-600 transition-colors rounded-full hover:bg-white/10 active:scale-95 transition-transform"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* CENTER SECTION - Page Title (Only on non-home pages) */}
            {!isHomePage && (
              <div className="flex-1 text-center">
                <h1
                  className={cn(
                    "text-xl md:text-xl font-bold",
                    isScrolled ? "text-black" : "text-black"
                  )}
                >
                  {getPageTitle()}
                </h1>
              </div>
            )}

            {/* RIGHT SECTION - Search & Cart Icons */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {isHomePage && (
                <>
                  <button
                    aria-label="search products"
                    onClick={onSearchOpen}
                    className="hidden md:block duration-200 hover:scale-110 active:scale-95 p-2 text-white hover:text-orange-600 transition-colors rounded-full hover:bg-white/10"
                  >
                    <Search className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  <Search
                    onClick={onSearchOpen}
                    className="w-5 h-5 text-gray-600 md:hidden active:scale-95 transition-transform"
                  />
                </>
              )}
              {/* Cart Icon with Badge */}
              <Link to="/cart" className="relative" aria-label="add to cart">
                <button
                  aria-label="add to cart"
                  className={cn(
                    "duration-200 hover:scale-110 active:scale-95 p-2 hover:text-orange-600 transition-colors rounded-full hover:bg-white/10",
                    isScrolled ? "text-black" : "text-black"
                  )}
                >
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                {totalCartItems > 0 && (
                  <span
                    key={totalCartItems}
                    className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center animate-scaleIn"
                  >
                    {totalCartItems > 9 ? "9+" : totalCartItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MobileHeader;