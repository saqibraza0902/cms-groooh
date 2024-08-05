"use client";
import CommonLayout from "@/layout";
import Button from "@/ui/form/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Custom404 = () => {
  const router = useRouter();
  return (
    <CommonLayout>
      <div className="h-screen bg-brand_gray-400 flex-col text-2xl flex justify-center items-center">
        <span>Page not Not Found</span>
        <div className="w-3/12 mx-auto">
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Custom404;
