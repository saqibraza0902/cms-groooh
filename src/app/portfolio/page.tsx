import CommonLayout from "@/layout";
import ContentBox from "@/ui/components/content-box";
import ContentLayout from "@/ui/components/content-layout";
import ListView from "@/ui/components/list-box";
import { get_portfolios } from "@/utils/function";
import { IPortfolio } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IProp {
  searchParams: { t: string };
}
const Portfolio = async ({ searchParams }: IProp) => {
  const t = searchParams.t;
  const newposts = await get_portfolios(t ? t : "");

  return (
    <CommonLayout>
      <div className="dark:bg-black min-h-screen pr-11 pl-6  lg:px-14  2xl:w-[92%] mx-auto">
        <ListView t={t} />
        {newposts?.length > 0 ? (
          <div className="grid grid-cols-1 py-10 lg:py-20 md:grid-cols-2 gap-10">
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
          <p className="py-10 lg:py-20">No Portfolio posts found.</p>
        )}
      </div>
    </CommonLayout>
  );
};

export default Portfolio;
