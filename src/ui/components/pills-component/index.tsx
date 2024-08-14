import React from "react";
import { BiCross } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

interface IProp {
  children: React.ReactNode;
  isIcon: boolean;
  handleClick?: () => void;
  iconClick?: () => void;
}
const Pills = ({ handleClick, iconClick, isIcon, children }: IProp) => {
  return (
    <div
      onClick={handleClick}
      className="w-auto cursor-pointer bg-brand_blue-500 px-4 rounded py-1  flex-nowrap relative"
    >
      {isIcon && (
        <RxCross1 onClick={iconClick} className="absolute -top-1 -right-1" />
      )}
      <span className="text-sm text-white">{children}</span>
    </div>
  );
};

export default Pills;
