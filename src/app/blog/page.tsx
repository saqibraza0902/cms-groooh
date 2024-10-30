import CommonLayout from "@/layout";
import ContentLayout from "@/ui/components/content-layout";
import { get_blogs, home_details } from "@/utils/function";
import { IBlog, IHome } from "@/utils/types";
import { Metadata } from "next";
import React from "react";
export async function generateMetadata(props: any): Promise<Metadata> {
  const home_detail: IHome = await home_details();
  return {
    title: home_detail.BlogSection.title,
    description: home_detail?.BlogSection.description,
  };
}
export default async function Blog() {
  const blogPosts = await get_blogs();
  const home_detail: IHome = await home_details();
  return (
    <CommonLayout>
      <div className="dark:bg-black min-h-screen pr-11 pl-6  lg:px-14  2xl:w-[100%] mx-auto">
        <div className="lg:w-[92%] space-y-3 lg:px-14 pt-10 mx-auto ">
          <h1 className="text-3xl font-SuisseSemiBold">
            {home_detail.BlogSection.title}
          </h1>
          <p className="w-2/3">{home_detail.BlogSection.description}</p>
        </div>
        {blogPosts?.length > 0 ? (
          <div className="grid grid-cols-1 lg:px-14 lg:w-[92%] py-10 mx-auto lg:py-20 md:grid-cols-2 gap-10">
            {blogPosts.map((item: IBlog, i: number) => (
              <ContentLayout
                key={i}
                item={{
                  desc: item?.desc,
                  image: item?.featuredImage.url,
                  slug: item.slug,
                  title: item.title,
                  isBlog: true,
                }}
              />
            ))}
          </div>
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </CommonLayout>
  );
}
