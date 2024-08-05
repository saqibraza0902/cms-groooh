import React from "react";

interface IProp {
  children: React.ReactNode;
}
const BlueContentBox = ({ children }: IProp) => {
  return (
    <div className="relative h-full w-full lg:inline-block">
      <div className="absolute inset-0 bg-black rounded-[60px] shadow-lg transform translate-x-5 translate-y-5"></div>
      <div className="h-full relative p-5 lg:p-10 w-full rounded-[40px] bg-brand_blue-300">
        {children}
      </div>
    </div>
  );
};

export default BlueContentBox;
