"use client";
import CommonLayout from "@/layout";
import { config } from "@/utils/editor";
import { db } from "@/utils/firebase";
// import { QuillEditor } from "@/utils/quill-editor";
import { addDoc, collection } from "firebase/firestore";
// import dynamic from "next/dynamic";
// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import React, { useState } from "react";
const initialState = {
  name: "",
  companyName: "",
  budget: "",
  email: "",
  type: "",
};
const NewQuery = () => {
  const [fields, setFields] = useState(initialState);
  const [projectInfo, setProjectInfo] = useState("");
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "Query"), {
        ...fields,
        projectInfo,
      });
      console.log("Data written with ID:", docRef.id);
      setFields(initialState);
      setProjectInfo("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CommonLayout>
      <div className="mx-auto p-2 md:p-5 flex flex-col gap-10 my-10 md:w-2/3">
        <input
          placeholder="Name"
          className="!bg-slate-300 outline-none border-none h-12 px-3"
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
        />
        <input
          placeholder="Company Name"
          className="!bg-slate-300 outline-none border-none h-12 px-3"
          value={fields.companyName}
          onChange={(e) =>
            setFields({ ...fields, companyName: e.target.value })
          }
        />
        <input
          placeholder="Email"
          className="!bg-slate-300 outline-none border-none h-12 px-3"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
        />
        <input
          placeholder="description"
          className="!bg-slate-300 outline-none border-none h-12 px-3"
          value={fields.budget}
          onChange={(e) => setFields({ ...fields, budget: e.target.value })}
        />
        <input
          placeholder="Type"
          className="!bg-slate-300 outline-none border-none h-12 px-3"
          value={fields.type}
          onChange={(e) => setFields({ ...fields, type: e.target.value })}
        />
        {/* <JoditEditor
          value={projectInfo}
          config={config}
          onBlur={(newContent) => setProjectInfo(newContent)}
        /> */}
        {/* <QuillEditor
          value={projectInfo}
          onChange={(newContent) => setProjectInfo(newContent)}
        /> */}
        <button
          onClick={() => handleSubmit()}
          className="w-2/3 mx-auto text-white bg-violet-600 h-10 rounded-md"
        >
          NewQuery
        </button>
      </div>
    </CommonLayout>
  );
};

export default NewQuery;
