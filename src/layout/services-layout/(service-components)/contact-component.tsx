import { ButtonLayout } from "@/ui/components/animated-button";
import { PUBLIC_URLS } from "@/utils/urls";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactComponent = () => {
  return (
    <div className="border-black space-y-3 border-[1px] py-10 px-5 rounded-xl mx-auto 2xl:w-[92%]">
      <h3 className="text-center text-black text-xl font-semibold">
        Need it simpler and faster? We have a solution for you!
      </h3>
      <div className="flex justify-center ">
        <Link href={PUBLIC_URLS.CONTACT} className="">
          <ButtonLayout
            className="min-w-36 max-h-11"
            Icon={
              <Image
                alt=""
                src="https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/navbar-icons%2FChat-Dot.svg?alt=media&token=7f7ae362-84ff-4e89-9fab-19b45ce9744d"
                height={30}
                width={30}
              />
            }
          >
            Contact Us
          </ButtonLayout>
        </Link>
      </div>
    </div>
  );
};

export default ContactComponent;
