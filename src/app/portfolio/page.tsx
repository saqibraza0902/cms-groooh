import CommonLayout from "@/layout";
import PortfolioBox from "@/ui/components/PortfolioBox";
import { get_portfolios } from "@/utils/function";
import { IPortfolio } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Portfolio = async () => {
  const newposts = await get_portfolios();

  return (
    <CommonLayout>
      <div className="bg-brand_blue-300 min-h-screen">
        {newposts?.length > 0 ? (
          <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10">
            {newposts?.map((post: IPortfolio, index: number) => (
              <PortfolioBox item={post} key={index} />
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
