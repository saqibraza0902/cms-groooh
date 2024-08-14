import CommonLayout from "@/layout";
import { auther_details, getSinglePost, recent_blogs } from "@/utils/function";
import extractStrongText from "@/utils/text";
import { timestamps } from "@/utils/timestamp";
import { IBlog, IUser } from "@/utils/types";
import { addCustomStyling } from "@/utils/transformation";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import BlogBox from "@/ui/components/blog-box";
import { ShareIcon } from "@/ui/components/animated-icons";
import { SHARE_ICONS } from "@/mock";
import { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  const post = await getSinglePost(props?.params.slug);
  return {
    title: post?.title,
    description: post?.desc,
    icons: post?.featuredImage?.url,
  };
}
interface IProp {
  params: {
    slug: string;
  };
}
export default async function SinglePost({ params }: IProp) {
  const blogPost: IBlog = await getSinglePost(params.slug);
  const recentBlogs = await recent_blogs();
  // const autherdetail: IUser = await auther_details(blogPost?.autherId);
  const strongText = extractStrongText(blogPost.content);
  const link = `${process.env.NEXT_PUBLIC_URL}/blog/${params.slug}`;
  return (
    <CommonLayout>
      <div className="flex flex-col lg:flex-row relative justify-center w-full h-full min-h-screen ">
        <div className="h-full w-full">
          <div className="relative h-[75vh]  w-full z-40 bg-black lg:h-screen  rounded-b-[80px]">
            <div className="absolute left-0 z-0 flex flex-col justify-end top-0 rounded-b-[40px] bg-brand_blue-300 h-[97%] w-full">
              <div className=" px-4 lg:px-14 py-14 ">
                <h2 className="text-5xl lg:text-[70px] text-white font-semibold">
                  {blogPost.title}
                </h2>
                <div className="bg-white my-5 w-full h-[1px]" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CiCalendar color="#fff" size={20} />
                    <span className="text-white">
                      {timestamps(blogPost.createdAt.seconds)}
                    </span>
                  </div>
                  <div>
                    <a className="text-white" href="#article">
                      Scroll
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="article"
            className="relative flex flex-col lg:flex-row py-10 px-4 lg:px-14"
          >
            <section className="w-full lg:w-1/12 relative">
              <div className="lg:sticky top-10 pb-20">
                <div className=" !relative">
                  <div className=" flex flex-col gap-3">
                    <span className="text-xl font-medium">Share</span>
                    <div className="flex flex-row justify-between lg:flex-col gap-2">
                      {SHARE_ICONS.map((el, i) => (
                        <ShareIcon key={i} item={el} url={link} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full lg:w-11/12">
              <div className="flex flex-col-reverse lg:flex-row gap-10">
                <div className="w-full lg:w-7/12 ">
                  <h3 className="text-2xl font-semibold">{blogPost?.desc}</h3>
                </div>
                <div className="flex gap-1">
                  {/* <Image
                    src={autherdetail.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full h-10 object-contain w-10"
                  /> */}
                  <div className="flex flex-col text-sm gap-1">
                    {/* <span>{autherdetail.name} </span> */}
                    <span>CEO of Halo Lab</span>
                  </div>
                </div>
              </div>
              <div className="bg-black my-5 w-full h-[1px]"></div>
              <div className="flex flex-col lg:flex-row gap-10 relative">
                <div className="w-full lg:w-7/12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: addCustomStyling(blogPost?.content),
                    }}
                  />
                </div>
                <div className="w-3/12 hidden lg:block start-1">
                  <div className="border-[#b2b2b2]  sticky top-10  rounded-xl border-[1px] w-full h-min   p-[1px]">
                    <div className="relative">
                      <Image
                        alt="Icon"
                        src="/icons/toc-collar_tablet.svg"
                        width={20}
                        height={30}
                        className="absolute w-10 -right-[2px] -top-[2px] bg-white"
                      />
                      <div className=" w-full h-max  rounded-xl flex flex-col gap-5 p-8">
                        <h4 className="uppercase">Table of contents</h4>
                        <ol className="list-decimal flex flex-col text-sm gap-3">
                          {strongText.map((el: string, i: number) => (
                            <li key={i}>{el}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black my-5 w-full h-[1px]"></div>
            </section>
          </div>

          <section className="pr-2 pl-6 lg:px-14 bg-brand_blue-300 py-10 min-h-screen">
            <h3 className="text-2xl font-semibold">Recent Blogs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 py-10">
              {recentBlogs.map((post: IBlog, i: number) => (
                <BlogBox item={post} key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </CommonLayout>
  );
}
