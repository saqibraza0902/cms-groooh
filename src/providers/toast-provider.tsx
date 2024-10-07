"use client";
import React from "react";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { headers } from "next/headers";

const ReactToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </>
  );
};

export default ReactToastProvider;
