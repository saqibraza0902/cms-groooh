import CommonLayout from "@/layout";
import ContentBox from "@/ui/components/content-box";
import ContentLayout from "@/ui/components/content-layout";
import { get_blogs } from "@/utils/function";
import { IBlog } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const revalidate = 0;
export default async function Blog() {
  const blogPosts = await get_blogs();
  return (
    <CommonLayout>
      <div className="bg-black min-h-screen">
        {blogPosts?.length > 0 ? (
          <div className="grid grid-cols-1 pr-8 pl-3 py-10 lg:px-14 md:grid-cols-2 gap-10">
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
