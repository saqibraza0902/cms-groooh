import CommonLayout from "@/layout";
import DashboardLayout from "@/layout/NewBlog";
import WithAuthLayout from "@/layout/WithAuthLayout";
import React from "react";

const Dashboard = () => {
  const content = (
    <WithAuthLayout>
      <DashboardLayout />
    </WithAuthLayout>
  );
  return content;
};
export default Dashboard;
