import CommonLayout from "@/layout";
import ContentBox from "@/ui/components/content-box";
import ContentLayout from "@/ui/components/content-layout";
import { get_portfolios } from "@/utils/function";
import { IPortfolio } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Portfolio = async () => {
  const newposts = await get_portfolios();

  return (
    <CommonLayout>
      <div className="dark:bg-black min-h-screen">
        {newposts?.length > 0 ? (
          <div className="grid grid-cols-1 pr-11 pl-6 py-10 lg:px-14 lg:py-20 2xl:w-[92%] mx-auto md:grid-cols-2 gap-10">
            {newposts?.map((item: IPortfolio, index: number) => (
              <ContentLayout
                key={index}
                item={{
                  desc: item?.desc,
                  image: item?.gallery[0]?.url,
                  slug: item.slug,
                  title: item.title,
                  isPortfolio: true,
                }}
              />
            ))}
          </div>
        ) : (
          <p>No Portfolio posts found.</p>
        )}
      </div>
    </CommonLayout>
  );
};

export default Portfolio;
