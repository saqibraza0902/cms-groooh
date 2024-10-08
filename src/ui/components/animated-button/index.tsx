"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/styles";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { FaChevronUp } from "react-icons/fa";
interface IProp {
  text?: string;
  href?: string;
  className?: React.LinkHTMLAttributes<HTMLUListElement> | string;
  showIcon?: boolean;
}
interface ILinkProp {
  text?: string;
  href?: string;
  iconColor?: string;
  className?: React.LinkHTMLAttributes<HTMLUListElement> | string;
  showIcon?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
interface ISlider {
  item?: {
    Arrows?: any;
    className?: any;
    bg?: string;
    iconColorA?: string;
    iconColorB?: string;
    hoverBorder?: string;
  };
}

export const ButtonLayout = ({
  className,
  children,
  Icon,
}: {
  className?: string;
  children: React.ReactNode;
  Icon?: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        `bg-black px-3 gap-3 border-black flex justify-between items-center text-white rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="!w-2/6 cursor-pointer">
        <motion.p
          className="text-nowrap"
          initial={{ y: "50%" }}
          animate={{ y: isHovered ? "-150%" : "50%" }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.p>
        <motion.p
          className="text-nowrap"
          initial={{ y: "150%" }}
          animate={{ y: isHovered ? "-50%" : "150%" }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.p>
      </div>

      <div className="h-6 w-6 p-1 rounded-full bg-white ">{Icon}</div>
    </div>
  );
};
export const AnimatedLink = ({
  text = "Hello",
  href = "#",
  className,
  showIcon,
  iconColor,
  onMouseEnter,
  onMouseLeave,
}: ILinkProp) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log("Icon color", iconColor);
  return (
    <Link
      href={href}
      className={cn(
        ` border-black  md:text-black md:dark:text-white h-12 w-auto  flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full"
        onMouseEnter={showIcon ? onMouseEnter : () => console.log("first")}
        onMouseLeave={showIcon ? onMouseLeave : () => console.log("first")}
      >
        <motion.p
          className=" flex m-auto items-center justify-between gap-1"
          initial={{ y: "50%" }}
          animate={{ y: isHovered ? "-150%" : "50%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
          {showIcon && (
            <>
              {isHovered ? (
                <FaChevronUp color={iconColor} />
              ) : (
                <FaChevronDown color={`${iconColor && iconColor}`} />
              )}
            </>
          )}
        </motion.p>
        <motion.p
          className="flex m-auto items-center justify-between gap-1"
          initial={{ y: isHovered ? "-50%" : "100%" }}
          animate={{ y: isHovered ? "-50%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
          {showIcon && (
            <>
              {isHovered ? (
                <FaChevronUp color={iconColor && iconColor} />
              ) : (
                <FaChevronDown color={iconColor && iconColor} />
              )}
            </>
          )}
        </motion.p>
      </div>
    </Link>
  );
};

export const ContactLink = ({
  text = "",
  href = "/",
  className,
}: ILinkProp) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  return (
    <Link
      href={href}
      className={cn(
        ` border-white h-8 w-max flex-nowrap text-nowrap  flex items-center justify-center relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => {
        setIsHovered(true), setIsHovered2(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setTimeout(() => setIsHovered2(true), 10);
        setIsHovered2(false);
      }}
    >
      <div className="w-full ">
        <motion.p
          className="   flex m-auto items-center gap-1"
          initial={{ y: "50%" }}
          animate={{ y: isHovered ? "-150%" : "50%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>
        <motion.p
          className="  flex m-auto items-center gap-1"
          initial={{ y: isHovered ? "-50%" : "100%" }}
          animate={{ y: isHovered ? "-50%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-white "
          style={{ width: "100%", scaleX: isHovered ? 1 : 0 }}
          initial={{ x: "110%" }} // Change initial position to start from the left
          animate={{ x: isHovered ? "0%" : "-110%" }} // Animate towards the right when hovered
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-white "
          style={{ width: "100%", scaleX: isHovered2 ? 1 : 0 }}
          initial={{ x: "-15%" }}
          animate={{ x: isHovered2 ? "-100%" : "-15%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Link>
  );
};

export const SliderRightButton = ({ item }: ISlider) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = item?.bg;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-12 w-12 lg:h-28 lg:w-28 relative overflow-hidden flex justify-center transition-all duration-300 items-center border-[2px] rounded-full ${
        isHovered
          ? `bg-[${color}] border-black`
          : `bg-none border-[${item?.hoverBorder}]`
      }`}
    >
      <motion.p
        className=""
        initial={{ x: "50%" }}
        animate={{ x: isHovered ? "250%" : "50%" }}
        transition={{ duration: 0.3 }}
      >
        <MdOutlineArrowForwardIos
          className="lg:text-5xl text-xl"
          color={item?.iconColorA}
        />
      </motion.p>
      <motion.p
        className=""
        initial={{ x: "-250%", y: "-0%" }}
        animate={{ x: isHovered ? "-50%" : "-250%", y: "-0%" }}
        transition={{ duration: 0.3 }}
      >
        <MdOutlineArrowForwardIos
          className="lg:text-5xl text-xl"
          color={item?.iconColorB}
        />
      </motion.p>
    </div>
  );
};

export const SliderLeftButton = ({ item }: ISlider) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = item?.bg;
  const br = item?.hoverBorder;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-12 w-12 lg:h-28 lg:w-28 relative overflow-hidden flex justify-center transition-all duration-300 items-center border-[2px] rounded-full ${
        isHovered ? `bg-[${color}] border-black` : `bg-none ${br}`
      }`}
    >
      <motion.p
        className=""
        initial={{ x: "50%", y: "-0%" }}
        animate={{ x: isHovered ? "-200%" : "50%", y: "-0%" }}
        transition={{ duration: 0.3 }}
      >
        <MdOutlineArrowBackIos
          className="lg:text-5xl text-xl"
          color={item?.iconColorA}
        />
      </motion.p>
      <motion.p
        initial={{ x: "200%", y: "-0%" }}
        animate={{ x: isHovered ? "-50%" : "200%", y: "-0%" }}
        transition={{ duration: 0.3 }}
      >
        <MdOutlineArrowBackIos
          className="lg:text-5xl text-xl"
          color={item?.iconColorB}
        />
      </motion.p>
    </div>
  );
};

export const CartButton = ({ className, text }: IProp) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={cn(
        `bg-black border-black w-full gap-3 px-4 flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="!w-full ">
        <motion.p
          className="text-nowrap dark:text-black "
          initial={{ y: "50%", x: "0%" }}
          animate={{ y: isHovered ? "-200%" : "50%", x: "0%" }}
          transition={{ duration: 0.3 }}
        >
          <span className="flex justify-between gap-3 text-white">
            <span>Add to Cart</span>
            <span>${text}</span>
          </span>
        </motion.p>
        <motion.p
          className="text-nowrap dark:text-black "
          initial={{ y: "200%", x: "0%" }}
          animate={{ y: isHovered ? "-50%" : "200%", x: "0%" }}
          transition={{ duration: 0.3 }}
        >
          <span className="flex justify-between gap-3 text-white">
            <span>Add to Cart</span>
            <span>${text}</span>
          </span>
        </motion.p>
      </div>
    </div>
  );
};
