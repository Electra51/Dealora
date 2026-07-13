import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DealsPage from "../pages/DealsPage";
import CartPage from "../pages/CartPage";

// Lazy loading the page components
const HomePage = lazy(() => import("../pages/HomePage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const About = lazy(() => import("../components/Features/About/About"));

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
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
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
    ],
  },
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
]);
