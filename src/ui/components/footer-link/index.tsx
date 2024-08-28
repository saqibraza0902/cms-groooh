"use client";

import { cn } from "@/utils/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

interface ILinkProp {
  text?: string;
  className?: React.LinkHTMLAttributes<HTMLUListElement> | string;
  showIcon?: boolean;
}
export const FooterLink = ({
  text,

  className,
  showIcon,
}: ILinkProp) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        ` border-black h-8 w-max flex-nowrap text-nowrap  flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full ">
        <motion.p
          className=" flex-nowrap text-nowrap  flex m-auto items-center gap-1"
          initial={{ y: "50%" }}
          animate={{ y: isHovered ? "-150%" : "50%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>

        <motion.p
          className="flex-nowrap text-nowrap  flex m-auto items-center gap-1"
          initial={{ y: isHovered ? "-50%" : "100%" }}
          animate={{ y: isHovered ? "-50%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
          <motion.span
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            {showIcon && <GoArrowUpRight />}
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
};
