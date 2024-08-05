"use client";
import { cn } from "@/utils/styles";
import React, { useState } from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  inputClassName?: string;
  labelClass?: React.LabelHTMLAttributes<HTMLLabelElement> | string;
}
const Input = ({
  className,
  label,
  inputClassName,
  labelClass = "",
  ...rest
}: IInput) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={cn(`min-w-72 ${className}`)}>
      {label && <label className={cn("", labelClass)}>{label}</label>}
      <input
        {...rest}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          `rounded-lg bg-brand_gray-100 transition-all duration-200 dark:bg-brand_gray-500 text-sm  w-full outline-none px-4 h-12   ${inputClassName}`,
          {
            "border-black border dark:border-lime-800": isFocused,
          }
        )}
      />
    </div>
  );
};

export default Input;
