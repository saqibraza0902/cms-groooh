"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { WITHOUT_AUTH_PUBLIC_NAV } from "@/mock";
import { auth } from "@/utils/firebase";
import { motion } from "framer-motion";
import { AnimatedLink, ButtonLayout } from "@/ui/components/animated-button";
import { cn } from "@/utils/styles";
import { HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "next-themes";
import { get_collectibles, services_title } from "@/utils/function";
import { useAppSelector } from "@/hooks/Hooks";
import { PUBLIC_URLS } from "@/utils/urls";
import Link from "next/link";
import Image from "next/image";
import ContactIcon from "@/ui/icons/contact-icon";
interface Props {
  open: boolean;
  close: () => void;
}
interface item {
  title: string;
  icon: string;
  sub_services: {
    title: string;
    url: string;
  }[];
}
const ToggleSidebar = ({ open, close }: Props) => {
  const path = usePathname();
  const { setTheme, theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const { services } = useAppSelector((s) => s.services);
  const [collectibles, setCollectibles] = useState([]);
  const handleNavItemClick = (index: any, isDropdown: any) => {
    setActiveIndex(activeIndex === index ? null : index);
    setActiveDropdownIndex(null); // Reset dropdown state when toggling main item
  };

  const handleDropdownItemClick = (index: any) => {
    setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
  };
  useEffect(() => {
    const gettitles = async () => {
      const mydata = await get_collectibles("");
      setCollectibles(mydata?.data);
    };
    gettitles();
  }, []);
  return (
    <div
      className={`fixed lg:hidden inset-y-0 w-full md:w-[50%]  !overflow-hidden z-50 lg:w-[25%] bg-white dark:bg-black transition-transform duration-300 transform flex 
       ${open ? "translate-x-0" : "-translate-x-full"} 
     
      `}
    >
      <div className="px-4 w-full py-3 flex flex-col space-y-6 rounded-xl">
        <div className="flex items-center justify-between md:hidden w-full ">
          <Link href={PUBLIC_URLS.HOME} className=" w-32 h-10">
            <Image
              src={theme === "dark" ? "/icons/logo-w.svg" : "/icons/logo.svg"}
              alt="logo"
              height={40}
              width={128}
            />
          </Link>
          <div
            onClick={close}
            className="p-1 rounded-lg cursor-pointer bg-black dark:bg-primary w-fit self-end"
          >
            <RxCross1 color={theme === "dark" ? "#000" : "#fff"} size={28} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          {WITHOUT_AUTH_PUBLIC_NAV.map((item, index) => {
            const isCollectiblesEmpty =
              item?.pathname === PUBLIC_URLS.COLLECTIBLES &&
              collectibles?.length === 0;
            return (
              <div
                key={index}
                className={cn(
                  `flex transition-all duration-300 ease-in-out flex-col px-3 text-black bg-primary w-full relative gap-2 ${
                    path === item.pathname && "!bg-secondary"
                  }`,
                  {
                    hidden: isCollectiblesEmpty,
                  }
                )}
              >
                <div
                  className="flex transition-all duration-300 ease-in-out items-center cursor-pointer"
                  onClick={() => handleNavItemClick(index, item.isDropdown)}
                >
                  <AnimatedLink
                    iconColor="text-[#000]"
                    className="!text-black !bg-none w-full uppercase flex items-center gap-1"
                    href={item.pathname}
                    text={item.title}
                    showIcon={item.isDropdown}
                  />
                </div>
                {item.isDropdown && activeIndex === index && (
                  <div
                    ref={(el) => {
                      if (el) {
                        if (activeIndex === index) {
                          el.style.maxHeight = `${el.scrollHeight}px`;
                        } else {
                          el.style.maxHeight = "0px";
                        }
                      }
                    }}
                    className={`space-y-2 bg-none p-2 mb-2 transition-[max-height] duration-500 ease-in-out overflow-hidden`}
                  >
                    {services?.map((item: item, subIndex) => {
                      return (
                        <div key={subIndex}>
                          <div
                            className="flex transition-all duration-300 ease-in-out items-center cursor-pointer"
                            onClick={() => handleDropdownItemClick(subIndex)}
                          >
                            <AnimatedLink
                              showIcon={true}
                              className="rounded-none !bg-transparent w-full uppercase flex items-center gap-1"
                              href={"#"}
                              text={item?.title}
                            />
                          </div>
                          {activeDropdownIndex === subIndex && (
                            <div className="pl-4 space-y-1 overflow-hidden">
                              {item.sub_services.map(
                                (subCategory, subCatIndex) => (
                                  <AnimatedLink
                                    key={subCatIndex}
                                    className={cn(
                                      `rounded-none w-full pl-2 uppercase flex items-center gap-1 ${
                                        path === subCategory.url &&
                                        "!bg-secondary"
                                      }`
                                    )}
                                    href={`${PUBLIC_URLS.SERVICES}/${subCategory.url}`}
                                    text={subCategory.title}
                                  />
                                )
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <ButtonLayout
            Icon={<ContactIcon />}
            className="dark:bg-primary !w-44 dark:text-black bg-black text-white"
          >
            CONTACT US
          </ButtonLayout>
          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-black cursor-pointer dark:bg-primary h-fit p-1 w-fit  rounded-lg"
          >
            <HiOutlineSun
              size={28}
              color={theme === "dark" ? "#000" : "#fff"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToggleSidebar;
