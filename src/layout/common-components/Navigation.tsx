"use client";
import React, { useEffect, useState } from "react";
import ToggleSidebar from "./toggle-sidebar";
import Navbar from "./navbar-component";
import { auth } from "@/utils/firebase";
import LoggedinNavbar from "./login-navbar";

const Navigation = () => {
  const [isOpen, setisOpen] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [mount, setMount] = useState(false);

  const toggleSideBar = () => {
    setisOpen(!isOpen);
  };

  useEffect(() => {
    setMount(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setisUser(false);
      } else if (user) {
        setisUser(true);
      }
    });

    return () => unsubscribe();
  }, [isUser]);
  if (!mount) {
    return null;
  }
  return (
    <div>
      {isUser ? (
        <LoggedinNavbar toggle={toggleSideBar} />
      ) : (
        <Navbar toggle={toggleSideBar} />
      )}
      <ToggleSidebar close={toggleSideBar} open={isOpen} />
    </div>
  );
};

export default Navigation;
