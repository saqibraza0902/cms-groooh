"use client";
import React from "react";
import CommonLayout from "..";
import WithAuth from "@/hooks/withAuth";

interface IProp {
  children: React.ReactNode;
}
const WithAuthLayout = ({ children }: IProp) => {
  return (
    <CommonLayout>
      <div>{children}</div>
    </CommonLayout>
  );
};

export default WithAuth(WithAuthLayout);
