import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../pages/HomePage";
// ALL routes dynamically imported
const ShopPage = lazy(() => import("../pages/ShopPage"));
const DealsPage = lazy(() => import("../pages/DealsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const About = lazy(() => import("../components/Features/About/About"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));

// A loading fallback component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:<HomePage />
         
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CartPage />
          </Suspense>
        ),
      },
       {
        path: "/deals",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DealsPage />
          </Suspense>
        ),
      },
        {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  
]);
