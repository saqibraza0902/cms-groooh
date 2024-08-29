import React from "react";
import ContentBox from "../content-box";
import Link from "next/link";
import Image from "next/image";
import { PUBLIC_URLS } from "@/utils/urls";

interface IProp {
  item: {
    image: string;
    title: string;
    slug: string;
    desc: string;
    isBlog?: boolean;
    isPortfolio?: boolean;
  };
}

const ContentLayout = ({ item }: IProp) => {
  const url = item.isBlog
    ? PUBLIC_URLS.BLOG
    : item.isPortfolio && PUBLIC_URLS.PROJECTS;
  return (
    <ContentBox className="bg-primary !p-5" childClass="bg-secondary">
      <div className="w-full h-full relative group">
        <Link
          href={`${url}/${item.slug}`}
          className="h-full w-full relative block bg-black rounded-[20px]"
        >
          <Image
            alt={item.image}
            src={item?.image}
            height={1200}
            className=" w-full h-96 lg:h-80 2xl:h-96 rounded-[20px] object-cover "
            width={1200}
          />
          <div className="absolute bottom-0 h-28 group-hover:opacity-80 bg-black flex flex-col justify-center py-3 group-hover:h-full px-5 gap-3 transition-all duration-300 text-white rounded-[20px] w-full">
            <p className="line-clamp-1 font-SuisseBold text-xl">{item.title}</p>
            <p className="line-clamp-2 font-Suisse">{item.desc}</p>
          </div>
        </Link>
      </div>
    </ContentBox>
  );
};

export default ContentLayout;
