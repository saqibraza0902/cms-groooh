import BlogBox from "@/ui/components/blog-box";
import { get_featured_blogs } from "@/utils/function";
import { IBlog, IBlogSection } from "@/utils/types";
import Link from "next/link";
interface IProp {
  mydata: IBlogSection;
}
const BlogSection = async ({ mydata }: IProp) => {
  const data = await get_featured_blogs();
  if (data.length < 1) {
    return;
  }
  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-SuisseBold md:w-1/12 lg:w-full text-6xl text-black">
        {mydata?.title}
      </h2>
      <p className="font-Suisse text-lg text-black">{mydata?.description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:ml-0">
        {data?.map((item: IBlog, i: number) => (
          <BlogBox item={item} key={i} />
        ))}
      </div>
      {data?.length > 3 && (
        <div className="w-full flex justify-center">
          <Link
            href={"/blog"}
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
