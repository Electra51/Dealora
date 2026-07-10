import React from "react";
import SectionHeader from "./Common/SectionHeader";

const ShopByBrand = () => {
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
      color: "#111",
    },
    {
      id: 2,
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
      color: "#000",
    },
    {
      id: 3,
      name: "Puma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Puma_logo.svg",
      color: "#111",
    },
    {
      id: 4,
      name: "New Balance",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/New_Balance_logo.svg",
      color: "#cf0a2c",
    },
    {
      id: 5,
      name: "Reebok",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Reebok_vector.svg",
      color: "#000",
    },
    {
      id: 6,
      name: "Converse",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Converse_logo.svg",
      color: "#000",
    },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="relative py-20 lg:py-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <SectionHeader
          title="Shop by Brand"
          description="Explore collections from the world's most iconic footwear and
              apparel brands."
          showAction
          actionText="View All Products"
          actionLink="/shop"
        />
        {/* Carousel Container with gradient fade edges */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Carousel Track */}
          <div className="flex overflow-hidden group">
            <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="shrink-0 mx-4 md:mx-6"
                >
                  <div className="group/card relative flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
                    {/* Logo container */}
                    <div className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 mb-3 grayscale group-hover/card:grayscale-0 transition-all duration-500">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain filter group-hover/card:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to text if image fails
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <span
                        className="hidden items-center justify-center text-2xl font-black"
                        style={{ color: brand.color }}
                      >
                        {brand.name}
                      </span>
                    </div>

                    {/* Brand name */}
                    <span className="text-sm font-semibold text-gray-700 group-hover/card:text-orange-600 transition-colors duration-300">
                      {brand.name}
                    </span>

                    {/* Hover indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-orange-500 rounded-full opacity-0 group-hover/card:opacity-100 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ShopByBrand;
