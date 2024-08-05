import React from "react";
import Navigation from "./Common/Navigation";
import Footer from "./Common/Footer";
import CookiesConcent from "./Common/CookiesConcent";

interface ICommon {
  children: React.ReactNode;
}
const CommonLayout = ({ children }: ICommon) => {
  return (
    <div>
      <Navigation />
      <div className="dark:bg-brand_gray-900 min-h-screen">{children}</div>
      <Footer />
      <CookiesConcent />
    </div>
  );
};

export default CommonLayout;
