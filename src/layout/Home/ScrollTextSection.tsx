import React from "react";
import ScrollText from "@/ui/components/ScrollText";

interface IProp {
  text: string;
}
const ScrollTextSection = ({ text }: IProp) => {
  return (
    <div className="h-full flex w-2/3 mx-auto flex-col gap-10 py-40 justify-center items-center">
      <ScrollText className="!justify-center " text={text} />
    </div>
  );
};

export default ScrollTextSection;
