"use client";
import { cn } from "@/utils/styles";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";

interface IProp {
  el: {
    icon: string;
    title: string;
    description: string;
  };
  i: number;
}
const Offers = ({ el, i }: IProp) => {
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  return (
    <div
      className={cn(
        `flex flex-col text-white gap-5 p-5`,
        {
          "lg:border-r-[1px]": i < 2 || (i > 2 && i < 5),
        },
        { "lg:border-b-[1px]": i < 3 },
        { "border-r-[1px] ": i % 2 === 0 && isMobile },
        { "border-b-[1px] ": i >= 0 && i < 4 && isMobile }
      )}
    >
      <Image src={el.icon} alt="" height={40} width={40} />
      <p className="text-xl font-semibold">{el.title}</p>
      <p className="text-sm opacity-70 text-justify">{el.description}</p>
    </div>
  );
};

export default Offers;
