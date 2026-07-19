


import React from "react";
import SectionHeader from "../../Common/SectionHeader";
import weekend from "../../../assets/weekend.png";
import office from "../../../assets/office.png";
import black from "../../../assets/black.jpeg";
import groomingpick from "../../../assets/groomingpick.jpeg";
import active from "../../../assets/active.jpeg";
import { useNavigate } from "react-router-dom";


const FeaturedCategories = () => {
  const navigate = useNavigate();
const categories = [
  {
    id: 1,
    name: "Weekend Casual",
    count: "150+ Products",
    image:weekend,
    category: "Weekend Casual",
    gradientClass: "bg-[linear-gradient(160deg,#3A2A2A80,#1111111E)]",
    span: "lg:col-span-2 lg:row-span-2",
    accent: "sporty",
  },
  {
    id: 2,
    name: "Office Ready",
    count: "80+ Products",
    image: office,
    category: "Office Ready",
    gradientClass: "bg-[linear-gradient(160deg,#2E3440A0,#0A0A0AE6)]",
    span: "",
    accent: "classic",
  },
  {
    id: 3,
    name: "Black Edition",
    count: "200+ Products",
    image:black,
    category: "Black Edition",
    gradientClass: "bg-[linear-gradient(160deg,#C6F13530,#0A0A0AE6)]",
    span: "",
    accent: "sporty",
  },
  {
    id: 4,
    name: "Active Lifestyle",
    count: "90+ Products",
    image: active,
    category: "ActiveLifestyle",
    gradientClass: "bg-[linear-gradient(160deg,#E8A85450,#0A0A0AE6)]",
    span: "",
    accent: "travel",
  },
  {
    id: 5,
    name: "Grooming Picks",
    count: "60+ Products",
    image: groomingpick,
    category: "Grooming Picks",
    gradientClass: "bg-[linear-gradient(160deg,#4A254580,#0A0A0AF2)]",
    span: "",
    accent: "luxury",
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
    <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 overflow-hidden py-14 lg:py-20">
      {/* Radial glow top */}
      <div className="absolute top-0 left-0 right-0 h-75 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,165,0,0.05)_0%,transparent_70%)]"></div>

      <SectionHeader
        title="Featured Collections"
        description="Shop by lifestyle — curated edits built around how you actually move through your week."
        showAction
        actionText="View All Products"
        actionLink="/shop"
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[220px_220px] gap-6 mb-8 relative z-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`group relative w-full h-73 lg:h-auto ${cat.span} rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg hover:-translate-y-2.5 hover:shadow-xl`}
            onClick={() => handleCategoryClick(cat.category)}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 z-1 ${cat.gradientClass} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transition-transform duration-300 group-hover:-translate-y-2.5">
              {cat.accent === "luxury" ? (
                <h3 className="text-3xl text-white mb-2 drop-shadow-md tracking-wide">
                  {cat.name}
                </h3>
              ) : (
                <h3 className="text-3xl text-white mb-2 drop-shadow-md tracking-wide">
                  {cat.name}
                </h3>
              )}
              <p className="text-white/80 mb-5 drop-shadow-md text-sm">
                {cat.count}
              </p>

              <button  onClick={(e) => {
                  e.stopPropagation(); // Parent card-er click event jeno trigger na hoy
                  // URL-e query parameter hishebe collection name pass korchi
                  navigate(`/shop?collection=${encodeURIComponent(cat.category)}`);
                }}
                className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full text-sm opacity-0 transform translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:translate-x-1 ${
                  cat.accent === "luxury"
                    ? "bg-linear-to-tr from-[#FF7203] to-[#FF9A03] text-gray-900 hover:bg-[#FF7203] hover:text-black"
                    : "bg-linear-to-tr from-[#FF7203] to-[#FF9A03] text-gray-900 hover:bg-[#FF7203] hover:text-black"
                }`}
              >
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

            {/* Shine effect (luxury card gets subtle shimmer on idle too) */}
            <div
              className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rotate-45 pointer-events-none bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.12)_50%,transparent_70%)] transition-all duration-500 ${
                cat.accent === "luxury"
                  ? "opacity-40 group-hover:opacity-100 group-hover:left-full"
                  : "opacity-0 group-hover:opacity-100 group-hover:left-full"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;