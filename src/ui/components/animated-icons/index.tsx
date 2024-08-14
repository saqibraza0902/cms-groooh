"use client";
import { cn } from "@/utils/styles";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineMailOutline } from "react-icons/md";
import { FacebookShareButton } from "react-share";
import { TwitterShareButton } from "react-share";
import { LinkedinShareButton } from "react-share";
import { toast } from "react-toastify";
interface IProp {
  className?: any;
  item: {
    icon: any;
    iconAlt: any;
    color: string;
    shareType: string;
  };
  url: string;
}

export const ShareIcon = ({ className, item, url }: IProp) => {
  const [isHovered, setIsHovered] = useState(false);
  // const Component = () => {

  return (
    <div
      className={cn(
        ` border-black h-14 lg:h-10 w-min cursor-pointer flex-nowrap text-nowrap  flex items-center justify-center relative overflow-hidden ${className}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Share item={item} url={url}>
        <div
          className={`w-14 lg:w-10 h-full p-2 flex justify-center transition-all duration-300 items-center  rounded-full ${
            isHovered
              ? `${item.color}`
              : "bg-white border-black border-[1px] lg:border-brand_gray-400 "
          }`}
        >
          <motion.p
            className=""
            initial={{ x: "50%" }}
            animate={{ x: isHovered ? "250%" : "50%" }}
            transition={{ duration: 0.2 }}
          >
            {item.icon}
          </motion.p>
          <motion.p
            className=" "
            initial={{ x: "-250%" }}
            animate={{ x: isHovered ? "-50%" : "-250%" }}
            transition={{ duration: 0.2 }}
          >
            {item.iconAlt}
          </motion.p>
        </div>
      </Share>
    </div>
  );
  // };
};

const Share = ({ children, item, url }: any) => {
  if (item.shareType === "FACEBOOK") {
    return (
      <FacebookShareButton className="w-full h-full" url={url}>
        {children}
      </FacebookShareButton>
    );
  } else if (item.shareType === "LINKEDIN") {
    return (
      <LinkedinShareButton className="w-full h-full" url={url}>
        {children}
      </LinkedinShareButton>
    );
  } else if (item.shareType === "TWITTER") {
    return (
      <TwitterShareButton className="w-full h-full" url={url}>
        {children}
      </TwitterShareButton>
    );
  } else {
    return (
      <div
        className="w-full h-full"
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success("Link Copied");
        }}
      >
        {children}
      </div>
    );
  }
};
