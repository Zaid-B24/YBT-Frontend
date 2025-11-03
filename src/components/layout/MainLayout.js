import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../common/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        {/* Child pages like Homepage, AboutPage, etc., will render here */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
