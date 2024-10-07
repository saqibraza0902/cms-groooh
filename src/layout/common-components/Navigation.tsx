"use client";
import React, { useEffect, useState } from "react";
import ToggleSidebar from "./toggle-sidebar";
import Navbar from "./navbar-component";
import { auth, db } from "@/utils/firebase";
import LoggedinNavbar from "./login-navbar";
import { doc, getDoc } from "firebase/firestore";

const Navigation = () => {
  const [isOpen, setisOpen] = useState(false);
  const [isUser, setisUser] = useState<any>();
  const [mount, setMount] = useState(false);
  const toggleSideBar = () => {
    setisOpen(!isOpen);
  };
  useEffect(() => {
    setMount(true);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
      } else if (user) {
        const docRef = doc(db, "Users", user.uid as string);
        const docSnap = await getDoc(docRef);
        const data = { id: docSnap.id, ...docSnap.data() };
        setisUser(data);
      }
    });

    return () => unsubscribe();
  }, [isUser]);
  if (!mount) {
    return null;
  }
  return (
    <div>
      {isUser && isUser.isAdmin === true ? (
        <LoggedinNavbar toggle={toggleSideBar} />
      ) : (
        <Navbar toggle={toggleSideBar} />
      )}
      <ToggleSidebar close={toggleSideBar} open={isOpen} />
    </div>
  );
};

export default Navigation;
