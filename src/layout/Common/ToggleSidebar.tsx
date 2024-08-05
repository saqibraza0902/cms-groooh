"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { WITHOUT_AUTH_PUBLIC_NAV } from "@/mock";
import { auth } from "@/utils/firebase";
import { motion } from "framer-motion";
import { AnimatedHeroNav, AnimatedLink } from "@/ui/components/AnimatedButton";
interface Props {
  open: boolean;
  close: () => void;
}
const ToggleSidebar = ({ open, close }: Props) => {
  const router = useRouter();
  const user = auth.currentUser;
  const path = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const handleNavItemClick = (index: any, isDropdown: any) => {
    setActiveIndex(activeIndex === index ? null : index);
    setActiveDropdownIndex(null); // Reset dropdown state when toggling main item
  };

  const handleDropdownItemClick = (index: any) => {
    setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
  };

  const handleItemClick = (index: number, isDropdown: boolean) => {
    if (isDropdown) {
      setExpandedIndex(expandedIndex === index ? null : index);
    } else {
      close();
    }
  };
  return (
    <div
      className={`fixed lg:hidden inset-y-0 w-full md:w-[50%]  !overflow-hidden z-50 lg:w-[25%] bg-white transition-transform duration-300 transform flex 
       ${open ? "translate-x-0" : "-translate-x-full"} 
     
      `}
    >
      <div className=" px-4 w-full py-5 space-y-6 rounded-xl">
        <div className="flex items-center justify-end">
          <div className="cursor-pointer" onClick={close}>
            <RxCross1 />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          {WITHOUT_AUTH_PUBLIC_NAV.map((item, index) => (
            <div
              key={index}
              className={`flex transition-all duration-300 ease-in-out flex-col px-3 bg-brand_blue-300 w-full relative gap-2 ${
                path === item.pathname && "!bg-orange-400"
              }`}
            >
              <div
                className="flex transition-all duration-300 ease-in-out items-center cursor-pointer"
                onClick={() => handleNavItemClick(index, item.isDropdown)}
              >
                <AnimatedLink
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="!text-white !bg-none w-full uppercase flex items-center gap-1"
                  href={item.pathname}
                  text={item.title}
                  showIcon={item.isDropdown}
                />
              </div>
              {item.isDropdown && activeIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activeIndex === index ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-2 bg-none p-2 mb-2 transition-all overflow-hidden"
                  layout
                >
                  {item.dropdownItems?.map((dropdownItem, subIndex) => (
                    <div key={subIndex}>
                      <div
                        className="flex transition-all duration-300 ease-in-out items-center cursor-pointer"
                        onClick={() => handleDropdownItemClick(subIndex)}
                      >
                        <AnimatedLink
                          className="rounded-none !bg-transparent w-full uppercase flex items-center gap-1"
                          href={"#"}
                          text={dropdownItem.title}
                        />
                      </div>
                      {activeDropdownIndex === subIndex && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height:
                              activeDropdownIndex === subIndex ? "auto" : 0,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          {dropdownItem.sub_categories.map(
                            (subCategory, subCatIndex) => (
                              <AnimatedLink
                                key={subCatIndex}
                                className="rounded-none !bg-transparent w-full uppercase flex items-center gap-1"
                                href={subCategory.link}
                                text={subCategory.title}
                              />
                            )
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-brand_blue-300 flex md:hidden w-36 h-10 my-3 relative rounded-xl">
          <div className="absolute capitalize text-sm -top-1 -left-1">
            <AnimatedHeroNav
              className="bg-black text-white h-10 min-w-36"
              text="CONTACT US"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToggleSidebar;
