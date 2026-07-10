// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import "./CustomerReviews.css";

// const CustomerReviews = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);

//   const reviews = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       location: "New York, USA",
//       avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//       rating: 5,
//       date: "2 weeks ago",
//       verified: true,
//       product: "ULTRABOOST 22 SHOES",
//       review:
//         "Absolutely love these shoes! The comfort level is outstanding and they look amazing. I've been wearing them daily for running and casual outings. The quality is top-notch and delivery was super fast. Highly recommend!",
//       helpful: 45,
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       location: "Los Angeles, USA",
//       avatar: "https://randomuser.me/api/portraits/men/2.jpg",
//       rating: 5,
//       date: "1 month ago",
//       verified: true,
//       product: "Adventure Backpack",
//       review:
//         "Best backpack I've ever owned! The storage capacity is impressive and all the compartments are well-designed. Perfect for my daily commute and weekend trips. The material feels durable and the padding is excellent.",
//       helpful: 38,
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       location: "Chicago, USA",
//       avatar: "https://randomuser.me/api/portraits/women/3.jpg",
//       rating: 5,
//       date: "3 weeks ago",
//       verified: true,
//       product: "Classic Baseball Cap",
//       review:
//         "Great quality cap! Fits perfectly and the material is breathable. I love the design and it goes well with everything. The customer service was also excellent when I had a question about sizing.",
//       helpful: 29,
//     },
//     {
//       id: 4,
//       name: "David Thompson",
//       location: "Miami, USA",
//       avatar: "https://randomuser.me/api/portraits/men/4.jpg",
//       rating: 4,
//       date: "1 week ago",
//       verified: true,
//       product: "Response 3MC ADV Boots",
//       review:
//         "Really solid boots! They're comfortable right out of the box and the build quality is excellent. The only minor issue is they run slightly large, so I'd recommend sizing down. Overall, very happy with my purchase.",
//       helpful: 22,
//     },
//     {
//       id: 5,
//       name: "Jessica Martinez",
//       location: "Seattle, USA",
//       avatar: "https://randomuser.me/api/portraits/women/5.jpg",
//       rating: 5,
//       date: "2 days ago",
//       verified: true,
//       product: "SUPERNOVA SHOES",
//       review:
//         "These shoes exceeded my expectations! Super comfortable for long walks and the cushioning is perfect. They're also stylish enough to wear with different outfits. Fast shipping and great packaging too!",
//       helpful: 18,
//     },
//     {
//       id: 6,
//       name: "Robert Taylor",
//       location: "Boston, USA",
//       avatar: "https://randomuser.me/api/portraits/men/6.jpg",
//       rating: 5,
//       date: "1 month ago",
//       verified: true,
//       product: "Premium Leather Backpack",
//       review:
//         "Worth every penny! The leather quality is exceptional and the craftsmanship is evident. It's spacious yet not bulky, and the laptop compartment is well-padded. This will definitely last for years.",
//       helpful: 56,
//     },
//   ];

//   const reviewsPerView = 3;
//   const totalSlides = Math.ceil(reviews.length / reviewsPerView);

//   useEffect(() => {
//     if (!isAutoPlay) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentIndex, isAutoPlay]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//     setIsAutoPlay(false);
//   };

//   const renderStars = (rating) => {
//     return (
//       <div className="review-stars">
//         {[...Array(5)].map((_, index) => (
//           <span key={index} className={index < rating ? "star filled" : "star"}>
//             ★
//           </span>
//         ))}
//       </div>
//     );
//   };

//   const getVisibleReviews = () => {
//     const start = currentIndex * reviewsPerView;
//     return reviews.slice(start, start + reviewsPerView);
//   };

//   return (
//     <section className="customer-reviews">
//       <div className="reviews-background">
//         <div className="bg-pattern"></div>
//       </div>

//       <div className="reviews-header">
//         <span className="section-badge">Testimonials</span>
//         <h2 className="section-title">What Our Customers Say</h2>
//         <p className="section-description">
//           Don't just take our word for it - hear from our satisfied customers
//         </p>
//         <div className="overall-rating">
//           <div className="rating-score">4.8</div>
//           <div className="rating-details">
//             <div className="rating-stars-large">{renderStars(5)}</div>
//             <p className="rating-text">Based on 12,450+ reviews</p>
//           </div>
//         </div>
//       </div>

//       <div className="reviews-carousel">
//         <button
//           className="carousel-btn prev-btn"
//           onClick={prevSlide}
//           aria-label="Previous reviews">
//           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         <div className="reviews-slider">
//           <div
//             className="reviews-track"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//             {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//               <div key={slideIndex} className="reviews-slide">
//                 {reviews
//                   .slice(
//                     slideIndex * reviewsPerView,
//                     (slideIndex + 1) * reviewsPerView
//                   )
//                   .map((review) => (
//                     <div key={review.id} className="review-card">
//                       <div className="review-header">
//                         <div className="reviewer-info">
//                           <img
//                             src={review.avatar}
//                             alt={review.name}
//                             className="reviewer-avatar"
//                           />
//                           <div className="reviewer-details">
//                             <h4 className="reviewer-name">{review.name}</h4>
//                             <p className="reviewer-location">
//                               {review.location}
//                             </p>
//                           </div>
//                         </div>
//                         {review.verified && (
//                           <span className="verified-badge">
//                             <svg
//                               className="verified-icon"
//                               fill="currentColor"
//                               viewBox="0 0 20 20">
//                               <path
//                                 fillRule="evenodd"
//                                 d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                             Verified Purchase
//                           </span>
//                         )}
//                       </div>

//                       <div className="review-rating">
//                         {renderStars(review.rating)}
//                         <span className="review-date">{review.date}</span>
//                       </div>

