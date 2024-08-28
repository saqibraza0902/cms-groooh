import React from "react";
import ContactForm from "./contact-form";
import { IContact } from "@/utils/types";
import Image from "next/image";
import ContentBox from "@/ui/components/content-box";

interface IProp {
  contact: IContact;
}
const ContactLayout = ({ contact }: IProp) => {
  return (
    <div className="dark:bg-black bg-white min-h-screen w-full">
      <div className="mx-auto w-full lg:w-9/12 xl:w-11/12 py-10 h-full space-y-10">
        <div className="pl-5 pr-11">
          <ContentBox
            className="bg-primary md:p-16"
            childClass="bg-secondary md:p-16"
          >
            <h3 className="text-black font-SuisseBold text-3xl lg:text-5xl w-2/6 mb-5">
              {contact.title}
            </h3>
            <ContactForm />
          </ContentBox>
        </div>
        <div className="grid pl-5 pr-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-stretch">
          {contact?.contact?.map((item, i) => (
            <ContentBox
              key={i}
              childClass="bg-secondary !p-4 !rounded-2xl !translate-x-2 !translate-y-2"
              className="!p-4 !rounded-lg bg-primary"
            >
              <div className="flex gap-3 ">
                <div className="h-12 w-12 rounded-full bg-white text-white flex items-center justify-center">
                  <Image alt="" src={item.icon} width={30} height={30} />
                </div>
                <div className="flex text-sm flex-col">
                  <span className="text-black">{item.title}</span>
                  <span className="text-brand_green-700">
                    {item.description}
                  </span>
                </div>
              </div>
            </ContentBox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLayout;
