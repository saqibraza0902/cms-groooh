import CommonLayout from "@/layout";
import CollectiblesActions from "@/layout/auth-pages/collectibles-actions";
import WithAuthLayout from "@/layout/with-auth-layout";
import React from "react";

const CollectiblesAction = () => {
  return (
    <WithAuthLayout>
      <CollectiblesActions />
    </WithAuthLayout>
  );
};

export default CollectiblesAction;
