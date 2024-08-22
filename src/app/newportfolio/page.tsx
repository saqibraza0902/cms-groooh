"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { app, db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { config } from "@/utils/editor";
import CommonLayout from "@/layout";
import { get_tags } from "@/utils/function";
import Pills from "@/ui/components/pills-component";
import Input from "@/ui/form/input-component";
import FileInput from "@/ui/form/file-input";
import { uploadFile } from "@/utils/uploadFile";
import RadioInput from "@/ui/form/radio-component";
import Button from "@/ui/form/button-component";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { ButtonLayout } from "@/ui/components/animated-button";
export interface IItem {
  url: string;
  alt: string;
}
const initialState = {
  title: "",
  desc: "",
  content: "",
  tags: [],
  gallery: [],
  client: {
    name: "",
    country: "",
    isIndividual: true,
  },
  isArchived: false,
  timeline: {
    start: new Date(),
    end: new Date(),
  },
  autherId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const NewPortfolio = () => {
  const [tags, setTags] = useState<any>([]);
  const [fields, setFields] = useState(initialState);
  const [file, setFile] = useState<null | any>();
  const postData = async () => {
    try {
      const docRef = await addDoc(collection(db, "Portfolio"), {
        ...fields,
        slug: slugify(fields.title),
      });
      console.log("Data written with ID:", docRef.id);
      setFields(initialState);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const handleInputChange = (e: any, n: string) => {
    const { value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      client: {
        ...prevState.client,
        [n]: value,
      },
    }));
  };
  useEffect(() => {
    const getTags = async () => {
      const mytags = await get_tags();
      setTags(mytags);
    };
    getTags();
    const runs = async () => {
      if (file) {
        const imageUrl = await uploadFile(file);
        setFields((prev: any) => ({
          ...prev,
          gallery: [
            ...prev.gallery,
            {
              url: imageUrl,
              alt: imageUrl,
            },
          ],
        }));
      }
    };
    runs();
  }, [file]);
  const handleTagClick = (selectedTag: string) => {
    setFields((prevFields: any) => {
      const alreadySelected = prevFields.tags.includes(selectedTag);
      const selectedTags = alreadySelected
        ? prevFields.tags.filter((tag: string) => tag !== selectedTag)
        : prevFields.tags.length < 5
        ? [...prevFields.tags, selectedTag]
        : prevFields.tags;

      return {
        ...prevFields,
        tags: selectedTags,
      };
    });
  };
  const storage = getStorage(app);
  const handleDiscard = async () => {
    for (const imageUrl of fields.gallery) {
      console.log("Image URL", imageUrl);
      // @ts-ignore
      const imageRef = ref(storage, imageUrl.url);
      try {
        console.log(imageRef);
        await deleteObject(imageRef);
        // @ts-ignore
        console.log(`Image deleted: ${imageUrl.url}`);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // Reset the form fields
    setFields(initialState);
    setFile(null);
  };
  return (
    <CommonLayout>
      <div className="flex justify-center w-full min-h-screen">
        <div className="md:w-2/3 mx-auto p-4 flex flex-col gap-5">
          <h2 className="text-center font-semibold text-3xl">
            Add new portfolio Item
          </h2>
          <p>Available Tags</p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag: { name: string; id: string }) => (
              <Pills
                key={tag.id}
                className={
                  // @ts-ignore
                  fields.tags.includes(tag.name)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }
                handleClick={() => handleTagClick(tag.name)}
              >
                {tag.name}
              </Pills>
            ))}
          </div>
          <div className="flex flex-col w-full gap-5">
            <Input
              placeholder="Portfolio title"
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
            />
            {fields.gallery.length > 0 && (
              <div className=" grid grid-cols-4">
                {fields.gallery.map((item: IItem, index) => (
                  <div className="h-20 w-20" key={index}>
                    <Image
                      height={80}
                      width={80}
                      className="w-full h-full"
                      alt=""
                      src={item.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between gap-5">
              <FileInput
                label="Image"
                onChange={(e: any) => setFile(e.target.files[0])}
                accept=".jpg, .png, .jpeg"
                name={file?.name}
                className="w-full"
              />
            </div>

            <Input
              placeholder="description"
              value={fields.desc}
              onChange={(e) => setFields({ ...fields, desc: e.target.value })}
            />
            <Input
              placeholder="Client Name"
              value={fields.client.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <Input
              placeholder="Country"
              value={fields.client.country}
              onChange={(e) => handleInputChange(e, "country")}
            />
            <div>
              <p>Individual</p>
              <div className="flex gap-10">
                <RadioInput
                  checked={fields.client.isIndividual}
                  type="radio"
                  name="isIndividual"
                  label="Yes"
                  onChange={() =>
                    setFields((prevFields) => ({
                      ...prevFields,
                      client: {
                        ...prevFields.client,
                        isIndividual: true,
                      },
                    }))
                  }
                />
                <RadioInput
                  checked={!fields.client.isIndividual}
                  type="radio"
                  name="isIndividual"
                  label="No"
                  className="bg-gray-500"
                  onChange={() =>
                    setFields((prevFields) => ({
                      ...prevFields,
                      client: {
                        ...prevFields.client,
                        isIndividual: false,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <p>Timeline</p>
            <div className="flex flex-col lg:flex-row gap-10">
              <Input type="datetime-local" label="Start Date" />
              <Input type="datetime-local" label="End Date" />
            </div>
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
                className="bg-gray-500"
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
            value={fields.content}
            config={config}
            onBlur={(newContent) =>
              setFields({ ...fields, content: newContent })
            }
          />

          <div className="flex gap-10 w-8/12 mx-auto">
            <div className="w-full" onClick={() => postData()}>
              <ButtonLayout className="">Submit</ButtonLayout>
            </div>
            <div className="w-full" onClick={() => handleDiscard()}>
              <ButtonLayout className="bg-red-600">Discard</ButtonLayout>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default NewPortfolio;
