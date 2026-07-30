import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";

import logo from "/assets/images/Logo.webp";

import { useCartStore } from "../../stores/cart.store";
import { cn } from "../../utils/cn";

const NAV_LINKS = [
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories", hasMegaMenu: true },
  { name: "Deals", path: "/deals" },
  { name: "About", path: "/about" },
];

const DesktopHeader = ({ onSearchOpen, onMegaMenuToggle, isMegaMenuOpen }) => {
  const location = useLocation();
  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.length;

  const toggleMegaMenu = useCallback(() => {
    onMegaMenuToggle();
  }, [onMegaMenuToggle]);

  return (
    <div className="hidden md:block">
      <header className="fixed top-0 left-0 right-0 z-1000 transition-all duration-500 bg-[#1a1a24]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link aria-label="Dealora Home" to="/" className="shrink-0">
              <img
                src={logo}
                alt="Dealora"
                width="120"
                height="48"
                className="h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <div className="flex items-center justify-center flex-1 gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return link.hasMegaMenu ? (
                  <div key={link.path} className="relative">
                    <button
                      aria-label={link.name}
                      onClick={toggleMegaMenu}
                      className={cn(
                        "flex items-center gap-2 text-base font-medium py-2 transition-all duration-300 hover:-translate-y-0.5",
                        isMegaMenuOpen || isActive
                          ? "text-orange-600"
                          : "text-[#f0f8ff] hover:text-orange-600"
                      )}
                    >
                      {link.name}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          isMegaMenuOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 origin-left transition-transform duration-300",
                        isMegaMenuOpen || isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </div>
                ) : (
                  <Link
                    aria-label={link.name}
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "relative text-base font-medium py-2 transition-all duration-300 hover:-translate-y-0.5",
                      isActive ? "text-orange-600" : "text-[#f0f8ff] hover:text-orange-600"
                    )}
                  >
                    {link.name}
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 origin-left transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                aria-label="Search products"
                onClick={onSearchOpen}
                className="transition-all duration-200 hover:scale-110 active:scale-95 p-2 text-[#f0f8ff] hover:text-orange-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link aria-label="cart" to="/cart">
                <button
                  aria-label="Cart"
                  className="transition-all duration-200 hover:scale-110 active:scale-95 relative p-2 text-[#f0f8ff] hover:text-orange-600 transition-colors"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {totalCartItems > 0 && (
                    <span
                      key={totalCartItems}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scaleIn"
                    >
                      {totalCartItems > 99 ? "99+" : totalCartItems}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default DesktopHeader;