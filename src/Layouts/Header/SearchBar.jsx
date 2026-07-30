import React, { memo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import dbData from "../../data/db.json";

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

  if (!isOpen) return null;

  const filteredProducts = dbData.products.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-1100 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed top-20 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[90%] md:max-w-2xl bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl z-1101 p-6 animate-slideDown">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Search className="w-6 h-6 text-orange-600" />
          <input
            aria-label="Search products"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands..."
            className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-500 focus:outline-none"
          />
          <button
            aria-label="close"
            type="button"
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </form>

        {/* Suggestions Section */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <h3 className="text-gray-500 text-sm font-medium mb-3">
            Popular Suggestions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredProducts.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setQuery(item.name);
                  navigate(`/shop?search=${encodeURIComponent(item.name)}`);
                  onClose();
                }}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-left"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover bg-white/10"
                />
                <div>
                  <p className="text-sm font-medium text-white line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-1 sm:col-span-2 text-center py-4 text-gray-500 text-sm">
                No products found for "{query}"
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default SearchBar;