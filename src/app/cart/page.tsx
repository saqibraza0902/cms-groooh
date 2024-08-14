"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/Hooks";
import CommonLayout from "@/layout";
import { addItem, decrementItem, removeItem } from "@/redux/slices/cart-slices";
import { ICollectible } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const removeCartItem = (item: any) => {
    dispatch(removeItem(item));
  };
  const incrementCartItem = (item: any) => {
    dispatch(addItem(item));
  };

  const decrementCartItem = (item: any) => {
    dispatch(decrementItem(item));
  };
  const totalSum = items.reduce(
    (acc, item: any) => acc + item.price * item.quantity,
    0
  );
  console.log(totalSum);
  return (
    <CommonLayout>
      <div className="h-full min-h-screen">
        {items.length === 0 && (
          <div className=" flex justify-center items-center">
            <p>Cart is empty</p>
          </div>
        )}
        <div className=" w-full p-5 overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className=" text-sm w-full bg-brand_blue-200 text-white whitespace-nowrap">
                <th className="px-4 py-3 font-medium rounded-l-lg">Image</th>
                <th className="px-4 py-3 font-medium text-center">Title</th>
                <th className="px-4 py-3 font-medium text-center">Type</th>
                <th className="px-4 py-3 font-medium text-center">Sub Type</th>
                <th className="px-4 py-3 font-medium text-center">Price</th>
                <th className="px-4 py-3 font-medium text-center ">Actions</th>
                <th className="px-4 py-3 font-medium text-center rounded-r-lg">
                  Sub Total
                </th>
              </tr>
            </thead>
            <tbody className="space-y-6">
              {items.map((post: any, index) => (
                <>
                  <tr className="h-6" />
                  <tr className=" bg-brand_gray-100 dark:text-black text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
                    <td className="px-4 py-3 text-center rounded-l-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        height={40}
                        width={40}
                        className="h-10 object-cover rounded-md w-20"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">{post.title}</td>
                    <td className="px-4 py-3 text-center ">{post.type}</td>
                    <td className="px-4 py-3 text-center ">{post.subtype}</td>
                    <td className="px-4 py-3 text-center ">$ {post.price}</td>
                    <td className="px-4 py-3 flex h-full items-center gap-3 justify-center">
                      <button
                        onClick={() => decrementCartItem(post)}
                        className="bg-brand_blue-300 relative text-white font-bold h-10 w-10 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                      >
                        <span className="absolute -top-1 -left-1 flex justify-center items-center bg-black h-full rounded-lg w-full">
                          -
                        </span>
                      </button>
                      <p className=" relative text-black font-bold h-12 w-11 py-1 flex items-center justify-center px-4 rounded-xl focus:outline-none focus:shadow-outline">
                        {post.quantity}
                      </p>
                      <button
                        onClick={() => incrementCartItem(post)}
                        className="bg-brand_blue-300 relative text-white font-bold h-10 w-10 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                      >
                        <span className="absolute -top-1 -left-1 flex justify-center items-center bg-black h-full rounded-lg w-full">
                          +
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center rounded-r-lg">
                      $ {post.price * post.quantity}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex px-5">
          <table className="w-full ">
            <tbody className="space-y-6">
              <tr className=" bg-brand_gray-100 flex h-16 rounded-lg justify-between items-center dark:text-black  whitespace-nowrap text-sm font-semibold">
                <td className="px-4 py-3 text-center rounded-l-lg">Total</td>
                <td className="px-8 py-3 text-center rounded-r-lg">
                  $ {totalSum}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Cart;
