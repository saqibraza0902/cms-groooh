import { IBlog } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContentBox from "../ContentBox";

interface IProp {
  item: IBlog;
}
const BlogBox = ({ item }: IProp) => {
  return (
    // <div className="!h-96 rounded-[46px] bg-black relative w-full">
    //   <div className="bg-white !h-full rounded-[30px] absolute -top-4 w-full -left-4">
    <ContentBox className="!p-0 !rounded-[30px]" childClass="!rounded-[46px]">
      <div className="w-full ">
        <div className="h-full p-4 w-full mx-auto">
          <Image
            src={item.featuredImage.url}
            alt={item.featuredImage.alt}
            height={400}
            className="h-72 w-full rounded-[14px] object-center"
            width={400}
          />
          <Link
            href={`/blog/${item.slug}`}
            className="line-clamp-1 font-bold text-xl"
          >
            {item.title}
          </Link>
          <p className="line-clamp-1">{item.desc}</p>
        </div>
      </div>
    </ContentBox>
    //   </div>
    // </div>
  );
};

export default BlogBox;
