"use client";
import { ContactLink, FooterLink } from "@/ui/components/animated-button";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FcCallback } from "react-icons/fc";
import { Subscribe } from "@/ui/components/subscribe-component";
const FOOTER_LINKS = [
  {
    name: "Our Services",
    hasIcon: false,
    pathname: "/",
  },
  {
    name: "Projects",
    hasIcon: true,
    pathname: "/",
  },
  {
    name: "Our Process",
    hasIcon: true,
    pathname: "/",
  },
  {
    name: "Open Source",
    hasIcon: true,
    pathname: "/",
  },
  {
    name: "Referal Program",
    hasIcon: true,
    pathname: "/",
  },
  {
    name: "Contacts",
    hasIcon: true,
    pathname: "/",
  },
  {
    name: "Blog",
    hasIcon: true,
    pathname: "/",
  },
];
const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <div className="h-full w-full flex flex-col gap-5 lg:flex-row justify-between bg-brand_green-700  px-4 lg:px-20 py-10">
        <div className="lg:w-4/12 flex flex-col gap-5">
          <p className="text-white  font-bold text-xl">
            Subscribe to our newsletter to stay in touch with the latest.
          </p>
          <div className="w-full">
            <Subscribe />
          </div>
        </div>
        <div className="lg:w-3/12 flex flex-col lg:items-center ">
          {FOOTER_LINKS.map((item, i) => (
            <span className="flex items-center lg:w-8/12 justify-start" key={i}>
              <FooterLink
                className="text-white  text-lg font-bold"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                href={item.pathname}
                showIcon={item.hasIcon}
                text={item.name}
              />
              {!item.hasIcon && <BiPlus color="#fff" />}
            </span>
          ))}
        </div>
        <div className="lg:w-3/12 text-white  flex flex-col gap-5">
          <div>
            <p className="font-light text-xs dark:text-[#ccc]">
              DROP US A LINE
            </p>
            <ContactLink href="" className="" text="testuser@gmail.com" />
          </div>
          <div>
            <p className="font-light text-xs dark:text-[#ccc]">Call US</p>
            <div className="flex gap-4 items-center">
              <FcCallback size={25} />
              <ContactLink className="" href="" text="+1 (920) 948 309" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
