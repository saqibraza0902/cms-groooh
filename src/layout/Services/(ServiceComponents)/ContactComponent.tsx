import { AnimatedHeroNav } from "@/ui/components/AnimatedButton";
import { PUBLIC_URLS } from "@/utils/urls";
import Link from "next/link";
import React from "react";

const ContactComponent = () => {
  return (
    <div className="border py-10 px-5 mx-5 rounded-xl">
      <h3 className="text-center text-xl font-semibold">
        Need it simpler and faster? We have a solution for you!
      </h3>
      <div className="flex justify-center ">
        <div className="bg-white dark:bg-black min-w-36 w-min h-10 my-3 relative rounded-xl">
          <Link
            href={PUBLIC_URLS.CONTACT}
            className="absolute capitalize text-sm -top-1 -left-1"
          >
            <AnimatedHeroNav
              className="bg-black  h-10 min-w-36"
              text="CONTACT US"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
