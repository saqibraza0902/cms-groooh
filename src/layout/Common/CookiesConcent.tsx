"use client";
import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { cn } from "@/utils/styles";
const CookiesConcent = () => {
  const [showConcent, setShowConcent] = useState(false);
  useEffect(() => {
    setShowConcent(hasCookie("localConcent"));
  }, []);
  const acceptCookies = () => {
    setShowConcent(true);
    setCookie("localConcent", "true", {});
  };

  return (
    <div
      className={`${cn(
        "  transition-all duration-300 flex-col space-y-3 lg:flex-row fixed bottom-0 z-[400] bg-black w-full justify-between px-4 lg:px-10 flex items-center",
        { " lg:h-16 py-4 lg:py-10": !showConcent },
        { "h-0 hidden py-0": showConcent }
      )} `}
    >
      <p className="text-white text-center lg:text-start text-sm lg:text-base ">
        We use cookies to improve your experience. By continuing, you consent to
        our use of cookies.
      </p>
      <div className="">
        <div
          onClick={() => acceptCookies()}
          className={`bg-brand_blue-300 h-10 relative rounded-xl w-32 cursor-pointer ${
            !showConcent ? "flex" : "hidden"
          }`}
        >
          <div className="bg-white text-black px-5 flex items-center justify-center rounded-lg absolute -top-1 -left-1 h-full w-full">
            Accept
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesConcent;
