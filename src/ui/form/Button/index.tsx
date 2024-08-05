import { cn } from "@/utils/styles";
import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "h-14 w-full text-lg disabled:opacity-50 rounded-lg text-center font-Nunito border border-none   text-white bg-brand_gray-500",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
