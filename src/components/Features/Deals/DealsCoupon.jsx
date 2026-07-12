import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Top Gradient Section */}
      <div className={`bg-gradient-to-r ${coupon.color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
        
        <div className="relative">
          <div className="text-3xl font-black mb-1">{coupon.discount}</div>
          <p className="text-white/90 text-sm">{coupon.description}</p>
        </div>
      </div>

      {/* Coupon Code Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Coupon Code</p>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg text-gray-900 tracking-wider">
                {coupon.code}
              </span>
              <button
                onClick={handleCopy}
                className={`p-1.5 rounded-lg transition-all ${
                  copied 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                }`}
                aria-label="Copy coupon code"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full" />
          <div className="border-t border-dashed border-gray-200" />
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-500 text-xs">Min. Order</p>
            <p className="font-semibold text-gray-900">{coupon.minOrder}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Valid Till</p>
            <p className="font-semibold text-gray-900">{coupon.expiry}</p>
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full mt-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors">
          Apply Coupon
        </button>
      </div>
    </motion.div>
  );
};

const DealsCoupon = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Save More with <span className="text-orange-500">Coupon Codes</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mr-auto">
            Use these exclusive coupon codes at checkout to unlock additional savings on your favorite products.
          </p>
        </div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>

        {/* Terms */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            * Terms and conditions apply. Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DealsCoupon;