//                       <p className="review-product">
//                         Purchased: {review.product}
//                       </p>
//                       <p className="review-text">{review.review}</p>

//                       <div className="review-footer">
//                         <button className="helpful-btn">
//                           <svg
//                             className="helpful-icon"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24">
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
//                             />
//                           </svg>
//                           Helpful ({review.helpful})
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           className="carousel-btn next-btn"
//           onClick={nextSlide}
//           aria-label="Next reviews">
//           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>

//       <div className="carousel-dots">
//         {Array.from({ length: totalSlides }).map((_, index) => (
//           <button
//             key={index}
//             className={`dot ${index === currentIndex ? "active" : ""}`}
//             onClick={() => goToSlide(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="reviews-cta">
//         <p className="cta-text">Have you purchased from us?</p>
//         <button className="write-review-btn">
//           <svg
//             className="write-icon"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//             />
//           </svg>
//           Write a Review
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;



/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";

// Memoized Review Card Component for better performance
const ReviewCard = memo(({ review, renderStars }) => (
  <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
    {/* Hover gradient effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/20 group-hover:ring-orange-500/50 transition-all duration-300"
            loading="lazy"
          />
          <div>
            <h4 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              {review.name}
            </h4>
            <p className="text-sm text-gray-500">{review.location}</p>
          </div>
        </div>
        {review.verified && (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </span>
        )}
      </div>

      {/* Rating & Date */}
      <div className="flex items-center justify-between mb-3">
        {renderStars(review.rating)}
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>

      {/* Product */}
      <p className="text-sm text-gray-600 mb-3 font-medium">
        Purchased: <span className="text-orange-600">{review.product}</span>
      </p>

      {/* Review Text */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-4">
        {review.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 rounded-full text-sm font-medium transition-all duration-300 group/btn">
          <svg
            className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          Helpful ({review.helpful})
        </button>
      </div>
    </div>
  </div>
));

ReviewCard.displayName = "ReviewCard";

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const reviews = useMemo(
    () => [
      {
        id: 1,
        name: "Sarah Johnson",
        location: "New York, USA",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        product: "ULTRABOOST 22 SHOES",
        review:
          "Absolutely love these shoes! The comfort level is outstanding and they look amazing. I've been wearing them daily for running and casual outings. The quality is top-notch and delivery was super fast. Highly recommend!",
        helpful: 45,
      },
      {
        id: 2,
        name: "Michael Chen",
        location: "Los Angeles, USA",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        date: "1 month ago",
        verified: true,
        product: "Adventure Backpack",
        review:
          "Best backpack I've ever owned! The storage capacity is impressive and all the compartments are well-designed. Perfect for my daily commute and weekend trips. The material feels durable and the padding is excellent.",
        helpful: 38,
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        location: "Chicago, USA",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 5,
        date: "3 weeks ago",
        verified: true,
        product: "Classic Baseball Cap",
        review:
          "Great quality cap! Fits perfectly and the material is breathable. I love the design and it goes well with everything. The customer service was also excellent when I had a question about sizing.",
        helpful: 29,
      },
      {
        id: 4,
        name: "David Thompson",
        location: "Miami, USA",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 4,
        date: "1 week ago",
        verified: true,
        product: "Response 3MC ADV Boots",
        review:
          "Really solid boots! They're comfortable right out of the box and the build quality is excellent. The only minor issue is they run slightly large, so I'd recommend sizing down. Overall, very happy with my purchase.",
        helpful: 22,
      },
      {
        id: 5,
        name: "Jessica Martinez",
        location: "Seattle, USA",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        rating: 5,
        date: "2 days ago",
        verified: true,
        product: "SUPERNOVA SHOES",
        review:
          "These shoes exceeded my expectations! Super comfortable for long walks and the cushioning is perfect. They're also stylish enough to wear with different outfits. Fast shipping and great packaging too!",
        helpful: 18,
      },
      {
        id: 6,
        name: "Robert Taylor",
        location: "Boston, USA",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        rating: 5,
        date: "1 month ago",
        verified: true,
        product: "Premium Leather Backpack",
        review:
          "Worth every penny! The leather quality is exceptional and the craftsmanship is evident. It's spacious yet not bulky, and the laptop compartment is well-padded. This will definitely last for years.",
        helpful: 56,
      },
    ],
    []
  );

  const reviewsPerView = 3;
  const totalSlides = Math.ceil(reviews.length / reviewsPerView);

  // Memoized callbacks
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay]);

  // Memoized star renderer
  const renderStars = useCallback((rating) => {
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
  }, []);

  // Memoized visible reviews
  const getVisibleReviews = useCallback(() => {
    const start = currentIndex * reviewsPerView;
    return reviews.slice(start, start + reviewsPerView);
  }, [currentIndex, reviews]);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-24 w-full lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block px-6 py-2 mb-4 bg-linear-to-br from-orange-100 to-orange-50 border border-orange-200 rounded-full text-orange-600 text-sm font-bold tracking-widest uppercase">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Don't just take our word for it - hear from our satisfied customers
        </p>

        {/* Overall Rating */}
        <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-5xl font-black text-orange-600">4.8</div>
          <div className="flex flex-col gap-1">
            {renderStars(5)}
            <p className="text-sm text-gray-600">Based on 12,450+ reviews</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous reviews"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Reviews Slider */}
        <div className="overflow-hidden px-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
              >
                {reviews
                  .slice(
                    slideIndex * reviewsPerView,
                    (slideIndex + 1) * reviewsPerView
                  )
                  .map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      renderStars={renderStars}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next reviews"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-orange-500"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-lg text-gray-700 mb-4">
          Have you purchased from us?
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Write a Review
        </button>
      </div>
    </section>
  );
};

export default CustomerReviews;