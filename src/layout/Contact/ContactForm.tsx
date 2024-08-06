"use client";
import Button from "@/ui/form/Button";
import Input from "@/ui/form/Input";
import TextArea from "@/ui/form/TextArea";
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

  const getTextAreaRows = () => {
    if (isSm) {
      return 4;
    } else if (isMd) {
      return 6;
    } else if (isLg) {
      return 11;
    } else {
      return 11;
    }
  };
  console.log("Small :", isSm, "Lg :", isLg);
  return (
    <form className="h-full w-full text-black space-y-10">
      <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-5 ">
        <div className="w-full space-y-10">
          <Input
            inputClassName="bg-brand_pink-100 dark:!bg-brand_pink-100 dark:bg-brand_blue-100 text-black placeholder:text-black border-none rounded"
            placeholder="Type your name"
            className="space-y-3 min-w-0 "
            label="Your name"
          />
          <Input
            inputClassName="bg-brand_pink-100 dark:!bg-brand_pink-100 dark:bg-brand_blue-100 text-black placeholder:text-black border-none rounded"
            placeholder="Type your mail"
            className="space-y-3 min-w-0"
            label="Your Mail"
          />
          <Input
            inputClassName="bg-brand_pink-100 dark:!bg-brand_pink-100 dark:bg-brand_blue-100 text-black placeholder:text-black border-none rounded"
            placeholder="Type your subject"
            className="space-y-3 min-w-0"
            label="Subject"
          />
        </div>
        <div className="w-full h-full">
          <TextArea
            rows={getTextAreaRows()}
            label="Message"
            divClass="space-y-3 w-full min-w-0"
            placeholder="Type your message..."
            className="bg-brand_pink-100 !dark:bg-brand_pink-100 text-black placeholder:text-black border-none rounded"
          />
        </div>
      </div>
      <div className=" bg-brand_blue-300 relative rounded-3xl w-full h-14 ">
        <Button className="bg-black text-white w-full h-full absolute -top-2 -left-2 rounded-2xl !font-normal">
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
