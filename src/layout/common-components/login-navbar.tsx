"use client";
import { useAppSelector } from "@/hooks/Hooks";
import ImageWithFallback from "@/utils/image-with-fallback";
import { auth, db, mydb } from "@/utils/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { ref } from "firebase/database";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";

import { useTheme } from "next-themes";
import { HiOutlineSun } from "react-icons/hi";
import { PUBLIC_URLS } from "@/utils/urls";
import { AUTH_NAV, PUBLIC_NAV } from "@/mock";
import Link from "next/link";
import Dropdown from "@/ui/components/drop-down";
const LoggedinNavbar = ({ toggle }: any) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>();
  const { items } = useAppSelector((s) => s.cart);
  const handleSignOut = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <nav className=" bg-brand_gray-400 dark:bg-brand_gray-700 h-16 flex justify-between items-center text-white px-6">
      <ul className="flex gap-4 items-center h-full">
        {PUBLIC_NAV.map((item, index) => (
          <Link className="hidden md:flex" key={index} href={item.pathname}>
            {item.title}
          </Link>
        ))}
        {!user && (
          <>
            <li
              onClick={() => router.push("/signin")}
              className="cursor-pointer"
            >
              Sign In
            </li>
            <li
              onClick={() => router.push("/signup")}
              className="cursor-pointer"
            >
              Sign Up
            </li>
          </>
        )}
      </ul>
      <ul className="flex items-center gap-5">
        <li onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <p
            className={` p-1 cursor-pointer rounded-md ${
              theme === "dark" ? "bg-brand_pink-400 " : "!bg-brand_gray-500"
            }`}
          >
            <HiOutlineSun color={theme === "dark" ? "#fff" : "#fff"} />
          </p>
        </li>
        <Link
          href="/cart"
          className="relative cursor-pointer"
          // onClick={() => router.push("/cart")}
        >
          <BsCart size={25} />
          <span className="absolute -top-2 bg-brand_red-800 w-4 text-sm h-5 flex justify-center items-center rounded-full -right-2">
            {items.length}
          </span>
        </Link>
        {user && (
          <div className="hidden lg:flex">
            {AUTH_NAV.map((item, index) => (
              <Dropdown item={item} key={index} />
            ))}
            <li onClick={() => toggle()}>
              <ImageWithFallback
                className="h-8 w-8 cursor-pointer rounded-full"
                src={user?.photoURL || ""}
                fallbackSrc="https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/logos%2Fprofile-alt.png?alt=media&token=6bc149ee-b3a8-4d9f-80b2-07a6f78fc785"
                alt=""
              />
            </li>
            <li onClick={() => handleSignOut()} className="cursor-pointer">
              Logout
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default LoggedinNavbar;
