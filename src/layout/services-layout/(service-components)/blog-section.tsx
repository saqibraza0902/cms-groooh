import ContentLayout from "@/ui/components/content-layout";
import { suggested_blogs } from "@/utils/function";
import { IBlog, IBlogSection } from "@/utils/types";
interface IProp {
  mydata: IBlogSection;
  slug: string;
}
const BlogSection = async ({ mydata, slug }: IProp) => {
  const tags = [slug];
  const data = await suggested_blogs(tags, "");
  if (data.length < 1) {
    return;
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-SuisseBold md:w-1/12 lg:w-full text-6xl text-white">
        {mydata?.title}
      </h2>
      <p className="font-Suisse text-lg text-white">{mydata?.description}</p>
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
    </div>
  );
};

export default BlogSection;
