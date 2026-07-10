import React from "react";
import SectionHeader from "../Common/SectionHeader";

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Sneakers",
      count: "150+ Products",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      category: "Men's Sneaker",
      // Tailwind arbitrary gradient class (Hex with Alpha)
      gradientClass: "bg-linear-gradient(135deg,#667EEA2E,#764BA2B2)",
    },
    {
      id: 2,
      name: "Boots Collection",
      count: "80+ Products",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b513f2cec8b440978d60ab6d014ad452_9366/Response_3MC_ADV_Boots_Black_EG9391_01_standard.jpg",
      category: "Men's Boot",
      gradientClass: "bg-[linear-gradient(135deg,#F093FB2B,#A42B3B70)]",
    },
    {
      id: 3,
      name: "Caps & Hats",
      count: "120+ Products",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c3981523051c4a978674ad3c01015664_9366/Dispatch_Trucker_Hat_Black_EY5534_01_standard.jpg",
      category: "Cap",
      gradientClass: "bg-[linear-gradient(135deg,#4FACFE7D,#00F2FE00)]",
    },
    {
      id: 4,
      name: "Backpacks",
      count: "90+ Products",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/d6ee0177281f42f0a254acb1016aa051_9366/Defender_Backpack_Red_EX7011_01_standard.jpg",
      category: "Backpack",
      gradientClass: "bg-[linear-gradient(135deg,#FA709A40,#FEE1404C)]",
    },
    {
      id: 5,
      name: "Earphones",
      count: "200+ Products",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/b322cdef8e654551ace9adcc00f963ed_9366/adidas_Z.N.E._01_ANC_True_Wireless_Earbuds_Grey_EY5114_41_detail.jpg",
      category: "Earphones",
      gradientClass: "bg-[linear-gradient(135deg,#A8EDEA38,#FED6E342)]",
    },
    {
      id: 6,
      name: "Bottle",
      count: "100+ Products",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a9c04ca9fa51408faf2fac8e0117abb9_9366/Steel_Metal_Bottle_1L_Black_EX7288_01_standard.jpg",
      category: "Bottle",
      gradientClass: "bg-[linear-gradient(135deg,#FFECD242,#FCB69F68)]",
    },
  ];

  const handleCategoryClick = (category) => {
    const shopSection = document.querySelector(".products-container");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    console.log("Selected category:", category);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden lg:py-20">
      {/* Radial glow top */}
      <div className="absolute top-0 left-0 right-0 h-75 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,165,0,0.05)_0%,transparent_70%)]"></div>

      {/* Header */}
      {/* <div className="flex justify-between items-center">
        <div className="text-start mb-16 relative z-10">
          <h2 className="mt-4 text-4xl font-black text-gray-900 leading-tight">
            Featured Collections
          </h2>
          <p className="mt-2 max-w-xl mr-auto text-lg text-gray-600 leading-relaxed">
            Discover our curated collection of premium products across multiple
            categories
          </p>
        </div>

       
        <div className="text-center relative z-10">
          <a
            href="/shop"
            className="inline-flex items-center gap-3 px-10 py-4 text-orange-600"
          >
            View All Products
            <svg
              className="w-5 h-5 transition-transform duration-300 hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div> */}

      <SectionHeader
  title="Featured Collections"
  description="Discover our curated collection of premium products across multiple categories."
  showAction
  actionText="View All Products"
  actionLink="/shop"
/>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-8 relative z-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative w-full h-73 mx-auto rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg hover:-translate-y-2.5 hover:shadow-xl"
            onClick={() => handleCategoryClick(cat.category)}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 z-1 ${cat.gradientClass} opacity-70 group-hover:opacity-90 transition-opacity duration-300`}
            />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transition-transform duration-300 group-hover:-translate-y-2.5">
              <h3 className="text-3xl font-black text-white mb-2 drop-shadow-md">
                {cat.name}
              </h3>
              <p className="text-white/90 mb-5 drop-shadow-md">{cat.count}</p>

              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-full text-sm opacity-0 transform translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-orange-500 hover:text-white hover:translate-x-1">
                Shop Now
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            {/* Shine effect */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-500 rotate-45 pointer-events-none bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)]"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
