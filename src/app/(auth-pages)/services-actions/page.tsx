"use client";
import CommonLayout from "@/layout";
import EditServices from "@/layout/edit-services";
import { services_title } from "@/utils/function";
import React, { useEffect, useState } from "react";

const EditService = () => {
  const [CARDSARRAY, setCARDSARRAY] = useState([]);
  const [serviceVal, setServiceVal] = useState("");
  const [subServices, setSubServices] = useState([]);
  const [sub_services, setSub_Services] = useState("");
  useEffect(() => {
    const gettitles = async () => {
      const data = await services_title();
      setCARDSARRAY(data);
    };

    gettitles();
  }, []);

  useEffect(() => {
    if (serviceVal) {
      const selectedService: any = CARDSARRAY.find(
        (item: any) => item.title === serviceVal
      );
      if (selectedService && selectedService.sub_services) {
        setSubServices(selectedService.sub_services);
      } else {
        setSubServices([]);
      }
    }
  }, [serviceVal, CARDSARRAY]);

  return (
    <CommonLayout>
      <div className="container w-2/3 mx-auto p-8">
        <div>
          <div className="mb-6">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={serviceVal}
              onChange={(e) => setServiceVal(e.target.value)}
            >
              <option disabled value="">
                Select the service
              </option>
              {CARDSARRAY.map((item: any) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          {serviceVal && (
            <div className="mb-6">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sub_services}
                onChange={(e) => setSub_Services(e.target.value)}
              >
                <option>Select the service to edit</option>
                {subServices.map((subService: any, index) => (
                  <option key={index} value={subService.url}>
                    {subService.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            {sub_services && (
              <EditServices main_category={serviceVal} title={sub_services} />
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default EditService;
