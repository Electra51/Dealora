import React from "react";

const WhyShopWithUs = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
      title: "Free Shipping",
      description: "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Secure Payment",
      description: "Your payment information is safe with us. We use industry-leading encryption.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      ),
      title: "Easy Return",
      description: "30-day hassle-free return policy. No questions asked, full refund guaranteed.",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock to assist you.",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="relative max-w-[1400px] mx-auto px-4 py-24 w-full lg:py-32">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block px-6 py-2 mb-4 bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200 rounded-full text-orange-600 text-sm font-bold tracking-widest uppercase">
          Why Choose Us
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Why Shop{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            With Us
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide the best shopping experience with premium quality products and exceptional service
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            ></div>

            {/* Icon */}
            <div
              className={`relative w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
            >
              <div className={`${feature.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="relative text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>

            {/* Decorative element */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <a
          href="/shop"
          className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold rounded-full text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          Start Shopping
          <svg
            className="w-5 h-5 transition-transform duration-300"
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
    </section>
  );
};

export default WhyShopWithUs;