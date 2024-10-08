"use client";
import { ContactLink } from "@/ui/components/animated-button";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { MdPhoneCallback } from "react-icons/md";
import { Subscribe } from "@/ui/components/subscribe-component";
import { FaWhatsapp } from "react-icons/fa";
import { FooterLink } from "@/ui/components/footer-link";
import Link from "next/link";
import { useAppSelector } from "@/hooks/Hooks";
import { FOOTER_LINKS } from "@/mock";
import { PUBLIC_URLS } from "@/utils/urls";

const Footer = () => {
  const { services } = useAppSelector((s) => s.services);
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const handleToggle = (id: string | any) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };
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
            <Link
              href={item.pathname}
              className="flex items-center lg:w-8/12 justify-start"
              key={i}
            >
              <FooterLink
                className="text-white  text-lg font-bold"
                showIcon={item.hasIcon}
                text={item.name}
              />
              {!item.hasIcon && <BiPlus color="#fff" />}
            </Link>
          ))}
        </div>
        <div className="lg:w-3/12 flex flex-col lg:items-center ">
          <span className="flex items-center lg:w-9/12 justify-start">
            <FooterLink
              className="text-white  text-lg font-bold"
              showIcon={false}
              text={"Services"}
            />
          </span>
          {services.map((item, i) => (
            <div
              className="w-full lg:w-9/12"
              key={i}
              onClick={() => handleToggle(item.id)}
            >
              <span className="flex cursor-pointer items-center lg:w-full justify-start">
                <FooterLink
                  className="text-white  text-lg font-bold"
                  showIcon={false}
                  text={item.title}
                />
                {true && <BiPlus color="#fff" />}
              </span>

              <div
                className={`overflow-hidden transition-all ${
                  expandedServiceId === item.id
                    ? "max-h-52 duration-500 ease-in"
                    : "max-h-0 duration-[480ms] ease-in-out"
                }`}
              >
                <span className="grid grid-cols-1 space-y-1 py-2">
                  {item.sub_services.map((subService, index) => (
                    <Link
                      href={`${PUBLIC_URLS.SERVICES}/${subService.url}`}
                      key={index}
                      className="block font-Suisse  text-white text-xs"
                    >
                      {subService.title}
                    </Link>
                  ))}
                </span>
              </div>
            </div>
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
        href="https://wa.me/923137198899"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 right-0 z-[1000] rounded-l-xl p-2 gap-2 bg-[#25D366] flex items-center"
      >
        <FaWhatsapp size={28} />
        <span>chat on Whatsapp</span>
      </a>
    </div>
  );
};

export default Footer;
