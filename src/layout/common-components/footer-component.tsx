"use client";
import { ContactLink, FooterLink } from "@/ui/components/animated-button";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { MdPhoneCallback } from "react-icons/md";
import { Subscribe } from "@/ui/components/subscribe-component";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";
const FOOTER_LINKS = [
  {
    name: "Our Services",
    hasIcon: false,
    pathname: "/services/uiux-services",
  },
  {
    name: "Projects",
    hasIcon: true,
    pathname: "/portfolio",
  },
  {
    name: "Our Process",
    hasIcon: true,
    pathname: "/processes",
  },

  {
    name: "Contacts",
    hasIcon: true,
    pathname: "/contact",
  },
  {
    name: "Blog",
    hasIcon: true,
    pathname: "/blog",
  },
];
const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  return (
    <div className="relative">
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
              <MdPhoneCallback color="#fff" size={25} />
              <ContactLink className="" href="" text="+1 (920) 948 309" />
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://wa.me/923116931514"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 right-0 z-[1000] rounded-l-xl px-2 py-1 gap-1 bg-[#25D366] flex items-center"
      >
        <FaWhatsapp size={28} />
        <span>chat on Whatsapp</span>
      </a>
    </div>
  );
};

export default Footer;
