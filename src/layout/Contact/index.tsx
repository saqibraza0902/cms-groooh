import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import TextArea from "@/ui/form/TextArea";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import ContactForm from "./ContactForm";
import { IContact } from "@/utils/types";
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
    <div className="bg-secondary w-full">
      <div className="mx-auto w-full lg:w-9/12 xl:w-2/3 py-10   lg:p-10 h-full space-y-10">
        <h3 className="lg:text-center text-start px-5  w-10/12 lg:w-6/12 lg:mx-auto font-medium text-3xl">
          {contact.title}
        </h3>
        <div className="pl-11 pr-5">
          <div className="relative bg-black h-[83vh] lg:h-[60vh] xl:h-[97vh] 2xl:h-[60vh] rounded-[60px] w-full">
            <div className="bg-white  h-full w-full rounded-[40px]  space-y-5 absolute -top-5 -left-5 px-4 py-10 lg:px-10 lg:py-14">
              <h4 className="text-2xl font-medium text-black">Contact Form</h4>
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="grid pl-8 pr-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-stretch">
          {contact?.contact?.map((item, i) => (
            <div key={i} className="relative bg-black  rounded-3xl w-full h-28">
              <div className="bg-white absolute p-3 -top-2 rounded-2xl -left-2 flex space-x-2 items-center lg:justify-center  w-full h-full">
                <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center"></div>
                <div className="flex text-sm flex-col">
                  <span className="text-black">{item.title}</span>
                  <span className="text-brand_gray-400">
                    {item.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLayout;
