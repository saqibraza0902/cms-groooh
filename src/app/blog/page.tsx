import CommonLayout from "@/layout";
import BlogBox from "@/ui/components/BlogBox";
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
      <div className="bg-brand_blue-300 min-h-screen">
        {blogPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10 ">
            {blogPosts.map((post: IBlog) => (
              <BlogBox item={post} key={post.id} />
            ))}
          </div>
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </CommonLayout>
  );
}
