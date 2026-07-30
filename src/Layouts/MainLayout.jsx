// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// const MainLayout = () => {
//   return (
//     <>
//       <Header />
//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// export default MainLayout;

import { Outlet } from "react-router-dom";

import BottomNav from "../components/Common/BottomNav";
import Footer from "./Footer";
import Header from "./Header/Header";

const MainLayout = () => {
  return (
    <div className="">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;
