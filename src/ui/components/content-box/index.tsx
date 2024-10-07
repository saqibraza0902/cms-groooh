import { cn } from "@/utils/styles";
import React from "react";

interface IProp {
  children: React.ReactNode;
  className?: string;
  childClass?: string;
}
const ContentBox = ({ className, childClass, children }: IProp) => {
  return (
    <div className="relative w-full h-full lg:inline-block">
      <div
        className={`${cn(
          `absolute inset-0 bg-black rounded-[60px] transform translate-x-5 translate-y-5`
        )} ${childClass}`}
      ></div>
      <div
        className={`${cn(
          `h-full relative p-10 w-full rounded-[40px] bg-white ${className}`
        )}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentBox;
