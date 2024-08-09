import { AnimatedHeroNav, ButtonLayout } from "@/ui/components/AnimatedButton";
import { PUBLIC_URLS } from "@/utils/urls";
import Link from "next/link";
import React from "react";

const ContactComponent = () => {
  return (
    <div className="border-black space-y-3 border-[1px] py-10 px-5 mx-5 rounded-xl">
      <h3 className="text-center text-black text-xl font-semibold">
        Need it simpler and faster? We have a solution for you!
      </h3>
      <div className="flex justify-center ">
        <Link href={PUBLIC_URLS.CONTACT} className="">
          <ButtonLayout>Contact Us</ButtonLayout>
        </Link>
      </div>
    </div>
  );
};

export default ContactComponent;
