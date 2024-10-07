import PortfolioActionsLayout from "@/layout/auth-pages/portfolio-actions";
import WithAuthLayout from "@/layout/with-auth-layout";
import React from "react";

const PortfolioActions = () => {
  return (
    <WithAuthLayout>
      <PortfolioActionsLayout />
    </WithAuthLayout>
  );
};

export default PortfolioActions;
