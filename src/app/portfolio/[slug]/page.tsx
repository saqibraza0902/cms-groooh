import { IItem } from "@/app/newportfolio/page";
import CommonLayout from "@/layout";
import { SHARE_ICONS } from "@/mock";
import { ShareIcon } from "@/ui/components/animated-icons";
import ContentLayout from "@/ui/components/content-layout";
import { calculateDuration } from "@/utils/calculate-date";
import { suggested_projects } from "@/utils/function";
import extractStrongText from "@/utils/text";
import { timestamps } from "@/utils/timestamp";
import { addCustomStyling } from "@/utils/transformation";
import { IPortfolio } from "@/utils/types";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { CiCalendar } from "react-icons/ci";

const getData = async (slug: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/portfolio/${slug}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    throw new Error("Error");
  }
};
export async function generateMetadata(props: any): Promise<Metadata> {
  const post = await getData(props?.params.slug);
  return {
    title: post?.title,
    description: post?.desc,
    icons: post?.gallery[0]?.url,
  };
}
const SinglePortfolio = async (props: any) => {
  const { slug } = props.params;
  const post: IPortfolio = await getData(slug);
  const similarportfolios = await suggested_projects(post.tags, post.id);
  const strongText = extractStrongText(post?.content);

  const link = `${process.env.NEXT_PUBLIC_URL}/portfolio/${slug}`;
  const duration = calculateDuration(
    // @ts-ignore
    post.timeline.start.seconds,
    // @ts-ignore
    post.timeline.end.seconds
  );
  // console.log("This is duration", similarportfolios);
  return (
    <CommonLayout>
      <div className="flex relative bg-white  justify-center w-full h-full min-h-screen ">
        <div className="h-full w-full">
          <div className="relative h-[75vh]  w-full z-40 bg-secondary lg:h-4k  rounded-b-[80px]">
            <div className="absolute left-0 z-0 flex flex-col justify-end top-0 rounded-b-[40px] bg-primary h-[97%] w-full">
              <div className=" px-4 lg:px-14 py-14 ">
                <h2 className="text-5xl lg:text-[70px] text-black font-semibold">
                  {post.title}
                </h2>
                <div className="bg-black my-5 w-full h-[1px]" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CiCalendar color="#000" size={20} />
                    <span className="text-black">
                      {timestamps(post.createdAt.seconds)}
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
            <section className="w-full bg lg:w-11/12">
              <div className="flex flex-col-reverse lg:flex-row gap-10">
                <div className="w-full lg:w-7/12">
                  <h3 className="text-2xl text-black font-semibold">
                    {post?.desc}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                  <div>
                    <p className="text-[#9E9EA9]">Industry</p>
                    <p className="text-black">
                      {post.tags.map((el, i) => (
                        <span key={i}>
                          {el}
                          {i !== post.tags.length - 1 && ","}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9E9EA9]">Country</p>
                    <p className="text-black">{post.client.country}</p>
                  </div>
                  <div>
                    <p className="text-[#9E9EA9]">
                      {post.client.isIndividual
                        ? "Client Name"
                        : "Company Name"}
                    </p>
                    <p className="text-black">{post.client.name}</p>
                  </div>
                  <div>
                    <p className="text-[#9E9EA9]">Timeline</p>
                    <p className="text-black">{duration}</p>
                  </div>
                </div>
              </div>

              <div className="bg-black my-5 w-full h-[1px]"></div>
              <div className="flex gap-10 relative">
                <div className="w-full text-black lg:w-7/12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: addCustomStyling(post?.content),
                    }}
                  />
                </div>
                <div className="w-3/12 hidden lg:block  start-1">
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
                        <h4 className="uppercase text-black">Processes</h4>
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
            </section>
          </div>
          <section className="pr-2 pl-6 lg:px-14 dark:bg-black py-10 min-h-screen">
            <h3 className="text-2xl  font-semibold">Similar Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
              {similarportfolios?.map((item: IPortfolio, i: number) => (
                <ContentLayout
                  key={i}
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
          </section>
        </div>
      </div>
    </CommonLayout>
  );
};

export default SinglePortfolio;
