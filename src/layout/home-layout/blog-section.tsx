import ContentLayout from "@/ui/components/content-layout";
import { featured_blogs, get_blogs } from "@/utils/function";
import { IBlog, IBlogSection } from "@/utils/types";
import { PUBLIC_URLS } from "@/utils/urls";
import Link from "next/link";
interface IProp {
  mydata: IBlogSection;
}
const BlogSection = async ({ mydata }: IProp) => {
  const data = await featured_blogs();
  const blogs = await get_blogs();
  if (data.length < 1) {
    return;
  }
  if (!Array.isArray(data)) {
    // console.log("Error: featured_posts is not an array", featured_posts.posts);
    return <p>Error loading featured posts</p>;
  }

  if (blogs?.length <= 0 || !Array.isArray(blogs)) {
    // console.log("Error: data.posts is not an array", data.posts);
    return <p>Error loading posts</p>;
  }
  return (
    <div className="flex flex-col gap-10 2xl:w-[85%] mx-auto">
      <h2 className="font-SuisseBold md:w-1/12 lg:w-full text-6xl ">
        {mydata?.title}
      </h2>
      <p className="font-Suisse text-lg ">{mydata?.description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:ml-0">
        {data?.map((item: IBlog, i: number) => (
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
      {data?.length >= 6 && blogs?.length > data?.length && (
        <div className="w-full flex justify-center">
          <Link
            href={PUBLIC_URLS.BLOG}
            className="bg-white h-10 relative rounded-xl w-32 cursor-pointer"
          >
            <div className="bg-black text-white flex items-center justify-center rounded-lg absolute -top-1 -left-1 h-full w-full">
              See More
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
