"use client";
import CommonLayout from "@/layout";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { BiEdit, BiTrash } from "react-icons/bi";
import Link from "next/link";
import { MdManageHistory } from "react-icons/md";
import Modal from "@/ui/components/modal-component";
import { IItem } from "@/layout/auth-pages/add-portfolio";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Input from "@/ui/form/input-component";
import { IPortfolio } from "@/utils/types";
import Button from "@/ui/form/button-component";
import { uploadFile } from "@/utils/uploadFile";
import FileInput from "@/ui/form/file-input";
import Image from "next/image";
import Loader from "@/ui/components/loader-component";
import { FIREBASE_URLS } from "@/utils/urls";
import ContentLayout from "@/ui/components/content-layout";
import RichTextEditor from "@/utils/text-editor";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};
const PortfolioActionsLayout = () => {
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [fields, setFields] = useState<any>();
  const [file, setFile] = useState<null | any>();
  const [progress, setProgress] = useState(0);
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/portfolio`,
    fetcher
  );
  const {
    data: postData,
    mutate: mutatePost,
    isLoading: isPostLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/portfolio/${slug}`, fetcher);
  console.log("This is data", postData);
  const removeItemFromGallery = (indexToRemove: number) => {
    const updatedGallery = [...fields.gallery];
    updatedGallery.splice(indexToRemove, 1);
    setFields((prevFields: any) => ({
      ...prevFields,
      gallery: updatedGallery,
    }));
  };
  const handleInputChange = (e: any, n: string) => {
    const { value } = e.target;
    setFields((prevState: any) => ({
      ...prevState,
      client: {
        ...prevState.client,
        [n]: value,
      },
    }));
  };
  useEffect(() => {
    if (postData) {
      setFields(postData);
    }
  }, [postData]);
  const handleUpdate = async (id: string) => {
    const washingtonRef = doc(db, "Portfolio", id);
    await updateDoc(washingtonRef, fields);
    mutate();
  };
  const deleteDocument = async (documentId: string) => {
    try {
      const a = await deleteDoc(doc(db, "Portfolio", documentId));
      console.log("Document successfully deleted!", a);
      mutate();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  useEffect(() => {
    const runs = async () => {
      if (file) {
        const imageUrl = await uploadFile(
          file,
          FIREBASE_URLS.PROJECTS_IMAGES,
          setProgress
        );
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
  return (
    <>
      {isLoading && (
        <div className="flex justify-start mx-auto items-center h-screen w-max">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 p-10 ">
        {data?.map((post: IPortfolio, index: number) => (
          <div key={index} className="relative">
            <div className="flex justify-between">
              <BiTrash
                onClick={() => {
                  setDelOpen(true);
                  setId(post.id);
                }}
                className="absolute cursor-pointer z-50 top-6 left-5"
                color="#a0a0a0"
                size={25}
              />

              <BiEdit
                onClick={() => {
                  setEditOpen(true);
                  setId(post.id);
                  setSlug(post.slug);
                }}
                className="absolute cursor-pointer top-6 z-50 right-5"
                color="#a0a0a0"
                size={25}
              />
            </div>
            <ContentLayout
              item={{
                desc: post?.desc,
                image: post?.gallery[0]?.url,
                slug: post.slug,
                title: post.title,
                isPortfolio: true,
              }}
            />
          </div>
        ))}
      </div>
      <Modal isOpen={editOpen}>
        <div className="overflow-y-auto mx-auto dark:text-black w-full bg-transparent h-max p-10 rounded-xl !bg-white">
          {isPostLoading ? (
            <p>
              <Loader />
            </p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Edit</h1>
              <div className="flex flex-col w-full gap-5">
                <Input
                  placeholder="Portfolio title"
                  value={fields?.title ? fields.title : ""}
                  onChange={(e) =>
                    setFields({ ...fields, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Portfolio desc"
                  value={fields?.desc ? fields?.desc : ""}
                  onChange={(e) =>
                    setFields({ ...fields, desc: e.target.value })
                  }
                />
                <Input
                  placeholder="Client Name"
                  value={fields?.client?.name ? fields?.client?.name : ""}
                  onChange={(e) => handleInputChange(e, "name")}
                />
                <Input
                  placeholder="Country"
                  value={fields?.client?.country ? fields?.client?.country : ""}
                  onChange={(e) => handleInputChange(e, "country")}
                />
                <div>
                  <p>Individual</p>
                  <div className="flex gap-10">
                    <div className="flex gap-5">
                      <label>Yes</label>
                      <input
                        checked={fields?.client?.isIndividual}
                        type="radio"
                        name="indi"
                        title="Yes"
                        onChange={() =>
                          setFields((prevFields: any) => ({
                            ...prevFields,
                            client: {
                              ...prevFields?.client,
                              isIndividual: true,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="flex gap-5">
                      <label>No</label>

                      <input
                        checked={!fields?.client?.isIndividual}
                        type="radio"
                        name="indi"
                        title="No"
                        className="bg-gray-500"
                        onChange={() =>
                          setFields((prevFields: any) => ({
                            ...prevFields,
                            client: {
                              ...prevFields?.client,
                              isIndividual: false,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
                {progress > 0 && <p>Upload progress: {progress}%</p>}
                {fields?.gallery?.length > 0 && (
                  <div className=" grid grid-cols-4">
                    {fields.gallery.map((item: IItem, index: number) => (
                      <div key={index} className="h-20 w-20">
                        <Image
                          height={80}
                          width={80}
                          className="w-full h-full"
                          alt=""
                          src={item.url}
                        />
                        <button onClick={() => removeItemFromGallery(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FileInput
                  label="Image"
                  onChange={(e: any) => setFile(e.target.files[0])}
                  accept=".jpg, .png, .jpeg"
                  name={file?.name}
                  className="w-full"
                />
                {fields?.content && (
                  <div>
                    <RichTextEditor
                      value={fields?.content}
                      onChange={(newContent: any) => {
                        setFields({ ...fields, content: newContent.value });
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex w-full h-10 gap-5 mt-5">
                <Button
                  onClick={() => {
                    handleUpdate(id);
                    setId("");
                    setEditOpen(false);
                  }}
                  className="bg-brand_green-600  text-white "
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setEditOpen(!editOpen);
                    setId("");
                  }}
                  className="bg-brand_gray-500 text-white "
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
      <Modal isOpen={delOpen}>
        <div className="h-full !bg-white lg:w-2/3 mx-auto p-10 my-auto rounded-xl">
          <h1 className="text-2xl  font-bold mb-4 ">Actions</h1>
          <p>Are you sure you want to delete this item</p>
          <div className="flex w-full h-10 gap-5 mt-5">
            <Button
              onClick={() => {
                deleteDocument(id);
                setDelOpen(false);
              }}
              className="bg-brand_red-800 w-full text-white rounded-lg"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setDelOpen(false);
                setId("");
              }}
              className="bg-brand_gray-700  text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PortfolioActionsLayout;
