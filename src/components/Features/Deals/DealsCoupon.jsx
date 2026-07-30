import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckIcon, CopyIcon } from 'lucide-react';

const coupons = [
  {
    id: 1,
    code: 'DEALORA10',
    discount: '10% OFF',
    description: 'On your first order',
    minOrder: '$50',
    expiry: 'Dec 31, 2026',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 2,
    code: 'FLASH20',
    discount: '$20 OFF',
    description: 'On orders above $100',
    minOrder: '$100',
    expiry: 'Jul 31, 2026',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    code: 'SUMMER30',
    discount: '30% OFF',
    description: 'Summer collection special',
    minOrder: '$75',
    expiry: 'Aug 15, 2026',
    color: 'from-pink-500 to-rose-600',
  },
];

const CouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast.success(`Coupon "${coupon.code}" copied!`, {
        icon: '🎉',
        style: { background: '#1f2937', color: '#fff' },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy coupon', {
        style: { background: '#1f2937', color: '#fff' },
      });
    }
  };

  return (
    <div
      
      className="hover:-translate-y-1 relative bg-white rounded-2xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      {/* Top Gradient Section */}
      <div className={`bg-linear-to-r ${coupon.color} md:p-6 p-4 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full -translate-y-12 md:-translate-y-16 translate-x-12 md:translate-x-16" />
        <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full translate-y-8 md:translate-y-12 -translate-x-8 md:-translate-x-12" />
        
        <div className="relative">
          <div className="text-2xl md:text-3xl font-black mb-1">{coupon.discount}</div>
          <p className="text-white/90 text-xs md:text-sm">{coupon.description}</p>
        </div>
      </div>

      {/* Coupon Code Section */}
      <div className="md:p-6 p-4">
        {/* Code Box */}
        <div className="bg-gray-50 md:bg-transparent rounded-xl md:rounded-none border-2 md:border-0 border-dashed border-gray-300 md:p-0 p-3 mb-4 md:mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Coupon Code</p>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base md:text-lg text-gray-900 tracking-wider">
                  {coupon.code}
                </span>
              </div>
            </div>
            <button
              aria-label="copy"
              onClick={handleCopy}
              className={`p-2.5 md:p-1.5 rounded-xl md:rounded-lg transition-all ${
                copied 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-white md:bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 shadow-sm'
              }`}
              aria-label="Copy coupon code"
            >
            

              {copied ? (
  <CheckIcon className="scale-100 transition-transform duration-200" />
) : (
  <CopyIcon />
)}
            </button>
          </div>
        </div>

        {/* Details - Mobile App Style */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-500">Min. Order</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">{coupon.minOrder}</span>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-gray-500">Valid Till</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">{coupon.expiry}</span>
          </div>
        </div>

        {/* Apply Button - Mobile App Style */}
        <button 
          aria-label="apply coupon"
          className="w-full py-3.5 md:py-2.5 bg-gray-900 text-white text-sm md:text-sm font-bold rounded-xl md:rounded-xl hover:bg-orange-500 active:scale-95 transition-all shadow-lg md:shadow-sm"
        >
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

const DealsCoupon = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 md:mb-4">
            Save More with <span className="text-orange-600">Coupon Codes</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mr-auto">
            Use these exclusive coupon codes at checkout to unlock additional savings on your favorite products.
          </p>
        </div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>

        {/* Terms */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            * Terms and conditions apply. Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DealsCoupon;