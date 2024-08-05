"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { auth, db } from "@/utils/firebase";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { config } from "@/utils/editor";
import Input from "@/ui/form/Input";
import InputFile from "@/ui/form/FileInput";
import RadioInput from "@/ui/form/Radio";
import Button from "@/ui/form/Button";
import Pills from "@/ui/components/Pills";
import ImageWithFallback from "@/utils/Imgwithfallback";
import { get_tags } from "@/utils/function";
import { slugify } from "@/utils/slugify";
import { uploadFile } from "@/utils/uploadFile";
import { User, onAuthStateChanged } from "firebase/auth";
const initialState = {
  title: "",
  desc: "",
  tags: [],
  featuredImage: {
    url: "",
    alt: "",
  },
  isArchived: false,
  isFeatured: false,
  autherId: "gfjsrcOKFafEsa0cggW5",
};
const DashboardLayout = () => {
  const [tags, setTags] = useState<any>([]);
  const [fields, setFields] = useState(initialState);
  const [content, setContent] = useState("");
  const [user, setUser] = useState<User | null>();
  const [file, setFile] = useState<null | any>();
  const editor = useRef<any>(null);

  const postData = async () => {
    try {
      const timestamp = Timestamp.now();
      const docRef = await addDoc(collection(db, "Blogs"), {
        ...fields,
        slug: slugify(fields.title),
        content,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      console.log("Data written with ID:", docRef.id);
      setFields(initialState);
      setContent("");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  useEffect(() => {
    const getTags = async () => {
      const mytags = await get_tags();
      setTags(mytags);
    };
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
    // return () => unsubscribe();
    getTags();
    const runs = async () => {
      if (file) {
        const imageUrl = await uploadFile(file);
        setFields({
          ...fields,
          featuredImage: { url: imageUrl, alt: imageUrl },
        });
        setFile(null);
      }
    };
    file && runs();
  }, [file, fields]);
  const handleTagClick = (selectedTag: string) => {
    setFields((prevFields: any) => ({
      ...prevFields,
      tags: [...prevFields.tags, selectedTag],
    }));
  };
  // console.log(user);
  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="md:w-2/3 mx-auto p-4 flex flex-col gap-5">
        <p>Available Tags</p>
        <div className="flex gap-2">
          {tags.map((tag: any) => (
            <Pills
              key={tag.id}
              isIcon={false}
              handleClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </Pills>
          ))}
        </div>
        <div className="flex flex-col w-full gap-5">
          <Input
            placeholder="Blog title"
            className=""
            value={fields.title}
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
          />
          {fields.featuredImage.url ? (
            <div className="h-full w-full">
              <ImageWithFallback
                className="w-full h-full"
                alt=""
                src={fields.featuredImage.url}
              />
            </div>
          ) : (
            <div className="flex justify-between gap-5">
              <InputFile
                label="Image"
                onChange={(e: any) => setFile(e.target.files[0])}
                accept=".jpg, .png, .jpeg"
                name={file?.name}
                className="w-full"
              />
            </div>
          )}
          <Input
            placeholder="description"
            value={fields.desc}
            onChange={(e) => setFields({ ...fields, desc: e.target.value })}
          />
        </div>
        <div>
          <p>Archive Your blog</p>
          <div className="flex gap-10">
            <RadioInput
              checked={fields.isArchived}
              type="radio"
              name="archive"
              label="Yes"
              onChange={() =>
                setFields((prevFields) => ({
                  ...prevFields,
                  isArchived: true,
                }))
              }
            />
            <RadioInput
              checked={!fields.isArchived}
              type="radio"
              name="archive"
              label="No"
              onChange={() =>
                setFields((prevFields) => ({
                  ...prevFields,
                  isArchived: false,
                }))
              }
            />
          </div>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          config={{ ...config, iframe: true, useSplitMode: false }}
          onBlur={(newContent) => setContent(newContent)}
        />
        <div>
          <p>Tags in your blog</p>
          <div className="flex gap-5">
            {fields.tags.map((tag, index) => (
              <Pills isIcon={false} key={index}>
                {tag}
              </Pills>
            ))}
          </div>
        </div>
        <p>{content}</p>
        <Button className="" onClick={() => postData()}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayout;
