

const FeaturedBanner = () => {
  return (
    <section className="relative w-full bg-linear-to-br  from-orange-400 via-orange-500 to-red-500 shadow-2xl">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center text-white">
            
            <h2 className="text-5xl md:text-5xl lg:text-5xl font-black leading-tight mb-6">
              Summer 
              Sale
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl md:text-6xl font-black bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl">
                40%
              </span>
              <span className="text-4xl md:text-5xl font-bold">OFF</span>
            </div>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
              Discover amazing deals on your favorite products. Don't miss out on this exclusive summer collection!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/shop"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-orange-600 font-bold rounded-full text-base shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Explore Now
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/deals"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-base hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                View All Deals
              </a>
            </div>
          </div>

          {/* Right Side - Image/Visual */}
          <div className="hidden lg:flex items-center justify-center relative z-50">
            <div className="relative w-full max-w-md">
              {/* Floating elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-300/30 rounded-full blur-2xl animate-pulse"></div>
              
              {/* Main visual */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="aspect-square bg-linear-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl font-black mb-4">🔥</div>
                    <p className="text-2xl font-bold">Hot Deals</p>
                    <p className="text-sm text-white/80 mt-2">Up to 40% Off</p>
                  </div>
                </div>
                
                {/* Decorative badges */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg rotate-12">
                  SALE
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-orange-600 px-4 py-2 rounded-full font-bold text-sm shadow-lg -rotate-12">
                  HOT
                </div>
              </div>
            </div>
          </div>
        </div>

   
      </div>
    </section>
  );
};

export default FeaturedBanner;