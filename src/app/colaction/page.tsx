"use client";
import adminAuth from "@/hooks/adminAuth";
import CommonLayout from "@/layout";
import Modal from "@/ui/components/modal-component";
import Loader from "@/ui/components/loader-component";
import Button from "@/ui/form/button-component";
import Input from "@/ui/form/input-component";
import { config } from "@/utils/editor";
import { db } from "@/utils/firebase";
import { deleteCollectible } from "@/utils/function";
import { uploadFile } from "@/utils/uploadFile";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import dynamic from "next/dynamic";
import Image from "next/image";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import useSWR from "swr";
import { QuillEditor } from "@/utils/quill-editor";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};
const ColAction = () => {
  const [collectible, setCollectible] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    const get_data = async () => {
      try {
        setloading(true);
        const colRef = collection(db, "Collectibles");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollectible(data);
        setloading(true);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    get_data();
  }, []);
  const deleteCollectible = async (documentId: string) => {
    try {
      const a = await deleteDoc(doc(db, "Collectibles", documentId));
      const colRef = collection(db, "Collectibles");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCollectible(data);
      setId("");
      console.log("Document successfully deleted!", a);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const [fields, setFields] = useState<any>();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<{
    image: null | any;
    file: null | any;
  }>({
    image: null,
    file: null,
  });
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/collectibles/${id}`,
    fetcher
  );
  useEffect(() => {
    setFields(data);
    setContent(data?.content);
  }, [data]);
  useEffect(() => {
    const runs = async () => {
      if (files.image) {
        const imageUrl = await uploadFile(files.image);
        setFields({ ...fields, image: imageUrl });
        setFiles({ ...files, image: null });
      }

      if (files.file) {
        const fileUrl = await uploadFile(files.file);
        setFields({ ...fields, downloadUrl: fileUrl });
        setFiles({ ...files, file: null });
      }
    };
    files && runs();
  }, [files, fields]);
  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "Collectibles", id);
      const abc = await updateDoc(docRef, { ...fields, content });
      setEditOpen(false);
      const colRef = collection(db, "Collectibles");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCollectible(data);
      setId("");
      console.log("Data written with ID:", abc);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CommonLayout>
      {loading && (
        <div className="flex justify-start mx-auto items-center h-screen w-max">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
        {collectible.map((post: any) => (
          <div key={post.id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-80">
              <Image
                height={192}
                width={192}
                className="w-full h-48 object-cover object-center"
                src={post.image}
                alt={post.title}
              />
              <div className="p-4">
                <h2 className="text-gray-800 text-xl font-semibold">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600">Type: {post.type}</p>
                <p className="text-gray-600">Sub-Type: {post.subtype}</p>
                <p className="mt-2 text-gray-800 font-semibold">
                  ${post.price}
                </p>
                <div className="flex justify-between">
                  <BiEdit
                    onClick={() => {
                      setEditOpen(true);
                      setId(post.id);
                    }}
                    className="cursor-pointer "
                    size={25}
                    color="#000"
                  />
                  <BiTrash
                    color="#000"
                    onClick={() => {
                      setDelOpen(true);
                      setId(post.id);
                    }}
                    className="cursor-pointer"
                    size={25}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <Modal isOpen={delOpen} onClose={() => setDelOpen(false)}>
          <div className="h-full !bg-white lg::w-2/3  mx-auto p-10 my-auto rounded-xl">
            <h1 className="text-red-700 font-bold text-2xl">Delete</h1>
            <h2 className="text-lg py-5 text-black">
              Are you sure you want to delete this collectibe
            </h2>
            <div className="flex gap-5">
              <Button
                className="bg-brand_red-800"
                onClick={() => {
                  setDelOpen(false);
                  setId("");
                  deleteCollectible(id);
                }}
              >
                Confirm
              </Button>
              <Button
                className="bg-brand_gray-500"
                onClick={() => {
                  setId("");
                  setDelOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={editOpen} onClose={() => setEditOpen(false)}>
          <div className="h-full !bg-white dark:text-black w-full  mx-auto p-10 my-auto rounded-xl">
            {isLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
                  <div className="w-full">
                    <label>Title</label>
                    <Input
                      value={fields?.title}
                      onChange={(e) =>
                        setFields({ ...fields, title: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <label>Price</label>
                    <Input
                      value={fields?.price ? fields.price : ""}
                      onChange={(e) =>
                        setFields({ ...fields, price: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
                  <div className="w-full">
                    <label>Type</label>
                    <Input
                      value={fields?.type}
                      onChange={(e) =>
                        setFields({ ...fields, type: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <label>Sub Type</label>
                    <Input
                      value={fields?.subtype}
                      onChange={(e) =>
                        setFields({ ...fields, subtype: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
                  <div className="w-full">
                    {fields?.downloadUrl ? (
                      <div className="relative">
                        <RxCross1
                          className="absolute top-0 left-3"
                          size={25}
                          onClick={() =>
                            setFields({ ...fields, downloadUrl: "" })
                          }
                        />
                        <Button className="bg-red-500">Download URL</Button>
                      </div>
                    ) : (
                      <>
                        <label>File</label>
                        <Input
                          onChange={(e: any) =>
                            setFiles({ ...files, file: e.target.files[0] })
                          }
                          type="file"
                          accept=".zip"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                  <div className="w-full">
                    {fields?.image ? (
                      <div className="relative">
                        <Image
                          height={200}
                          width={200}
                          src={fields?.image}
                          alt=""
                          className="h-50 w-50 object-contain"
                        />
                        <RxCross1
                          className="absolute top-0 left-3"
                          size={25}
                          onClick={() => setFields({ ...fields, image: "" })}
                        />
                      </div>
                    ) : (
                      <>
                        <label>Image</label>
                        <Input
                          onChange={(e: any) =>
                            setFiles({ ...files, image: e.target.files[0] })
                          }
                          accept=".jpg, .png, .jpeg"
                          type="file"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full py-4 gap-10 justify-center">
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
                <div className="flex flex-col md:flex-row mx-auto py-4 lg:w-2/3 gap-10 justify-center">
                  <Button
                    onClick={() => handleSubmit()}
                    className="bg-brand_green-600"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => setEditOpen(false)}
                    className="bg-brand_gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </CommonLayout>
  );
};

export default adminAuth(ColAction);
