import CommonLayout from "@/layout";
import AddPortfolioLayout from "@/layout/auth-pages/add-portfolio";
import WithAuthLayout from "@/layout/with-auth-layout";
import React from "react";

const AddPortfolio = () => {
  return (
    <WithAuthLayout>
      <AddPortfolioLayout />
    </WithAuthLayout>
  );
};

export default AddPortfolio;
