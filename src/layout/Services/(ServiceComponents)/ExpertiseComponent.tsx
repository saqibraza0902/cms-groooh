"use client";
import BlueContentBox from "@/ui/components/BlueContentBox";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/styles";
interface IProp {
  expertise: {
    image: string;
    title: string;
    description: string;
  }[];
  title: string;
}
const ExpertiseComponent = ({ expertise, title }: IProp) => {
  const [hoverStates, setHoverStates] = useState(
    Array(expertise.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };
  return (
    <div className="w-11/12 h-full mx-auto">
      <BlueContentBox>
        <div className="flex flex-col gap-5">
          <h1 className="lg:w-3/6 text-4xl lg:text-7xl font-SuisseBold ">
            {title}
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:justify-between">
            {expertise.map((el, i) => (
              <div
                key={i}
                className="bg-brand_blue-100 w-72 h-96 rounded-2xl flex flex-col justify-between items-center relative"
              >
                <div className="relative z-10 w-full h-full flex justify-center items-center">
                  <Image src={el.image} alt="" width={150} height={150} />
                </div>
                <div
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className={cn(
                    `group absolute inset-0 z-20 cursor-pointer overflow-hidden`
                  )}
                >
                  <motion.div
                    initial={{ y: "83%" }}
                    animate={{ y: hoverStates[i] ? "0%" : "83%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-10/12 mx-auto rounded-2xl bg-brand_blue-100 overflow-hidden flex-col h-full flex "
                  >
                    <p className="font-SuisseSemiBold text-2xl">
                      {el.title}
                    </p>
                    <p className="text-justify mt-7 font-Suisse">{el.description}</p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlueContentBox>
    </div>
  );
};

export default ExpertiseComponent;
