// import React, { useEffect, useState } from "react";
// import "./BestSellers.css";

// const BestSellers = ({ handleAddToCart }) => {
//   const [bestSellers, setBestSellers] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     fetch("products.json")
//       .then((res) => res.json())
//       .then((data) => {
//         // Sort by ratings and get top 8
//         const sorted = data
//           .sort(
//             (a, b) => b.ratings - a.ratings || b.ratingsCount - a.ratingsCount
//           )
//           .slice(0, 8);
//         setBestSellers(sorted);
//       });
//   }, []);

//   const openQuickView = (product) => {
//     setSelectedProduct(product);
//     document.body.style.overflow = "hidden";
//   };

//   const closeQuickView = () => {
//     setSelectedProduct(null);
//     document.body.style.overflow = "auto";
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="stars">
//         {[...Array(5)].map((_, index) => (
//           <span key={index} className={index < rating ? "star filled" : "star"}>
//             ★
//           </span>
//         ))}
//       </div>
//     );
//   };

//   const getBadge = (product) => {
//     if (product.ratingsCount > 3000) {
//       return { text: "Most Reviewed", className: "badge-reviewed" };
//     }
//     if (product.ratings === 5) {
//       return { text: "Top Rated", className: "badge-top" };
//     }
//     if (product.shipping < 15) {
//       return { text: "Hot Deal", className: "badge-hot" };
//     }
//     return { text: "Trending", className: "badge-trending" };
//   };

//   return (
//     <section className="best-sellers">
//       <div className="flex justify-between items-center ">
//           <div className="text-start mb-16 relative z-10">
//             <h2 className="mt-4 text-4xl font-black text-gray-900 leading-tight">
//              <span className="bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
//                 Trending
//               </span> Products
             
//             </h2>
//             <p className="mt-2 max-w-xl mr-auto text-lg text-gray-600 leading-relaxed">
//               Discover our most loved products chosen by thousands of satisfied customers
//             </p>
//           </div>

//           {/* View All Button */}
//           <div className="text-center relative z-10">
//             <a
//               href="/brands"
//               className="inline-flex items-center gap-3 px-10 py-4 text-orange-600"
//             >
//               View All products
//               <svg
//                 className="w-5 h-5 transition-transform duration-300 hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </a>
//           </div>
//         </div>

//       <div className="best-sellers-grid">
//         {bestSellers.map((product) => {
//           const badge = getBadge(product);
//           return (
//             <div key={product.id} className="bestseller-card">
//               <div className="card-badge-container">
//                 <span className={`card-badge ${badge.className}`}>
//                   {badge.text}
//                 </span>
//               </div>

//               <div className="card-image-wrapper">
//                 <img
//                   src={product.img}
//                   alt={product.name}
//                   className="card-image"
//                 />
//                 <div className="card-overlay">
//                   <button
//                     className="quick-view-btn"
//                     onClick={() => openQuickView(product)}>
//                     <svg
//                       className="eye-icon"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                     Quick View
//                   </button>
//                 </div>
//               </div>

//               <div className="card-content">
//                 <p className="card-category">{product.category}</p>
//                 <h3 className="card-title">{product.name}</h3>
//                 <p className="card-seller">by {product.seller}</p>

//                 <div className="card-rating">
//                   {renderStars(product.ratings)}
//                   <span className="rating-count">
//                     ({product.ratingsCount.toLocaleString()})
//                   </span>
//                 </div>

//                 <div className="card-footer">
//                   <div className="card-price">
//                     <span className="price">${product.price}</span>
//                     {product.shipping > 0 && (
//                       <span className="shipping">
//                         +${product.shipping} shipping
//                       </span>
//                     )}
//                     {product.shipping === 1 && (
//                       <span className="free-shipping">Free Shipping</span>
//                     )}
//                   </div>
//                   <button
//                     className="add-to-cart-btn"
//                     onClick={() => handleAddToCart(product)}>
//                     <svg
//                       className="cart-icon"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick View Modal */}
//       {selectedProduct && (
//         <div className="quick-view-modal" onClick={closeQuickView}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={closeQuickView}>
//               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <div className="modal-grid">
//               <div className="modal-image">
//                 <img src={selectedProduct.img} alt={selectedProduct.name} />
//               </div>

//               <div className="modal-details">
//                 <span className="modal-category">
//                   {selectedProduct.category}
//                 </span>
//                 <h2 className="modal-title">{selectedProduct.name}</h2>
//                 <p className="modal-seller">by {selectedProduct.seller}</p>

//                 <div className="modal-rating">
//                   {renderStars(selectedProduct.ratings)}
//                   <span className="modal-rating-count">
//                     {selectedProduct.ratings} out of 5 (
//                     {selectedProduct.ratingsCount.toLocaleString()} reviews)
//                   </span>
//                 </div>

//                 <div className="modal-price-section">
//                   <span className="modal-price">${selectedProduct.price}</span>
//                   {selectedProduct.shipping === 1 ? (
//                     <span className="modal-free-shipping">Free Shipping</span>
//                   ) : (
//                     <span className="modal-shipping">
//                       +${selectedProduct.shipping} shipping
//                     </span>
//                   )}
//                 </div>

//                 <div className="modal-stock">
//                   {selectedProduct.stock > 10 ? (
//                     <span className="in-stock">
//                       ✓ In Stock ({selectedProduct.stock} available)
//                     </span>
//                   ) : selectedProduct.stock > 0 ? (
//                     <span className="low-stock">
//                       ⚠ Only {selectedProduct.stock} left!
//                     </span>
//                   ) : (
//                     <span className="out-of-stock">✗ Out of Stock</span>
//                   )}
//                 </div>

