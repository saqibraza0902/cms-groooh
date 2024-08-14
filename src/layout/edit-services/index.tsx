import GalleryInput from "@/ui/form/gallery-input";
import { app, db } from "@/utils/firebase";
import { get_images_from_firebase, services_page } from "@/utils/function";
import { slugify } from "@/utils/slugify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, useEffect, useState } from "react";

interface IExpertise {
  id: number;
  title: string;
  description: string;
  image: string;
}
interface IProp {
  title: string;
  main_category: string;
}
interface ITechStack {
  id: number;
  title: string;
  image: string;
}
const PAGES: { [key: string]: string } = {
  Design: "SERVICE_1",
  Development: "SERVICE_2",
  Marketing: "SERVICE_3",
};
const EditServices = ({ title, main_category }: IProp) => {
  const [pageTitle, setPageTitle] = useState<string>("");

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<string>("");
  const [heroText, setHeroText] = useState<string>("");
  const [expertiseTitle, setExpertiseTitle] = useState<string>("");
  const [expertise, setExpertise] = useState<IExpertise[]>([]);
  const [tech_stack, setTechStack] = useState<ITechStack[]>([]);
  const [editId, setEditId] = useState("");
  const [newUrl, setNewUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const storage = getStorage(app);
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
  }, [file]);

  useEffect(() => {
    const getServices = async () => {
      const data = await services_page();
      const matchingService = data?.find(
        (service: any) => service.url === title
      );
      setEditId(matchingService.id);
      setPageTitle(matchingService.title);
      setHeroText(matchingService.hero_section.text);
      setHeroImage(matchingService.hero_section.image);
      setExpertiseTitle(matchingService.expertise_section.title);
      setExpertise(matchingService.expertise_section.expertise);
      setTechStack(matchingService.tech_stack);
    };

    getServices();
  }, [title]);

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      await uploadBytes(storageRef, file);
      setUploading(false);
      setFile(null);
    }
  };

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
  const handleTitleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const title = e.target.value;
    setExpertise(
      expertise.map((item, i) => (i === index ? { ...item, title } : item))
    );
  };
  const handleImageChange = (index: number, url: string) => {
    setExpertise(
      expertise.map((item, i) => (i === index ? { ...item, image: url } : item))
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
  const handleSubmit = async () => {
    const service = PAGES[main_category];
    const newDoc = {
      url: `${slugify(pageTitle)}`,
      id: editId,
      title: pageTitle,
      hero_section: {
        image: heroImage,
        text: heroText,
      },
      expertise_section: {
        title: expertiseTitle,
        expertise: expertise.map(({ id, title, description, image }) => ({
          title,
          description,
          image: image,
        })),
      },
      tech_stack: tech_stack.map(({ title, image }) => ({ title, image })),
    };

    const docRef = doc(db, "Pages", "SERVICES");

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const servicesArray = docSnap.data()[service].services || [];

      const index = servicesArray.findIndex(
        (service: any) => service.id === editId
      );

      if (index !== -1) {
        // Update the object at the found index
        servicesArray[index] = newDoc;

        // Update the document in Firestore
        await updateDoc(docRef, {
          [`${service}.services`]: servicesArray,
        });

        alert("Data updated successfully!");
      } else {
        alert("Service not found!");
      }
    } else {
      alert("Document does not exist!");
    }
  };
  return (
    <div className="container mx-auto p-8">
      <div>
        <h2 className="font-bold text-4xl text-center mb-8">
          Edit the {title} service page
        </h2>
        <h3 className="font-bold text-2xl text-left mb-8">Other Detals</h3>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Title of the page
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please input the title of the page"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />
        </div>

        <h3 className="font-bold text-2xl text-left mb-8">Hero Section</h3>
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <GalleryInput
              id="heroImage"
              type="text"
              images={galleryStates.heroImage ? imageUrls : []}
              value={heroImage}
              onSelectImage={(url) => setHeroImage(url)}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="Enter the url of image"
              onOpenGallery={() => handleOpenGallery("heroImage")}
              onCloseGallery={() => handleCloseGallery("heroImage")}
              isGalleryOpen={galleryStates.heroImage}
            />
          </div>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the text for hero section"
            value={heroText}
            onChange={(e) => setHeroText(e.target.value)}
          />
        </div>
        <h3 className="font-bold text-2xl text-left mb-8">Expertise Section</h3>
        <div>
          <input
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Title of expertise Section"
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
                  onChange={(e) => handleImageChange(index, e.target.value)}
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
            className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
            onClick={addExpertise}
          >
            Add More Expertise
          </button>
        </div>
        <h2 className="font-bold text-2xl text-left mb-8">
          Tech Stack Section
        </h2>
        <div className="mb-6">
          {tech_stack.map((tech, index) => {
            return (
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
                  onChange={(e) => handleTechImageChange(index, e.target.value)}
                  onOpenGallery={() => handleOpenGallery("techStack", index)}
                  onCloseGallery={() => handleCloseGallery("techStack", index)}
                  isGalleryOpen={galleryStates.techStack[index] || false}
                  placeholder="Enter the Url of tech stack"
                  value={tech.image}
                />
              </div>
            );
          })}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addTechStack}
          >
            Add More Tech Stack
          </button>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditServices;

{
  /* <GalleryInput
  id="heroImage"
  type="text"
  images={galleryStates.heroImage ? imageUrls : []}
  value={heroImage}
  onSelectImage={(url) => setHeroImage(url)}
  onChange={(e) => setHeroImage(e.target.value)}
  placeholder="Enter the url of image"
  onOpenGallery={() => handleOpenGallery("heroImage")}
  onCloseGallery={() => handleCloseGallery("heroImage")}
  isGalleryOpen={galleryStates.heroImage}
/>
<GalleryInput
  id="newUrl"
  type="text"
  images={galleryStates.newUrl ? imageUrls : []}
  value={newUrl}
  onSelectImage={(url) => setNewUrl(url)}
  onChange={(e) => setNewUrl(e.target.value)}
  placeholder="Enter the url of image"
  onOpenGallery={() => handleOpenGallery("newUrl")}
  onCloseGallery={() => handleCloseGallery("newUrl")}
  isGalleryOpen={galleryStates.newUrl}
/> */
}
