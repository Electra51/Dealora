import React from "react";

const About = () => {
  const stats = [
    { number: "500+", label: "Premium Products" },
    { number: "50K+", label: "Happy Customers" },
    { number: "15+", label: "Brand Partners" },
    { number: "4.8", label: "Average Rating" },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Quality Guaranteed",
      description: "Every product is authenticated and verified for quality before reaching you."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Delivery",
      description: "Lightning-fast shipping with real-time tracking on all orders."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Customer First",
      description: "24/7 dedicated support team ready to assist you with anything."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Best Prices",
      description: "Competitive pricing with exclusive deals and seasonal discounts."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "Passionate about bringing authentic sneakers to enthusiasts worldwide."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      bio: "Curating the finest collection of premium footwear since 2015."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      bio: "Ensuring every customer has an exceptional shopping experience."
    },
    {
      name: "David Kim",
      role: "Operations Director",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      bio: "Streamlining logistics to deliver your favorites faster than ever."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1a1a24] via-[#2d1b3d] to-[#1a1a24] text-white py-24 overflow-hidden">
         <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 20% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)" }}
      ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            About <span className="text-orange-500">SneakerHub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mr-auto mb-8">
            We're more than just a sneaker store. We're a community of enthusiasts dedicated to bringing you the finest footwear from around the globe.
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30">
              Our Story
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full transition-all duration-300 border border-white/20">
              Meet the Team
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-linear-to-br from-purple-100 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
  <span className="inline-block italic py-2 text-orange-600 rounded-full text-sm font-bold mb-4">
    OUR STORY
  </span>

  <h2 className="text-4xl font-black text-gray-900 mb-6">
    Built for Smarter <span className="text-orange-500">Shopping</span>
  </h2>

  <div className="space-y-4 text-gray-600 leading-relaxed">
    <p>
      Dealora was created with a simple vision—to make online shopping
      effortless, reliable, and enjoyable. We bring together quality products,
      trusted brands, and exclusive deals in one seamless shopping experience.
    </p>

    <p>
      From everyday essentials to the latest collections, every product is
      carefully selected to deliver exceptional value, premium quality, and a
      customer-first experience. Our platform is designed with performance,
      security, and convenience at its core.
    </p>

    <p>
      As we continue to grow, our mission remains the same: helping customers
      discover products they love through a modern, fast, and trustworthy
      shopping platform that puts quality and satisfaction first.
    </p>
  </div>

  <div className="mt-8 flex flex-wrap gap-6">
    <div className="flex items-center gap-2">
      <svg
        className="w-6 h-6 text-orange-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>

      <span className="font-semibold text-gray-900">
        Curated Quality Products
      </span>
    </div>

    <div className="flex items-center gap-2">
      <svg
        className="w-6 h-6 text-orange-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>

      <span className="font-semibold text-gray-900">
        Secure & Trusted Shopping
      </span>
    </div>
  </div>
</div>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-purple-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop" 
                alt="Our Store" 
                className="relative rounded-3xl shadow-2xl w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
           
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              What Makes Us <span className="text-orange-500">Different</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mr-auto">
              We're committed to providing an exceptional experience from browsing to delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-linear-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
          
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Meet The <span className="text-orange-500">Experts</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mr-auto">
              Dedicated professionals passionate about bringing you the best sneaker experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 hover:bg-orange-500 hover:text-white transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 hover:bg-orange-500 hover:text-white transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br  from-orange-400 via-orange-500 to-red-500 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of satisfied customers and discover why SneakerHub is the trusted choice for premium footwear.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-orange-800 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30">
              Shop Now
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full transition-all duration-300 border border-white/20">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;