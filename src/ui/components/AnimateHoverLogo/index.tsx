"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/styles";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

interface IProp {
  imageSrc: string;
  altText?: string;
  textContent: string;
  index?: number;
}
const AnimatedHoverLogo = ({
  imageSrc,
  altText = "",
  textContent,
  index = 0,
}: IProp) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        `group relative h-40 cursor-pointer overflow-hidden md:w-60`,
        { "lg:border-r-[2px]": index < 3 || (index > 3 && index < 7) },
        { "lg:border-b-[2px]": index < 4 },
        { "border-r-[2px] ": index % 2 === 0 },
        { "border-b-[2px] ": index >= 0 && index < 6 && isMobile }
      )}
    >
      <motion.div
        initial={{ y: "60%" }}
        animate={{ y: isHovered ? "0%" : "60%" }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden z-40 h-full flex justify-end items-center flex-col"
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={80}
          height={80}
          className="w-20 h-20 rounded-lg"
        />

        <p className=" text-white text-center h-2/3 p-2">{textContent}</p>
      </motion.div>
    </div>
  );
};

export default AnimatedHoverLogo;
