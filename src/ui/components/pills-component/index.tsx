import { cn } from "@/utils/styles";
import React from "react";
import { BiCross } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

interface IProp {
  children: React.ReactNode;
  className?: string;
  handleClick?: () => void;
}
const Pills = ({ handleClick, className, children }: IProp) => {
  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-auto cursor-pointer bg-brand_blue-500 px-4 rounded py-1  flex-nowrap relative",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Pills;
