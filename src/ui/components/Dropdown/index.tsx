import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";

const Dropdown = ({ item }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <li
        className="text-white cursor-pointer flex items-center gap-1"
        onClick={handleClick}
      >
        {!item.dropdown && <Link href={item.pathname}>{item.title}</Link>}

        {item.dropdown && (
          <>
            {item.title} <FaArrowDown />
          </>
        )}
      </li>
      {isOpen && item.dropdown && (
        <ul className="absolute z-50 bg-white rounded-md shadow-sm overflow-hidden mt-1">
          {item?.options?.map((option: any, index: number) => (
            <Link
              key={index}
              href={option.pathname}
              className="text-brand_gray-700 hover:bg-brand_gray-100 px-4 py-2 flex flex-col text-nowrap cursor-pointer"
            >
              {option.title}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
