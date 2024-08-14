import { cn } from "@/utils/styles";
import React from "react";

interface IText extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  divClass?: string;
  label?: string;
  labelClass?: string;
}
const TextArea = ({
  className,
  divClass,
  label,
  labelClass,
  ...rest
}: IText) => {
  return (
    <div className={cn(`min-w-72 ${divClass} `)}>
      {label && <label className={cn("", labelClass)}>{label}</label>}
      <textarea
        className={cn(
          `outline-none w-full transition-all bg-transparent duration-300 p-4 rounded-xl  focus:border-black border-[1px] focus:dark:border-lime-800 ${className}`
        )}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
