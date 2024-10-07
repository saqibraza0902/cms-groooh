import CommonLayout from "@/layout";
import { BASEURL, getSinglePost, suggested_blogs } from "@/utils/function";
import extractStrongText from "@/utils/text";
import { timestamps } from "@/utils/timestamp";
import { IBlog, IUser } from "@/utils/types";
import { addCustomStyling } from "@/utils/transformation";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import { ShareIcon } from "@/ui/components/animated-icons";
import { SHARE_ICONS } from "@/mock";
import { Metadata } from "next";
import ContentLayout from "@/ui/components/content-layout";

export async function generateMetadata(props: any): Promise<Metadata> {
  const post = await getSinglePost(props?.params.slug);
  return {
    title: post?.title,
    description: post?.desc,
    icons: {
      icon: post?.featuredImage?.url,
    },
  };
}
interface IProp {
  params: {
    slug: string;
  };
}
export default async function SinglePost({ params }: IProp) {
  const blogPost: IBlog = await getSinglePost(params.slug);
  const recentBlogs = await suggested_blogs(blogPost.tags, blogPost.id);
  console.log("Length", recentBlogs.length);
  const strongText = extractStrongText(blogPost.content);
  const link = `${BASEURL}blog/${params.slug}`;
  return (
    <CommonLayout>
      <div className="flex flex-col bg-white  lg:flex-row relative justify-center w-full h-full min-h-screen ">
        <div className="h-full w-full">
          <div className="relative h-[75vh]  w-full z-40 bg-secondary lg:h-4k  rounded-b-[80px]">
            <div className="absolute left-0 z-0 flex flex-col justify-end top-0 rounded-b-[40px] bg-primary h-[97%] w-full">
              <div className=" px-4 lg:px-14 py-14 ">
                <h2 className="text-5xl lg:text-[70px] text-black font-semibold">
                  {blogPost.title}
                </h2>
                <div className="bg-black my-5 w-full h-[1px]" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CiCalendar color="#000" size={20} />
                    <span className="text-black">
                      {timestamps(blogPost.createdAt.seconds)}
                    </span>
                  </div>
                  <div>
                    <a className="text-black" href="#article">
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
              <div className="!sticky top-10 pb-20">
                <div className=" !relative">
                  <div className="">
                    <span className="text-xl font-medium text-black">
                      Share
                    </span>
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
                  <h3 className="text-2xl text-black font-semibold">
                    {blogPost?.desc}
                  </h3>
                </div>
              </div>
              <div className="bg-black my-5 w-full h-[1px]"></div>
              <div className="flex flex-col lg:flex-row gap-10 relative">
                <div className="w-full text-black lg:w-7/12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: addCustomStyling(blogPost?.content),
                    }}
                  />
                </div>
                <div className="w-3/12 hidden lg:block start-1">
                  <div className="border-[#b2b2b2]  sticky top-10  rounded-xl border-[1px] w-full h-min   p-[1px]">
                    <div className="relative">
                      <div className=" w-full h-max text-black rounded-xl flex flex-col py-5 px-8">
                        <h4 className="uppercase">Table of contents</h4>
                        <ol className="list-decimal flex flex-col text-sm gap-3">
                          {strongText.map((el: string, i: number) => (
                            <li key={i}>
                              <a
                                href={`#section-${i + 1}`}
                                className="hover:underline"
                              >
                                {el}
                              </a>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className=" lg:px-14 dark:bg-black py-10 w-full h-full">
            <h3 className="text-2xl font-semibold px-3">Recent Blogs</h3>
            <div className="grid grid-cols-1 w-full md:grid-cols-2 pl-3 pr-8 gap-10 py-10">
              {recentBlogs.map((item: IBlog, i: number) => (
                <ContentLayout
                  key={i}
                  item={{
                    desc: item?.desc,
                    image: item?.featuredImage?.url,
                    slug: item.slug,
                    title: item.title,
                    isBlog: true,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </CommonLayout>
  );
}
