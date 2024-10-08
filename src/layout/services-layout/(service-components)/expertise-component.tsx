"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/styles";
import ContentBox from "@/ui/components/content-box";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
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
    <div className="w-full h-full mx-auto 2xl:w-[92%]">
      <ContentBox className="!bg-primary" childClass="!bg-secondary">
        <div className="flex flex-col gap-5">
          <h1 className="lg:w-5/12 text-4xl lg:text-7xl text-black font-SuisseBold ">
            {title}
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:justify-between">
            {expertise.map((el, i) => (
              <div
                key={i}
                className="bg-secondary w-72 h-96 2xl:h-5k 2xl:w-1/3 rounded-2xl flex flex-col justify-between items-center !relative"
              >
                <div className="relative z-10 w-full h-full flex justify-center items-center">
                  <Image src={el.image} alt="" width={150} height={150} />
                </div>
                <div
                  className={cn(
                    `group absolute  inset-0 z-20 cursor-pointer overflow-hidden`
                  )}
                >
                  <motion.div
                    onMouseLeave={() => handleMouseLeave(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    initial={{ y: "80%" }}
                    animate={{ y: hoverStates[i] ? "5%" : "80%" }}
                    transition={{ duration: 0.3 }}
                    className=" w-10/12 mx-auto bg-secondary rounded-2xl text-black overflow-hidden flex-col h-full flex "
                  >
                    <p className="font-SuisseSemiBold w-full text-2xl">
                      {el.title}
                    </p>
                    <p
                      className={`text-justify mt-2  ${
                        hoverStates[i] ? "mt-0" : "mt-7 2xl:mt-14"
                      } font-Suisse`}
                    >
                      {el.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBox>
    </div>
  );
};

export default ExpertiseComponent;
