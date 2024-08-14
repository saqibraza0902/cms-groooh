import CommonLayout from "@/layout";
import ServicesLayout from "@/layout/services-layout";
import { services_page } from "@/utils/function";
import { IServicesPage } from "@/utils/types";
import React from "react";

const Services = async () => {
  const data: IServicesPage = await services_page();
  return (
    <CommonLayout>
      <ServicesLayout data={data.WebServices} />
    </CommonLayout>
  );
};

export default Services;
