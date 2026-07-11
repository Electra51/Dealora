import React, { useEffect, useState } from "react";
import Cart from "../../Cart/Cart";
import Product from "../Product/Product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    
    if (exists) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleIncrease = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="grid grid-cols-[4fr_1fr] max-lg:grid-cols-1">
      <div className="max-w-[1440px] mx-auto grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[20px] p-[20px]">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}/>
        ))}
      </div>
      <div className="bg-[rgba(240,193,76,0.664)] min-h-screen">
        <Cart 
        cart={cart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
        onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
};

export default Shop;
