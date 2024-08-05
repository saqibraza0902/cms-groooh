import { PARTNERS_ARRAY } from "@/mock";
import AnimatedHoverLogo from "@/ui/components/AnimateHoverLogo";
import { IPartners } from "@/utils/types";
import React from "react";

interface IProp {
  partners: IPartners;
}
const PartnerSection = ({ partners }: IProp) => {
  return (
    <>
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-4 grid-rows-2">
        {partners?.partners?.map((item, index) => (
          <React.Fragment key={index}>
            <AnimatedHoverLogo
              imageSrc={item.image}
              index={index}
              textContent={item.text}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default PartnerSection;
