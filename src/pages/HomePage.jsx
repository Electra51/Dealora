import React, { lazy } from "react";
import Hero from "../components/Features/Home/Hero";
import LazySection from "../components/Common/LazySection";
import SEO from "../components/Common/SEO";

const FeaturedCategories = lazy(() => import("../components/Features/Home/FeaturedCategories"));
const Trending = lazy(() => import("../components/Features/Home/Trending"));
const FeaturedBanner = lazy(() => import("../components/Features/Home/FeaturedBanner"));
const NewArrivals = lazy(() => import("../components/Features/Home/NewArrivals"));
const ShopByBrand = lazy(() => import("../components/Features/Home/ShopByBrand"));
const SaleBanner = lazy(() => import("../components/Features/Home/SaleBanner"));
const BestSellers = lazy(() => import("../components/Features/Home/BestSellers"));
const WhyShopWithUs = lazy(() => import("../components/Features/Home/WhyShopWithUs"));
const CustomerReviews = lazy(() => import("../components/Features/Home/CustomerReviews"));
const Newsletter = lazy(() => import("../components/Features/Home/Newsletter"));

const HomePage = () => {
  return (
    <div>
      <SEO 
        title="Home" 
        description="Shop the best premium sneakers and apparel at Dealora. Exclusive deals, fast delivery, and guaranteed quality."
      />
      <Hero />
      <LazySection>
        <FeaturedCategories />
      </LazySection>
      <LazySection>
        <Trending />
      </LazySection>
      <LazySection>
        <FeaturedBanner />
      </LazySection>
      <LazySection>
        <NewArrivals />
      </LazySection>
      <LazySection>
        <ShopByBrand />
      </LazySection>
      <LazySection>
        <SaleBanner />
      </LazySection>
      <LazySection>
        <BestSellers />
      </LazySection>
      <LazySection>
        <WhyShopWithUs />
      </LazySection>
      <LazySection>
        <CustomerReviews />
      </LazySection>
      <LazySection>
        <Newsletter />
      </LazySection>
    </div>
  );
};

export default HomePage;
