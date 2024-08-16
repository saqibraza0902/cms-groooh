import Button from "@/ui/form/button-component";
import Input from "@/ui/form/input-component";
import TextArea from "@/ui/form/textarea-component";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import ContactForm from "./contact-form";
import { IContact } from "@/utils/types";
import Image from "next/image";
import ContentBox from "@/ui/components/content-box";
const CONTACT_DETAILS = [
  {
    icon: <FaLocationDot />,
    text: "From",
    alt: "12 Street, USA",
  },
  {
    icon: <MdLocalPhone />,
    text: "Cell",
    alt: "+1 (555) 123-4567",
  },
  {
    icon: <IoMdMail />,
    text: "Email",
    alt: "info@example.com",
  },
];

interface IProp {
  contact: IContact;
}
const ContactLayout = ({ contact }: IProp) => {
  return (
    <div className="bg-black w-full">
      <div className="mx-auto w-full lg:w-9/12 xl:w-2/3 py-10   lg:p-10 h-full space-y-10">
        <div className="flex justify-center items-center">
          <Image
            src={contact.icon}
            alt=""
            width={200}
            height={200}
            className="mx-auto my-auto"
          />
        </div>

        <div className="pl-11 pr-5">
          {/* <div className="relative bg-black h-[83vh] lg:h-[60vh] xl:h-[97vh] 2xl:h-[60vh] rounded-[60px] w-full">
            <div className="bg-white  h-full w-full rounded-[40px]  space-y-5 absolute -top-5 -left-5 px-4 py-10 lg:px-10 lg:py-14"> */}
          <ContentBox className="bg-primary" childClass="bg-secondary">
            <h3 className="text-black font-medium text-3xl">{contact.title}</h3>
            <ContactForm />
          </ContentBox>
          {/* </div>
          </div> */}
        </div>
        <div className="grid pl-8 pr-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-stretch">
          {contact?.contact?.map((item, i) => (
            <ContentBox
              key={i}
              childClass="bg-secondary !rounded-3xl !translate-x-2 !translate-y-2"
              className="!p-4 !rounded-xl bg-primary"
            >
              <div className="flex gap-3 ">
                <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center"></div>
                <div className="flex text-sm flex-col">
                  <span className="text-black">{item.title}</span>
                  <span className="text-brand_gray-400">
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