//                 <button
//                   className="modal-add-btn"
//                   onClick={() => {
//                     handleAddToCart(selectedProduct);
//                     closeQuickView();
//                   }}
//                   disabled={selectedProduct.stock === 0}>
//                   <svg
//                     className="modal-cart-icon"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   Add to Cart
//                 </button>

//                 <div className="modal-features">
//                   <div className="feature-item">
//                     <svg
//                       className="feature-icon"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     <span>100% Authentic</span>
//                   </div>
//                   <div className="feature-item">
//                     <svg
//                       className="feature-icon"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//                       />
//                     </svg>
//                     <span>Secure Payment</span>
//                   </div>
//                   <div className="feature-item">
//                     <svg
//                       className="feature-icon"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                       />
//                     </svg>
//                     <span>Easy Returns</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default BestSellers;



import React, { useEffect, useState } from "react";

const Trending = ({ handleAddToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort(
            (a, b) => b.ratings - a.ratings || b.ratingsCount - a.ratingsCount
          )
          .slice(0, 8);
        setBestSellers(sorted);
      });
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-base ${
              index < rating ? "text-orange-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const getBadge = (product) => {
    if (product.ratingsCount > 3000) {
      return {
        text: "Most Reviewed",
        className: "bg-[linear-gradient(135deg,#4facfe,#00f2fe)] text-white",
      };
    }
    if (product.ratings === 5) {
      return {
        text: "Top Rated",
        className: "bg-[linear-gradient(135deg,#ffd700,#ffa500)] text-white",
      };
    }
    if (product.shipping < 15) {
      return {
        text: "Hot Deal",
        className: "bg-[linear-gradient(135deg,#ff6b6b,#ee5a6f)] text-white",
      };
    }
    return {
      text: "Trending",
      className: "bg-[linear-gradient(135deg,#a8edea,#fed6e3)] text-gray-800",
    };
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8    py-24 w-full lg:py-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="text-start relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            <span className="bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Trending
            </span>{" "}
            Products
          </h2>
          <p className="mt-2 max-w-xl text-lg text-gray-600 leading-relaxed">
            Discover our most loved products chosen by thousands of satisfied
            customers
          </p>
        </div>

        {/* View All Button */}
        <div className="relative z-10">
          <a
            href="/brands"
            className="inline-flex items-center gap-3 px-6 py-3 text-orange-600 font-semibold hover:gap-4 transition-all duration-300"
          >
            View All products
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
        {bestSellers.map((product) => {
          const badge = getBadge(product);
          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 shadow-md hover:-translate-y-2 hover:shadow-xl relative"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-lg ${badge.className}`}
                >
                  {badge.text}
                </span>
              </div>

              {/* Image */}
              <div className="relative w-full h-70 overflow-hidden bg-gray-100">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => openQuickView(product)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-bold translate-y-5 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      className="w-4.5 h-4.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Quick View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">by {product.seller}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(product.ratings)}
                  <span className="text-xs text-gray-500">
                    ({product.ratingsCount.toLocaleString()})
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-black text-gray-900">
                      ${product.price}
                    </span>
                    {product.shipping > 1 && (
                      <span className="text-[11px] text-gray-500">
                        +${product.shipping} shipping
                      </span>
                    )}
                    {product.shipping === 1 && (
                      <span className="text-[11px] text-green-600 font-semibold">
                        Free Shipping
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-11 h-11 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-9999 p-5 animate-fadeIn"
          onClick={closeQuickView}
        >
          <div
            className="bg-white rounded-3xl max-w-225 w-full max-h-[90vh] overflow-y-auto relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 hover:rotate-90 transition-all duration-300 z-10"
              onClick={closeQuickView}
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4">
                <span className="text-sm text-gray-500 uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-base text-gray-600">
                  by {selectedProduct.seller}
                </p>

                {/* Rating */}
                <div className="flex flex-col gap-2">
                  {renderStars(selectedProduct.ratings)}
                  <span className="text-sm text-gray-600">
                    {selectedProduct.ratings} out of 5 (
                    {selectedProduct.ratingsCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 py-5 border-y border-gray-100">
                  <span className="text-4xl font-black text-gray-900">
                    ${selectedProduct.price}
                  </span>
                  {selectedProduct.shipping === 1 ? (
                    <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                      Free Shipping
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      +${selectedProduct.shipping} shipping
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="my-2">
                  {selectedProduct.stock > 10 ? (
                    <span className="text-green-600 font-semibold text-sm">
                      ✓ In Stock ({selectedProduct.stock} available)
                    </span>
                  ) : selectedProduct.stock > 0 ? (
                    <span className="text-orange-500 font-semibold text-sm">
                      ⚠ Only {selectedProduct.stock} left!
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold text-sm">
                      ✗ Out of Stock
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    closeQuickView();
                  }}
                  disabled={selectedProduct.stock === 0}
                  className="w-full py-4 bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-full text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
                >
                  <svg
                    className="w-5.5 h-5.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>

                {/* Features */}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                  {[
                    {
                      icon: "M5 13l4 4L19 7",
                      text: "100% Authentic",
                    },
                    {
                      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                      text: "Secure Payment",
                    },
                    {
                      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                      text: "Easy Returns",
                    },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <svg
                        className="w-4.5 h-4.5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={feature.icon}
                        />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations (Tailwind v4 compatible) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Trending;