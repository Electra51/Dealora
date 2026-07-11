import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);
    countdownDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const closeBanner = () => setIsVisible(false);

  if (!isVisible) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="relative bg-linear-to-br from-[#1a1a24] via-[#2d1b3d] to-[#1a1a24] overflow-hidden border-y border-orange-100">
      {/* Close */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 20% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)" }}
      ></div>
      <button
        onClick={closeBanner}
        aria-label="Close banner"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center shadow-sm transition-colors duration-200 hover:border-orange-400 hover:text-orange-500"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="flex flex-col items-start gap-5 text-left">
         

          <h2 className="leading-tight">
            <span className="block text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white">
              Mega Winter Sale
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-orange-500 mt-1">
              Up to 50% Off
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-md">
            Premium shoes, bags, and accessories at unbeatable prices. Don't
            miss out on the season's biggest deals.
          </p>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 mt-1 px-7 py-3 bg-orange-500 text-white text-sm font-bold rounded-full transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300"
          >
            Shop Now
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 text-[13px] text-gray-300 font-medium">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Easy Returns
            </span>
          </div>
        </div>

        {/* Right: countdown */}
        <div className="flex flex-col items-start lg:items-end gap-4 w-full">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Hurry! Sale Ends In
          </p>
          <div className="flex gap-2.5 sm:gap-3 w-full lg:w-auto">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex flex-col items-center justify-center w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-white border border-gray-100 shadow-sm py-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tabular-nums">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-0.5">
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="text-orange-400 text-xl font-bold">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;