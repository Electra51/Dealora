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
    <div className="sticky top-0 pl-3.75 rounded-xl p-5 max-w-[450px] mx-auto my-[20px] max-md:max-w-full max-md:m-[10px]">
      <div className="flex justify-between items-center mb-[20px] pb-[15px] border-b-2 border-[#f0f0f0]">
        <h3 className="m-0 text-[24px] text-[#333]">🛒 Order Summary</h3>
        {cart.length > 0 && (
          <button 
          aria-label="cart clear"
          className="bg-[#ff4444] text-white border-none py-[8px] px-[16px] rounded-[6px] cursor-pointer text-[14px] font-medium transition-colors duration-300 hover:bg-[#cc0000]" onClick={onClearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-[60px] px-[20px]">
          <div className="text-[80px] mb-[20px] opacity-30">🛍️</div>
          <h4 className="text-[#666] text-[22px] mb-[10px] m-0">Your cart is empty</h4>
          <p className="text-[#999] text-[16px] m-0 mb-[20px]">Add some products to get started!</p>

             {/* Summary */}
          <div className="bg-[#f8f9fa] p-[20px] rounded-[10px] mb-[15px]">
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Selected Items:</span>
              <span className="font-semibold text-[#333]">{cart.length} products</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Total Items:</span>
              <span className="font-semibold text-[#333]">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#333]">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Shipping:</span>
              <span className="font-semibold text-[#333]">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Tax (5%):</span>
              <span className="font-semibold text-[#333]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#666] text-[15px] border-t-2 border-[#ddd] pt-[15px] mt-[15px] text-[18px] font-bold">
              <span>Grand Total:</span>
              <span className="text-[#4f46e5] font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-[20px]">
            {cart.map((product) => (
              <div key={product.id} className="flex items-center gap-[12px] bg-[#f8f9fa] p-[15px] rounded-[10px] mb-[12px] transition-colors duration-300 hover:bg-[#f0f2f5] max-md:flex-wrap">
                <img 
                  src={product.img} 
                  alt={product.name}
                  loading="lazy"
                  className="w-[60px] h-[60px] object-cover rounded-[8px]"
                />
                
                <div className="flex-1">
                  <h4 className="m-0 mb-[5px] text-[16px] text-[#333]">{product.name}</h4>
                  <p className="m-0 text-[#666] text-[14px]">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-[10px] bg-white p-[5px] rounded-[8px]">
                  <button 
                  aria-label="decrease-number"
                    className="w-[32px] h-[32px] border-none bg-[#4f46e5] text-white rounded-[6px] cursor-pointer text-[18px] font-bold transition-colors duration-300 flex items-center justify-center hover:bg-[#4338ca] disabled:bg-[#d1d5db] disabled:cursor-not-allowed"
                    onClick={() => onDecrease(product.id)}
                    disabled={product.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="min-w-[30px] text-center font-bold text-[16px]">{product.quantity}</span>
                  <button 
                  aria-label="increase number"
                    className="w-[32px] h-[32px] border-none bg-[#4f46e5] text-white rounded-[6px] cursor-pointer text-[18px] font-bold transition-colors duration-300 flex items-center justify-center hover:bg-[#4338ca]"
                    onClick={() => onIncrease(product.id)}
                  >
                    +
                  </button>
                </div>

                <div className="font-bold text-[#4f46e5] text-[16px] min-w-[70px] text-right max-md:w-full max-md:text-left max-md:mt-[10px]">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>

                <button 
                aria-label="close"
                  className="w-[32px] h-[32px] border-none bg-[#fee] text-[#f44] rounded-[6px] cursor-pointer text-[18px] transition-all duration-300 hover:bg-[#fcc] hover:text-[#c00]"
                  onClick={() => onRemove(product.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-[#f8f9fa] p-[20px] rounded-[10px] mb-[15px]">
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Selected Items:</span>
              <span className="font-semibold text-[#333]">{cart.length} products</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Total Items:</span>
              <span className="font-semibold text-[#333]">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#333]">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Shipping:</span>
              <span className="font-semibold text-[#333]">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-[12px] text-[#666] text-[15px]">
              <span>Tax (5%):</span>
              <span className="font-semibold text-[#333]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#666] text-[15px] border-t-2 border-[#ddd] pt-[15px] mt-[15px] text-[18px] font-bold">
              <span>Grand Total:</span>
              <span className="text-[#4f46e5] font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button aria-label="procced checkout" className="w-full p-[16px] bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white border-none rounded-[10px] text-[16px] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(79,70,229,0.4)] active:translate-y-0">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
