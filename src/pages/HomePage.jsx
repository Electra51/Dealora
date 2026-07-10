import React from "react";
import Hero from "../components/Hero/Hero";
import FeaturedCategories from "../components/FeaturedCategories/FeaturedCategories";

import SaleBanner from "../components/SaleBanner/SaleBanner";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import CustomerReviews from "../components/CustomerReviews/CustomerReviews";
import Newsletter from "../components/Newsletter/Newsletter";
import ShopByBrand from "../components/ShopByBrand";
import NewArrivals from "../components/NewArrivals";
import FeaturedBanner from "../components/FeaturedBanner";
import WhyShopWithUs from "../components/WhyShopWithUs";
import Trending from "../components/Trending";
import BestSellers from "../components/BestSellers";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <Trending/>
      <ShopByBrand/>
      <NewArrivals />
      <FeaturedBanner/>
      <WhyShopWithUs/>
      <SaleBanner />
      <BestSellers/>
      <WhyChooseUs />
      <CustomerReviews />
      <Newsletter />
    </div>
  );
};

export default HomePage;
