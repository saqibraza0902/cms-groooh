import React from "react";
import Navigation from "./common-components/Navigation";
import Footer from "./common-components/footer-component";
import CookiesConcent from "./common-components/cookies-concent";

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
