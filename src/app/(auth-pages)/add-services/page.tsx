"use client";
import CommonLayout from "@/layout";
import GalleryInput from "@/ui/form/gallery-input";
import { app, db } from "@/utils/firebase";
import { get_images_from_firebase } from "@/utils/function";
import { slugify } from "@/utils/slugify";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface IExpertise {
  id: number;
  title: string;
  description: string;
  image: string;
}
interface ITechStack {
  id: number;
  title: string;
  image: string;
}
const AddNewService = () => {
  const [heroImage, setHeroImage] = useState<string>("");
  const [expertise, setExpertise] = useState<IExpertise[]>([]);
  const [tech_stack, setTechStack] = useState<ITechStack[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [heroText, setHeroText] = useState<string>("");
  const [expertiseTitle, setExpertiseTitle] = useState<string>("");
  const [heroImageUrl, setHeroImageUrl] = useState<string>("");
  const [galleryStates, setGalleryStates] = useState<{
    heroImage: boolean;
    expertise: boolean[];
    techStack: boolean[];
  }>({
    heroImage: false,
    expertise: [],
    techStack: [],
  });

  useEffect(() => {
    const getAllImages = async () => {
      const folders = ["logos", "", "images"];
      const imageUrl = [];
      for (const folder of folders) {
        const urls = await get_images_from_firebase(`/${folder}/`);
        imageUrl.push(...urls);
      }
      setImageUrls(imageUrl);
    };
    getAllImages();
  }, []);

  const handleOpenGallery = (type: string, index?: number) => {
    console.log(type, index);
    setGalleryStates((prevState) => {
      if (type === "heroImage") {
        return { ...prevState, heroImage: true };
      } else if (type === "expertise") {
        const updatedExpertise = [...prevState.expertise];
        if (typeof index !== "undefined") {
          updatedExpertise[index] = true;
        }
        return { ...prevState, expertise: updatedExpertise };
      } else if (type === "techStack") {
        const updatedTechStack = [...prevState.techStack];
        if (typeof index !== "undefined") {
          updatedTechStack[index] = true;
        }
        return { ...prevState, techStack: updatedTechStack };
      }
      return prevState; // default return to avoid returning undefined
    });
  };

  const handleCloseGallery = (type: string, index?: number) => {
    setGalleryStates((prevState) => {
      if (type === "heroImage") {
        return { ...prevState, heroImage: false };
      } else if (type === "expertise") {
        const updatedExpertise = [...prevState.expertise];
        if (typeof index !== "undefined") {
          updatedExpertise[index] = false;
        }
        return { ...prevState, expertise: updatedExpertise };
      } else if (type === "techStack") {
        const updatedTechStack = [...prevState.techStack];
        if (typeof index !== "undefined") {
          updatedTechStack[index] = false;
        }
        return { ...prevState, techStack: updatedTechStack };
      }
      return prevState; // default return to avoid returning undefined
    });
  };

  const addExpertise = () => {
    setExpertise([
      ...expertise,
      {
        id: expertise.length + 1,
        title: "",
        description: "",
        image: "",
      },
    ]);
  };
  const addTechStack = () => {
    setTechStack([
      ...tech_stack,
      {
        id: tech_stack.length + 1,
        title: "",
        image: "",
      },
    ]);
  };

  const handleImageChange = (index: number, url: string) => {
    setExpertise(
      expertise.map((item, i) => (i === index ? { ...item, image: url } : item))
    );
  };

  const handleTitleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const title = e.target.value;
    setExpertise(
      expertise.map((item, i) => (i === index ? { ...item, title } : item))
    );
  };
  const handleTechTitleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const title = e.target.value;
    setTechStack(
      tech_stack.map((item, i) => (i === index ? { ...item, title } : item))
    );
  };
  const handleTechImageChange = (index: number, url: string) => {
    setTechStack(
      tech_stack.map((item, i) =>
        i === index ? { ...item, image: url } : item
      )
    );
  };
  const handleDescriptionChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const description = e.target.value;
    setExpertise(
      expertise.map((item, i) =>
        i === index ? { ...item, description } : item
      )
    );
  };

  const handleSubmit = async () => {
    const id = uuidv4();
    const newDoc = {
      url: `${slugify(pageTitle)}`,
      title: pageTitle,
      id: id,
      hero_section: {
        image: heroImageUrl,
        text: heroText,
      },
      expertise_section: {
        title: expertiseTitle,
        expertise: expertise.map(({ id, title, description, image }) => ({
          title,
          description,
          image,
        })),
      },
      tech_stack: tech_stack.map(({ title, image }) => ({ title, image })),
    };
    const docRef = doc(db, "Pages", "SERVICES");
    await updateDoc(docRef, {
      [`${mainCategory}.services`]: arrayUnion(newDoc),
    });

    alert("Data submitted successfully!");
  };
  return (
    <CommonLayout>
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="font-bold text-4xl text-center mb-8">
          Create a new service page
        </h2>
        <h2 className="font-bold text-2xl text-left mb-8">Other Details</h2>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Title of the page
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Please input the title of the page"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Please select the main category
          </label>
          <select
            className="w-full border border-gray-300 p-2 rounded-md"
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
          >
            <option value={"SERVICE_1"}>Design</option>
            <option value={"SERVICE_2"}>Development</option>
            <option value={"SERVICE_3"}>Marketing</option>
          </select>
        </div>
        <h2 className="font-bold text-2xl text-left mb-8">Hero Section</h2>
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <GalleryInput
              id="heroImage"
              type="text"
              images={galleryStates.heroImage ? imageUrls : []}
              value={heroImage}
              onSelectImage={(url) => {
                setHeroImageUrl(url);
              }}
              placeholder="Enter the url of image"
              onOpenGallery={() => handleOpenGallery("heroImage")}
              onCloseGallery={() => handleCloseGallery("heroImage")}
              isGalleryOpen={galleryStates.heroImage}
            />
          </div>
          <input
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter the text for hero section"
            value={heroText}
            onChange={(e) => setHeroText(e.target.value)}
          />
        </div>
        <h2 className="font-bold text-2xl text-left mb-8">Expertise Section</h2>
        <div className="mb-6">
          <input
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            type="text"
            placeholder="Enter the title for expertise section"
            value={expertiseTitle}
            onChange={(e) => setExpertiseTitle(e.target.value)}
          />
          {expertise.map((exp, index) => {
            return (
              <div key={exp.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <GalleryInput
                  id={`expertise-${index}`}
                  type="text"
                  images={galleryStates.expertise[index] ? imageUrls : []}
                  onSelectImage={(url) => handleImageChange(index, url)}
                  onOpenGallery={() => handleOpenGallery("expertise", index)}
                  onCloseGallery={() => handleCloseGallery("expertise", index)}
                  isGalleryOpen={galleryStates.expertise[index] || false}
                  placeholder="Enter the Url of expertise"
                  value={exp.image}
                />
                <input
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the title"
                  value={exp.title}
                  onChange={(e) => handleTitleChange(index, e)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the description"
                  value={exp.description}
                  onChange={(e) => handleDescriptionChange(index, e)}
                />
              </div>
            );
          })}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addExpertise}
          >
            Add More Expertise
          </button>
        </div>
        <h2 className="font-bold text-2xl text-left mb-8">
          Tech Stack Section
        </h2>
        <div className="mb-6">
          {tech_stack.map((tech, index) => (
            <div key={tech.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <input
                className="w-full border border-gray-300 p-2 rounded-md mb-2"
                placeholder="Enter the title"
                value={tech.title}
                onChange={(e) => handleTechTitleChange(index, e)}
              />
              <GalleryInput
                id={`techStack-${index}`}
                type="text"
                images={galleryStates.techStack[index] ? imageUrls : []}
                onSelectImage={(url) => handleTechImageChange(index, url)}
                onOpenGallery={() => handleOpenGallery("techStack", index)}
                onCloseGallery={() => handleCloseGallery("techStack", index)}
                isGalleryOpen={galleryStates.techStack[index] || false}
                placeholder="Enter the Url of tech stack"
                value={tech.image}
              />
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addTechStack}
          >
            Add More Tech Stack
          </button>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </CommonLayout>
  );
};

export default AddNewService;
