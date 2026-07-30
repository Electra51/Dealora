import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { useLocation } from "react-router-dom";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

// Lazy load heavy components
const MegaMenu = lazy(() => import("./MegaMenu/MegaMenu"));
const SearchBar = lazy(() => import("./SearchBar"));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const toggleMegaMenu = useCallback(() => {
    setIsMegaMenuOpen((prev) => !prev);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setIsMegaMenuOpen(false);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <DesktopHeader
        onSearchOpen={() => setIsSearchOpen(true)}
        onMegaMenuToggle={toggleMegaMenu}
        isMegaMenuOpen={isMegaMenuOpen}
      />

      {/* Mobile Header */}
      <MobileHeader
        onSearchOpen={() => setIsSearchOpen(true)}
        isScrolled={isScrolled}
      />

      {/* Lazy Loaded Search Modal */}
      <Suspense fallback={null}>
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </Suspense>

      {/* Lazy Loaded Mega Menu */}
      <Suspense fallback={null}>
        <MegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />
      </Suspense>
    </>
  );
};

export default React.memo(Header);