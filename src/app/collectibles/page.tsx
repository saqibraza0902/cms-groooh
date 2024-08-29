"use client";
import { useAppDispatch } from "@/hooks/Hooks";
import CommonLayout from "@/layout";
import { addItem } from "@/redux/slices/cart-slices";
import CollectiblesBox from "@/ui/components/collectibles-box";
import Loader from "@/ui/components/loader-component";
import { db } from "@/utils/firebase";
import { ICollectible } from "@/utils/types";
import { PUBLIC_URLS } from "@/utils/urls";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

const Collectibles = () => {
  const [collectible, setCollectible] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [myTypes, setMyTypes] = useState<string[]>([]);
  const params = useSearchParams();
  const paramtype = params.get("t");

  useEffect(() => {
    const get_data = async () => {
      try {
        setloading(true);
        const a = await fetch(
          `/api/collectibles?mytype=${paramtype ? paramtype : ""}`
        );
        const b = await a.json();
        setCollectible(b.data);
        console.log(b);
        const subtypes = b.subtypes || []; // Ensure subtypes is an array
        setMyTypes(["All", ...subtypes]);
        setloading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    get_data();
  }, [paramtype]);

  return (
    <CommonLayout>
      <div className="bg-brand_blue-300 p-4 pt-10 pl-10 lg:pl-14 lg:pt-14  lg:p-14">
        <div className="flex justify-center pb-10 gap-5">
          {myTypes?.map((el, i) => (
            <Link
              className={`bg-brand_blue-100 cursor-pointer w-36 h-10 my-3 relative rounded-xl `}
              key={i}
              href={
                el === "All"
                  ? PUBLIC_URLS.COLLECTIBLES
                  : `${PUBLIC_URLS.COLLECTIBLES}/?t=${el}`
              }
            >
              <span
                className={`absolute capitalize flex justify-center items-center bg-black h-full rounded-lg text-white w-full text-sm -top-1 -left-1 ${
                  paramtype === el || (!paramtype && el === "All")
                    ? "bg-brand_gray-700"
                    : "bg-black"
                }`}
              >
                {el}
              </span>
            </Link>
          ))}
        </div>
        {loading && (
          <div className="flex justify-start mx-auto items-center h-screen w-max">
            <Loader />
          </div>
        )}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {collectible?.map((post: ICollectible, index: number) => (
              <CollectiblesBox item={post} key={index} />
            ))}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Collectibles;
