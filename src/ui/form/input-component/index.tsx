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
  return (
    <div className={cn(` ${className}`)}>
      {label && <label className={cn("", labelClass)}>{label}</label>}
      <input
        {...rest}
        autoComplete="off"
        className={cn(
          `rounded-lg transition-all bg-transparent duration-200  text-sm  w-full focus:border-black border-[1px] focus:dark:border-lime-800 outline-none px-4 h-12   ${inputClassName}`
        )}
      />
    </div>
  );
};

export default Input;
