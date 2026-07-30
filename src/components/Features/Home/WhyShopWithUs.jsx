import React from "react";
import SectionHeader from "../../Common/SectionHeader";
import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";

const WhyShopWithUs = () => {
  const features = [
    {
      id: 1,
      icon: Truck,
      title: "Free Shipping",
      description:
        "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Secure Payment",
      description:
        "Your payment information is safe with us. We use industry-leading encryption.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      icon: RefreshCw,
      title: "Easy Return",
      description:
        "30-day hassle-free return policy. No questions asked, full refund guaranteed.",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      icon: Headset,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you.",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:pt-12 lg:pb-20 w-full">
      <SectionHeader
        title="Why Shop With Us"
        description="We provide the best shopping experience with premium quality products and exceptional service"
        showAction
        actionText="Start Shopping"
        actionLink="/shop"
      />

      {/* Features Grid - Added pt-2 to contain top translate hovers cleanly without CLS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 pt-2">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm sm:shadow-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left transform-gpu"
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Icon Container */}
              <div
                className={`relative w-12 h-12 sm:w-16 sm:h-16 ${feature.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 transition-transform duration-300 group-hover:scale-105`}
              >
                <IconComponent
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`}
                />
              </div>

              {/* Content */}
              <h3 className="relative text-sm sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyShopWithUs;