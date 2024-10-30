import CommonLayout from "@/layout";
import ContentBox from "@/ui/components/content-box";
import ContentLayout from "@/ui/components/content-layout";
import ListView from "@/ui/components/list-box";
import { get_portfolios, home_details } from "@/utils/function";
import { IHome, IPortfolio } from "@/utils/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IProp {
  searchParams: { t: string };
}
export async function generateMetadata(props: any): Promise<Metadata> {
  const home_detail: IHome = await home_details();
  return {
    description: home_detail?.WorksSection.description,
  };
}
const Portfolio = async ({ searchParams }: IProp) => {
  const t = searchParams.t;
  const newposts = await get_portfolios(t ? t : "");
  const home_detail: IHome = await home_details();

  return (
    <CommonLayout>
      <div className="dark:bg-black min-h-screen pr-11 pl-6  lg:px-14  2xl:w-[100%] mx-auto">
        <div className="lg:w-[92%]  lg:px-14 pt-10 mx-auto">
          <div className=" space-y-3">
            <h1 className="text-3xl font-SuisseSemiBold">
              {home_detail.WorksSection.title}
            </h1>
            <p className="w-2/3">{home_detail.WorksSection.description}</p>
          </div>
          <ListView t={t} />
        </div>
        {newposts?.length > 0 ? (
          <div className="grid grid-cols-1 lg:px-14 lg:w-[92%] py-10 mx-auto lg:py-20 md:grid-cols-2 gap-10">
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
