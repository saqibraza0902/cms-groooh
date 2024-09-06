"use client";
import React, { useEffect, useState } from "react";
import { app, db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { get_tags } from "@/utils/function";
import Pills from "@/ui/components/pills-component";
import Input from "@/ui/form/input-component";
import FileInput from "@/ui/form/file-input";
import { uploadFile } from "@/utils/uploadFile";
import RadioInput from "@/ui/form/radio-component";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { ButtonLayout } from "@/ui/components/animated-button";
import { FIREBASE_URLS } from "@/utils/urls";
import { ProjectSchema } from "@/schema";
import { toast } from "react-toastify";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
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
const AddPortfolioLayout = () => {
  const [tags, setTags] = useState<any>([]);
  const [fields, setFields] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const [file, setFile] = useState<null | any>();
  const postData = async () => {
    try {
      const response = ProjectSchema.safeParse({
        title: fields.title,
        desc: fields.desc,
        content: content,
        gallery: fields.gallery.map((image: any) => ({
          url: image.url,
          alt: image.alt,
        })),
        clientName: fields.client.name,
        clientCountry: fields.client.country,
        startDate: fields.timeline.start,
        endDate: fields.timeline.end,
        tags: fields.tags,
      });
      if (!response.success) {
        let errArr: any[] = [];
        const { errors: err } = response.error;
        for (var i = 0; i < err.length; i++) {
          errArr.push({ for: err[i].path[0], message: err[i].message });
        }
        setErrors(errArr);
        throw err;
      }
      await addDoc(collection(db, "Portfolio"), {
        ...fields,
        content: content,
        slug: slugify(fields.title),
      });
      console.log(content);
      setFields(initialState);
      setContent("");
      setFile(null);
      setErrors([]);
      toast.success("Project Added");
    } catch (error) {
      toast.error("Error processing this request");

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
        const imageUrl = await uploadFile(
          file,
          FIREBASE_URLS.PROJECTS_IMAGES,
          setProgress
        );
        setProgress(0);
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
    <>
      <div className="flex justify-center w-full min-h-screen">
        <div className="md:w-2/3 mx-auto p-4 flex flex-col gap-5">
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
          {errors.find((error) => error.for === "tags") && (
            <div className="mt-1 text-xs text-red-500">
              {errors.find((error) => error.for === "tags")?.message}
            </div>
          )}
          <div className="flex flex-col w-full gap-5">
            <Input
              placeholder="Portfolio title"
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
            />
            {errors.find((error) => error.for === "title") && (
              <div className="mt-1 text-xs text-red-500">
                {errors.find((error) => error.for === "title")?.message}
              </div>
            )}
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
            <div className="space-y-5">
              {progress > 0 && <p>Upload progress: {progress}%</p>}
              <FileInput
                label="Image"
                onChange={(e: any) => setFile(e.target.files[0])}
                accept=".jpg, .png, .jpeg"
                name={file?.name}
                className="w-full"
              />
            </div>
            {errors.find((error) => error.for === "gallery") && (
              <div className="mt-1 text-xs text-red-500">
                {errors.find((error) => error.for === "gallery")?.message}
              </div>
            )}
            <Input
              placeholder="description"
              value={fields.desc}
              onChange={(e) => setFields({ ...fields, desc: e.target.value })}
            />
            {errors.find((error) => error.for === "desc") && (
              <div className="mt-1 text-xs text-red-500">
                {errors.find((error) => error.for === "desc")?.message}
              </div>
            )}

            <Input
              placeholder="Client Name"
              value={fields.client.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            {errors.find((error) => error.for === "clientName") && (
              <div className="mt-1 text-xs text-red-500">
                {errors.find((error) => error.for === "clientName")?.message}
              </div>
            )}
            <Input
              placeholder="Country"
              value={fields.client.country}
              onChange={(e) => handleInputChange(e, "country")}
            />
            {errors.find((error) => error.for === "clientCountry") && (
              <div className="mt-1 text-xs text-red-500">
                {errors.find((error) => error.for === "clientCountry")?.message}
              </div>
            )}
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
              {errors.find((error) => error.for === "startDate") && (
                <div className="mt-1 text-xs text-red-500">
                  {errors.find((error) => error.for === "startDate")?.message}
                </div>
              )}
              <Input type="datetime-local" label="End Date" />
              {errors.find((error) => error.for === "endDate") && (
                <div className="mt-1 text-xs text-red-500">
                  {errors.find((error) => error.for === "endDate")?.message}
                </div>
              )}
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
          <div className="h-72">
            <FroalaEditor
              tag="textarea"
              config={{
                height: 300,
              }}
              model={content}
              onModelChange={(newContent: any) => setContent(newContent)}
            />
            {errors.find((error) => error.for === "content") && (
              <div className="mt-1 text-xs text-red-500">
                {errors.find((error) => error.for === "content")?.message}
              </div>
            )}
          </div>
          <div className="flex gap-10 h-40 items-end w-8/12 mx-auto">
            <div className="w-full" onClick={() => postData()}>
              <ButtonLayout className="">Submit</ButtonLayout>
            </div>
            <div className="w-full" onClick={() => handleDiscard()}>
              <ButtonLayout className="bg-red-600">Discard</ButtonLayout>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPortfolioLayout;
