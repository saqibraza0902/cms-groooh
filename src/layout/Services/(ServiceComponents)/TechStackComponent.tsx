import React from "react";
import Image from "next/image";

interface IProp {
  partners: {
    image: string;
    title: string;
  }[];
}
const TechStackComponent = ({ partners }: IProp) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 space-y-10 items-end justify-items-center">
      {partners.map((item, i) => (
        <div
          key={i}
          className="bg-brand_blue-300 rounded-full gap-5 border w-60 h-60 flex justify-center items-center flex-col"
        >
          <Image src={item.image} alt="" height={120} width={120} />
          <p className="font-SuisseSemiBold text-xl">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TechStackComponent;
