"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/styles";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { BiPlus } from "react-icons/bi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { FaChevronUp } from "react-icons/fa";
import { HiBars3BottomLeft, HiBars3BottomRight } from "react-icons/hi2";
import { useTheme } from "next-themes";
import { HiOutlineSun } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

interface IProp {
  text?: string;
  href?: string;
  className?: React.LinkHTMLAttributes<HTMLUListElement> | string;
  showIcon?: boolean;
}
interface ILinkProp {
  text?: string;
  href?: string;
  className?: React.LinkHTMLAttributes<HTMLUListElement> | string;
  showIcon?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
interface ISlider {
  Arrows?: any;
  className?: any;
}
export const AnimatedHeroNav = ({ className, text }: IProp) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        `bg-black dark:bg-white border-black min-w-40 gap-3 px-2 flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="!w-full ">
        <motion.p
          className="text-nowrap dark:text-black text-white"
          initial={{ y: "50%", x: "0%" }}
          animate={{ y: isHovered ? "-200%" : "50%", x: "0%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>
        <motion.p
          className="text-nowrap dark:text-black text-white"
          initial={{ y: "200%", x: "0%" }}
          animate={{ y: isHovered ? "-50%" : "200%", x: "0%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>
      </div>

      <div
      // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // className="h-5 w-5"
      >
        {/* This div is for icon do not remove it */}
        {/* <p
          className={`p-1 h-full w-full flex justify-center items-center cursor-pointer rounded ${
            theme === "dark" ? "bg-brand_pink-400 " : "!bg-brand_gray-500"
          }`}
        >
          <HiOutlineSun size={15} color={theme === "dark" ? "#fff" : "#fff"} />
        </p> */}
      </div>
    </div>
  );
};
export const AnimatedHeroButton = ({ className, text }: IProp) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        `bg-black border-black h-12 min-w-40 text-white flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="!w-2/6 cursor-pointer">
        <motion.p
          className="text-nowrap"
          initial={{ y: "50%", x: "-55%" }}
          animate={{ y: isHovered ? "-150%" : "50%", x: "-55%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>
        <motion.p
          className="text-nowrap"
          initial={{ y: "150%", x: "-55%" }}
          animate={{ y: isHovered ? "-50%" : "150%", x: "-55%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.p>
      </div>

      <div className="h-5 w-5 rounded-full bg-slate-400 absolute right-3"></div>
    </div>
  );
};
export const AnimatedLink = ({
  text = "Hello",
  href = "#",
  className,
  showIcon,
  onMouseEnter,
  onMouseLeave,
}: ILinkProp) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        ` border-black   h-12 w-auto  flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
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
          className="text-white  md:text-black dark:text-white flex m-auto items-center gap-1"
          initial={{ y: "50%" }}
          animate={{ y: isHovered ? "-150%" : "50%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
          {showIcon && (
            <>
              {isHovered ? (
                <FaChevronUp className="dark:text-white text-black" />
              ) : (
                <FaChevronDown className="dark:text-white text-black" />
              )}
            </>
          )}
        </motion.p>
        <motion.p
          className="text-white  md:text-black  dark:text-white flex m-auto items-center gap-1"
          initial={{ y: isHovered ? "-50%" : "100%" }}
          animate={{ y: isHovered ? "-50%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          {text}
          {showIcon && (
            <>
              {isHovered ? (
                <FaChevronUp className="dark:text-white text-black" />
              ) : (
                <FaChevronDown className="dark:text-white text-black" />
              )}
            </>
          )}
        </motion.p>
      </div>
    </Link>
  );
};

export const FooterLink = ({
  text = "Hello",
  href = "/",
  className,
  showIcon,
  onMouseEnter,
  onMouseLeave,
}: ILinkProp) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        ` border-black h-8 w-max flex-nowrap text-nowrap  flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full "
        onMouseEnter={showIcon ? onMouseEnter : () => console.log("first")}
        onMouseLeave={showIcon ? onMouseLeave : () => console.log("first")}
      >
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
        ` border-black h-8 w-max flex-nowrap text-nowrap  flex items-center justify-center relative overflow-hidden ${className}`
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
          className="absolute bottom-0 left-0 h-0.5 dark:bg-white bg-black"
          style={{ width: "100%", scaleX: isHovered ? 1 : 0 }}
          initial={{ x: "105%" }} // Change initial position to start from the left
          animate={{ x: isHovered ? "0%" : "-105%" }} // Animate towards the right when hovered
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 dark:bg-white bg-black"
          style={{ width: "100%", scaleX: isHovered2 ? 1 : 0 }}
          initial={{ x: "-5%" }}
          animate={{ x: isHovered2 ? "-100%" : "-5%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Link>
  );
};

export const SliderRightButton = ({ className }: ISlider) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={cn(
        ` border-black h-12 w-12 lg:h-28 lg:w-28  flex-nowrap text-nowrap  flex items-center justify-center relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full flex justify-center transition-all duration-300 items-center  rounded-full ${
          isHovered ? "bg-white border" : " bg-none border"
        }`}
      >
        <motion.p
          className=""
          initial={{ x: "50%", y: "-0%" }}
          animate={{ x: isHovered ? "200%" : "50%", y: "-0%" }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineArrowForwardIos
            className="lg:text-5xl text-xl"
            color="#fff"
          />
        </motion.p>
        <motion.p
          className=""
          initial={{ x: "-200%", y: "-0%" }}
          animate={{ x: isHovered ? "-50%" : "-200%", y: "-0%" }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineArrowForwardIos
            className="lg:text-5xl text-xl"
            color="#000"
          />
        </motion.p>
      </div>
    </div>
  );
};

export const SliderLeftButton = ({ className }: ISlider) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={cn(
        ` border-black lg:h-28 lg:w-28 h-12 w-12 flex-nowrap text-nowrap  flex items-center justify-center relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full flex justify-center transition-all duration-300 items-center  rounded-full ${
          isHovered ? "bg-white border" : " bg-none border"
        }`}
      >
        <motion.p
          className=""
          initial={{ x: "50%", y: "-0%" }}
          animate={{ x: isHovered ? "-200%" : "50%", y: "-0%" }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineArrowBackIos className="lg:text-5xl text-xl" color="#fff" />
        </motion.p>
        <motion.p
          className=""
          initial={{ x: "200%", y: "-0%" }}
          animate={{ x: isHovered ? "-50%" : "200%", y: "-0%" }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineArrowBackIos className="lg:text-5xl text-xl" color="#000" />
        </motion.p>
      </div>
    </div>
  );
};
export const AnimatedHeroHamburger = ({ className }: IProp) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={cn(
        `bg-black border-black min-w-10 gap-3 px-2 flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="!w-full ">
        <motion.p
          className="text-nowrap"
          initial={{ x: "0%", y: "50%" }}
          animate={{ x: isHovered ? "-200%" : "0%", y: "50%" }}
          transition={{ duration: 0.3 }}
        >
          <HiBars3BottomLeft size={30} />
        </motion.p>
        <motion.p
          className="text-nowrap"
          initial={{ x: "150%", y: "-50%" }}
          animate={{ x: isHovered ? "0%" : "150%", y: "-50%" }}
          transition={{ duration: 0.3 }}
        >
          <HiBars3BottomRight size={30} />
        </motion.p>
      </div>
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

export const AnimatedCloseNavbarButton = ({ className }: IProp) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        `bg-black border-black min-w-10 gap-3 px-2 flex items-center justify-center rounded-lg relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="!w-full ">
        <motion.p
          className="text-nowrap"
          initial={{ x: "0%", y: "50%" }}
          animate={{ x: isHovered ? "-200%" : "0%", y: "50%" }}
          transition={{ duration: 0.3 }}
        >
          <RxCross1 color={theme === "dark" ? "#fff" : "#fff"} size={30} />
        </motion.p>
        <motion.p
          className="text-nowrap"
          initial={{ x: "150%", y: "-50%" }}
          animate={{ x: isHovered ? "0%" : "150%", y: "-50%" }}
          transition={{ duration: 0.3 }}
        >
          <RxCross1 color={theme === "dark" ? "#fff" : "#fff"} size={30} />
        </motion.p>
      </div>
    </div>
  );
};
