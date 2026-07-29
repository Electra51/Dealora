import React from 'react';

const Cart = ({ cart, onIncrease, onDecrease, onRemove, onClearCart }) => {
  // Calculate totals
  let total = 0;
  let shipping = 0;
  
  for (const product of cart) {
    total += product.price * product.quantity;
    shipping += product.shipping;
  }
  
  const tax = parseFloat((total * 0.05).toFixed(2));
  const grandTotal = total + shipping + tax;

  return (
    <div className="sticky top-0 pl-3.75 rounded-xl p-5 max-w-112.5 mx-auto my-5 max-md:max-w-full max-md:m-2.5">
      <div className="flex justify-between items-center mb-5 pb-3.75 border-b-2 border-[#f0f0f0]">
        <h3 className="m-0 text-[24px] text-[#333]">🛒 Order Summary</h3>
        {cart.length > 0 && (
          <button 
          aria-label="cart clear"
          className="bg-[#ff4444] text-white border-none py-2 px-4 rounded-md cursor-pointer text-[14px] font-medium transition-colors duration-300 hover:bg-[#cc0000]" onClick={onClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-15 px-5">
          <div className="text-[80px] mb-5 opacity-30">🛍️</div>
          <h4 className="text-[#666] text-[22px] mb-2.5 m-0">Your cart is empty</h4>
          <p className="text-[#999] text-[16px] m-0 mb-5">Add some products to get started!</p>

             {/* Summary */}
          <div className="bg-[#f8f9fa] p-5 rounded-[10px] mb-3.75">
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Selected Items:</span>
              <span className="font-semibold text-[#333]">{cart.length} products</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Total Items:</span>
              <span className="font-semibold text-[#333]">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#333]">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Shipping:</span>
              <span className="font-semibold text-[#333]">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Tax (5%):</span>
              <span className="font-semibold text-[#333]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#666] text-[15px] border-t-2 border-[#ddd] pt-3.75 mt-3.75 font-bold">
              <span>Grand Total:</span>
              <span className="text-[#4f46e5] font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-5">
            {cart.map((product) => (
              <div key={product.id} className="flex items-center gap-3 bg-[#f8f9fa] p-3.75 rounded-[10px] mb-3 transition-colors duration-300 hover:bg-[#f0f2f5] max-md:flex-wrap">
                <img 
                  src={product.img} 
                  alt={product.name}
                  loading="lazy"
                  className="w-15 h-15 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="m-0 mb-1.25 text-[16px] text-[#333]">{product.name}</h4>
                  <p className="m-0 text-[#666] text-[14px]">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2.5 bg-white p-1.25 rounded-lg">
                  <button 
                  aria-label="decrease-number"
                    className="w-8 h-8 border-none bg-[#4f46e5] text-white rounded-md cursor-pointer text-[18px] font-bold transition-colors duration-300 flex items-center justify-center hover:bg-[#4338ca] disabled:bg-[#d1d5db] disabled:cursor-not-allowed"
                    onClick={() => onDecrease(product.id)}
                    disabled={product.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="min-w-7.5 text-center font-bold text-[16px]">{product.quantity}</span>
                  <button 
                  aria-label="increase number"
                    className="w-8 h-8 border-none bg-[#4f46e5] text-white rounded-md cursor-pointer text-[18px] font-bold transition-colors duration-300 flex items-center justify-center hover:bg-[#4338ca]"
                    onClick={() => onIncrease(product.id)}
                  >
                    +
                  </button>
                </div>

                <div className="font-bold text-[#4f46e5] text-[16px] min-w-17.5 text-right max-md:w-full max-md:text-left max-md:mt-2.5">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>

                <button 
                aria-label="close"
                  className="w-8 h-8 border-none bg-[#fee] text-[#f44] rounded-md cursor-pointer text-[18px] transition-all duration-300 hover:bg-[#fcc] hover:text-[#c00]"
                  onClick={() => onRemove(product.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-[#f8f9fa] p-5 rounded-[10px] mb-3.75">
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Selected Items:</span>
              <span className="font-semibold text-[#333]">{cart.length} products</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Total Items:</span>
              <span className="font-semibold text-[#333]">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#333]">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Shipping:</span>
              <span className="font-semibold text-[#333]">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-[#666] text-[15px]">
              <span>Tax (5%):</span>
              <span className="font-semibold text-[#333]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#666] border-t-2 border-[#ddd] pt-3.75 mt-3.75 text-[18px] font-bold">
              <span>Grand Total:</span>
              <span className="text-[#4f46e5] font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button aria-label="procced checkout" className="w-full p-4 bg-linear-to-br from-[#4f46e5] to-[#7c3aed] text-white border-none rounded-[10px] text-[16px] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(79,70,229,0.4)] active:translate-y-0">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
