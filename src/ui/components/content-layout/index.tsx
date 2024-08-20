import React from "react";
import ContentBox from "../content-box";
import Link from "next/link";
import Image from "next/image";

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
  const url = item.isBlog ? "/blog" : item.isPortfolio && "/portfolio";
  return (
    <ContentBox className="bg-primary !p-5" childClass="bg-secondary">
      <div className="w-full h-full relative group">
        <Link
          href={`${url}/${item.slug}`}
          className="h-full w-full relative block bg-black rounded-xl"
        >
          <Image
            alt={item.image}
            src={item?.image}
            height={1200}
            className="h-full w-full rounded-[14px] group-hover:opacity-80 object-center transition-all duration-300"
            width={1200}
          />
          <div className="absolute bottom-0 bg-black flex flex-col justify-end p-2 gap-1 text-white rounded-[14px] w-full">
            <p className="line-clamp-1 font-bold text-xl">{item.title}</p>
            <p className="line-clamp-1">{item.desc}</p>
          </div>
        </Link>
      </div>
    </ContentBox>
  );
};

export default ContentLayout;
