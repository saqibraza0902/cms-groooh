import { ICollectible } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CartButton } from "../AnimatedButton";
import { useAppDispatch } from "@/hooks/Hooks";
import { addItem } from "@/redux/slices/cartSlices";

interface IProp {
  item: ICollectible;
}
const CollectiblesBox = ({ item }: IProp) => {
  const dispatch = useAppDispatch();
  const addToCart = async (item: any) => {
    try {
      dispatch(addItem(item));
      console.log("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  };
  return (
    <div className="!h-96 rounded-[46px] bg-black relative w-full">
      <div className="bg-white !h-full rounded-[30px] absolute -top-4 w-full -left-4">
        <div className="w-full ">
          <div className="h-full p-4 w-full mx-auto">
            <Link href={`/collectibles/${item.id}`}>
              <Image
                width={300}
                height={300}
                className="w-full h-56 rounded-[14px] object-cover object-center"
                src={item.image}
                alt={item.title}
              />
            </Link>
            <Link
              href={`/collectibles/${item.id}`}
              className="line-clamp-2 min-h-14 text-black font-bold my-2 text-xl"
            >
              {item.title}
            </Link>
            <div className="flex justify-between items-center ">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-black">Sub-Type:</p>
                  <p className="text-gray-600"> {item.subtype}</p>
                </div>
              </div>
              <div
                onClick={() => addToCart(item)}
                className="bg-brand_blue-300  hidden md:flex cursor-pointer w-36 h-10 my-3 relative rounded-xl"
              >
                <div className="absolute capitalize w-full text-sm -top-1 -left-1">
                  <CartButton text={JSON.stringify(item.price)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiblesBox;
