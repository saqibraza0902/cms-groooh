import CommonLayout from "@/layout";
import ContentLayout from "@/ui/components/content-layout";
import { get_blogs } from "@/utils/function";
import { IBlog } from "@/utils/types";
import React from "react";

export default async function Blog() {
  const blogPosts = await get_blogs();
  console.log(blogPosts.length);
  return (
    <CommonLayout>
      <div className="dark:bg-black min-h-screen ">
        {blogPosts?.length > 0 ? (
          <div className="grid grid-cols-1 pr-11 pl-6 py-10 lg:py-20 lg:px-14 md:grid-cols-2 gap-10 2xl:w-[92%] mx-auto">
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
