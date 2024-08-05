// import { app, db } from "@/utils/firebase";
// import { services_page } from "@/utils/function";
// import { slugify } from "@/utils/slugify";
// import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
// import {
//   getDownloadURL,
//   getStorage,
//   listAll,
//   ref,
//   uploadBytes,
// } from "firebase/storage";
// import { ChangeEvent, useEffect, useState } from "react";
// import Gallery from "./Gallery";
// import GalleryInput from "@/ui/form/GalleryInput";
// interface IExpertise {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }
// interface IProp {
//   title: string;
//   main_category: string;
// }
// interface ITechStack {
//   id: number;
//   title: string;
//   image: string;
// }
// const getImagesFromFolder = async (folderPath: string) => {
//   const storage = getStorage(app);
//   const folderRef = ref(storage, folderPath);
//   const { items } = await listAll(folderRef);

//   const urls = await Promise.all(items.map((item) => getDownloadURL(item)));

//   return urls;
// };
// const EditServices = ({ title, main_category }: IProp) => {
//   const [expertise, setExpertise] = useState<IExpertise[]>([]);
//   const [mainCategory, setMainCategory] = useState<string>("");
//   const [pageTitle, setPageTitle] = useState<string>("");
//   const [expertiseTitle, setExpertiseTitle] = useState<string>("");
//   const [heroImage, setHeroImage] = useState<string>("");
//   const [heroText, setHeroText] = useState<string>("");
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const [tech_stack, setTechStack] = useState<ITechStack[]>([]);
//   const [editId, setEditId] = useState("");
//   const storage = getStorage(app);
//   const [open, setOpen] = useState(false);
//   const handleImageSelection = (url: string) => {
//     setHeroImage(url);
//   };
//   useEffect(() => {
//     const getAllImages = async () => {
//       const folders = ["logos", ""];
//       const imageUrl = [];
//       for (const folder of folders) {
//         const urls = await getImagesFromFolder(`/${folder}/`);
//         imageUrl.push(...urls);
//       }
//       setImageUrls(imageUrl);
//     };
//     getAllImages();
//   }, []);
//   useEffect(() => {
//     const getServices = async () => {
//       const data = await services_page();
//       const matchingService = data?.find(
//         (service: any) => service.url === title
//       );
//       setEditId(matchingService.id);
//       setPageTitle(matchingService.title);
//       setHeroText(matchingService.hero_section.text);
//       setHeroImage(matchingService.hero_section.image);
//       setExpertiseTitle(matchingService.expertise_section.title);
//       setExpertise(matchingService.expertise_section.expertise);
//       setTechStack(matchingService.tech_stack);
//     };

//     getServices();
//   }, [title]);

//   const addExpertise = () => {
//     setExpertise([
//       ...expertise,
//       {
//         id: expertise.length + 1,
//         title: "",
//         description: "",
//         image: "",
//       },
//     ]);
//   };
//   const addTechStack = () => {
//     setTechStack([
//       ...tech_stack,
//       {
//         id: tech_stack.length + 1,
//         title: "",
//         image: "",
//       },
//     ]);
//   };
//   const handleTechTitleChange = (
//     index: number,
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const title = e.target.value;
//     setTechStack(
//       tech_stack.map((item, i) => (i === index ? { ...item, title } : item))
//     );
//   };
//   const handleTechImageChange = (
//     index: number,
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const image = e.target.value;
//     setTechStack(
//       tech_stack.map((item, i) => (i === index ? { ...item, image } : item))
//     );
//   };
//   const handleTitleChange = (
//     index: number,
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const title = e.target.value;
//     setExpertise(
//       expertise.map((item, i) => (i === index ? { ...item, title } : item))
//     );
//   };
//   const handleImageChange = (
//     index: number,
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const url = e.target.value;
//     setExpertise(
//       expertise.map((item, i) => (i === index ? { ...item, image: url } : item))
//     );
//   };

