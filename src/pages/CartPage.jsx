import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCartStore } from '../stores/cart.store';
import { formatPrice } from '../utils/helpers';

const CartPage = () => {
  const navigate = useNavigate();
  const items = useCartStore(s => s.items);
  const removeItem = useCartStore(s => s.removeItem);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const clearCart = useCartStore(s => s.clearCart);
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              <FiShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4"
                >
                  {/* Image */}
                  <Link to={`/product/${item.slug || item.id}`} className="shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-orange-500 uppercase tracking-wider font-semibold mb-1">
                          {item.brand}
                        </p>
                        <Link 
                          to={`/product/${item.slug || item.id}`}
                          className="font-semibold text-gray-900 hover:text-orange-500 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            {formatPrice(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-orange-500">
                    Add {formatPrice(100 - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between pt-4 pb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-orange-500 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors hover:shadow-lg hover:shadow-orange-500/30"
              >
                Proceed to Checkout
                <FiArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/shop"
                className="block text-center mt-4 text-sm text-gray-500 hover:text-orange-500 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;