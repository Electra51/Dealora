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
    <div className="relative bg-linear-to-tr from-orange-100 to-orange-200 overflow-hidden border-y border-orange-100">
      {/* Close */}
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Limited Time Offer
          </span>

          <h2 className="leading-tight">
            <span className="block text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900">
              Mega Winter Sale
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-orange-500 mt-1">
              Up to 50% Off
            </span>
          </h2>

          <p className="text-gray-500 text-base sm:text-lg max-w-md">
            Premium shoes, bags, and accessories at unbeatable prices. Don't
            miss out on the season's biggest deals.
          </p>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 mt-1 px-7 py-3 bg-orange-500 text-white text-sm font-bold rounded-full shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300"
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

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 text-xs text-gray-500 font-medium">
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
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
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