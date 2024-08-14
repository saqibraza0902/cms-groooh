"use client";
import adminAuth from "@/hooks/adminAuth";
import CommonLayout from "@/layout";
import Loader from "@/ui/components/loader-component";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiArrowFromRight } from "react-icons/bi";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";

const Queries = () => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [loading, setloading] = useState(false);
  const [query, setQuery] = useState<any>([]);
  useEffect(() => {
    const get_data = async () => {
      try {
        setloading(true);
        const colRef = collection(db, "Query");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuery(data);
        setloading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    get_data();
  }, []);
  const toggleRow = (id: string) => {
    setExpandedRows((prevRows) => ({
      ...prevRows,
      [id]: !prevRows[id],
    }));
  };
  return (
    <CommonLayout>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className=" w-full overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className=" text-sm  bg-yellow-400 whitespace-nowrap">
                <th className="px-4 py-3 font-medium rounded-l-xl">Name</th>
                <th className="px-4 py-3 font-medium text-center">
                  Company Name
                </th>
                <th className="px-4 py-3 font-medium text-center">Email</th>
                <th className="px-4 py-3 font-medium text-center">Type</th>
                <th className="px-4 py-3 font-medium text-center">Budget</th>
                <th className="px-4 py-3 font-medium text-center rounded-r-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="space-y-6">
              {query?.map((item: any, index: number) => (
                <>
                  <tr className="h-6" />
                  <tr className=" bg-slate-100 dark:text-black text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
                    <td className="px-4 py-3 text-center ">{item.name}</td>
                    <td className="px-4 py-3 text-center">
                      {item.companyName}
                    </td>
                    <td className="px-4 py-3 text-center ">{item.email}</td>
                    <td className="px-4 py-3 text-center ">{item.type}</td>
                    <td className="px-4 py-3 text-center ">{item.budget}</td>
                    <td
                      onClick={() => toggleRow(item.id)}
                      className="px-4 py-3 flex justify-center rounded-r-lg"
                    >
                      {expandedRows[item.id] ? (
                        <BsArrowRight />
                      ) : (
                        <BsArrowDown />
                      )}
                    </td>
                  </tr>
                  {expandedRows[item.id] && (
                    <tr>
                      <td colSpan={6} className="px-4 py-3">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.projectInfo }}
                        />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CommonLayout>
  );
};

export default adminAuth(Queries);
