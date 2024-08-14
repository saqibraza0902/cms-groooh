import CommonLayout from "@/layout";
import DashboardLayout from "@/layout/new-blog";
import WithAuthLayout from "@/layout/with-auth-layout";
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