//   const handleDescriptionChange = (
//     index: number,
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const description = e.target.value;
//     setExpertise(
//       expertise.map((item, i) =>
//         i === index ? { ...item, description } : item
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     const newDoc = {
//       url: `${slugify(pageTitle)}`,
//       id: editId,
//       title: pageTitle.toUpperCase(),
//       hero_section: {
//         image: heroImage,
//         text: heroText,
//       },
//       expertise_section: {
//         title: expertiseTitle,
//         expertise: expertise.map(({ id, title, description, image }) => ({
//           title,
//           description,
//           image: image,
//         })),
//       },
//       tech_stack: tech_stack.map(({ title, image }) => ({ title, image })),
//     };

//     const docRef = doc(db, "Pages", "SERVICES");

//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const servicesArray = docSnap.data()[mainCategory].services || [];

//       const index = servicesArray.findIndex(
//         (service: any) => service.id === editId
//       );

//       if (index !== -1) {
//         // Update the object at the found index
//         servicesArray[index] = newDoc;

//         // Update the document in Firestore
//         await updateDoc(docRef, {
//           [`${mainCategory}.services`]: servicesArray,
//         });

//         alert("Data updated successfully!");
//       } else {
//         alert("Service not found!");
//       }
//     } else {
//       alert("Document does not exist!");
//     }
//   };
//   return (
//     <div className="container mx-auto p-8">
//       <div>
//         <h2 className="font-bold text-4xl text-center mb-8">
//           Edit the {title} service page
//         </h2>
//         <h3 className="font-bold text-2xl text-left mb-8">Other Detals</h3>
//         <div className="mb-6">
//           <label className="block text-lg font-semibold mb-2">
//             Title of the page
//           </label>
//           <input
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Please input the title of the page"
//             value={pageTitle}
//             onChange={(e) => setPageTitle(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col mb-6">
//           <label className="block text-lg font-semibold mb-2">
//             Please select the main category
//           </label>
//           <select
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={mainCategory}
//             onChange={(e) => setMainCategory(e.target.value)}
//           >
//             <option value={"SERVICE_1"}>Design</option>
//             <option value={"SERVICE_2"}>Development</option>
//             <option value={"SERVICE_3"}>Marketing</option>
//           </select>
//         </div>
//         <h3 className="font-bold text-2xl text-left mb-8">Hero Section</h3>
//         <div className="mb-6">
//           <div className="flex items-center mb-4">
//             <GalleryInput
//               handleOpen={() => setOpen(true)}
//               type="text"
//               images={imageUrls}
//               value={heroImage}
//               onChange={(e) => setHeroImage(e.target.value)}
//               placeholder="Enter the url of image"
//             />
//             {/* <Gallery
//               images={imageUrls}
//               onClose={() => setOpen(false)}
//               open={open}
//               onSelectImage={(url) => setHeroImage(url)}
//             /> */}
//           </div>
//           <input
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter the text for hero section"
//             value={heroText}
//             onChange={(e) => setHeroText(e.target.value)}
//           />
//         </div>
//         <h3 className="font-bold text-2xl text-left mb-8">Expertise Section</h3>
//         <div>
//           <input
//             className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Title of expertise Section"
//             value={expertiseTitle}
//             onChange={(e) => setExpertiseTitle(e.target.value)}
//           />
//           {expertise.map((exp, index) => (
//             <div key={exp.id} className="my-6">
//               <input
//                 className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter the Url of expertise"
//                 type="text"
//                 value={exp.image}
//                 onChange={(e) => handleImageChange(index, e)}
//               />
//               <input
//                 className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter the title"
//                 value={exp.title}
//                 onChange={(e) => handleTitleChange(index, e)}
//               />
//               <input
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter the description"
//                 value={exp.description}
//                 onChange={(e) => handleDescriptionChange(index, e)}
//               />
//             </div>
//           ))}
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
//             onClick={addExpertise}
//           >
//             Add More Expertise
//           </button>
//         </div>
//         <h2 className="font-bold text-2xl text-left mb-8">
//           Tech Stack Section
//         </h2>
//         <div className="mb-6">
//           {tech_stack.map((tech, index) => (
//             <div key={tech.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
//               <input
//                 className="w-full border border-gray-300 p-2 rounded-md mb-2"
//                 placeholder="Enter the title"
//                 value={tech.title}
//                 onChange={(e) => handleTechTitleChange(index, e)}
//               />
//               {/* <GalleryInput
//                 handleOpen={() => console.log(index)}
//                 type="text"
//                 images={imageUrls}
//                 value={tech.image}
//                 placeholder="Enter the URL of tech stack image"
//               /> */}
//             </div>
//           ))}
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={addTechStack}
//           >
//             Add More Tech Stack
//           </button>
//         </div>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditServices;
