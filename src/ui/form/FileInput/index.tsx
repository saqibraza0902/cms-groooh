import { cn } from "@/utils/styles";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  labelClass?: React.LabelHTMLAttributes<HTMLLabelElement> | string;
}
const FileInput = ({
  className,
  label,
  name,
  labelClass = "",
  ...rest
}: IInput) => {
  return (
    <div className={cn(`min-w-72 ${className}`)}>
      {label && <label className={cn("", labelClass)}>{label}</label>}
      <input {...rest} type="file" id="fileInput" className="sr-only" />
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex items-center gap-5 h-12 dark:bg-slate-400 w-full px-4  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-600 transition duration-300"
      >
        <BiPlus size={25} />
        {"Choose a file"}
      </label>
      {name && <label>{name}</label>}
    </div>
  );
};

export default FileInput;
