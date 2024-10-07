import CommonLayout from "@/layout";
import BlogActionsLayout from "@/layout/auth-pages/blog-actions";
import WithAuthLayout from "@/layout/with-auth-layout";
import React from "react";

const BlogActions = () => {
  return (
    <WithAuthLayout>
      <BlogActionsLayout />
    </WithAuthLayout>
  );
};

export default BlogActions;
