import React, { useMemo } from "react";
import { useCountdown } from "../../../hooks/useCountdown";

const DealsHero = () => {
  // Set target to 24 hours from now for demo
  const targetDate = useMemo(
    () => new Date().getTime() + 24 * 60 * 60 * 1000,
    [],
  );
  const { hours, minutes, seconds } = useCountdown(targetDate);

  const TimeBox = ({ val, label }) => (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-24 border border-white/20">
      <span className="text-xl md:text-3xl font-black text-white">
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-xs text-white/70 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative bg-linear-to-br from-[#1a1a24] via-[#2d1b3d] to-[#1a1a24]  text-white md:pt-30 md:pb-15 overflow-hidden py-5 md:py-13 mt-20 md:mt-0 rounded-4xl md:rounded-none mx-4 md:mx-0">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-start grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 justify-between">
        <div>
          <h1
            className="hidden md:block text-4xl md:text-5xl font-extrabold mb-6 leading-tight animate-fade-up"
          >
            Up to{" "}
            <span className="bg-linear-to-tr from-[#FF7203] to-[#FF9A03] bg-clip-text text-transparent">
              70% OFF
            </span>
          </h1>

          <h1 className="animate-fade-up md:hidden text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Up to
            <br />
            <span className="bg-linear-to-tr from-[#FF7203] to-[#FF9A03] bg-clip-text text-transparent">
              70% OFF
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 hidden md:block">
            Don't miss out on our biggest sale of the year. Premium sneakers and
            gear at unbeatable prices.
          </p>
          <button
            aria-label="flash deals"
            className="w-fit py-3 px-6 rounded-full text-[16px] font-semibold no-underline transition-all duration-300 cursor-pointer bg-linear-to-br from-[#FF7203] to-[#FF9A03] text-white text-xs md:text-sm"
          >
            Shop Flash Deals
          </button>
        </div>

        <div>
          <div className="flex justify-start md:justify-end gap-4 md:mb-10">
            <TimeBox val={hours} label="Hours" />
            <TimeBox val={minutes} label="Mins" />
            <TimeBox val={seconds} label="Secs" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsHero;
