import React from "react";
import Hero from "../components/Features/Home/Hero";
import FeaturedCategories from "../components/Features/Home/FeaturedCategories";
import Trending from "../components/Features/Home/Trending";
import FeaturedBanner from "../components/Features/Home/FeaturedBanner";
import NewArrivals from "../components/Features/Home/NewArrivals";
import ShopByBrand from "../components/Features/Home/ShopByBrand";
import SaleBanner from "../components/Features/Home/SaleBanner";
import BestSellers from "../components/Features/Home/BestSellers";
import WhyShopWithUs from "../components/Features/Home/WhyShopWithUs";
import CustomerReviews from "../components/Features/Home/CustomerReviews";
import Newsletter from "../components/Features/Home/Newsletter";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <Trending />
      <FeaturedBanner />
      <NewArrivals />
      <ShopByBrand />
      <SaleBanner />
      <BestSellers />
      <WhyShopWithUs />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
};

export default HomePage;
