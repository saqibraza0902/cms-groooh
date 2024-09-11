"use client";
import CommonLayout from "@/layout";
import Modal from "@/ui/components/modal-component";
import Loader from "@/ui/components/loader-component";
import Button from "@/ui/form/button-component";
import FileInput from "@/ui/form/file-input";
import Input from "@/ui/form/input-component";
import { db } from "@/utils/firebase";
import { slugify } from "@/utils/slugify";
import { IBlog } from "@/utils/types";
import { uploadFile } from "@/utils/uploadFile";
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { MdManageHistory } from "react-icons/md";
import useSWR from "swr";
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
const BlogActionsLayout = () => {
  const [delOpen, setDelOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [fields, setFields] = useState<any>();
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<null | any>();
  const [id, setId] = useState("");
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/posts`,
    fetcher
  );
  const {
    data: postData,
    mutate: mutatePost,
    isLoading: isPostLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/posts/${slug}`, fetcher);

  const deleteCollectible = async (documentId: string) => {
    try {
      const a = await deleteDoc(doc(db, "Blogs", documentId));
      mutate();
      setId("");
      console.log("Document successfully deleted!", a);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const removeItemFromGallery = () => {
    setFields((prevFields: any) => ({
      ...prevFields,
      featuredImage: {
        alt: "",
        url: "",
      },
    }));
  };

  useEffect(() => {
    setFields(postData);
    console.log(postData);
  }, [postData]);
  const handleUpdate = async (id: string) => {
    const timestamp = Timestamp.now();
    const washingtonRef = doc(db, "Blogs", id);
    const abc = await updateDoc(washingtonRef, {
      autherId: fields.autherId,
      content: fields.content,
      desc: fields.desc,
      featuredImage: fields.featuredImage,
      isArchived: fields.isArchived,
      isFeatured: fields.isFeatured,
      tags: fields.tags,
      title: fields.title,
      slug: slugify(fields.title),
      updatedAt: timestamp,
    });
    mutatePost();
    console.log(abc);
    setId("");
  };

  useEffect(() => {
    const runs = async () => {
      if (file) {
        const imageUrl = await uploadFile(
          file,
          FIREBASE_URLS.BLOGS_IMAGES,
          setProgress
        );
        setFields({
          ...fields,
          featuredImage: { url: imageUrl, alt: imageUrl },
        });
        setFile(null);
      }
    };
    file && runs();
  }, [file, fields]);
  return (
    <>
      {isLoading && (
        <div className="flex justify-start mx-auto items-center h-screen w-max">
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 p-10 ">
        {data?.map((post: IBlog, index: number) => (
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
                image: post?.featuredImage?.url,
                slug: post.slug,
                title: post.title,
                isBlog: true,
              }}
            />
            {/* {post.featuredImage.url ? (
              <div className="relative h-80 group">
                <Image
                  fill={true}
                  className=""
                  alt={post.featuredImage?.alt}
                  src={post.featuredImage?.url}
                />
                <BiTrash
                  onClick={() => {
                    setDelOpen(true);
                    setId(post.id);
                  }}
                  className="absolute cursor-pointer top-5 left-5"
                  color="#a0a0a0"
                  size={25}
                />

                <BiEdit
                  onClick={() => {
                    setEditOpen(true);
                    setId(post.id);
                    setSlug(post.slug);
                  }}
                  className="absolute cursor-pointer top-5 right-5"
                  color="#a0a0a0"
                  size={25}
                />
              </div>
            ) : (
              <div className="h-80 w-full bg-slate-400">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/actions?id=${post?.id}&slug=portfolio`}>
                    <MdManageHistory />
                  </Link>
                </div>
              </div>
            )}
            <Link className="cursor-pointer" href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-justify line-clamp-2">{post.desc}</p>
            </Link> */}
          </div>
        ))}
      </div>
      <Modal isOpen={delOpen} onClose={() => setDelOpen(false)}>
        <div className="h-full !bg-white lg:w-2/3  mx-auto p-10 my-auto rounded-xl">
          <h1 className="text-brand_red-800 font-bold text-2xl">Delete</h1>
          <h2 className="text-lg py-5 text-black">
            Are you sure you want to delete this Blog
          </h2>
          <div className="flex gap-5">
            <Button
              className="bg-brand_red-800 "
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
        <div className="overflow-y-auto bg-white h-full p-5 rounded-xl">
          {isPostLoading ? (
            <p>
              <Loader />
            </p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4 text-black">Edit</h1>
              <div className="flex flex-col text-black w-full gap-5">
                <Input
                  placeholder="Portfolio title"
                  value={fields?.title ? fields?.title : ""}
                  onChange={(e) =>
                    setFields({ ...fields, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Blog title"
                  value={fields?.desc ? fields.desc : ""}
                  onChange={(e) =>
                    setFields({ ...fields, desc: e.target.value })
                  }
                />
                {progress > 0 && <p>Upload progress: {progress}%</p>}
                {fields?.featuredImage?.url && (
                  <div className=" grid grid-cols-4">
                    <div className="h-20 w-20">
                      <Image
                        width={80}
                        height={80}
                        className="w-full h-full"
                        alt=""
                        src={fields.featuredImage.url}
                      />
                      <button
                        className="text-black"
                        onClick={() => removeItemFromGallery()}
                      >
                        Remove
                      </button>
                    </div>
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
                      value={fields.content}
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
                    setEditOpen(false);
                  }}
                  className="bg-brand_green-600  text-white"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setEditOpen(false);
                    setId("");
                  }}
                  className="bg-brand_gray-500  text-white "
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default BlogActionsLayout;
