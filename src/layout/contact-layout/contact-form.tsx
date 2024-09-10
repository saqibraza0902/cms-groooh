"use client";
import { ButtonLayout } from "@/ui/components/animated-button";
import Input from "@/ui/form/input-component";
import TextArea from "@/ui/form/textarea-component";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";
const ContactForm = () => {
  const isSm = useMediaQuery({
    query: "(max-width: 640px)",
  });

  const isMd = useMediaQuery({
    query: "(min-width: 641px) and (max-width: 1023px)",
  });

  const isLg = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isxl = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  const is2xl = useMediaQuery({
    query: "(min-width: 1536px)",
  });

  const getTextAreaRows = () => {
    if (isSm) {
      return 4;
    } else if (isMd) {
      return 6;
    } else if (isLg) {
      return 6;
    } else if (isxl) {
      return 7;
    } else if (is2xl) {
      return 11;
    } else {
      return 11;
    }
  };
  console.log("Small :", isSm, "Lg :", isLg);
  return (
    <form className="h-full w-full text-black space-y-3 2xl:space-y-10">
      <div className="flex flex-col lg:flex-row  2xl:space-y-10 lg:space-y-0 lg:space-x-5 ">
        <div className="w-full space-y-1 2xl:space-y-10">
          <div className="flex flex-col space-y-2 md:flex-row w-full md:space-x-10">
            <Input
              inputClassName="text-black w-full placeholder:text-brand_gray-500 border-none bg-white "
              placeholder="John Doe"
              className="space-y-1 2xl:space-y-3 w-full "
              label="Name"
            />
            <Input
              inputClassName="text-black placeholder:text-brand_gray-500 border-none bg-white"
              placeholder="john@example.com"
              className="space-y-1 2xl:space-y-3 w-full"
              label="Email"
            />
          </div>
          <div className="flex w-full space-y-2 flex-col md:flex-row md:space-x-10">
            <Input
              inputClassName="text-black placeholder:text-brand_gray-500 border-none bg-white"
              placeholder="Need A website"
              className="space-y-1 2xl:space-y-3 w-full"
              label="Subject"
            />
            <Input
              inputClassName="text-black placeholder:text-brand_gray-500 border-none bg-white"
              placeholder="United States"
              className="space-y-1 2xl:space-y-3 w-full"
              label="Country"
            />
          </div>
          <div className="w-full mt-2 h-full">
            <TextArea
              rows={getTextAreaRows()}
              label="Message"
              divClass="space-y-1 2xl:space-y-3 w-full "
              placeholder="Type your message..."
              className=" text-black placeholder:text-brand_gray-500 border-none bg-white"
            />
          </div>
        </div>
      </div>
      <div className="md:w-2/6 mx-auto cursor-pointer">
        <ButtonLayout
          Icon={
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/contact-icons%2FPlain.svg?alt=media&token=b5861dc3-03be-48b4-9618-9791ddc4e038"
              alt=""
              width={30}
              height={30}
            />
          }
          className="max-h-11"
        >
          Send Message
        </ButtonLayout>
      </div>
    </form>
  );
};

export default ContactForm;
