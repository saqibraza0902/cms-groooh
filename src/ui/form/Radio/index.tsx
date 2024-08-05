import React from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  labelClass?: React.LabelHTMLAttributes<HTMLLabelElement> | string;
}
const RadioInput = ({ className, label, ...rest }: IInput) => {
  return (
    <div className="flex gap-5">
      <label>{label}</label>
      <input {...rest} type="radio" />
    </div>
  );
};

export default RadioInput;
