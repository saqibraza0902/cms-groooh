import CommonLayout from "@/layout";
import SubServicesLayout from "@/layout/services-layout/(sub-services)";
import React from "react";

interface IProp {
  params: {
    slug: string;
  };
}
const page = ({ params }: IProp) => {
  return (
    <CommonLayout>
      <SubServicesLayout slug={params.slug} />
    </CommonLayout>
  );
};

export default page;
