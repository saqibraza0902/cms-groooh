import React from "react";
import ParagraphComponent from "@/ui/components/scroll-text";
import { ICTOSection } from "@/utils/types";

interface IProp {
  prop: ICTOSection;
}
const CTOMessageComponent = ({ prop }: IProp) => {
  return (
    <div className="flex flex-col gap-10 items-center lg:flex-row mx-auto 2xl:w-[85%]">
      <div className="lg:w-3/12 space-y-3">
        <div className="h-40 w-32 bg-gray-500" />
        <div className="flex flex-col">
          <span className="font-Suisse">{prop?.cto_name}</span>
          <span className="text-sm text-brand_pink-200">
            {prop?.cto_position}
          </span>
        </div>
      </div>
      <div className="lg:w-9/12 space-y-5">
        <ParagraphComponent
          className="!text-xl !xl:text-3xl "
          text={prop?.client_text}
        />
        <p className="text-lg text-brand_pink-200">{prop?.text}</p>
      </div>
    </div>
  );
};

export default CTOMessageComponent;
