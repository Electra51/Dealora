import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  const { product, handleAddToCart } = props;

  const { name, img, seller, price, ratings, shipping } = props.product;
  return (
    <div className="w-full max-w-[300px] mx-auto h-[530px] border-2 border-[#d2d3d3] rounded-[8px] relative flex flex-col bg-white">
      <img src={img} alt={name} className="w-[calc(100%-14px)] h-[286px] object-cover rounded-[8px] m-[7px]" />
      <div className="mt-[5px] ml-[10px] flex-1">
        <h4 className="font-sans font-normal text-[21px] leading-[25px] mt-0 mb-[1px] truncate pr-2" title={name}>{name}</h4>
        <p className="font-sans font-normal text-[16px] leading-[25px] mt-0 mb-[1px]">
          <small>Price: ${price}</small>
        </p>
        <p className="font-sans font-normal text-[16px] leading-[25px] mt-0 mb-[1px]">
          <small>Seller: {seller}</small>
        </p>
        <p className="font-sans font-normal text-[16px] leading-[25px] mt-0 mb-[1px]">
          <small>Shipping: ${shipping}</small>
        </p>
        <p className="font-sans font-normal text-[16px] leading-[25px] mt-0 mb-[1px]">
          <small>Ratings: {ratings} stars</small>
        </p>
      </div>
      <button 
        onClick={() => handleAddToCart(product)} 
        className="w-full bg-[rgb(211,173,104)] rounded-b-[6px] absolute bottom-0 border-none flex items-center justify-center py-[10px] transition-colors duration-300 hover:bg-orange-500 hover:text-white cursor-pointer"
      >
        <p className="mr-[8px] m-0 font-medium">Add to Cart</p>
        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Product;
