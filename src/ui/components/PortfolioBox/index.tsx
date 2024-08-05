import { IPortfolio } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProp {
  item: IPortfolio;
}
const PortfolioBox = ({ item }: IProp) => {
  return (
    <div className="!h-96 rounded-[46px] bg-black relative w-full">
      <div className="bg-white !h-full rounded-[30px] absolute -top-4 w-full -left-4">
        <div className="w-full ">
          <div className="h-full p-4 w-full mx-auto">
            <Image
              alt={item?.gallery[0]?.alt}
              src={item?.gallery[0]?.url}
              height={400}
              className="h-72 w-full rounded-[14px] object-center"
              width={400}
            />
            <Link
              href={`/portfolio/${item.slug}`}
              className="line-clamp-1 text-black  font-bold text-xl"
            >
              {item.title}
            </Link>
            <p className="line-clamp-1 text-black">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBox;
