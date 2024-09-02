"use client";
import WithAuthLayout from "@/layout/with-auth-layout";
import Button from "@/ui/form/button-component";
import Input from "@/ui/form/input-component";
import InputFile from "@/ui/form/file-input";
import { config } from "@/utils/editor";
import { app, db } from "@/utils/firebase";
import { uploadFile } from "@/utils/uploadFile";
import { addDoc, collection } from "firebase/firestore";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { QuillEditor } from "@/utils/quill-editor";
import { FIREBASE_URLS } from "@/utils/urls";

const initialState = {
  title: "",
  price: null,
  type: "",
  subtype: "",
  downloadUrl: "",
  image: "",
};
interface InitialProp {
  title: string;
  price: null | number;
  type: string;
  subtype: string;
  downloadUrl: string;
  image: string;
}
const NewCollectibles = () => {
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileprogress, setFileProgress] = useState(0);
  const [fields, setFields] = useState<InitialProp>(initialState);
  const [files, setFiles] = useState<{ image: null | any; file: null | any }>({
    image: null,
    file: null,
  });

  useEffect(() => {
    const runs = async () => {
      if (files.image) {
        const imageUrl = await uploadFile(
          files.image,
          FIREBASE_URLS.COLLECTIBLES_IMAGES,
          setProgress
        );
        setFields({ ...fields, image: imageUrl });
        setFiles({ ...files, image: null });
        alert("Image uploaded successfully");
      }

      if (files.file) {
        const fileUrl = await uploadFile(
          files.file,
          FIREBASE_URLS.COLLECTIBLES_FILES,
          setFileProgress
        );
        setFields({ ...fields, downloadUrl: fileUrl });
        setFiles({ ...files, file: null });
        alert("File uploaded successfully");
      }
    };
    files && runs();
  }, [files, fields]);
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "Collectibles"), {
        ...fields,
        content,
      });
      setFields(initialState);
      setContent("");
      setFiles({ file: null, image: null });
      console.log("Data written with ID:", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WithAuthLayout>
      <div className="md:w-3/4 p-2 md:p-5 gap-5 mx-auto">
        <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
          <Input
            label="Title"
            value={fields.title}
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
            className="w-full"
          />

          <Input
            label="Price"
            value={fields.price ? fields.price : ""}
            onChange={(e) =>
              setFields({ ...fields, price: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
          <Input
            label="Type"
            value={fields.type}
            onChange={(e) => setFields({ ...fields, type: e.target.value })}
            className="w-full"
          />

          <Input
            label="Sub Type"
            value={fields.subtype}
            onChange={(e) => setFields({ ...fields, subtype: e.target.value })}
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
          {fileprogress > 0 && <p>Upload progress: {fileprogress}%</p>}
          <InputFile
            label="File"
            onChange={(e: any) => {
              console.log(files.file);
              setFiles({ ...files, file: e.target.files[0] });
            }}
            accept=".zip"
            name={files.file?.name}
            title="file"
            className="w-full"
          />
          <div className="w-full">
            {progress > 0 && <p>Upload progress: {progress}%</p>}
            <label>Image</label>
            <label
              htmlFor="ff"
              className="cursor-pointer flex items-center gap-5 h-12 dark:bg-slate-400 w-full px-4  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-600 transition duration-300"
            >
              <BiPlus size={25} />
              {"Choose a file"}
            </label>
            <input
              id="ff"
              type="file"
              accept=".jpg, .png, .jpeg"
              className="hidden"
              onChange={(e: any) =>
                setFiles({ ...files, image: e.target.files[0] })
              }
              name={files.image?.name}
            />
          </div>
          {/* <InputFile
            label="Image"
            accept=".jpg, .png, .jpeg"
            onChange={(e: any) =>
              setFiles({ ...files, image: e.target.files[0] })
            }
            name={files.image?.name}
            className="w-full"
          /> */}
        </div>
        <div className="h-72">
          {/* <JoditEditor
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          /> */}
          <QuillEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="flex items-end mx-auto py-4 min-h-40 lg:w-2/3 gap-10 justify-center">
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
    </WithAuthLayout>
  );
};

export default NewCollectibles;
