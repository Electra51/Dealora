import React, { useState, useEffect, useRef } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef(null);

  // Clear timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Native Form Submit Prevent
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");

      timeoutRef.current = setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative bg-linear-to-br from-orange-500 via-orange-400 to-amber-400 overflow-hidden mb-8 md:mb-0">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-600/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white/5 rounded-full blur-3xl"></div>

        {/* Pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Newsletter Section */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
              Get 10% off your first order
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl drop-shadow">
              Subscribe to our newsletter and receive exclusive offers, latest news, and updates directly in your inbox.
            </p>
          </div>

          {/* Right Form */}
          <div className="flex-1 w-full max-w-md">
            {/* Native Form wrapping inputs for better accessibility */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  aria-label="Email address for newsletter"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={`w-full px-5 py-4 bg-white/95 backdrop-blur-sm border-2 ${
                    error ? "border-red-500" : "border-white/50"
                  } rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={isLoading || isSubscribed}
                />
              </div>

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className={`px-8 py-4 font-bold rounded-xl transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-xl ${
                  isSubscribed
                    ? "bg-green-500 text-white shadow-green-500/50"
                    : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 hover:shadow-gray-900/50"
                }`}
                disabled={isLoading || isSubscribed}
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : isSubscribed ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed!
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {/* Fixed height container to prevent CLS when showing messages */}
            <div className="min-h-7 mt-2">
              {error && (
                <span className="block text-sm text-red-100 font-medium drop-shadow animate-fade-in">
                  {error}
                </span>
              )}
              {isSubscribed && (
                <span className="block text-sm text-white font-medium drop-shadow animate-fade-in">
                  🎉 Welcome! Check your inbox for your 10% discount code.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;